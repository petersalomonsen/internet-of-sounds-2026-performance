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

// --- intro (8 bars) ---
const introDrums = () => {
  kick.steps(1, [c5(0.2, 110), c5(0.2, 110), c5(0.2, 110), c5(0.2, 110)].repeat(7));
  hihat.steps(4, [ , fs5(0.1, 30), fs5(0.1, 110), fs5(0.1, 30)].repeat(31));
};
const introStrings = () => strings.play([
  [0, d3(7.95, 100), a4(7.95, 100), f5(7.95, 100)],
  [8, as3(7.95, 100), f4(7.95, 100), d5(7.95, 100)],
  [16, c4(7.95, 100), g4(7.95, 100), e5(7.95, 100)],
  [24, g3(7.95, 100), d4(7.95, 100), b4(7.95, 100)],
]);
const introPad = () => padsynth.play([ [0, d2(31.95, 100)] ]);
const introBassguitar = () => bassguitar.steps(4,
  [d2(0.2, 100), d2(0.2, 50), d3(0.2, 100), d2(0.2, 100)].repeat(31));

// --- verse (4 bars) ---
const verseDrums = () => {
  kick.steps(1, [c5(0.2, 110), c5(0.2, 110), c5(0.2, 110), c5(0.2, 110)].repeat(3));
  hihat.steps(4, [ , fs5(0.1, 30), fs5(0.1, 110), fs5(0.1, 30)].repeat(15));
};
const versePad = () => padsynth.play([ [0, d2(15.95, 100)] ]);
const verseStrings = () => strings.play([
  [0, d3(3.95, 100), a4(3.95, 100), f5(3.95, 100)],
  [4, f3(3.95, 100), c4(3.95, 100), a4(3.95, 100)],
  [8, g3(3.95, 100), d4(3.95, 100), b4(3.95, 100)],
  [12, a3(3.95, 100), e4(3.95, 100), c5(3.95, 100)],
]);
const verseBassguitar = () => bassguitar.steps(4, [
  ...[d2(0.2, 100), d2(0.2, 50), d3(0.2, 100), d2(0.2, 100)].repeat(3),
  ...[f2(0.2, 100), f2(0.2, 50), f3(0.2, 100), f2(0.2, 100)].repeat(3),
  ...[g2(0.2, 100), g2(0.2, 50), g3(0.2, 100), g2(0.2, 100)].repeat(3),
  ...[a2(0.2, 100), a2(0.2, 50), a3(0.2, 100), a2(0.2, 100)].repeat(3),
]);

// --- calm (8 bars) ---
const calmCymbal = () => drums.steps(2,
  [cs6(0.3, 100), , cs6(0.3, 50), cs6(0.3, 100), cs6(0.3, 100), , cs6(0.3, 50), null].repeat(7));
const calmToms = () => drums.steps(4, [
  f5(0.2, 120), , , f5(0.1, 25),
  ...[f5(0.2, 100), , , f5(0.1, 25)].repeat(6),
].repeat(3));
const calmBass = () => bass.play([
  [0, d2(7.95, 100)],
  [8, as1(7.95, 100)],
  [16, c2(7.95, 100)],
  [24, g1(7.95, 100)],
]);
const calmStrings = () => strings.play([
  [0, d3(7.95, 100), a4(7.95, 100), f5(7.95, 100)],
  [8, as3(7.95, 100), f4(7.95, 100), d5(7.95, 100)],
  [16, c4(7.95, 100), g4(7.95, 100), e5(7.95, 100)],
  [24, g3(7.95, 100), d4(7.95, 100), b4(7.95, 100)],
]);
const calmChoir = () => choir.play([[ 6.49, a6(0.71, 87) ],
[ 0.15, f6(7.71, 52) ],
[ 7.19, c7(0.77, 82) ],
[ 13.39, e7(0.20, 58) ],
[ 7.95, d7(5.69, 75) ],
[ 13.64, f7(0.38, 69) ],
[ 7.95, f6(7.01, 74) ],
[ 13.97, e7(0.99, 79) ],
[ 15.48, g6(1.99, 75) ],
[ 17.44, f6(1.99, 74) ],
[ 19.41, e6(2.11, 69) ],
[ 21.50, f6(1.02, 88) ],
[ 22.47, e6(1.19, 74) ],
[ 14.93, c7(9.10, 89) ],
[ 23.99, b6(3.47, 83) ],
[ 27.49, a6(2.50, 72) ],
[ 23.98, d6(8.02, 62) ],
[ 23.96, g6(8.04, 67) ]]);

// --- groove (8 bars) — calm's layers + a full beat ---
const grooveDrums = () => drums.steps(4, [
  c5(0.2, 110), fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25),
  d5(0.2, 110), fs5(0.1, 25), gs5(0.2, 100), fs5(0.1, 25),
].repeat(15));

const grooveBass = () => bass.steps(4, [
  ...[d2(0.2, 100), , d2(0.2, 100), , d3(0.2, 100), d2(0.2, 100), , null].repeat(3),
  ...[as1(0.2, 100), , as1(0.2, 100), , as2(0.2, 100), as1(0.2, 100), , null].repeat(3),
  ...[c2(0.2, 100), , c2(0.2, 100), , c3(0.2, 100), c2(0.2, 100), , null].repeat(3),
  ...[g1(0.2, 100), , g1(0.2, 100), , g2(0.2, 100), g1(0.2, 100), , null].repeat(3),
]);

const groovePiano = () => piano.steps(3, [
  ...[d4(0.3, 80), f4(0.3, 80), a4(0.3, 80)].repeat(7),
  ...[as3(0.3, 80), d4(0.3, 80), f4(0.3, 80)].repeat(7),
  ...[c4(0.3, 80), e4(0.3, 80), g4(0.3, 80)].repeat(7),
  ...[g3(0.3, 80), b3(0.3, 80), d4(0.3, 80)].repeat(7),
]);

const groovePianoTake = () => piano.play([
[ 0.75, e6(0.23, 70), a5(0.23, 79) ],
[ 1.25, e6(0.48, 63), a5(0.48, 70) ],
[ 2.00, a5(0.73, 75), e6(0.73, 72) ],
[ 2.75, a5(0.23, 59), f6(0.23, 77) ],
[ 3.75, a5(0.48, 60) ],
[ 3.25, e6(0.98, 63) ],
[ 4.75, e6(0.23, 79), a5(0.23, 77) ],
[ 5.25, a5(0.48, 67), e6(0.48, 67) ],
[ 6.00, a5(0.23, 77), e6(0.23, 75) ],
[ 6.75, f6(0.23, 82), a5(0.23, 72) ],
[ 7.25, f5(0.73, 60), d6(0.98, 75) ],
[ 8.75, f5(0.23, 77), c6(0.23, 77) ],
[ 9.25, c6(0.48, 72), f5(0.48, 67) ],
[ 10.00, f5(0.23, 65), c6(0.23, 70) ],
[ 10.75, c6(0.23, 60), f5(0.23, 48), d6(0.48, 59) ],
[ 11.25, f5(0.73, 59) ],
[ 11.75, c6(0.48, 62) ],
[ 12.75, f5(0.23, 74), c6(0.23, 82) ],
[ 13.25, f5(0.48, 72), c6(0.48, 77) ],
[ 14.00, f5(0.23, 74), c6(0.23, 78) ],
[ 14.75, c6(0.23, 75), f5(0.48, 62), d6(0.48, 68) ],
[ 15.25, f6(0.48, 95), c6(0.73, 82) ],
[ 16.00, e6(0.23, 75), g5(0.23, 79), c6(0.23, 38) ],
[ 16.75, g5(0.23, 82), c6(0.23, 74), e6(0.23, 78) ],
[ 17.25, c6(0.48, 64), g5(0.48, 70), e6(0.48, 69) ],
[ 18.00, g5(0.23, 59), c6(0.23, 69), e6(0.23, 69) ],
[ 18.75, c6(0.23, 65), g5(0.23, 68), f6(0.23, 78) ],
[ 19.25, g5(0.98, 69), e6(0.98, 69), c6(0.98, 70) ],
[ 20.25, g5(0.73, 60), e6(0.73, 60), c6(0.73, 63) ],
[ 21.25, g5(0.48, 79), c6(0.48, 78), e6(0.48, 77) ],
[ 22.00, g5(0.23, 78), c6(0.23, 79), f6(0.23, 87) ],
[ 22.75, c6(0.23, 72), e6(0.23, 77), g5(0.23, 75) ],
[ 23.25, g5(0.73, 70), d6(0.73, 67), c6(0.73, 70) ],
[ 25.25, c6(0.48, 77) ],
[ 25.75, g5(0.23, 83), d6(0.23, 74) ],
[ 27.75, c6(0.23, 67) ],
[ 28.00, d6(0.73, 84) ],
[ 28.75, c6(0.48, 62) ],
[ 29.25, b5(0.98, 69) ],
[ 27.25, g5(3.48, 55) ],
[ 30.25, a5(0.73, 79) ],
[ 31.00, g5(0.73, 77) ]
]);

// ============ ARRANGEMENT ============

// === PART "intro" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('intro');
introDrums();
introStrings();
introPad();
await introBassguitar();                 // beat-keeper: 8 bars
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "verse" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('verse');
verseDrums();
versePad();
verseStrings();
await verseBassguitar();                 // beat-keeper: 4 bars
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "calm" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('calm');
calmCymbal();
calmToms();
calmBass();
calmStrings();
calmChoir();
await hihat.steps(1, new Array(32));     // beat-keeper: 8 bars of rests
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "groove" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('groove');
grooveBass();
//groovePiano();
calmStrings();
calmChoir();
groovePianoTake();

await grooveDrums();    
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// --- breakdown (8 bars) — piano take, bass, one high string line ---
const breakdownPianoChords = () => piano.play([
  [0, d4(7.95, 85), f4(7.95, 85), a4(7.95, 85)],
  [8, as3(7.95, 85), d4(7.95, 85), f4(7.95, 85)],
  [16, c4(7.95, 85), e4(7.95, 85), g4(7.95, 85)],
  [24, g3(7.95, 85), b3(7.95, 85), d4(7.95, 85)],
]);
const breakdownHighStrings = () => strings.play([
  [0, f6(7.95, 85)],
  [8, d6(7.95, 85)],
  [16, e6(7.95, 85)],
  [24, b5(7.95, 85)],
]);

// === PART "breakdown" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('breakdown');
breakdownPianoChords();
// breakdownHighStrings();
// groovePianoTake();
await grooveBass();                      // beat-keeper: 8 bars
await waitForSignal('go', { loop: 'part', quantize: 'bar' });

loopHere();
