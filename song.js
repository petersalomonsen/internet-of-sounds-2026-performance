// Blank performance song: one 16-beat "start" section, nothing playing.
// The full song ("Prompted") is in git at HEAD (commit 46c8919) — read_committed('song.js') restores it.
setBPM(125);

addInstrument('kick');   // 0
addInstrument('hihat');  // 1
addInstrument('pad');    // 2
addInstrument('bass');   // 3
addInstrument('padlead');// 4
addInstrument('jumppad');// 5
addInstrument('warmpad');// 6
addInstrument('snare');  // 7
addInstrument('sololead');// 8
addInstrument('bassguitar');// 9 — Karplus-Strong bass guitar (ported from Beach Drive)

const kick    = createTrack(0, 4);
const hihat   = createTrack(1, 4);
const pad     = createTrack(2, 4);
const bass    = createTrack(3, 4);
const padlead = createTrack(4);
const jumppad = createTrack(5);
const warmpad = createTrack(6);
const snare   = createTrack(7, 1);
const sololead = createTrack(8);
const bassguitar = createTrack(9);

// === PART "start" (4 bars = 16 beats): silence ===
definePartStart('start');
warmpad.steps(1, [ controlchange(7, 72) ]);   // warm pad channel volume down (default 100) — it was too loud against the bass
createTrack(9).play([
  [ 0.00, d2(0.36, 72) ],
  [ 1.00, a2(0.36, 72) ],
[ 1.41, c3(0.27, 75) ],
[ 1.98, d3(0.57, 90) ],
[ 3.55, f2(0.45, 87) ],
[ 4.48, f2(0.58, 77) ],
[ 5.04, f3(0.37, 78) ],
[ 5.45, f2(0.25, 72) ],
[ 5.98, g2(0.27, 82) ],
[ 6.44, g2(0.51, 83) ],
[ 6.94, g3(0.27, 88) ],
[ 7.94, d2(0.89, 79) ],
[ 8.92, a2(0.34, 70) ],
[ 9.38, c3(0.29, 72) ],
[ 9.92, d3(1.11, 89) ],
[ 11.60, f2(0.54, 67) ],
[ 12.57, f2(0.50, 70) ],
[ 13.15, e3(0.05, 9) ],
[ 13.06, f3(0.36, 69) ],
[ 14.03, c2(0.31, 64) ],
[ 14.51, c2(0.50, 74) ],
[ 15.05, c3(0.44, 77) ]].quantize(4));

createTrack(6).play([
[ 0.00, d5(3.12, 65), f5(3.17, 87), a5(3.10, 55) ],
[ 3.50, c5(2.13, 88), a5(2.15, 70), f5(2.25, 94) ],
[ 6.00, e5(1.58, 53), g5(1.52, 58), c5(1.61, 60) ],
[ 8.00, a5(1.98, 72), a4(3.37, 75), d5(3.40, 57), f5(1.98, 67), d6(2.00, 68) ],
[ 10.00, c6(1.73, 84), a5(1.60, 63), f5(1.29, 65) ],
[ 12.00, g5(1.60, 79), b5(1.60, 77), d5(1.58, 60) ],
[ 14.00, e5(1.73, 65), c5(1.66, 74), g5(1.67, 35), a5(0.06, 49) ]]);

createTrack(8).play([
[ 0.50, d5(0.57, 70) ],
[ 1.00, f5(0.13, 70) ],
[ 2.00, g5(0.46, 74) ],
[ 2.91, gs5(0.02, 72) ],
[ 3.00, a5(0.34, 77) ],
[ 3.50, c6(0.70, 87) ],
[ 4.44, c6(0.07, 63) ],
[ 4.50, d6(0.46, 82) ],
[ 5.00, a5(0.19, 63) ],
[ 5.21, c6(0.07, 23) ],
[ 6.00, a5(0.45, 89) ],
[ 6.50, b5(0.54, 89) ],
[ 7.50, c6(0.96, 88) ],
[ 8.56, b5(0.07, 55) ],
[ 8.72, c6(0.16, 69) ],
[ 8.91, b5(0.06, 67) ],
[ 9.00, a5(0.28, 82) ],
[ 9.25, a5(0.22, 10) ],
[ 9.50, b5(0.88, 97) ],
[ 10.50, a5(0.50, 69) ],
[ 11.00, g5(0.28, 78) ],
[ 11.40, g5(0.18, 88) ],
[ 11.50, a5(0.89, 79) ],
[ 12.52, g5(0.12, 64) ],
[ 12.69, a5(0.18, 77) ],
[ 12.89, g5(0.06, 74) ],
[ 13.00, f5(0.25, 68) ],
[ 13.50, g5(1.05, 89) ],
[ 14.50, f5(0.47, 67) ],
[ 15.00, e5(0.37, 75) ],
[ 15.50, e5(0.19, 90) ]]);

hihat.steps(2, [ , fs3, , fs3, , fs3, , fs3 ].repeat(3));   // 16 beats, hi-hat on the off-beats
await kick.steps(1, [ c2, c2, c2, c2 ].repeat(3));         // 16 beats, kick on every beat (beat-keeper)

// === PART "part2" (8 bars = 32 beats): F (2 bars) → G (2 bars) → Dm (4 bars), same bass riff + warm-pad voicings, transposed diatonically ===
await waitForSignal('go', { loop: 'part', quantize: 'bar' });   // "start" loops until told to go on
definePartStart('part2');
createTrack(9).play([
[ 0.00, f2(0.36, 72) ],
[ 1.00, c3(0.36, 72) ],
[ 1.41, e3(0.27, 75) ],
[ 1.98, f3(0.57, 90) ],
[ 4.00, f2(0.89, 79) ],
[ 4.92, c3(0.34, 70) ],
[ 5.38, e3(0.29, 72) ],
[ 5.92, f3(1.11, 89) ],
[ 8.00, g2(0.36, 72) ],
[ 9.00, d3(0.36, 72) ],
[ 9.41, f3(0.27, 75) ],
[ 9.98, g3(0.57, 90) ],
[ 12.00, g2(0.89, 79) ],
[ 12.92, d3(0.34, 70) ],
[ 13.38, f3(0.29, 72) ],
[ 13.92, g3(1.11, 89) ],
[ 16.00, d2(0.36, 72) ],
[ 17.00, a2(0.36, 72) ],
[ 17.41, c3(0.27, 75) ],
[ 17.98, d3(0.57, 90) ],
[ 20.00, d2(0.89, 79) ],
[ 20.92, a2(0.34, 70) ],
[ 21.38, c3(0.29, 72) ],
[ 21.92, d3(1.11, 89) ],
[ 24.00, d2(0.36, 72) ],
[ 25.00, a2(0.36, 72) ],
[ 25.41, c3(0.27, 75) ],
[ 25.98, d3(0.57, 90) ],
[ 28.00, d2(0.89, 79) ],
[ 28.92, a2(0.34, 70) ],
[ 29.38, c3(0.29, 72) ],
[ 29.92, d3(1.11, 89) ]]);

createTrack(6).play([
[ 0.00, c5(3.90, 88), a5(3.90, 70), f5(3.90, 94) ],
[ 4.00, c5(3.90, 88), a5(3.90, 70), f5(3.90, 94) ],
[ 8.00, g5(3.90, 79), b5(3.90, 77), d5(3.90, 60) ],
[ 12.00, g5(3.90, 79), b5(3.90, 77), d5(3.90, 60) ],
[ 16.00, d5(3.90, 65), f5(3.90, 87), a5(3.90, 55) ],
[ 20.00, a5(3.90, 72), a4(3.90, 75), d5(3.90, 57), f5(3.90, 67), d6(3.90, 68) ],
[ 24.00, d5(3.90, 65), f5(3.90, 87), a5(3.90, 55) ],
[ 28.00, a5(3.90, 72), a4(3.90, 75), d5(3.90, 57), f5(3.90, 67), d6(3.90, 68) ]]);

hihat.steps(2, [ , fs3, , fs3, , fs3, , fs3 ].repeat(7));   // 32 beats
// snare: backbeat on 2 & 4 plus ghost notes (low velocity) in between — a 16th before each backbeat,
// one after the first, and a pickup 16th before the next bar's kick
snare.steps(4, [
    , , , d3(0.1, 35),   d3, , d3(0.1, 35), ,
    , , , d3(0.1, 35),   d3, , , d3(0.1, 38),
].repeat(7));   // 32 beats
await kick.steps(1, [ c2, c2, c2, c2 ].repeat(7));         // 32 beats (beat-keeper)
await waitForSignal('go', { loop: 'part', quantize: 'bar' });   // "part2" loops until told to go on

// === PART "part3" (4 bars = 16 beats): kick + bass guitar only, D on every beat ===
definePartStart('part3');
createTrack(4).play([
[ 0.50, a6(0.41, 60) ],
[ 1.00, f7(0.51, 89) ],
[ 1.50, a6(0.36, 48) ],
[ 2.00, e7(0.46, 82) ],
[ 2.50, a6(0.50, 37) ],
[ 3.00, c7(0.50, 93) ],
[ 3.50, d7(0.42, 84) ],
[ 4.50, a6(0.45, 78) ],
[ 5.00, f7(0.54, 89) ],
[ 5.50, a6(0.42, 38) ],
[ 6.00, e7(0.51, 89) ],
[ 6.50, a6(0.47, 53) ],
[ 7.00, c7(0.42, 94) ],
[ 7.50, d7(0.79, 94) ],
[ 8.50, f6(0.35, 55) ],
[ 9.00, f7(0.50, 93) ],
[ 9.50, f6(0.40, 38) ],
[ 10.00, e7(0.62, 89) ],
[ 10.50, a6(0.18, 70) ],
[ 11.00, c7(0.47, 100) ],
[ 12.50, a6(0.39, 63) ],
[ 13.00, f7(0.47, 97) ],
[ 13.50, a6(0.11, 47) ],
[ 14.00, e7(0.48, 88) ],
[ 14.50, a6(0.58, 57) ],
[ 15.00, c7(0.48, 102) ],
[ 15.50, d7(0.54, 94) ]]);

startRecording();   // live MIDI input is captured into the song over these 4 bars
bassguitar.steps(1, [   // follows the left hand of the take: D (2 bars), A# (1 bar), C (1 bar)
    d2(0.9), d2(0.9), d2(0.9), d2(0.9),   d2(0.9), d2(0.9), d2(0.9), d2(0.9),
    as2(0.9), as2(0.9), as2(0.9), as2(0.9),   c3(0.9), c3(0.9), c3(0.9), c3(0.9),
]);   // 16 beats
await hihat.steps(2, [ , fs3, , fs3, , fs3, , fs3 ].repeat(3));           // 16 beats, hi-hat on the off-beats (beat-keeper, no kick here)
stopRecording();
await waitForSignal('go', { loop: 'part', quantize: 'bar' });   // "part3" loops until told to go on

// === PART "part4" (4 bars = 16 beats): part3 + warm pad chords Dm (2 bars) → A# (1 bar) → C (1 bar) ===
definePartStart('part4');
warmpad.steps(1, [
    [d5(3.9, 65), f5(3.9, 87), a5(3.9, 55)], , , ,     // Dm  (voicing from the "start" take)
    [d5(3.9, 65), f5(3.9, 87), a5(3.9, 55)], , , ,     // Dm
    [as4(3.9, 65), d5(3.9, 87), f5(3.9, 55)], , , ,    // A#
    [c5(3.9, 60), e5(3.9, 53), g5(3.9, 58)], , , null, // C
]);
createTrack(4).play([
[ 0.50, a6(0.41, 60) ],
[ 1.00, f7(0.51, 89) ],
[ 1.50, a6(0.36, 48) ],
[ 2.00, e7(0.46, 82) ],
[ 2.50, a6(0.50, 37) ],
[ 3.00, c7(0.50, 93) ],
[ 3.50, d7(0.42, 84) ],
[ 4.50, a6(0.45, 78) ],
[ 5.00, f7(0.54, 89) ],
[ 5.50, a6(0.42, 38) ],
[ 6.00, e7(0.51, 89) ],
[ 6.50, a6(0.47, 53) ],
[ 7.00, c7(0.42, 94) ],
[ 7.50, d7(0.79, 94) ],
[ 8.50, f6(0.35, 55) ],
[ 9.00, f7(0.50, 93) ],
[ 9.50, f6(0.40, 38) ],
[ 10.00, e7(0.62, 89) ],
[ 10.50, a6(0.18, 70) ],
[ 11.00, c7(0.47, 100) ],
[ 12.50, a6(0.39, 63) ],
[ 13.00, f7(0.47, 97) ],
[ 13.50, a6(0.11, 47) ],
[ 14.00, e7(0.48, 88) ],
[ 14.50, a6(0.58, 57) ],
[ 15.00, c7(0.48, 102) ],
[ 15.50, d7(0.54, 94) ]]);
bassguitar.steps(1, [   // D (2 bars), A# (1 bar), C (1 bar)
    d2(0.9), d2(0.9), d2(0.9), d2(0.9),   d2(0.9), d2(0.9), d2(0.9), d2(0.9),
    as2(0.9), as2(0.9), as2(0.9), as2(0.9),   c3(0.9), c3(0.9), c3(0.9), c3(0.9),
]);   // 16 beats
await hihat.steps(2, [ , fs3, , fs3, , fs3, , fs3 ].repeat(3));           // 16 beats, hi-hat on the off-beats (beat-keeper)
await waitForSignal('go', { loop: 'part', quantize: 'bar' });   // "part4" loops until told to go on

loopHere();
