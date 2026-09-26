// Flute from "monster is close" (reference/monstertheme/synth.ts, Flute +
// FluteChannel): a band-passed waveguide with negative, saturating feedback
// (tanh), breathy noise attack, sent to the song's echo.
import("monster.lib");

freq = hslider("freq", 880, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original; loop tweaks take effect from the next new note)
bright = hslider("bright", 1, 0.02, 2.56, 0.02);         // loop low-pass = 80 * sqrt(freq)
breath = hslider("breath_tone", 1, 0.02, 2.56, 0.02);    // exciter low-pass (150 Hz)

env = adsr(0.05, 1, 1, 0.01, gate);
tone = bpwaveguide(0.001, 0.01, 150 * breath, -1.1, freq, 80 * pow(freq, 0.5) * bright, gate, noises(1, 0));

// velocity * 0.01 as the original; x4: a Faust voice lands at 0.25 per side.
process = tone * env * gain * 127 * 0.01 * 4;

// Channel effect (FluteChannel): the song's echo - 0.75 beat (0.36 s at
// 125 BPM; the original's 92 BPM gave 0.49 s), 0.3 feedback, sent at 1.0 -
// returned x sqrt(2) for the channel pan law it now passes through.
echoTime = 0.36 * hslider("echo_time[midi:ctrl 2]", 1, 0.02, 2.56, 0.02);
echoSend = hslider("echo_send[midi:ctrl 3]", 1, 0.02, 2.56, 0.02);
effect = fx with { fx(x) = x + echo(echoTime, x * echoSend) * sqrt(2); };
