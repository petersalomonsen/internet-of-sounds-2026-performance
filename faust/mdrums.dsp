// Drum kit from "monster is close" (reference/monstertheme/synth.ts, Kick2,
// Snare2, Hihat, OpenHihat, Tom, Cymbal + DrumChannel): every drum a pair of
// waveguides (left/right) with allpass-diffused loops. One channel, one drum
// per note: c5 (60) kick, d5 (62) snare, fs5 (66) hi-hat, gs5 (68) open hat,
// f5 g5 a5 b5 (65 67 69 71) toms, cs6 (73) cymbal; other notes are silent.
//
// The drums differ only in their constants, so a voice runs ONE guide pair
// set up for the drum its note selects (the original had a voice per drum;
// computing all of them in every voice cost ~12x). A voice changing drum starts
// from a quiet guide - by then the previous drum's ring has died out.
// (The original's toms also fed the song's echo; this kit is dry.)
import("monster.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original)
kickLevel  = hslider("kick_level", 1, 0.02, 2.56, 0.02);
snareLevel = hslider("snare_level", 1, 0.02, 2.56, 0.02);
hatLevel   = hslider("hat_level", 1, 0.02, 2.56, 0.02);   // closed and open
tomLevel   = hslider("tom_level", 1, 0.02, 2.56, 0.02);
cymLevel   = hslider("cymbal_level", 1, 0.02, 2.56, 0.02);

v = gain * 127;
k = key(freq);
// drum index: 0 kick, 1 snare, 2 hat, 3 open hat, 4-7 toms, 8 cymbal, 9 none
idx = ba.if(k == 60, 0, ba.if(k == 62, 1, ba.if(k == 66, 2, ba.if(k == 68, 3,
      ba.if(k == 65, 4, ba.if(k == 67, 5, ba.if(k == 69, 6, ba.if(k == 71, 7,
      ba.if(k == 73, 8, 9)))))))));
g = gate * (idx < 9);
trig = g > g';
d = ba.sAndH(trig, idx);                 // the drum this voice plays
rst = trig & (d != d');                  // a different drum: set up afresh
istom = (d >= 4) & (d <= 7);
sel(a0, a1, a2, a3, a4, a5, a6, a7, a8) = ba.selectn(9, d, a0, a1, a2, a3, a4, a5, a6, a7, a8);

//          kick           snare  hat    open   tom65  tom67  tom69  tom71  cymbal
excAt = sel(0.001,         0.005, 0.012, 0.001, 0.002, 0.002, 0.002, 0.002, 0.001);
excDt = sel(0.08,          0.2,   0.06,  0.5,   0.12,  0.12,  0.12,  0.12,  0.15);
fb    = sel(0.3,           0.8,   0.6,   0.85,  0.998, 0.998, 0.998, 0.998, 0.999);
// per drum and side: pitch, loop low-pass (tom: 1600 + (note - 58) * 250)
fL(i) = ba.take(i + 1, (1000 * 1.0001, 1400, 7200, 7200, 19800, 19800, 19800, 19800, SR / 2 * 0.95));
fR(i) = ba.take(i + 1, (1000 * 0.9999, 1400, 7200, 7200, 20200, 20200, 20200, 20200, SR / 2 * 1.05));
fbFc(i) = ba.take(i + 1, (600, 1660, 20000, 20000, 3350, 3850, 4350, 4850, 20000));
excFc(i) = ba.take(i + 1, (140, 10000, 20000, 20000, 1000, 1000, 1000, 1000, 20000));
apDelta(i) = ba.take(i + 1, (20, 15, 5, 5, 20000, 20000, 20000, 20000, 11));
// allpasses in the loop: tap after 3 (hats), 4 (kick) or 6 (the rest)
apTap = sel(1, 2, 0, 0, 2, 2, 2, 2, 2);
// after the loop: 0 nothing, 1 tom (300 Hz high-pass x 0.020), 2 cymbal (1200 Hz x 0.00027)
post  = sel(0, 0, 0, 0, 1, 1, 1, 1, 2);

// coefficient m of a filter, per drum, selected (the sets are constants)
coef(hp, fcf, m) = ba.selectn(9, d, par(i, 9, rbj(hp, fcf(i), QB, m)));
exclp(r, x) = df1k(r, coef(0, excFc, 0), coef(0, excFc, 1), coef(0, excFc, 2), coef(0, excFc, 3), coef(0, excFc, 4), x);
looplp(r, x) = tdf2k(r, coef(0, fbFc, 0), coef(0, fbFc, 1), coef(0, fbFc, 2), coef(0, fbFc, 3), coef(0, fbFc, 4), x);
posthp(r, x) = df1k(r, h(0), h(1), h(2), h(3), h(4), x)
with {
    h(m) = ba.if(post == 2, rbj(1, 1200, QB, m), rbj(1, 300, QB, m));
};
lenOf(ff, i) = SR / ff(i) - lpPhase(fbFc(i), ff(i));
apc_ = ba.selectn(9, d, par(i, 9, apc(apDelta(i))));

// toms clear their allpasses and output filter at every hit (TomGuide.start)
rstTom = rst | (trig & istom);
diffuse(x) = ba.selectn(3, apTap, y3, y4, y6)
with {
    a = ap(rstTom, apc_);
    y3 = x : a : a : a;
    y4 = y3 : a;
    y6 = y4 : a : a;
};

guide(ff, i) = loop ~ delayline(rst, len) : (!, _) : after
with {
    len = ba.selectn(9, d, par(j, 9, lenOf(ff, j)));
    x = noises(2, i) * excenv(excAt, excDt, trig, rst, 0, 0) : exclp(rst);
    loop(read) = w, s
    with {
        s = x + read : diffuse : looplp(rst);
        w = s * fb;
    };
    after(s) = ba.selectn(3, post, s, hp * 0.020, hp * 0.00027)
    with {
        hp = s : posthp(ba.if(post == 1, rstTom, rst));
    };
};

// velocity followed with a 0.01 per-sample glide (Kick2, Cymbal)
chase = f ~ _ with { f(y) = ba.if(rst, v, y + (v - y) * 0.01); };
env = adsr(sel(0.0001, 0.005, 0.0001, 0.0001, 0.0005, 0.0005, 0.0005, 0.0005, 0.0001),
           sel(1,      0.5,   1,      1,      1,      1,      1,      1,      3),
           sel(1,      0.1,   1,      1,      1,      1,      1,      1,      1),
           sel(0.3,    0.3,   0.2,    0.2,    0.2,    0.2,    0.2,    0.2,    3), g);
level = sel(0.18 * chase * kickLevel, 1.25 * v / 127 * snareLevel,
            0.04 * v / 30 * hatLevel, 0.03 * v / 30 * hatLevel,
            0.5 * v * tomLevel, 0.5 * v * tomLevel, 0.5 * v * tomLevel, 0.5 * v * tomLevel,
            0.3 * chase * cymLevel);

// x4: a Faust voice lands at 0.25 per side (the original adds 1.0).
process = guide(fL, 0) * env * level * 4, guide(fR, 1) * env * level * 4;

// Channel effect (DrumChannel.preprocess): 30 Hz high-pass per side.
effect = hpf(0, 30), hpf(0, 30);
