// Strings ported from reference/physicalmodeling/synth.ts (String): one waveguide
// kept going by a slow noise "bow" (0.2 s attack, 20 s decay), a slow swell.
import("physmod.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: each scales one original value, 1 = the original sound
// (0.02-2.56, steps of 0.02: MIDI CC 49 is exactly 1).
bright  = 3500 * hslider("bright", 1, 0.02, 2.56, 0.02);  // loop low-pass = freq * 3500 / note^1.3
damping =        hslider("damping", 1, 0.02, 2.56, 0.02); // loop loss, exponential: lower rings longer
bowTone = 100  * hslider("bow_tone", 1, 0.02, 2.56, 0.02); // exciter low-pass (Hz)
sustain = damped(0.995, damping);

env = adsr(0.1, 1, 0.9, 0.3, gate);
fbFc = freq * bright / pow(notenum(freq), 1.3);
string = waveguide(0.2, 20.0, bowTone, sustain, fbFc, freq, gate, noise, silent(gate, env));

// velocity / 8 as the original; x4: a Faust voice lands at 0.25 per side.
process = string * env * gain * 127 / 8 * 4;
