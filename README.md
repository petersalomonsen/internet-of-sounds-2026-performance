# Internet of Sounds 2026 — a piece composed on stage

A live performance for the Internet of Sounds 2026
conference in Cannes, made with **[WebAssembly Music](https://github.com/petersalomonsen/javascriptmusic)** —
a browser DAW where the notes, the arrangement and the synth instruments (written in the
[Faust](https://faust.grame.fr/) DSP language) are all *code* that compiles to WebAssembly
and runs live in the page.

The piece does not exist before the performance. It starts from an **empty part** at
90 BPM. The performer plays takes on a MIDI keyboard — strings first, then piano, then
whatever the moment asks for — and directs the in-browser studio agent to build the
structure around them: a metronome on the hi-hat, a new section of so many bars in 3/4 or
4/4, a bass that follows the chords of a take, a variation of a section on other
instruments. Every section loops until the performer moves on, so the piece grows while it
plays, and how it ends up is a surprise to everyone in the room.

The instruments are physical models — waveguide strings, piano, flute, choir, drums —
ported to Faust from the 2022 song "monster is close" (see [the instruments](#the-instruments)).

## ▶ Open it

It clones this repo, compiles and plays entirely in your browser:

**[▶ Open in WebAssembly Music](https://webassemblymusic.pages.dev/?gitrepo=internet-of-sounds-2026-performance&remote=https://webassemblymusic.pages.dev/gitproxy/github.com/petersalomonsen/internet-of-sounds-2026-performance.git)**

## How it is played

1. Before the show, type `/new` in the agent panel for a fresh conversation; press play: the
   `start` part loops.
2. Ask the studio agent for what comes next — "a metronome on the hi-hat", "a new part,
   8 bars of 3/4, called strings", "record strings here". `AGENT.md` is the agent's kit: the
   song's shape, the instruments, and a recipe for each of these.
3. Play the take; insert the recording; ask for the bass under it, a piano part on top, a
   variation with the choir…
4. Move between parts by typing a part name or "next" in the agent panel (or
   `sendSignal('go', '<part>')` from anywhere): the song leaves the current part on its next
   bar line, in that part's own meter.

A part is always `setBeatsPerBar(3 or 4)`, `definePartStart(name)`, its layers, one awaited
pattern that gives it its length, and a `waitForSignal('go', { loop: 'part', quantize: 'bar' })`.
`loopParts(false);` at the top of the song plays it straight through instead (to hear the
whole arrangement); an export always plays straight through.

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
| `song.js` | the song: the instruments, the track variables and the empty `start` part the performance grows from |
| `synth.ts` | the synth: the twelve instruments on their channels, the Zita-rev1 master reverb and the mastering chain |
| `faust/` | the instruments in Faust (`m*.dsp` on `monster.lib`, plus the warm pad, jump pad, bass guitar and master reverb) and their generated AssemblyScript |
| `reference/monstertheme/` | the AssemblyScript originals of the physical-modeling instruments, and how the ports were checked |
| `AGENT.md` | the performance kit the studio agent works from on stage |
| `shader.glsl` | the visualizer — still the one from the previous piece ("Prompted"), to be replaced |
| `sessions/` | archived studio-agent conversations from the previous piece |

## License

Music, code and visuals are © 2026 Peter J. Salomonsen and licensed under
[CC BY-NC 4.0](LICENSE): you may share and adapt this work for non-commercial
purposes with attribution.
