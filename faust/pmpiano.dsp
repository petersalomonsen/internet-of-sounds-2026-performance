// Piano ported from reference/physicalmodeling/synth.ts (Piano): three waveguide
// strings per note, each with its own hammer noise and loop filter, the
// brightness falling with the note number.
import("physmod.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: each scales one original value, 1 = the original sound
// (0.02-2.56, steps of 0.02: MIDI CC 49 is exactly 1).
bright  = hslider("bright", 1, 0.02, 2.56, 0.02);       // all three loop low-passes
damping = hslider("damping", 1, 0.02, 2.56, 0.02);      // loop loss, exponential: lower rings longer
hammer  = hslider("hammer_tone", 1, 0.02, 2.56, 0.02);  // exciter low-passes

env = adsr(0.01, 1, 1, 0.1, gate);
kill = silent(gate, env);
note = notenum(freq);
fb(f0) = damped(f0, damping);

wg1 = waveguide(0.06, 0.25, 50 * hammer, fb(0.9999), freq * 6000 * bright / pow(note, 1.35), freq, gate, noises(3, 0), kill);
wg2 = waveguide(0.01, 0.1, 100 * hammer, fb(0.999), freq * 4000 * bright / pow(note, 1.3), freq, gate, noises(3, 1), kill);
wg3 = waveguide(0.02, 0.05, 150 * hammer, fb(0.99), freq * 2000 * bright / pow(note, 1.3), freq, gate, noises(3, 2), kill);

// The original is stereo (L = wg1 + 0.8 wg2 + wg3, R = wg1 + wg2 + 0.8 wg3);
// a Faust voice is mono, so this is their average.
// velocity / 8 as the original; x4: a Faust voice lands at 0.25 per side.
process = (wg1 + 0.9 * wg2 + 0.9 * wg3) * env * gain * 127 / 8 * 4;
