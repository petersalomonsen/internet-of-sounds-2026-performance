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

const pump = (lo, hi) => [lo(0.24, 100), lo(0.24, 50), hi(0.24, 100), lo(0.24, 100)];  // 1 e + a
function bassPump() {                     // 16ths: d2, d2 (half vel), d3, d2
  const two = (lo, hi) => pump(lo, hi).repeat(1);   // two beats on one root
  const eight = [...two(d2, d3), ...two(f2, f3), ...two(a2, a3), ...two(c2, c3)];
  return bassguitar.steps(4, [            // roots change every 2 beats: d f a c, x4 = 8 bars
    ...eight, ...eight, ...eight, ...eight,
  ]);
}

function padChords() {                     // Dm F Am C, 2 beats each, x4 = 8 bars
  // inversions chosen for minimal voice movement: one voice steps per change
  const prog = [[d4, f4, a4], [c4, f4, a4], [c4, e4, a4], [c4, e4, g4]];
  const rows = [];
  for (let i = 0; i < 16; i++) {
    const c = prog[i % 4];
    rows.push([i * 2, ...c.map((n) => n(1.95, 90))]);
  }
  warmpad.play(rows);
}


function kick4() {                         // kick on every beat
  kick.steps(1, [c5(0.2, 110)].repeat(31));
  kick.play([[13.75, c5(0.2, 70)], [29.75, c5(0.2, 70)]]);     // pickup kick on the a before the 15th beat

}

function hats16() {                        // hats on the e and the a, quarter velocity
  hihat.steps(4, [
    , fs5(0.1, 25), fs5(0.1, 70), fs5(0.1, 25),     // closed hat on the &
    , fs5(0.1, 25), gs5(0.1, 35), fs5(0.1, 25),     // every second &: open hat, half velocity
  ].repeat(15));
}

// === PART "bass" (8 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('bass');
padChords();

kick4();
hats16();
startRecording();
createTrack(3).play([[ 0.11, controlchange(64, 127) ],
[ 0.01, a6(0.61, 90) ],
[ 1.04, a6(0.62, 89) ],
[ 1.99, g6(0.51, 79) ],
[ 2.55, f6(0.36, 60) ],
[ 2.97, d6(0.47, 64) ],
[ 3.92, controlchange(64, 0) ],
[ 4.07, controlchange(64, 127) ],
[ 3.50, c6(3.39, 63) ],
[ 7.12, controlchange(64, 0) ],
[ 7.22, controlchange(64, 127) ],
[ 7.02, d6(0.51, 89) ],
[ 7.51, e6(0.51, 68) ],
[ 8.24, controlchange(64, 0) ],
[ 8.29, controlchange(64, 127) ],
[ 8.04, f6(0.48, 75) ],
[ 8.52, e6(0.45, 63) ],
[ 8.99, d6(0.51, 68) ],
[ 9.76, controlchange(64, 0) ],
[ 10.00, controlchange(64, 127) ],
[ 10.93, controlchange(64, 0) ],
[ 11.03, controlchange(64, 127) ],
[ 9.53, a5(1.63, 82) ],
[ 10.52, d6(0.79, 75) ],
[ 11.95, controlchange(64, 0) ],
[ 12.13, controlchange(64, 127) ],
[ 11.51, c6(2.55, 72) ],
[ 15.12, controlchange(64, 0) ]]);
createTrack(3).play([[ 16.11, controlchange(64, 127) ],
[ 16.01, a6(0.61, 90) ],
[ 17.04, a6(0.62, 89) ],
[ 17.99, g6(0.51, 79) ],
[ 18.55, f6(0.36, 60) ],
[ 18.97, d6(0.47, 64) ],
[ 19.92, controlchange(64, 0) ],
[ 20.07, controlchange(64, 127) ],
[ 19.50, c6(3.39, 63) ],
[ 23.12, controlchange(64, 0) ],
[ 23.22, controlchange(64, 127) ],
[ 23.02, d6(0.51, 89) ],
[ 23.51, e6(0.51, 68) ],
[ 24.24, controlchange(64, 0) ],
[ 24.29, controlchange(64, 127) ],
[ 24.04, f6(0.48, 75) ],
[ 24.52, e6(0.45, 63) ],
[ 24.99, d6(0.51, 68) ],
[ 25.76, controlchange(64, 0) ],
[ 26.00, controlchange(64, 127) ],
[ 26.93, controlchange(64, 0) ],
[ 27.03, controlchange(64, 127) ],
[ 25.53, f6(0.95, 82) ],
[ 26.53, a6(0.45, 75) ],
[ 27.50, f6(0.23, 75) ],
[ 27.75, g6(0.42, 75) ],
[ 27.95, controlchange(64, 0) ],
[ 28.13, controlchange(64, 127) ],
[ 31.12, controlchange(64, 0) ]]);

await bassPump();
stopRecording();
await waitForSignal('go');

loopHere();


