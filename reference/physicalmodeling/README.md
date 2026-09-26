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
