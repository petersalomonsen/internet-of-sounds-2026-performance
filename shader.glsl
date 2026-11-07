#version 300 es
/*
 * Concert visualizer — TWO scenes in one shader, switched by the song.
 *
 *   uScene = 0  →  3D piano keyboard: keys dip and light up with the MIDI notes
 *   uScene = 1  →  dancing crowd on a lit stage floor (from "Prompted")
 *
 * The song picks the scene at the top of each part:
 *     setVisual('uScene', 0);            // snap
 *     setVisual('uScene', 1, 2.0);       // 2-second crossfade
 * so jumping to a part with go_to_part brings its visuals with it.
 *
 * The dancer scene's staging cues (crowd/lights/floor/camera) default to
 * "full disco" unless the song takes control by setting uCues = 1.
 */

precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float targetNoteStates[128];     // instant: velocity/127*2-1, -1 = off
uniform float smoothedNoteStates[128];   // instant attack, slow release
uniform sampler2D uText;                 // showText() layer
uniform sampler2D uTextPrev;
uniform float uTextMix;

uniform float uScene;     // 0 = piano keys .. 1 = dancers (ramp to crossfade)

// --- dancer-scene staging cues (only used when uCues = 1) ---
uniform float uCues;      // 0 = scene runs on its own defaults .. 1 = the song drives the cues below
uniform float uCrowd;     // 0 = lone hero .. 1 = full crowd
uniform float uZoom;      // 0 = close on the hero .. 1 = pulled back
uniform float uCamMove;   // 0 = locked camera .. 1 = moving orbit/tour
uniform float uLights;    // 0 = dark stage (white hero spot) .. 1 = disco rig up
uniform float uFloor;     // 0 = void .. 1 = tiled dancefloor
uniform float uHero;      // 0 = empty stage .. 1 = the lone hero has stepped in
uniform float uItalo;     // 0 = one arm-move per beat .. 1 = italo 8th-note moves
uniform float uOffKick;   // 1 = extra arm move on the off-beat of every 4th beat
uniform float uRunning;   // 0 = front-facing dance .. 1 = running man, seen in profile
uniform float uFadeOut;   // 0 = picture .. 1 = black (ramp it for an ending)
uniform float uStars;     // 0 = off .. 1 = starfield flying toward the viewer, behind the scene
uniform float uTextFx;    // 0 = still text .. 1 = text zooms out/in and spins
uniform float uEndPose;   // 0 = dancing .. 1 = frozen pose A .. 2 = frozen mirrored pose B

out vec4 fragColor;

const float BPM = 90.0;
const float HALFPI = 1.5707963;

float cue(float v, float dflt) { return mix(dflt, v, clamp(uCues, 0.0, 1.0)); }

float hash21(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// tapered capsule: solid limb, radius ra at a shrinking to rb at b
float capT(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}

// oriented solid ellipse (approx signed distance); dir = unit major-axis direction
float sdEll(vec2 p, vec2 c, vec2 dir, float ha, float hb) {
  vec2 rel = p - c;
  vec2 q = vec2(dot(rel, dir), dot(rel, vec2(-dir.y, dir.x)));
  vec2 n = vec2(q.x / ha, q.y / hb);
  return (length(n) - 1.0) * min(ha, hb);
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// ===================================================================
//  SCENE 0 — 3D piano keyboard
// ===================================================================

const float KW    = 0.32;        // white key pitch
const float NW    = 35.0;        // number of white keys (5 octaves from c2)
const float MIDI0 = 24.0;        // leftmost white key = c2
const float HALFW = NW * KW * 0.5;
const float WH    = 0.12;        // white key half height
const float WL    = 1.00;        // white key half length (z)
const float BH    = 0.20;        // black key half height
const float BL    = 0.62;        // black key half length
const float BZ    = -0.38;       // black keys sit toward the back
const float DIP   = 0.17;        // how far the FRONT of a key sinks when pressed

float gId, gMidi, gPress;        // what map() last hit

float whiteMidi(float i) {       // white key index -> midi note
  float oct = floor(i / 7.0);
  float d = i - oct * 7.0;
  return MIDI0 + oct * 12.0 + d * 2.0 - step(2.5, d);
}

float pressAt(float midi, bool instant) {
  int idx = int(clamp(midi, 0.0, 127.0));
  float s = instant ? targetNoteStates[idx] : smoothedNoteStates[idx];
  return clamp(s * 0.5 + 0.5, 0.0, 1.0);
}

vec3 pitchColor(float midi) {
  return 0.55 + 0.45 * cos(6.2831853 * fract(midi / 12.0) + vec3(0.0, 2.1, 4.2));
}

// a pressed key rotates about its BACK edge: shift the sample point up by an
// amount that grows toward the front, so the front dips and the back stays put.
float dipShift(float z, float press) {
  return press * DIP * clamp((z + WL) / (2.0 * WL), 0.0, 1.0);
}

float map(vec3 p) {
  float x = p.x + HALFW;

  // ---- white keys ----
  float i = clamp(floor(x / KW), 0.0, NW - 1.0);
  float mW = whiteMidi(i);
  float pW = pressAt(mW, false);
  vec3 qw = vec3(x - (i + 0.5) * KW, p.y + dipShift(p.z, pW), p.z);
  float d = sdBox(qw, vec3(KW * 0.45, WH, WL));
  float id = 0.0, md = mW, pr = pW;

  // ---- black keys (on the boundaries between certain white keys) ----
  float j = floor(x / KW + 0.5);
  float jm = mod(j, 7.0);
  if (jm != 0.0 && jm != 3.0 && j > 0.5 && j < NW - 0.5) {
    float mB = whiteMidi(j - 1.0) + 1.0;
    float pB = pressAt(mB, false);
    vec3 qb = vec3(x - j * KW, p.y + dipShift(p.z, pB) - WH, p.z - BZ);
    float dB = sdBox(qb, vec3(KW * 0.28, BH, BL));
    if (dB < d) { d = dB; id = 1.0; md = mB; pr = pB; }
  }

  // ---- instrument body: back block and front rail ----
  float db = min(sdBox(p - vec3(0.0, -0.05, -1.95), vec3(HALFW + 0.16, 0.45, 0.85)),
                 sdBox(p - vec3(0.0, -0.10,  1.18), vec3(HALFW + 0.16, 0.26, 0.16)));
  if (db < d) { d = db; id = 2.0; pr = 0.0; }

  gId = id; gMidi = md; gPress = pr;
  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(map(p + e.xyy) - map(p - e.xyy),
                        map(p + e.yxy) - map(p - e.yxy),
                        map(p + e.yyx) - map(p - e.yyx)));
}

float keyX(float midi, out bool isBlack) {      // midi note -> x centre of its key
  float rel = midi - MIDI0;
  float oct = floor(rel / 12.0);
  float s = rel - oct * 12.0;
  float k = floor(s * 7.0 / 12.0 + 0.5);
  isBlack = (s == 1.0 || s == 3.0 || s == 6.0 || s == 8.0 || s == 10.0);
  return (oct * 7.0 + k + (isBlack ? 0.0 : 0.5)) * KW - HALFW;
}

vec3 scenePiano(vec2 uv, float t) {
  // camera: above and in front, looking down onto the tilted keybed
  vec3 ro = vec3(0.30 * sin(t * 0.08), 5.6, 6.1);
  vec3 ta = vec3(0.0, -0.10, -0.25);
  float focal = 1.06;
  vec3 fwd = normalize(ta - ro);
  vec3 rgt = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 upv = cross(rgt, fwd);
  vec3 rd  = normalize(fwd + (uv.x * rgt + uv.y * upv) / focal);

  vec3 col = mix(vec3(0.015, 0.018, 0.030), vec3(0.002, 0.003, 0.008),
                 clamp(uv.y * 1.2 + 0.4, 0.0, 1.0));

  float tt = 0.0;
  bool hit = false;
  for (int k = 0; k < 120; k++) {
    float d = map(ro + rd * tt);
    if (d < 0.0015 + 0.0008 * tt) { hit = true; break; }
    tt += d * 0.70;
    if (tt > 30.0) break;
  }

  if (hit) {
    vec3 p = ro + rd * tt;
    map(p);                                   // refresh gId / gMidi / gPress
    float id = gId, md = gMidi, pr = gPress;
    vec3 n = calcNormal(p);

    vec3 base = (id < 0.5) ? vec3(0.90, 0.89, 0.86)
              : (id < 1.5) ? vec3(0.045, 0.045, 0.055)
                           : vec3(0.055, 0.050, 0.065);

    vec3 l1 = normalize(vec3(-0.35, 0.90, 0.60));   // key light, above-front
    vec3 l2 = normalize(vec3(0.70, 0.35, -0.45));   // cool rim from behind
    float dif1 = max(dot(n, l1), 0.0);
    float dif2 = max(dot(n, l2), 0.0);
    float spe = pow(max(dot(n, normalize(l1 - rd)), 0.0), 48.0);

    col = base * (0.16 + 0.95 * dif1) + base * vec3(0.25, 0.35, 0.55) * dif2 * 0.5;
    col += vec3(1.0) * spe * ((id < 1.5) ? 0.55 : 0.25);

    if (id < 1.5 && pr > 0.001) {               // pressed keys glow in a pitch colour
      vec3 gc = pitchColor(md);
      col = mix(col, gc, 0.55 * pr);
      col += gc * pr * (0.9 + 0.6 * max(dot(n, vec3(0.0, 1.0, 0.0)), 0.0));
      col += gc * pr * pressAt(md, true) * 0.5;        // extra flash on the attack
    }
    col *= exp(-0.025 * tt);
  }

  // glow in the air above every sounding key (visible even when occluded)
  for (int m = 24; m <= 84; m++) {
    float fm = float(m);
    float pr = pressAt(fm, false);
    if (pr < 0.01) continue;
    bool blk;
    float kx = keyX(fm, blk);
    vec3 wp = vec3(kx, blk ? 0.34 : 0.14, blk ? BZ : 0.1);
    vec3 v = wp - ro;
    float z = dot(v, fwd);
    if (z < 0.1) continue;
    vec2 sp = vec2(dot(v, rgt), dot(v, upv)) / z * focal;
    float r = length(uv - sp);
    float sc = focal / z;
    vec3 gc = pitchColor(fm);
    col += gc * pr * 0.0022 * sc / (r * r + 0.004 * sc * sc);
    col += gc * pr * pressAt(fm, true) * 0.0010 * sc / (r * r + 0.0016);
  }

  return col;
}

// ===================================================================
//  SCENE 1 — dancing crowd on a lit stage
// ===================================================================

const float FIGSCALE = 0.8;     // world metres per local unit
const int ROWS = 5;
const int COLS = 9;
const float COLGAP = 1.15;
const float ROWGAP = 1.4;
const float FRONTZ = 1.6;       // z of the front row

// running-man leg pose for eighth-note slot m (0..3): x = thigh angle, y = knee bend
vec2 rmLeg(float m) {
  if (m < 0.5) return vec2( 0.00, 0.20);
  if (m < 1.5) return vec2(-0.50, 0.12);
  if (m < 2.5) return vec2( 1.10, 1.60);
  return vec2( 0.50, 0.15);
}

// running-man arm pose for slot m: x = upper-arm angle, y = forearm angle
vec2 rmArm(float m) {
  if (m < 0.5) return vec2( 0.00, 1.57);
  if (m < 1.5) return vec2(-1.30, -0.10);
  if (m < 2.5) return vec2( 0.00, 1.57);
  return vec2( 1.30, 3.00);
}

// project a dancer's local joint (2D, in the figure's own plane) to the screen
vec2 jp(vec2 L, vec3 base, vec3 WX, vec3 ro, vec3 fwd, vec3 rgt, vec3 upv, float focal) {
  vec3 wp = base + (L.x * FIGSCALE) * WX + vec3(0.0, (L.y + 0.46) * FIGSCALE, 0.0);
  vec3 v = wp - ro; float z = dot(v, fwd);
  return z > 0.05 ? vec2(dot(v, rgt), dot(v, upv)) / z * focal : vec2(1e3);
}

// coloured light reaching a 3D point from the four sweeping stage fixtures
vec3 lightAt(vec3 P, float t, float lights) {
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec3 lp = vec3((fi - 1.5) * 3.4, 7.5, -1.5);
    float sweep = sin(t * (0.55 + 0.10 * fi) + fi * 1.7) * 0.6;
    vec3 aim = normalize(vec3(sweep, -1.0, 0.18));
    vec3 cc = 0.55 + 0.45 * cos(2.0944 * fi + vec3(0.0, 2.1, 4.2));
    vec3 dv = P - lp; float dist = length(dv) + 1e-3; vec3 dir = dv / dist;
    float cone = smoothstep(0.80, 0.95, dot(dir, aim));
    acc += cc * cone * (1.0 / (1.0 + 0.035 * dist * dist)) * 1.9;
  }
  acc *= lights;
  // white follow-spot on the lone hero, on until the disco rig takes over
  vec3 lpH = vec3(0.0, 6.0, 2.1);
  vec3 dh = P - lpH; float distH = length(dh) + 1e-3;
  float coneH = smoothstep(0.95, 0.995, dot(dh / distH, normalize(vec3(0.0, -1.0, -0.22))));
  acc += vec3(1.0, 0.97, 0.9) * coneH / (1.0 + 0.09 * distH * distH) * (1.0 - lights) * 1.2;
  return acc;
}

vec3 sceneDancers(vec2 uv, float t) {
  float cCrowd = cue(uCrowd, 1.0), cZoom = cue(uZoom, 1.0), cMove = cue(uCamMove, 1.0);
  float cLight = cue(uLights, 1.0), cFloor = cue(uFloor, 1.0), cHero = cue(uHero, 1.0);

  // ---- music → lights ----
  float energy = 0.0, onset = 0.0;
  for (int i = 0; i < 128; i++) {
    energy += max(0.0, smoothedNoteStates[i] * 0.5 + 0.5);
    onset  += max(0.0, targetNoteStates[i]   * 0.5 + 0.5);
  }
  energy = clamp(energy / 18.0, 0.0, 1.0);
  onset  = clamp(onset  / 18.0, 0.0, 1.0);
  float li = 0.35 + 0.9 * energy + 0.5 * onset;

  // ---- staged camera ----
  float q = t;
  vec3 Cc = vec3(0.0, 0.0, -1.2);
  vec3 roDolly   = mix(vec3(0.0, 0.75, FRONTZ + 2.1), vec3(0.0, 2.4, FRONTZ + 7.5), cZoom);
  vec3 lookDolly = mix(vec3(0.0, 0.45, FRONTZ),       vec3(0.0, 0.6, Cc.z),        cZoom);

  float aH = q * 0.45;
  float RH = 10.0 + 2.0 * sin(q * 0.2);
  vec3 roH   = Cc + vec3(sin(aH) * RH, 9.0 + 3.0 * sin(q * 0.27), cos(aH) * RH);
  vec3 lookH = Cc + vec3(0.0, 0.4, 0.0);
  float aL = q * 0.6 + 1.3;
  float RL = 4.3 + 1.3 * sin(q * 0.33);
  vec3 roL   = Cc + vec3(sin(aL) * RL, 0.16, cos(aL) * RL);
  vec3 lookL = Cc + vec3(sin(aL + 2.0) * 1.2, 0.55, cos(aL + 2.0) * 1.2);
  float mm = 0.5 + 0.5 * sin(q * 0.38);
  vec3 ro     = mix(roDolly,   mix(roL, roH, mm),     cMove);
  vec3 lookAt = mix(lookDolly, mix(lookL, lookH, mm), cMove);

  // running-man rounds: sit in the theatre and drift slowly between rows
  float seat = clamp(uRunning, 0.0, 1.0);
  float row = 0.5 + 0.5 * sin(t * 0.30);
  ro     = mix(ro,     mix(vec3(0.0, 1.5, 6.0),   vec3(0.0, 5.6, 13.2), row), seat);
  lookAt = mix(lookAt, mix(vec3(0.0, 1.25, -1.0), vec3(0.0, 0.55, -1.6), row), seat);

  float focal = 1.8;
  vec3 fwd = normalize(lookAt - ro);
  vec3 rgt = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 upv = cross(rgt, fwd);
  vec3 rd  = normalize(fwd + (uv.x * rgt + uv.y * upv) / focal);

  // ---- floor plane + fog beams ----
  vec3 col = vec3(0.01, 0.01, 0.02);
  float floorDist = 1e9;
  if (rd.y < -0.0005) {
    float fd = -ro.y / rd.y;
    if (fd > 0.0) {
      floorDist = fd;
      vec3 F = ro + rd * fd;
      float chk = mod(floor(F.x * 0.5) + floor(F.z * 0.5), 2.0);
      vec3 tile = mix(vec3(0.02, 0.02, 0.035), vec3(0.06, 0.06, 0.09), chk);
      vec3 pool = lightAt(F, t, cLight) * li * (0.4 + 0.5 * chk);
      col = min((tile + pool) * exp(-fd * 0.04) * cFloor, vec3(1.2));
    }
  }
  float maxd = min(floorDist, 26.0);
  vec3 fog = vec3(0.0);
  for (int k = 0; k < 6; k++) {
    fog += lightAt(ro + rd * ((float(k) + 0.5) / 6.0 * maxd), t, cLight);
  }
  col += fog * (maxd / 6.0) * 0.05 * li;

  // ---- the crowd ----
  float beat = t * (BPM / 60.0);
  float aa = 1.6 / resolution.y;
  float bestZ = 1e9, bestCov = 0.0;
  vec3  bestCol = vec3(1.0);
  for (int r = 0; r < ROWS; r++) {
    float fr = float(r);
    for (int c = 0; c < COLS; c++) {
      float fc = float(c) - float(COLS - 1) * 0.5;
      float stag = (mod(fr, 2.0) < 0.5) ? 0.0 : 0.5;
      vec3 base = vec3((fc + stag) * COLGAP, 0.0, FRONTZ - fr * ROWGAP);
      vec3 v = base - ro;
      float zc = dot(v, fwd);
      if (zc > 0.08) {
        vec2 sp = vec2(dot(v, rgt), dot(v, upv)) / zc * focal;
        float sca = focal / zc * FIGSCALE;
        vec2 cen = sp + vec2(0.0, 0.55 * sca);
        if (length(uv - cen) < 0.95 * sca) {
          float isHero = (r == 0 && c == 4) ? 1.0 : 0.0;
          float jitter = (hash21(vec2(fr, fc)) - 0.5) * 0.06;
          float yaw = (isHero > 0.5) ? 0.0 : (hash21(vec2(fr + 9.0, fc + 4.0)) - 0.5) * 0.9;
          yaw = mix(yaw, 0.0, clamp(uRunning, 0.0, 1.0));
          vec3 WX = vec3(cos(yaw), 0.0, sin(yaw));

          float bb = beat + jitter;
          float ph = fract(bb), bi = floor(bb);
          float crouch = exp(-3.0 * ph);
          float wvNormal = mix(sin(HALFPI * (bi - 1.0)), sin(HALFPI * bi), smoothstep(0.85, 1.0, ph));
          float wvPrev = sin(HALFPI * (bi - 1.0)), wvCur = sin(HALFPI * bi);
          float wvOff = mix(mix(wvPrev, -wvCur, smoothstep(0.35, 0.5, ph)), wvCur, smoothstep(0.85, 1.0, ph));
          float isFourth = (mod(bi, 4.0) > 2.5) ? 1.0 : 0.0;
          wvNormal = mix(wvNormal, wvOff, isFourth * clamp(uOffKick, 0.0, 1.0));
          // italo: 8th-note moves over a 2-beat cycle, arriving ON the hits
          float e8 = floor(bb * 2.0);
          float ef0 = fract(bb * 2.0);
          float mThis = floor(e8 / 4.0) * 3.0 + min(mod(e8, 4.0), 2.0);
          float e8n = e8 + 1.0;
          float mNext = floor(e8n / 4.0) * 3.0 + min(mod(e8n, 4.0), 2.0);
          float pThis = (mod(mThis, 2.0) < 0.5) ? 1.0 : -1.0;
          float pNext = (mod(mNext, 2.0) < 0.5) ? 1.0 : -1.0;
          float wvItalo = mix(pThis, pNext, smoothstep(0.72, 1.0, ef0));
          float wv = mix(wvNormal, wvItalo, clamp(uItalo, 0.0, 1.0));

          vec2 hip = vec2(0.0, -0.06 - 0.06 * crouch);
          vec2 shp = hip + vec2(0.0, 0.34);
          vec2 hc  = shp + vec2(0.0, 0.195);
          vec2 hb  = hc - vec2(0.0, 0.085);
          float fx = 0.12 + 0.02 * crouch;
          vec2 fLo = vec2(-fx, -0.46), fRo = vec2(fx, -0.46);
          vec2 hpL = hip + vec2(-0.06, 0.0), hpR = hip + vec2(0.06, 0.0);
          vec2 kLo = mix(hpL, fLo, 0.5) + vec2(-0.045 * crouch, 0.0);
          vec2 kRo = mix(hpR, fRo, 0.5) + vec2( 0.045 * crouch, 0.0);
          vec2 sLo = shp + vec2(-0.03, -0.02), sRo = shp + vec2(0.03, -0.02);
          float aUL = -0.22 * wv; vec2 eLo = sLo + 0.16 * vec2(-cos(aUL), sin(aUL));
          float aFL =  0.62 * wv; vec2 nLo = eLo + 0.15 * vec2(-cos(aFL), sin(aFL));
          float aUR =  0.22 * wv; vec2 eRo = sRo + 0.16 * vec2( cos(aUR), sin(aUR));
          float aFR = -0.62 * wv; vec2 nRo = eRo + 0.15 * vec2( cos(aFR), sin(aFR));

          // ---- running man: a sideways profile in the same plane ----
          float rr = clamp(uRunning, 0.0, 1.0);
          if (rr > 0.001) {
            float e2 = floor(bb * 2.0);
            float ef = fract(bb * 2.0);
            float snap = smoothstep(0.5, 1.0, ef);
            float bobR = 0.012 * (0.5 + 0.5 * cos(6.2831853 * ef));
            vec2 rhip = vec2(0.0, -0.05 + bobR);
            vec2 rshp = rhip + vec2(0.028, 0.34);
            vec2 rhc  = rshp + vec2(0.03, 0.195);
            vec2 rhb  = rhc - vec2(0.0, 0.085);
            vec2 legA = mix(rmLeg(mod(e2 + 2.0, 4.0)), rmLeg(mod(e2 + 3.0, 4.0)), snap);
            vec2 legB = mix(rmLeg(mod(e2, 4.0)),       rmLeg(mod(e2 + 1.0, 4.0)), snap);
            float tAa = legA.x, sAa = legA.x - legA.y;
            vec2 rkA = rhip + 0.20 * vec2(sin(tAa), -cos(tAa));
            vec2 rfA = rkA  + 0.22 * vec2(sin(sAa), -cos(sAa));
            float tAb = legB.x, sAb = legB.x - legB.y;
            vec2 rkB = rhip + 0.20 * vec2(sin(tAb), -cos(tAb));
            vec2 rfB = rkB  + 0.22 * vec2(sin(sAb), -cos(sAb));
            vec2 armA = mix(rmArm(mod(e2 + 2.0, 4.0)), rmArm(mod(e2 + 3.0, 4.0)), snap);
            vec2 armB = mix(rmArm(mod(e2, 4.0)),       rmArm(mod(e2 + 1.0, 4.0)), snap);
            vec2 rsA = rshp + vec2( 0.03, -0.01);
            vec2 rsB = rshp + vec2(-0.03, -0.02);
            vec2 reA = rsA + 0.15 * vec2(sin(armA.x), -cos(armA.x));
            vec2 reB = rsB + 0.15 * vec2(sin(armB.x), -cos(armB.x));
            vec2 rnA = reA + 0.16 * vec2(sin(armA.y), -cos(armA.y));
            vec2 rnB = reB + 0.16 * vec2(sin(armB.y), -cos(armB.y));
            hip = mix(hip, rhip, rr); shp = mix(shp, rshp, rr); hc = mix(hc, rhc, rr); hb = mix(hb, rhb, rr);
            hpL = mix(hpL, rhip, rr); kLo = mix(kLo, rkA, rr); fLo = mix(fLo, rfA, rr);
            hpR = mix(hpR, rhip, rr); kRo = mix(kRo, rkB, rr); fRo = mix(fRo, rfB, rr);
            sLo = mix(sLo, rsA, rr); eLo = mix(eLo, reA, rr); nLo = mix(nLo, rnA, rr);
            sRo = mix(sRo, rsB, rr); eRo = mix(eRo, reB, rr); nRo = mix(nRo, rnB, rr);
          }

          // ---- frozen ending pose ----
          float endm = clamp(uEndPose, 0.0, 1.0);
          if (endm > 0.001) {
            float d = (uEndPose < 1.5) ? 1.0 : -1.0;
            vec2 ehip = vec2(0.02 * d, -0.06);
            vec2 eshp = ehip + vec2(0.05 * d, 0.34);
            vec2 ehc  = eshp + vec2(0.02 * d, 0.195);
            vec2 ehb  = ehc - vec2(0.0, 0.085);
            vec2 ehpL = ehip + vec2(-0.06, 0.0), ehpR = ehip + vec2(0.06, 0.0);
            vec2 efL = vec2(-0.13, -0.46), efR = vec2(0.13, -0.46);
            vec2 ekL = mix(ehpL, efL, 0.5), ekR = mix(ehpR, efR, 0.5);
            vec2 eshL = eshp + vec2(-0.03, -0.02), eshR = eshp + vec2(0.03, -0.02);
            vec2 upDir = normalize(vec2(d * 0.6, 1.0));
            vec2 dnDir = normalize(vec2(-d * 0.5, -0.85));
            vec2 shUp = (d > 0.0) ? eshR : eshL;
            vec2 shDn = (d > 0.0) ? eshL : eshR;
            vec2 upE = shUp + 0.16 * upDir, upH = upE + 0.16 * upDir;
            vec2 dnE = shDn + 0.16 * dnDir, dnH = dnE + 0.16 * dnDir;
            vec2 eRoE = (d > 0.0) ? upE : dnE, nRoE = (d > 0.0) ? upH : dnH;
            vec2 eLoE = (d > 0.0) ? dnE : upE, nLoE = (d > 0.0) ? dnH : upH;
            hip = mix(hip, ehip, endm); shp = mix(shp, eshp, endm); hc = mix(hc, ehc, endm); hb = mix(hb, ehb, endm);
            hpL = mix(hpL, ehpL, endm); hpR = mix(hpR, ehpR, endm);
            kLo = mix(kLo, ekL, endm); kRo = mix(kRo, ekR, endm);
            fLo = mix(fLo, efL, endm); fRo = mix(fRo, efR, endm);
            sLo = mix(sLo, eshL, endm); sRo = mix(sRo, eshR, endm);
            eLo = mix(eLo, eLoE, endm); nLo = mix(nLo, nLoE, endm);
            eRo = mix(eRo, eRoE, endm); nRo = mix(nRo, nRoE, endm);
          }

          vec2 Php = jp(hip, base, WX, ro, fwd, rgt, upv, focal);
          vec2 Psh = jp(shp, base, WX, ro, fwd, rgt, upv, focal);
          vec2 Phb = jp(hb,  base, WX, ro, fwd, rgt, upv, focal);
          vec2 Phc = jp(hc,  base, WX, ro, fwd, rgt, upv, focal);
          vec2 PhL = jp(hpL, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PhR = jp(hpR, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PkL = jp(kLo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PfL = jp(fLo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PkR = jp(kRo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PfR = jp(fRo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PsL = jp(sLo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PeL = jp(eLo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PnL = jp(nLo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PsR = jp(sRo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PeR = jp(eRo, base, WX, ro, fwd, rgt, upv, focal);
          vec2 PnR = jp(nRo, base, WX, ro, fwd, rgt, upv, focal);

          float S = sca;
          float k = 0.040 * S;
          vec2 spineDir = Psh - Php;
          float spineLen = max(length(spineDir), 1e-4);
          spineDir /= spineLen;
          vec2 hipDir = PhR - PhL;
          hipDir = (length(hipDir) > 1e-4) ? normalize(hipDir) : vec2(1.0, 0.0);

          float dm = 1e9;
          dm = smin(dm, capT(uv, PhL, PkL, 0.050 * S, 0.037 * S), k);
          dm = smin(dm, capT(uv, PkL, PfL, 0.037 * S, 0.024 * S), k);
          dm = smin(dm, capT(uv, PhR, PkR, 0.050 * S, 0.037 * S), k);
          dm = smin(dm, capT(uv, PkR, PfR, 0.037 * S, 0.024 * S), k);
          dm = smin(dm, capT(uv, PsL, PeL, 0.050 * S, 0.031 * S), k);
          dm = smin(dm, capT(uv, PeL, PnL, 0.031 * S, 0.019 * S), k);
          dm = smin(dm, capT(uv, PsR, PeR, 0.050 * S, 0.031 * S), k);
          dm = smin(dm, capT(uv, PeR, PnR, 0.031 * S, 0.019 * S), k);
          dm = smin(dm, capT(uv, Psh, Phb, 0.038 * S, 0.030 * S), k);
          vec2 torsoC = mix(Php, Psh, 0.53);
          dm = smin(dm, sdEll(uv, torsoC, spineDir, 0.50 * spineLen + 0.02 * S, 0.086 * S), k);
          dm = smin(dm, sdEll(uv, Php, hipDir, 0.072 * S, 0.056 * S), k);
          dm = smin(dm, length(uv - Phc) - 0.085 * S, 0.018 * S);

          float cov = smoothstep(aa, -aa, dm) * mix(cCrowd, cHero, isHero);
          if (cov > 0.01 && zc < bestZ) {
            bestZ = zc; bestCov = cov;
            vec3 dc = 0.55 + 0.45 * cos(6.2831 * hash21(vec2(fr + 3.0, fc - 2.0)) + vec3(0.0, 2.1, 4.2));
            vec3 baseC = mix(dc, vec3(1.0), isHero);
            vec3 Lc = lightAt(base + vec3(0.0, 0.9, 0.0), t, cLight) * li;
            float bright = 0.26 + 0.75 * cCrowd * (1.0 - cLight) + 0.42 * cLight
                         + 2.2 * (Lc.r + Lc.g + Lc.b) / 3.0;
            bestCol = baseC * clamp(bright, 0.0, 1.7) + Lc * 0.25;
          }
        }
      }
    }
  }
  return mix(col, bestCol, bestCov);
}

// ===================================================================

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
  float t = time;

  float s = clamp(uScene, 0.0, 1.0);
  vec3 col = vec3(0.0);
  if (s < 0.999) col += scenePiano(uv, t) * (1.0 - s);     // only the active scene is drawn
  if (s > 0.001) col += sceneDancers(uv, t) * s;           // both only during a crossfade

  // ---- starfield: 3 layers of stars streaming outward, only where the scene is dark ----
  float stm = clamp(uStars, 0.0, 1.0);
  if (stm > 0.001) {
    vec3 st = vec3(0.0);
    for (int L = 0; L < 3; L++) {
      float fl = float(L);
      float z = fract(t * 0.08 + fl / 3.0);                 // depth cycles 0..1
      float sc = mix(18.0, 1.5, z);
      vec2 g = uv * sc + fl * 17.3;
      vec2 id = floor(g), f = fract(g) - 0.5;
      float h = hash21(id + fl * 7.0);
      vec2 o = (vec2(hash21(id + 3.1), hash21(id + 5.7)) - 0.5) * 0.7;
      float d = length(f - o);
      float sz = 0.02 + 0.05 * z;
      float s = smoothstep(sz, 0.0, d) * step(0.55, h) * smoothstep(0.0, 0.3, z) * smoothstep(1.0, 0.8, z);
      st += s * mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.9, 0.75), h);
    }
    float dark = 1.0 - clamp(dot(col, vec3(0.333)) * 4.0, 0.0, 1.0);
    col += st * stm * dark * 1.4;
  }

  col = col / (1.0 + col * 0.55);              // soft rolloff instead of clipping
  col *= clamp(t / 1.2, 0.0, 1.0);             // fade in

  // ---- showText() layer, with a dark halo so it reads over the scene ----
  vec2 tuv = gl_FragCoord.xy / resolution.xy;
  tuv.y = 1.0 - tuv.y;
  // uTextFx: 0 = still text .. 1 = text zooms out/in (2-bar cycle) and spins
  float fxm = clamp(uTextFx, 0.0, 1.0);
  if (fxm > 0.001) {
    float asp = resolution.x / resolution.y;
    vec2 p = tuv - 0.5; p.x *= asp;
    float bt = t * (BPM / 60.0);
    float zoom = mix(1.0, 0.55 + 0.45 * (0.5 + 0.5 * cos(bt * 3.14159265 / 4.0)), fxm);
    float ang = fxm * bt * 0.7853982;            // a full turn every 8 beats
    p = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p / zoom;
    p.x /= asp; tuv = p + 0.5;
  }
  float mx = clamp(uTextMix, 0.0, 1.0);
  vec4 tcur = mix(texture(uTextPrev, tuv), texture(uText, tuv), mx);
  float halo = tcur.a;
  for (int i = 0; i < 8; i++) {
    float ha = 0.7853982 * float(i);
    vec2 o = vec2(cos(ha), sin(ha)) * 0.005;
    halo = max(halo, mix(texture(uTextPrev, tuv + o), texture(uText, tuv + o), mx).a);
  }
  col = mix(col, vec3(0.0), clamp(halo, 0.0, 1.0) * 0.75);
  col = mix(col, vec3(1.0, 0.98, 0.92), clamp(tcur.a, 0.0, 1.0));

  col *= 1.0 - clamp(uFadeOut, 0.0, 1.0);
  fragColor = vec4(col, 1.0);
}
