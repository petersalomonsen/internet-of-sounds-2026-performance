// Strings from "monster is close" (reference/monstertheme/synth.ts, String):
// two tuned waveguides kept going by a bowing noise (20 s decay), one per side,
// the bow lifted within 20 samples at note-off.
import("monster.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original; take effect from the next new note)
bright  = hslider("bright", 1, 0.02, 2.56, 0.02);        // loop low-pass = freq * 4000 / note^1.3
damping = hslider("damping", 1, 0.02, 2.56, 0.02);       // loop loss, exponential: lower rings longer
bowTone = hslider("bow_tone", 1, 0.02, 2.56, 0.02);      // exciter low-passes (610 / 620 Hz)

env = adsr(0.001, 1, 0.9, 0.3, gate);
off = gate < gate';
fbFc = freq * 4000 * bright / pow(notenum(freq), 1.3);
string(excFc, i) = waveguide(0.01, 20.0, excFc * bowTone, damped(0.995, damping), freq, fbFc, gate, noises(2, i), off, 0.05, plain);

// velocity * 0.01 as the original; x4: a Faust voice lands at 0.25 per side.
level = env * gain * 127 * 0.01 * 4;
process = string(610, 0) * level, string(620, 1) * level;
