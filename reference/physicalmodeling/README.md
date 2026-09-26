# Physical modeling instruments — porting reference

Copied from `assemblyscriptphysicalmodeling/` in the NEAR repo
`ifc2026-concert.gitfactory.testnet` (last changed there in e947ca9, 2026-05-22),
to be ported to Faust under `faust/`. **Reference only — not part of the
concert's synth.** Nothing here is compiled by the app.

- `synth.ts` — the AssemblyScript instruments. Imports from `../mixes/globalimports`
  resolve to `wasmaudioworklet/synth1/assembly/` in the javascriptmusic repo
  (`DelayLine`, `BiQuadFilter`, `Envelope`, `Freeverb`, ...).
- `song.js` — the song that plays them: the note ranges and articulations worth
  matching.

## Channel map (`initializeMidiSynth`)

| ch | instrument | notes |
|----|------------|-------|
| 0 | `Piano` | |
| 1 | `String` | |
| 2 | drums | one note each: `Kick2` c5 (60), `Snare2` d5 (62), `Hihat` fs5 (66); other notes are silent |
| 3 | `Brass` | |
| 4 | `Guitar` | uses `GuitarChannel` |
| 5 | `Bass` | |

Shared building blocks: `WaveGuide`, `OnePole`, `AllPass`, `DelayLineFloat`;
`MultiBandEQ` is master processing.

## Rendering the original as the baseline

From `wasmaudioworklet/` in the javascriptmusic repo:

```sh
node ../tools/instrumenttest/render.mjs \
  --ts <concert-repo>/reference/physicalmodeling/synth.ts \
  --channel 0 --notes c3,c4 --wav piano-orig.wav
```

Render the Faust port with the same notes (`render.mjs faust/<name>.dsp`) and
compare peak/RMS, spectrum and decay per note.

Compare against the **dry** original: strip `postprocess()` (the song's master
stage — ×0.37 gain, stereo widening, a 20 Hz–19 kHz EQ) and the
`controlchange(...)` defaults (CC91 reverb sends put a tail on everything),
otherwise the original measures ~3× quieter than its voices really are.

Level: the originals add `signal.add(x, x)` (1.0 per side); a faust2as voice
adds `addMonoSignal(out, 0.5, 0.5)` (0.25 per side) — so a port multiplies by 4.

Noise-based sounds (all the drums) differ on every hit, and a single hit can
mislead by 3×: compare decay and level averaged over many hits played through
one instance (render.mjs starts a fresh instance per note, so every note there
is the same draw).

## Ports

| original | port | status |
|---|---|---|
| `Kick2`, `Snare2`, `Hihat` | `faust/pmdrums.dsp` (`Pmdrums`) — one kit, same note map | matches (24-hit average of decay and level; spectrum within ~2 dB) |
| `Bass`, `Guitar`, `Piano`, `String`, `Brass` | — | to do |
