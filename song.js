// Internet of Sounds 2026 — composed live on stage, from an empty part.
// Every part is added during the performance (see AGENT.md): a part is
// `definePartStart`, its layers, ONE awaited beat-keeper that spans it, and a
// `waitForSignal` that loops it until the performer moves on.
setBPM(90);

addInstrument('mdrums');     // 0 — kit: c5 kick, d5 snare, fs5 hat, gs5 open hat, f5 g5 a5 b5 toms, cs6 cymbal
addInstrument('mbass');      // 1
addInstrument('mguitar');    // 2
addInstrument('mpiano');     // 3
addInstrument('mflute');     // 4
addInstrument('jumppad');    // 5
addInstrument('warmpad');    // 6
addInstrument('mstrings');   // 7
addInstrument('mchoir');     // 8
addInstrument('bassguitar'); // 9
addInstrument('mbrass');     // 10
addInstrument('mpadsynth');  // 11

const kick       = createTrack(0, 4);
const hihat      = createTrack(0, 4);
const snare      = createTrack(0, 4);
const drums      = createTrack(0, 4);
const bass       = createTrack(1);
const guitar     = createTrack(2);
const piano      = createTrack(3);
const flute      = createTrack(4);
const jumppad    = createTrack(5);
const warmpad    = createTrack(6);
const strings    = createTrack(7);
const choir      = createTrack(8);
const bassguitar = createTrack(9);
const brass      = createTrack(10);
const padsynth   = createTrack(11);

// === PART "start" (4 bars of 4/4) — empty ===
setBeatsPerBar(4);
definePartStart('start');
await hihat.steps(1, new Array(16));   // 16 beats of silence: the part's length (beat-keeper)
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

loopHere();
