// Internet of Sounds 2026 — composed live on stage, from an empty part.
// Every part is a `definePartStart`, its LAYER FUNCTIONS, ONE awaited beat-keeper
// that spans it, and a `waitForSignal`. Comment out a layer line to drop it.
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

// ============ LAYERS — one function per instrument per part ============

// === PART "bassguitar" (2 bars of 4/4 = 8 beats) ===
setBeatsPerBar(4);
definePartStart('bassguitar');
// padsynth.play([ [0, d3(7.95, 100)] ]);
strings.play([
  [0,  d3(7.95, 95), a4(7.95, 95), f5(7.95, 95)],
  [8,  f3(7.95, 95), c5(7.95, 95), a5(7.95, 95)],
  [16, c3(7.95, 95), g4(7.95, 95), e5(7.95, 95)],
  [24, g3(7.95, 95), d5(7.95, 95), b5(7.95, 95)],
]);
// padsynth.play([
//   [1, a5(1.95, 90), e6(1.95, 90)],
//   [3, f5(1.95, 90), c6(1.95, 90)],
//   [5, c5(1.95, 90), g5(1.95, 90)],
// ]);
snare.play([ [7, d5(0.2, 110)], [15, d5(0.2, 110)], [23, d5(0.2, 110)], [31, d5(0.2, 110)] ]);
kick.steps(1, [ c5(0.2, 110) ].repeat(31));
hihat.steps(4, [ null, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25) ].repeat(31));
await bassguitar.steps(4, [
  ...[ d2(0.2, 100), d2(0.2, 50), d3(0.2, 100), d2(0.2, 100) ].repeat(7),
  ...[ f2(0.2, 100), f2(0.2, 50), f3(0.2, 100), f2(0.2, 100) ].repeat(7),
  ...[ c2(0.2, 100), c2(0.2, 50), c3(0.2, 100), c2(0.2, 100) ].repeat(7),
  ...[ g2(0.2, 100), g2(0.2, 50), g3(0.2, 100), g2(0.2, 100) ].repeat(7),
]);
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "chords-bass" (8 bars of 4/4 = 32 beats) ===
setBeatsPerBar(4);
definePartStart('chords-bass');
strings.play([
  [0,  d3(7.95, 95), a4(7.95, 95), f5(7.95, 95)],
  [8,  f3(7.95, 95), c5(7.95, 95), a5(7.95, 95)],
  [16, c3(7.95, 95), g4(7.95, 95), e5(7.95, 95)],
  [24, g3(7.95, 95), d5(7.95, 95), b5(7.95, 95)],
]);
bass.play([
  [0,  d2(7.95, 100)],
  [8,  f2(7.95, 100)],
  [16, c2(7.95, 100)],
  [24, g2(7.95, 100)],
]);
drums.play([ [0, f5(0.3, 110)], [8, f5(0.3, 110)], [16, f5(0.3, 110)], [24, f5(0.3, 110)] ]);
choir.play([ [0, d7(7.95, 95)], [8, c7(15.95, 95)], [24, d7(7.95, 95)] ]);
drums.steps(1, [ cs6(0.3, 90) ].repeat(31));
drums.steps(2, [ g5(0.2, 100), null, null, a5(0.2, 50), g5(0.2, 100), null, a5(0.2, 100), null ].repeat(7));
await hihat.steps(1, new Array(32));
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

loopHere();

