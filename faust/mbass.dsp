// Bass from "monster is close" (reference/monstertheme/synth.ts, Bass): one
// tuned waveguide string, a 1 ms noise pluck, loop low-pass falling with the note.
import("monster.lib");

freq = hslider("freq", 55, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original; take effect from the next new note)
bright  = hslider("bright", 1, 0.02, 2.56, 0.02);        // loop low-pass = freq * 8000 / note^1.7
damping = hslider("damping", 1, 0.02, 2.56, 0.02);       // loop loss, exponential: lower rings longer
excTone = 200 * hslider("exciter_tone", 1, 0.02, 2.56, 0.02);

env = adsr(0.001, 1, 1, 0.1, gate);
string = waveguide(0.001, 0.01, excTone, damped(0.999, damping), freq,
    freq * 8000 * bright / pow(notenum(freq), 1.7), gate, noises(1, 0), 0, 0, plain);

// velocity * 0.25 as the original; x4: a Faust voice lands at 0.25 per side.
process = string * env * gain * 127 * 0.25 * 4;
