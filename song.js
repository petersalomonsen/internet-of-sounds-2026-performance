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

function padsynthTake() {
  createTrack(11).play([[ 0.12, controlchange(64, 0) ],
  [ 1.11, controlchange(64, 127) ],
  [ 1.39, controlchange(64, 0) ],
  [ 2.96, controlchange(64, 127) ],
  [ 1.95, a5(1.38, 84) ],
  [ 1.95, e6(1.42, 82) ],
  [ 4.12, f5(0.73, 62) ],
  [ 4.10, c6(0.77, 65) ],
  [ 6.11, controlchange(64, 0) ],
  [ 6.31, controlchange(64, 127) ],
  [ 6.01, g5(1.32, 72) ],
  [ 6.02, c5(1.44, 67) ],
  [ 0.08, d3(7.56, 83) ],
  [ 8.11, controlchange(64, 0) ],
  [ 8.39, controlchange(64, 127) ],
  [ 8.02, a4(1.84, 64) ],
  [ 8.01, f5(2.46, 69) ],
  [ 8.02, f3(2.54, 63) ],
  [ 10.72, controlchange(64, 0) ],
  [ 10.85, controlchange(64, 127) ],
  [ 10.59, b4(0.72, 78) ],
  [ 10.58, g4(0.73, 78) ],
  [ 10.58, g3(1.34, 78) ],
  [ 10.59, d5(1.40, 67) ],
  [ 12.12, controlchange(64, 0) ],
  [ 12.30, controlchange(64, 127) ],
  [ 12.00, c5(2.07, 69) ],
  [ 12.02, a4(2.13, 75) ],
  [ 12.02, e5(2.19, 55) ],
  [ 12.02, a3(2.37, 60) ],
  [ 14.72, controlchange(64, 0) ],
  [ 15.13, controlchange(64, 127) ],
  [ 14.55, a4(0.96, 78) ],
  [ 14.56, g3(0.98, 70) ],
  [ 14.55, b4(1.03, 78) ],
  [ 14.55, d5(1.08, 69) ]].quantize(4));
}
function bassDrone() {
bassguitar.play([
[ 0.00, d2(0.24, 100) ],
[ 0.25, d2(0.24, 50) ],
[ 0.50, d3(0.24, 100) ],
[ 0.75, d2(0.24, 100) ],
[ 1.00, d2(0.24, 100) ],
[ 1.25, d2(0.24, 50) ],
[ 1.50, d3(0.24, 100) ],
[ 1.75, d2(0.24, 100) ],
[ 2.00, d2(0.24, 100) ],
[ 2.25, d2(0.24, 50) ],
[ 2.50, d3(0.24, 100) ],
[ 2.75, d2(0.24, 100) ],
[ 3.00, d2(0.24, 100) ],
[ 3.25, d2(0.24, 50) ],
[ 3.50, d3(0.24, 100) ],
[ 3.75, d2(0.24, 100) ],
[ 4.00, d2(0.24, 100) ],
[ 4.25, d2(0.24, 50) ],
[ 4.50, d3(0.24, 100) ],
[ 4.75, d2(0.24, 100) ],
[ 5.00, d2(0.24, 100) ],
[ 5.25, d2(0.24, 50) ],
[ 5.50, d3(0.24, 100) ],
[ 5.75, d2(0.24, 100) ],
[ 6.00, d2(0.24, 100) ],
[ 6.25, d2(0.24, 50) ],
[ 6.50, d3(0.24, 100) ],
[ 6.75, d2(0.24, 100) ],
[ 7.00, d2(0.24, 100) ],
[ 7.25, d2(0.24, 50) ],
[ 7.50, d3(0.24, 100) ],
[ 7.75, d2(0.24, 100) ],
[ 8.00, d2(0.24, 100) ],
[ 8.25, d2(0.24, 50) ],
[ 8.50, d3(0.24, 100) ],
[ 8.75, d2(0.24, 100) ],
[ 9.00, d2(0.24, 100) ],
[ 9.25, d2(0.24, 50) ],
[ 9.50, d3(0.24, 100) ],
[ 9.75, d2(0.24, 100) ],
[ 10.00, d2(0.24, 100) ],
[ 10.25, d2(0.24, 50) ],
[ 10.50, d3(0.24, 100) ],
[ 10.75, d2(0.24, 100) ],
[ 11.00, d2(0.24, 100) ],
[ 11.25, d2(0.24, 50) ],
[ 11.50, d3(0.24, 100) ],
[ 11.75, d2(0.24, 100) ],
[ 12.00, d2(0.24, 100) ],
[ 12.25, d2(0.24, 50) ],
[ 12.50, d3(0.24, 100) ],
[ 12.75, d2(0.24, 100) ],
[ 13.00, d2(0.24, 100) ],
[ 13.25, d2(0.24, 50) ],
[ 13.50, d3(0.24, 100) ],
[ 13.75, d2(0.24, 100) ],
[ 14.00, d2(0.24, 100) ],
[ 14.25, d2(0.24, 50) ],
[ 14.50, d3(0.24, 100) ],
[ 14.75, d2(0.24, 100) ],
[ 15.00, d2(0.24, 100) ],
[ 15.25, d2(0.24, 50) ],
[ 15.50, d3(0.24, 100) ],
[ 15.75, d2(0.24, 100) ]]);   // 16ths on d: 1 e & a
}

function bassChords() {
bassguitar.play([
[ 0.00, d2(0.24, 100) ],
[ 0.25, d2(0.24, 50) ],
[ 0.50, d3(0.24, 100) ],
[ 0.75, d2(0.24, 100) ],
[ 1.00, d2(0.24, 100) ],
[ 1.25, d2(0.24, 50) ],
[ 1.50, d3(0.24, 100) ],
[ 1.75, d2(0.24, 100) ],
[ 2.00, d2(0.24, 100) ],
[ 2.25, d2(0.24, 50) ],
[ 2.50, d3(0.24, 100) ],
[ 2.75, d2(0.24, 100) ],
[ 3.00, d2(0.24, 100) ],
[ 3.25, d2(0.24, 50) ],
[ 3.50, d3(0.24, 100) ],
[ 3.75, d2(0.24, 100) ],
[ 4.00, d2(0.24, 100) ],
[ 4.25, d2(0.24, 50) ],
[ 4.50, d3(0.24, 100) ],
[ 4.75, d2(0.24, 100) ],
[ 5.00, d2(0.24, 100) ],
[ 5.25, d2(0.24, 50) ],
[ 5.50, d3(0.24, 100) ],
[ 5.75, d2(0.24, 100) ],
[ 6.00, d2(0.24, 100) ],
[ 6.25, d2(0.24, 50) ],
[ 6.50, d3(0.24, 100) ],
[ 6.75, d2(0.24, 100) ],
[ 7.00, d2(0.24, 100) ],
[ 7.25, d2(0.24, 50) ],
[ 7.50, d3(0.24, 100) ],
[ 7.75, d2(0.24, 100) ],
[ 8.00, f2(0.24, 100) ],
[ 8.25, f2(0.24, 50) ],
[ 8.50, f3(0.24, 100) ],
[ 8.75, f2(0.24, 100) ],
[ 9.00, f2(0.24, 100) ],
[ 9.25, f2(0.24, 50) ],
[ 9.50, f3(0.24, 100) ],
[ 9.75, f2(0.24, 100) ],
[ 10.00, f2(0.24, 100) ],
[ 10.25, f2(0.24, 50) ],
[ 10.50, g3(0.24, 100) ],
[ 10.75, g2(0.24, 100) ],
[ 11.00, g2(0.24, 100) ],
[ 11.25, g2(0.24, 50) ],
[ 11.50, g3(0.24, 100) ],
[ 11.75, g2(0.24, 100) ],
[ 12.00, a2(0.24, 100) ],
[ 12.25, a2(0.24, 50) ],
[ 12.50, a3(0.24, 100) ],
[ 12.75, a2(0.24, 100) ],
[ 13.00, a2(0.24, 100) ],
[ 13.25, a2(0.24, 50) ],
[ 13.50, a3(0.24, 100) ],
[ 13.75, a2(0.24, 100) ],
[ 14.00, a2(0.24, 100) ],
[ 14.25, a2(0.24, 50) ],
[ 14.50, g3(0.24, 100) ],
[ 14.75, g2(0.24, 100) ],
[ 15.00, g2(0.24, 100) ],
[ 15.25, g2(0.24, 50) ],
[ 15.50, g3(0.24, 100) ],
[ 15.75, g2(0.24, 100) ]]);   // 16ths, roots follow the pad: d f g a g
}

function beat4() {
kick.steps(4, [c5(0.1, 100), , , null].repeat(15));
hihat.steps(4, [, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25)].repeat(15));
}

// === PART "bass-d" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('bass-d');
bassDrone();
await hihat.steps(1, new Array(16));   // 16 beats: the part's length (beat-keeper)
// await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "bass-chords" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('bass-chords');
bassChords();
await hihat.steps(1, new Array(16));   // 16 beats: the part's length (beat-keeper)
// await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "beat" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('beat');
bassChords();
beat4();
await hihat.steps(1, new Array(16));   // 16 beats: the part's length (beat-keeper)
// await waitForSignal('go', { loop: 'part', quantize: 'bar' });

// === PART "pad" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('pad');
bassChords();
beat4();
padsynthTake();
await hihat.steps(1, new Array(16));   // 16 beats: the part's length (beat-keeper)
// await waitForSignal('go', { loop: 'part', quantize: 'bar' });

loopHere();
