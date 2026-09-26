# Prompted — performance edition

An italo-disco instrumental in D minor at 125 BPM,
made with **[WebAssembly Music](https://github.com/petersalomonsen/javascriptmusic)** —
a browser DAW where the notes, the arrangement, the synth instruments (written in
the [Faust](https://faust.grame.fr/) DSP language) and the reactive visuals are all
*code* that compiles to WebAssembly and runs live in the page.

The track was built by talking to the in-browser studio agent, and that is what the
title is about: the visualizer shows the song as a live agent conversation. Each part
is introduced by a green "prompt" typed out on screen, followed by a blue reply, one
bar before the change it describes actually happens — the pad coming in, the crowd of
dancers being revealed, the disco lights, the italo-disco bass, the running man,
the final pose. The prompts describe what the song already does; none of them alter it.

The human is still the composer: the arrangement was directed step by step, the leads,
chords and the closing synth solo were played in on a MIDI keyboard, and code was read
and edited by hand where it mattered. The agent wrote and reorganised code on
instruction.

This copy of the song is set up for playing **live**: with the app's
[performance mode](https://github.com/petersalomonsen/javascriptmusic/blob/master/wasmaudioworklet/docs/song-api.md#performance-mode)
on, every section loops until it is told to move on, and any section can be jumped to by
name — see [Performing it](#performing-it) below.

## ▶ Play & edit it live

Open it straight in the app — it clones this repo, compiles, and plays entirely in
your browser:

**[▶ Open "Prompted" in WebAssembly Music](https://webassemblymusic.pages.dev/?gitrepo=internet-of-sounds-2026-performance&remote=https://webassemblymusic.pages.dev/gitproxy/github.com/petersalomonsen/internet-of-sounds-2026-performance.git)**

## Performing it

The song is divided into fourteen named parts of eight bars each (see the table below).
Every part ends with a `waitForSignal('go', { loop: 'part', quantize: 'bar' })`, so:

1. Open the song in the app and tick the **performance** checkbox next to the play control.
2. Press play. The part that is playing now **loops** until you send a signal.
3. Send `go` to move on to the next part at the next bar line, or `go` with a part name to
   jump to that part — from the browser console, a MIDI mapping, a shader element, the
   studio agent or another window:

```javascript
sendSignal('go');            // next part, on the next bar line
sendSignal('go', 'solo');    // jump to the "solo" part, on the next bar line
sendSignal('go', 'intro');   // ...or back to the start
```

A targeted signal also works while nothing is waiting (during the `ending`, for
example), so the song never has to stop. With the performance checkbox **off** the
waits are inert and the song plays exactly as written — exports are unchanged.

| part | beats | what happens |
| --- | --- | --- |
| `intro` | 4–36 | four-on-the-floor kick, off-beat hats and the pulsing intro bass; the dancer steps into the spotlight |
| `verse` | 36–68 | the detuned saw pad over Dm–F–G–Bb–C |
| `chorus` | 68–100 | the bright lead on top; the crowd is revealed |
| `chorus2` | 100–132 | the camera orbits, the disco lights come on |
| `chorus3` | 132–164 | the lead harmonised in thirds; the tiled floor |
| `break` | 164–196 | brass-like stab chords over the intro bass |
| `drop` | 196–228 | octave-pumping italo-disco bass under the recorded lead take |
| `breakdown` | 228–260 | warm low-pass pad chords with the lead melody over the beat |
| `finale` | 260–292 | the warm pad, lead and intro bass; the running man |
| `finale-stabs` | 292–324 | the brass stabs stacked on top, then the snare-roll build |
| `finale-italo` | 324–356 | italo-disco bass, double-time arms |
| `finale-italo2` | 356–388 | second italo round |
| `solo` | 388–420 | the live synth solo, first half |
| `ending` | 420–460 | the solo's second half, the two final chords, the frozen pose and the credits (no loop) |

Every part is 32 beats, so a full loop of any part is one round of the section, with
its visual cues replayed. Because the song leaves a part on the next bar line rather than
at the end of the phrase, signal in the last bar of a round for the transition to land
exactly where it does in the recorded arrangement.

## What's in here

| file | what it is |
| --- | --- |
| `song.js` | the sequence — notes, arrangement, visual cues, the on-screen agent prompts and the performance-mode part markers |
| `synth.ts` | the synth: the instruments combined in AssemblyScript, plus the Zita-rev1 master reverb and mastering chain |
| `faust/` | the instruments in Faust: from "monster is close" the waveguide kit, bass, guitar, piano, flute, strings, choir, brass and pad synth (`m*.dsp`, on `monster.lib`), plus the warm pad, jump pad, Karplus-Strong bass guitar and the master reverb |
| `reference/monstertheme/` | the AssemblyScript originals of the physical-modeling instruments ("monster is close"), and how the ports were checked against them |
| `shader.glsl` | the visualizer: a 3D stage of dancing figures under sweeping stage lights, with the typed-out prompt layer |
| `AGENT.md` | the performance kit: what the studio agent knows about this song from the first turn on stage — parts, channels, the builders in `song.js`, recipes for live changes and for recording takes |
| `studioagent-session.json` | the conversation with the studio agent that built the song — it travels with the repo |

## Structure

| part | what happens |
| --- | --- |
| intro | four-on-the-floor kick, off-beat hats and a pulsing bass on D; the first dancer steps into the spotlight |
| verse / chorus | detuned saw pad over Dm–F–G–Bb–C, then a bright lead on top, harmonised in thirds on the last round |
| break / drop | brass-like stab chords take over, then an octave-pumping italo-disco bass under a recorded lead take |
| breakdown | warm low-pass pad chords with the lead melody over the beat |
| finale | six variation rounds stacking the recorded pad, lead and stab takes, a snare-roll build, an italo section, a live synth solo, and two final chords with the dancers frozen in pose |

## License

Music, code and visuals are © 2026 Peter J. Salomonsen and licensed under
[CC BY-NC 4.0](LICENSE): you may share and adapt this work for non-commercial
purposes with attribution.
