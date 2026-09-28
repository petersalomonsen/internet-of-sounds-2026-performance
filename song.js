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

const pluck = [d2(0.24, 100), d2(0.24, 50), d3(0.24, 100), d2(0.24, 100)];   // one beat of 16ths
function bassPluck() { return bassguitar.steps(4, pluck.repeat(15)); }   // 4 bars of 4/4

function takeRiff() { guitar.play([
[ 0.07, g5(0.98, 78) ],
[ 1.06, d5(1.28, 68) ],
[ 1.60, a5(1.41, 83) ],
[ 3.00, d5(0.24, 72) ],
[ 3.27, a5(0.57, 72) ],
[ 3.82, d5(0.18, 60) ],
[ 4.07, g5(0.98, 78) ],
[ 5.06, d5(1.28, 68) ],
[ 5.60, a5(1.41, 83) ],
[ 7.00, d5(0.24, 72) ],
[ 7.27, a5(0.57, 72) ],
[ 7.82, d5(0.18, 60) ],
[ 8.07, g5(0.98, 78) ],
[ 9.06, d5(1.28, 68) ],
[ 9.60, a5(1.41, 83) ],
[ 11.00, d5(0.24, 72) ],
[ 11.27, a5(0.57, 72) ],
[ 11.82, d5(0.18, 60) ],
[ 12.07, g5(0.98, 78) ],
[ 13.06, d5(1.28, 68) ],
[ 13.60, a5(1.41, 83) ],
[ 15.00, d5(0.24, 72) ],
[ 15.27, a5(0.57, 72) ],
[ 15.82, d5(0.18, 60) ],
[ 16.07, g5(0.98, 78) ],
[ 17.06, d5(1.28, 68) ],
[ 17.60, a5(1.41, 83) ],
[ 19.00, d5(0.24, 72) ],
[ 19.27, a5(0.57, 72) ],
[ 19.82, d5(0.18, 60) ],
[ 20.07, g5(0.98, 78) ],
[ 21.06, d5(1.28, 68) ],
[ 21.60, a5(1.41, 83) ],
[ 23.00, d5(0.24, 72) ],
[ 23.27, a5(0.57, 72) ],
[ 23.82, d5(0.18, 60) ],
[ 24.07, g5(0.98, 78) ],
[ 25.06, d5(1.28, 68) ],
[ 25.60, a5(1.41, 83) ],
[ 27.00, d5(0.24, 72) ],
[ 27.27, a5(0.57, 72) ],
[ 27.82, d5(0.18, 60) ],
[ 28.07, g5(0.98, 78) ],
[ 29.06, d5(1.28, 68) ],
[ 29.60, a5(1.41, 83) ],
[ 31.00, d5(0.24, 72) ],
[ 31.27, a5(0.57, 72) ],
[ 31.82, d5(0.18, 60) ]
]); }
const pump = (lo, hi) => [lo(0.24, 100), lo(0.24, 50), hi(0.24, 100), lo(0.24, 100)];   // one beat of 16ths
function beat8() {   // 8 bars: kick on every beat, open hat on every off-beat
  kick.steps(1, [c5(0.2, 110)].repeat(31));
  hihat.steps(2, [ , gs5(0.1, 85) ].repeat(31));
}
function takeBass() { return bassguitar.steps(4, [...pump(d2, d3).repeat(7), ...pump(c2, c3).repeat(7), ...pump(as1, as2).repeat(7), ...pump(g1, g2).repeat(7)]); }

// === PART "bass" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('bass');
await bassPluck();
await waitForSignal('go');

// === PART "take" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('take');
createTrack(7).play([[ 1.01, a4(0.02, 63) ],
[ 0.98, d3(7.99, 64) ],
[ 1.03, d5(8.25, 44) ],
[ 9.03, g4(7.70, 44) ],
[ 9.05, c4(7.99, 42) ],
[ 9.02, c5(8.18, 43) ],
[ 17.08, f4(7.45, 54) ],
[ 17.03, as3(7.95, 56) ],
[ 17.04, as4(7.97, 56) ],
[ 25.04, b4(6.04, 64) ],
[ 25.02, g3(6.98, 42) ],
[ 25.00, g4(7.00, 25) ],
[ 31.09, a4(0.91, 54) ]]);

startRecording();
takeRiff();
beat8();
await takeBass();
stopRecording();
await waitForSignal('go');

loopHere();



