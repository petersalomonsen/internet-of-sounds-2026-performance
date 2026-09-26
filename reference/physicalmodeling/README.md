# Physical modeling instruments — porting reference

Copied from `assemblyscriptphysicalmodeling/` in the NEAR repo
`ifc2026-concert.gitfactory.testnet` (last changed there in e947ca9, 2026-05-22),
and ported to Faust under `faust/`. **Reference only — nothing here is compiled
by the app.** The ports are what the concert plays (channels 10–15 in
`synth.ts`).

- `synth.ts` — the AssemblyScript instruments. Imports from `../mixes/globalimports`
  resolve to `wasmaudioworklet/synth1/assembly/` in the javascriptmusic repo
  (`DelayLine`, `BiQuadFilter`, `Envelope`, `Freeverb`, ...).
- `song.js` — the song that plays them: the note ranges and articulations worth
  matching.

## Ports

| original (ch) | port | concert ch | check |
|---|---|---|---|
| `Kick2`, `Snare2`, `Hihat` (2) | `faust/pmdrums.dsp` — one kit, same note map: c5 kick, d5 snare, fs5 hat, other notes silent | 10 | 24-hit average of decay and level matches; spectrum within ~2 dB |
| `Bass` (5) | `faust/pmbass.dsp` | 11 | sample-identical* |
| `Guitar` + `GuitarChannel` (4) | `faust/pmguitar.dsp` — the amp is the `effect` | 12 | sample-identical*, amp included |
| `Piano` (0) | `faust/pmpiano.dsp` | 13 | sample-identical* |
| `String` (1) | `faust/pmstrings.dsp` | 14 | sample-identical* |
| `Brass` (3) | `faust/pmbrass.dsp` | 15 | sample-identical* |

\* With the noise exciter replaced by the same sine in both, the port's output
is the original's to within f32 rounding (error −94 dB), fresh and on reused
voices. With the real noise they differ only as two noise draws do — the
original's generator and `no.noise`/`no.multinoise` were measured equivalent
(white, same level, independent streams).

The shared model is `faust/physmod.lib`: the `WaveGuide` (integer delay +
allpass fraction, one-pole loop low-pass not compensated in pitch — the
original sits a few cents flat, and so does the port), its two delay lines
that swap on each note, `stop()` emulated by clearing the lines once the voice
has released, plus the envelope, filters and softclip as the original computes
them. It is written out instead of using `en.adsr`/`fi.lowpass`/`fi.tf2`, so a
port behaves the same under any Faust compiler.

Differences from the original, by design:
- Mono voices: Piano and Snare2 were stereo; the port is the average of L and R.
- Dry and quieter: the original song's master stage (×0.37, widening, EQ) and
  reverb sends are that song's mix, not the instruments. The concert's channel
  volumes (CC7 in `synth.ts`) put each port level with its counterpart there.

## Live tweaks

Every slider scales one original value: **1 = the original sound**, range
0.02–2.56 in steps of 0.02, so a MIDI CC (7-bit) lands exactly on 1 at CC 49
(CC 98 = ×2, CC 25 = ×0.5). `damping` is exponential — each 0.5 multiplies the
loop loss by 10 — so it has a range whatever the original loss (bass 1e-6,
strings 5e-3).

(A slider with the default *inside* an arbitrary range — 3500 in 500–20000 —
does not survive a CC: the standalone test mix sends every default as a CC and
got 3571, a 2% brighter guitar. That is why the ranges are what they are.)

## Rendering the original as the baseline

From `wasmaudioworklet/` in the javascriptmusic repo:

```sh
node ../tools/instrumenttest/render.mjs \
  --ts <concert-repo>/reference/physicalmodeling/synth.ts \
  --channel 0 --notes c3,c4 --wav piano-orig.wav
```

To compare two builds note by note (averaged over many hits through one
instance, reverb send off), use `tools/instrumenttest/compare.mjs`.

Compare against the **dry** original: strip `postprocess()` (the song's master
stage — ×0.37 gain, stereo widening, a 20 Hz–19 kHz EQ) and the
`controlchange(...)` defaults (CC91 reverb sends put a tail on everything),
otherwise the original measures ~3× quieter than its voices really are.

Level: the originals add `signal.add(x, x)` (1.0 per side); a faust2as voice
adds `addMonoSignal(out, 0.5, 0.5)` (0.25 per side) — so a port multiplies by 4.
Compare the L+R average, not the left channel (the pan law differs by 0.6%,
and the stereo originals differ by design).

Noise-excited sounds differ on every hit, and a single hit can mislead by 3×
(render.mjs starts a fresh instance per note, so every note there is the same
draw). For a real verdict, drive original and port with the same deterministic
exciter and compare samples.
