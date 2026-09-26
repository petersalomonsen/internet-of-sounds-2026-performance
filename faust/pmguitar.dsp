// Guitar ported from reference/physicalmodeling/synth.ts (Guitar + GuitarChannel):
// a plucked waveguide string, and on the channel a soft-clip drive with a
// band-passed feedback loop (the original's amp).
import("physmod.lib");

freq = hslider("freq", 220, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: each scales one original value, 1 = the original sound
// (0.02-2.56, steps of 0.02: MIDI CC 49 is exactly 1).
bright  = 3500 * hslider("bright", 1, 0.02, 2.56, 0.02);       // loop low-pass = freq * 3500 / note^1.3
damping =        hslider("damping", 1, 0.02, 2.56, 0.02);      // loop loss, exponential: lower rings longer
excTone = 3000 * hslider("exciter_tone", 1, 0.02, 2.56, 0.02); // pluck low-pass (Hz)
sustain = damped(0.9999, damping);                          // loop feedback

env = adsr(0.02, 1, 1, 0.1, gate);
fbFc = freq * bright / pow(notenum(freq), 1.3);
string = waveguide(0.005, 0.01, excTone, sustain, fbFc, freq, gate, noise, silent(gate, env));

// velocity / 8 as the original; x4: a Faust voice lands at 0.25 per side.
process = string * env * gain * 127 / 8 * 4;

// Channel effect (GuitarChannel.preprocess): drive into a soft clip, plus a
// feedback loop through a 40 Hz - 8 kHz band-pass that rings with the amp.
drive = 0.2 * hslider("drive[midi:ctrl 3]", 1, 0.02, 2.56, 0.02);
ampFb = min(0.99, 0.92 * hslider("amp_feedback[midi:ctrl 4]", 1, 0.02, 2.56, 0.02));
effect = (body ~ _) : (!, _)
with {
    body(fbPrev, x) = fbNext, s + fbPrev
    with {
        s = softclip(x * drive);
        fbNext = fbPrev * ampFb + s : bandpass(40, 8000);
    };
};
