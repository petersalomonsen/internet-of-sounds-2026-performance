# "monster is close" — physical-modeling originals

Copied from `monstertheme/` in the NEAR repo `ifc2026-concert.gitfactory.testnet`
(last changed there in e1c63be, 2026-05-31), and ported to Faust under `faust/`.
**Reference only — nothing here is compiled by the app.** The ports are what the
concert plays (channels 0–4, 7, 8, 10, 11 in `synth.ts`).

- `synth.ts` — the AssemblyScript instruments. They build on the app's
  `synth/waveguide.ts` (`WaveGuide`, `noise()`), `fx/delayline.ts`
  (`DelayLineFloat`), `fx/allpass.ts` (`AllPassFloat`), `fx/comb.ts` and
  `synth/biquad.ts` in the javascriptmusic repo.
- `song.js` — the song that plays them.

## Ports

| original (ch) | port | concert ch |
|---|---|---|
| `Kick2`, `Snare2`, `Hihat`, `OpenHihat`, `Tom` ×4, `Cymbal` + `DrumChannel` (2) | `faust/mdrums.dsp` — one kit, same note map | 0 |
| `Bass` (4) | `faust/mbass.dsp` | 1 |
| `Guitar` + `GuitarChannel` (3) | `faust/mguitar.dsp` — amp and echo as the channel effect | 2 |
| `Piano` + `PianoChannel` (0) | `faust/mpiano.dsp` — the 42-stage comb network as the channel effect | 3 |
| `Flute` + `FluteChannel` (6) | `faust/mflute.dsp` — echo as the channel effect | 4 |
| `String` (1) | `faust/mstrings.dsp` | 7 |
| `Choir` (9) | `faust/mchoir.dsp` | 8 |
| `Brass` (8) | `faust/mbrass.dsp` | 10 |
| `PadSynth` + `PadSynthChannel` (7) | `faust/mpadsynth.dsp` — the wavetable embedded as the original computes it | 11 |

Not ported: `TubeLead`, and the song's master chain (EQ, MasterMe).

The shared model is `faust/monster.lib`: the library `WaveGuide` as the app
computes it — delay = SR/f minus the loop low-pass's phase delay (so it is in
tune), the string set up afresh only when the pitch changes (a repeated note
keeps ringing and is excited again), RBJ biquads in the original's forms (DF-I
for `process()`, transposed DF-II for `processForm2()`), `DelayLineFloat`'s
clear-and-refill, the exciter envelope — plus the piano's hammer resonator and
stiff string.

## How the ports were checked

Both sides driven by the same deterministic exciter (every noise source replaced
by a sine restarted at the waveguide's start), rendered through the real
midisynth, compared sample by sample and per channel:

| port | level vs original (L / R) | error below signal |
|---|---|---|
| mbass | ≤ 0.1 dB | 35–41 dB (slow drift of a 0.999 loop) |
| mbrass | ≤ 0.2 dB | 31–44 dB (its lossless second loop drifts in phase) |
| mstrings | ≤ 0.2 dB | 34–50 dB |
| mpiano | ≤ 0.1 dB | 38–43 dB, pre-roll and comb network included |
| mguitar | ≤ 0.3 dB | 22–31 dB, amp and echo included |
| mdrums | ≤ 0.2 dB | 35–51 dB per drum (cymbal 18–24: a near-lossless loop at Nyquist) |
| mchoir | ≤ 0.1 dB | 34–50 dB |
| mflute | ≤ 0.3 dB (echo off) | pitch within 1 cent, spectrum identical; the self-oscillating loop drifts in phase, so samples decorrelate |
| mpadsynth | ≤ 0.1 dB | statistical (random oscillator phases by design): pitch exact, centroid within 4 %, same decay |

With the real noise they differ as two noise draws do (the generators are
statistically the same). Stereo is kept: a voice's two outputs are its left and
right (javascriptmusic transpiler, PR #246).

## Differences by design

- **Piano pre-roll** — the original runs the hammer 20 ms at note-on before the
  string hears it. The port declares `preroll "0.02"` so the generated voice does
  the same (PR #246). Without it the piano measured 2–4 dB louder and brighter.
  It costs the same burst at note-on as the original (a 4-note chord ≈ 4 ms of
  DSP inside the note-on).
- **Echo** — the song's echo was global (guitar, toms, flute sent to it). The
  guitar and the flute have it as part of their channel effect, at 0.75 beat of this song's
  125 BPM (0.36 s; the original's 92 BPM gave 0.49 s), with its return
  compensated for the channel's pan law. The toms are dry.
- **Drum voices** — the original had one voice per drum. A Faust voice runs one
  guide pair set up for the drum its note selects (computing all drums in every
  voice cost ~12× the CPU); a voice changing drum starts quiet.
- **Flute voices** — 4 instead of the original's 1 (a Faust voice stays busy
  ~0.1 s after note-off, so a mono voice would drop quick notes).
- **CPU** — the generated `.ts` files mark Faust's state-array accesses
  `unchecked()` (javascriptmusic PR #247): AssemblyScript's bounds checks on
  them were the whole extra cost. With them the ports cost 1.6–2.4× the
  originals; without, 0.3–0.6× (the piano 1.0–1.1×, 75 hammer allpasses).
  The concert song renders at ~13% of one core headless (28% before).

Levels: a Faust voice adds 0.25 per side where the originals add 1.0, so the
ports multiply by 4; channel volumes in `synth.ts` set the balance.

## Live tweaks

Every slider scales one original value, 1 = the original sound, 0.02–2.56 in
steps of 0.02 so a 7-bit CC lands exactly on 1 (CC 49). `damping` is
exponential (each 0.5 multiplies the loop loss by 10). String/loop tweaks apply
from the next new note.
