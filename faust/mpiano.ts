// Faust-generated Mpiano
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mpiano.dsp

import { notefreq, midichannels, MidiChannel, MidiVoice } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';

function _fmodf(a: f32, b: f32): f32 {
  return a % b;
}

function _remainderf(a: f32, b: f32): f32 {
  return a - _rintf(a / b) * b;
}

function _rintf(x: f32): f32 {
  let floor: f32 = Mathf.floor(x);
  let frac: f32 = x - floor;
  if (frac < 0.5) return floor;
  if (frac > 0.5) return floor + 1.0;
  let i: i32 = <i32>floor;
  return (i & 1) == 0 ? floor : floor + 1.0;
}

function _exp10f(x: f32): f32 {
  return Mathf.pow(10.0, x);
}

function _isnanf(x: f32): i32 {
  return isNaN<f32>(x) ? 1 : 0;
}

function _isinff(x: f32): i32 {
  return isFinite<f32>(x) ? 0 : (isNaN<f32>(x) ? 0 : 1);
}

function _copysignf(a: f32, b: f32): f32 {
  let sign: bool = b < 0.0 || (b == 0.0 && 1.0 / b < 0.0);
  return sign ? -Mathf.abs(a) : Mathf.abs(a);
}

function _fmod(a: f64, b: f64): f64 {
  return a % b;
}

function _remainder(a: f64, b: f64): f64 {
  return a - _rint(a / b) * b;
}

function _rint(x: f64): f64 {
  let floor: f64 = Math.floor(x);
  let frac: f64 = x - floor;
  if (frac < 0.5) return floor;
  if (frac > 0.5) return floor + 1.0;
  let i: i64 = <i64>floor;
  return (i & 1) == 0 ? floor : floor + 1.0;
}

function _exp10(x: f64): f64 {
  return Math.pow(10.0, x);
}

function _isnan(x: f64): i32 {
  return isNaN<f64>(x) ? 1 : 0;
}

function _isinf(x: f64): i32 {
  return isFinite<f64>(x) ? 0 : (isNaN<f64>(x) ? 0 : 1);
}

function _copysign(a: f64, b: f64): f64 {
  let sign: bool = b < 0.0 || (b == 0.0 && 1.0 / b < 0.0);
  return sign ? -Math.abs(a) : Math.abs(a);
}

export class MpianoDsp {
    fSampleRate: i32;
    fVec7: StaticArray<f32> = new StaticArray<f32>(2);
    fVec113: StaticArray<f32> = new StaticArray<f32>(2);
    fVec18153: StaticArray<f32> = new StaticArray<f32>(2);
    fVec18186: StaticArray<f32> = new StaticArray<f32>(2);
    fVec19177: StaticArray<f32> = new StaticArray<f32>(2);
    fVec19210: StaticArray<f32> = new StaticArray<f32>(2);
    fVec20201: StaticArray<f32> = new StaticArray<f32>(2);
    fVec20225: StaticArray<f32> = new StaticArray<f32>(2);
    fVec20308: StaticArray<f32> = new StaticArray<f32>(2);
    fVec20331: StaticArray<f32> = new StaticArray<f32>(2);
    fButton4: f32;
    fSlow0: f32;
    fButton0: f32;
    fSlow1: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fConst7: f32;
    fConst8: f32;
    fHslider2: f32;
    fHslider3: f32;
    fHslider1: f32;
    fSlow2: f32;
    fSlow3: f32;
    fSlow4: f32;
    iConst0: i32;
    fConst10: f32;
    fConst11: f32;
    fHslider5: f32;
    fSlow5: f32;
    fConst12: f32;
    fConst13: f32;
    fSlow6: f32;
    fSlow7: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fSlow11: f32;
    fSlow12: f32;
    iConst1: i32;
    fConst14: f32;
    fConst16: f32;
    fConst17: f32;
    fConst19: f32;
    fConst20: f32;
    fConst22: f32;
    fConst23: f32;
    fSlow13: f32;
    fSlow14: f32;
    fConst24: f32;
    fSlow15: f32;
    fSlow16: f32;
    fSlow17: f32;
    fSlow18: f32;
    fConst26: f32;
    fSlow19: f32;
    fConst27: f32;
    fSlow20: f32;
    fSlow21: f32;
    fSlow22: f32;
    fSlow23: f32;
    fConst28: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fConst29: f32;
    fSlow28: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    fRec1: f32;
    iRec2: StaticArray<i32> = new StaticArray<i32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3: StaticArray<f32> = new StaticArray<f32>(512);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8: StaticArray<f32> = new StaticArray<f32>(512);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec12: StaticArray<i32> = new StaticArray<i32>(2);
    iRec12_1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec13: f32;
    fRec14: f32;
    fRec15: f32;
    fRec16: f32;
    iRec17: i32;
    fRec18: f32;
    fRec19: f32;
    fRec20: f32;
    fRec21: f32;
    fRec22: f32;
    fRec23: f32;
    fRec24: f32;
    fRec25: f32;
    fRec26: f32;
    fRec27: f32;
    fRec28: f32;
    fRec29: f32;
    fRec30: f32;
    fRec31: f32;
    fRec32: f32;
    fRec33: f32;
    fRec34: f32;
    fRec35: f32;
    fRec36: f32;
    fRec37: f32;
    fRec38: f32;
    fRec39: f32;
    fRec40: f32;
    fRec41: f32;
    fRec42: f32;
    fRec43: f32;
    fRec44: f32;
    fRec45: f32;
    fRec46: f32;
    fRec47: f32;
    fRec48: f32;
    fRec49: f32;
    fRec50: f32;
    fRec51: f32;
    fRec52: f32;
    fRec53: f32;
    fRec54: f32;
    fRec55: f32;
    fRec56: f32;
    fRec57: f32;
    fRec58: f32;
    fRec59: f32;
    fRec60: f32;
    fRec61: f32;
    fRec62: f32;
    fRec63: f32;
    fRec64: f32;
    fRec65: f32;
    fRec66: f32;
    fRec67: f32;
    fRec68: f32;
    fRec69: f32;
    fRec70: f32;
    fRec71: f32;
    fRec72: f32;
    fRec73: f32;
    fRec74: f32;
    fRec75: f32;
    fRec76: f32;
    fRec77: f32;
    fRec78: f32;
    fRec79: f32;
    fRec80: f32;
    fRec81: f32;
    fRec82: f32;
    fRec83: f32;
    fRec84: f32;
    fRec85: f32;
    fRec86: f32;
    fRec87: f32;
    fRec88: f32;
    fRec89: f32;
    fRec90: f32;
    fRec91: f32;
    fRec92: f32;
    fRec93: f32;
    fRec94: f32;
    fRec95: f32;
    fRec96: f32;
    fRec97: f32;
    fRec98: f32;
    fRec99: f32;
    fRec100: f32;
    fRec101: f32;
    fRec102: f32;
    fRec103: f32;
    fRec104: f32;
    fRec105: f32;
    fRec106: f32;
    fRec107: f32;
    fRec108: f32;
    fRec109: f32;
    fRec110: f32;
    fRec111: f32;
    fRec112: f32;
    fRec113: f32;
    fRec114: f32;
    fRec115: f32;
    fRec116: f32;
    fRec117: f32;
    fRec118: f32;
    fRec119: f32;
    fRec120: f32;
    fRec121: f32;
    fRec122: f32;
    fRec123: f32;
    fRec124: f32;
    fRec125: f32;
    fRec126: f32;
    fRec127: f32;
    fRec128: f32;
    fRec129: f32;
    fRec130: f32;
    fRec131: f32;
    fRec132: f32;
    fRec133: f32;
    fRec134: f32;
    fRec135: f32;
    fRec136: f32;
    fRec137: f32;
    fRec138: f32;
    fRec139: f32;
    fRec140: f32;
    fRec141: f32;
    fRec142: f32;
    fRec143: f32;
    fRec144: f32;
    fRec145: f32;
    fRec146: f32;
    fRec147: f32;
    fRec148: f32;
    fRec149: f32;
    fRec150: f32;
    fRec151: f32;
    fRec152: f32;
    fRec153: f32;
    fRec154: f32;
    fRec155: f32;
    fRec156: f32;
    fRec157: f32;
    fRec158: f32;
    fRec159: f32;
    fRec160: f32;
    fRec161: f32;
    fRec162: f32;
    fRec163: f32;
    fRec164: f32;
    fRec165: f32;
    fRec166: f32;
    fRec167: f32;
    fRec168: f32;
    fRec169: f32;
    fRec170: f32;
    fRec171: f32;
    iRec172: i32;
    fRec173: f32;
    fRec174: f32;
    fRec175: f32;
    fRec176: f32;
    fRec177: f32;
    fRec178: f32;
    fRec179: f32;
    fRec180: f32;
    fRec181: f32;
    fRec182: f32;
    fRec183: f32;
    fRec184: f32;
    fRec185: f32;

    getSampleRate(): i32 {
        return this.fSampleRate;
    }
    getNumInputs(): i32 {
        return 0;
    }
    getNumOutputs(): i32 {
        return 2;
    }
    metadata(m: usize): void {
    }
    buildUserInterface(ui_interface: usize): void {
        // ui openbox mpiano
        // ui slider damping
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui slider hammer_tone
        // ui button preroll
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton4 = 0.0;
        this.fButton0 = 0.0;
        this.fHslider2 = 0.800000011920929;
        this.fHslider3 = 1.0;
        this.fHslider1 = 261.6300048828125;
        this.fHslider5 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec7[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec113[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec18153[lDelay2] = 0.0;
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            this.fVec18186[lDelay3] = 0.0;
        }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) {
            this.fVec19177[lDelay4] = 0.0;
        }
        for (let lDelay5: i32 = 0; lDelay5 < <i32>(2); lDelay5 = lDelay5 + 1) {
            this.fVec19210[lDelay5] = 0.0;
        }
        for (let lDelay6: i32 = 0; lDelay6 < <i32>(2); lDelay6 = lDelay6 + 1) {
            this.fVec20201[lDelay6] = 0.0;
        }
        for (let lDelay7: i32 = 0; lDelay7 < <i32>(2); lDelay7 = lDelay7 + 1) {
            this.fVec20225[lDelay7] = 0.0;
        }
        for (let lDelay8: i32 = 0; lDelay8 < <i32>(2); lDelay8 = lDelay8 + 1) {
            this.fVec20308[lDelay8] = 0.0;
        }
        for (let lDelay9: i32 = 0; lDelay9 < <i32>(2); lDelay9 = lDelay9 + 1) {
            this.fVec20331[lDelay9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(16384); lRec10 = lRec10 + 1) {
            this.fRec0[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.fRec0_1[lRec11] = 0.0;
        }
        this.fIOTA = <i32>(0);
        this.fRec1 = 0.0;
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.iRec2[lRec12] = <i32>(0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.fRec2_1[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(512); lRec14 = lRec14 + 1) {
            this.fRec3[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec3_1[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec4[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.fRec4_1[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec4_2[lRec18] = 0.0;
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            this.fRec4_3[lRec19] = 0.0;
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec5[lRec20] = 0.0;
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            this.fRec5_1[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.fRec5_2[lRec22] = 0.0;
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            this.fRec5_3[lRec23] = 0.0;
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec6[lRec24] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            this.fRec6_1[lRec25] = 0.0;
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            this.fRec6_2[lRec26] = 0.0;
        }
        for (let lRec27: i32 = 0; lRec27 < <i32>(2); lRec27 = lRec27 + 1) {
            this.fRec6_3[lRec27] = 0.0;
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(16384); lRec28 = lRec28 + 1) {
            this.fRec7[lRec28] = 0.0;
        }
        for (let lRec29: i32 = 0; lRec29 < <i32>(2); lRec29 = lRec29 + 1) {
            this.fRec7_1[lRec29] = 0.0;
        }
        for (let lRec30: i32 = 0; lRec30 < <i32>(512); lRec30 = lRec30 + 1) {
            this.fRec8[lRec30] = 0.0;
        }
        for (let lRec31: i32 = 0; lRec31 < <i32>(2); lRec31 = lRec31 + 1) {
            this.fRec8_1[lRec31] = 0.0;
        }
        for (let lRec32: i32 = 0; lRec32 < <i32>(2); lRec32 = lRec32 + 1) {
            this.fRec9[lRec32] = 0.0;
        }
        for (let lRec33: i32 = 0; lRec33 < <i32>(2); lRec33 = lRec33 + 1) {
            this.fRec9_1[lRec33] = 0.0;
        }
        for (let lRec34: i32 = 0; lRec34 < <i32>(2); lRec34 = lRec34 + 1) {
            this.fRec9_2[lRec34] = 0.0;
        }
        for (let lRec35: i32 = 0; lRec35 < <i32>(2); lRec35 = lRec35 + 1) {
            this.fRec9_3[lRec35] = 0.0;
        }
        for (let lRec36: i32 = 0; lRec36 < <i32>(2); lRec36 = lRec36 + 1) {
            this.fRec10[lRec36] = 0.0;
        }
        for (let lRec37: i32 = 0; lRec37 < <i32>(2); lRec37 = lRec37 + 1) {
            this.fRec10_1[lRec37] = 0.0;
        }
        for (let lRec38: i32 = 0; lRec38 < <i32>(2); lRec38 = lRec38 + 1) {
            this.fRec10_2[lRec38] = 0.0;
        }
        for (let lRec39: i32 = 0; lRec39 < <i32>(2); lRec39 = lRec39 + 1) {
            this.fRec10_3[lRec39] = 0.0;
        }
        for (let lRec40: i32 = 0; lRec40 < <i32>(2); lRec40 = lRec40 + 1) {
            this.fRec11[lRec40] = 0.0;
        }
        for (let lRec41: i32 = 0; lRec41 < <i32>(2); lRec41 = lRec41 + 1) {
            this.fRec11_1[lRec41] = 0.0;
        }
        for (let lRec42: i32 = 0; lRec42 < <i32>(2); lRec42 = lRec42 + 1) {
            this.fRec11_2[lRec42] = 0.0;
        }
        for (let lRec43: i32 = 0; lRec43 < <i32>(2); lRec43 = lRec43 + 1) {
            this.fRec11_3[lRec43] = 0.0;
        }
        for (let lRec44: i32 = 0; lRec44 < <i32>(2); lRec44 = lRec44 + 1) {
            this.iRec12[lRec44] = <i32>(0);
        }
        for (let lRec45: i32 = 0; lRec45 < <i32>(2); lRec45 = lRec45 + 1) {
            this.iRec12_1[lRec45] = <i32>(0);
        }
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.iRec17 = <i32>(0);
        this.fRec18 = 0.0;
        this.fRec19 = 0.0;
        this.fRec20 = 0.0;
        this.fRec21 = 0.0;
        this.fRec22 = 0.0;
        this.fRec23 = 0.0;
        this.fRec24 = 0.0;
        this.fRec25 = 0.0;
        this.fRec26 = 0.0;
        this.fRec27 = 0.0;
        this.fRec28 = 0.0;
        this.fRec29 = 0.0;
        this.fRec30 = 0.0;
        this.fRec31 = 0.0;
        this.fRec32 = 0.0;
        this.fRec33 = 0.0;
        this.fRec34 = 0.0;
        this.fRec35 = 0.0;
        this.fRec36 = 0.0;
        this.fRec37 = 0.0;
        this.fRec38 = 0.0;
        this.fRec39 = 0.0;
        this.fRec40 = 0.0;
        this.fRec41 = 0.0;
        this.fRec42 = 0.0;
        this.fRec43 = 0.0;
        this.fRec44 = 0.0;
        this.fRec45 = 0.0;
        this.fRec46 = 0.0;
        this.fRec47 = 0.0;
        this.fRec48 = 0.0;
        this.fRec49 = 0.0;
        this.fRec50 = 0.0;
        this.fRec51 = 0.0;
        this.fRec52 = 0.0;
        this.fRec53 = 0.0;
        this.fRec54 = 0.0;
        this.fRec55 = 0.0;
        this.fRec56 = 0.0;
        this.fRec57 = 0.0;
        this.fRec58 = 0.0;
        this.fRec59 = 0.0;
        this.fRec60 = 0.0;
        this.fRec61 = 0.0;
        this.fRec62 = 0.0;
        this.fRec63 = 0.0;
        this.fRec64 = 0.0;
        this.fRec65 = 0.0;
        this.fRec66 = 0.0;
        this.fRec67 = 0.0;
        this.fRec68 = 0.0;
        this.fRec69 = 0.0;
        this.fRec70 = 0.0;
        this.fRec71 = 0.0;
        this.fRec72 = 0.0;
        this.fRec73 = 0.0;
        this.fRec74 = 0.0;
        this.fRec75 = 0.0;
        this.fRec76 = 0.0;
        this.fRec77 = 0.0;
        this.fRec78 = 0.0;
        this.fRec79 = 0.0;
        this.fRec80 = 0.0;
        this.fRec81 = 0.0;
        this.fRec82 = 0.0;
        this.fRec83 = 0.0;
        this.fRec84 = 0.0;
        this.fRec85 = 0.0;
        this.fRec86 = 0.0;
        this.fRec87 = 0.0;
        this.fRec88 = 0.0;
        this.fRec89 = 0.0;
        this.fRec90 = 0.0;
        this.fRec91 = 0.0;
        this.fRec92 = 0.0;
        this.fRec93 = 0.0;
        this.fRec94 = 0.0;
        this.fRec95 = 0.0;
        this.fRec96 = 0.0;
        this.fRec97 = 0.0;
        this.fRec98 = 0.0;
        this.fRec99 = 0.0;
        this.fRec100 = 0.0;
        this.fRec101 = 0.0;
        this.fRec102 = 0.0;
        this.fRec103 = 0.0;
        this.fRec104 = 0.0;
        this.fRec105 = 0.0;
        this.fRec106 = 0.0;
        this.fRec107 = 0.0;
        this.fRec108 = 0.0;
        this.fRec109 = 0.0;
        this.fRec110 = 0.0;
        this.fRec111 = 0.0;
        this.fRec112 = 0.0;
        this.fRec113 = 0.0;
        this.fRec114 = 0.0;
        this.fRec115 = 0.0;
        this.fRec116 = 0.0;
        this.fRec117 = 0.0;
        this.fRec118 = 0.0;
        this.fRec119 = 0.0;
        this.fRec120 = 0.0;
        this.fRec121 = 0.0;
        this.fRec122 = 0.0;
        this.fRec123 = 0.0;
        this.fRec124 = 0.0;
        this.fRec125 = 0.0;
        this.fRec126 = 0.0;
        this.fRec127 = 0.0;
        this.fRec128 = 0.0;
        this.fRec129 = 0.0;
        this.fRec130 = 0.0;
        this.fRec131 = 0.0;
        this.fRec132 = 0.0;
        this.fRec133 = 0.0;
        this.fRec134 = 0.0;
        this.fRec135 = 0.0;
        this.fRec136 = 0.0;
        this.fRec137 = 0.0;
        this.fRec138 = 0.0;
        this.fRec139 = 0.0;
        this.fRec140 = 0.0;
        this.fRec141 = 0.0;
        this.fRec142 = 0.0;
        this.fRec143 = 0.0;
        this.fRec144 = 0.0;
        this.fRec145 = 0.0;
        this.fRec146 = 0.0;
        this.fRec147 = 0.0;
        this.fRec148 = 0.0;
        this.fRec149 = 0.0;
        this.fRec150 = 0.0;
        this.fRec151 = 0.0;
        this.fRec152 = 0.0;
        this.fRec153 = 0.0;
        this.fRec154 = 0.0;
        this.fRec155 = 0.0;
        this.fRec156 = 0.0;
        this.fRec157 = 0.0;
        this.fRec158 = 0.0;
        this.fRec159 = 0.0;
        this.fRec160 = 0.0;
        this.fRec161 = 0.0;
        this.fRec162 = 0.0;
        this.fRec163 = 0.0;
        this.fRec164 = 0.0;
        this.fRec165 = 0.0;
        this.fRec166 = 0.0;
        this.fRec167 = 0.0;
        this.fRec168 = 0.0;
        this.fRec169 = 0.0;
        this.fRec170 = 0.0;
        this.fRec171 = 0.0;
        this.iRec172 = <i32>(0);
        this.fRec173 = 0.0;
        this.fRec174 = 0.0;
        this.fRec175 = 0.0;
        this.fRec176 = 0.0;
        this.fRec177 = 0.0;
        this.fRec178 = 0.0;
        this.fRec179 = 0.0;
        this.fRec180 = 0.0;
        this.fRec181 = 0.0;
        this.fRec182 = 0.0;
        this.fRec183 = 0.0;
        this.fRec184 = 0.0;
        this.fRec185 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (0.019999999552965164 / this.fConst0);
        this.fConst2 = (0.0005000000237487257 + this.fConst1);
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst4 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 3.0)));
        let fConst6: f32 = (this.fConst0 * 0.0015384615398943424);
        this.fConst7 = (1.0 - fConst6);
        this.fConst8 = (1.0 + fConst6);
        this.iConst0 = max<i32>(<i32>(1), <i32>(fConst6));
        let fConst9: f32 = max<f32>(0.0, (fConst6 - <f32>(this.iConst0)));
        this.fConst10 = (1.0 - fConst9);
        this.fConst11 = (1.0 + fConst9);
        this.fConst12 = (this.fConst0 * 0.15915493667125702);
        this.fConst13 = (6.2831854820251465 / this.fConst0);
        this.iConst1 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (this.iConst0 - <i32>(1))));
        this.fConst14 = ((this.fConst0 * 0.5) - 1000.0);
        let fConst15: f32 = (this.fConst13 * min<f32>(100.0, this.fConst14));
        this.fConst16 = Mathf.cos(fConst15);
        this.fConst17 = (this.fConst16 + 1.0);
        let fConst18: f32 = (0.7071067690849304 * Mathf.sin(fConst15));
        this.fConst19 = (1.0 - fConst18);
        this.fConst20 = (fConst18 + 1.0);
        let fConst21: f32 = (this.fConst13 * min<f32>(18000.0, this.fConst14));
        this.fConst22 = Mathf.cos(fConst21);
        this.fConst23 = (1.0 - this.fConst22);
        this.fConst24 = (12.566370964050293 / this.fConst0);
        let fConst25: f32 = (0.7071067690849304 * Mathf.sin(fConst21));
        this.fConst26 = (1.0 - fConst25);
        this.fConst27 = (fConst25 + 1.0);
        this.fConst28 = Mathf.pow(this.fConst27, 2.0);
        this.fConst29 = Mathf.pow(this.fConst23, 2.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MpianoDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton4);
        this.fSlow1 = <f32>(this.fButton0);
        this.fSlow2 = <f32>(this.fHslider1);
        this.fSlow3 = ((<f32>(this.fHslider2) * <f32>(this.fHslider3)) * (Mathf.pow(this.fSlow2, 0.800000011920929) + 2500.0));
        this.fSlow4 = (0.6931471824645996 / Mathf.log(this.fSlow2));
        this.fSlow5 = Mathf.pow(100.0, (<f32>(this.fHslider5) + -1.0));
        this.fSlow6 = (this.fConst13 * this.fSlow2);
        this.fSlow7 = Mathf.sin(this.fSlow6);
        this.fSlow8 = Mathf.exp((3.047811508178711 - (0.9703809022903442 * Mathf.log((0.03852593153715134 * this.fSlow2)))));
        this.fSlow9 = (1.0 - this.fSlow8);
        this.fSlow10 = (this.fSlow8 + 1.0);
        this.fSlow11 = Mathf.cos(this.fSlow6);
        this.fSlow12 = (this.fConst12 * ((Mathf.atan((this.fSlow7 / ((this.fSlow9 / this.fSlow10) + this.fSlow11))) - Mathf.atan((this.fSlow7 / (this.fSlow11 + (this.fSlow10 / this.fSlow9))))) / this.fSlow2));
        this.fSlow13 = (-1.0 * this.fSlow6);
        this.fSlow14 = Mathf.sin(this.fSlow13);
        this.fSlow15 = (-1.0 * (this.fConst24 * this.fSlow2));
        this.fSlow16 = Mathf.sin(this.fSlow15);
        this.fSlow17 = (this.fSlow14 + (0.5 * this.fSlow16));
        this.fSlow18 = Mathf.cos(this.fSlow15);
        this.fSlow19 = Mathf.cos(this.fSlow13);
        this.fSlow20 = ((((this.fSlow18 * this.fConst26) - ((2.0 * this.fSlow19) * this.fConst22)) / this.fConst27) + 1.0);
        this.fSlow21 = (this.fSlow19 + (0.5 * (this.fSlow18 + 1.0)));
        this.fSlow22 = ((this.fSlow16 * this.fConst26) - ((2.0 * this.fSlow14) * this.fConst22));
        this.fSlow23 = ((this.fSlow17 * this.fSlow20) - ((this.fSlow21 * this.fSlow22) / this.fConst27));
        this.fSlow24 = (Mathf.pow(this.fSlow20, 2.0) + (Mathf.pow(this.fSlow22, 2.0) / this.fConst28));
        this.fSlow25 = (this.fConst27 * this.fSlow24);
        this.fSlow26 = ((this.fSlow20 * this.fSlow21) + (this.fSlow17 * (this.fSlow22 / this.fConst27)));
        this.fSlow27 = ((this.fConst0 / this.fSlow2) * ((0.15915493667125702 * Mathf.atan2(((this.fConst23 * this.fSlow23) / this.fSlow25), ((this.fConst23 * this.fSlow26) / this.fSlow25))) + 1.0));
        this.fSlow28 = Mathf.pow((0.20000000298023224 / Mathf.sqrt(((this.fConst29 * (Mathf.pow(this.fSlow26, 2.0) + Mathf.pow(this.fSlow23, 2.0))) / (this.fConst28 * Mathf.pow(this.fSlow24, 2.0))))), (1.0099999904632568 / this.fSlow2));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec7[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec7[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur1: f32 = (iTemp0 ? this.fSlow2 : this.fRec1);
        let fTemp1: f32 = this.fRec4[<i32>(1)];
        this.fVec113[<i32>(0)] = this.fSlow1;
        let fTemp2: f32 = this.fVec113[<i32>(1)];
        let iTemp1: i32 = (this.fSlow1 > fTemp2);
        let iTemp2: i32 = (<i32>(1) - iTemp1);
        let fTemp3: f32 = <f32>(iTemp2);
        let iTemp3: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : this.iRec2[<i32>(1)]));
        let iTemp4: i32 = (iTemp3 >= <i32>(2));
        let iTemp5: i32 = (iTemp3 >= <i32>(1));
        let fTemp4: f32 = this.fRec2_1[<i32>(1)];
        let fTemp5: f32 = min<f32>(1.0, (fTemp4 + this.fConst3));
        let iTemp6: i32 = (iTemp3 >= <i32>(3));
        let fTemp6: f32 = max<f32>(1.0, (fTemp4 - this.fConst4));
        let iTemp7: i32 = (<i32>(1103515245) * (this.iRec12[<i32>(1)] + <i32>(12345)));
        let iRecBody46: i32 = (<i32>(1103515245) * (iTemp7 + <i32>(12345)));
        let iRecBody47: i32 = iTemp7;
        this.iRec12[<i32>(0)] = iRecBody46;
        this.iRec12_1[<i32>(0)] = iRecBody47;
        let fRecCur13: f32 = (iTemp1 ? this.fConst2 : (this.fRec13 + this.fConst1));
        let fTemp7: f32 = Mathf.pow(fRecCur13, 1.7999999523162842);
        let fTemp8: f32 = (<f32>(this.iRec12[<i32>(0)]) / fTemp7);
        let fTemp9: f32 = this.fRec4_2[<i32>(1)];
        let fTemp10: f32 = this.fRec5[<i32>(1)];
        let fTemp11: f32 = this.fRec5_2[<i32>(1)];
        let fRecCur14: f32 = (iTemp1 ? 1.0 : (0.9998999834060669 * this.fRec14));
        let fRecCur15: f32 = (iTemp1 ? this.fSlow4 : this.fRec15);
        let fRecCur16: f32 = (iTemp1 ? this.fSlow3 : this.fRec16);
        let fTemp12: f32 = (this.fConst13 * min<f32>(fRecCur16, this.fConst14));
        let fTemp13: f32 = Mathf.cos(fTemp12);
        let fTemp14: f32 = (1.0 - fTemp13);
        let fTemp15: f32 = (0.7071067690849304 * Mathf.sin(fTemp12));
        let fTemp16: f32 = (1.0 - fTemp15);
        let fTemp17: f32 = (fTemp15 + 1.0);
        let fRecBody48: f32 = (0.00000000023283064365386963 * fTemp8);
        let fRecBody49: f32 = (fTemp1 * fTemp3);
        let fRecBody50: f32 = (((fTemp14 * ((0.00000000011641532182693481 * fTemp8) + (fTemp3 * (fTemp1 + (0.5 * this.fRec4_1[<i32>(1)]))))) + (fTemp3 * ((2.0 * (fTemp9 * fTemp13)) - (this.fRec4_3[<i32>(1)] * fTemp16)))) / fTemp17);
        let fRecBody51: f32 = (fTemp3 * fTemp9);
        this.fRec4[<i32>(0)] = fRecBody48;
        this.fRec4_1[<i32>(0)] = fRecBody49;
        this.fRec4_2[<i32>(0)] = fRecBody50;
        this.fRec4_3[<i32>(0)] = fRecBody51;
        let iRecCur17: i32 = (iTemp2 * (this.iRec17 + <i32>(1)));
        let fTemp18: f32 = <f32>((iRecCur17 >= this.iConst0));
        let iTemp12: i32 = ((this.fIOTA - (this.iConst1 + <i32>(1))) & <i32>(511));
        let fTemp19: f32 = (fTemp18 * this.fRec3[iTemp12]);
        this.fVec18153[<i32>(0)] = fTemp19;
        let fRecCur18: f32 = (iTemp1 ? (this.fConst10 * (fTemp19 / this.fConst11)) : ((this.fConst10 * ((fTemp19 - this.fRec18) / this.fConst11)) + this.fVec18153[<i32>(1)]));
        let fRecBody52: f32 = fRecCur18;
        let fRecBody53: f32 = (fTemp3 * fTemp10);
        let fRecBody54: f32 = (((this.fConst17 * ((0.5 * fRecCur18) + (fTemp3 * ((0.5 * this.fRec5_1[<i32>(1)]) - fTemp10)))) + (fTemp3 * ((2.0 * (fTemp11 * this.fConst16)) - (this.fRec5_3[<i32>(1)] * this.fConst19)))) / this.fConst20);
        let fRecBody55: f32 = (fTemp3 * fTemp11);
        this.fRec5[<i32>(0)] = fRecBody52;
        this.fRec5_1[<i32>(0)] = fRecBody53;
        this.fRec5_2[<i32>(0)] = fRecBody54;
        this.fRec5_3[<i32>(0)] = fRecBody55;
        let fTemp20: f32 = ((fRecCur15 * this.fRec4_2[<i32>(0)]) + this.fRec5_2[<i32>(0)]);
        this.fVec18186[<i32>(0)] = fTemp20;
        let fRecCur19: f32 = (iTemp1 ? (this.fConst7 * (fTemp20 / this.fConst8)) : ((this.fConst7 * ((fTemp20 - this.fRec19) / this.fConst8)) + this.fVec18186[<i32>(1)]));
        let fRecCur20: f32 = (iTemp1 ? (this.fConst7 * (fRecCur19 / this.fConst8)) : ((this.fConst7 * ((fRecCur19 - this.fRec20) / this.fConst8)) + this.fRec19));
        let fRecCur21: f32 = (iTemp1 ? (this.fConst7 * (fRecCur20 / this.fConst8)) : ((this.fConst7 * ((fRecCur20 - this.fRec21) / this.fConst8)) + this.fRec20));
        let fRecCur22: f32 = (iTemp1 ? (this.fConst7 * (fRecCur21 / this.fConst8)) : ((this.fConst7 * ((fRecCur21 - this.fRec22) / this.fConst8)) + this.fRec21));
        let fRecCur23: f32 = (iTemp1 ? (this.fConst7 * (fRecCur22 / this.fConst8)) : ((this.fConst7 * ((fRecCur22 - this.fRec23) / this.fConst8)) + this.fRec22));
        let fRecCur24: f32 = (iTemp1 ? (this.fConst7 * (fRecCur23 / this.fConst8)) : ((this.fConst7 * ((fRecCur23 - this.fRec24) / this.fConst8)) + this.fRec23));
        let fRecCur25: f32 = (iTemp1 ? (this.fConst7 * (fRecCur24 / this.fConst8)) : ((this.fConst7 * ((fRecCur24 - this.fRec25) / this.fConst8)) + this.fRec24));
        let fRecCur26: f32 = (iTemp1 ? (this.fConst7 * (fRecCur25 / this.fConst8)) : ((this.fConst7 * ((fRecCur25 - this.fRec26) / this.fConst8)) + this.fRec25));
        let fRecCur27: f32 = (iTemp1 ? (this.fConst7 * (fRecCur26 / this.fConst8)) : ((this.fConst7 * ((fRecCur26 - this.fRec27) / this.fConst8)) + this.fRec26));
        let fRecCur28: f32 = (iTemp1 ? (this.fConst7 * (fRecCur27 / this.fConst8)) : ((this.fConst7 * ((fRecCur27 - this.fRec28) / this.fConst8)) + this.fRec27));
        let fRecCur29: f32 = (iTemp1 ? (this.fConst7 * (fRecCur28 / this.fConst8)) : ((this.fConst7 * ((fRecCur28 - this.fRec29) / this.fConst8)) + this.fRec28));
        let fRecCur30: f32 = (iTemp1 ? (this.fConst7 * (fRecCur29 / this.fConst8)) : ((this.fConst7 * ((fRecCur29 - this.fRec30) / this.fConst8)) + this.fRec29));
        let fRecCur31: f32 = (iTemp1 ? (this.fConst7 * (fRecCur30 / this.fConst8)) : ((this.fConst7 * ((fRecCur30 - this.fRec31) / this.fConst8)) + this.fRec30));
        let fRecCur32: f32 = (iTemp1 ? (this.fConst7 * (fRecCur31 / this.fConst8)) : ((this.fConst7 * ((fRecCur31 - this.fRec32) / this.fConst8)) + this.fRec31));
        let fRecCur33: f32 = (iTemp1 ? (this.fConst7 * (fRecCur32 / this.fConst8)) : ((this.fConst7 * ((fRecCur32 - this.fRec33) / this.fConst8)) + this.fRec32));
        let fRecCur34: f32 = (iTemp1 ? (this.fConst7 * (fRecCur33 / this.fConst8)) : ((this.fConst7 * ((fRecCur33 - this.fRec34) / this.fConst8)) + this.fRec33));
        let fRecCur35: f32 = (iTemp1 ? (this.fConst7 * (fRecCur34 / this.fConst8)) : ((this.fConst7 * ((fRecCur34 - this.fRec35) / this.fConst8)) + this.fRec34));
        let fRecCur36: f32 = (iTemp1 ? (this.fConst7 * (fRecCur35 / this.fConst8)) : ((this.fConst7 * ((fRecCur35 - this.fRec36) / this.fConst8)) + this.fRec35));
        let fRecCur37: f32 = (iTemp1 ? (this.fConst7 * (fRecCur36 / this.fConst8)) : ((this.fConst7 * ((fRecCur36 - this.fRec37) / this.fConst8)) + this.fRec36));
        let fRecCur38: f32 = (iTemp1 ? (this.fConst7 * (fRecCur37 / this.fConst8)) : ((this.fConst7 * ((fRecCur37 - this.fRec38) / this.fConst8)) + this.fRec37));
        let fRecCur39: f32 = (iTemp1 ? (this.fConst7 * (fRecCur38 / this.fConst8)) : ((this.fConst7 * ((fRecCur38 - this.fRec39) / this.fConst8)) + this.fRec38));
        let fRecCur40: f32 = (iTemp1 ? (this.fConst7 * (fRecCur39 / this.fConst8)) : ((this.fConst7 * ((fRecCur39 - this.fRec40) / this.fConst8)) + this.fRec39));
        let fRecCur41: f32 = (iTemp1 ? (this.fConst7 * (fRecCur40 / this.fConst8)) : ((this.fConst7 * ((fRecCur40 - this.fRec41) / this.fConst8)) + this.fRec40));
        let fRecCur42: f32 = (iTemp1 ? (this.fConst7 * (fRecCur41 / this.fConst8)) : ((this.fConst7 * ((fRecCur41 - this.fRec42) / this.fConst8)) + this.fRec41));
        let fRecCur43: f32 = (iTemp1 ? (this.fConst7 * (fRecCur42 / this.fConst8)) : ((this.fConst7 * ((fRecCur42 - this.fRec43) / this.fConst8)) + this.fRec42));
        let fRecCur44: f32 = (iTemp1 ? (this.fConst7 * (fRecCur43 / this.fConst8)) : ((this.fConst7 * ((fRecCur43 - this.fRec44) / this.fConst8)) + this.fRec43));
        let fRecCur45: f32 = (iTemp1 ? (this.fConst7 * (fRecCur44 / this.fConst8)) : ((this.fConst7 * ((fRecCur44 - this.fRec45) / this.fConst8)) + this.fRec44));
        let fRecCur46: f32 = (iTemp1 ? (this.fConst7 * (fRecCur45 / this.fConst8)) : ((this.fConst7 * ((fRecCur45 - this.fRec46) / this.fConst8)) + this.fRec45));
        let fRecCur47: f32 = (iTemp1 ? (this.fConst7 * (fRecCur46 / this.fConst8)) : ((this.fConst7 * ((fRecCur46 - this.fRec47) / this.fConst8)) + this.fRec46));
        let fRecCur48: f32 = (iTemp1 ? (this.fConst7 * (fRecCur47 / this.fConst8)) : ((this.fConst7 * ((fRecCur47 - this.fRec48) / this.fConst8)) + this.fRec47));
        let fRecCur49: f32 = (iTemp1 ? (this.fConst7 * (fRecCur48 / this.fConst8)) : ((this.fConst7 * ((fRecCur48 - this.fRec49) / this.fConst8)) + this.fRec48));
        let fRecCur50: f32 = (iTemp1 ? (this.fConst7 * (fRecCur49 / this.fConst8)) : ((this.fConst7 * ((fRecCur49 - this.fRec50) / this.fConst8)) + this.fRec49));
        let fRecCur51: f32 = (iTemp1 ? (this.fConst7 * (fRecCur50 / this.fConst8)) : ((this.fConst7 * ((fRecCur50 - this.fRec51) / this.fConst8)) + this.fRec50));
        let fRecCur52: f32 = (iTemp1 ? (this.fConst7 * (fRecCur51 / this.fConst8)) : ((this.fConst7 * ((fRecCur51 - this.fRec52) / this.fConst8)) + this.fRec51));
        let fRecCur53: f32 = (iTemp1 ? (this.fConst7 * (fRecCur52 / this.fConst8)) : ((this.fConst7 * ((fRecCur52 - this.fRec53) / this.fConst8)) + this.fRec52));
        let fRecCur54: f32 = (iTemp1 ? (this.fConst7 * (fRecCur53 / this.fConst8)) : ((this.fConst7 * ((fRecCur53 - this.fRec54) / this.fConst8)) + this.fRec53));
        let fRecCur55: f32 = (iTemp1 ? (this.fConst7 * (fRecCur54 / this.fConst8)) : ((this.fConst7 * ((fRecCur54 - this.fRec55) / this.fConst8)) + this.fRec54));
        let fRecCur56: f32 = (iTemp1 ? (this.fConst7 * (fRecCur55 / this.fConst8)) : ((this.fConst7 * ((fRecCur55 - this.fRec56) / this.fConst8)) + this.fRec55));
        let fRecCur57: f32 = (iTemp1 ? (this.fConst7 * (fRecCur56 / this.fConst8)) : ((this.fConst7 * ((fRecCur56 - this.fRec57) / this.fConst8)) + this.fRec56));
        let fRecCur58: f32 = (iTemp1 ? (this.fConst7 * (fRecCur57 / this.fConst8)) : ((this.fConst7 * ((fRecCur57 - this.fRec58) / this.fConst8)) + this.fRec57));
        let fRecCur59: f32 = (iTemp1 ? (this.fConst7 * (fRecCur58 / this.fConst8)) : ((this.fConst7 * ((fRecCur58 - this.fRec59) / this.fConst8)) + this.fRec58));
        let fRecCur60: f32 = (iTemp1 ? (this.fConst7 * (fRecCur59 / this.fConst8)) : ((this.fConst7 * ((fRecCur59 - this.fRec60) / this.fConst8)) + this.fRec59));
        let fRecCur61: f32 = (iTemp1 ? (this.fConst7 * (fRecCur60 / this.fConst8)) : ((this.fConst7 * ((fRecCur60 - this.fRec61) / this.fConst8)) + this.fRec60));
        let fRecCur62: f32 = (iTemp1 ? (this.fConst7 * (fRecCur61 / this.fConst8)) : ((this.fConst7 * ((fRecCur61 - this.fRec62) / this.fConst8)) + this.fRec61));
        let fRecCur63: f32 = (iTemp1 ? (this.fConst7 * (fRecCur62 / this.fConst8)) : ((this.fConst7 * ((fRecCur62 - this.fRec63) / this.fConst8)) + this.fRec62));
        let fRecCur64: f32 = (iTemp1 ? (this.fConst7 * (fRecCur63 / this.fConst8)) : ((this.fConst7 * ((fRecCur63 - this.fRec64) / this.fConst8)) + this.fRec63));
        let fRecCur65: f32 = (iTemp1 ? (this.fConst7 * (fRecCur64 / this.fConst8)) : ((this.fConst7 * ((fRecCur64 - this.fRec65) / this.fConst8)) + this.fRec64));
        let fRecCur66: f32 = (iTemp1 ? (this.fConst7 * (fRecCur65 / this.fConst8)) : ((this.fConst7 * ((fRecCur65 - this.fRec66) / this.fConst8)) + this.fRec65));
        let fRecCur67: f32 = (iTemp1 ? (this.fConst7 * (fRecCur66 / this.fConst8)) : ((this.fConst7 * ((fRecCur66 - this.fRec67) / this.fConst8)) + this.fRec66));
        let fRecCur68: f32 = (iTemp1 ? (this.fConst7 * (fRecCur67 / this.fConst8)) : ((this.fConst7 * ((fRecCur67 - this.fRec68) / this.fConst8)) + this.fRec67));
        let fRecCur69: f32 = (iTemp1 ? (this.fConst7 * (fRecCur68 / this.fConst8)) : ((this.fConst7 * ((fRecCur68 - this.fRec69) / this.fConst8)) + this.fRec68));
        let fRecCur70: f32 = (iTemp1 ? (this.fConst7 * (fRecCur69 / this.fConst8)) : ((this.fConst7 * ((fRecCur69 - this.fRec70) / this.fConst8)) + this.fRec69));
        let fRecCur71: f32 = (iTemp1 ? (this.fConst7 * (fRecCur70 / this.fConst8)) : ((this.fConst7 * ((fRecCur70 - this.fRec71) / this.fConst8)) + this.fRec70));
        let fRecCur72: f32 = (iTemp1 ? (this.fConst7 * (fRecCur71 / this.fConst8)) : ((this.fConst7 * ((fRecCur71 - this.fRec72) / this.fConst8)) + this.fRec71));
        let fRecCur73: f32 = (iTemp1 ? (this.fConst7 * (fRecCur72 / this.fConst8)) : ((this.fConst7 * ((fRecCur72 - this.fRec73) / this.fConst8)) + this.fRec72));
        let fRecCur74: f32 = (iTemp1 ? (this.fConst7 * (fRecCur73 / this.fConst8)) : ((this.fConst7 * ((fRecCur73 - this.fRec74) / this.fConst8)) + this.fRec73));
        let fRecCur75: f32 = (iTemp1 ? (this.fConst7 * (fRecCur74 / this.fConst8)) : ((this.fConst7 * ((fRecCur74 - this.fRec75) / this.fConst8)) + this.fRec74));
        let fRecCur76: f32 = (iTemp1 ? (this.fConst7 * (fRecCur75 / this.fConst8)) : ((this.fConst7 * ((fRecCur75 - this.fRec76) / this.fConst8)) + this.fRec75));
        let fRecCur77: f32 = (iTemp1 ? (this.fConst7 * (fRecCur76 / this.fConst8)) : ((this.fConst7 * ((fRecCur76 - this.fRec77) / this.fConst8)) + this.fRec76));
        let fRecCur78: f32 = (iTemp1 ? (this.fConst7 * (fRecCur77 / this.fConst8)) : ((this.fConst7 * ((fRecCur77 - this.fRec78) / this.fConst8)) + this.fRec77));
        let fRecCur79: f32 = (iTemp1 ? (this.fConst7 * (fRecCur78 / this.fConst8)) : ((this.fConst7 * ((fRecCur78 - this.fRec79) / this.fConst8)) + this.fRec78));
        let fRecCur80: f32 = (iTemp1 ? (this.fConst7 * (fRecCur79 / this.fConst8)) : ((this.fConst7 * ((fRecCur79 - this.fRec80) / this.fConst8)) + this.fRec79));
        let fRecCur81: f32 = (iTemp1 ? (this.fConst7 * (fRecCur80 / this.fConst8)) : ((this.fConst7 * ((fRecCur80 - this.fRec81) / this.fConst8)) + this.fRec80));
        let fRecCur82: f32 = (iTemp1 ? (this.fConst7 * (fRecCur81 / this.fConst8)) : ((this.fConst7 * ((fRecCur81 - this.fRec82) / this.fConst8)) + this.fRec81));
        let fRecCur83: f32 = (iTemp1 ? (this.fConst7 * (fRecCur82 / this.fConst8)) : ((this.fConst7 * ((fRecCur82 - this.fRec83) / this.fConst8)) + this.fRec82));
        let fRecCur84: f32 = (iTemp1 ? (this.fConst7 * (fRecCur83 / this.fConst8)) : ((this.fConst7 * ((fRecCur83 - this.fRec84) / this.fConst8)) + this.fRec83));
        let fRecCur85: f32 = (iTemp1 ? (this.fConst7 * (fRecCur84 / this.fConst8)) : ((this.fConst7 * ((fRecCur84 - this.fRec85) / this.fConst8)) + this.fRec84));
        let fRecCur86: f32 = (iTemp1 ? (this.fConst7 * (fRecCur85 / this.fConst8)) : ((this.fConst7 * ((fRecCur85 - this.fRec86) / this.fConst8)) + this.fRec85));
        let fRecCur87: f32 = (iTemp1 ? (this.fConst7 * (fRecCur86 / this.fConst8)) : ((this.fConst7 * ((fRecCur86 - this.fRec87) / this.fConst8)) + this.fRec86));
        let fRecCur88: f32 = (iTemp1 ? (this.fConst7 * (fRecCur87 / this.fConst8)) : ((this.fConst7 * ((fRecCur87 - this.fRec88) / this.fConst8)) + this.fRec87));
        let fRecCur89: f32 = (iTemp1 ? (this.fConst7 * (fRecCur88 / this.fConst8)) : ((this.fConst7 * ((fRecCur88 - this.fRec89) / this.fConst8)) + this.fRec88));
        let fRecCur90: f32 = (iTemp1 ? (this.fConst7 * (fRecCur89 / this.fConst8)) : ((this.fConst7 * ((fRecCur89 - this.fRec90) / this.fConst8)) + this.fRec89));
        let fRecCur91: f32 = (iTemp1 ? (this.fConst7 * (fRecCur90 / this.fConst8)) : ((this.fConst7 * ((fRecCur90 - this.fRec91) / this.fConst8)) + this.fRec90));
        let fRecCur92: f32 = (iTemp1 ? (this.fConst7 * (fRecCur91 / this.fConst8)) : ((this.fConst7 * ((fRecCur91 - this.fRec92) / this.fConst8)) + this.fRec91));
        let fRecCur93: f32 = (iTemp1 ? (this.fConst7 * (fRecCur92 / this.fConst8)) : ((this.fConst7 * ((fRecCur92 - this.fRec93) / this.fConst8)) + this.fRec92));
        let fRecBody56: f32 = (fRecCur14 * fRecCur93);
        let fRecBody57: f32 = fRecCur93;
        let iTemp13: i32 = (this.fIOTA & <i32>(511));
        this.fRec3[iTemp13] = fRecBody56;
        this.fRec3_1[<i32>(0)] = fRecBody57;
        let fTemp21: f32 = this.fRec6[<i32>(1)];
        let iTemp8: i32 = (iTemp0 & ((this.fSlow2 != this.fRec1) | (this.fRec2_1[<i32>(1)] <= 0.0)));
        let iTemp9: i32 = (<i32>(1) - iTemp8);
        let fTemp22: f32 = <f32>(iTemp9);
        let fTemp23: f32 = this.fRec6_2[<i32>(1)];
        let fTemp24: f32 = (<f32>(this.iRec12_1[<i32>(0)]) / fTemp7);
        let fTemp25: f32 = this.fRec9[<i32>(1)];
        let fTemp26: f32 = this.fRec9_2[<i32>(1)];
        let fTemp27: f32 = this.fRec10[<i32>(1)];
        let fTemp28: f32 = this.fRec10_2[<i32>(1)];
        let fRecBody58: f32 = (0.00000000023283064365386963 * fTemp24);
        let fRecBody59: f32 = (fTemp3 * fTemp25);
        let fRecBody60: f32 = (((fTemp14 * ((0.00000000011641532182693481 * fTemp24) + (fTemp3 * (fTemp25 + (0.5 * this.fRec9_1[<i32>(1)]))))) + (fTemp3 * ((2.0 * (fTemp26 * fTemp13)) - (this.fRec9_3[<i32>(1)] * fTemp16)))) / fTemp17);
        let fRecBody61: f32 = (fTemp3 * fTemp26);
        this.fRec9[<i32>(0)] = fRecBody58;
        this.fRec9_1[<i32>(0)] = fRecBody59;
        this.fRec9_2[<i32>(0)] = fRecBody60;
        this.fRec9_3[<i32>(0)] = fRecBody61;
        let fTemp29: f32 = (fTemp18 * this.fRec8[iTemp12]);
        this.fVec19177[<i32>(0)] = fTemp29;
        let fRecCur94: f32 = (iTemp1 ? (this.fConst10 * (fTemp29 / this.fConst11)) : ((this.fConst10 * ((fTemp29 - this.fRec94) / this.fConst11)) + this.fVec19177[<i32>(1)]));
        let fRecBody62: f32 = fRecCur94;
        let fRecBody63: f32 = (fTemp3 * fTemp27);
        let fRecBody64: f32 = (((this.fConst17 * ((0.5 * fRecCur94) + (fTemp3 * ((0.5 * this.fRec10_1[<i32>(1)]) - fTemp27)))) + (fTemp3 * ((2.0 * (fTemp28 * this.fConst16)) - (this.fRec10_3[<i32>(1)] * this.fConst19)))) / this.fConst20);
        let fRecBody65: f32 = (fTemp3 * fTemp28);
        this.fRec10[<i32>(0)] = fRecBody62;
        this.fRec10_1[<i32>(0)] = fRecBody63;
        this.fRec10_2[<i32>(0)] = fRecBody64;
        this.fRec10_3[<i32>(0)] = fRecBody65;
        let fTemp30: f32 = ((fRecCur15 * this.fRec9_2[<i32>(0)]) + this.fRec10_2[<i32>(0)]);
        this.fVec19210[<i32>(0)] = fTemp30;
        let fRecCur95: f32 = (iTemp1 ? (this.fConst7 * (fTemp30 / this.fConst8)) : ((this.fConst7 * ((fTemp30 - this.fRec95) / this.fConst8)) + this.fVec19210[<i32>(1)]));
        let fRecCur96: f32 = (iTemp1 ? (this.fConst7 * (fRecCur95 / this.fConst8)) : ((this.fConst7 * ((fRecCur95 - this.fRec96) / this.fConst8)) + this.fRec95));
        let fRecCur97: f32 = (iTemp1 ? (this.fConst7 * (fRecCur96 / this.fConst8)) : ((this.fConst7 * ((fRecCur96 - this.fRec97) / this.fConst8)) + this.fRec96));
        let fRecCur98: f32 = (iTemp1 ? (this.fConst7 * (fRecCur97 / this.fConst8)) : ((this.fConst7 * ((fRecCur97 - this.fRec98) / this.fConst8)) + this.fRec97));
        let fRecCur99: f32 = (iTemp1 ? (this.fConst7 * (fRecCur98 / this.fConst8)) : ((this.fConst7 * ((fRecCur98 - this.fRec99) / this.fConst8)) + this.fRec98));
        let fRecCur100: f32 = (iTemp1 ? (this.fConst7 * (fRecCur99 / this.fConst8)) : ((this.fConst7 * ((fRecCur99 - this.fRec100) / this.fConst8)) + this.fRec99));
        let fRecCur101: f32 = (iTemp1 ? (this.fConst7 * (fRecCur100 / this.fConst8)) : ((this.fConst7 * ((fRecCur100 - this.fRec101) / this.fConst8)) + this.fRec100));
        let fRecCur102: f32 = (iTemp1 ? (this.fConst7 * (fRecCur101 / this.fConst8)) : ((this.fConst7 * ((fRecCur101 - this.fRec102) / this.fConst8)) + this.fRec101));
        let fRecCur103: f32 = (iTemp1 ? (this.fConst7 * (fRecCur102 / this.fConst8)) : ((this.fConst7 * ((fRecCur102 - this.fRec103) / this.fConst8)) + this.fRec102));
        let fRecCur104: f32 = (iTemp1 ? (this.fConst7 * (fRecCur103 / this.fConst8)) : ((this.fConst7 * ((fRecCur103 - this.fRec104) / this.fConst8)) + this.fRec103));
        let fRecCur105: f32 = (iTemp1 ? (this.fConst7 * (fRecCur104 / this.fConst8)) : ((this.fConst7 * ((fRecCur104 - this.fRec105) / this.fConst8)) + this.fRec104));
        let fRecCur106: f32 = (iTemp1 ? (this.fConst7 * (fRecCur105 / this.fConst8)) : ((this.fConst7 * ((fRecCur105 - this.fRec106) / this.fConst8)) + this.fRec105));
        let fRecCur107: f32 = (iTemp1 ? (this.fConst7 * (fRecCur106 / this.fConst8)) : ((this.fConst7 * ((fRecCur106 - this.fRec107) / this.fConst8)) + this.fRec106));
        let fRecCur108: f32 = (iTemp1 ? (this.fConst7 * (fRecCur107 / this.fConst8)) : ((this.fConst7 * ((fRecCur107 - this.fRec108) / this.fConst8)) + this.fRec107));
        let fRecCur109: f32 = (iTemp1 ? (this.fConst7 * (fRecCur108 / this.fConst8)) : ((this.fConst7 * ((fRecCur108 - this.fRec109) / this.fConst8)) + this.fRec108));
        let fRecCur110: f32 = (iTemp1 ? (this.fConst7 * (fRecCur109 / this.fConst8)) : ((this.fConst7 * ((fRecCur109 - this.fRec110) / this.fConst8)) + this.fRec109));
        let fRecCur111: f32 = (iTemp1 ? (this.fConst7 * (fRecCur110 / this.fConst8)) : ((this.fConst7 * ((fRecCur110 - this.fRec111) / this.fConst8)) + this.fRec110));
        let fRecCur112: f32 = (iTemp1 ? (this.fConst7 * (fRecCur111 / this.fConst8)) : ((this.fConst7 * ((fRecCur111 - this.fRec112) / this.fConst8)) + this.fRec111));
        let fRecCur113: f32 = (iTemp1 ? (this.fConst7 * (fRecCur112 / this.fConst8)) : ((this.fConst7 * ((fRecCur112 - this.fRec113) / this.fConst8)) + this.fRec112));
        let fRecCur114: f32 = (iTemp1 ? (this.fConst7 * (fRecCur113 / this.fConst8)) : ((this.fConst7 * ((fRecCur113 - this.fRec114) / this.fConst8)) + this.fRec113));
        let fRecCur115: f32 = (iTemp1 ? (this.fConst7 * (fRecCur114 / this.fConst8)) : ((this.fConst7 * ((fRecCur114 - this.fRec115) / this.fConst8)) + this.fRec114));
        let fRecCur116: f32 = (iTemp1 ? (this.fConst7 * (fRecCur115 / this.fConst8)) : ((this.fConst7 * ((fRecCur115 - this.fRec116) / this.fConst8)) + this.fRec115));
        let fRecCur117: f32 = (iTemp1 ? (this.fConst7 * (fRecCur116 / this.fConst8)) : ((this.fConst7 * ((fRecCur116 - this.fRec117) / this.fConst8)) + this.fRec116));
        let fRecCur118: f32 = (iTemp1 ? (this.fConst7 * (fRecCur117 / this.fConst8)) : ((this.fConst7 * ((fRecCur117 - this.fRec118) / this.fConst8)) + this.fRec117));
        let fRecCur119: f32 = (iTemp1 ? (this.fConst7 * (fRecCur118 / this.fConst8)) : ((this.fConst7 * ((fRecCur118 - this.fRec119) / this.fConst8)) + this.fRec118));
        let fRecCur120: f32 = (iTemp1 ? (this.fConst7 * (fRecCur119 / this.fConst8)) : ((this.fConst7 * ((fRecCur119 - this.fRec120) / this.fConst8)) + this.fRec119));
        let fRecCur121: f32 = (iTemp1 ? (this.fConst7 * (fRecCur120 / this.fConst8)) : ((this.fConst7 * ((fRecCur120 - this.fRec121) / this.fConst8)) + this.fRec120));
        let fRecCur122: f32 = (iTemp1 ? (this.fConst7 * (fRecCur121 / this.fConst8)) : ((this.fConst7 * ((fRecCur121 - this.fRec122) / this.fConst8)) + this.fRec121));
        let fRecCur123: f32 = (iTemp1 ? (this.fConst7 * (fRecCur122 / this.fConst8)) : ((this.fConst7 * ((fRecCur122 - this.fRec123) / this.fConst8)) + this.fRec122));
        let fRecCur124: f32 = (iTemp1 ? (this.fConst7 * (fRecCur123 / this.fConst8)) : ((this.fConst7 * ((fRecCur123 - this.fRec124) / this.fConst8)) + this.fRec123));
        let fRecCur125: f32 = (iTemp1 ? (this.fConst7 * (fRecCur124 / this.fConst8)) : ((this.fConst7 * ((fRecCur124 - this.fRec125) / this.fConst8)) + this.fRec124));
        let fRecCur126: f32 = (iTemp1 ? (this.fConst7 * (fRecCur125 / this.fConst8)) : ((this.fConst7 * ((fRecCur125 - this.fRec126) / this.fConst8)) + this.fRec125));
        let fRecCur127: f32 = (iTemp1 ? (this.fConst7 * (fRecCur126 / this.fConst8)) : ((this.fConst7 * ((fRecCur126 - this.fRec127) / this.fConst8)) + this.fRec126));
        let fRecCur128: f32 = (iTemp1 ? (this.fConst7 * (fRecCur127 / this.fConst8)) : ((this.fConst7 * ((fRecCur127 - this.fRec128) / this.fConst8)) + this.fRec127));
        let fRecCur129: f32 = (iTemp1 ? (this.fConst7 * (fRecCur128 / this.fConst8)) : ((this.fConst7 * ((fRecCur128 - this.fRec129) / this.fConst8)) + this.fRec128));
        let fRecCur130: f32 = (iTemp1 ? (this.fConst7 * (fRecCur129 / this.fConst8)) : ((this.fConst7 * ((fRecCur129 - this.fRec130) / this.fConst8)) + this.fRec129));
        let fRecCur131: f32 = (iTemp1 ? (this.fConst7 * (fRecCur130 / this.fConst8)) : ((this.fConst7 * ((fRecCur130 - this.fRec131) / this.fConst8)) + this.fRec130));
        let fRecCur132: f32 = (iTemp1 ? (this.fConst7 * (fRecCur131 / this.fConst8)) : ((this.fConst7 * ((fRecCur131 - this.fRec132) / this.fConst8)) + this.fRec131));
        let fRecCur133: f32 = (iTemp1 ? (this.fConst7 * (fRecCur132 / this.fConst8)) : ((this.fConst7 * ((fRecCur132 - this.fRec133) / this.fConst8)) + this.fRec132));
        let fRecCur134: f32 = (iTemp1 ? (this.fConst7 * (fRecCur133 / this.fConst8)) : ((this.fConst7 * ((fRecCur133 - this.fRec134) / this.fConst8)) + this.fRec133));
        let fRecCur135: f32 = (iTemp1 ? (this.fConst7 * (fRecCur134 / this.fConst8)) : ((this.fConst7 * ((fRecCur134 - this.fRec135) / this.fConst8)) + this.fRec134));
        let fRecCur136: f32 = (iTemp1 ? (this.fConst7 * (fRecCur135 / this.fConst8)) : ((this.fConst7 * ((fRecCur135 - this.fRec136) / this.fConst8)) + this.fRec135));
        let fRecCur137: f32 = (iTemp1 ? (this.fConst7 * (fRecCur136 / this.fConst8)) : ((this.fConst7 * ((fRecCur136 - this.fRec137) / this.fConst8)) + this.fRec136));
        let fRecCur138: f32 = (iTemp1 ? (this.fConst7 * (fRecCur137 / this.fConst8)) : ((this.fConst7 * ((fRecCur137 - this.fRec138) / this.fConst8)) + this.fRec137));
        let fRecCur139: f32 = (iTemp1 ? (this.fConst7 * (fRecCur138 / this.fConst8)) : ((this.fConst7 * ((fRecCur138 - this.fRec139) / this.fConst8)) + this.fRec138));
        let fRecCur140: f32 = (iTemp1 ? (this.fConst7 * (fRecCur139 / this.fConst8)) : ((this.fConst7 * ((fRecCur139 - this.fRec140) / this.fConst8)) + this.fRec139));
        let fRecCur141: f32 = (iTemp1 ? (this.fConst7 * (fRecCur140 / this.fConst8)) : ((this.fConst7 * ((fRecCur140 - this.fRec141) / this.fConst8)) + this.fRec140));
        let fRecCur142: f32 = (iTemp1 ? (this.fConst7 * (fRecCur141 / this.fConst8)) : ((this.fConst7 * ((fRecCur141 - this.fRec142) / this.fConst8)) + this.fRec141));
        let fRecCur143: f32 = (iTemp1 ? (this.fConst7 * (fRecCur142 / this.fConst8)) : ((this.fConst7 * ((fRecCur142 - this.fRec143) / this.fConst8)) + this.fRec142));
        let fRecCur144: f32 = (iTemp1 ? (this.fConst7 * (fRecCur143 / this.fConst8)) : ((this.fConst7 * ((fRecCur143 - this.fRec144) / this.fConst8)) + this.fRec143));
        let fRecCur145: f32 = (iTemp1 ? (this.fConst7 * (fRecCur144 / this.fConst8)) : ((this.fConst7 * ((fRecCur144 - this.fRec145) / this.fConst8)) + this.fRec144));
        let fRecCur146: f32 = (iTemp1 ? (this.fConst7 * (fRecCur145 / this.fConst8)) : ((this.fConst7 * ((fRecCur145 - this.fRec146) / this.fConst8)) + this.fRec145));
        let fRecCur147: f32 = (iTemp1 ? (this.fConst7 * (fRecCur146 / this.fConst8)) : ((this.fConst7 * ((fRecCur146 - this.fRec147) / this.fConst8)) + this.fRec146));
        let fRecCur148: f32 = (iTemp1 ? (this.fConst7 * (fRecCur147 / this.fConst8)) : ((this.fConst7 * ((fRecCur147 - this.fRec148) / this.fConst8)) + this.fRec147));
        let fRecCur149: f32 = (iTemp1 ? (this.fConst7 * (fRecCur148 / this.fConst8)) : ((this.fConst7 * ((fRecCur148 - this.fRec149) / this.fConst8)) + this.fRec148));
        let fRecCur150: f32 = (iTemp1 ? (this.fConst7 * (fRecCur149 / this.fConst8)) : ((this.fConst7 * ((fRecCur149 - this.fRec150) / this.fConst8)) + this.fRec149));
        let fRecCur151: f32 = (iTemp1 ? (this.fConst7 * (fRecCur150 / this.fConst8)) : ((this.fConst7 * ((fRecCur150 - this.fRec151) / this.fConst8)) + this.fRec150));
        let fRecCur152: f32 = (iTemp1 ? (this.fConst7 * (fRecCur151 / this.fConst8)) : ((this.fConst7 * ((fRecCur151 - this.fRec152) / this.fConst8)) + this.fRec151));
        let fRecCur153: f32 = (iTemp1 ? (this.fConst7 * (fRecCur152 / this.fConst8)) : ((this.fConst7 * ((fRecCur152 - this.fRec153) / this.fConst8)) + this.fRec152));
        let fRecCur154: f32 = (iTemp1 ? (this.fConst7 * (fRecCur153 / this.fConst8)) : ((this.fConst7 * ((fRecCur153 - this.fRec154) / this.fConst8)) + this.fRec153));
        let fRecCur155: f32 = (iTemp1 ? (this.fConst7 * (fRecCur154 / this.fConst8)) : ((this.fConst7 * ((fRecCur154 - this.fRec155) / this.fConst8)) + this.fRec154));
        let fRecCur156: f32 = (iTemp1 ? (this.fConst7 * (fRecCur155 / this.fConst8)) : ((this.fConst7 * ((fRecCur155 - this.fRec156) / this.fConst8)) + this.fRec155));
        let fRecCur157: f32 = (iTemp1 ? (this.fConst7 * (fRecCur156 / this.fConst8)) : ((this.fConst7 * ((fRecCur156 - this.fRec157) / this.fConst8)) + this.fRec156));
        let fRecCur158: f32 = (iTemp1 ? (this.fConst7 * (fRecCur157 / this.fConst8)) : ((this.fConst7 * ((fRecCur157 - this.fRec158) / this.fConst8)) + this.fRec157));
        let fRecCur159: f32 = (iTemp1 ? (this.fConst7 * (fRecCur158 / this.fConst8)) : ((this.fConst7 * ((fRecCur158 - this.fRec159) / this.fConst8)) + this.fRec158));
        let fRecCur160: f32 = (iTemp1 ? (this.fConst7 * (fRecCur159 / this.fConst8)) : ((this.fConst7 * ((fRecCur159 - this.fRec160) / this.fConst8)) + this.fRec159));
        let fRecCur161: f32 = (iTemp1 ? (this.fConst7 * (fRecCur160 / this.fConst8)) : ((this.fConst7 * ((fRecCur160 - this.fRec161) / this.fConst8)) + this.fRec160));
        let fRecCur162: f32 = (iTemp1 ? (this.fConst7 * (fRecCur161 / this.fConst8)) : ((this.fConst7 * ((fRecCur161 - this.fRec162) / this.fConst8)) + this.fRec161));
        let fRecCur163: f32 = (iTemp1 ? (this.fConst7 * (fRecCur162 / this.fConst8)) : ((this.fConst7 * ((fRecCur162 - this.fRec163) / this.fConst8)) + this.fRec162));
        let fRecCur164: f32 = (iTemp1 ? (this.fConst7 * (fRecCur163 / this.fConst8)) : ((this.fConst7 * ((fRecCur163 - this.fRec164) / this.fConst8)) + this.fRec163));
        let fRecCur165: f32 = (iTemp1 ? (this.fConst7 * (fRecCur164 / this.fConst8)) : ((this.fConst7 * ((fRecCur164 - this.fRec165) / this.fConst8)) + this.fRec164));
        let fRecCur166: f32 = (iTemp1 ? (this.fConst7 * (fRecCur165 / this.fConst8)) : ((this.fConst7 * ((fRecCur165 - this.fRec166) / this.fConst8)) + this.fRec165));
        let fRecCur167: f32 = (iTemp1 ? (this.fConst7 * (fRecCur166 / this.fConst8)) : ((this.fConst7 * ((fRecCur166 - this.fRec167) / this.fConst8)) + this.fRec166));
        let fRecCur168: f32 = (iTemp1 ? (this.fConst7 * (fRecCur167 / this.fConst8)) : ((this.fConst7 * ((fRecCur167 - this.fRec168) / this.fConst8)) + this.fRec167));
        let fRecCur169: f32 = (iTemp1 ? (this.fConst7 * (fRecCur168 / this.fConst8)) : ((this.fConst7 * ((fRecCur168 - this.fRec169) / this.fConst8)) + this.fRec168));
        let fRecBody66: f32 = (fRecCur14 * fRecCur169);
        let fRecBody67: f32 = fRecCur169;
        this.fRec8[iTemp13] = fRecBody66;
        this.fRec8_1[<i32>(0)] = fRecBody67;
        let fTemp31: f32 = this.fRec11[<i32>(1)];
        let fTemp32: f32 = this.fRec11_2[<i32>(1)];
        let iRecBody68: i32 = (iTemp4 ? (iTemp6 ? <i32>(3) : ((fTemp6 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp5 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody69: f32 = (iTemp4 ? (iTemp6 ? fTemp4 : fTemp6) : (iTemp5 ? fTemp5 : max<f32>(0.0, (fTemp4 - this.fConst5))));
        this.iRec2[<i32>(0)] = iRecBody68;
        this.fRec2_1[<i32>(0)] = fRecBody69;
        let fRecCur170: f32 = (iTemp8 ? this.fSlow12 : this.fRec170);
        let fTemp33: f32 = (1.0 - fRecCur170);
        let fTemp34: f32 = (1.0 - fTemp2);
        let fRecCur171: f32 = (iTemp8 ? (this.fSlow27 - (5.0 * fRecCur170)) : this.fRec171);
        let iTemp10: i32 = max<i32>(<i32>(1), <i32>(fRecCur171));
        let fTemp35: f32 = max<f32>(0.0, (fRecCur171 - <f32>(iTemp10)));
        let fTemp36: f32 = (1.0 - fTemp35);
        let iTemp11: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp10 + <i32>(-1))));
        let iTemp14: i32 = ((this.fIOTA - (iTemp11 + <i32>(1))) & <i32>(16383));
        let fTemp37: f32 = this.fRec0[iTemp14];
        let iRecCur172: i32 = ((this.iRec172 + <i32>(1)) * iTemp9);
        let fTemp38: f32 = <f32>((iRecCur172 >= iTemp10));
        let fTemp39: f32 = (fTemp37 * fTemp38);
        let fTemp40: f32 = (fTemp35 + 1.0);
        this.fVec20201[<i32>(0)] = fTemp39;
        let fRecCur173: f32 = (iTemp8 ? (((fTemp36 * fTemp37) * fTemp38) / fTemp40) : (((fTemp36 * (fTemp39 - this.fRec173)) / fTemp40) + this.fVec20201[<i32>(1)]));
        let fRecBody70: f32 = fRecCur173;
        let fRecBody71: f32 = (fTemp21 * fTemp22);
        let fRecBody72: f32 = (((this.fConst23 * ((0.5 * fRecCur173) + (fTemp22 * (fTemp21 + (0.5 * this.fRec6_1[<i32>(1)]))))) + (fTemp22 * ((2.0 * (fTemp23 * this.fConst22)) - (this.fRec6_3[<i32>(1)] * this.fConst26)))) / this.fConst27);
        let fRecBody73: f32 = (fTemp22 * fTemp23);
        this.fRec6[<i32>(0)] = fRecBody70;
        this.fRec6_1[<i32>(0)] = fRecBody71;
        this.fRec6_2[<i32>(0)] = fRecBody72;
        this.fRec6_3[<i32>(0)] = fRecBody73;
        let fTemp41: f32 = ((fTemp34 * this.fRec3_1[<i32>(1)]) + this.fRec6_2[<i32>(0)]);
        let fTemp42: f32 = (fRecCur170 + 1.0);
        this.fVec20225[<i32>(0)] = fTemp41;
        let fRecCur174: f32 = (iTemp8 ? ((fTemp33 * fTemp41) / fTemp42) : (((fTemp33 * (fTemp41 - this.fRec174)) / fTemp42) + this.fVec20225[<i32>(1)]));
        let fRecCur175: f32 = (iTemp8 ? ((fTemp33 * fRecCur174) / fTemp42) : (((fTemp33 * (fRecCur174 - this.fRec175)) / fTemp42) + this.fRec174));
        let fRecCur176: f32 = (iTemp8 ? ((fTemp33 * fRecCur175) / fTemp42) : (((fTemp33 * (fRecCur175 - this.fRec176)) / fTemp42) + this.fRec175));
        let fRecCur177: f32 = (iTemp8 ? ((fTemp33 * fRecCur176) / fTemp42) : (((fTemp33 * (fRecCur176 - this.fRec177)) / fTemp42) + this.fRec176));
        let fRecCur178: f32 = (iTemp8 ? ((fTemp33 * fRecCur177) / fTemp42) : (((fTemp33 * (fRecCur177 - this.fRec178)) / fTemp42) + this.fRec177));
        let fTemp43: f32 = (this.fRec2_1[<i32>(0)] * fRecCur178);
        let fRecCur179: f32 = (iTemp8 ? this.fSlow28 : this.fRec179);
        let fTemp44: f32 = (1.0 - (this.fSlow5 * (1.0 - fRecCur179)));
        let fRecBody74: f32 = (fTemp43 * fTemp44);
        let fRecBody75: f32 = fTemp43;
        let iTemp15: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp15] = fRecBody74;
        this.fRec0_1[<i32>(0)] = fRecBody75;
        let fTemp45: f32 = this.fRec7[iTemp14];
        let fTemp46: f32 = (fTemp38 * fTemp45);
        this.fVec20308[<i32>(0)] = fTemp46;
        let fRecCur180: f32 = (iTemp8 ? (((fTemp36 * fTemp38) * fTemp45) / fTemp40) : (((fTemp36 * (fTemp46 - this.fRec180)) / fTemp40) + this.fVec20308[<i32>(1)]));
        let fRecBody76: f32 = fRecCur180;
        let fRecBody77: f32 = (fTemp22 * fTemp31);
        let fRecBody78: f32 = (((this.fConst23 * ((0.5 * fRecCur180) + (fTemp22 * (fTemp31 + (0.5 * this.fRec11_1[<i32>(1)]))))) + (fTemp22 * ((2.0 * (fTemp32 * this.fConst22)) - (this.fRec11_3[<i32>(1)] * this.fConst26)))) / this.fConst27);
        let fRecBody79: f32 = (fTemp22 * fTemp32);
        this.fRec11[<i32>(0)] = fRecBody76;
        this.fRec11_1[<i32>(0)] = fRecBody77;
        this.fRec11_2[<i32>(0)] = fRecBody78;
        this.fRec11_3[<i32>(0)] = fRecBody79;
        let fTemp47: f32 = ((fTemp34 * this.fRec8_1[<i32>(1)]) + this.fRec11_2[<i32>(0)]);
        this.fVec20331[<i32>(0)] = fTemp47;
        let fRecCur181: f32 = (iTemp8 ? ((fTemp33 * fTemp47) / fTemp42) : (((fTemp33 * (fTemp47 - this.fRec181)) / fTemp42) + this.fVec20331[<i32>(1)]));
        let fRecCur182: f32 = (iTemp8 ? ((fTemp33 * fRecCur181) / fTemp42) : (((fTemp33 * (fRecCur181 - this.fRec182)) / fTemp42) + this.fRec181));
        let fRecCur183: f32 = (iTemp8 ? ((fTemp33 * fRecCur182) / fTemp42) : (((fTemp33 * (fRecCur182 - this.fRec183)) / fTemp42) + this.fRec182));
        let fRecCur184: f32 = (iTemp8 ? ((fTemp33 * fRecCur183) / fTemp42) : (((fTemp33 * (fRecCur183 - this.fRec184)) / fTemp42) + this.fRec183));
        let fRecCur185: f32 = (iTemp8 ? ((fTemp33 * fRecCur184) / fTemp42) : (((fTemp33 * (fRecCur184 - this.fRec185)) / fTemp42) + this.fRec184));
        let fRecBody80: f32 = ((this.fRec2_1[<i32>(0)] * fTemp44) * fRecCur185);
        let fRecBody81: f32 = (this.fRec2_1[<i32>(0)] * fRecCur185);
        this.fRec7[iTemp15] = fRecBody80;
        this.fRec7_1[<i32>(0)] = fRecBody81;
        outputs[<i32>(0)] = <f32>((4.0 * this.fRec0_1[<i32>(0)]));
        outputs[<i32>(1)] = <f32>((4.0 * this.fRec7_1[<i32>(0)]));
        this.fVec7[<i32>(1)] = this.fVec7[<i32>(0)];
        this.fRec1 = fRecCur1;
        this.fVec113[<i32>(1)] = this.fVec113[<i32>(0)];
        this.iRec12[<i32>(1)] = this.iRec12[<i32>(0)];
        this.iRec12_1[<i32>(1)] = this.iRec12_1[<i32>(0)];
        this.fRec13 = fRecCur13;
        this.fRec14 = fRecCur14;
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec4[<i32>(1)] = this.fRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec4_2[<i32>(1)] = this.fRec4_2[<i32>(0)];
        this.fRec4_3[<i32>(1)] = this.fRec4_3[<i32>(0)];
        this.iRec17 = iRecCur17;
        this.fVec18153[<i32>(1)] = this.fVec18153[<i32>(0)];
        this.fRec18 = fRecCur18;
        this.fRec5[<i32>(1)] = this.fRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec5_2[<i32>(1)] = this.fRec5_2[<i32>(0)];
        this.fRec5_3[<i32>(1)] = this.fRec5_3[<i32>(0)];
        this.fVec18186[<i32>(1)] = this.fVec18186[<i32>(0)];
        this.fRec19 = fRecCur19;
        this.fRec20 = fRecCur20;
        this.fRec21 = fRecCur21;
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec24 = fRecCur24;
        this.fRec25 = fRecCur25;
        this.fRec26 = fRecCur26;
        this.fRec27 = fRecCur27;
        this.fRec28 = fRecCur28;
        this.fRec29 = fRecCur29;
        this.fRec30 = fRecCur30;
        this.fRec31 = fRecCur31;
        this.fRec32 = fRecCur32;
        this.fRec33 = fRecCur33;
        this.fRec34 = fRecCur34;
        this.fRec35 = fRecCur35;
        this.fRec36 = fRecCur36;
        this.fRec37 = fRecCur37;
        this.fRec38 = fRecCur38;
        this.fRec39 = fRecCur39;
        this.fRec40 = fRecCur40;
        this.fRec41 = fRecCur41;
        this.fRec42 = fRecCur42;
        this.fRec43 = fRecCur43;
        this.fRec44 = fRecCur44;
        this.fRec45 = fRecCur45;
        this.fRec46 = fRecCur46;
        this.fRec47 = fRecCur47;
        this.fRec48 = fRecCur48;
        this.fRec49 = fRecCur49;
        this.fRec50 = fRecCur50;
        this.fRec51 = fRecCur51;
        this.fRec52 = fRecCur52;
        this.fRec53 = fRecCur53;
        this.fRec54 = fRecCur54;
        this.fRec55 = fRecCur55;
        this.fRec56 = fRecCur56;
        this.fRec57 = fRecCur57;
        this.fRec58 = fRecCur58;
        this.fRec59 = fRecCur59;
        this.fRec60 = fRecCur60;
        this.fRec61 = fRecCur61;
        this.fRec62 = fRecCur62;
        this.fRec63 = fRecCur63;
        this.fRec64 = fRecCur64;
        this.fRec65 = fRecCur65;
        this.fRec66 = fRecCur66;
        this.fRec67 = fRecCur67;
        this.fRec68 = fRecCur68;
        this.fRec69 = fRecCur69;
        this.fRec70 = fRecCur70;
        this.fRec71 = fRecCur71;
        this.fRec72 = fRecCur72;
        this.fRec73 = fRecCur73;
        this.fRec74 = fRecCur74;
        this.fRec75 = fRecCur75;
        this.fRec76 = fRecCur76;
        this.fRec77 = fRecCur77;
        this.fRec78 = fRecCur78;
        this.fRec79 = fRecCur79;
        this.fRec80 = fRecCur80;
        this.fRec81 = fRecCur81;
        this.fRec82 = fRecCur82;
        this.fRec83 = fRecCur83;
        this.fRec84 = fRecCur84;
        this.fRec85 = fRecCur85;
        this.fRec86 = fRecCur86;
        this.fRec87 = fRecCur87;
        this.fRec88 = fRecCur88;
        this.fRec89 = fRecCur89;
        this.fRec90 = fRecCur90;
        this.fRec91 = fRecCur91;
        this.fRec92 = fRecCur92;
        this.fRec93 = fRecCur93;
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec9[<i32>(1)] = this.fRec9[<i32>(0)];
        this.fRec9_1[<i32>(1)] = this.fRec9_1[<i32>(0)];
        this.fRec9_2[<i32>(1)] = this.fRec9_2[<i32>(0)];
        this.fRec9_3[<i32>(1)] = this.fRec9_3[<i32>(0)];
        this.fVec19177[<i32>(1)] = this.fVec19177[<i32>(0)];
        this.fRec94 = fRecCur94;
        this.fRec10[<i32>(1)] = this.fRec10[<i32>(0)];
        this.fRec10_1[<i32>(1)] = this.fRec10_1[<i32>(0)];
        this.fRec10_2[<i32>(1)] = this.fRec10_2[<i32>(0)];
        this.fRec10_3[<i32>(1)] = this.fRec10_3[<i32>(0)];
        this.fVec19210[<i32>(1)] = this.fVec19210[<i32>(0)];
        this.fRec95 = fRecCur95;
        this.fRec96 = fRecCur96;
        this.fRec97 = fRecCur97;
        this.fRec98 = fRecCur98;
        this.fRec99 = fRecCur99;
        this.fRec100 = fRecCur100;
        this.fRec101 = fRecCur101;
        this.fRec102 = fRecCur102;
        this.fRec103 = fRecCur103;
        this.fRec104 = fRecCur104;
        this.fRec105 = fRecCur105;
        this.fRec106 = fRecCur106;
        this.fRec107 = fRecCur107;
        this.fRec108 = fRecCur108;
        this.fRec109 = fRecCur109;
        this.fRec110 = fRecCur110;
        this.fRec111 = fRecCur111;
        this.fRec112 = fRecCur112;
        this.fRec113 = fRecCur113;
        this.fRec114 = fRecCur114;
        this.fRec115 = fRecCur115;
        this.fRec116 = fRecCur116;
        this.fRec117 = fRecCur117;
        this.fRec118 = fRecCur118;
        this.fRec119 = fRecCur119;
        this.fRec120 = fRecCur120;
        this.fRec121 = fRecCur121;
        this.fRec122 = fRecCur122;
        this.fRec123 = fRecCur123;
        this.fRec124 = fRecCur124;
        this.fRec125 = fRecCur125;
        this.fRec126 = fRecCur126;
        this.fRec127 = fRecCur127;
        this.fRec128 = fRecCur128;
        this.fRec129 = fRecCur129;
        this.fRec130 = fRecCur130;
        this.fRec131 = fRecCur131;
        this.fRec132 = fRecCur132;
        this.fRec133 = fRecCur133;
        this.fRec134 = fRecCur134;
        this.fRec135 = fRecCur135;
        this.fRec136 = fRecCur136;
        this.fRec137 = fRecCur137;
        this.fRec138 = fRecCur138;
        this.fRec139 = fRecCur139;
        this.fRec140 = fRecCur140;
        this.fRec141 = fRecCur141;
        this.fRec142 = fRecCur142;
        this.fRec143 = fRecCur143;
        this.fRec144 = fRecCur144;
        this.fRec145 = fRecCur145;
        this.fRec146 = fRecCur146;
        this.fRec147 = fRecCur147;
        this.fRec148 = fRecCur148;
        this.fRec149 = fRecCur149;
        this.fRec150 = fRecCur150;
        this.fRec151 = fRecCur151;
        this.fRec152 = fRecCur152;
        this.fRec153 = fRecCur153;
        this.fRec154 = fRecCur154;
        this.fRec155 = fRecCur155;
        this.fRec156 = fRecCur156;
        this.fRec157 = fRecCur157;
        this.fRec158 = fRecCur158;
        this.fRec159 = fRecCur159;
        this.fRec160 = fRecCur160;
        this.fRec161 = fRecCur161;
        this.fRec162 = fRecCur162;
        this.fRec163 = fRecCur163;
        this.fRec164 = fRecCur164;
        this.fRec165 = fRecCur165;
        this.fRec166 = fRecCur166;
        this.fRec167 = fRecCur167;
        this.fRec168 = fRecCur168;
        this.fRec169 = fRecCur169;
        this.fRec8_1[<i32>(1)] = this.fRec8_1[<i32>(0)];
        this.iRec2[<i32>(1)] = this.iRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec170 = fRecCur170;
        this.fRec171 = fRecCur171;
        this.iRec172 = iRecCur172;
        this.fVec20201[<i32>(1)] = this.fVec20201[<i32>(0)];
        this.fRec173 = fRecCur173;
        this.fRec6[<i32>(1)] = this.fRec6[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec6_2[<i32>(1)] = this.fRec6_2[<i32>(0)];
        this.fRec6_3[<i32>(1)] = this.fRec6_3[<i32>(0)];
        this.fVec20225[<i32>(1)] = this.fVec20225[<i32>(0)];
        this.fRec174 = fRecCur174;
        this.fRec175 = fRecCur175;
        this.fRec176 = fRecCur176;
        this.fRec177 = fRecCur177;
        this.fRec178 = fRecCur178;
        this.fRec179 = fRecCur179;
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fVec20308[<i32>(1)] = this.fVec20308[<i32>(0)];
        this.fRec180 = fRecCur180;
        this.fRec11[<i32>(1)] = this.fRec11[<i32>(0)];
        this.fRec11_1[<i32>(1)] = this.fRec11_1[<i32>(0)];
        this.fRec11_2[<i32>(1)] = this.fRec11_2[<i32>(0)];
        this.fRec11_3[<i32>(1)] = this.fRec11_3[<i32>(0)];
        this.fVec20331[<i32>(1)] = this.fVec20331[<i32>(0)];
        this.fRec181 = fRecCur181;
        this.fRec182 = fRecCur182;
        this.fRec183 = fRecCur183;
        this.fRec184 = fRecCur184;
        this.fRec185 = fRecCur185;
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mpiano extends MidiVoice {
    readonly dsp: MpianoDsp = new MpianoDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(2);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MpianoChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MpianoChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider5 = this.typedChannel.damping;
        this.dsp.fHslider3 = this.typedChannel.hammerTone;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider2 = <f32>velocity / 127.0;
        this.dsp.fHslider5 = this.typedChannel.damping;
        this.dsp.fHslider3 = this.typedChannel.hammerTone;
        this.dsp.fButton0 = 1.0;
        this.dsp.control();
        for (let i = 0, n = <i32>(<f32>0.02 * SAMPLERATE); i < n; i++) this.dsp.frame(this.fin, this.fout);
        this.dsp.fButton0 = 0.0;
        this.dsp.fButton4 = 0.0;
        this.dsp.control();
        this.dsp.frame(this.fin, this.fout);
        this.dsp.fButton4 = 1.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.dsp.fButton4 = 0.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.dsp.fButton4 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {
        this.dsp.frame(this.fin, this.fout);
        const output: f32 = this.fout[0];
        const output1: f32 = this.fout[1];
        if (Mathf.max(Mathf.abs(output), Mathf.abs(output1)) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.dsp.fButton4 == 0.0) this.releaseSamples++;
        this.channel.signal.add(output * 0.25, output1 * 0.25);
    }
}

export class MpianoEffectDsp {
    fSampleRate: i32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec10_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec11_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec12_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec13_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec14_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec15_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec16_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec17_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec18_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec19_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec20_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec21_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec22_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec23_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec24_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec25_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec26_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec27_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec28_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec29_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec30_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec31_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec32_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec33_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec34_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec35_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec36_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec37_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec38_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec39_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec40_5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41_4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec41_5: StaticArray<f32> = new StaticArray<f32>(2);

    getSampleRate(): i32 {
        return this.fSampleRate;
    }
    getNumInputs(): i32 {
        return 2;
    }
    getNumOutputs(): i32 {
        return 2;
    }
    metadata(m: usize): void {
    }
    buildUserInterface(ui_interface: usize): void {
        // ui openbox mpiano_effect
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
    }
    instanceClear(): void {
        for (let lRec0: i32 = 0; lRec0 < <i32>(2); lRec0 = lRec0 + 1) {
            this.fRec0[lRec0] = 0.0;
        }
        for (let lRec1: i32 = 0; lRec1 < <i32>(2); lRec1 = lRec1 + 1) {
            this.fRec0_1[lRec1] = 0.0;
        }
        for (let lRec2: i32 = 0; lRec2 < <i32>(2); lRec2 = lRec2 + 1) {
            this.fRec0_2[lRec2] = 0.0;
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(2); lRec3 = lRec3 + 1) {
            this.fRec0_3[lRec3] = 0.0;
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            this.fRec0_4[lRec4] = 0.0;
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            this.fRec0_5[lRec5] = 0.0;
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            this.fRec1[lRec6] = 0.0;
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            this.fRec1_1[lRec7] = 0.0;
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec1_2[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.fRec1_3[lRec9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec1_4[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.fRec1_5[lRec11] = 0.0;
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.fRec2[lRec12] = 0.0;
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.fRec2_1[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.fRec2_2[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec2_3[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec2_4[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.fRec2_5[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec3[lRec18] = 0.0;
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            this.fRec3_1[lRec19] = 0.0;
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec3_2[lRec20] = 0.0;
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            this.fRec3_3[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.fRec3_4[lRec22] = 0.0;
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            this.fRec3_5[lRec23] = 0.0;
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec4[lRec24] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            this.fRec4_1[lRec25] = 0.0;
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            this.fRec4_2[lRec26] = 0.0;
        }
        for (let lRec27: i32 = 0; lRec27 < <i32>(2); lRec27 = lRec27 + 1) {
            this.fRec4_3[lRec27] = 0.0;
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(2); lRec28 = lRec28 + 1) {
            this.fRec4_4[lRec28] = 0.0;
        }
        for (let lRec29: i32 = 0; lRec29 < <i32>(2); lRec29 = lRec29 + 1) {
            this.fRec4_5[lRec29] = 0.0;
        }
        for (let lRec30: i32 = 0; lRec30 < <i32>(2); lRec30 = lRec30 + 1) {
            this.fRec5[lRec30] = 0.0;
        }
        for (let lRec31: i32 = 0; lRec31 < <i32>(2); lRec31 = lRec31 + 1) {
            this.fRec5_1[lRec31] = 0.0;
        }
        for (let lRec32: i32 = 0; lRec32 < <i32>(2); lRec32 = lRec32 + 1) {
            this.fRec5_2[lRec32] = 0.0;
        }
        for (let lRec33: i32 = 0; lRec33 < <i32>(2); lRec33 = lRec33 + 1) {
            this.fRec5_3[lRec33] = 0.0;
        }
        for (let lRec34: i32 = 0; lRec34 < <i32>(2); lRec34 = lRec34 + 1) {
            this.fRec5_4[lRec34] = 0.0;
        }
        for (let lRec35: i32 = 0; lRec35 < <i32>(2); lRec35 = lRec35 + 1) {
            this.fRec5_5[lRec35] = 0.0;
        }
        for (let lRec36: i32 = 0; lRec36 < <i32>(2); lRec36 = lRec36 + 1) {
            this.fRec6[lRec36] = 0.0;
        }
        for (let lRec37: i32 = 0; lRec37 < <i32>(2); lRec37 = lRec37 + 1) {
            this.fRec6_1[lRec37] = 0.0;
        }
        for (let lRec38: i32 = 0; lRec38 < <i32>(2); lRec38 = lRec38 + 1) {
            this.fRec6_2[lRec38] = 0.0;
        }
        for (let lRec39: i32 = 0; lRec39 < <i32>(2); lRec39 = lRec39 + 1) {
            this.fRec6_3[lRec39] = 0.0;
        }
        for (let lRec40: i32 = 0; lRec40 < <i32>(2); lRec40 = lRec40 + 1) {
            this.fRec6_4[lRec40] = 0.0;
        }
        for (let lRec41: i32 = 0; lRec41 < <i32>(2); lRec41 = lRec41 + 1) {
            this.fRec6_5[lRec41] = 0.0;
        }
        for (let lRec42: i32 = 0; lRec42 < <i32>(2); lRec42 = lRec42 + 1) {
            this.fRec7[lRec42] = 0.0;
        }
        for (let lRec43: i32 = 0; lRec43 < <i32>(2); lRec43 = lRec43 + 1) {
            this.fRec7_1[lRec43] = 0.0;
        }
        for (let lRec44: i32 = 0; lRec44 < <i32>(2); lRec44 = lRec44 + 1) {
            this.fRec7_2[lRec44] = 0.0;
        }
        for (let lRec45: i32 = 0; lRec45 < <i32>(2); lRec45 = lRec45 + 1) {
            this.fRec7_3[lRec45] = 0.0;
        }
        for (let lRec46: i32 = 0; lRec46 < <i32>(2); lRec46 = lRec46 + 1) {
            this.fRec7_4[lRec46] = 0.0;
        }
        for (let lRec47: i32 = 0; lRec47 < <i32>(2); lRec47 = lRec47 + 1) {
            this.fRec7_5[lRec47] = 0.0;
        }
        for (let lRec48: i32 = 0; lRec48 < <i32>(2); lRec48 = lRec48 + 1) {
            this.fRec8[lRec48] = 0.0;
        }
        for (let lRec49: i32 = 0; lRec49 < <i32>(2); lRec49 = lRec49 + 1) {
            this.fRec8_1[lRec49] = 0.0;
        }
        for (let lRec50: i32 = 0; lRec50 < <i32>(2); lRec50 = lRec50 + 1) {
            this.fRec8_2[lRec50] = 0.0;
        }
        for (let lRec51: i32 = 0; lRec51 < <i32>(2); lRec51 = lRec51 + 1) {
            this.fRec8_3[lRec51] = 0.0;
        }
        for (let lRec52: i32 = 0; lRec52 < <i32>(2); lRec52 = lRec52 + 1) {
            this.fRec8_4[lRec52] = 0.0;
        }
        for (let lRec53: i32 = 0; lRec53 < <i32>(2); lRec53 = lRec53 + 1) {
            this.fRec8_5[lRec53] = 0.0;
        }
        for (let lRec54: i32 = 0; lRec54 < <i32>(2); lRec54 = lRec54 + 1) {
            this.fRec9[lRec54] = 0.0;
        }
        for (let lRec55: i32 = 0; lRec55 < <i32>(2); lRec55 = lRec55 + 1) {
            this.fRec9_1[lRec55] = 0.0;
        }
        for (let lRec56: i32 = 0; lRec56 < <i32>(2); lRec56 = lRec56 + 1) {
            this.fRec9_2[lRec56] = 0.0;
        }
        for (let lRec57: i32 = 0; lRec57 < <i32>(2); lRec57 = lRec57 + 1) {
            this.fRec9_3[lRec57] = 0.0;
        }
        for (let lRec58: i32 = 0; lRec58 < <i32>(2); lRec58 = lRec58 + 1) {
            this.fRec9_4[lRec58] = 0.0;
        }
        for (let lRec59: i32 = 0; lRec59 < <i32>(2); lRec59 = lRec59 + 1) {
            this.fRec9_5[lRec59] = 0.0;
        }
        for (let lRec60: i32 = 0; lRec60 < <i32>(2); lRec60 = lRec60 + 1) {
            this.fRec10[lRec60] = 0.0;
        }
        for (let lRec61: i32 = 0; lRec61 < <i32>(2); lRec61 = lRec61 + 1) {
            this.fRec10_1[lRec61] = 0.0;
        }
        for (let lRec62: i32 = 0; lRec62 < <i32>(2); lRec62 = lRec62 + 1) {
            this.fRec10_2[lRec62] = 0.0;
        }
        for (let lRec63: i32 = 0; lRec63 < <i32>(2); lRec63 = lRec63 + 1) {
            this.fRec10_3[lRec63] = 0.0;
        }
        for (let lRec64: i32 = 0; lRec64 < <i32>(2); lRec64 = lRec64 + 1) {
            this.fRec10_4[lRec64] = 0.0;
        }
        for (let lRec65: i32 = 0; lRec65 < <i32>(2); lRec65 = lRec65 + 1) {
            this.fRec10_5[lRec65] = 0.0;
        }
        for (let lRec66: i32 = 0; lRec66 < <i32>(2); lRec66 = lRec66 + 1) {
            this.fRec11[lRec66] = 0.0;
        }
        for (let lRec67: i32 = 0; lRec67 < <i32>(2); lRec67 = lRec67 + 1) {
            this.fRec11_1[lRec67] = 0.0;
        }
        for (let lRec68: i32 = 0; lRec68 < <i32>(2); lRec68 = lRec68 + 1) {
            this.fRec11_2[lRec68] = 0.0;
        }
        for (let lRec69: i32 = 0; lRec69 < <i32>(2); lRec69 = lRec69 + 1) {
            this.fRec11_3[lRec69] = 0.0;
        }
        for (let lRec70: i32 = 0; lRec70 < <i32>(2); lRec70 = lRec70 + 1) {
            this.fRec11_4[lRec70] = 0.0;
        }
        for (let lRec71: i32 = 0; lRec71 < <i32>(2); lRec71 = lRec71 + 1) {
            this.fRec11_5[lRec71] = 0.0;
        }
        for (let lRec72: i32 = 0; lRec72 < <i32>(2); lRec72 = lRec72 + 1) {
            this.fRec12[lRec72] = 0.0;
        }
        for (let lRec73: i32 = 0; lRec73 < <i32>(2); lRec73 = lRec73 + 1) {
            this.fRec12_1[lRec73] = 0.0;
        }
        for (let lRec74: i32 = 0; lRec74 < <i32>(2); lRec74 = lRec74 + 1) {
            this.fRec12_2[lRec74] = 0.0;
        }
        for (let lRec75: i32 = 0; lRec75 < <i32>(2); lRec75 = lRec75 + 1) {
            this.fRec12_3[lRec75] = 0.0;
        }
        for (let lRec76: i32 = 0; lRec76 < <i32>(2); lRec76 = lRec76 + 1) {
            this.fRec12_4[lRec76] = 0.0;
        }
        for (let lRec77: i32 = 0; lRec77 < <i32>(2); lRec77 = lRec77 + 1) {
            this.fRec12_5[lRec77] = 0.0;
        }
        for (let lRec78: i32 = 0; lRec78 < <i32>(2); lRec78 = lRec78 + 1) {
            this.fRec13[lRec78] = 0.0;
        }
        for (let lRec79: i32 = 0; lRec79 < <i32>(2); lRec79 = lRec79 + 1) {
            this.fRec13_1[lRec79] = 0.0;
        }
        for (let lRec80: i32 = 0; lRec80 < <i32>(2); lRec80 = lRec80 + 1) {
            this.fRec13_2[lRec80] = 0.0;
        }
        for (let lRec81: i32 = 0; lRec81 < <i32>(2); lRec81 = lRec81 + 1) {
            this.fRec13_3[lRec81] = 0.0;
        }
        for (let lRec82: i32 = 0; lRec82 < <i32>(2); lRec82 = lRec82 + 1) {
            this.fRec13_4[lRec82] = 0.0;
        }
        for (let lRec83: i32 = 0; lRec83 < <i32>(2); lRec83 = lRec83 + 1) {
            this.fRec13_5[lRec83] = 0.0;
        }
        for (let lRec84: i32 = 0; lRec84 < <i32>(2); lRec84 = lRec84 + 1) {
            this.fRec14[lRec84] = 0.0;
        }
        for (let lRec85: i32 = 0; lRec85 < <i32>(2); lRec85 = lRec85 + 1) {
            this.fRec14_1[lRec85] = 0.0;
        }
        for (let lRec86: i32 = 0; lRec86 < <i32>(2); lRec86 = lRec86 + 1) {
            this.fRec14_2[lRec86] = 0.0;
        }
        for (let lRec87: i32 = 0; lRec87 < <i32>(2); lRec87 = lRec87 + 1) {
            this.fRec14_3[lRec87] = 0.0;
        }
        for (let lRec88: i32 = 0; lRec88 < <i32>(2); lRec88 = lRec88 + 1) {
            this.fRec14_4[lRec88] = 0.0;
        }
        for (let lRec89: i32 = 0; lRec89 < <i32>(2); lRec89 = lRec89 + 1) {
            this.fRec14_5[lRec89] = 0.0;
        }
        for (let lRec90: i32 = 0; lRec90 < <i32>(2); lRec90 = lRec90 + 1) {
            this.fRec15[lRec90] = 0.0;
        }
        for (let lRec91: i32 = 0; lRec91 < <i32>(2); lRec91 = lRec91 + 1) {
            this.fRec15_1[lRec91] = 0.0;
        }
        for (let lRec92: i32 = 0; lRec92 < <i32>(2); lRec92 = lRec92 + 1) {
            this.fRec15_2[lRec92] = 0.0;
        }
        for (let lRec93: i32 = 0; lRec93 < <i32>(2); lRec93 = lRec93 + 1) {
            this.fRec15_3[lRec93] = 0.0;
        }
        for (let lRec94: i32 = 0; lRec94 < <i32>(2); lRec94 = lRec94 + 1) {
            this.fRec15_4[lRec94] = 0.0;
        }
        for (let lRec95: i32 = 0; lRec95 < <i32>(2); lRec95 = lRec95 + 1) {
            this.fRec15_5[lRec95] = 0.0;
        }
        for (let lRec96: i32 = 0; lRec96 < <i32>(2); lRec96 = lRec96 + 1) {
            this.fRec16[lRec96] = 0.0;
        }
        for (let lRec97: i32 = 0; lRec97 < <i32>(2); lRec97 = lRec97 + 1) {
            this.fRec16_1[lRec97] = 0.0;
        }
        for (let lRec98: i32 = 0; lRec98 < <i32>(2); lRec98 = lRec98 + 1) {
            this.fRec16_2[lRec98] = 0.0;
        }
        for (let lRec99: i32 = 0; lRec99 < <i32>(2); lRec99 = lRec99 + 1) {
            this.fRec16_3[lRec99] = 0.0;
        }
        for (let lRec100: i32 = 0; lRec100 < <i32>(2); lRec100 = lRec100 + 1) {
            this.fRec16_4[lRec100] = 0.0;
        }
        for (let lRec101: i32 = 0; lRec101 < <i32>(2); lRec101 = lRec101 + 1) {
            this.fRec16_5[lRec101] = 0.0;
        }
        for (let lRec102: i32 = 0; lRec102 < <i32>(2); lRec102 = lRec102 + 1) {
            this.fRec17[lRec102] = 0.0;
        }
        for (let lRec103: i32 = 0; lRec103 < <i32>(2); lRec103 = lRec103 + 1) {
            this.fRec17_1[lRec103] = 0.0;
        }
        for (let lRec104: i32 = 0; lRec104 < <i32>(2); lRec104 = lRec104 + 1) {
            this.fRec17_2[lRec104] = 0.0;
        }
        for (let lRec105: i32 = 0; lRec105 < <i32>(2); lRec105 = lRec105 + 1) {
            this.fRec17_3[lRec105] = 0.0;
        }
        for (let lRec106: i32 = 0; lRec106 < <i32>(2); lRec106 = lRec106 + 1) {
            this.fRec17_4[lRec106] = 0.0;
        }
        for (let lRec107: i32 = 0; lRec107 < <i32>(2); lRec107 = lRec107 + 1) {
            this.fRec17_5[lRec107] = 0.0;
        }
        for (let lRec108: i32 = 0; lRec108 < <i32>(2); lRec108 = lRec108 + 1) {
            this.fRec18[lRec108] = 0.0;
        }
        for (let lRec109: i32 = 0; lRec109 < <i32>(2); lRec109 = lRec109 + 1) {
            this.fRec18_1[lRec109] = 0.0;
        }
        for (let lRec110: i32 = 0; lRec110 < <i32>(2); lRec110 = lRec110 + 1) {
            this.fRec18_2[lRec110] = 0.0;
        }
        for (let lRec111: i32 = 0; lRec111 < <i32>(2); lRec111 = lRec111 + 1) {
            this.fRec18_3[lRec111] = 0.0;
        }
        for (let lRec112: i32 = 0; lRec112 < <i32>(2); lRec112 = lRec112 + 1) {
            this.fRec18_4[lRec112] = 0.0;
        }
        for (let lRec113: i32 = 0; lRec113 < <i32>(2); lRec113 = lRec113 + 1) {
            this.fRec18_5[lRec113] = 0.0;
        }
        for (let lRec114: i32 = 0; lRec114 < <i32>(2); lRec114 = lRec114 + 1) {
            this.fRec19[lRec114] = 0.0;
        }
        for (let lRec115: i32 = 0; lRec115 < <i32>(2); lRec115 = lRec115 + 1) {
            this.fRec19_1[lRec115] = 0.0;
        }
        for (let lRec116: i32 = 0; lRec116 < <i32>(2); lRec116 = lRec116 + 1) {
            this.fRec19_2[lRec116] = 0.0;
        }
        for (let lRec117: i32 = 0; lRec117 < <i32>(2); lRec117 = lRec117 + 1) {
            this.fRec19_3[lRec117] = 0.0;
        }
        for (let lRec118: i32 = 0; lRec118 < <i32>(2); lRec118 = lRec118 + 1) {
            this.fRec19_4[lRec118] = 0.0;
        }
        for (let lRec119: i32 = 0; lRec119 < <i32>(2); lRec119 = lRec119 + 1) {
            this.fRec19_5[lRec119] = 0.0;
        }
        for (let lRec120: i32 = 0; lRec120 < <i32>(2); lRec120 = lRec120 + 1) {
            this.fRec20[lRec120] = 0.0;
        }
        for (let lRec121: i32 = 0; lRec121 < <i32>(2); lRec121 = lRec121 + 1) {
            this.fRec20_1[lRec121] = 0.0;
        }
        for (let lRec122: i32 = 0; lRec122 < <i32>(2); lRec122 = lRec122 + 1) {
            this.fRec20_2[lRec122] = 0.0;
        }
        for (let lRec123: i32 = 0; lRec123 < <i32>(2); lRec123 = lRec123 + 1) {
            this.fRec20_3[lRec123] = 0.0;
        }
        for (let lRec124: i32 = 0; lRec124 < <i32>(2); lRec124 = lRec124 + 1) {
            this.fRec20_4[lRec124] = 0.0;
        }
        for (let lRec125: i32 = 0; lRec125 < <i32>(2); lRec125 = lRec125 + 1) {
            this.fRec20_5[lRec125] = 0.0;
        }
        for (let lRec126: i32 = 0; lRec126 < <i32>(2); lRec126 = lRec126 + 1) {
            this.fRec21[lRec126] = 0.0;
        }
        for (let lRec127: i32 = 0; lRec127 < <i32>(2); lRec127 = lRec127 + 1) {
            this.fRec21_1[lRec127] = 0.0;
        }
        for (let lRec128: i32 = 0; lRec128 < <i32>(2); lRec128 = lRec128 + 1) {
            this.fRec21_2[lRec128] = 0.0;
        }
        for (let lRec129: i32 = 0; lRec129 < <i32>(2); lRec129 = lRec129 + 1) {
            this.fRec21_3[lRec129] = 0.0;
        }
        for (let lRec130: i32 = 0; lRec130 < <i32>(2); lRec130 = lRec130 + 1) {
            this.fRec21_4[lRec130] = 0.0;
        }
        for (let lRec131: i32 = 0; lRec131 < <i32>(2); lRec131 = lRec131 + 1) {
            this.fRec21_5[lRec131] = 0.0;
        }
        for (let lRec132: i32 = 0; lRec132 < <i32>(2); lRec132 = lRec132 + 1) {
            this.fRec22[lRec132] = 0.0;
        }
        for (let lRec133: i32 = 0; lRec133 < <i32>(2); lRec133 = lRec133 + 1) {
            this.fRec22_1[lRec133] = 0.0;
        }
        for (let lRec134: i32 = 0; lRec134 < <i32>(2); lRec134 = lRec134 + 1) {
            this.fRec22_2[lRec134] = 0.0;
        }
        for (let lRec135: i32 = 0; lRec135 < <i32>(2); lRec135 = lRec135 + 1) {
            this.fRec22_3[lRec135] = 0.0;
        }
        for (let lRec136: i32 = 0; lRec136 < <i32>(2); lRec136 = lRec136 + 1) {
            this.fRec22_4[lRec136] = 0.0;
        }
        for (let lRec137: i32 = 0; lRec137 < <i32>(2); lRec137 = lRec137 + 1) {
            this.fRec22_5[lRec137] = 0.0;
        }
        for (let lRec138: i32 = 0; lRec138 < <i32>(2); lRec138 = lRec138 + 1) {
            this.fRec23[lRec138] = 0.0;
        }
        for (let lRec139: i32 = 0; lRec139 < <i32>(2); lRec139 = lRec139 + 1) {
            this.fRec23_1[lRec139] = 0.0;
        }
        for (let lRec140: i32 = 0; lRec140 < <i32>(2); lRec140 = lRec140 + 1) {
            this.fRec23_2[lRec140] = 0.0;
        }
        for (let lRec141: i32 = 0; lRec141 < <i32>(2); lRec141 = lRec141 + 1) {
            this.fRec23_3[lRec141] = 0.0;
        }
        for (let lRec142: i32 = 0; lRec142 < <i32>(2); lRec142 = lRec142 + 1) {
            this.fRec23_4[lRec142] = 0.0;
        }
        for (let lRec143: i32 = 0; lRec143 < <i32>(2); lRec143 = lRec143 + 1) {
            this.fRec23_5[lRec143] = 0.0;
        }
        for (let lRec144: i32 = 0; lRec144 < <i32>(2); lRec144 = lRec144 + 1) {
            this.fRec24[lRec144] = 0.0;
        }
        for (let lRec145: i32 = 0; lRec145 < <i32>(2); lRec145 = lRec145 + 1) {
            this.fRec24_1[lRec145] = 0.0;
        }
        for (let lRec146: i32 = 0; lRec146 < <i32>(2); lRec146 = lRec146 + 1) {
            this.fRec24_2[lRec146] = 0.0;
        }
        for (let lRec147: i32 = 0; lRec147 < <i32>(2); lRec147 = lRec147 + 1) {
            this.fRec24_3[lRec147] = 0.0;
        }
        for (let lRec148: i32 = 0; lRec148 < <i32>(2); lRec148 = lRec148 + 1) {
            this.fRec24_4[lRec148] = 0.0;
        }
        for (let lRec149: i32 = 0; lRec149 < <i32>(2); lRec149 = lRec149 + 1) {
            this.fRec24_5[lRec149] = 0.0;
        }
        for (let lRec150: i32 = 0; lRec150 < <i32>(2); lRec150 = lRec150 + 1) {
            this.fRec25[lRec150] = 0.0;
        }
        for (let lRec151: i32 = 0; lRec151 < <i32>(2); lRec151 = lRec151 + 1) {
            this.fRec25_1[lRec151] = 0.0;
        }
        for (let lRec152: i32 = 0; lRec152 < <i32>(2); lRec152 = lRec152 + 1) {
            this.fRec25_2[lRec152] = 0.0;
        }
        for (let lRec153: i32 = 0; lRec153 < <i32>(2); lRec153 = lRec153 + 1) {
            this.fRec25_3[lRec153] = 0.0;
        }
        for (let lRec154: i32 = 0; lRec154 < <i32>(2); lRec154 = lRec154 + 1) {
            this.fRec25_4[lRec154] = 0.0;
        }
        for (let lRec155: i32 = 0; lRec155 < <i32>(2); lRec155 = lRec155 + 1) {
            this.fRec25_5[lRec155] = 0.0;
        }
        for (let lRec156: i32 = 0; lRec156 < <i32>(2); lRec156 = lRec156 + 1) {
            this.fRec26[lRec156] = 0.0;
        }
        for (let lRec157: i32 = 0; lRec157 < <i32>(2); lRec157 = lRec157 + 1) {
            this.fRec26_1[lRec157] = 0.0;
        }
        for (let lRec158: i32 = 0; lRec158 < <i32>(2); lRec158 = lRec158 + 1) {
            this.fRec26_2[lRec158] = 0.0;
        }
        for (let lRec159: i32 = 0; lRec159 < <i32>(2); lRec159 = lRec159 + 1) {
            this.fRec26_3[lRec159] = 0.0;
        }
        for (let lRec160: i32 = 0; lRec160 < <i32>(2); lRec160 = lRec160 + 1) {
            this.fRec26_4[lRec160] = 0.0;
        }
        for (let lRec161: i32 = 0; lRec161 < <i32>(2); lRec161 = lRec161 + 1) {
            this.fRec26_5[lRec161] = 0.0;
        }
        for (let lRec162: i32 = 0; lRec162 < <i32>(2); lRec162 = lRec162 + 1) {
            this.fRec27[lRec162] = 0.0;
        }
        for (let lRec163: i32 = 0; lRec163 < <i32>(2); lRec163 = lRec163 + 1) {
            this.fRec27_1[lRec163] = 0.0;
        }
        for (let lRec164: i32 = 0; lRec164 < <i32>(2); lRec164 = lRec164 + 1) {
            this.fRec27_2[lRec164] = 0.0;
        }
        for (let lRec165: i32 = 0; lRec165 < <i32>(2); lRec165 = lRec165 + 1) {
            this.fRec27_3[lRec165] = 0.0;
        }
        for (let lRec166: i32 = 0; lRec166 < <i32>(2); lRec166 = lRec166 + 1) {
            this.fRec27_4[lRec166] = 0.0;
        }
        for (let lRec167: i32 = 0; lRec167 < <i32>(2); lRec167 = lRec167 + 1) {
            this.fRec27_5[lRec167] = 0.0;
        }
        for (let lRec168: i32 = 0; lRec168 < <i32>(2); lRec168 = lRec168 + 1) {
            this.fRec28[lRec168] = 0.0;
        }
        for (let lRec169: i32 = 0; lRec169 < <i32>(2); lRec169 = lRec169 + 1) {
            this.fRec28_1[lRec169] = 0.0;
        }
        for (let lRec170: i32 = 0; lRec170 < <i32>(2); lRec170 = lRec170 + 1) {
            this.fRec28_2[lRec170] = 0.0;
        }
        for (let lRec171: i32 = 0; lRec171 < <i32>(2); lRec171 = lRec171 + 1) {
            this.fRec28_3[lRec171] = 0.0;
        }
        for (let lRec172: i32 = 0; lRec172 < <i32>(2); lRec172 = lRec172 + 1) {
            this.fRec28_4[lRec172] = 0.0;
        }
        for (let lRec173: i32 = 0; lRec173 < <i32>(2); lRec173 = lRec173 + 1) {
            this.fRec28_5[lRec173] = 0.0;
        }
        for (let lRec174: i32 = 0; lRec174 < <i32>(2); lRec174 = lRec174 + 1) {
            this.fRec29[lRec174] = 0.0;
        }
        for (let lRec175: i32 = 0; lRec175 < <i32>(2); lRec175 = lRec175 + 1) {
            this.fRec29_1[lRec175] = 0.0;
        }
        for (let lRec176: i32 = 0; lRec176 < <i32>(2); lRec176 = lRec176 + 1) {
            this.fRec29_2[lRec176] = 0.0;
        }
        for (let lRec177: i32 = 0; lRec177 < <i32>(2); lRec177 = lRec177 + 1) {
            this.fRec29_3[lRec177] = 0.0;
        }
        for (let lRec178: i32 = 0; lRec178 < <i32>(2); lRec178 = lRec178 + 1) {
            this.fRec29_4[lRec178] = 0.0;
        }
        for (let lRec179: i32 = 0; lRec179 < <i32>(2); lRec179 = lRec179 + 1) {
            this.fRec29_5[lRec179] = 0.0;
        }
        for (let lRec180: i32 = 0; lRec180 < <i32>(2); lRec180 = lRec180 + 1) {
            this.fRec30[lRec180] = 0.0;
        }
        for (let lRec181: i32 = 0; lRec181 < <i32>(2); lRec181 = lRec181 + 1) {
            this.fRec30_1[lRec181] = 0.0;
        }
        for (let lRec182: i32 = 0; lRec182 < <i32>(2); lRec182 = lRec182 + 1) {
            this.fRec30_2[lRec182] = 0.0;
        }
        for (let lRec183: i32 = 0; lRec183 < <i32>(2); lRec183 = lRec183 + 1) {
            this.fRec30_3[lRec183] = 0.0;
        }
        for (let lRec184: i32 = 0; lRec184 < <i32>(2); lRec184 = lRec184 + 1) {
            this.fRec30_4[lRec184] = 0.0;
        }
        for (let lRec185: i32 = 0; lRec185 < <i32>(2); lRec185 = lRec185 + 1) {
            this.fRec30_5[lRec185] = 0.0;
        }
        for (let lRec186: i32 = 0; lRec186 < <i32>(2); lRec186 = lRec186 + 1) {
            this.fRec31[lRec186] = 0.0;
        }
        for (let lRec187: i32 = 0; lRec187 < <i32>(2); lRec187 = lRec187 + 1) {
            this.fRec31_1[lRec187] = 0.0;
        }
        for (let lRec188: i32 = 0; lRec188 < <i32>(2); lRec188 = lRec188 + 1) {
            this.fRec31_2[lRec188] = 0.0;
        }
        for (let lRec189: i32 = 0; lRec189 < <i32>(2); lRec189 = lRec189 + 1) {
            this.fRec31_3[lRec189] = 0.0;
        }
        for (let lRec190: i32 = 0; lRec190 < <i32>(2); lRec190 = lRec190 + 1) {
            this.fRec31_4[lRec190] = 0.0;
        }
        for (let lRec191: i32 = 0; lRec191 < <i32>(2); lRec191 = lRec191 + 1) {
            this.fRec31_5[lRec191] = 0.0;
        }
        for (let lRec192: i32 = 0; lRec192 < <i32>(2); lRec192 = lRec192 + 1) {
            this.fRec32[lRec192] = 0.0;
        }
        for (let lRec193: i32 = 0; lRec193 < <i32>(2); lRec193 = lRec193 + 1) {
            this.fRec32_1[lRec193] = 0.0;
        }
        for (let lRec194: i32 = 0; lRec194 < <i32>(2); lRec194 = lRec194 + 1) {
            this.fRec32_2[lRec194] = 0.0;
        }
        for (let lRec195: i32 = 0; lRec195 < <i32>(2); lRec195 = lRec195 + 1) {
            this.fRec32_3[lRec195] = 0.0;
        }
        for (let lRec196: i32 = 0; lRec196 < <i32>(2); lRec196 = lRec196 + 1) {
            this.fRec32_4[lRec196] = 0.0;
        }
        for (let lRec197: i32 = 0; lRec197 < <i32>(2); lRec197 = lRec197 + 1) {
            this.fRec32_5[lRec197] = 0.0;
        }
        for (let lRec198: i32 = 0; lRec198 < <i32>(2); lRec198 = lRec198 + 1) {
            this.fRec33[lRec198] = 0.0;
        }
        for (let lRec199: i32 = 0; lRec199 < <i32>(2); lRec199 = lRec199 + 1) {
            this.fRec33_1[lRec199] = 0.0;
        }
        for (let lRec200: i32 = 0; lRec200 < <i32>(2); lRec200 = lRec200 + 1) {
            this.fRec33_2[lRec200] = 0.0;
        }
        for (let lRec201: i32 = 0; lRec201 < <i32>(2); lRec201 = lRec201 + 1) {
            this.fRec33_3[lRec201] = 0.0;
        }
        for (let lRec202: i32 = 0; lRec202 < <i32>(2); lRec202 = lRec202 + 1) {
            this.fRec33_4[lRec202] = 0.0;
        }
        for (let lRec203: i32 = 0; lRec203 < <i32>(2); lRec203 = lRec203 + 1) {
            this.fRec33_5[lRec203] = 0.0;
        }
        for (let lRec204: i32 = 0; lRec204 < <i32>(2); lRec204 = lRec204 + 1) {
            this.fRec34[lRec204] = 0.0;
        }
        for (let lRec205: i32 = 0; lRec205 < <i32>(2); lRec205 = lRec205 + 1) {
            this.fRec34_1[lRec205] = 0.0;
        }
        for (let lRec206: i32 = 0; lRec206 < <i32>(2); lRec206 = lRec206 + 1) {
            this.fRec34_2[lRec206] = 0.0;
        }
        for (let lRec207: i32 = 0; lRec207 < <i32>(2); lRec207 = lRec207 + 1) {
            this.fRec34_3[lRec207] = 0.0;
        }
        for (let lRec208: i32 = 0; lRec208 < <i32>(2); lRec208 = lRec208 + 1) {
            this.fRec34_4[lRec208] = 0.0;
        }
        for (let lRec209: i32 = 0; lRec209 < <i32>(2); lRec209 = lRec209 + 1) {
            this.fRec34_5[lRec209] = 0.0;
        }
        for (let lRec210: i32 = 0; lRec210 < <i32>(2); lRec210 = lRec210 + 1) {
            this.fRec35[lRec210] = 0.0;
        }
        for (let lRec211: i32 = 0; lRec211 < <i32>(2); lRec211 = lRec211 + 1) {
            this.fRec35_1[lRec211] = 0.0;
        }
        for (let lRec212: i32 = 0; lRec212 < <i32>(2); lRec212 = lRec212 + 1) {
            this.fRec35_2[lRec212] = 0.0;
        }
        for (let lRec213: i32 = 0; lRec213 < <i32>(2); lRec213 = lRec213 + 1) {
            this.fRec35_3[lRec213] = 0.0;
        }
        for (let lRec214: i32 = 0; lRec214 < <i32>(2); lRec214 = lRec214 + 1) {
            this.fRec35_4[lRec214] = 0.0;
        }
        for (let lRec215: i32 = 0; lRec215 < <i32>(2); lRec215 = lRec215 + 1) {
            this.fRec35_5[lRec215] = 0.0;
        }
        for (let lRec216: i32 = 0; lRec216 < <i32>(2); lRec216 = lRec216 + 1) {
            this.fRec36[lRec216] = 0.0;
        }
        for (let lRec217: i32 = 0; lRec217 < <i32>(2); lRec217 = lRec217 + 1) {
            this.fRec36_1[lRec217] = 0.0;
        }
        for (let lRec218: i32 = 0; lRec218 < <i32>(2); lRec218 = lRec218 + 1) {
            this.fRec36_2[lRec218] = 0.0;
        }
        for (let lRec219: i32 = 0; lRec219 < <i32>(2); lRec219 = lRec219 + 1) {
            this.fRec36_3[lRec219] = 0.0;
        }
        for (let lRec220: i32 = 0; lRec220 < <i32>(2); lRec220 = lRec220 + 1) {
            this.fRec36_4[lRec220] = 0.0;
        }
        for (let lRec221: i32 = 0; lRec221 < <i32>(2); lRec221 = lRec221 + 1) {
            this.fRec36_5[lRec221] = 0.0;
        }
        for (let lRec222: i32 = 0; lRec222 < <i32>(2); lRec222 = lRec222 + 1) {
            this.fRec37[lRec222] = 0.0;
        }
        for (let lRec223: i32 = 0; lRec223 < <i32>(2); lRec223 = lRec223 + 1) {
            this.fRec37_1[lRec223] = 0.0;
        }
        for (let lRec224: i32 = 0; lRec224 < <i32>(2); lRec224 = lRec224 + 1) {
            this.fRec37_2[lRec224] = 0.0;
        }
        for (let lRec225: i32 = 0; lRec225 < <i32>(2); lRec225 = lRec225 + 1) {
            this.fRec37_3[lRec225] = 0.0;
        }
        for (let lRec226: i32 = 0; lRec226 < <i32>(2); lRec226 = lRec226 + 1) {
            this.fRec37_4[lRec226] = 0.0;
        }
        for (let lRec227: i32 = 0; lRec227 < <i32>(2); lRec227 = lRec227 + 1) {
            this.fRec37_5[lRec227] = 0.0;
        }
        for (let lRec228: i32 = 0; lRec228 < <i32>(2); lRec228 = lRec228 + 1) {
            this.fRec38[lRec228] = 0.0;
        }
        for (let lRec229: i32 = 0; lRec229 < <i32>(2); lRec229 = lRec229 + 1) {
            this.fRec38_1[lRec229] = 0.0;
        }
        for (let lRec230: i32 = 0; lRec230 < <i32>(2); lRec230 = lRec230 + 1) {
            this.fRec38_2[lRec230] = 0.0;
        }
        for (let lRec231: i32 = 0; lRec231 < <i32>(2); lRec231 = lRec231 + 1) {
            this.fRec38_3[lRec231] = 0.0;
        }
        for (let lRec232: i32 = 0; lRec232 < <i32>(2); lRec232 = lRec232 + 1) {
            this.fRec38_4[lRec232] = 0.0;
        }
        for (let lRec233: i32 = 0; lRec233 < <i32>(2); lRec233 = lRec233 + 1) {
            this.fRec38_5[lRec233] = 0.0;
        }
        for (let lRec234: i32 = 0; lRec234 < <i32>(2); lRec234 = lRec234 + 1) {
            this.fRec39[lRec234] = 0.0;
        }
        for (let lRec235: i32 = 0; lRec235 < <i32>(2); lRec235 = lRec235 + 1) {
            this.fRec39_1[lRec235] = 0.0;
        }
        for (let lRec236: i32 = 0; lRec236 < <i32>(2); lRec236 = lRec236 + 1) {
            this.fRec39_2[lRec236] = 0.0;
        }
        for (let lRec237: i32 = 0; lRec237 < <i32>(2); lRec237 = lRec237 + 1) {
            this.fRec39_3[lRec237] = 0.0;
        }
        for (let lRec238: i32 = 0; lRec238 < <i32>(2); lRec238 = lRec238 + 1) {
            this.fRec39_4[lRec238] = 0.0;
        }
        for (let lRec239: i32 = 0; lRec239 < <i32>(2); lRec239 = lRec239 + 1) {
            this.fRec39_5[lRec239] = 0.0;
        }
        for (let lRec240: i32 = 0; lRec240 < <i32>(2); lRec240 = lRec240 + 1) {
            this.fRec40[lRec240] = 0.0;
        }
        for (let lRec241: i32 = 0; lRec241 < <i32>(2); lRec241 = lRec241 + 1) {
            this.fRec40_1[lRec241] = 0.0;
        }
        for (let lRec242: i32 = 0; lRec242 < <i32>(2); lRec242 = lRec242 + 1) {
            this.fRec40_2[lRec242] = 0.0;
        }
        for (let lRec243: i32 = 0; lRec243 < <i32>(2); lRec243 = lRec243 + 1) {
            this.fRec40_3[lRec243] = 0.0;
        }
        for (let lRec244: i32 = 0; lRec244 < <i32>(2); lRec244 = lRec244 + 1) {
            this.fRec40_4[lRec244] = 0.0;
        }
        for (let lRec245: i32 = 0; lRec245 < <i32>(2); lRec245 = lRec245 + 1) {
            this.fRec40_5[lRec245] = 0.0;
        }
        for (let lRec246: i32 = 0; lRec246 < <i32>(2); lRec246 = lRec246 + 1) {
            this.fRec41[lRec246] = 0.0;
        }
        for (let lRec247: i32 = 0; lRec247 < <i32>(2); lRec247 = lRec247 + 1) {
            this.fRec41_1[lRec247] = 0.0;
        }
        for (let lRec248: i32 = 0; lRec248 < <i32>(2); lRec248 = lRec248 + 1) {
            this.fRec41_2[lRec248] = 0.0;
        }
        for (let lRec249: i32 = 0; lRec249 < <i32>(2); lRec249 = lRec249 + 1) {
            this.fRec41_3[lRec249] = 0.0;
        }
        for (let lRec250: i32 = 0; lRec250 < <i32>(2); lRec250 = lRec250 + 1) {
            this.fRec41_4[lRec250] = 0.0;
        }
        for (let lRec251: i32 = 0; lRec251 < <i32>(2); lRec251 = lRec251 + 1) {
            this.fRec41_5[lRec251] = 0.0;
        }
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MpianoEffectDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fTemp0: f32 = <f32>(inputs[<i32>(0)]);
        let fTemp1: f32 = <f32>(inputs[<i32>(1)]);
        let fTemp2: f32 = this.fRec41[<i32>(1)];
        let fTemp3: f32 = ((0.6000000238418579 * fTemp2) + (0.4000000059604645 * this.fRec41_1[<i32>(1)]));
        let fTemp4: f32 = (fTemp0 + fTemp2);
        let fTemp5: f32 = this.fRec41_2[<i32>(1)];
        let fTemp6: f32 = ((0.6000000238418579 * fTemp5) + (0.4000000059604645 * this.fRec41_3[<i32>(1)]));
        let fRecBody252: f32 = (((0.9990000128746033 * fTemp0) + (0.0010000000474974513 * fTemp1)) + (0.20999999344348907 * fTemp3));
        let fRecBody253: f32 = fTemp3;
        let fRecBody254: f32 = (((0.9990000128746033 * fTemp1) + (0.0007900000200606883 * fTemp4)) + (0.20999999344348907 * fTemp6));
        let fRecBody255: f32 = fTemp6;
        let fRecBody256: f32 = (0.7900000214576721 * fTemp4);
        let fRecBody257: f32 = (0.7900000214576721 * (fTemp1 + fTemp5));
        this.fRec41[<i32>(0)] = fRecBody252;
        this.fRec41_1[<i32>(0)] = fRecBody253;
        this.fRec41_2[<i32>(0)] = fRecBody254;
        this.fRec41_3[<i32>(0)] = fRecBody255;
        this.fRec41_4[<i32>(0)] = fRecBody256;
        this.fRec41_5[<i32>(0)] = fRecBody257;
        let fTemp7: f32 = this.fRec40[<i32>(1)];
        let fTemp8: f32 = ((0.6000000238418579 * fTemp7) + (0.4000000059604645 * this.fRec40_1[<i32>(1)]));
        let fTemp9: f32 = (this.fRec41_4[<i32>(0)] + fTemp7);
        let fTemp10: f32 = this.fRec40_2[<i32>(1)];
        let fTemp11: f32 = ((0.6000000238418579 * fTemp10) + (0.4000000059604645 * this.fRec40_3[<i32>(1)]));
        let fRecBody258: f32 = (((0.9990000128746033 * this.fRec41_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec41_5[<i32>(0)])) + (0.20999999344348907 * fTemp8));
        let fRecBody259: f32 = fTemp8;
        let fRecBody260: f32 = (((0.9990000128746033 * this.fRec41_5[<i32>(0)]) + (0.0007900000200606883 * fTemp9)) + (0.20999999344348907 * fTemp11));
        let fRecBody261: f32 = fTemp11;
        let fRecBody262: f32 = (0.7900000214576721 * fTemp9);
        let fRecBody263: f32 = (0.7900000214576721 * (this.fRec41_5[<i32>(0)] + fTemp10));
        this.fRec40[<i32>(0)] = fRecBody258;
        this.fRec40_1[<i32>(0)] = fRecBody259;
        this.fRec40_2[<i32>(0)] = fRecBody260;
        this.fRec40_3[<i32>(0)] = fRecBody261;
        this.fRec40_4[<i32>(0)] = fRecBody262;
        this.fRec40_5[<i32>(0)] = fRecBody263;
        let fTemp12: f32 = this.fRec39[<i32>(1)];
        let fTemp13: f32 = ((0.6000000238418579 * fTemp12) + (0.4000000059604645 * this.fRec39_1[<i32>(1)]));
        let fTemp14: f32 = (this.fRec40_4[<i32>(0)] + fTemp12);
        let fTemp15: f32 = this.fRec39_2[<i32>(1)];
        let fTemp16: f32 = ((0.6000000238418579 * fTemp15) + (0.4000000059604645 * this.fRec39_3[<i32>(1)]));
        let fRecBody264: f32 = (((0.9990000128746033 * this.fRec40_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec40_5[<i32>(0)])) + (0.20999999344348907 * fTemp13));
        let fRecBody265: f32 = fTemp13;
        let fRecBody266: f32 = (((0.9990000128746033 * this.fRec40_5[<i32>(0)]) + (0.0007900000200606883 * fTemp14)) + (0.20999999344348907 * fTemp16));
        let fRecBody267: f32 = fTemp16;
        let fRecBody268: f32 = (0.7900000214576721 * fTemp14);
        let fRecBody269: f32 = (0.7900000214576721 * (this.fRec40_5[<i32>(0)] + fTemp15));
        this.fRec39[<i32>(0)] = fRecBody264;
        this.fRec39_1[<i32>(0)] = fRecBody265;
        this.fRec39_2[<i32>(0)] = fRecBody266;
        this.fRec39_3[<i32>(0)] = fRecBody267;
        this.fRec39_4[<i32>(0)] = fRecBody268;
        this.fRec39_5[<i32>(0)] = fRecBody269;
        let fTemp17: f32 = this.fRec38[<i32>(1)];
        let fTemp18: f32 = ((0.6000000238418579 * fTemp17) + (0.4000000059604645 * this.fRec38_1[<i32>(1)]));
        let fTemp19: f32 = (this.fRec39_4[<i32>(0)] + fTemp17);
        let fTemp20: f32 = this.fRec38_2[<i32>(1)];
        let fTemp21: f32 = ((0.6000000238418579 * fTemp20) + (0.4000000059604645 * this.fRec38_3[<i32>(1)]));
        let fRecBody270: f32 = (((0.9990000128746033 * this.fRec39_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec39_5[<i32>(0)])) + (0.20999999344348907 * fTemp18));
        let fRecBody271: f32 = fTemp18;
        let fRecBody272: f32 = (((0.9990000128746033 * this.fRec39_5[<i32>(0)]) + (0.0007900000200606883 * fTemp19)) + (0.20999999344348907 * fTemp21));
        let fRecBody273: f32 = fTemp21;
        let fRecBody274: f32 = (0.7900000214576721 * fTemp19);
        let fRecBody275: f32 = (0.7900000214576721 * (this.fRec39_5[<i32>(0)] + fTemp20));
        this.fRec38[<i32>(0)] = fRecBody270;
        this.fRec38_1[<i32>(0)] = fRecBody271;
        this.fRec38_2[<i32>(0)] = fRecBody272;
        this.fRec38_3[<i32>(0)] = fRecBody273;
        this.fRec38_4[<i32>(0)] = fRecBody274;
        this.fRec38_5[<i32>(0)] = fRecBody275;
        let fTemp22: f32 = this.fRec37[<i32>(1)];
        let fTemp23: f32 = ((0.6000000238418579 * fTemp22) + (0.4000000059604645 * this.fRec37_1[<i32>(1)]));
        let fTemp24: f32 = (this.fRec38_4[<i32>(0)] + fTemp22);
        let fTemp25: f32 = this.fRec37_2[<i32>(1)];
        let fTemp26: f32 = ((0.6000000238418579 * fTemp25) + (0.4000000059604645 * this.fRec37_3[<i32>(1)]));
        let fRecBody276: f32 = (((0.9990000128746033 * this.fRec38_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec38_5[<i32>(0)])) + (0.20999999344348907 * fTemp23));
        let fRecBody277: f32 = fTemp23;
        let fRecBody278: f32 = (((0.9990000128746033 * this.fRec38_5[<i32>(0)]) + (0.0007900000200606883 * fTemp24)) + (0.20999999344348907 * fTemp26));
        let fRecBody279: f32 = fTemp26;
        let fRecBody280: f32 = (0.7900000214576721 * fTemp24);
        let fRecBody281: f32 = (0.7900000214576721 * (this.fRec38_5[<i32>(0)] + fTemp25));
        this.fRec37[<i32>(0)] = fRecBody276;
        this.fRec37_1[<i32>(0)] = fRecBody277;
        this.fRec37_2[<i32>(0)] = fRecBody278;
        this.fRec37_3[<i32>(0)] = fRecBody279;
        this.fRec37_4[<i32>(0)] = fRecBody280;
        this.fRec37_5[<i32>(0)] = fRecBody281;
        let fTemp27: f32 = this.fRec36[<i32>(1)];
        let fTemp28: f32 = ((0.6000000238418579 * fTemp27) + (0.4000000059604645 * this.fRec36_1[<i32>(1)]));
        let fTemp29: f32 = (this.fRec37_4[<i32>(0)] + fTemp27);
        let fTemp30: f32 = this.fRec36_2[<i32>(1)];
        let fTemp31: f32 = ((0.6000000238418579 * fTemp30) + (0.4000000059604645 * this.fRec36_3[<i32>(1)]));
        let fRecBody282: f32 = (((0.9990000128746033 * this.fRec37_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec37_5[<i32>(0)])) + (0.20999999344348907 * fTemp28));
        let fRecBody283: f32 = fTemp28;
        let fRecBody284: f32 = (((0.9990000128746033 * this.fRec37_5[<i32>(0)]) + (0.0007900000200606883 * fTemp29)) + (0.20999999344348907 * fTemp31));
        let fRecBody285: f32 = fTemp31;
        let fRecBody286: f32 = (0.7900000214576721 * fTemp29);
        let fRecBody287: f32 = (0.7900000214576721 * (this.fRec37_5[<i32>(0)] + fTemp30));
        this.fRec36[<i32>(0)] = fRecBody282;
        this.fRec36_1[<i32>(0)] = fRecBody283;
        this.fRec36_2[<i32>(0)] = fRecBody284;
        this.fRec36_3[<i32>(0)] = fRecBody285;
        this.fRec36_4[<i32>(0)] = fRecBody286;
        this.fRec36_5[<i32>(0)] = fRecBody287;
        let fTemp32: f32 = this.fRec35[<i32>(1)];
        let fTemp33: f32 = ((0.6000000238418579 * fTemp32) + (0.4000000059604645 * this.fRec35_1[<i32>(1)]));
        let fTemp34: f32 = (this.fRec36_4[<i32>(0)] + fTemp32);
        let fTemp35: f32 = this.fRec35_2[<i32>(1)];
        let fTemp36: f32 = ((0.6000000238418579 * fTemp35) + (0.4000000059604645 * this.fRec35_3[<i32>(1)]));
        let fRecBody288: f32 = (((0.9990000128746033 * this.fRec36_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec36_5[<i32>(0)])) + (0.20999999344348907 * fTemp33));
        let fRecBody289: f32 = fTemp33;
        let fRecBody290: f32 = (((0.9990000128746033 * this.fRec36_5[<i32>(0)]) + (0.0007900000200606883 * fTemp34)) + (0.20999999344348907 * fTemp36));
        let fRecBody291: f32 = fTemp36;
        let fRecBody292: f32 = (0.7900000214576721 * fTemp34);
        let fRecBody293: f32 = (0.7900000214576721 * (this.fRec36_5[<i32>(0)] + fTemp35));
        this.fRec35[<i32>(0)] = fRecBody288;
        this.fRec35_1[<i32>(0)] = fRecBody289;
        this.fRec35_2[<i32>(0)] = fRecBody290;
        this.fRec35_3[<i32>(0)] = fRecBody291;
        this.fRec35_4[<i32>(0)] = fRecBody292;
        this.fRec35_5[<i32>(0)] = fRecBody293;
        let fTemp37: f32 = this.fRec34[<i32>(1)];
        let fTemp38: f32 = ((0.6000000238418579 * fTemp37) + (0.4000000059604645 * this.fRec34_1[<i32>(1)]));
        let fTemp39: f32 = (this.fRec35_4[<i32>(0)] + fTemp37);
        let fTemp40: f32 = this.fRec34_2[<i32>(1)];
        let fTemp41: f32 = ((0.6000000238418579 * fTemp40) + (0.4000000059604645 * this.fRec34_3[<i32>(1)]));
        let fRecBody294: f32 = (((0.9990000128746033 * this.fRec35_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec35_5[<i32>(0)])) + (0.20999999344348907 * fTemp38));
        let fRecBody295: f32 = fTemp38;
        let fRecBody296: f32 = (((0.9990000128746033 * this.fRec35_5[<i32>(0)]) + (0.0007900000200606883 * fTemp39)) + (0.20999999344348907 * fTemp41));
        let fRecBody297: f32 = fTemp41;
        let fRecBody298: f32 = (0.7900000214576721 * fTemp39);
        let fRecBody299: f32 = (0.7900000214576721 * (this.fRec35_5[<i32>(0)] + fTemp40));
        this.fRec34[<i32>(0)] = fRecBody294;
        this.fRec34_1[<i32>(0)] = fRecBody295;
        this.fRec34_2[<i32>(0)] = fRecBody296;
        this.fRec34_3[<i32>(0)] = fRecBody297;
        this.fRec34_4[<i32>(0)] = fRecBody298;
        this.fRec34_5[<i32>(0)] = fRecBody299;
        let fTemp42: f32 = this.fRec33[<i32>(1)];
        let fTemp43: f32 = ((0.6000000238418579 * fTemp42) + (0.4000000059604645 * this.fRec33_1[<i32>(1)]));
        let fTemp44: f32 = (this.fRec34_4[<i32>(0)] + fTemp42);
        let fTemp45: f32 = this.fRec33_2[<i32>(1)];
        let fTemp46: f32 = ((0.6000000238418579 * fTemp45) + (0.4000000059604645 * this.fRec33_3[<i32>(1)]));
        let fRecBody300: f32 = (((0.9990000128746033 * this.fRec34_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec34_5[<i32>(0)])) + (0.20999999344348907 * fTemp43));
        let fRecBody301: f32 = fTemp43;
        let fRecBody302: f32 = (((0.9990000128746033 * this.fRec34_5[<i32>(0)]) + (0.0007900000200606883 * fTemp44)) + (0.20999999344348907 * fTemp46));
        let fRecBody303: f32 = fTemp46;
        let fRecBody304: f32 = (0.7900000214576721 * fTemp44);
        let fRecBody305: f32 = (0.7900000214576721 * (this.fRec34_5[<i32>(0)] + fTemp45));
        this.fRec33[<i32>(0)] = fRecBody300;
        this.fRec33_1[<i32>(0)] = fRecBody301;
        this.fRec33_2[<i32>(0)] = fRecBody302;
        this.fRec33_3[<i32>(0)] = fRecBody303;
        this.fRec33_4[<i32>(0)] = fRecBody304;
        this.fRec33_5[<i32>(0)] = fRecBody305;
        let fTemp47: f32 = this.fRec32[<i32>(1)];
        let fTemp48: f32 = ((0.6000000238418579 * fTemp47) + (0.4000000059604645 * this.fRec32_1[<i32>(1)]));
        let fTemp49: f32 = (this.fRec33_4[<i32>(0)] + fTemp47);
        let fTemp50: f32 = this.fRec32_2[<i32>(1)];
        let fTemp51: f32 = ((0.6000000238418579 * fTemp50) + (0.4000000059604645 * this.fRec32_3[<i32>(1)]));
        let fRecBody306: f32 = (((0.9990000128746033 * this.fRec33_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec33_5[<i32>(0)])) + (0.20999999344348907 * fTemp48));
        let fRecBody307: f32 = fTemp48;
        let fRecBody308: f32 = (((0.9990000128746033 * this.fRec33_5[<i32>(0)]) + (0.0007900000200606883 * fTemp49)) + (0.20999999344348907 * fTemp51));
        let fRecBody309: f32 = fTemp51;
        let fRecBody310: f32 = (0.7900000214576721 * fTemp49);
        let fRecBody311: f32 = (0.7900000214576721 * (this.fRec33_5[<i32>(0)] + fTemp50));
        this.fRec32[<i32>(0)] = fRecBody306;
        this.fRec32_1[<i32>(0)] = fRecBody307;
        this.fRec32_2[<i32>(0)] = fRecBody308;
        this.fRec32_3[<i32>(0)] = fRecBody309;
        this.fRec32_4[<i32>(0)] = fRecBody310;
        this.fRec32_5[<i32>(0)] = fRecBody311;
        let fTemp52: f32 = this.fRec31[<i32>(1)];
        let fTemp53: f32 = ((0.6000000238418579 * fTemp52) + (0.4000000059604645 * this.fRec31_1[<i32>(1)]));
        let fTemp54: f32 = (this.fRec32_4[<i32>(0)] + fTemp52);
        let fTemp55: f32 = this.fRec31_2[<i32>(1)];
        let fTemp56: f32 = ((0.6000000238418579 * fTemp55) + (0.4000000059604645 * this.fRec31_3[<i32>(1)]));
        let fRecBody312: f32 = (((0.9990000128746033 * this.fRec32_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec32_5[<i32>(0)])) + (0.20999999344348907 * fTemp53));
        let fRecBody313: f32 = fTemp53;
        let fRecBody314: f32 = (((0.9990000128746033 * this.fRec32_5[<i32>(0)]) + (0.0007900000200606883 * fTemp54)) + (0.20999999344348907 * fTemp56));
        let fRecBody315: f32 = fTemp56;
        let fRecBody316: f32 = (0.7900000214576721 * fTemp54);
        let fRecBody317: f32 = (0.7900000214576721 * (this.fRec32_5[<i32>(0)] + fTemp55));
        this.fRec31[<i32>(0)] = fRecBody312;
        this.fRec31_1[<i32>(0)] = fRecBody313;
        this.fRec31_2[<i32>(0)] = fRecBody314;
        this.fRec31_3[<i32>(0)] = fRecBody315;
        this.fRec31_4[<i32>(0)] = fRecBody316;
        this.fRec31_5[<i32>(0)] = fRecBody317;
        let fTemp57: f32 = this.fRec30[<i32>(1)];
        let fTemp58: f32 = ((0.6000000238418579 * fTemp57) + (0.4000000059604645 * this.fRec30_1[<i32>(1)]));
        let fTemp59: f32 = (this.fRec31_4[<i32>(0)] + fTemp57);
        let fTemp60: f32 = this.fRec30_2[<i32>(1)];
        let fTemp61: f32 = ((0.6000000238418579 * fTemp60) + (0.4000000059604645 * this.fRec30_3[<i32>(1)]));
        let fRecBody318: f32 = (((0.9990000128746033 * this.fRec31_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec31_5[<i32>(0)])) + (0.20999999344348907 * fTemp58));
        let fRecBody319: f32 = fTemp58;
        let fRecBody320: f32 = (((0.9990000128746033 * this.fRec31_5[<i32>(0)]) + (0.0007900000200606883 * fTemp59)) + (0.20999999344348907 * fTemp61));
        let fRecBody321: f32 = fTemp61;
        let fRecBody322: f32 = (0.7900000214576721 * fTemp59);
        let fRecBody323: f32 = (0.7900000214576721 * (this.fRec31_5[<i32>(0)] + fTemp60));
        this.fRec30[<i32>(0)] = fRecBody318;
        this.fRec30_1[<i32>(0)] = fRecBody319;
        this.fRec30_2[<i32>(0)] = fRecBody320;
        this.fRec30_3[<i32>(0)] = fRecBody321;
        this.fRec30_4[<i32>(0)] = fRecBody322;
        this.fRec30_5[<i32>(0)] = fRecBody323;
        let fTemp62: f32 = this.fRec29[<i32>(1)];
        let fTemp63: f32 = ((0.6000000238418579 * fTemp62) + (0.4000000059604645 * this.fRec29_1[<i32>(1)]));
        let fTemp64: f32 = (this.fRec30_4[<i32>(0)] + fTemp62);
        let fTemp65: f32 = this.fRec29_2[<i32>(1)];
        let fTemp66: f32 = ((0.6000000238418579 * fTemp65) + (0.4000000059604645 * this.fRec29_3[<i32>(1)]));
        let fRecBody324: f32 = (((0.9990000128746033 * this.fRec30_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec30_5[<i32>(0)])) + (0.20999999344348907 * fTemp63));
        let fRecBody325: f32 = fTemp63;
        let fRecBody326: f32 = (((0.9990000128746033 * this.fRec30_5[<i32>(0)]) + (0.0007900000200606883 * fTemp64)) + (0.20999999344348907 * fTemp66));
        let fRecBody327: f32 = fTemp66;
        let fRecBody328: f32 = (0.7900000214576721 * fTemp64);
        let fRecBody329: f32 = (0.7900000214576721 * (this.fRec30_5[<i32>(0)] + fTemp65));
        this.fRec29[<i32>(0)] = fRecBody324;
        this.fRec29_1[<i32>(0)] = fRecBody325;
        this.fRec29_2[<i32>(0)] = fRecBody326;
        this.fRec29_3[<i32>(0)] = fRecBody327;
        this.fRec29_4[<i32>(0)] = fRecBody328;
        this.fRec29_5[<i32>(0)] = fRecBody329;
        let fTemp67: f32 = this.fRec28[<i32>(1)];
        let fTemp68: f32 = ((0.6000000238418579 * fTemp67) + (0.4000000059604645 * this.fRec28_1[<i32>(1)]));
        let fTemp69: f32 = (this.fRec29_4[<i32>(0)] + fTemp67);
        let fTemp70: f32 = this.fRec28_2[<i32>(1)];
        let fTemp71: f32 = ((0.6000000238418579 * fTemp70) + (0.4000000059604645 * this.fRec28_3[<i32>(1)]));
        let fRecBody330: f32 = (((0.9990000128746033 * this.fRec29_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec29_5[<i32>(0)])) + (0.20999999344348907 * fTemp68));
        let fRecBody331: f32 = fTemp68;
        let fRecBody332: f32 = (((0.9990000128746033 * this.fRec29_5[<i32>(0)]) + (0.0007900000200606883 * fTemp69)) + (0.20999999344348907 * fTemp71));
        let fRecBody333: f32 = fTemp71;
        let fRecBody334: f32 = (0.7900000214576721 * fTemp69);
        let fRecBody335: f32 = (0.7900000214576721 * (this.fRec29_5[<i32>(0)] + fTemp70));
        this.fRec28[<i32>(0)] = fRecBody330;
        this.fRec28_1[<i32>(0)] = fRecBody331;
        this.fRec28_2[<i32>(0)] = fRecBody332;
        this.fRec28_3[<i32>(0)] = fRecBody333;
        this.fRec28_4[<i32>(0)] = fRecBody334;
        this.fRec28_5[<i32>(0)] = fRecBody335;
        let fTemp72: f32 = this.fRec27[<i32>(1)];
        let fTemp73: f32 = ((0.6000000238418579 * fTemp72) + (0.4000000059604645 * this.fRec27_1[<i32>(1)]));
        let fTemp74: f32 = (this.fRec28_4[<i32>(0)] + fTemp72);
        let fTemp75: f32 = this.fRec27_2[<i32>(1)];
        let fTemp76: f32 = ((0.6000000238418579 * fTemp75) + (0.4000000059604645 * this.fRec27_3[<i32>(1)]));
        let fRecBody336: f32 = (((0.9990000128746033 * this.fRec28_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec28_5[<i32>(0)])) + (0.20999999344348907 * fTemp73));
        let fRecBody337: f32 = fTemp73;
        let fRecBody338: f32 = (((0.9990000128746033 * this.fRec28_5[<i32>(0)]) + (0.0007900000200606883 * fTemp74)) + (0.20999999344348907 * fTemp76));
        let fRecBody339: f32 = fTemp76;
        let fRecBody340: f32 = (0.7900000214576721 * fTemp74);
        let fRecBody341: f32 = (0.7900000214576721 * (this.fRec28_5[<i32>(0)] + fTemp75));
        this.fRec27[<i32>(0)] = fRecBody336;
        this.fRec27_1[<i32>(0)] = fRecBody337;
        this.fRec27_2[<i32>(0)] = fRecBody338;
        this.fRec27_3[<i32>(0)] = fRecBody339;
        this.fRec27_4[<i32>(0)] = fRecBody340;
        this.fRec27_5[<i32>(0)] = fRecBody341;
        let fTemp77: f32 = this.fRec26[<i32>(1)];
        let fTemp78: f32 = ((0.6000000238418579 * fTemp77) + (0.4000000059604645 * this.fRec26_1[<i32>(1)]));
        let fTemp79: f32 = (this.fRec27_4[<i32>(0)] + fTemp77);
        let fTemp80: f32 = this.fRec26_2[<i32>(1)];
        let fTemp81: f32 = ((0.6000000238418579 * fTemp80) + (0.4000000059604645 * this.fRec26_3[<i32>(1)]));
        let fRecBody342: f32 = (((0.9990000128746033 * this.fRec27_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec27_5[<i32>(0)])) + (0.20999999344348907 * fTemp78));
        let fRecBody343: f32 = fTemp78;
        let fRecBody344: f32 = (((0.9990000128746033 * this.fRec27_5[<i32>(0)]) + (0.0007900000200606883 * fTemp79)) + (0.20999999344348907 * fTemp81));
        let fRecBody345: f32 = fTemp81;
        let fRecBody346: f32 = (0.7900000214576721 * fTemp79);
        let fRecBody347: f32 = (0.7900000214576721 * (this.fRec27_5[<i32>(0)] + fTemp80));
        this.fRec26[<i32>(0)] = fRecBody342;
        this.fRec26_1[<i32>(0)] = fRecBody343;
        this.fRec26_2[<i32>(0)] = fRecBody344;
        this.fRec26_3[<i32>(0)] = fRecBody345;
        this.fRec26_4[<i32>(0)] = fRecBody346;
        this.fRec26_5[<i32>(0)] = fRecBody347;
        let fTemp82: f32 = this.fRec25[<i32>(1)];
        let fTemp83: f32 = ((0.6000000238418579 * fTemp82) + (0.4000000059604645 * this.fRec25_1[<i32>(1)]));
        let fTemp84: f32 = (this.fRec26_4[<i32>(0)] + fTemp82);
        let fTemp85: f32 = this.fRec25_2[<i32>(1)];
        let fTemp86: f32 = ((0.6000000238418579 * fTemp85) + (0.4000000059604645 * this.fRec25_3[<i32>(1)]));
        let fRecBody348: f32 = (((0.9990000128746033 * this.fRec26_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec26_5[<i32>(0)])) + (0.20999999344348907 * fTemp83));
        let fRecBody349: f32 = fTemp83;
        let fRecBody350: f32 = (((0.9990000128746033 * this.fRec26_5[<i32>(0)]) + (0.0007900000200606883 * fTemp84)) + (0.20999999344348907 * fTemp86));
        let fRecBody351: f32 = fTemp86;
        let fRecBody352: f32 = (0.7900000214576721 * fTemp84);
        let fRecBody353: f32 = (0.7900000214576721 * (this.fRec26_5[<i32>(0)] + fTemp85));
        this.fRec25[<i32>(0)] = fRecBody348;
        this.fRec25_1[<i32>(0)] = fRecBody349;
        this.fRec25_2[<i32>(0)] = fRecBody350;
        this.fRec25_3[<i32>(0)] = fRecBody351;
        this.fRec25_4[<i32>(0)] = fRecBody352;
        this.fRec25_5[<i32>(0)] = fRecBody353;
        let fTemp87: f32 = this.fRec24[<i32>(1)];
        let fTemp88: f32 = ((0.6000000238418579 * fTemp87) + (0.4000000059604645 * this.fRec24_1[<i32>(1)]));
        let fTemp89: f32 = (this.fRec25_4[<i32>(0)] + fTemp87);
        let fTemp90: f32 = this.fRec24_2[<i32>(1)];
        let fTemp91: f32 = ((0.6000000238418579 * fTemp90) + (0.4000000059604645 * this.fRec24_3[<i32>(1)]));
        let fRecBody354: f32 = (((0.9990000128746033 * this.fRec25_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec25_5[<i32>(0)])) + (0.20999999344348907 * fTemp88));
        let fRecBody355: f32 = fTemp88;
        let fRecBody356: f32 = (((0.9990000128746033 * this.fRec25_5[<i32>(0)]) + (0.0007900000200606883 * fTemp89)) + (0.20999999344348907 * fTemp91));
        let fRecBody357: f32 = fTemp91;
        let fRecBody358: f32 = (0.7900000214576721 * fTemp89);
        let fRecBody359: f32 = (0.7900000214576721 * (this.fRec25_5[<i32>(0)] + fTemp90));
        this.fRec24[<i32>(0)] = fRecBody354;
        this.fRec24_1[<i32>(0)] = fRecBody355;
        this.fRec24_2[<i32>(0)] = fRecBody356;
        this.fRec24_3[<i32>(0)] = fRecBody357;
        this.fRec24_4[<i32>(0)] = fRecBody358;
        this.fRec24_5[<i32>(0)] = fRecBody359;
        let fTemp92: f32 = this.fRec23[<i32>(1)];
        let fTemp93: f32 = ((0.6000000238418579 * fTemp92) + (0.4000000059604645 * this.fRec23_1[<i32>(1)]));
        let fTemp94: f32 = (this.fRec24_4[<i32>(0)] + fTemp92);
        let fTemp95: f32 = this.fRec23_2[<i32>(1)];
        let fTemp96: f32 = ((0.6000000238418579 * fTemp95) + (0.4000000059604645 * this.fRec23_3[<i32>(1)]));
        let fRecBody360: f32 = (((0.9990000128746033 * this.fRec24_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec24_5[<i32>(0)])) + (0.20999999344348907 * fTemp93));
        let fRecBody361: f32 = fTemp93;
        let fRecBody362: f32 = (((0.9990000128746033 * this.fRec24_5[<i32>(0)]) + (0.0007900000200606883 * fTemp94)) + (0.20999999344348907 * fTemp96));
        let fRecBody363: f32 = fTemp96;
        let fRecBody364: f32 = (0.7900000214576721 * fTemp94);
        let fRecBody365: f32 = (0.7900000214576721 * (this.fRec24_5[<i32>(0)] + fTemp95));
        this.fRec23[<i32>(0)] = fRecBody360;
        this.fRec23_1[<i32>(0)] = fRecBody361;
        this.fRec23_2[<i32>(0)] = fRecBody362;
        this.fRec23_3[<i32>(0)] = fRecBody363;
        this.fRec23_4[<i32>(0)] = fRecBody364;
        this.fRec23_5[<i32>(0)] = fRecBody365;
        let fTemp97: f32 = this.fRec22[<i32>(1)];
        let fTemp98: f32 = ((0.6000000238418579 * fTemp97) + (0.4000000059604645 * this.fRec22_1[<i32>(1)]));
        let fTemp99: f32 = (this.fRec23_4[<i32>(0)] + fTemp97);
        let fTemp100: f32 = this.fRec22_2[<i32>(1)];
        let fTemp101: f32 = ((0.6000000238418579 * fTemp100) + (0.4000000059604645 * this.fRec22_3[<i32>(1)]));
        let fRecBody366: f32 = (((0.9990000128746033 * this.fRec23_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec23_5[<i32>(0)])) + (0.20999999344348907 * fTemp98));
        let fRecBody367: f32 = fTemp98;
        let fRecBody368: f32 = (((0.9990000128746033 * this.fRec23_5[<i32>(0)]) + (0.0007900000200606883 * fTemp99)) + (0.20999999344348907 * fTemp101));
        let fRecBody369: f32 = fTemp101;
        let fRecBody370: f32 = (0.7900000214576721 * fTemp99);
        let fRecBody371: f32 = (0.7900000214576721 * (this.fRec23_5[<i32>(0)] + fTemp100));
        this.fRec22[<i32>(0)] = fRecBody366;
        this.fRec22_1[<i32>(0)] = fRecBody367;
        this.fRec22_2[<i32>(0)] = fRecBody368;
        this.fRec22_3[<i32>(0)] = fRecBody369;
        this.fRec22_4[<i32>(0)] = fRecBody370;
        this.fRec22_5[<i32>(0)] = fRecBody371;
        let fTemp102: f32 = this.fRec21[<i32>(1)];
        let fTemp103: f32 = ((0.6000000238418579 * fTemp102) + (0.4000000059604645 * this.fRec21_1[<i32>(1)]));
        let fTemp104: f32 = (this.fRec22_4[<i32>(0)] + fTemp102);
        let fTemp105: f32 = this.fRec21_2[<i32>(1)];
        let fTemp106: f32 = ((0.6000000238418579 * fTemp105) + (0.4000000059604645 * this.fRec21_3[<i32>(1)]));
        let fRecBody372: f32 = (((0.9990000128746033 * this.fRec22_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec22_5[<i32>(0)])) + (0.20999999344348907 * fTemp103));
        let fRecBody373: f32 = fTemp103;
        let fRecBody374: f32 = (((0.9990000128746033 * this.fRec22_5[<i32>(0)]) + (0.0007900000200606883 * fTemp104)) + (0.20999999344348907 * fTemp106));
        let fRecBody375: f32 = fTemp106;
        let fRecBody376: f32 = (0.7900000214576721 * fTemp104);
        let fRecBody377: f32 = (0.7900000214576721 * (this.fRec22_5[<i32>(0)] + fTemp105));
        this.fRec21[<i32>(0)] = fRecBody372;
        this.fRec21_1[<i32>(0)] = fRecBody373;
        this.fRec21_2[<i32>(0)] = fRecBody374;
        this.fRec21_3[<i32>(0)] = fRecBody375;
        this.fRec21_4[<i32>(0)] = fRecBody376;
        this.fRec21_5[<i32>(0)] = fRecBody377;
        let fTemp107: f32 = this.fRec20[<i32>(1)];
        let fTemp108: f32 = ((0.6000000238418579 * fTemp107) + (0.4000000059604645 * this.fRec20_1[<i32>(1)]));
        let fTemp109: f32 = (this.fRec21_4[<i32>(0)] + fTemp107);
        let fTemp110: f32 = this.fRec20_2[<i32>(1)];
        let fTemp111: f32 = ((0.6000000238418579 * fTemp110) + (0.4000000059604645 * this.fRec20_3[<i32>(1)]));
        let fRecBody378: f32 = (((0.9990000128746033 * this.fRec21_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec21_5[<i32>(0)])) + (0.20999999344348907 * fTemp108));
        let fRecBody379: f32 = fTemp108;
        let fRecBody380: f32 = (((0.9990000128746033 * this.fRec21_5[<i32>(0)]) + (0.0007900000200606883 * fTemp109)) + (0.20999999344348907 * fTemp111));
        let fRecBody381: f32 = fTemp111;
        let fRecBody382: f32 = (0.7900000214576721 * fTemp109);
        let fRecBody383: f32 = (0.7900000214576721 * (this.fRec21_5[<i32>(0)] + fTemp110));
        this.fRec20[<i32>(0)] = fRecBody378;
        this.fRec20_1[<i32>(0)] = fRecBody379;
        this.fRec20_2[<i32>(0)] = fRecBody380;
        this.fRec20_3[<i32>(0)] = fRecBody381;
        this.fRec20_4[<i32>(0)] = fRecBody382;
        this.fRec20_5[<i32>(0)] = fRecBody383;
        let fTemp112: f32 = this.fRec19[<i32>(1)];
        let fTemp113: f32 = ((0.6000000238418579 * fTemp112) + (0.4000000059604645 * this.fRec19_1[<i32>(1)]));
        let fTemp114: f32 = (this.fRec20_4[<i32>(0)] + fTemp112);
        let fTemp115: f32 = this.fRec19_2[<i32>(1)];
        let fTemp116: f32 = ((0.6000000238418579 * fTemp115) + (0.4000000059604645 * this.fRec19_3[<i32>(1)]));
        let fRecBody384: f32 = (((0.9990000128746033 * this.fRec20_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec20_5[<i32>(0)])) + (0.20999999344348907 * fTemp113));
        let fRecBody385: f32 = fTemp113;
        let fRecBody386: f32 = (((0.9990000128746033 * this.fRec20_5[<i32>(0)]) + (0.0007900000200606883 * fTemp114)) + (0.20999999344348907 * fTemp116));
        let fRecBody387: f32 = fTemp116;
        let fRecBody388: f32 = (0.7900000214576721 * fTemp114);
        let fRecBody389: f32 = (0.7900000214576721 * (this.fRec20_5[<i32>(0)] + fTemp115));
        this.fRec19[<i32>(0)] = fRecBody384;
        this.fRec19_1[<i32>(0)] = fRecBody385;
        this.fRec19_2[<i32>(0)] = fRecBody386;
        this.fRec19_3[<i32>(0)] = fRecBody387;
        this.fRec19_4[<i32>(0)] = fRecBody388;
        this.fRec19_5[<i32>(0)] = fRecBody389;
        let fTemp117: f32 = this.fRec18[<i32>(1)];
        let fTemp118: f32 = ((0.6000000238418579 * fTemp117) + (0.4000000059604645 * this.fRec18_1[<i32>(1)]));
        let fTemp119: f32 = (this.fRec19_4[<i32>(0)] + fTemp117);
        let fTemp120: f32 = this.fRec18_2[<i32>(1)];
        let fTemp121: f32 = ((0.6000000238418579 * fTemp120) + (0.4000000059604645 * this.fRec18_3[<i32>(1)]));
        let fRecBody390: f32 = (((0.9990000128746033 * this.fRec19_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec19_5[<i32>(0)])) + (0.20999999344348907 * fTemp118));
        let fRecBody391: f32 = fTemp118;
        let fRecBody392: f32 = (((0.9990000128746033 * this.fRec19_5[<i32>(0)]) + (0.0007900000200606883 * fTemp119)) + (0.20999999344348907 * fTemp121));
        let fRecBody393: f32 = fTemp121;
        let fRecBody394: f32 = (0.7900000214576721 * fTemp119);
        let fRecBody395: f32 = (0.7900000214576721 * (this.fRec19_5[<i32>(0)] + fTemp120));
        this.fRec18[<i32>(0)] = fRecBody390;
        this.fRec18_1[<i32>(0)] = fRecBody391;
        this.fRec18_2[<i32>(0)] = fRecBody392;
        this.fRec18_3[<i32>(0)] = fRecBody393;
        this.fRec18_4[<i32>(0)] = fRecBody394;
        this.fRec18_5[<i32>(0)] = fRecBody395;
        let fTemp122: f32 = this.fRec17[<i32>(1)];
        let fTemp123: f32 = ((0.6000000238418579 * fTemp122) + (0.4000000059604645 * this.fRec17_1[<i32>(1)]));
        let fTemp124: f32 = (this.fRec18_4[<i32>(0)] + fTemp122);
        let fTemp125: f32 = this.fRec17_2[<i32>(1)];
        let fTemp126: f32 = ((0.6000000238418579 * fTemp125) + (0.4000000059604645 * this.fRec17_3[<i32>(1)]));
        let fRecBody396: f32 = (((0.9990000128746033 * this.fRec18_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec18_5[<i32>(0)])) + (0.20999999344348907 * fTemp123));
        let fRecBody397: f32 = fTemp123;
        let fRecBody398: f32 = (((0.9990000128746033 * this.fRec18_5[<i32>(0)]) + (0.0007900000200606883 * fTemp124)) + (0.20999999344348907 * fTemp126));
        let fRecBody399: f32 = fTemp126;
        let fRecBody400: f32 = (0.7900000214576721 * fTemp124);
        let fRecBody401: f32 = (0.7900000214576721 * (this.fRec18_5[<i32>(0)] + fTemp125));
        this.fRec17[<i32>(0)] = fRecBody396;
        this.fRec17_1[<i32>(0)] = fRecBody397;
        this.fRec17_2[<i32>(0)] = fRecBody398;
        this.fRec17_3[<i32>(0)] = fRecBody399;
        this.fRec17_4[<i32>(0)] = fRecBody400;
        this.fRec17_5[<i32>(0)] = fRecBody401;
        let fTemp127: f32 = this.fRec16[<i32>(1)];
        let fTemp128: f32 = ((0.6000000238418579 * fTemp127) + (0.4000000059604645 * this.fRec16_1[<i32>(1)]));
        let fTemp129: f32 = (this.fRec17_4[<i32>(0)] + fTemp127);
        let fTemp130: f32 = this.fRec16_2[<i32>(1)];
        let fTemp131: f32 = ((0.6000000238418579 * fTemp130) + (0.4000000059604645 * this.fRec16_3[<i32>(1)]));
        let fRecBody402: f32 = (((0.9990000128746033 * this.fRec17_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec17_5[<i32>(0)])) + (0.20999999344348907 * fTemp128));
        let fRecBody403: f32 = fTemp128;
        let fRecBody404: f32 = (((0.9990000128746033 * this.fRec17_5[<i32>(0)]) + (0.0007900000200606883 * fTemp129)) + (0.20999999344348907 * fTemp131));
        let fRecBody405: f32 = fTemp131;
        let fRecBody406: f32 = (0.7900000214576721 * fTemp129);
        let fRecBody407: f32 = (0.7900000214576721 * (this.fRec17_5[<i32>(0)] + fTemp130));
        this.fRec16[<i32>(0)] = fRecBody402;
        this.fRec16_1[<i32>(0)] = fRecBody403;
        this.fRec16_2[<i32>(0)] = fRecBody404;
        this.fRec16_3[<i32>(0)] = fRecBody405;
        this.fRec16_4[<i32>(0)] = fRecBody406;
        this.fRec16_5[<i32>(0)] = fRecBody407;
        let fTemp132: f32 = this.fRec15[<i32>(1)];
        let fTemp133: f32 = ((0.6000000238418579 * fTemp132) + (0.4000000059604645 * this.fRec15_1[<i32>(1)]));
        let fTemp134: f32 = (this.fRec16_4[<i32>(0)] + fTemp132);
        let fTemp135: f32 = this.fRec15_2[<i32>(1)];
        let fTemp136: f32 = ((0.6000000238418579 * fTemp135) + (0.4000000059604645 * this.fRec15_3[<i32>(1)]));
        let fRecBody408: f32 = (((0.9990000128746033 * this.fRec16_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec16_5[<i32>(0)])) + (0.20999999344348907 * fTemp133));
        let fRecBody409: f32 = fTemp133;
        let fRecBody410: f32 = (((0.9990000128746033 * this.fRec16_5[<i32>(0)]) + (0.0007900000200606883 * fTemp134)) + (0.20999999344348907 * fTemp136));
        let fRecBody411: f32 = fTemp136;
        let fRecBody412: f32 = (0.7900000214576721 * fTemp134);
        let fRecBody413: f32 = (0.7900000214576721 * (this.fRec16_5[<i32>(0)] + fTemp135));
        this.fRec15[<i32>(0)] = fRecBody408;
        this.fRec15_1[<i32>(0)] = fRecBody409;
        this.fRec15_2[<i32>(0)] = fRecBody410;
        this.fRec15_3[<i32>(0)] = fRecBody411;
        this.fRec15_4[<i32>(0)] = fRecBody412;
        this.fRec15_5[<i32>(0)] = fRecBody413;
        let fTemp137: f32 = this.fRec14[<i32>(1)];
        let fTemp138: f32 = ((0.6000000238418579 * fTemp137) + (0.4000000059604645 * this.fRec14_1[<i32>(1)]));
        let fTemp139: f32 = (this.fRec15_4[<i32>(0)] + fTemp137);
        let fTemp140: f32 = this.fRec14_2[<i32>(1)];
        let fTemp141: f32 = ((0.6000000238418579 * fTemp140) + (0.4000000059604645 * this.fRec14_3[<i32>(1)]));
        let fRecBody414: f32 = (((0.9990000128746033 * this.fRec15_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec15_5[<i32>(0)])) + (0.20999999344348907 * fTemp138));
        let fRecBody415: f32 = fTemp138;
        let fRecBody416: f32 = (((0.9990000128746033 * this.fRec15_5[<i32>(0)]) + (0.0007900000200606883 * fTemp139)) + (0.20999999344348907 * fTemp141));
        let fRecBody417: f32 = fTemp141;
        let fRecBody418: f32 = (0.7900000214576721 * fTemp139);
        let fRecBody419: f32 = (0.7900000214576721 * (this.fRec15_5[<i32>(0)] + fTemp140));
        this.fRec14[<i32>(0)] = fRecBody414;
        this.fRec14_1[<i32>(0)] = fRecBody415;
        this.fRec14_2[<i32>(0)] = fRecBody416;
        this.fRec14_3[<i32>(0)] = fRecBody417;
        this.fRec14_4[<i32>(0)] = fRecBody418;
        this.fRec14_5[<i32>(0)] = fRecBody419;
        let fTemp142: f32 = this.fRec13[<i32>(1)];
        let fTemp143: f32 = ((0.6000000238418579 * fTemp142) + (0.4000000059604645 * this.fRec13_1[<i32>(1)]));
        let fTemp144: f32 = (this.fRec14_4[<i32>(0)] + fTemp142);
        let fTemp145: f32 = this.fRec13_2[<i32>(1)];
        let fTemp146: f32 = ((0.6000000238418579 * fTemp145) + (0.4000000059604645 * this.fRec13_3[<i32>(1)]));
        let fRecBody420: f32 = (((0.9990000128746033 * this.fRec14_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec14_5[<i32>(0)])) + (0.20999999344348907 * fTemp143));
        let fRecBody421: f32 = fTemp143;
        let fRecBody422: f32 = (((0.9990000128746033 * this.fRec14_5[<i32>(0)]) + (0.0007900000200606883 * fTemp144)) + (0.20999999344348907 * fTemp146));
        let fRecBody423: f32 = fTemp146;
        let fRecBody424: f32 = (0.7900000214576721 * fTemp144);
        let fRecBody425: f32 = (0.7900000214576721 * (this.fRec14_5[<i32>(0)] + fTemp145));
        this.fRec13[<i32>(0)] = fRecBody420;
        this.fRec13_1[<i32>(0)] = fRecBody421;
        this.fRec13_2[<i32>(0)] = fRecBody422;
        this.fRec13_3[<i32>(0)] = fRecBody423;
        this.fRec13_4[<i32>(0)] = fRecBody424;
        this.fRec13_5[<i32>(0)] = fRecBody425;
        let fTemp147: f32 = this.fRec12[<i32>(1)];
        let fTemp148: f32 = ((0.6000000238418579 * fTemp147) + (0.4000000059604645 * this.fRec12_1[<i32>(1)]));
        let fTemp149: f32 = (this.fRec13_4[<i32>(0)] + fTemp147);
        let fTemp150: f32 = this.fRec12_2[<i32>(1)];
        let fTemp151: f32 = ((0.6000000238418579 * fTemp150) + (0.4000000059604645 * this.fRec12_3[<i32>(1)]));
        let fRecBody426: f32 = (((0.9990000128746033 * this.fRec13_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec13_5[<i32>(0)])) + (0.20999999344348907 * fTemp148));
        let fRecBody427: f32 = fTemp148;
        let fRecBody428: f32 = (((0.9990000128746033 * this.fRec13_5[<i32>(0)]) + (0.0007900000200606883 * fTemp149)) + (0.20999999344348907 * fTemp151));
        let fRecBody429: f32 = fTemp151;
        let fRecBody430: f32 = (0.7900000214576721 * fTemp149);
        let fRecBody431: f32 = (0.7900000214576721 * (this.fRec13_5[<i32>(0)] + fTemp150));
        this.fRec12[<i32>(0)] = fRecBody426;
        this.fRec12_1[<i32>(0)] = fRecBody427;
        this.fRec12_2[<i32>(0)] = fRecBody428;
        this.fRec12_3[<i32>(0)] = fRecBody429;
        this.fRec12_4[<i32>(0)] = fRecBody430;
        this.fRec12_5[<i32>(0)] = fRecBody431;
        let fTemp152: f32 = this.fRec11[<i32>(1)];
        let fTemp153: f32 = ((0.6000000238418579 * fTemp152) + (0.4000000059604645 * this.fRec11_1[<i32>(1)]));
        let fTemp154: f32 = (this.fRec12_4[<i32>(0)] + fTemp152);
        let fTemp155: f32 = this.fRec11_2[<i32>(1)];
        let fTemp156: f32 = ((0.6000000238418579 * fTemp155) + (0.4000000059604645 * this.fRec11_3[<i32>(1)]));
        let fRecBody432: f32 = (((0.9990000128746033 * this.fRec12_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec12_5[<i32>(0)])) + (0.20999999344348907 * fTemp153));
        let fRecBody433: f32 = fTemp153;
        let fRecBody434: f32 = (((0.9990000128746033 * this.fRec12_5[<i32>(0)]) + (0.0007900000200606883 * fTemp154)) + (0.20999999344348907 * fTemp156));
        let fRecBody435: f32 = fTemp156;
        let fRecBody436: f32 = (0.7900000214576721 * fTemp154);
        let fRecBody437: f32 = (0.7900000214576721 * (this.fRec12_5[<i32>(0)] + fTemp155));
        this.fRec11[<i32>(0)] = fRecBody432;
        this.fRec11_1[<i32>(0)] = fRecBody433;
        this.fRec11_2[<i32>(0)] = fRecBody434;
        this.fRec11_3[<i32>(0)] = fRecBody435;
        this.fRec11_4[<i32>(0)] = fRecBody436;
        this.fRec11_5[<i32>(0)] = fRecBody437;
        let fTemp157: f32 = this.fRec10[<i32>(1)];
        let fTemp158: f32 = ((0.6000000238418579 * fTemp157) + (0.4000000059604645 * this.fRec10_1[<i32>(1)]));
        let fTemp159: f32 = (this.fRec11_4[<i32>(0)] + fTemp157);
        let fTemp160: f32 = this.fRec10_2[<i32>(1)];
        let fTemp161: f32 = ((0.6000000238418579 * fTemp160) + (0.4000000059604645 * this.fRec10_3[<i32>(1)]));
        let fRecBody438: f32 = (((0.9990000128746033 * this.fRec11_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec11_5[<i32>(0)])) + (0.20999999344348907 * fTemp158));
        let fRecBody439: f32 = fTemp158;
        let fRecBody440: f32 = (((0.9990000128746033 * this.fRec11_5[<i32>(0)]) + (0.0007900000200606883 * fTemp159)) + (0.20999999344348907 * fTemp161));
        let fRecBody441: f32 = fTemp161;
        let fRecBody442: f32 = (0.7900000214576721 * fTemp159);
        let fRecBody443: f32 = (0.7900000214576721 * (this.fRec11_5[<i32>(0)] + fTemp160));
        this.fRec10[<i32>(0)] = fRecBody438;
        this.fRec10_1[<i32>(0)] = fRecBody439;
        this.fRec10_2[<i32>(0)] = fRecBody440;
        this.fRec10_3[<i32>(0)] = fRecBody441;
        this.fRec10_4[<i32>(0)] = fRecBody442;
        this.fRec10_5[<i32>(0)] = fRecBody443;
        let fTemp162: f32 = this.fRec9[<i32>(1)];
        let fTemp163: f32 = ((0.6000000238418579 * fTemp162) + (0.4000000059604645 * this.fRec9_1[<i32>(1)]));
        let fTemp164: f32 = (this.fRec10_4[<i32>(0)] + fTemp162);
        let fTemp165: f32 = this.fRec9_2[<i32>(1)];
        let fTemp166: f32 = ((0.6000000238418579 * fTemp165) + (0.4000000059604645 * this.fRec9_3[<i32>(1)]));
        let fRecBody444: f32 = (((0.9990000128746033 * this.fRec10_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec10_5[<i32>(0)])) + (0.20999999344348907 * fTemp163));
        let fRecBody445: f32 = fTemp163;
        let fRecBody446: f32 = (((0.9990000128746033 * this.fRec10_5[<i32>(0)]) + (0.0007900000200606883 * fTemp164)) + (0.20999999344348907 * fTemp166));
        let fRecBody447: f32 = fTemp166;
        let fRecBody448: f32 = (0.7900000214576721 * fTemp164);
        let fRecBody449: f32 = (0.7900000214576721 * (this.fRec10_5[<i32>(0)] + fTemp165));
        this.fRec9[<i32>(0)] = fRecBody444;
        this.fRec9_1[<i32>(0)] = fRecBody445;
        this.fRec9_2[<i32>(0)] = fRecBody446;
        this.fRec9_3[<i32>(0)] = fRecBody447;
        this.fRec9_4[<i32>(0)] = fRecBody448;
        this.fRec9_5[<i32>(0)] = fRecBody449;
        let fTemp167: f32 = this.fRec8[<i32>(1)];
        let fTemp168: f32 = ((0.6000000238418579 * fTemp167) + (0.4000000059604645 * this.fRec8_1[<i32>(1)]));
        let fTemp169: f32 = (this.fRec9_4[<i32>(0)] + fTemp167);
        let fTemp170: f32 = this.fRec8_2[<i32>(1)];
        let fTemp171: f32 = ((0.6000000238418579 * fTemp170) + (0.4000000059604645 * this.fRec8_3[<i32>(1)]));
        let fRecBody450: f32 = (((0.9990000128746033 * this.fRec9_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec9_5[<i32>(0)])) + (0.20999999344348907 * fTemp168));
        let fRecBody451: f32 = fTemp168;
        let fRecBody452: f32 = (((0.9990000128746033 * this.fRec9_5[<i32>(0)]) + (0.0007900000200606883 * fTemp169)) + (0.20999999344348907 * fTemp171));
        let fRecBody453: f32 = fTemp171;
        let fRecBody454: f32 = (0.7900000214576721 * fTemp169);
        let fRecBody455: f32 = (0.7900000214576721 * (this.fRec9_5[<i32>(0)] + fTemp170));
        this.fRec8[<i32>(0)] = fRecBody450;
        this.fRec8_1[<i32>(0)] = fRecBody451;
        this.fRec8_2[<i32>(0)] = fRecBody452;
        this.fRec8_3[<i32>(0)] = fRecBody453;
        this.fRec8_4[<i32>(0)] = fRecBody454;
        this.fRec8_5[<i32>(0)] = fRecBody455;
        let fTemp172: f32 = this.fRec7[<i32>(1)];
        let fTemp173: f32 = ((0.6000000238418579 * fTemp172) + (0.4000000059604645 * this.fRec7_1[<i32>(1)]));
        let fTemp174: f32 = (this.fRec8_4[<i32>(0)] + fTemp172);
        let fTemp175: f32 = this.fRec7_2[<i32>(1)];
        let fTemp176: f32 = ((0.6000000238418579 * fTemp175) + (0.4000000059604645 * this.fRec7_3[<i32>(1)]));
        let fRecBody456: f32 = (((0.9990000128746033 * this.fRec8_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec8_5[<i32>(0)])) + (0.20999999344348907 * fTemp173));
        let fRecBody457: f32 = fTemp173;
        let fRecBody458: f32 = (((0.9990000128746033 * this.fRec8_5[<i32>(0)]) + (0.0007900000200606883 * fTemp174)) + (0.20999999344348907 * fTemp176));
        let fRecBody459: f32 = fTemp176;
        let fRecBody460: f32 = (0.7900000214576721 * fTemp174);
        let fRecBody461: f32 = (0.7900000214576721 * (this.fRec8_5[<i32>(0)] + fTemp175));
        this.fRec7[<i32>(0)] = fRecBody456;
        this.fRec7_1[<i32>(0)] = fRecBody457;
        this.fRec7_2[<i32>(0)] = fRecBody458;
        this.fRec7_3[<i32>(0)] = fRecBody459;
        this.fRec7_4[<i32>(0)] = fRecBody460;
        this.fRec7_5[<i32>(0)] = fRecBody461;
        let fTemp177: f32 = this.fRec6[<i32>(1)];
        let fTemp178: f32 = ((0.6000000238418579 * fTemp177) + (0.4000000059604645 * this.fRec6_1[<i32>(1)]));
        let fTemp179: f32 = (this.fRec7_4[<i32>(0)] + fTemp177);
        let fTemp180: f32 = this.fRec6_2[<i32>(1)];
        let fTemp181: f32 = ((0.6000000238418579 * fTemp180) + (0.4000000059604645 * this.fRec6_3[<i32>(1)]));
        let fRecBody462: f32 = (((0.9990000128746033 * this.fRec7_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec7_5[<i32>(0)])) + (0.20999999344348907 * fTemp178));
        let fRecBody463: f32 = fTemp178;
        let fRecBody464: f32 = (((0.9990000128746033 * this.fRec7_5[<i32>(0)]) + (0.0007900000200606883 * fTemp179)) + (0.20999999344348907 * fTemp181));
        let fRecBody465: f32 = fTemp181;
        let fRecBody466: f32 = (0.7900000214576721 * fTemp179);
        let fRecBody467: f32 = (0.7900000214576721 * (this.fRec7_5[<i32>(0)] + fTemp180));
        this.fRec6[<i32>(0)] = fRecBody462;
        this.fRec6_1[<i32>(0)] = fRecBody463;
        this.fRec6_2[<i32>(0)] = fRecBody464;
        this.fRec6_3[<i32>(0)] = fRecBody465;
        this.fRec6_4[<i32>(0)] = fRecBody466;
        this.fRec6_5[<i32>(0)] = fRecBody467;
        let fTemp182: f32 = this.fRec5[<i32>(1)];
        let fTemp183: f32 = ((0.6000000238418579 * fTemp182) + (0.4000000059604645 * this.fRec5_1[<i32>(1)]));
        let fTemp184: f32 = (this.fRec6_4[<i32>(0)] + fTemp182);
        let fTemp185: f32 = this.fRec5_2[<i32>(1)];
        let fTemp186: f32 = ((0.6000000238418579 * fTemp185) + (0.4000000059604645 * this.fRec5_3[<i32>(1)]));
        let fRecBody468: f32 = (((0.9990000128746033 * this.fRec6_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec6_5[<i32>(0)])) + (0.20999999344348907 * fTemp183));
        let fRecBody469: f32 = fTemp183;
        let fRecBody470: f32 = (((0.9990000128746033 * this.fRec6_5[<i32>(0)]) + (0.0007900000200606883 * fTemp184)) + (0.20999999344348907 * fTemp186));
        let fRecBody471: f32 = fTemp186;
        let fRecBody472: f32 = (0.7900000214576721 * fTemp184);
        let fRecBody473: f32 = (0.7900000214576721 * (this.fRec6_5[<i32>(0)] + fTemp185));
        this.fRec5[<i32>(0)] = fRecBody468;
        this.fRec5_1[<i32>(0)] = fRecBody469;
        this.fRec5_2[<i32>(0)] = fRecBody470;
        this.fRec5_3[<i32>(0)] = fRecBody471;
        this.fRec5_4[<i32>(0)] = fRecBody472;
        this.fRec5_5[<i32>(0)] = fRecBody473;
        let fTemp187: f32 = this.fRec4[<i32>(1)];
        let fTemp188: f32 = ((0.6000000238418579 * fTemp187) + (0.4000000059604645 * this.fRec4_1[<i32>(1)]));
        let fTemp189: f32 = (this.fRec5_4[<i32>(0)] + fTemp187);
        let fTemp190: f32 = this.fRec4_2[<i32>(1)];
        let fTemp191: f32 = ((0.6000000238418579 * fTemp190) + (0.4000000059604645 * this.fRec4_3[<i32>(1)]));
        let fRecBody474: f32 = (((0.9990000128746033 * this.fRec5_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec5_5[<i32>(0)])) + (0.20999999344348907 * fTemp188));
        let fRecBody475: f32 = fTemp188;
        let fRecBody476: f32 = (((0.9990000128746033 * this.fRec5_5[<i32>(0)]) + (0.0007900000200606883 * fTemp189)) + (0.20999999344348907 * fTemp191));
        let fRecBody477: f32 = fTemp191;
        let fRecBody478: f32 = (0.7900000214576721 * fTemp189);
        let fRecBody479: f32 = (0.7900000214576721 * (this.fRec5_5[<i32>(0)] + fTemp190));
        this.fRec4[<i32>(0)] = fRecBody474;
        this.fRec4_1[<i32>(0)] = fRecBody475;
        this.fRec4_2[<i32>(0)] = fRecBody476;
        this.fRec4_3[<i32>(0)] = fRecBody477;
        this.fRec4_4[<i32>(0)] = fRecBody478;
        this.fRec4_5[<i32>(0)] = fRecBody479;
        let fTemp192: f32 = this.fRec3[<i32>(1)];
        let fTemp193: f32 = ((0.6000000238418579 * fTemp192) + (0.4000000059604645 * this.fRec3_1[<i32>(1)]));
        let fTemp194: f32 = (this.fRec4_4[<i32>(0)] + fTemp192);
        let fTemp195: f32 = this.fRec3_2[<i32>(1)];
        let fTemp196: f32 = ((0.6000000238418579 * fTemp195) + (0.4000000059604645 * this.fRec3_3[<i32>(1)]));
        let fRecBody480: f32 = (((0.9990000128746033 * this.fRec4_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec4_5[<i32>(0)])) + (0.20999999344348907 * fTemp193));
        let fRecBody481: f32 = fTemp193;
        let fRecBody482: f32 = (((0.9990000128746033 * this.fRec4_5[<i32>(0)]) + (0.0007900000200606883 * fTemp194)) + (0.20999999344348907 * fTemp196));
        let fRecBody483: f32 = fTemp196;
        let fRecBody484: f32 = (0.7900000214576721 * fTemp194);
        let fRecBody485: f32 = (0.7900000214576721 * (this.fRec4_5[<i32>(0)] + fTemp195));
        this.fRec3[<i32>(0)] = fRecBody480;
        this.fRec3_1[<i32>(0)] = fRecBody481;
        this.fRec3_2[<i32>(0)] = fRecBody482;
        this.fRec3_3[<i32>(0)] = fRecBody483;
        this.fRec3_4[<i32>(0)] = fRecBody484;
        this.fRec3_5[<i32>(0)] = fRecBody485;
        let fTemp197: f32 = this.fRec2[<i32>(1)];
        let fTemp198: f32 = ((0.6000000238418579 * fTemp197) + (0.4000000059604645 * this.fRec2_1[<i32>(1)]));
        let fTemp199: f32 = (this.fRec3_4[<i32>(0)] + fTemp197);
        let fTemp200: f32 = this.fRec2_2[<i32>(1)];
        let fTemp201: f32 = ((0.6000000238418579 * fTemp200) + (0.4000000059604645 * this.fRec2_3[<i32>(1)]));
        let fRecBody486: f32 = (((0.9990000128746033 * this.fRec3_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec3_5[<i32>(0)])) + (0.20999999344348907 * fTemp198));
        let fRecBody487: f32 = fTemp198;
        let fRecBody488: f32 = (((0.9990000128746033 * this.fRec3_5[<i32>(0)]) + (0.0007900000200606883 * fTemp199)) + (0.20999999344348907 * fTemp201));
        let fRecBody489: f32 = fTemp201;
        let fRecBody490: f32 = (0.7900000214576721 * fTemp199);
        let fRecBody491: f32 = (0.7900000214576721 * (this.fRec3_5[<i32>(0)] + fTemp200));
        this.fRec2[<i32>(0)] = fRecBody486;
        this.fRec2_1[<i32>(0)] = fRecBody487;
        this.fRec2_2[<i32>(0)] = fRecBody488;
        this.fRec2_3[<i32>(0)] = fRecBody489;
        this.fRec2_4[<i32>(0)] = fRecBody490;
        this.fRec2_5[<i32>(0)] = fRecBody491;
        let fTemp202: f32 = this.fRec1[<i32>(1)];
        let fTemp203: f32 = ((0.6000000238418579 * fTemp202) + (0.4000000059604645 * this.fRec1_1[<i32>(1)]));
        let fTemp204: f32 = (this.fRec2_4[<i32>(0)] + fTemp202);
        let fTemp205: f32 = this.fRec1_2[<i32>(1)];
        let fTemp206: f32 = ((0.6000000238418579 * fTemp205) + (0.4000000059604645 * this.fRec1_3[<i32>(1)]));
        let fRecBody492: f32 = (((0.9990000128746033 * this.fRec2_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec2_5[<i32>(0)])) + (0.20999999344348907 * fTemp203));
        let fRecBody493: f32 = fTemp203;
        let fRecBody494: f32 = (((0.9990000128746033 * this.fRec2_5[<i32>(0)]) + (0.0007900000200606883 * fTemp204)) + (0.20999999344348907 * fTemp206));
        let fRecBody495: f32 = fTemp206;
        let fRecBody496: f32 = (0.7900000214576721 * fTemp204);
        let fRecBody497: f32 = (0.7900000214576721 * (this.fRec2_5[<i32>(0)] + fTemp205));
        this.fRec1[<i32>(0)] = fRecBody492;
        this.fRec1_1[<i32>(0)] = fRecBody493;
        this.fRec1_2[<i32>(0)] = fRecBody494;
        this.fRec1_3[<i32>(0)] = fRecBody495;
        this.fRec1_4[<i32>(0)] = fRecBody496;
        this.fRec1_5[<i32>(0)] = fRecBody497;
        let fTemp207: f32 = this.fRec0[<i32>(1)];
        let fTemp208: f32 = ((0.6000000238418579 * fTemp207) + (0.4000000059604645 * this.fRec0_1[<i32>(1)]));
        let fTemp209: f32 = (this.fRec1_4[<i32>(0)] + fTemp207);
        let fTemp210: f32 = this.fRec0_2[<i32>(1)];
        let fTemp211: f32 = ((0.6000000238418579 * fTemp210) + (0.4000000059604645 * this.fRec0_3[<i32>(1)]));
        let fRecBody498: f32 = (((0.9990000128746033 * this.fRec1_4[<i32>(0)]) + (0.0010000000474974513 * this.fRec1_5[<i32>(0)])) + (0.20999999344348907 * fTemp208));
        let fRecBody499: f32 = fTemp208;
        let fRecBody500: f32 = (((0.9990000128746033 * this.fRec1_5[<i32>(0)]) + (0.0007900000200606883 * fTemp209)) + (0.20999999344348907 * fTemp211));
        let fRecBody501: f32 = fTemp211;
        let fRecBody502: f32 = (0.7900000214576721 * fTemp209);
        let fRecBody503: f32 = (0.7900000214576721 * (this.fRec1_5[<i32>(0)] + fTemp210));
        this.fRec0[<i32>(0)] = fRecBody498;
        this.fRec0_1[<i32>(0)] = fRecBody499;
        this.fRec0_2[<i32>(0)] = fRecBody500;
        this.fRec0_3[<i32>(0)] = fRecBody501;
        this.fRec0_4[<i32>(0)] = fRecBody502;
        this.fRec0_5[<i32>(0)] = fRecBody503;
        outputs[<i32>(0)] = <f32>((0.0000000000000005000000018137469 * this.fRec0_4[<i32>(0)]));
        outputs[<i32>(1)] = <f32>((0.0000000000000005000000018137469 * this.fRec0_5[<i32>(0)]));
        this.fRec41[<i32>(1)] = this.fRec41[<i32>(0)];
        this.fRec41_1[<i32>(1)] = this.fRec41_1[<i32>(0)];
        this.fRec41_2[<i32>(1)] = this.fRec41_2[<i32>(0)];
        this.fRec41_3[<i32>(1)] = this.fRec41_3[<i32>(0)];
        this.fRec41_4[<i32>(1)] = this.fRec41_4[<i32>(0)];
        this.fRec41_5[<i32>(1)] = this.fRec41_5[<i32>(0)];
        this.fRec40[<i32>(1)] = this.fRec40[<i32>(0)];
        this.fRec40_1[<i32>(1)] = this.fRec40_1[<i32>(0)];
        this.fRec40_2[<i32>(1)] = this.fRec40_2[<i32>(0)];
        this.fRec40_3[<i32>(1)] = this.fRec40_3[<i32>(0)];
        this.fRec40_4[<i32>(1)] = this.fRec40_4[<i32>(0)];
        this.fRec40_5[<i32>(1)] = this.fRec40_5[<i32>(0)];
        this.fRec39[<i32>(1)] = this.fRec39[<i32>(0)];
        this.fRec39_1[<i32>(1)] = this.fRec39_1[<i32>(0)];
        this.fRec39_2[<i32>(1)] = this.fRec39_2[<i32>(0)];
        this.fRec39_3[<i32>(1)] = this.fRec39_3[<i32>(0)];
        this.fRec39_4[<i32>(1)] = this.fRec39_4[<i32>(0)];
        this.fRec39_5[<i32>(1)] = this.fRec39_5[<i32>(0)];
        this.fRec38[<i32>(1)] = this.fRec38[<i32>(0)];
        this.fRec38_1[<i32>(1)] = this.fRec38_1[<i32>(0)];
        this.fRec38_2[<i32>(1)] = this.fRec38_2[<i32>(0)];
        this.fRec38_3[<i32>(1)] = this.fRec38_3[<i32>(0)];
        this.fRec38_4[<i32>(1)] = this.fRec38_4[<i32>(0)];
        this.fRec38_5[<i32>(1)] = this.fRec38_5[<i32>(0)];
        this.fRec37[<i32>(1)] = this.fRec37[<i32>(0)];
        this.fRec37_1[<i32>(1)] = this.fRec37_1[<i32>(0)];
        this.fRec37_2[<i32>(1)] = this.fRec37_2[<i32>(0)];
        this.fRec37_3[<i32>(1)] = this.fRec37_3[<i32>(0)];
        this.fRec37_4[<i32>(1)] = this.fRec37_4[<i32>(0)];
        this.fRec37_5[<i32>(1)] = this.fRec37_5[<i32>(0)];
        this.fRec36[<i32>(1)] = this.fRec36[<i32>(0)];
        this.fRec36_1[<i32>(1)] = this.fRec36_1[<i32>(0)];
        this.fRec36_2[<i32>(1)] = this.fRec36_2[<i32>(0)];
        this.fRec36_3[<i32>(1)] = this.fRec36_3[<i32>(0)];
        this.fRec36_4[<i32>(1)] = this.fRec36_4[<i32>(0)];
        this.fRec36_5[<i32>(1)] = this.fRec36_5[<i32>(0)];
        this.fRec35[<i32>(1)] = this.fRec35[<i32>(0)];
        this.fRec35_1[<i32>(1)] = this.fRec35_1[<i32>(0)];
        this.fRec35_2[<i32>(1)] = this.fRec35_2[<i32>(0)];
        this.fRec35_3[<i32>(1)] = this.fRec35_3[<i32>(0)];
        this.fRec35_4[<i32>(1)] = this.fRec35_4[<i32>(0)];
        this.fRec35_5[<i32>(1)] = this.fRec35_5[<i32>(0)];
        this.fRec34[<i32>(1)] = this.fRec34[<i32>(0)];
        this.fRec34_1[<i32>(1)] = this.fRec34_1[<i32>(0)];
        this.fRec34_2[<i32>(1)] = this.fRec34_2[<i32>(0)];
        this.fRec34_3[<i32>(1)] = this.fRec34_3[<i32>(0)];
        this.fRec34_4[<i32>(1)] = this.fRec34_4[<i32>(0)];
        this.fRec34_5[<i32>(1)] = this.fRec34_5[<i32>(0)];
        this.fRec33[<i32>(1)] = this.fRec33[<i32>(0)];
        this.fRec33_1[<i32>(1)] = this.fRec33_1[<i32>(0)];
        this.fRec33_2[<i32>(1)] = this.fRec33_2[<i32>(0)];
        this.fRec33_3[<i32>(1)] = this.fRec33_3[<i32>(0)];
        this.fRec33_4[<i32>(1)] = this.fRec33_4[<i32>(0)];
        this.fRec33_5[<i32>(1)] = this.fRec33_5[<i32>(0)];
        this.fRec32[<i32>(1)] = this.fRec32[<i32>(0)];
        this.fRec32_1[<i32>(1)] = this.fRec32_1[<i32>(0)];
        this.fRec32_2[<i32>(1)] = this.fRec32_2[<i32>(0)];
        this.fRec32_3[<i32>(1)] = this.fRec32_3[<i32>(0)];
        this.fRec32_4[<i32>(1)] = this.fRec32_4[<i32>(0)];
        this.fRec32_5[<i32>(1)] = this.fRec32_5[<i32>(0)];
        this.fRec31[<i32>(1)] = this.fRec31[<i32>(0)];
        this.fRec31_1[<i32>(1)] = this.fRec31_1[<i32>(0)];
        this.fRec31_2[<i32>(1)] = this.fRec31_2[<i32>(0)];
        this.fRec31_3[<i32>(1)] = this.fRec31_3[<i32>(0)];
        this.fRec31_4[<i32>(1)] = this.fRec31_4[<i32>(0)];
        this.fRec31_5[<i32>(1)] = this.fRec31_5[<i32>(0)];
        this.fRec30[<i32>(1)] = this.fRec30[<i32>(0)];
        this.fRec30_1[<i32>(1)] = this.fRec30_1[<i32>(0)];
        this.fRec30_2[<i32>(1)] = this.fRec30_2[<i32>(0)];
        this.fRec30_3[<i32>(1)] = this.fRec30_3[<i32>(0)];
        this.fRec30_4[<i32>(1)] = this.fRec30_4[<i32>(0)];
        this.fRec30_5[<i32>(1)] = this.fRec30_5[<i32>(0)];
        this.fRec29[<i32>(1)] = this.fRec29[<i32>(0)];
        this.fRec29_1[<i32>(1)] = this.fRec29_1[<i32>(0)];
        this.fRec29_2[<i32>(1)] = this.fRec29_2[<i32>(0)];
        this.fRec29_3[<i32>(1)] = this.fRec29_3[<i32>(0)];
        this.fRec29_4[<i32>(1)] = this.fRec29_4[<i32>(0)];
        this.fRec29_5[<i32>(1)] = this.fRec29_5[<i32>(0)];
        this.fRec28[<i32>(1)] = this.fRec28[<i32>(0)];
        this.fRec28_1[<i32>(1)] = this.fRec28_1[<i32>(0)];
        this.fRec28_2[<i32>(1)] = this.fRec28_2[<i32>(0)];
        this.fRec28_3[<i32>(1)] = this.fRec28_3[<i32>(0)];
        this.fRec28_4[<i32>(1)] = this.fRec28_4[<i32>(0)];
        this.fRec28_5[<i32>(1)] = this.fRec28_5[<i32>(0)];
        this.fRec27[<i32>(1)] = this.fRec27[<i32>(0)];
        this.fRec27_1[<i32>(1)] = this.fRec27_1[<i32>(0)];
        this.fRec27_2[<i32>(1)] = this.fRec27_2[<i32>(0)];
        this.fRec27_3[<i32>(1)] = this.fRec27_3[<i32>(0)];
        this.fRec27_4[<i32>(1)] = this.fRec27_4[<i32>(0)];
        this.fRec27_5[<i32>(1)] = this.fRec27_5[<i32>(0)];
        this.fRec26[<i32>(1)] = this.fRec26[<i32>(0)];
        this.fRec26_1[<i32>(1)] = this.fRec26_1[<i32>(0)];
        this.fRec26_2[<i32>(1)] = this.fRec26_2[<i32>(0)];
        this.fRec26_3[<i32>(1)] = this.fRec26_3[<i32>(0)];
        this.fRec26_4[<i32>(1)] = this.fRec26_4[<i32>(0)];
        this.fRec26_5[<i32>(1)] = this.fRec26_5[<i32>(0)];
        this.fRec25[<i32>(1)] = this.fRec25[<i32>(0)];
        this.fRec25_1[<i32>(1)] = this.fRec25_1[<i32>(0)];
        this.fRec25_2[<i32>(1)] = this.fRec25_2[<i32>(0)];
        this.fRec25_3[<i32>(1)] = this.fRec25_3[<i32>(0)];
        this.fRec25_4[<i32>(1)] = this.fRec25_4[<i32>(0)];
        this.fRec25_5[<i32>(1)] = this.fRec25_5[<i32>(0)];
        this.fRec24[<i32>(1)] = this.fRec24[<i32>(0)];
        this.fRec24_1[<i32>(1)] = this.fRec24_1[<i32>(0)];
        this.fRec24_2[<i32>(1)] = this.fRec24_2[<i32>(0)];
        this.fRec24_3[<i32>(1)] = this.fRec24_3[<i32>(0)];
        this.fRec24_4[<i32>(1)] = this.fRec24_4[<i32>(0)];
        this.fRec24_5[<i32>(1)] = this.fRec24_5[<i32>(0)];
        this.fRec23[<i32>(1)] = this.fRec23[<i32>(0)];
        this.fRec23_1[<i32>(1)] = this.fRec23_1[<i32>(0)];
        this.fRec23_2[<i32>(1)] = this.fRec23_2[<i32>(0)];
        this.fRec23_3[<i32>(1)] = this.fRec23_3[<i32>(0)];
        this.fRec23_4[<i32>(1)] = this.fRec23_4[<i32>(0)];
        this.fRec23_5[<i32>(1)] = this.fRec23_5[<i32>(0)];
        this.fRec22[<i32>(1)] = this.fRec22[<i32>(0)];
        this.fRec22_1[<i32>(1)] = this.fRec22_1[<i32>(0)];
        this.fRec22_2[<i32>(1)] = this.fRec22_2[<i32>(0)];
        this.fRec22_3[<i32>(1)] = this.fRec22_3[<i32>(0)];
        this.fRec22_4[<i32>(1)] = this.fRec22_4[<i32>(0)];
        this.fRec22_5[<i32>(1)] = this.fRec22_5[<i32>(0)];
        this.fRec21[<i32>(1)] = this.fRec21[<i32>(0)];
        this.fRec21_1[<i32>(1)] = this.fRec21_1[<i32>(0)];
        this.fRec21_2[<i32>(1)] = this.fRec21_2[<i32>(0)];
        this.fRec21_3[<i32>(1)] = this.fRec21_3[<i32>(0)];
        this.fRec21_4[<i32>(1)] = this.fRec21_4[<i32>(0)];
        this.fRec21_5[<i32>(1)] = this.fRec21_5[<i32>(0)];
        this.fRec20[<i32>(1)] = this.fRec20[<i32>(0)];
        this.fRec20_1[<i32>(1)] = this.fRec20_1[<i32>(0)];
        this.fRec20_2[<i32>(1)] = this.fRec20_2[<i32>(0)];
        this.fRec20_3[<i32>(1)] = this.fRec20_3[<i32>(0)];
        this.fRec20_4[<i32>(1)] = this.fRec20_4[<i32>(0)];
        this.fRec20_5[<i32>(1)] = this.fRec20_5[<i32>(0)];
        this.fRec19[<i32>(1)] = this.fRec19[<i32>(0)];
        this.fRec19_1[<i32>(1)] = this.fRec19_1[<i32>(0)];
        this.fRec19_2[<i32>(1)] = this.fRec19_2[<i32>(0)];
        this.fRec19_3[<i32>(1)] = this.fRec19_3[<i32>(0)];
        this.fRec19_4[<i32>(1)] = this.fRec19_4[<i32>(0)];
        this.fRec19_5[<i32>(1)] = this.fRec19_5[<i32>(0)];
        this.fRec18[<i32>(1)] = this.fRec18[<i32>(0)];
        this.fRec18_1[<i32>(1)] = this.fRec18_1[<i32>(0)];
        this.fRec18_2[<i32>(1)] = this.fRec18_2[<i32>(0)];
        this.fRec18_3[<i32>(1)] = this.fRec18_3[<i32>(0)];
        this.fRec18_4[<i32>(1)] = this.fRec18_4[<i32>(0)];
        this.fRec18_5[<i32>(1)] = this.fRec18_5[<i32>(0)];
        this.fRec17[<i32>(1)] = this.fRec17[<i32>(0)];
        this.fRec17_1[<i32>(1)] = this.fRec17_1[<i32>(0)];
        this.fRec17_2[<i32>(1)] = this.fRec17_2[<i32>(0)];
        this.fRec17_3[<i32>(1)] = this.fRec17_3[<i32>(0)];
        this.fRec17_4[<i32>(1)] = this.fRec17_4[<i32>(0)];
        this.fRec17_5[<i32>(1)] = this.fRec17_5[<i32>(0)];
        this.fRec16[<i32>(1)] = this.fRec16[<i32>(0)];
        this.fRec16_1[<i32>(1)] = this.fRec16_1[<i32>(0)];
        this.fRec16_2[<i32>(1)] = this.fRec16_2[<i32>(0)];
        this.fRec16_3[<i32>(1)] = this.fRec16_3[<i32>(0)];
        this.fRec16_4[<i32>(1)] = this.fRec16_4[<i32>(0)];
        this.fRec16_5[<i32>(1)] = this.fRec16_5[<i32>(0)];
        this.fRec15[<i32>(1)] = this.fRec15[<i32>(0)];
        this.fRec15_1[<i32>(1)] = this.fRec15_1[<i32>(0)];
        this.fRec15_2[<i32>(1)] = this.fRec15_2[<i32>(0)];
        this.fRec15_3[<i32>(1)] = this.fRec15_3[<i32>(0)];
        this.fRec15_4[<i32>(1)] = this.fRec15_4[<i32>(0)];
        this.fRec15_5[<i32>(1)] = this.fRec15_5[<i32>(0)];
        this.fRec14[<i32>(1)] = this.fRec14[<i32>(0)];
        this.fRec14_1[<i32>(1)] = this.fRec14_1[<i32>(0)];
        this.fRec14_2[<i32>(1)] = this.fRec14_2[<i32>(0)];
        this.fRec14_3[<i32>(1)] = this.fRec14_3[<i32>(0)];
        this.fRec14_4[<i32>(1)] = this.fRec14_4[<i32>(0)];
        this.fRec14_5[<i32>(1)] = this.fRec14_5[<i32>(0)];
        this.fRec13[<i32>(1)] = this.fRec13[<i32>(0)];
        this.fRec13_1[<i32>(1)] = this.fRec13_1[<i32>(0)];
        this.fRec13_2[<i32>(1)] = this.fRec13_2[<i32>(0)];
        this.fRec13_3[<i32>(1)] = this.fRec13_3[<i32>(0)];
        this.fRec13_4[<i32>(1)] = this.fRec13_4[<i32>(0)];
        this.fRec13_5[<i32>(1)] = this.fRec13_5[<i32>(0)];
        this.fRec12[<i32>(1)] = this.fRec12[<i32>(0)];
        this.fRec12_1[<i32>(1)] = this.fRec12_1[<i32>(0)];
        this.fRec12_2[<i32>(1)] = this.fRec12_2[<i32>(0)];
        this.fRec12_3[<i32>(1)] = this.fRec12_3[<i32>(0)];
        this.fRec12_4[<i32>(1)] = this.fRec12_4[<i32>(0)];
        this.fRec12_5[<i32>(1)] = this.fRec12_5[<i32>(0)];
        this.fRec11[<i32>(1)] = this.fRec11[<i32>(0)];
        this.fRec11_1[<i32>(1)] = this.fRec11_1[<i32>(0)];
        this.fRec11_2[<i32>(1)] = this.fRec11_2[<i32>(0)];
        this.fRec11_3[<i32>(1)] = this.fRec11_3[<i32>(0)];
        this.fRec11_4[<i32>(1)] = this.fRec11_4[<i32>(0)];
        this.fRec11_5[<i32>(1)] = this.fRec11_5[<i32>(0)];
        this.fRec10[<i32>(1)] = this.fRec10[<i32>(0)];
        this.fRec10_1[<i32>(1)] = this.fRec10_1[<i32>(0)];
        this.fRec10_2[<i32>(1)] = this.fRec10_2[<i32>(0)];
        this.fRec10_3[<i32>(1)] = this.fRec10_3[<i32>(0)];
        this.fRec10_4[<i32>(1)] = this.fRec10_4[<i32>(0)];
        this.fRec10_5[<i32>(1)] = this.fRec10_5[<i32>(0)];
        this.fRec9[<i32>(1)] = this.fRec9[<i32>(0)];
        this.fRec9_1[<i32>(1)] = this.fRec9_1[<i32>(0)];
        this.fRec9_2[<i32>(1)] = this.fRec9_2[<i32>(0)];
        this.fRec9_3[<i32>(1)] = this.fRec9_3[<i32>(0)];
        this.fRec9_4[<i32>(1)] = this.fRec9_4[<i32>(0)];
        this.fRec9_5[<i32>(1)] = this.fRec9_5[<i32>(0)];
        this.fRec8[<i32>(1)] = this.fRec8[<i32>(0)];
        this.fRec8_1[<i32>(1)] = this.fRec8_1[<i32>(0)];
        this.fRec8_2[<i32>(1)] = this.fRec8_2[<i32>(0)];
        this.fRec8_3[<i32>(1)] = this.fRec8_3[<i32>(0)];
        this.fRec8_4[<i32>(1)] = this.fRec8_4[<i32>(0)];
        this.fRec8_5[<i32>(1)] = this.fRec8_5[<i32>(0)];
        this.fRec7[<i32>(1)] = this.fRec7[<i32>(0)];
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fRec7_2[<i32>(1)] = this.fRec7_2[<i32>(0)];
        this.fRec7_3[<i32>(1)] = this.fRec7_3[<i32>(0)];
        this.fRec7_4[<i32>(1)] = this.fRec7_4[<i32>(0)];
        this.fRec7_5[<i32>(1)] = this.fRec7_5[<i32>(0)];
        this.fRec6[<i32>(1)] = this.fRec6[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec6_2[<i32>(1)] = this.fRec6_2[<i32>(0)];
        this.fRec6_3[<i32>(1)] = this.fRec6_3[<i32>(0)];
        this.fRec6_4[<i32>(1)] = this.fRec6_4[<i32>(0)];
        this.fRec6_5[<i32>(1)] = this.fRec6_5[<i32>(0)];
        this.fRec5[<i32>(1)] = this.fRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec5_2[<i32>(1)] = this.fRec5_2[<i32>(0)];
        this.fRec5_3[<i32>(1)] = this.fRec5_3[<i32>(0)];
        this.fRec5_4[<i32>(1)] = this.fRec5_4[<i32>(0)];
        this.fRec5_5[<i32>(1)] = this.fRec5_5[<i32>(0)];
        this.fRec4[<i32>(1)] = this.fRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec4_2[<i32>(1)] = this.fRec4_2[<i32>(0)];
        this.fRec4_3[<i32>(1)] = this.fRec4_3[<i32>(0)];
        this.fRec4_4[<i32>(1)] = this.fRec4_4[<i32>(0)];
        this.fRec4_5[<i32>(1)] = this.fRec4_5[<i32>(0)];
        this.fRec3[<i32>(1)] = this.fRec3[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec3_2[<i32>(1)] = this.fRec3_2[<i32>(0)];
        this.fRec3_3[<i32>(1)] = this.fRec3_3[<i32>(0)];
        this.fRec3_4[<i32>(1)] = this.fRec3_4[<i32>(0)];
        this.fRec3_5[<i32>(1)] = this.fRec3_5[<i32>(0)];
        this.fRec2[<i32>(1)] = this.fRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec2_2[<i32>(1)] = this.fRec2_2[<i32>(0)];
        this.fRec2_3[<i32>(1)] = this.fRec2_3[<i32>(0)];
        this.fRec2_4[<i32>(1)] = this.fRec2_4[<i32>(0)];
        this.fRec2_5[<i32>(1)] = this.fRec2_5[<i32>(0)];
        this.fRec1[<i32>(1)] = this.fRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec1_2[<i32>(1)] = this.fRec1_2[<i32>(0)];
        this.fRec1_3[<i32>(1)] = this.fRec1_3[<i32>(0)];
        this.fRec1_4[<i32>(1)] = this.fRec1_4[<i32>(0)];
        this.fRec1_5[<i32>(1)] = this.fRec1_5[<i32>(0)];
        this.fRec0[<i32>(1)] = this.fRec0[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec0_2[<i32>(1)] = this.fRec0_2[<i32>(0)];
        this.fRec0_3[<i32>(1)] = this.fRec0_3[<i32>(0)];
        this.fRec0_4[<i32>(1)] = this.fRec0_4[<i32>(0)];
        this.fRec0_5[<i32>(1)] = this.fRec0_5[<i32>(0)];
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class MpianoChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _damping: f32 = <f32>(1);
    /** damping [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get damping(): f32 { return this._damping; }
    set damping(value: f32) { this._damping = value; this._paramsDirty = true; }
    private _hammerTone: f32 = <f32>(1);
    /** hammer_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get hammerTone(): f32 { return this._hammerTone; }
    set hammerTone(value: f32) { this._hammerTone = value; this._paramsDirty = true; }

    readonly effectDsp: MpianoEffectDsp = new MpianoEffectDsp();
    private efin: StaticArray<f32> = new StaticArray<f32>(2);
    private efout: StaticArray<f32> = new StaticArray<f32>(2);

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this.effectDsp.init(<i32>SAMPLERATE);
    }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mpiano).applyParams();
        }
        this.effectDsp.control();
    }

    preprocess(): void {
        if (this._paramsDirty) {
            this._paramsDirty = false;
            this.applyParams();
        }
        this.efin[0] = this.signal.left;
        this.efin[1] = this.signal.right;
        this.effectDsp.frame(this.efin, this.efout);
        this.signal.left = this.efout[0];
        this.signal.right = this.efout[1];
    }

    controlchange(controller: u8, value: u8): void {
        super.controlchange(controller, value);
        switch (controller) {
            case 0:
                this.damping = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.hammerTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MpianoChannel(10, (channel: MidiChannel) => new Mpiano(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // damping (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // hammer tone (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
}

export function postprocess(): void {
}
