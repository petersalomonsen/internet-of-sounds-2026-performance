// Choir from "monster is close" (reference/monstertheme/synth.ts, Choir): two
// waveguides with negative feedback (-1), the second an octave up, both fed by
// one low-passed breath noise with its own swelling envelope; crossed L/R.
import("monster.lib");

freq = hslider("freq", 587.33, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original; loop tweaks take effect from the next new note)
bright = hslider("bright", 1, 0.02, 2.56, 0.02);         // loop low-pass = 2000 * ln(freq / 100)
breath = hslider("breath_tone", 1, 0.02, 2.56, 0.02);    // breath low-pass (2500 Hz, Q 0.6)

env = adsr(0.05, 1, 1, 0.3, gate);
breathEnv = adsr(0.15, 0.2, 0.6, 0.3, gate);
excite = noises(1, 0) * breathEnv : df1(0, 0, 2500 * breath, 0.6);
fbFc = log(freq * 0.01) * 2000 * bright;
low = customwg(-1, freq, fbFc, gate, excite);
high = customwg(-1, freq * 2, fbFc, gate, excite);

// velocity * 0.003 as the original; x4: a Faust voice lands at 0.25 per side.
level = env * 0.003 * gain * 127 * 4;
process = (high + low * 0.4) * level, (low + high * 0.4) * level;
