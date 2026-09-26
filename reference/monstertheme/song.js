/*
 * Copyright (c) 2022-2026 Peter Johan Salomonsen ( petersalomonsen.com )
 * Licensed under CC BY-NC 4.0 — see LICENSE
 */

setBPM(92);

addInstrument('piano');
addInstrument('string');
addInstrument('drums');
addInstrument('guitar');
addInstrument('bass');
addInstrument('tubelead');
addInstrument('flute');
addInstrument('padsynth');
addInstrument('brass');
addInstrument('choir');

// Images live in the images/ folder of this repo (gitignored — sync them to
// OPFS via the claude-bridge, see top-level README). The visualizer crossfades
// between successive images over ~1.5s automatically; this song just rotates
// through them with nextMonster() at musical break points.
const monsterImages = [
  'images/121ccceb-b9ba-4705-b1f0-e2516433833d.jpeg',
  'images/b4d48191-3191-4403-bdeb-b0290227ad8b.jpeg',
  'images/photo_5913425696460492477_y.jpg',
  'images/photo_5931429632429639013_y.jpg',
  'images/photo_5962843233685980434_y.jpg',
];
monsterImages.forEach((url, i) => addImage('monster' + i, url));
let monsterIdx = 0;
const nextMonster = () => startVideo('monster' + ((monsterIdx++) % monsterImages.length));

// --- Frame-by-frame animations -------------------------------------------
// An "animation" is just a run of startVideo() calls fired close together on a
// fast grid. The visualizer shows whichever frame is active at the current
// song time (latest startTime wins), so rapid switches read as animation.
// The monstertheme shader snaps to the current frame (no crossfade) so the
// walk cycles stay crisp. See docs/ANIMATIONS.md.
//
// Two hand-drawn sequences, synced to OPFS via the claude-bridge:
//   inkwalk0..8   — 9-frame black-ink imp walk cycle
//   greenwalk0..3 — 4-frame watercolor swamp-troll idle (down/up bob)
const inkFrames = 9;
for (let i = 0; i < inkFrames; i++) addImage('ink' + i, 'images/inkwalk' + i + '.jpg');
const greenFrames = 4;
for (let i = 0; i < greenFrames; i++) addImage('green' + i, 'images/greenwalk' + i + '.jpg');

// --- Fictionspawn artwork slideshow --------------------------------------
// 30 watercolor/ink monster artworks by Fictionspawn (fictionspawn.com),
// copied into images/. Registered here for the slideshow; the master visual
// timeline below holds each for a few beats and quick-cuts montages of them
// between the hand-drawn walk-cycle animations.
const artFiles = [
  'photo_5827925374480880955_y.jpg', 'photo_5827925374480880956_y.jpg',
  'photo_5827925374480880957_y.jpg', 'photo_5827925374480880958_y.jpg',
  'photo_5827925374480880959_y.jpg', 'photo_5827925374480880960_y.jpg',
  'photo_5827925374480880961_y.jpg', 'photo_5827925374480880962_y.jpg',
  'photo_5827925374480880963_y.jpg', 'photo_5827925374480880964_y.jpg',
  'photo_5827925374480880965_y.jpg', 'photo_5830177174294564687_y.jpg',
  'photo_5830177174294564688_y.jpg', 'photo_5830177174294564689_y.jpg',
  'photo_5830177174294564690_y.jpg', 'photo_5830177174294564691_y.jpg',
  'photo_5830177174294564692_y.jpg', 'photo_5830177174294564693_y.jpg',
  'photo_5830177174294564694_y.jpg', 'photo_5830177174294564695_y.jpg',
  'photo_5830177174294564696_y.jpg', 'photo_5830177174294564697_y.jpg',
  'photo_5830177174294564698_y.jpg', 'photo_5830177174294564699_y.jpg',
  'photo_5830177174294564700_y.jpg', 'photo_5830177174294564703_y.jpg',
  'photo_5830177174294564704_y.jpg', 'photo_5830177174294564705_y.jpg',
  'photo_5830177174294564709_y.jpg', 'photo_5830177174294564711_y.jpg',
].map(f => 'images/' + f);
artFiles.forEach((url, i) => addImage('art' + i, url));
const artCount = artFiles.length;

// --- Scrolling lyrics overlaid on the artwork ----------------------------
// The visualizer shows one image texture at a time, so to scroll the lyrics
// OVER the artwork we composite each scroll frame at compile time: draw the
// artwork (cover-fit) then the text on top, line by line, rising up the frame.
// If the song sandbox can't read the artwork's pixels (cross-origin / OPFS
// loader), we fall back to a dark stormy gradient so the lyrics still scroll.
// The storm shader then applies its lightning/aberration to the whole frame.
const lyricBlocks = [
  ['The Monster is close'],
  ['Deep in the forest', 'Tall rock walls', 'A sinister nest', 'Monsters will crawl'],
  ['Dawning in madness', 'Nightmares awake', 'Deprived of gladness', 'Too much at stake'],
  ['Tied by chains', 'One dark core', 'Fighting in vain', 'Forevermore'],
  ['Echoes of dreams', 'Wither, fade', 'A garden of screams', 'Stories unmade'],
  ['Tied by chains', 'One dark core', 'Fighting in vain', 'Forevermore'],
  ['Lyrics & images by Fictionspawn', 'fictionspawn.com', 'Music by Peter Salomonsen'],
];
const FADE = 8;          // brightness levels per lyric block, for the fade in/out
const lyricPrefix = [];          // prefix per block (null if generation failed)
let lyricsOK = true;
// Load via onload/onerror + a hard timeout so a never-resolving image can
// NEVER hang the top-level await (that would stop the song from ever playing).
const loadImg = (url) => new Promise((resolve) => {
  let done = false; const fin = (v) => { if (!done) { done = true; resolve(v); } };
  try {
    const im = new Image(); im.crossOrigin = 'anonymous';
    im.onload = () => fin(im); im.onerror = () => fin(null);
    setTimeout(() => fin(null), 1500);
    im.src = url;
  } catch (e) { fin(null); }
});
// Compile-time loading of the artwork PIXELS (to composite text over the photo)
// is disabled — in this runtime new Image()/onload never resolves at song-compile
// time, so awaiting it hung song start. Lyrics scroll over a dark stormy gradient
// instead; the artworks still show in the slideshow/montage scenes around them.
// No await here, so play can never hang on it.
const lyricBgs = [];
try {
  for (let b = 0; b < lyricBlocks.length; b++) {
    const lines = lyricBlocks[b];
    // ONE text-on-black strip per block. The shader detects it (marker texel),
    // renders it full-width and scrolls it SMOOTHLY via time — no choppy
    // pre-rendered scroll frames. Pure black keys out so the storm shows behind.
    // One frame per fade level: the centered text drawn at increasing brightness.
    // The timeline plays these dim→full at the section start (fade IN) and
    // full→dim at the end (fade OUT) — perfectly in sync, no scrolling. Pure
    // black keys out so the storm shows behind; the marker tags it as a lyric.
    const W = 1600, H = 900, names = [];
    for (let k = 0; k < FADE; k++) {
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgb(0,0,40)'; ctx.fillRect(0, 0, 30, 30);     // marker (full alpha so dim frames still tag as lyrics)
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.globalAlpha = k / (FADE - 1);                              // 0 (invisible) → 1 (full)
      const lineH = 150, blockH = lines.length * lineH;
      const top = H / 2 - blockH / 2 + lineH / 2, maxW = W * 0.9;    // auto-fit each line so nothing is cut on the sides
      for (let i = 0; i < lines.length; i++) {
        let fs = 96; ctx.font = 'bold ' + fs + 'px Georgia';
        while (fs > 28 && ctx.measureText(lines[i]).width > maxW) { fs -= 2; ctx.font = 'bold ' + fs + 'px Georgia'; }
        const yy = top + i * lineH;
        ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.strokeStyle = '#000'; ctx.strokeText(lines[i], W / 2, yy);
        ctx.fillStyle = '#f5ecd2'; ctx.fillText(lines[i], W / 2, yy);
      }
      const nm = 'lyr' + b + '_' + k; addImage(nm, c.toDataURL('image/png')); names.push(nm);
    }
    lyricPrefix[b] = names;                                          // array of fade frames (dim→full)
  }
} catch (e) { lyricsOK = false; }

// Master visual timeline on channel 15 (single source of truth, scheduled at
// song time 0, not awaited). It interleaves: walk-cycle animations, artwork
// holds / quick-cut montages, and the scrolling-lyric scenes. Frames scheduled
// past the song end simply never fire. See ANIMATIONS.md.
const animSpb = 4;       // steps per beat — ~6fps at this BPM
const scenes = [];
const A = (seq, beats) => scenes.push({ k: 'anim', seq, beats });
const R = (beats, hold) => scenes.push({ k: 'art', beats, hold: hold || 2 });
const L = (b, beats) => scenes.push(
  (lyricsOK && lyricPrefix[b] != null) ? { k: 'lyr', b, beats } : { k: 'art', beats, hold: 3 });

R(6, 3);  L(0, 8);                 // title card over art
A('ink', 6);    L(6, 16);          // Fictionspawn credit — early, right after the title
A('green', 6);  L(1, 14);
A('ink', 6);  R(6, 1);  L(2, 14);  // R hold 1 = quick montage (motion in the new art)
A('green', 6);  L(3, 14);
R(6, 1);  A('ink', 6);  L(4, 14);
A('green', 6);  L(5, 14);
// tail — alternate animations & montages to cover the rest of the (looping) song
A('green', 8);  R(10, 2);  A('ink', 8);  R(10, 1);
A('green', 8);  R(12, 2);  A('ink', 8);  R(10, 1);  A('green', 8);

let artPtr = 0;
const steps = [];
for (const sc of scenes) {
  const n = Math.round(sc.beats * animSpb);
  for (let s = 0; s < n; s++) {
    if (sc.k === 'anim') {
      const fr = sc.seq === 'ink' ? inkFrames : greenFrames;
      const nm = sc.seq, f = s % fr;
      steps.push(() => startVideo(nm + f));
    } else if (sc.k === 'art') {
      const per = Math.max(1, Math.round(sc.hold * animSpb));
      const idx = (artPtr + Math.floor(s / per)) % artCount;
      steps.push(() => startVideo('art' + idx));
    } else {
      const frames = lyricPrefix[sc.b];           // fade frames dim→full
      const F = frames.length, p = s / n;         // 0..1 through the scene
      let idx = F - 1;                             // hold full in the middle
      if (p < 0.22) idx = Math.round((p / 0.22) * (F - 1));              // fade in
      else if (p > 0.78) idx = Math.round(((1.0 - p) / 0.22) * (F - 1)); // fade out
      idx = Math.max(0, Math.min(F - 1, idx));
      steps.push(() => startVideo(frames[idx]));
    }
  }
  if (sc.k === 'art') artPtr += Math.ceil(n / Math.max(1, Math.round(sc.hold * animSpb)));
}
createTrack(15).steps(animSpb, steps);

//solo(0);
//solo(2);

//solo(6);

const emptypattern = () => createTrack(0).steps(1/16,[,]);
const beat = () => createTrack(2).steps(4,[
  [g5,c5],,,,
  c5,,,,
  c5,,g5,,
  [g5,c5],,,,
  [g5,c5],,,,
  c5,,,,
  c5,,g5,,
  [g5,c5],,,,
  [g5,c5],,,,
  c5,,,,
  c5,,g5,,
  [g5,c5],,,,
  [g5,c5],,,,
  c5,,,,
  c5,,g5,,
  [c5,cs6,b5],,,,
]);

const cymbalRush = () => createTrack(2).steps(8,[
  ,,,,
  cs6(0.1,10),cs6(0.1,20),cs6(0.1,30),cs6(0.1,30),
  cs6(0.1,40),cs6(0.1,50),cs6(0.1,60),cs6(0.1,70),
  cs6(0.1,80),cs6(0.1,90),cs6(0.1,100),cs6(0.1,110),
  cs6(0.1,120),,,cs6(0.1,50),
  ,,cs6(0.1,10),
]);

const beatwithhihat = () => createTrack(2).steps(4,[
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [c5,b5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  c5,fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [c5,b5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [c5,b5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [c5,b5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  c5,fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [c5,b5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
  [c5,cs6],fs5(0.1,20),fs5(0.1,50),fs5(0.1,20),
  [cs6,c5],fs5(0.1,20),[cs6(0.1,50),fs5(0.1,50)],fs5(0.1,20),
]);


const strings = () => createTrack(1).play([[ 0.04, controlchange(64, 127) ],
[ 0.07, f5(1.98, 83) ],
[ 0.05, f2(2.03, 77) ],
[ 2.26, controlchange(64, 0) ],
[ 3.09, controlchange(64, 127) ],
[ 0.08, c5(3.52, 75) ],
[ 2.05, gs2(1.56, 77) ],
[ 0.07, gs4(3.56, 71) ],
[ 2.04, ds5(1.62, 76) ],
[ 4.25, controlchange(64, 0) ],
[ 5.05, controlchange(64, 127) ],
[ 4.04, g4(1.50, 87) ],
[ 4.04, ds2(1.54, 77) ],
[ 4.01, as4(1.58, 83) ],
[ 4.02, ds5(1.58, 76) ],
[ 6.18, controlchange(64, 0) ],
[ 7.11, controlchange(64, 127) ],
[ 6.01, as4(1.54, 78) ],
[ 6.03, f4(1.52, 87) ],
[ 6.02, as2(1.59, 66) ],
[ 6.03, d5(1.58, 79) ],
[ 8.19, controlchange(64, 0) ],
[ 9.06, controlchange(64, 127) ],
[ 8.05, f4(1.40, 79) ],
[ 8.05, c5(1.46, 87) ],
[ 8.05, gs4(1.49, 81) ],
[ 8.04, f2(1.52, 70) ],
[ 10.22, controlchange(64, 0) ],
[ 11.08, controlchange(64, 127) ],
[ 10.05, gs4(1.37, 81) ],
[ 10.06, ds4(1.38, 72) ],
[ 10.06, gs2(1.38, 58) ],
[ 10.07, c5(1.40, 83) ],
[ 12.09, controlchange(64, 0) ],
[ 13.07, controlchange(64, 127) ],
[ 11.99, g4(1.48, 87) ],
[ 11.99, ds4(1.51, 76) ],
[ 12.01, ds2(1.50, 57) ],
[ 12.02, as4(1.51, 82) ],
[ 14.14, controlchange(64, 0) ],
[ 15.03, controlchange(64, 127) ],
[ 14.05, as2(1.82, 78) ],
[ 14.03, d4(1.84, 75) ],
[ 14.02, f4(1.85, 84) ],
[ 14.01, as4(1.86, 81) ],
[ 15.99, controlchange(64, 0) ]]);

const choir = () => createTrack(9).play([[ 0.07, f7(2.02, 92) ],
[ 0.08, c7(3.61, 100) ],
[ 0.07, gs6(3.94, 91) ],
[ 4.03, g6(1.72, 67) ],
[ 2.03, ds7(3.98, 82) ],
[ 4.01, as6(3.74, 81) ],
[ 5.93, d7(2.12, 77) ],
[ 5.94, f6(3.73, 97) ],
[ 8.00, gs6(3.89, 98) ],
[ 8.01, c7(3.96, 89) ],
[ 11.99, g6(1.78, 89) ],
[ 10.04, ds6(3.86, 88) ],
[ 13.98, d6(1.99, 75) ],
[ 14.00, f6(1.99, 92) ],
[ 12.00, as6(4.00, 83) ]]);

const guitar = () => createTrack(3).play([[ 1.65, controlchange(64, 0) ],
[ 2.36, controlchange(64, 127) ],
[ 4.55, ds5(0.30, 96) ],
[ 5.02, ds5(0.29, 83) ],
[ 5.61, controlchange(64, 0) ],
[ 5.81, controlchange(64, 127) ],
[ 5.27, f5(1.05, 89) ],
[ 6.54, as4(0.18, 94) ],
[ 7.00, controlchange(64, 0) ],
[ 7.25, controlchange(64, 127) ],
[ 7.01, as4(0.34, 98) ],
[ 8.02, controlchange(64, 0) ],
[ 9.00, controlchange(64, 127) ],
[ 7.30, c5(2.03, 87) ],
[ 8.00, f4(2.09, 94) ],
[ 10.17, controlchange(64, 0) ],
[ 11.14, controlchange(64, 127) ],
[ 10.05, gs4(1.97, 91) ],
[ 12.08, controlchange(64, 0) ],
[ 13.15, controlchange(64, 127) ],
[ 12.02, as4(2.09, 89) ],
[ 15.09, controlchange(64, 127) ],
[ 15.97, controlchange(64, 0) ]]);

const bass = () => createTrack(4).play([[ 0.05, f2(1.92, 102) ],
[ 2.06, gs2(1.95, 81) ],
[ 4.03, ds2(1.87, 86) ],
[ 5.96, as2(1.95, 83) ],
[ 7.99, f2(1.95, 77) ],
[ 10.05, gs2(1.94, 81) ],
[ 12.02, ds2(1.96, 88) ],
[ 13.98, as1(1.98, 92) ]]);

const flute = () => createTrack(6).play([[ 0.57, ds7(0.27, 83) ],
[ 0.82, f7(0.30, 75) ],
[ 2.52, c7(0.33, 84) ],
[ 2.81, ds7(0.27, 89) ],
[ 3.28, f7(0.24, 83) ],
[ 4.51, as6(0.30, 93) ],
[ 4.81, c7(0.17, 97) ],
[ 5.31, ds7(0.24, 99) ],
[ 6.47, as6(0.30, 88) ],
[ 6.76, c7(0.30, 94) ],
[ 7.27, ds7(0.28, 76) ],
[ 8.52, f6(0.28, 90) ],
[ 8.78, gs6(0.30, 98) ],
[ 9.25, c7(0.30, 84) ],
[ 10.49, as6(0.28, 78) ],
[ 10.82, c7(0.27, 88) ],
[ 11.42, d7(0.23, 14) ],
[ 11.33, ds7(0.28, 96) ],
[ 12.53, as6(0.26, 82) ],
[ 12.80, c7(0.21, 90) ],
[ 13.28, ds7(0.22, 93) ],
[ 13.79, f7(0.35, 89) ],
[ 14.26, f6(0.15, 75) ],
[ 14.46, gs6(0.26, 72) ],
[ 14.77, f6(0.05, 54) ],
[ 15.01, as6(0.35, 94) ],
[ 15.50, as6(0.27, 59) ],
[ 15.53, c7(0.35, 84) ]]);

nextMonster();

choir();
strings();
await emptypattern();
strings();
choir();
bass();
await beat();

strings();
choir();
bass();
guitar();
await beatwithhihat();

strings();
choir();
bass();
guitar();
flute();
await beatwithhihat();

const piano = () => createTrack(0).play([[ 0.28, controlchange(64, 127) ],
[ 0.53, gs5(0.13, 41) ],
[ 0.52, gs6(0.16, 54) ],
[ 1.00, gs6(0.17, 68) ],
[ 0.99, gs5(0.19, 51) ],
[ 1.51, gs5(0.15, 48) ],
[ 1.50, gs6(0.17, 52) ],
[ 1.98, controlchange(64, 0) ],
[ 2.16, controlchange(64, 127) ],
[ 2.02, gs6(0.31, 76) ],
[ 2.03, gs5(0.31, 61) ],
[ 2.51, g5(0.17, 69) ],
[ 2.52, g6(0.18, 64) ],
[ 3.03, gs5(0.15, 48) ],
[ 3.01, gs6(0.24, 63) ],
[ 3.75, controlchange(64, 0) ],
[ 4.04, controlchange(64, 127) ],
[ 3.54, as6(0.68, 78) ],
[ 3.55, as5(0.67, 72) ],
[ 4.50, gs6(0.22, 76) ],
[ 4.52, gs5(0.20, 63) ],
[ 4.97, g6(0.20, 63) ],
[ 4.96, g5(0.24, 63) ],
[ 5.58, controlchange(64, 0) ],
[ 5.82, controlchange(64, 127) ],
[ 5.48, f5(0.53, 68) ],
[ 5.49, f6(0.56, 64) ],
[ 6.55, g6(0.27, 72) ],
[ 6.54, g5(0.30, 77) ],
[ 7.74, controlchange(64, 0) ],
[ 8.00, controlchange(64, 127) ],
[ 7.48, c5(0.65, 70) ],
[ 7.49, c6(0.69, 64) ],
[ 8.54, ds5(0.48, 81) ],
[ 8.55, ds6(0.48, 81) ],
[ 9.74, controlchange(64, 0) ],
[ 9.98, controlchange(64, 127) ],
[ 9.53, as4(0.55, 49) ],
[ 9.55, as5(0.57, 56) ],
[ 10.51, c6(0.32, 77) ],
[ 10.49, c5(0.40, 83) ],
[ 11.64, controlchange(64, 0) ],
[ 11.89, controlchange(64, 127) ],
[ 11.53, f4(0.46, 82) ],
[ 11.53, f5(0.56, 77) ],
[ 12.78, controlchange(64, 0) ],
[ 12.95, controlchange(64, 127) ],
[ 12.53, gs4(0.66, 64) ],
[ 12.52, gs5(0.72, 71) ],
[ 13.57, as4(0.53, 76) ],
[ 13.56, as5(0.57, 81) ],
[ 14.70, controlchange(64, 0) ],
[ 15.03, controlchange(64, 127) ],
[ 14.59, c5(0.93, 97) ],
[ 14.60, c6(0.93, 88) ],
[ 15.76, controlchange(64, 0) ]].quantize(4));

(async () => {
  await createTrack(2).steps(1, new Array(30));
  cymbalRush();
})();
nextMonster();
for (let n = 0; n<2; n++) {
  piano();
  strings();
  choir();
  bass();
  await beatwithhihat();
}

const beat2 = () => createTrack(2).steps(4,[
  [g5,c5],fs5(0.1,10),fs5,,
  d5,,fs5,,
  c5,,[fs5,g5],fs5(0.1,10),
  [g5,d5],,fs5,,
]);

const padsynth = () => createTrack(7).play([[ 0.16, controlchange(64, 127) ],
[ 0.07, f5(1.29, 83) ],
[ 1.68, controlchange(64, 0) ],
[ 1.97, controlchange(64, 127) ],
[ 0.07, c5(3.12, 88) ],
[ 0.06, gs4(3.17, 88) ],
[ 1.48, ds5(1.78, 73) ],
[ 3.99, controlchange(64, 0) ],
[ 5.02, controlchange(64, 127) ],
[ 3.94, g5(1.36, 87) ],
[ 3.92, ds5(1.48, 88) ],
[ 5.64, controlchange(64, 0) ],
[ 6.08, controlchange(64, 127) ],
[ 5.49, d5(1.34, 75) ],
[ 5.48, f5(1.37, 68) ],
[ 3.93, as4(2.95, 91) ],
[ 8.05, controlchange(64, 0) ],
[ 8.46, controlchange(64, 127) ],
[ 8.03, f5(1.54, 87) ],
[ 9.70, controlchange(64, 0) ],
[ 10.10, controlchange(64, 127) ],
[ 8.03, c5(3.23, 97) ],
[ 9.55, ds5(1.71, 87) ],
[ 8.05, gs5(3.22, 88) ],
[ 12.02, controlchange(64, 0) ],
[ 13.03, controlchange(64, 127) ],
[ 11.99, ds5(1.45, 86) ],
[ 11.99, g5(1.48, 89) ],
[ 13.69, controlchange(64, 0) ],
[ 14.15, controlchange(64, 127) ],
[ 15.76, controlchange(64, 0) ],
[ 12.01, as5(3.85, 78) ],
[ 13.52, f5(2.34, 82) ],
[ 13.52, d5(2.35, 75) ]].quantize(4));

const thebase = () => createTrack(4).play([[ 0.06, f2(1.36, 72) ],
[ 1.50, gs2(2.42, 73) ],
[ 4.03, ds2(1.28, 77) ],
[ 5.49, as1(1.09, 76) ],
[ 6.57, c2(0.45, 75) ],
[ 7.04, ds2(0.92, 83) ],
[ 8.01, f2(1.46, 78) ],
[ 9.51, gs2(2.47, 69) ],
[ 12.01, ds2(1.45, 76) ],
[ 13.52, as2(2.31, 86) ]].quantize(4));

const theflute = () => createTrack(6).play([[ 0.48, ds7(0.30, 72) ],
[ 0.80, f7(0.20, 69) ],
[ 1.30, ds7(0.20, 66) ],
[ 1.48, f7(0.17, 63) ],
[ 1.91, f7(0.22, 58) ],
[ 2.04, gs7(0.43, 71) ],
[ 2.45, f7(0.93, 67) ],
[ 4.47, ds7(0.25, 77) ],
[ 4.76, f7(0.23, 72) ],
[ 5.26, ds7(0.29, 59) ],
[ 5.52, f7(0.12, 72) ],
[ 6.00, as7(0.25, 81) ],
[ 6.48, as7(0.16, 82) ],
[ 6.59, c8(0.34, 84) ],
[ 6.99, f7(0.90, 77) ],
[ 8.43, ds7(0.27, 68) ],
[ 8.72, f7(0.24, 69) ],
[ 9.23, ds7(0.19, 59) ],
[ 9.42, f7(0.22, 68) ],
[ 9.92, f7(0.17, 62) ],
[ 10.02, gs7(0.38, 77) ],
[ 10.43, f7(0.64, 67) ],
[ 11.50, as7(0.59, 94) ],
[ 12.37, as7(0.14, 86) ],
[ 12.48, c8(0.52, 88) ],
[ 13.45, f7(0.41, 87) ],
[ 14.39, f7(0.17, 78) ],
[ 14.52, gs7(0.93, 83) ]]);


theflute();
padsynth();
thebase();
await beat2();
await beat2();
await beat2();
await beat2();

nextMonster();
theflute();
padsynth();
thebase();
await beat2();
await beat2();
await beat2();
await beat2();


thebase();

const theNewFlute = () => createTrack(6).play([[ 0.72, c8(0.39, 89) ],
[ 1.49, f7(1.00, 89) ],
[ 2.42, gs7(0.74, 94) ],
[ 4.02, as7(0.85, 97) ],
[ 4.80, c8(0.45, 88) ],
[ 5.51, f7(0.99, 83) ],
[ 6.50, ds7(0.58, 88) ],
[ 8.00, as7(0.85, 108) ],
[ 8.81, c8(0.30, 88) ],
[ 9.52, f7(0.63, 87) ],
[ 10.41, gs7(0.86, 88) ],
[ 12.00, as7(0.52, 102) ],
[ 12.72, as7(0.12, 77) ],
[ 12.82, c8(0.23, 82) ],
[ 13.48, ds8(0.71, 96) ],
[ 14.46, c8(0.37, 87) ],
[ 14.97, as7(0.51, 88) ],
[ 15.44, gs7(0.36, 84) ]]);

const theNewPiano = () => createTrack(0).play([[ 0.11, controlchange(64, 127) ],
[ 0.09, f4(0.29, 79) ],
[ 0.11, f6(0.28, 79) ],
[ 0.08, gs5(0.31, 78) ],
[ 0.10, c6(0.33, 72) ],
[ 0.81, f6(0.27, 67) ],
[ 0.83, gs5(0.26, 63) ],
[ 0.83, f4(0.27, 70) ],
[ 0.83, c6(0.29, 60) ],
[ 1.43, controlchange(64, 0) ],
[ 1.74, controlchange(64, 127) ],
[ 1.54, c6(1.12, 65) ],
[ 1.54, gs5(1.17, 61) ],
[ 1.55, ds6(1.27, 54) ],
[ 1.56, gs4(1.53, 52) ],
[ 3.51, ds6(0.22, 76) ],
[ 3.89, controlchange(64, 0) ],
[ 3.76, f6(0.21, 62) ],
[ 4.08, controlchange(64, 127) ],
[ 4.03, g6(0.28, 79) ],
[ 4.05, ds6(0.28, 72) ],
[ 4.02, ds5(0.32, 58) ],
[ 4.05, as5(0.32, 54) ],
[ 4.78, ds5(0.17, 59) ],
[ 4.75, ds6(0.29, 76) ],
[ 4.78, g6(0.28, 75) ],
[ 4.77, as5(0.29, 56) ],
[ 5.43, controlchange(64, 0) ],
[ 5.68, controlchange(64, 127) ],
[ 5.50, d6(0.93, 74) ],
[ 5.50, f6(1.01, 82) ],
[ 5.51, as4(1.01, 56) ],
[ 5.51, as5(1.06, 51) ],
[ 7.52, f6(0.43, 58) ],
[ 7.72, gs6(0.27, 69) ],
[ 7.99, controlchange(64, 0) ],
[ 8.18, controlchange(64, 127) ],
[ 8.05, c6(0.26, 62) ],
[ 8.05, gs5(0.28, 58) ],
[ 8.06, f5(0.28, 59) ],
[ 8.01, f6(0.35, 8) ],
[ 8.03, c7(0.32, 87) ],
[ 8.71, controlchange(64, 0) ],
[ 8.85, controlchange(64, 127) ],
[ 8.81, f5(0.06, 15) ],
[ 8.76, c6(0.12, 43) ],
[ 8.75, gs5(0.13, 49) ],
[ 8.75, f6(0.24, 75) ],
[ 8.75, c7(0.26, 77) ],
[ 9.46, controlchange(64, 0) ],
[ 9.71, controlchange(64, 127) ],
[ 9.48, as6(0.93, 82) ],
[ 9.48, f6(1.23, 77) ],
[ 10.49, c7(0.36, 68) ],
[ 10.77, as6(0.28, 81) ],
[ 9.48, gs4(1.69, 38) ],
[ 9.51, gs5(1.72, 51) ],
[ 11.01, gs6(0.47, 83) ],
[ 11.50, f6(0.23, 70) ],
[ 11.91, controlchange(64, 0) ],
[ 12.12, controlchange(64, 127) ],
[ 11.99, ds5(0.71, 58) ],
[ 12.00, as5(0.70, 54) ],
[ 11.98, g6(0.83, 82) ],
[ 12.73, gs6(0.51, 77) ],
[ 13.54, controlchange(64, 0) ],
[ 13.81, controlchange(64, 127) ],
[ 13.51, as5(1.56, 47) ],
[ 13.53, f5(1.53, 49) ],
[ 13.47, as4(1.65, 41) ],
[ 13.51, d6(1.65, 67) ],
[ 13.48, f6(1.72, 78) ],
[ 15.40, controlchange(64, 0) ]].quantize(4));

const theNewChoir = ()=> createTrack(9).play([
  [ 0, as7(4.02, 97) ],
  [ 0.08, gs7(1.37, 91) ],
[ 0.07, f7(1.38, 90) ],
[ 1.44, ds7(2.41, 89) ],
[ 1.45, g7(2.42, 83) ],
[ 4.00, g7(1.45, 110) ],
[ 4.03, as7(3.81, 93) ],
[ 5.47, f7(2.42, 89) ],
[ 7.94, gs7(4.04, 92) ],
[ 7.97, c8(4.06, 94) ],
[ 11.99, g7(1.48, 99) ],
[ 13.48, f7(2.52, 90) ],
].quantize(4));

nextMonster();
theNewPiano();
theNewFlute();
theNewChoir();

await beat2();
await beat2();
await beat2();
await beat2();

const theBass3 = () => createTrack(4).play([[ 0.04, f2(0.48, 74) ],
[ 0.74, f2(0.56, 65) ],
[ 1.45, gs2(0.75, 77) ],
[ 2.47, gs2(0.51, 71) ],
[ 3.31, gs2(0.61, 83) ],
[ 4.03, ds2(0.54, 77) ],
[ 4.77, ds2(0.58, 81) ],
[ 5.48, as2(0.55, 78) ],
[ 6.48, as2(0.67, 83) ],
[ 7.26, c3(0.20, 68) ],
[ 7.57, ds3(0.20, 86) ],
[ 8.05, f2(0.53, 77) ],
[ 8.74, f2(0.49, 78) ],
[ 9.45, gs2(0.84, 59) ],
[ 10.49, gs2(0.45, 77) ],
[ 11.27, gs2(0.44, 86) ],
[ 11.93, ds2(0.56, 81) ],
[ 12.73, ds2(0.27, 87) ],
[ 13.44, as1(0.65, 83) ],
[ 14.45, as1(0.51, 86) ],
[ 15.23, c2(0.21, 72) ],
[ 15.47, ds2(0.36, 86) ]].quantize(4));

const beat3 = () => createTrack(2).steps(4,[
  [g5,c5],fs5(0.1,10),fs5,,
  [d5,c5],fs5(0.05,30),gs5(0.05,70),,
  c5,fs5(0.05,30),[fs5,g5],[c5(0.05,80),fs5(0.1,10)],
  [g5,d5,c5],fs5(0.05,30),[c5,gs5(0.05,70)],fs5(0.05,30),
]);


theBass3();
theNewPiano();

theNewChoir();

await beat3();
await beat3();
await beat3();
await beat3();


const thePiano3 = () => createTrack(0).play([[ 0.08, controlchange(64, 127) ],
[ 0.04, f3(0.97, 50) ],
[ 0.05, f2(0.97, 35) ],
[ 0.02, f5(1.04, 58) ],
[ 0.01, c5(1.05, 64) ],
[ 0.01, gs4(1.12, 64) ],
[ 1.63, controlchange(64, 0) ],
[ 1.88, controlchange(64, 127) ],
[ 1.58, c5(1.58, 64) ],
[ 1.59, gs4(1.58, 48) ],
[ 1.62, gs2(1.55, 41) ],
[ 1.59, ds5(1.60, 54) ],
[ 1.62, gs3(1.61, 48) ],
[ 4.05, controlchange(64, 0) ],
[ 4.30, controlchange(64, 127) ],
[ 4.07, g5(0.69, 55) ],
[ 4.05, ds4(0.75, 46) ],
[ 4.07, g4(0.82, 52) ],
[ 4.04, ds5(0.86, 57) ],
[ 4.08, ds3(0.88, 37) ],
[ 5.57, controlchange(64, 0) ],
[ 5.82, controlchange(64, 127) ],
[ 5.56, f4(0.88, 49) ],
[ 5.59, as4(0.93, 49) ],
[ 5.59, f5(0.96, 52) ],
[ 5.56, as2(1.01, 37) ],
[ 5.55, d5(1.03, 49) ],
[ 5.53, as3(1.05, 44) ],
[ 7.86, controlchange(64, 0) ],
[ 8.15, controlchange(64, 127) ],
[ 8.01, f3(0.94, 57) ],
[ 8.01, f4(0.98, 47) ],
[ 8.01, f5(1.01, 67) ],
[ 7.96, gs5(1.11, 66) ],
[ 8.01, c6(1.08, 44) ],
[ 7.98, c5(1.12, 69) ],
[ 9.60, controlchange(64, 0) ],
[ 9.75, controlchange(64, 127) ],
[ 9.57, c6(1.49, 60) ],
[ 9.58, gs4(1.50, 49) ],
[ 9.54, gs5(1.62, 66) ],
[ 9.56, c5(1.64, 64) ],
[ 9.57, gs3(1.62, 49) ],
[ 9.56, ds5(1.66, 64) ],
[ 12.06, controlchange(64, 0) ],
[ 12.25, controlchange(64, 127) ],
[ 12.02, ds4(0.60, 43) ],
[ 12.03, g5(0.69, 63) ],
[ 12.04, ds3(0.77, 44) ],
[ 12.02, ds5(0.79, 58) ],
[ 11.99, as4(0.85, 66) ],
[ 12.02, as5(0.88, 63) ],
[ 13.53, controlchange(64, 0) ],
[ 13.74, controlchange(64, 127) ],
[ 15.01, controlchange(64, 127) ],
[ 15.36, controlchange(64, 0) ],
[ 13.53, as2(2.18, 38) ],
[ 13.50, as3(2.23, 38) ],
[ 13.47, as4(2.25, 57) ],
[ 13.53, d5(2.22, 55) ],
[ 13.49, as5(2.25, 52) ],
[ 13.53, f5(2.23, 58) ],
[ 15.77, controlchange(64, 0) ]].quantize(4));

const thepad3 = (ch) => createTrack(ch).play([[ 0.72, gs6(0.70, 73) ],
[ 1.42, c7(0.59, 79) ],
[ 2.03, controlchange(64, 127) ],
[ 0.42, f6(1.62, 75) ],
[ 2.97, controlchange(64, 0) ],
[ 1.96, as6(1.02, 72) ],
[ 2.44, g6(0.54, 68) ],
[ 4.03, controlchange(64, 127) ],
[ 2.95, gs6(1.16, 72) ],
[ 3.52, ds6(1.01, 81) ],
[ 4.83, controlchange(64, 0) ],
[ 5.00, controlchange(64, 127) ],
[ 4.52, f6(0.95, 75) ],
[ 5.79, controlchange(64, 0) ],
[ 6.03, controlchange(64, 127) ],
[ 5.50, as5(1.20, 82) ],
[ 6.78, controlchange(64, 0) ],
[ 7.14, controlchange(64, 127) ],
[ 7.93, controlchange(64, 0) ],
[ 6.49, c6(1.54, 68) ]].quantize(4));


nextMonster();
thePiano3();
theBass3();
thepad3(7);
await beat3();
await beat3();
thepad3(7);
thepad3(3);
await beat3();
await beat3();


// --------------------

const theChoir3 = () => createTrack(9).play([[ 0.01, f7(1.40, 88) ],
[ 0.03, c7(3.77, 94) ],
[ 0.02, gs7(3.85, 86) ],
[ 1.40, ds7(2.52, 93) ],
[ 4.05, ds7(1.20, 103) ],
[ 4.05, g7(1.32, 102) ],
[ 4.05, as6(1.33, 96) ],
[ 5.43, as6(2.35, 15) ],
[ 5.47, d7(2.37, 90) ],
[ 5.46, f7(2.46, 88) ],
[ 7.98, f7(1.50, 60) ],
[ 9.48, ds7(2.23, 93) ],
[ 8.01, c7(3.71, 94) ],
[ 8.01, gs7(3.77, 76) ],
[ 11.96, ds7(1.42, 88) ],
[ 11.97, g7(1.48, 100) ],
[ 13.53, d7(2.42, 87) ],
[ 13.53, f7(2.44, 89) ],
[ 11.97, as7(4.00, 96) ]].quantize(4));


theChoir3();
thePiano3();
theBass3();
thepad3(7);
thepad3(3);
await beat3();
await beat3();
thepad3(7);
thepad3(6);
thepad3(3);
await beat3();
await beat3();


const maxGuitar = () => createTrack(3).play([[ 0.04, f5(0.42, 104) ],
[ 0.49, f6(0.36, 67) ],
[ 0.78, f5(0.50, 100) ],
[ 1.26, f6(0.34, 83) ],
[ 1.55, f5(0.48, 95) ],
[ 2.00, ds5(0.57, 77) ],
[ 2.51, ds6(0.36, 83) ],
[ 2.83, ds5(0.53, 88) ],
[ 3.34, ds6(0.30, 72) ],
[ 3.53, ds5(0.34, 81) ],
[ 4.01, ds5(0.57, 88) ],
[ 4.54, ds6(0.35, 91) ],
[ 4.77, ds5(0.50, 72) ],
[ 5.30, ds6(0.36, 73) ],
[ 5.50, ds5(0.45, 81) ],
[ 5.98, d5(0.54, 79) ],
[ 6.50, d6(0.35, 90) ],
[ 6.80, d5(0.45, 94) ],
[ 7.28, d6(0.36, 72) ],
[ 7.54, d5(0.45, 93) ]].quantize(4));


nextMonster();
maxGuitar();
theChoir3();
thePiano3();
theBass3();
await beat3();
await beat3();
maxGuitar();
await beat3();
await beat3();

nextMonster();
maxGuitar();
theChoir3();
thePiano3();
theBass3();
await beat3();
await beat3();
maxGuitar();
await beat3();
(async () => {
  await createTrack(2).steps(1, new Array(2));
  cymbalRush();
})();
await beat3();


const beat4 = () => createTrack(2).steps(4,[
  [c5],fs5(0.1,10),fs5,,
  [c5],fs5(0.05,30),fs5(0.05,70),,
  c5,fs5(0.05,30),[fs5],[c5(0.05,80),fs5(0.1,10)],
  [c5],fs5(0.05,30),[c5,gs5(0.05,70)],fs5(0.05,30),
]);

createTrack(0).play([[ 0.12, controlchange(64, 127) ],
[ 0.05, f5(0.44, 78) ],
[ 0.05, f6(0.45, 74) ],
[ 0.06, c6(0.46, 74) ],
[ 0.80, f5(0.13, 75) ],
[ 0.80, f6(0.14, 69) ],
[ 0.77, c6(0.22, 52) ],
[ 1.64, controlchange(64, 0) ],
[ 1.77, controlchange(64, 127) ],
[ 1.58, ds6(0.48, 49) ],
[ 1.57, ds5(0.54, 66) ],
[ 1.57, c6(0.54, 69) ],
[ 2.57, ds6(0.29, 73) ],
[ 2.55, ds5(0.33, 82) ],
[ 2.55, c6(0.38, 78) ],
[ 3.36, ds6(0.22, 71) ],
[ 3.35, ds5(0.26, 77) ],
[ 3.35, c6(0.32, 75) ],
[ 4.04, controlchange(64, 0) ],
[ 4.22, controlchange(64, 127) ],
[ 4.06, ds5(0.32, 76) ],
[ 4.05, ds6(0.33, 81) ],
[ 4.07, as5(0.35, 81) ],
[ 4.76, as5(0.22, 63) ],
[ 4.76, ds5(0.24, 68) ],
[ 4.74, ds6(0.29, 72) ],
[ 5.61, controlchange(64, 0) ],
[ 5.78, controlchange(64, 127) ],
[ 5.55, d6(0.49, 65) ],
[ 5.53, as5(0.52, 76) ],
[ 5.54, f5(0.52, 70) ],
[ 6.52, f5(0.27, 69) ],
[ 6.52, d6(0.28, 63) ],
[ 6.50, as5(0.32, 72) ],
[ 7.28, as5(0.13, 68) ],
[ 7.25, d6(0.16, 68) ],
[ 7.28, f5(0.14, 69) ],
[ 7.98, controlchange(64, 0) ],
[ 8.14, controlchange(64, 127) ],
[ 8.00, f5(0.28, 82) ],
[ 8.03, f6(0.27, 75) ],
[ 8.02, c6(0.29, 74) ],
[ 8.76, f6(0.12, 60) ],
[ 8.79, c6(0.12, 69) ],
[ 8.79, f5(0.14, 64) ],
[ 9.59, controlchange(64, 0) ],
[ 9.74, controlchange(64, 127) ],
[ 9.55, ds6(0.45, 59) ],
[ 9.54, c6(0.48, 69) ],
[ 9.52, ds5(0.50, 72) ],
[ 10.57, ds6(0.21, 64) ],
[ 10.54, ds5(0.30, 73) ],
[ 10.57, c6(0.30, 70) ],
[ 11.34, ds6(0.18, 69) ],
[ 11.31, ds5(0.25, 76) ],
[ 11.34, c6(0.26, 70) ],
[ 11.99, controlchange(64, 0) ],
[ 12.17, controlchange(64, 127) ],
[ 12.01, ds6(0.29, 72) ],
[ 12.01, ds5(0.29, 71) ],
[ 12.03, as5(0.28, 69) ],
[ 12.76, ds5(0.19, 63) ],
[ 12.78, as5(0.17, 59) ],
[ 12.76, ds6(0.20, 61) ],
[ 13.58, controlchange(64, 0) ],
[ 13.78, controlchange(64, 127) ],
[ 13.49, c6(1.00, 70) ],
[ 13.51, f6(2.54, 60) ],
[ 13.48, f5(2.57, 75) ],
[ 14.47, as5(1.66, 73) ],
[ 16.18, controlchange(64, 0) ]].quantize(4));

nextMonster();
choir();
bass();

await beat4();
await beat4();
await beat4();
await beat4();

const beat5 = () => createTrack(2).steps(4,[
  [c5],fs5(0.1,10),,,
  fs5(0.1,6),,,,
  fs5(0.1,3),,,,
  fs5(0.1,1),,,,]);

await beat5();

loopHere();