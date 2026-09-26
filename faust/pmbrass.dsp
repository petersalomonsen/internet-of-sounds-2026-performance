// Brass ported from reference/physicalmodeling/synth.ts (Brass): two bright
// waveguides with breathy noise attacks; the second loop has no loss at all
// (feedback 1.0), only its low-pass damps it.
import("physmod.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: each scales one original value, 1 = the original sound
// (0.02-2.56, steps of 0.02: MIDI CC 49 is exactly 1).
bright  = hslider("bright", 1, 0.02, 2.56, 0.02);       // both loop low-passes (freq * 10, freq * 8)
damping = hslider("damping", 1, 0.02, 2.56, 0.02);      // loss of the first loop (the second has none)
breath  = hslider("breath_tone", 1, 0.02, 2.56, 0.02);  // exciter low-passes

env = adsr(0.01, 1, 1, 0.1, gate);
kill = silent(gate, env);

wg1 = waveguide(0.02, 0.15, 1000 * breath, damped(0.99999, damping), freq * 10 * bright, freq, gate, noises(2, 0), kill);
wg2 = waveguide(0.03, 0.2, 5000 * breath, 1.0, freq * 8 * bright, freq, gate, noises(2, 1), kill);

// velocity / 24 as the original; x4: a Faust voice lands at 0.25 per side.
process = (wg1 + wg2) * env * gain * 127 / 24 * 4;
