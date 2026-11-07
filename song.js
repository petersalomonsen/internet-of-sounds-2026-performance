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
function bassPump() { bassguitar.steps(4, [...pump(d2, d3).repeat(3), ...pump(f2, f3).repeat(3), ...pump(a2, a3).repeat(3), ...pump(g2, g3).repeat(3)]); }   // 4 bars of 4/4
function padHold() {
  // Dm, F, Am, G — one bar each: root + fifth held, middle note moves 2nd → 3rd after 2 beats
  const o = (lo, hi) => [lo(3.95, 100), hi(3.95, 100)];
  strings.steps(0.25, [o(d4, a6), o(f4, c7), o(a4, e7), o(g4, d7)]);
  strings.steps(0.5, [e5(1.95, 100), f5(1.95, 100), g5(1.95, 100), a5(1.95, 100),
                      b5(1.95, 100), c6(1.95, 100), a5(1.95, 100), b5(1.95, 100)]);
}   // held the whole part

function pianoTake() {
piano.play([
[ 0.00, controlchange(64, 90) ],
[ 0.00, controlchange(64, 127), d6(2.95, 45) ],
[ 0.50, a6(1.95, 48) ],
[ 1.00, f7(0.45, 77) ],
[ 1.50, e7(0.95, 71) ],
[ 2.00, controlchange(64, 90) ],
[ 2.00, controlchange(64, 0) ],
[ 2.00, controlchange(64, 90) ],
[ 2.00, controlchange(64, 127) ],
[ 2.50, c7(1.95, 71) ],
[ 4.00, controlchange(64, 90) ],
[ 4.00, controlchange(64, 0) ],
[ 4.00, controlchange(64, 90) ],
[ 4.00, controlchange(64, 127), f5(3.45, 45) ],
[ 4.50, f6(0.45, 45) ],
[ 5.00, c7(3.95, 92) ],
[ 5.50, controlchange(64, 90) ],
[ 5.50, controlchange(64, 0), g6(0.95, 75) ],
[ 6.00, controlchange(64, 90) ],
[ 6.00, controlchange(64, 127) ],
[ 6.50, f6(1.95, 80) ],
[ 7.00, controlchange(64, 90) ],
[ 7.00, controlchange(64, 0) ],
[ 7.00, controlchange(64, 90) ],
[ 7.00, controlchange(64, 127) ],
[ 8.00, controlchange(64, 90) ],
[ 8.00, controlchange(64, 0) ],
[ 8.00, controlchange(64, 90) ],
[ 8.00, controlchange(64, 127), c6(3.45, 59) ],
[ 8.50, e6(0.45, 53) ],
[ 9.00, f6(0.45, 80) ],
[ 9.50, controlchange(64, 90) ],
[ 9.50, controlchange(64, 0) ],
[ 9.50, controlchange(64, 90) ],
[ 9.50, controlchange(64, 127), g6(0.95, 71) ],
[ 10.50, c7(1.95, 84) ],
[ 11.00, controlchange(64, 90) ],
[ 11.00, controlchange(64, 0) ],
[ 11.00, controlchange(64, 90) ],
[ 11.00, controlchange(64, 127) ],
[ 12.00, controlchange(64, 90) ],
[ 12.00, controlchange(64, 0) ],
[ 12.00, controlchange(64, 90) ],
[ 12.00, controlchange(64, 127), g5(3.45, 61) ],
[ 12.50, b6(0.45, 66) ],
[ 13.00, controlchange(64, 90) ],
[ 13.00, controlchange(64, 0) ],
[ 13.00, controlchange(64, 90) ],
[ 13.00, controlchange(64, 127), a6(0.45, 81) ],
[ 13.50, g6(0.95, 81) ],
[ 14.50, controlchange(64, 90) ],
[ 14.50, controlchange(64, 0), d6(0.95, 86) ],
[ 15.00, controlchange(64, 90) ],
[ 15.00, controlchange(64, 127) ],
[ 15.99, controlchange(64, 90) ],
[ 15.99, controlchange(64, 0) ]
]);
}
function pianoTakeG() {   // the piano take with F → F# so it sits in G major
piano.play([
[ 0.00, controlchange(64, 90) ],
[ 0.00, controlchange(64, 127), d6(2.95, 45) ],
[ 0.50, a6(1.95, 48) ],
[ 1.00, fs7(0.45, 77) ],
[ 1.50, e7(0.95, 71) ],
[ 2.00, controlchange(64, 90) ],
[ 2.00, controlchange(64, 0) ],
[ 2.00, controlchange(64, 90) ],
[ 2.00, controlchange(64, 127) ],
[ 2.50, c7(1.95, 71) ],
[ 4.00, controlchange(64, 90) ],
[ 4.00, controlchange(64, 0) ],
[ 4.00, controlchange(64, 90) ],
[ 4.00, controlchange(64, 127), fs5(3.45, 45) ],
[ 4.50, fs6(0.45, 45) ],
[ 5.00, c7(3.95, 92) ],
[ 5.50, controlchange(64, 90) ],
[ 5.50, controlchange(64, 0), g6(0.95, 75) ],
[ 6.00, controlchange(64, 90) ],
[ 6.00, controlchange(64, 127) ],
[ 6.50, fs6(1.95, 80) ],
[ 7.00, controlchange(64, 90) ],
[ 7.00, controlchange(64, 0) ],
[ 7.00, controlchange(64, 90) ],
[ 7.00, controlchange(64, 127) ],
[ 8.00, controlchange(64, 90) ],
[ 8.00, controlchange(64, 0) ],
[ 8.00, controlchange(64, 90) ],
[ 8.00, controlchange(64, 127), c6(3.45, 59) ],
[ 8.50, e6(0.45, 53) ],
[ 9.00, fs6(0.45, 80) ],
[ 9.50, controlchange(64, 90) ],
[ 9.50, controlchange(64, 0) ],
[ 9.50, controlchange(64, 90) ],
[ 9.50, controlchange(64, 127), g6(0.95, 71) ],
[ 10.50, c7(1.95, 84) ],
[ 11.00, controlchange(64, 90) ],
[ 11.00, controlchange(64, 0) ],
[ 11.00, controlchange(64, 90) ],
[ 11.00, controlchange(64, 127) ],
[ 12.00, controlchange(64, 90) ],
[ 12.00, controlchange(64, 0) ],
[ 12.00, controlchange(64, 90) ],
[ 12.00, controlchange(64, 127), g5(3.45, 61) ],
[ 12.50, b6(0.45, 66) ],
[ 13.00, controlchange(64, 90) ],
[ 13.00, controlchange(64, 0) ],
[ 13.00, controlchange(64, 90) ],
[ 13.00, controlchange(64, 127), a6(0.45, 81) ],
[ 13.50, g6(0.95, 81) ],
[ 14.50, controlchange(64, 90) ],
[ 14.50, controlchange(64, 0), d6(0.95, 86) ],
[ 15.00, controlchange(64, 90) ],
[ 15.00, controlchange(64, 127) ],
[ 15.99, controlchange(64, 90) ],
[ 15.99, controlchange(64, 0) ]
]);
}
function guitarRiff() {   // 8ths, one bar ×4, half velocity
  guitar.steps(2, [g3(0.45, 50), d4(0.45, 50), d4(0.45, 50), g3(0.45, 50), d4(0.45, 50), g3(0.45, 50), g3(0.45, 50), d4(0.45, 50)].repeat(3));
}
function bassHold() { bass.steps(0.25, [g2(3.95, 100)].repeat(3)); }   // G throughout
function padHold2() {   // G, D, Em, Bm — same voicing, middle note 2nd → 3rd after 2 beats
  const o = (lo, hi) => [lo(3.95, 100), hi(3.95, 100)];
  strings.steps(0.25, [o(g4, d7)].repeat(3));
  strings.steps(0.5, [a5(1.95, 100), b5(1.95, 100)].repeat(3));
}   // one held root per bar

// === PART "bass" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('bass');
setVisual('uRunning', 0);
hideText({ fade: 0.5 });
setVisual('uTextFx', 0);
setVisual('uStars', 0);
setVisual('uFadeOut', 0);
pianoTake();


setVisual('uScene', 0);
bassPump();
padHold();
hihat.steps(4, [null, fs5(0.1, 25), fs5(0.1, 100), fs5(0.1, 25)].repeat(15));   // e + a between the kicks
snare.steps(1, [null, d5(0.2, 100)].repeat(7));   // backbeat on 2 and 4
await kick.steps(1, [c5(0.2, 110)].repeat(15));   // four on the floor, 4 bars
await waitForSignal('go');

// === PART "full" (4 bars of 4/4) ===
setBeatsPerBar(4);
definePartStart('full');
setVisual('uScene', 1, 2.0);   // fade to the dancers
setVisual('uRunning', 1);
showText('Internet of Sounds', { fade: 1.0, size: 96 });
setVisual('uTextFx', 1);
setVisual('uStars', 1, 2.0);
setVisual('uFadeOut', 0);
guitarRiff();
padHold2();
bassHold();
await drums.steps(1, [cs6(0.2, 80)].repeat(15));   // cymbal on every beat only
await waitForSignal('go');

// === PART "ending" (2 bars of 4/4) — the song ends here, no loop ===
setBeatsPerBar(4);
definePartStart('ending');
setVisual('uScene', 1);
hideText({ fade: 1.5 });
setVisual('uFadeOut', 1, 5.0);                      // fade the picture to black
drums.steps(2, [f5(0.45, 110), f5(0.45, 110)]);     // lowest tom, two 8ths
bass.play([[1, g2(0.95, 100)]]);                    // bass holds one beat
strings.play([[1, g4(0.95, 100), b5(0.95, 100), d7(0.95, 100)]]);   // G chord, one beat
await drums.steps(1, new Array(8));                 // then silence to the end
bass.steps(1, [controlchange(64, 0)]);               // end marker: keeps the 2 silent bars in the song
