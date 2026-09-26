// Bass ported from reference/physicalmodeling/synth.ts (Bass): one waveguide
// string, a short noise pluck and a long, bright ring.
import("physmod.lib");

freq = hslider("freq", 55, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: each scales one original value, 1 = the original sound
// (0.02-2.56, steps of 0.02: MIDI CC 49 is exactly 1).
bright  = 7   * hslider("bright", 1, 0.02, 2.56, 0.02);       // loop low-pass = freq * 7
damping =       hslider("damping", 1, 0.02, 2.56, 0.02);      // loop loss, exponential: lower rings longer
pluck   = 0.04 * hslider("pluck", 1, 0.02, 2.56, 0.02);       // exciter attack (s)
excTone = 300 * hslider("exciter_tone", 1, 0.02, 2.56, 0.02); // exciter low-pass (Hz)
sustain = damped(0.999999, damping);                       // loop feedback

env = adsr(0.1, 1, 1, 0.1, gate);
string = waveguide(pluck, 0.01, excTone, sustain, freq * bright, freq, gate, noise, silent(gate, env));

// velocity / 2 as the original; x4: a Faust voice lands at 0.25 per side.
process = string * env * gain * 127 / 2 * 4;
