# Internet of Sounds 2026 — a piece composed on stage

A piece composed live at the Internet of Sounds 2026 conference in Cannes, made with
**[WebAssembly Music](https://github.com/petersalomonsen/javascriptmusic)** — a browser DAW
where the notes, the arrangement and the synth instruments (written in the
[Faust](https://faust.grame.fr/) DSP language) are all *code* that compiles to WebAssembly
and runs live in the page.

The piece did not exist before the performance. It started from an **empty part** at
90 BPM. I played takes on a MIDI keyboard and directed the in-browser studio agent to build
the structure around them — "play the bass guitar on semi-quavers", "kick on every beat",
"make the bass guitar follow", "show some dancers doing the running man", "now let's create
an ending section". Every section looped until I moved on, so the piece grew while it
played.

After the show, two more prompts turned the sections into a song: *"create a complete song
out of the sections we created here, and also take into account the evolution of the
song"*, then *"make it double as long, by playing all the sections twice"*. That is what
`song.js` plays now — 74 bars, about 3:17.

The instruments are physical models — waveguide strings, piano, flute, choir, drums —
written in AssemblyScript for the 2022 song "monster is close" and ported to Faust for this
piece (see [the instruments](#the-instruments)).

## ▶ Open it

It clones this repo, compiles and plays entirely in your browser:

**[▶ Open in WebAssembly Music](https://webassemblymusic.pages.dev/?gitrepo=internet-of-sounds-2026-performance&remote=https://webassemblymusic.pages.dev/gitproxy/github.com/petersalomonsen/internet-of-sounds-2026-performance.git)**

Two tags mark the milestones:

- [`is2-2026-performance`](../../tree/is2-2026-performance) — the song as it stood when the
  performance ended: the sections built on stage, each looping until the next.
- [`full-song`](../../tree/full-song) — the arranged song, played straight through.

`studioagent-session.json` is the conversation with the studio agent: the prompts from the
stage and the two that arranged the song.

## The song

| part | what plays | picture |
| --- | --- | --- |
| `intro` | the bass guitar pumping on d | piano keys |
| `pad` | the warm pad joins | piano keys |
| `chords` | strings on Dm F Am G, the bass follows | piano keys |
| `kick` | four on the floor enters | piano keys |
| `groove` | hats and snare join | piano keys |
| `bass` | the recorded piano take over the full beat | piano keys |
| `full-kick` | G, held bass, kick and cymbal, guitar riff | dancers |
| `full-beat` | snare and hats back | dancers doing the running man |
| `full` | guitar, strings and bass; of the drums only the cymbal stays | "Internet of Sounds" spinning over a starfield |
| `ending` | the lowest tom twice, bass and strings hold a G for one beat, then silence | fade to black |

Each part plays twice, except the ending.

## How it is played

To perform it from scratch, start from the commit before `is2-2026-performance`, which has
the empty `start` part.

1. Before the show, type `/new` in the agent panel for a fresh conversation; press play: the
   `start` part loops.
2. Ask the studio agent for what comes next — "a metronome on the hi-hat", "a new part,
   8 bars of 3/4, called strings", "record strings here". `AGENT.md` is the agent's kit: the
   song's shape, the instruments, and a recipe for each of these.
3. Play the take; insert the recording; ask for the bass under it, a piano part on top, a
   variation with the choir…
4. Move between parts by typing a part name or "next" in the agent panel (or
   `sendSignal('go', '<part>')` from anywhere): the current part plays out, then the
   song moves on.

A part is always `setBeatsPerBar(3 or 4)`, `definePartStart(name)`, its layers, one awaited
pattern that gives it its length, and a `waitForSignal('go')`.
`loopParts(false);` at the top of the song plays it straight through instead; an export
always plays straight through.

## The instruments

| ch | instrument | from |
| --- | --- | --- |
| 0 | waveguide drum kit (kick, snare, hats, four toms, cymbal) | "monster is close" |
| 1 | waveguide bass | "monster is close" |
| 2 | plucked guitar with its amp and echo | "monster is close" |
| 3 | stiff-string piano with a hammer resonator | "monster is close" |
| 4 | flute | "monster is close" |
| 5 | jump pad (stacked saws) | earlier kit |
| 6 | warm pad | earlier kit |
| 7 | bowed strings | "monster is close" |
| 8 | choir | "monster is close" |
| 9 | Karplus-Strong bass guitar | Beach Drive |
| 10 | brass | "monster is close" |
| 11 | pad synth (wavetable) | "monster is close" |

The "monster is close" instruments were written in AssemblyScript in 2022 and ported to
Faust for this piece. Each port was checked against its original by driving both with the
same deterministic exciter and comparing them sample by sample; they match to within
0.1–0.3 dB. Details, and what differs by design, in
[`reference/monstertheme/README.md`](reference/monstertheme/README.md).

## What's in here

| file | what it is |
| --- | --- |
| `song.js` | the song: the instruments, the track variables and the ten parts |
| `synth.ts` | the synth: the twelve instruments on their channels, the Zita-rev1 master reverb and the mastering chain |
| `faust/` | the instruments in Faust (`m*.dsp` on `monster.lib`, plus the warm pad, jump pad, bass guitar and master reverb) and their generated AssemblyScript |
| `reference/monstertheme/` | the AssemblyScript originals of the physical-modeling instruments, and how the ports were checked |
| `shader.glsl` | the visualizer: a 3D piano keyboard that plays along with the notes, and a dancing crowd on a lit stage; the song switches between them |
| `AGENT.md` | the performance kit the studio agent works from on stage |
| `studioagent-session.json` | the studio-agent conversation from the performance and the arrangement after it |
| `sessions/` | earlier studio-agent conversations from preparing the piece |

## License

Music, instruments, code and visuals are © 2026 Peter J. Salomonsen and licensed under
[CC BY-NC 4.0](LICENSE): you may share and adapt this work for non-commercial purposes with
attribution. For commercial use, get in touch.

The Faust standard library functions used here (such as `re.zita_rev1_stereo`) keep their
own licenses.
