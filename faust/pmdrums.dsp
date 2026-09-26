// Drum kit ported from reference/physicalmodeling/synth.ts (Kick2, Snare2, Hihat).
// One channel, one drum per note, like the original: c5 (60) kick, d5 (62) snare,
// fs5 (66) hi-hat; every other note is silent.
// All three are filtered noise. Envelopes and filters are written out here (not
// en.adsr / fi.lowpass) so they match the AssemblyScript Envelope and RBJ
// BiQuadFilter exactly, whichever Faust compiler builds this.
import("stdfaust.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks — defaults are the original sound.
kickDecay  = hslider("kick_decay", 0.3, 0.05, 1.5, 0.01);    // thump length (s)
kickSweep  = hslider("kick_sweep", 80, 10, 400, 1);          // low-pass sweep depth (Hz)
kickClick  = hslider("kick_click", 1, 0, 4, 0.01);           // 4-5 kHz click level
kickLevel  = hslider("kick_level", 1, 0, 2, 0.01);
snareDecay = hslider("snare_decay", 0.3, 0.05, 1.5, 0.01);   // body (350-500 Hz) length (s)
snareSnap  = hslider("snare_snap", 0.08, 0.01, 0.5, 0.005);  // 3-5 kHz snap length (s)
snareLevel = hslider("snare_level", 1, 0, 2, 0.01);
hatDecay   = hslider("hat_decay", 0.07, 0.01, 0.5, 0.005);   // (s)
hatCutoff  = hslider("hat_cutoff", 10000, 2000, 16000, 10);  // high-pass (Hz)
hatLevel   = hslider("hat_level", 1, 0, 2, 0.01);

// Linear ADSR, as synth/envelope.class.ts: attack ramps from the current value,
// release ramps down from wherever it is. State 0 = release/idle, 1 attack,
// 2 decay, 3 sustain.
adsr(at, dt, sl, rt, g) = step ~ (_, _) : (!, _)
with {
    step(st, v) = st2, v2
    with {
        s0 = ba.if(g > g', 1, ba.if(g < g', 0, st));
        va = min(1, v + 1 / max(1, at * ma.SR));
        vd = max(sl, v - 1 / max(1, dt * ma.SR));
        vr = max(0, v - 1 / max(1, rt * ma.SR));
        v2 = ba.selectn(4, s0, vr, va, vd, v);
        st2 = ba.selectn(4, s0, 0, ba.if(va >= 1, 2, 1), ba.if(vd <= sl, 3, 2), 3);
    };
};

// RBJ cookbook biquads at Butterworth Q, as synth/biquad.ts (cutoff clamped
// to SR/2 - 1000 like the original).
rbj(hp, fc) = df1(b0 / a0, b1 / a0, b0 / a0, -2 * c / a0, (1 - al) / a0)
with {
    w = 2 * ma.PI * min(fc, ma.SR / 2 - 1000) / ma.SR;
    c = cos(w);
    al = sin(w) / (2 * 0.7071067811865475);
    a0 = 1 + al;
    b0 = ba.if(hp, (1 + c) * 0.5, (1 - c) * 0.5);
    b1 = ba.if(hp, 0 - (1 + c), 1 - c);
};
// Direct form I like the original (fi.tf2 is direct form II, which reacts
// differently when the cutoff is swept per sample, as in the kick).
df1(b0, b1, b2, a1, a2) = ff : + ~ fb
with {
    ff(x) = b0 * x + b1 * x' + b2 * x'';
    fb(y) = 0 - a1 * y - a2 * y';
};
lp(fc) = rbj(0, fc);
hpf(fc) = rbj(1, fc);
bandpass(lo, hi) = hpf(lo) : lp(hi);

noise = no.noise * 0.5;   // the original's Noise is uniform in [-0.5, 0.5)
velo = gain * 127;

key = int(12 * log(freq / 440) / log(2) + 69.5);

kick = velo / 40 * kickLevel * (
        (noise : bandpass(4000, 5000)) * e2 * kickClick
      + (noise : bandpass(10, 11 + e3 * kickSweep)) * e3 * 30)
with {
    g = gate * (key == 60);
    e2 = adsr(0.001, 0.01, 0, 0.01, g);
    e3 = adsr(0.001, kickDecay, 0, 0.1, g);
};

// The original is stereo (L = body + 0.7 snap, R = 0.7 body + snap); a Faust
// voice is mono, so this is their average.
snare = velo / 64 * snareLevel * 0.85 * (
        (noise : bandpass(350, 500)) * e1 * 7
      + (noise : bandpass(3000, 5000)) * e2 * 2)
with {
    g = gate * (key == 62);
    e1 = adsr(0.001, snareDecay, 0, 0.3, g);
    e2 = adsr(0.001, snareSnap, 0, 0.2, g);
};

hihat = (velo / 32 * hatLevel * 1.2 * e * noise) : hpf(hatCutoff + 2000 * e)
with {
    g = gate * (key == 66);
    e = adsr(0, hatDecay, 0, 0.1, g);
};

// x4: a Faust voice lands on the channel at 0.25 per side, the original at 1.0.
process = (kick + snare + hihat) * 4;
