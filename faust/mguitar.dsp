// Guitar from "monster is close" (reference/monstertheme/synth.ts, Guitar +
// GuitarChannel): two tuned waveguides detuned ±0.1%, one per side, into the
// channel's amp - soft clip, an integrating band-passed feedback, and the
// song's echo.
import("monster.lib");

freq = hslider("freq", 220, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks (1 = original; take effect from the next new note)
bright  = hslider("bright", 1, 0.02, 2.56, 0.02);        // loop low-pass = freq * 4400 / note^1.28
damping = hslider("damping", 1, 0.02, 2.56, 0.02);       // loop loss, exponential: lower rings longer
excTone = 2000 * hslider("exciter_tone", 1, 0.02, 2.56, 0.02);

env = adsr(0.002, 1, 1, 0.2, gate);
fbFc = freq * 4400 * bright / pow(notenum(freq), 1.28);
string(detune, i) = waveguide(0.002, 0.03, excTone, damped(0.997, damping), freq * detune, fbFc, gate, noises(2, i), 0, 0, plain);

// velocity * 0.04 as the original; x4: a Faust voice lands at 0.25 per side.
level = env * gain * 127 * 0.04 * 4;
process = string(1.001, 0) * level, string(0.999, 1) * level;

// Channel effect (GuitarChannel.preprocess): soft clip, plus a feedback that
// ACCUMULATES the 150-3600 Hz band (an integrator, so it adds a low-mid body);
// as in the original both sides take the left side's feedback. Then the song's
// echo: 0.75 beat (0.36 s at 125 BPM; the original's 92 BPM gave 0.49 s),
// 0.3 feedback, sent at 1.4.
drive    = 0.8 * hslider("drive[midi:ctrl 3]", 1, 0.02, 2.56, 0.02);
echoTime = 0.36 * hslider("echo_time[midi:ctrl 4]", 1, 0.02, 2.56, 0.02);
echoSend = 1.4 * hslider("echo_send[midi:ctrl 5]", 1, 0.02, 2.56, 0.02);
effect = amp : withEcho, withEcho
with {
    amp(l, r) = (l2, r2)
    with {
        sl = softclip(l * drive);
        sr = softclip(r * drive);
        acc = sl * 1.5 : hpf(0, 150) : lpf(0, 3600) : (+ ~ _);
        l2 = (sl + acc') * 0.6;
        r2 = (sr + acc') * 0.6;
    };
    // the song's echo returned outside the channel, past its pan law (0.707
    // per side at center); here it passes through it, hence x sqrt(2)
    withEcho(x) = x + echo(echoTime, x * echoSend) * sqrt(2);
};
