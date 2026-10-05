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

const pluck = (lo, hi) => [lo(0.24, 100), lo(0.24, 50), hi(0.24, 100), lo(0.24, 100)];  // one beat of 16ths
const roots = [[d2, d3], [f2, f3], [a2, a3], [c2, c3]];                                  // a root per 2 beats
function bassPluck() {                                                                   // 8 bars of 4/4
  return bassguitar.steps(4, roots.flatMap(([lo, hi]) => pluck(lo, hi).repeat(1)).repeat(3));
}

function bassPluckD() {      // 8 bars of 4/4, all on d
  return bassguitar.steps(4, pluck(d2, d3).repeat(31));
}
function stringsDrone() {    // d3 + a4, re-bowed every 2 bars
  strings.steps(0.125, [[d3(7.9, 90), a4(7.9, 90)]].repeat(3));
}

function stringsChords() {   // Dm F Am C on the strings, two beats each, over 8 bars
  strings.steps(0.5, [
    [d4(1.95, 90), f4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), f4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), e4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), e4(1.95, 90), g4(1.95, 90)],
  ].repeat(3));
}

function padChords() {       // Dm F Am C, two beats each, twice over the 8 bars
  warmpad.steps(0.5, [
    [d4(1.95, 90), f4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), f4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), e4(1.95, 90), a4(1.95, 90)],
    [c4(1.95, 90), e4(1.95, 90), g4(1.95, 90)],
  ].repeat(3));
}

function melody() { piano.play([
[ 0.00, a6(0.39, 75) ],
[ 1.05, a6(0.62, 79) ],
[ 2.03, g6(0.44, 67) ],
[ 2.56, f6(0.43, 55) ],
[ 3.03, d6(0.51, 60) ],
[ 3.59, c6(3.40, 62) ],
[ 6.99, d6(0.56, 64) ],
[ 7.50, e6(0.55, 72) ],
[ 8.06, f6(0.48, 89) ],
[ 8.55, e6(0.46, 70) ],
[ 9.00, d6(0.57, 69) ],
[ 9.56, a5(1.89, 79) ],
[ 10.56, d6(0.94, 64) ],
[ 11.53, c6(3.59, 83) ],
[ 16.00, a6(0.39, 75) ],
[ 17.05, a6(0.62, 79) ],
[ 18.03, g6(0.44, 67) ],
[ 18.56, f6(0.43, 55) ],
[ 19.03, d6(0.51, 60) ],
[ 19.59, c6(3.40, 62) ],
[ 22.48, controlchange(64, 127) ],
[ 22.69, controlchange(64, 0) ],
[ 22.99, d6(0.56, 64) ],
[ 23.50, e6(0.55, 72) ],
[ 24.02, f6(0.41, 79) ],
[ 24.07, controlchange(64, 127) ],
[ 24.48, e6(0.51, 68) ],
[ 25.00, d6(0.52, 68) ],
[ 25.50, f6(1.24, 77) ],
[ 25.73, controlchange(64, 0) ],
[ 25.97, controlchange(64, 127) ],
[ 27.02, controlchange(64, 0) ],
[ 27.03, a6(0.43, 98) ],
[ 27.17, controlchange(64, 127) ],
[ 27.48, f6(0.22, 79) ],
[ 27.76, g6(1.07, 78) ],
[ 27.79, controlchange(64, 0) ],
[ 28.14, controlchange(64, 127) ],
[ 30.01, controlchange(64, 0) ]
]); }

// === PART "main" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('main');
// melody();                 // piano muted for now
padChords();
await bassPluck();
await waitForSignal('go');

// === PART "main-piano" (8 bars of 4/4) — pad chords + bass + the piano melody ===
setBeatsPerBar(4);
definePartStart('main-piano');
padChords();
melody();
await bassPluck();
await waitForSignal('go');

// === PART "dstrings" (8 bars of 4/4) — bass on d, strings drone d3 + a4 ===
setBeatsPerBar(4);
definePartStart('dstrings');
stringsChords();
kick.steps(1, [c5(0.2, 110)].repeat(31));
hihat.steps(4, [null, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25)].repeat(31));  // e & a, no downbeat
snare.steps(1, [null, d5(0.2, 100)].repeat(15));                               // beats 2 and 4
await bassPluck();
await waitForSignal('go');

// === PART "fbass" (4 bars of 4/4) — kick on every beat, bass plucking 16ths in F ===
setBeatsPerBar(4);
definePartStart('fbass');
snare.steps(2, Array.from({ length: 32 }, (_, i) => d5(0.2, 25 + Math.round(i * 100 / 31))));  // build-up on every quaver
createTrack(3).play([[ 0.16, controlchange(64, 127) ],
[ 0.03, f6(1.08, 78) ],
[ 1.54, f6(0.50, 79) ],
[ 2.04, g6(0.52, 84) ],
[ 0.07, f5(2.99, 52) ],
[ 0.05, c6(3.07, 54) ],
[ 2.55, a6(0.97, 87) ],
[ 4.18, controlchange(64, 0) ],
[ 4.38, controlchange(64, 127) ],
[ 3.54, g6(3.45, 89) ],
[ 6.52, d6(0.50, 62) ],
[ 6.98, e6(0.40, 82) ],
[ 4.08, c5(3.48, 47) ],
[ 4.07, g5(3.52, 39) ],
[ 8.07, controlchange(64, 0) ],
[ 8.20, controlchange(64, 127) ],
[ 7.48, f6(0.98, 88) ],
[ 8.45, e6(0.49, 62) ],
[ 8.95, d6(0.53, 68) ],
[ 9.48, f6(1.49, 72) ],
[ 8.04, d5(3.22, 38) ],
[ 8.05, a5(3.37, 47) ],
[ 10.99, a6(0.51, 94) ],
[ 11.49, f6(0.17, 67) ],
[ 12.04, controlchange(64, 0) ],
[ 12.14, controlchange(64, 127) ],
[ 11.97, as6(0.50, 73) ],
[ 12.46, a6(0.56, 67) ],
[ 12.00, d6(1.07, 64) ],
[ 12.00, as4(1.25, 47) ],
[ 12.00, as5(1.27, 47) ],
[ 13.04, f6(0.26, 77) ],
[ 14.06, controlchange(64, 0) ],
[ 14.17, controlchange(64, 127) ],
[ 13.98, g5(0.91, 47) ],
[ 14.00, c5(0.90, 47) ],
[ 13.43, g6(1.61, 77) ],
[ 15.97, controlchange(64, 0) ]].quantize(4));
createTrack(2).play([[ 0.06, controlchange(64, 0) ],
[ 0.97, controlchange(64, 127) ],
[ 0.49, f5(0.73, 69) ],
[ 1.00, c6(0.45, 82) ],
[ 1.45, f5(0.51, 35) ],
[ 1.98, c6(0.39, 87) ],
[ 3.02, d6(0.40, 79) ],
[ 2.47, f5(1.07, 42) ],
[ 3.98, controlchange(64, 0) ],
[ 4.09, controlchange(64, 127) ],
[ 3.48, c6(1.00, 49) ],
[ 4.51, f5(0.51, 60) ],
[ 5.03, c6(0.45, 82) ],
[ 5.52, f5(0.46, 47) ],
[ 6.03, c6(0.43, 77) ],
[ 6.50, f5(0.52, 60) ],
[ 7.04, d6(0.29, 78) ],
[ 7.92, controlchange(64, 0) ],
[ 8.09, controlchange(64, 127) ],
[ 7.53, c6(0.86, 78) ],
[ 8.52, f5(0.46, 58) ],
[ 9.03, c6(0.37, 88) ],
[ 9.49, f5(0.44, 64) ],
[ 10.00, c6(0.32, 77) ],
[ 10.48, f5(0.51, 47) ],
[ 11.01, d6(0.49, 83) ],
[ 11.82, controlchange(64, 0) ],
[ 12.03, controlchange(64, 127) ],
[ 11.49, c6(0.96, 77) ],
[ 12.50, f5(0.51, 70) ],
[ 13.03, c6(0.40, 83) ],
[ 13.51, f5(0.42, 49) ],
[ 14.08, controlchange(64, 0) ],
[ 14.15, controlchange(64, 127) ],
[ 14.00, as5(0.52, 91) ],
[ 15.08, controlchange(64, 0) ],
[ 15.60, controlchange(64, 127) ],
[ 15.03, f5(0.64, 67) ],
[ 14.51, c6(1.48, 70) ],
[ 15.61, g5(0.39, 82) ]].quantize(4));

bass.play([                        // roots: F C Dm (4 beats), Bb C (2 beats)
  [ 0, f2(3.95, 100) ],
  [ 4, c3(3.95, 100) ],
  [ 8, d2(3.95, 100) ],
  [ 12, as2(1.95, 100) ],
  [ 14, c3(1.95, 100) ]
]);
strings.play([
  [ 0, f4(3.95, 90), a4(3.95, 90), c5(3.95, 90) ],
  [ 4, c4(3.95, 90), e4(3.95, 90), g4(3.95, 90) ],
  [ 8, d4(3.95, 90), f4(3.95, 90), a4(3.95, 90) ],
  [ 12, as3(1.95, 90), d4(1.95, 90), f4(1.95, 90) ],
  [ 14, c4(1.95, 90), e4(1.95, 90), g4(1.95, 90) ]
]);
await kick.steps(1, [c5(0.2, 110)].repeat(15));
await waitForSignal('go');

// === PART "fbass-2" (4 bars of 4/4) — same, plus hats, snare and toms with echo ===
setBeatsPerBar(4);
definePartStart('fbass-2');
createTrack(3).play([[ 0.16, controlchange(64, 127) ],
[ 0.03, f6(1.08, 78) ],
[ 1.54, f6(0.50, 79) ],
[ 2.04, g6(0.52, 84) ],
[ 0.07, f5(2.99, 52) ],
[ 0.05, c6(3.07, 54) ],
[ 2.55, a6(0.97, 87) ],
[ 4.18, controlchange(64, 0) ],
[ 4.38, controlchange(64, 127) ],
[ 3.54, g6(3.45, 89) ],
[ 6.52, d6(0.50, 62) ],
[ 6.98, e6(0.40, 82) ],
[ 4.08, c5(3.48, 47) ],
[ 4.07, g5(3.52, 39) ],
[ 8.07, controlchange(64, 0) ],
[ 8.20, controlchange(64, 127) ],
[ 7.48, f6(0.98, 88) ],
[ 8.45, e6(0.49, 62) ],
[ 8.95, d6(0.53, 68) ],
[ 9.48, f6(1.49, 72) ],
[ 8.04, d5(3.22, 38) ],
[ 8.05, a5(3.37, 47) ],
[ 10.99, a6(0.51, 94) ],
[ 11.49, f6(0.17, 67) ],
[ 12.04, controlchange(64, 0) ],
[ 12.14, controlchange(64, 127) ],
[ 11.97, as6(0.50, 73) ],
[ 12.46, a6(0.56, 67) ],
[ 12.00, d6(1.07, 64) ],
[ 12.00, as4(1.25, 47) ],
[ 12.00, as5(1.27, 47) ],
[ 13.04, f6(0.26, 77) ],
[ 14.06, controlchange(64, 0) ],
[ 14.17, controlchange(64, 127) ],
[ 13.98, g5(0.91, 47) ],
[ 14.00, c5(0.90, 47) ],
[ 13.43, g6(1.61, 77) ],
[ 15.97, controlchange(64, 0) ]].quantize(4));
createTrack(2).play([[ 0.06, controlchange(64, 0) ],
[ 0.97, controlchange(64, 127) ],
[ 0.49, f5(0.73, 69) ],
[ 1.00, c6(0.45, 82) ],
[ 1.45, f5(0.51, 35) ],
[ 1.98, c6(0.39, 87) ],
[ 3.02, d6(0.40, 79) ],
[ 2.47, f5(1.07, 42) ],
[ 3.98, controlchange(64, 0) ],
[ 4.09, controlchange(64, 127) ],
[ 3.48, c6(1.00, 49) ],
[ 4.51, f5(0.51, 60) ],
[ 5.03, c6(0.45, 82) ],
[ 5.52, f5(0.46, 47) ],
[ 6.03, c6(0.43, 77) ],
[ 6.50, f5(0.52, 60) ],
[ 7.04, d6(0.29, 78) ],
[ 7.92, controlchange(64, 0) ],
[ 8.09, controlchange(64, 127) ],
[ 7.53, c6(0.86, 78) ],
[ 8.52, f5(0.46, 58) ],
[ 9.03, c6(0.37, 88) ],
[ 9.49, f5(0.44, 64) ],
[ 10.00, c6(0.32, 77) ],
[ 10.48, f5(0.51, 47) ],
[ 11.01, d6(0.49, 83) ],
[ 11.82, controlchange(64, 0) ],
[ 12.03, controlchange(64, 127) ],
[ 11.49, c6(0.96, 77) ],
[ 12.50, f5(0.51, 70) ],
[ 13.03, c6(0.40, 83) ],
[ 13.51, f5(0.42, 49) ],
[ 14.08, controlchange(64, 0) ],
[ 14.15, controlchange(64, 127) ],
[ 14.00, as5(0.52, 91) ],
[ 15.08, controlchange(64, 0) ],
[ 15.60, controlchange(64, 127) ],
[ 15.03, f5(0.64, 67) ],
[ 14.51, c6(1.48, 70) ],
[ 15.61, g5(0.39, 82) ]].quantize(4));

const wk = (a, b2) => [a(0.3, 100), a(0.3, 100)];     // quavers on the root, shortened
bass.steps(2, [
  ...wk(f2, c3).repeat(3),    // F, 4 beats
  ...wk(c3, g2).repeat(3),    // C
  ...wk(d2, a2).repeat(3),    // Dm
  ...wk(as2, f2).repeat(1),   // Bb, 2 beats
  ...wk(c3, g2).repeat(1)     // C, 2 beats
]);
strings.play([
  [ 0, f4(3.95, 90), a4(3.95, 90), c5(3.95, 90) ],
  [ 4, c4(3.95, 90), e4(3.95, 90), g4(3.95, 90) ],
  [ 8, d4(3.95, 90), f4(3.95, 90), a4(3.95, 90) ],
  [ 12, as3(1.95, 90), d4(1.95, 90), f4(1.95, 90) ],
  [ 14, c4(1.95, 90), e4(1.95, 90), g4(1.95, 90) ]
]);
hihat.steps(4, [null, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25)].repeat(15));  // e & a
snare.steps(1, [null, d5(0.2, 100)].repeat(7));                                // beats 2 and 4
const tomBeat = (t) => [t(0.2, 100), null, null, t(0.2, 25)];                  // hit + echo on the a
drums.steps(4, [...tomBeat(f5), ...tomBeat(g5), ...tomBeat(a5), ...tomBeat(b5)].repeat(3));
await kick.steps(1, [c5(0.2, 110)].repeat(15));
await waitForSignal('go');

// === PART "dminor" (4 bars of 4/4) — all D minor, no piano, guitar take down 3 ===
setBeatsPerBar(4);
definePartStart('dminor');



bass.steps(2, [d2(0.3, 100)].repeat(31));   // quavers on d
strings.steps(0.25, [[d4(3.95, 90), f4(3.95, 90), a4(3.95, 90)]].repeat(3));   // Dm held, re-bowed each bar
hihat.steps(4, [null, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25)].repeat(15));  // e & a
snare.steps(1, [null, d5(0.2, 100)].repeat(7));                                // beats 2 and 4
const tomBeat2 = (t) => [t(0.2, 100), null, null, t(0.2, 25)];                  // hit + echo on the a
drums.steps(4, [...tomBeat2(f5), ...tomBeat2(g5), ...tomBeat2(a5), ...tomBeat2(b5)].repeat(3));
await kick.steps(1, [c5(0.2, 110)].repeat(15));
await waitForSignal('go');



loopHere();
