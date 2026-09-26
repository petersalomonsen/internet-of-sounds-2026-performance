# Prompted — performance kit

You are on stage with this song. The performer talks to you between and during parts,
often by voice, and the song keeps looping the current part while you work. What they
want is a **few seconds** to the change, never a long think. Everything you need to know
about this song is in this file — read it, don't rediscover it.

## How to behave on stage

- **Act, then answer in one short line.** No questions unless two readings are truly
  different. No plans, no summaries, no "let me look at". Never ask to confirm.
- **One edit, one compile.** Every change below is a small `edit_song` (or a `run_script`)
  followed by `compile`. The compiled song is hot-swapped into the running sequencer; the
  part that is looping picks it up when it wraps. Do not read the whole song first —
  `grep_song` for the part name or the builder name you need, edit, compile.
- **Use the palette.** The song is built from named builders (below). Changing a part means
  calling a different builder in it, or commenting one out — not writing new patterns.
- **Never design a new instrument on stage** (`design_instrument` takes minutes). Every sound
  needed is already a voice on a channel. Extra voices exist as alternates (see channels).
- **Moving between parts is not an edit.** With performance mode on, a part name or
  "next" typed in the panel jumps by itself; `go_to_part` / `send_signal` do the same from
  your tools. Never edit the song to change the order live.
- **Do not touch:** `setBPM(125)`, the `part(...)` calls and their order, the `waitForSignal`
  inside `part()`, `addInstrument` lines, the caption layer (`agentPrompt`, `AGENT_OPTS`,
  the credits at the end), `shader.glsl`, `studioagent-session.json`.

## The song at a glance

Italo-disco instrumental, **D minor, 125 BPM, 4/4**. A bar is 4 beats; **every part is
32 beats = 8 bars**, and every builder spans one part (32 beats) unless it takes a `beats`
argument. `steps(4, [...])` is four steps per beat (16ths); `steps(1, [...])` one per beat.
Progression of the verse/chorus parts: **Dm – F – G – A#(Bb) – C** (8+8+8+4+4 beats).
The italo bass follows **D C G A# F C G A#** (2 beats each) in `italoBassLine`, and
**Dm C G (×3), A# C G** in the finale (`finaleItaloBass`).

## Parts, in order (each 32 beats)

| part | what plays | built from |
|---|---|---|
| `intro` | kick, off-beat hats, pulsing D bass; second round the dancer steps in | inline `introBass.steps` / `introHihat.steps` / `introKick.steps` |
| `verse` | the detuned saw pad on the progression, four-on-the-floor | inline `pad.steps`, `bass.steps`, `hihat.steps`, `kick.steps` per chord section |
| `chorus` | + the bright lead; crowd revealed | `playPadlead()` |
| `chorus2` | camera orbits, disco lights | `playPadlead()` |
| `chorus3` | lead harmonised in thirds; tiled floor | `playPadlead()` + `playPadleadHarmony()` |
| `break` | brass-like stab chords over the intro bass (two playthroughs) | `playJumpChords()`, `introHats()`, `introBassLine()`, `introKick.steps` |
| `drop` | italo octave bass under the recorded lead take | inline `createTrack(4).play([...])` take, `italoBassLine()` |
| `breakdown` | warm low-pass pad chords + lead melody over the italo beat (2 rounds) | `warmpad.play`, `createTrack(4).play(...).quantize(4)`, `italoHats(16)`, `italoSnareFillA/B(16)`, `italoBassLine()` |
| `finale` | warm pad + lead + intro D bass; running man | `finaleWarmpad()`, `finaleLead()`, `finaleHats()`, `finaleIntroBass()` |
| `finale-stabs` | + jump-pad brass stabs, snare-roll build at the end | + `finaleJump()`, `finaleBackbeatFill()` |
| `finale-italo` | italo bass, double-time arms | `italoHats(32)`, `italoSnareFillA(32)`, `finaleItaloBass()`, `finaleKick()` |
| `finale-italo2` | second italo round | same |
| `solo` | the live synth solo (ch 8) over backbeat + descending bass | `finaleSolo()`, `finaleHats()`, `finaleBackbeat(32)`, `finaleDescBass()` |
| `ending` | solo's second half, two final chords, frozen pose, credits (no loop) | `finaleStrings()`, `finaleHats(28)`, `finaleBackbeat(28)`, `finaleDescBassEnding()`, `finaleKickEnding()` |

The verse/chorus parts are one `for (rep…)` loop (`part(['verse','chorus','chorus2','chorus3'][rep])`);
the six finale parts are one `for (round…)` loop. A change to *one* of them is an
`if (rep === N)` / `if (round === N)` guard, exactly as the existing visual cues do it.
In every part the **awaited kick pattern is the beat-keeper** (`await kick.steps(...)` /
`await introKick.steps(...)` / `await finaleKick()`): everything else in the part is
layered *before* it, un-awaited. Keep that shape.

## Channels and instruments

| ch | track variable | voice (faust/) | character | notes |
|---|---|---|---|---|
| 0 | `kick`, `introKick` | `Kick` | four-on-the-floor kick (`c2`) | |
| 1 | `hihat`, `introHihat` | `Hihat` | off-beat hats (`fs3`), filtered noise — pitch ignored | |
| 2 | `pad` | `Pad` | detuned dual saws, the verse chords | |
| 3 | `bass`, `introBass` | `Bass` | saw + sub octave; intro pulse and italo octaves | |
| 4 | `padlead` / `createTrack(4)` | `Padlead3` + channel with tempo echo | the bright lead, recorded takes | alternates `padlead`, `padlead2` exist |
| 5 | `createTrack(5)` | `Jumppad2` + channel | OB-Xa style stacked saws: the '84 brass stabs | alternate `jumppad` exists |
| 6 | `warmpad` | `Warmpad` | low-passed warm pad, breakdown/finale chords | |
| 7 | `snare` | `Snare` | backbeat and fills (`d3`) | `createTrack(7, 1)`: one step per beat |
| 8 | `createTrack(8)` | `Sololead` + channel | the live solo lead; **the keyboard channel on stage** | CC 0 vibrato depth, 1 vibrato rate, 2 cutoff, 3 resonance, 4 drive |
| 9 | `bassguitar` | `Bassguitar` | Karplus-Strong bass guitar (from Beach Drive) | |
| 10 | `createTrack(10)` | `Pmdrums` | physical-modeling kit (noise drums): **c5 kick, d5 snare, fs5 hat**, other notes silent | CC 0 hat cutoff, 1 hat decay, 2 hat level, 3 kick click, 4 kick decay, 5 kick level, 6 kick sweep, 8 snare decay, 9 snare level, 11 snare snap |
| 11 | `createTrack(11)` | `Pmbass` | waveguide bass, long bright ring | CC 0 bright, 1 damping, 2 exciter tone, 3 pluck |
| 12 | `createTrack(12)` | `Pmguitar` + amp | plucked waveguide guitar through a soft-clip amp | CC 0 bright, 1 damping, 2 exciter tone, 3 drive, 4 amp feedback |
| 13 | `createTrack(13)` | `Pmpiano` | three-string waveguide piano | CC 0 bright, 1 damping, 2 hammer tone |
| 14 | `createTrack(14)` | `Pmstrings` | bowed waveguide string, slow swell | CC 0 bow tone, 1 bright, 2 damping |
| 15 | `createTrack(15)` | `Pmbrass` | two bright waveguides, breathy attack | CC 0 breath tone, 1 bright, 2 damping |

Channels 10–15 (the `Pm…` physical-modeling instruments, `faust/physmod.lib`; track
variables `pmdrums` … `pmbrass`) play in the current song: piano arpeggio and strings in
`part2`, strings and guitar chops in `part4`, all six in `part5`. Reshape them live with
their CCs. The
CCs all work the same way: **CC 49 = the original sound**, CC 98 ≈ ×2, CC 25 ≈ ×½ of that
quantity (`damping` is exponential: lower rings longer).

`synth.ts` also runs a Zita-rev1 master reverb over the whole mix (`masterReverbWet = 0.30`)
and the mastering chain (`gainDb 13`, ceiling −1.5 dBTP, high-pass 35 Hz). Leave both alone
on stage unless asked; "more reverb" is the one constant, "louder" is not a mastering change.

## The palette — builders in song.js

Drums (`hihat`/`snare` tracks; `beats` = length, default one part):
- `italoHats(beats)` — hats on the 2/4 and 3/4 of every beat (the italo feel).
- `italoSnare(beats)` — snare on 2 & 4.
- `italoSnareFillA(beats)` — backbeat + ONE extra snare before the last beat (simple fill).
- `italoSnareFillB(beats)` — backbeat + a 16th-note fill on the last two beats (transition fill).
- `introHats()` — the sparse intro hats (one per beat, off-beat).
- `finaleHats(beats)` — hats on every 16th with accents (busier than `italoHats`),
  `finaleBackbeat(beats)`, `finaleBackbeatFill()` (rolling 16th crescendo over the last
  4 beats), `finaleKick()` (awaited beat-keeper, 32 beats), `finaleKickEnding()` (kick to
  beat 28, then only the two stabs).

Bass (`bass`/`introBass`):
- `introBassLine()` — the pulsing D pedal `d2(0.2), d2(0.1)…` with the octave lift.
- `italoBassLine()` — octave pump over D C G A# F C G A#.
- `finaleIntroBass()` (plain D pedal, 32 beats), `finaleItaloBass()` (Dm C G ×3, A# C G),
  `finaleDescBass()` (D pedal 6 bars, then A#, C, G), `finaleDescBassEnding()`.

Chords and leads:
- `playPadlead()` — the chorus lead (ch 4). `playPadleadHarmony()` — thirds under it.
- `playJumpChords()` — the '84 brass stabs (ch 5), **16 beats**: a full part needs it twice,
  the second call at beat 16 (the `break` part does two playthroughs of 16).
- `finaleWarmpad()` — recorded warm-pad chords (ch 6); `finaleStrings()` the string-like take.
- `finaleJump()` — the finale stab take (ch 5). `finaleLead(ending)` — the finale lead (ch 4).
- `finaleSolo()` — the recorded solo (ch 8), spans two parts.

Captions: `agentPrompt(cmd, reply)` types a green command and a blue reply on screen,
placed **one bar before** the change it announces. Only add one when asked to "say" or
"announce" something; keep it to the same two-line shape.

Visuals (`setVisual(name, value, rampSeconds)`; all 0 → 1 unless noted): `uHero` (dancer
steps in), `uCrowd` (crowd revealed), `uZoom` (pull back), `uCamMove` (orbit), `uLights`
(disco rig), `uFloor` (tiles), `uItalo` (double-time arms; 0 = one move per beat),
`uRunning` (running man), `uEndPose` (0 dancing, 1 pose A, 2 pose B).

## Recipes (what to do when the performer says…)

- **"Change the drums in X" / "italo hats in the verse"**: in that part, add a builder call
  before the awaited kick (`italoHats(32); italoSnare(32);`) — for a loop part, guard it
  with `if (rep === N)` / `if (round === N)`. Compile.
- **"Drop the hats" / "no snare here"**: comment out that builder call (or the inline
  `hihat.steps`) in that part. Compile.
- **"Half-time"**: replace the snare builder with `snare.play([[3, d3], [7, d3], …])`
  (snare on beat 4 of every bar) via a short `run_script` that generates the rows.
- **"Add the stabs" / "brass"**: in a verse/chorus part add `playJumpChords();` at the
  part start AND again where "Section 3: G major" begins (beat 16), since it is 16 beats;
  in a finale part add `finaleJump();` (a full 32). Before the awaited kick, as always.
- **"Italo bass in the chorus"**: add `italoBassLine();` and comment out that section's
  inline `bass.steps` (the intro/verse bass is inline, not a builder).
- **"Warm pad under the chorus"**: add `finaleWarmpad();` — it is 32 beats of the finale
  chords, so it fits any part rhythmically; the harmony differs (Dm C G A#), say so.
- **"Bring the lead in earlier"**: `playPadlead();` in the part; **"thirds"**: add
  `playPadleadHarmony();`.
- **"Longer" / "again"**: nothing to edit — the part loops until told to go on. Say so.
- **"Fill into the next part"**: swap `italoSnareFillA` → `italoSnareFillB` (or add
  `finaleBackbeatFill()` in a finale part).
- **"More echo on the solo"** while playing: the solo channel's echo is a channel field,
  not a CC; leave it. Vibrato/cutoff/resonance/drive on ch 8 are CC 0–4 (`controlchange`).
- **"Play it on the piano / guitar / strings" (physical modeling)**: change that block's
  `createTrack(N)` to 13 / 12 / 14 (brass 15, bass 11). Compile. **"Brighter" / "longer
  ring" / "more drive"** on one of them: `createTrack(13).steps(1, [ controlchange(0, 98) ]);`
  at the part start (channel 13, CC 0 bright, ×2; CC 49 is the original — see the channel
  table). Compile.
- **Lights / crowd / camera**: `setVisual('uLights', 1, 3.0)` etc. at the start of the
  part (guarded in a loop part). "Dark" is the same name to `0`.

Every edit: keep the part's length at 32 beats (a builder without `beats` already is),
keep the awaited kick as the last statement of the part, and `compile`. If compile
reports the song is no longer a whole number of bars, you broke a length — undo it.

## Recording on stage

The performer plays the keyboard live on **channel 8 (the solo lead)** or, when they
select another instrument in the app, that channel. A take is captured only between
record markers in the song:

1. **"Record over the chorus"** → in that part put `startRecording();` before the layers
   and `stopRecording();` after the awaited kick (guard with `if (rep === N)` in a loop
   part). Remove any other `startRecording()` in the song first — one armed part at a time.
   Compile; tell them "armed — play when it comes round".
2. After the take the performer presses the app's *insert recording* button (or asks you):
   the notes land in the song as `createTrack(N).play([[beat, note(dur, vel)], …])` at the
   editor cursor. Then move that block into the part where it belongs (a `run_script`
   with `findPlayBlocks(song)` finds it) and remove the markers.
3. **"Fix the timing"** → `.quantize(4)` on that play block (16ths), `.quantize(2)` for
   8ths. **"Separate the chords from the melody"** → the run_script recipe:
   `groupByBeat(take.notes, 0.1)`, chords (2+ notes) to the pad/warm pad track, single
   notes stay on the lead; `formatNotes(...)` writes them back. Keep the velocities.
4. **"Play it back on the warm pad"** → change the block's `createTrack(4)` to `warmpad`
   (ch 6) or `createTrack(5)` for the stabs. Compile.

## What the performance mode does for you

Every part ends in `waitForSignal('go', { loop: 'part', quantize: 'bar' })` (inside the
`part()` helper). The current part loops; a signal leaves it on the next bar line;
`sendSignal('go', 'solo')` jumps to a part. A recompile while a part loops keeps the
position and re-enters the wait when it comes round, so an edit to the *current* part is
heard on its next pass — say "next round" when you report a change.
