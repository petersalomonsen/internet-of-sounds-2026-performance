// Piano from "monster is close" (reference/monstertheme/synth.ts, Piano +
// PianoChannel): per side a stiff string (dispersion allpasses from an
// inharmonicity model, tuned) struck by its own hammer resonator, and on the
// channel a 42-stage comb network per side that colours and levels it.
//
// The hammer must already have run 20 ms when the string first hears it (the
// original pre-rolls it at note-on and discards that output). `declare preroll`
// makes the generated voice do the same: at note-on it runs this DSP for 0.02 s
// with `preroll` = 1 before opening the gate. The hammers restart on preroll's
// rising edge; the string only listens once the gate is open.
declare preroll "0.02";
import("monster.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);
preroll = button("preroll");

// Live tweaks (1 = original; string tweaks take effect from the next new note)
hammerTone = hslider("hammer_tone", 1, 0.02, 2.56, 0.02);  // hammer low-pass
damping    = hslider("damping", 1, 0.02, 2.56, 0.02);      // string loss, exponential: lower rings longer
dispScale  = hslider("dispersion", 1, 0.02, 2.56, 0.02);   // string inharmonicity: higher = more metallic/detuned partials

env = adsr(0.001, 1.0, 1.0, 3.0, gate);
ptrig = preroll > preroll';
strig = gate > gate';
// the voice had finished (its envelope ran out) - the original's `stopped`
stopped = env' <= 0;

// Local variant of monster.lib's dispersion/pianostring with a SCALABLE
// inharmonicity: the stiff-string coefficient B - the only thing the dispersion
// allpass coefficient and the delay's phase compensation are derived from - is
// multiplied by `ds`. ds = 1 gives exactly the library's B = 0.00003, i.e. the
// original sound, bit for bit; higher B = more spread, more detuned/metallic
// partials, lower = a purer string. `len` subtracts the scaled df * 5 just as
// the library does, so the fundamental stays tuned as the dispersion moves.
dispersionS(f0, ds) = (pd(a1) - pd(1 / a1))
with {
    B = 0.00003 * ds; M = 5;
    lb = log(max(B, 0.000001));
    k1 = -0.00179; k2 = -0.0233; k3 = -2.93;
    m1 = 0.0126; m2 = 0.0606; m3 = -0.00825; m4 = 1.97;
    wT = 2 * ma.PI * f0 / SR;
    kd = exp(k1 * lb * lb + k2 * lb + k3);
    Cd = exp((m1 * log(M) + m2) * lb + m3 * log(M) + m4);
    trt = pow(2, 1 / 12);
    ikey = log(f0 * trt / 27.5) / log(trt);
    D = exp(Cd - ikey * kd);
    a1 = (1 - D) / (1 + D);
    pd(a) = atan(sin(wT) / (a + cos(wT))) / wT;
};
pianostringS(trig, stopped, f, env, damping, ds, hammerOut) = loop ~ delayline(rst, len) : (!, _)
with {
    held = ba.sAndH(trig, f);
    rst = trig & ((f != held') | stopped);
    df = ba.sAndH(rst, dispersionS(f, ds));
    len = ba.sAndH(rst, SR / f - lpPhase(18000, f) - df * 5);
    fb = ba.sAndH(rst, pow(0.20 / lpMag(18000, f), 1.01 / f));
    loop(read) = w, s
    with {
        s = hammerOut + lpf(rst, 18000, read) : aps(5, rst, apc(df)) : *(env);
        w = s * damped(fb, damping);
    };
};

side(i) = pianostringS(strig, stopped, freq, env, damping, dispScale, hammerIn)
with {
    h = hammer(ptrig, gain * hammerTone, freq, noises(2, i));
    // one sample late: the gate-closed frame before the note already ran the
    // hammer once more, and the string's first sample must get the 883rd
    hammerIn = h' * (1 - preroll');
};

// x4: a Faust voice lands at 0.25 per side (the original adds 1.0).
process = side(0) * 4, side(1) * 4;

// Channel effect (PianoChannel.preprocess): per side 42 one-sample combs
// (feedback 0.21, damping 0.4) with 0.1% cross-feed, then the original's
// 0.5e-15 make-down - the comb chain's gain is ~1e15 in the low end.
effect = seq(i, 42, stage) : *(0.5e-15), *(0.5e-15)
with {
    stage = st ~ (_, _, _, _) : (!, !, !, !, _, _)
    with {
        st(ulp, fslp, urp, fsrp, l, r) = ul, fsl, ur, fsr, l2, r2
        with {
            yl = ulp;
            fsl = yl * 0.6 + fslp * 0.4;
            ul = l * 0.999 + r * 0.001 + fsl * 0.21;
            l2 = (l + yl) * 0.79;
            yr = urp;
            fsr = yr * 0.6 + fsrp * 0.4;
            ur = r * 0.999 + l2 * 0.001 + fsr * 0.21;
            r2 = (r + yr) * 0.79;
        };
    };
};
