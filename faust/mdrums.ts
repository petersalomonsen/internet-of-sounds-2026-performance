// Faust-generated Mdrums
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mdrums.dsp

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

export class MdrumsDsp {
    fSampleRate: i32;
    fVec4643: StaticArray<f32> = new StaticArray<f32>(2);
    fVec10371: StaticArray<f32> = new StaticArray<f32>(2);
    fVec10385: StaticArray<f32> = new StaticArray<f32>(2);
    fVec10682: StaticArray<f32> = new StaticArray<f32>(2);
    fVec10696: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fHslider1: f32;
    iSlow0: i32;
    iSlow1: i32;
    fSlow0: f32;
    fHslider2: f32;
    fSlow1: f32;
    fSlow2: f32;
    fHslider3: f32;
    fSlow3: f32;
    fHslider4: f32;
    fSlow4: f32;
    fHslider5: f32;
    fSlow5: f32;
    fSlow6: f32;
    fSlow7: f32;
    fHslider6: f32;
    fSlow8: f32;
    fHslider7: f32;
    fSlow9: f32;
    fConst0: f32;
    fConst7: f32;
    fConst8: f32;
    fConst13: f32;
    fConst14: f32;
    fConst20: f32;
    fConst21: f32;
    fConst26: f32;
    fConst27: f32;
    fConst28: f32;
    fConst29: f32;
    fConst30: f32;
    fConst31: f32;
    fConst32: f32;
    fConst33: f32;
    fConst35: f32;
    fConst36: f32;
    fConst41: f32;
    fConst46: f32;
    fConst51: f32;
    fConst56: f32;
    fConst61: f32;
    fConst66: f32;
    fConst68: f32;
    fConst69: f32;
    fConst71: f32;
    fConst72: f32;
    fConst74: f32;
    fConst75: f32;
    fConst77: f32;
    fConst78: f32;
    fConst80: f32;
    fConst81: f32;
    fConst83: f32;
    fConst84: f32;
    fConst86: f32;
    fConst88: f32;
    fConst90: f32;
    fConst92: f32;
    fConst94: f32;
    fConst96: f32;
    fConst102: f32;
    fConst108: f32;
    fConst109: f32;
    fConst110: f32;
    fConst111: f32;
    fConst112: f32;
    fConst125: f32;
    fConst137: f32;
    fConst150: f32;
    fConst165: f32;
    fConst170: f32;
    fConst175: f32;
    fConst180: f32;
    fConst185: f32;
    fConst186: f32;
    fConst187: f32;
    fConst199: f32;
    fConst213: f32;
    fConst217: f32;
    fConst221: f32;
    fConst225: f32;
    fConst230: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(512);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    fRec1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec3: StaticArray<i32> = new StaticArray<i32>(2);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec5: StaticArray<i32> = new StaticArray<i32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(512);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec10: i32;
    iRec11: StaticArray<i32> = new StaticArray<i32>(2);
    iRec11_1: StaticArray<i32> = new StaticArray<i32>(2);
    iRec12: i32;
    fRec13: f32;
    fRec14: f32;
    fRec15: f32;
    fRec16: f32;
    fRec17: f32;
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
        // ui openbox mdrums
        // ui slider cymbal_level
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui slider hat_level
        // ui slider kick_level
        // ui slider snare_level
        // ui slider tom_level
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider1 = 261.6300048828125;
        this.fHslider2 = 0.800000011920929;
        this.fHslider3 = 1.0;
        this.fHslider4 = 1.0;
        this.fHslider5 = 1.0;
        this.fHslider6 = 1.0;
        this.fHslider7 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            unchecked(this.fVec4643[lDelay0] = 0.0);
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            unchecked(this.fVec10371[lDelay1] = 0.0);
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            unchecked(this.fVec10385[lDelay2] = 0.0);
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            unchecked(this.fVec10682[lDelay3] = 0.0);
        }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) {
            unchecked(this.fVec10696[lDelay4] = 0.0);
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(512); lRec5 = lRec5 + 1) {
            unchecked(this.fRec0[lRec5] = 0.0);
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            unchecked(this.fRec0_1[lRec6] = 0.0);
        }
        this.fIOTA = <i32>(0);
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            unchecked(this.fRec1[lRec7] = 0.0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            unchecked(this.fRec1_1[lRec8] = 0.0);
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            unchecked(this.fRec1_2[lRec9] = 0.0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            unchecked(this.fRec2[lRec10] = 0.0);
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            unchecked(this.fRec2_1[lRec11] = 0.0);
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            unchecked(this.fRec2_2[lRec12] = 0.0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            unchecked(this.fRec2_3[lRec13] = 0.0);
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            unchecked(this.iRec3[lRec14] = <i32>(0));
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            unchecked(this.fRec3_1[lRec15] = 0.0);
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            unchecked(this.fRec4[lRec16] = 0.0);
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            unchecked(this.fRec4_1[lRec17] = 0.0);
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            unchecked(this.fRec4_2[lRec18] = 0.0);
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            unchecked(this.fRec4_3[lRec19] = 0.0);
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            unchecked(this.iRec5[lRec20] = <i32>(0));
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            unchecked(this.fRec5_1[lRec21] = 0.0);
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(512); lRec22 = lRec22 + 1) {
            unchecked(this.fRec6[lRec22] = 0.0);
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            unchecked(this.fRec6_1[lRec23] = 0.0);
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            unchecked(this.fRec7[lRec24] = 0.0);
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            unchecked(this.fRec7_1[lRec25] = 0.0);
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            unchecked(this.fRec7_2[lRec26] = 0.0);
        }
        for (let lRec27: i32 = 0; lRec27 < <i32>(2); lRec27 = lRec27 + 1) {
            unchecked(this.fRec8[lRec27] = 0.0);
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(2); lRec28 = lRec28 + 1) {
            unchecked(this.fRec8_1[lRec28] = 0.0);
        }
        for (let lRec29: i32 = 0; lRec29 < <i32>(2); lRec29 = lRec29 + 1) {
            unchecked(this.fRec8_2[lRec29] = 0.0);
        }
        for (let lRec30: i32 = 0; lRec30 < <i32>(2); lRec30 = lRec30 + 1) {
            unchecked(this.fRec8_3[lRec30] = 0.0);
        }
        for (let lRec31: i32 = 0; lRec31 < <i32>(2); lRec31 = lRec31 + 1) {
            unchecked(this.fRec9[lRec31] = 0.0);
        }
        for (let lRec32: i32 = 0; lRec32 < <i32>(2); lRec32 = lRec32 + 1) {
            unchecked(this.fRec9_1[lRec32] = 0.0);
        }
        for (let lRec33: i32 = 0; lRec33 < <i32>(2); lRec33 = lRec33 + 1) {
            unchecked(this.fRec9_2[lRec33] = 0.0);
        }
        for (let lRec34: i32 = 0; lRec34 < <i32>(2); lRec34 = lRec34 + 1) {
            unchecked(this.fRec9_3[lRec34] = 0.0);
        }
        this.iRec10 = <i32>(0);
        for (let lRec35: i32 = 0; lRec35 < <i32>(2); lRec35 = lRec35 + 1) {
            unchecked(this.iRec11[lRec35] = <i32>(0));
        }
        for (let lRec36: i32 = 0; lRec36 < <i32>(2); lRec36 = lRec36 + 1) {
            unchecked(this.iRec11_1[lRec36] = <i32>(0));
        }
        this.iRec12 = <i32>(0);
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.fRec17 = 0.0;
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
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        let fConst1: f32 = (6.2831854820251465 / this.fConst0);
        let fConst2: f32 = ((this.fConst0 * 0.5) - 1000.0);
        let fConst3: f32 = (fConst1 * min<f32>(140.0, fConst2));
        let fConst4: f32 = Mathf.cos(fConst3);
        let fConst5: f32 = (0.7071067690849304 * Mathf.sin(fConst3));
        let fConst6: f32 = (fConst5 + 1.0);
        this.fConst7 = ((1.0 - fConst4) / fConst6);
        this.fConst8 = (0.5 * this.fConst7);
        let fConst9: f32 = (fConst1 * min<f32>(10000.0, fConst2));
        let fConst10: f32 = Mathf.cos(fConst9);
        let fConst11: f32 = (0.7071067690849304 * Mathf.sin(fConst9));
        let fConst12: f32 = (fConst11 + 1.0);
        this.fConst13 = ((1.0 - fConst10) / fConst12);
        this.fConst14 = (0.5 * this.fConst13);
        let fConst15: f32 = (fConst1 * min<f32>(20000.0, fConst2));
        let fConst16: f32 = Mathf.cos(fConst15);
        let fConst17: f32 = (1.0 - fConst16);
        let fConst18: f32 = (0.7071067690849304 * Mathf.sin(fConst15));
        let fConst19: f32 = (fConst18 + 1.0);
        this.fConst20 = (fConst17 / fConst19);
        this.fConst21 = (0.5 * this.fConst20);
        let fConst22: f32 = (fConst1 * min<f32>(1000.0, fConst2));
        let fConst23: f32 = Mathf.cos(fConst22);
        let fConst24: f32 = (0.7071067690849304 * Mathf.sin(fConst22));
        let fConst25: f32 = (fConst24 + 1.0);
        this.fConst26 = ((1.0 - fConst23) / fConst25);
        this.fConst27 = (0.5 * this.fConst26);
        this.fConst28 = (-2.0 * (fConst4 / fConst6));
        this.fConst29 = (-2.0 * (fConst10 / fConst12));
        this.fConst30 = (-2.0 * (fConst16 / fConst19));
        this.fConst31 = (-2.0 * (fConst23 / fConst25));
        this.fConst32 = ((1.0 - fConst5) / fConst6);
        this.fConst33 = ((1.0 - fConst11) / fConst12);
        let fConst34: f32 = (1.0 - fConst18);
        this.fConst35 = (fConst34 / fConst19);
        this.fConst36 = ((1.0 - fConst24) / fConst25);
        let fConst37: f32 = (fConst1 * min<f32>(600.0, fConst2));
        let fConst38: f32 = Mathf.cos(fConst37);
        let fConst39: f32 = (0.7071067690849304 * Mathf.sin(fConst37));
        let fConst40: f32 = (fConst39 + 1.0);
        this.fConst41 = (-2.0 * (fConst38 / fConst40));
        let fConst42: f32 = (fConst1 * min<f32>(1660.0, fConst2));
        let fConst43: f32 = Mathf.cos(fConst42);
        let fConst44: f32 = (0.7071067690849304 * Mathf.sin(fConst42));
        let fConst45: f32 = (fConst44 + 1.0);
        this.fConst46 = (-2.0 * (fConst43 / fConst45));
        let fConst47: f32 = (fConst1 * min<f32>(3350.0, fConst2));
        let fConst48: f32 = Mathf.cos(fConst47);
        let fConst49: f32 = (0.7071067690849304 * Mathf.sin(fConst47));
        let fConst50: f32 = (fConst49 + 1.0);
        this.fConst51 = (-2.0 * (fConst48 / fConst50));
        let fConst52: f32 = (fConst1 * min<f32>(3850.0, fConst2));
        let fConst53: f32 = Mathf.cos(fConst52);
        let fConst54: f32 = (0.7071067690849304 * Mathf.sin(fConst52));
        let fConst55: f32 = (fConst54 + 1.0);
        this.fConst56 = (-2.0 * (fConst53 / fConst55));
        let fConst57: f32 = (fConst1 * min<f32>(4350.0, fConst2));
        let fConst58: f32 = Mathf.cos(fConst57);
        let fConst59: f32 = (0.7071067690849304 * Mathf.sin(fConst57));
        let fConst60: f32 = (fConst59 + 1.0);
        this.fConst61 = (-2.0 * (fConst58 / fConst60));
        let fConst62: f32 = (fConst1 * min<f32>(4850.0, fConst2));
        let fConst63: f32 = Mathf.cos(fConst62);
        let fConst64: f32 = (0.7071067690849304 * Mathf.sin(fConst62));
        let fConst65: f32 = (fConst64 + 1.0);
        this.fConst66 = (-2.0 * (fConst63 / fConst65));
        let fConst67: f32 = (1.0 - fConst38);
        this.fConst68 = (fConst67 / fConst40);
        this.fConst69 = (0.5 * this.fConst68);
        let fConst70: f32 = (1.0 - fConst43);
        this.fConst71 = (fConst70 / fConst45);
        this.fConst72 = (0.5 * this.fConst71);
        let fConst73: f32 = (1.0 - fConst48);
        this.fConst74 = (fConst73 / fConst50);
        this.fConst75 = (0.5 * this.fConst74);
        let fConst76: f32 = (1.0 - fConst53);
        this.fConst77 = (fConst76 / fConst55);
        this.fConst78 = (0.5 * this.fConst77);
        let fConst79: f32 = (1.0 - fConst58);
        this.fConst80 = (fConst79 / fConst60);
        this.fConst81 = (0.5 * this.fConst80);
        let fConst82: f32 = (1.0 - fConst63);
        this.fConst83 = (fConst82 / fConst65);
        this.fConst84 = (0.5 * this.fConst83);
        let fConst85: f32 = (1.0 - fConst39);
        this.fConst86 = (fConst85 / fConst40);
        let fConst87: f32 = (1.0 - fConst44);
        this.fConst88 = (fConst87 / fConst45);
        let fConst89: f32 = (1.0 - fConst49);
        this.fConst90 = (fConst89 / fConst50);
        let fConst91: f32 = (1.0 - fConst54);
        this.fConst92 = (fConst91 / fConst55);
        let fConst93: f32 = (1.0 - fConst59);
        this.fConst94 = (fConst93 / fConst60);
        let fConst95: f32 = (1.0 - fConst64);
        this.fConst96 = (fConst95 / fConst65);
        let fConst97: f32 = (fConst1 * min<f32>(300.0, fConst2));
        let fConst98: f32 = Mathf.cos(fConst97);
        let fConst99: f32 = (0.7071067690849304 * Mathf.sin(fConst97));
        let fConst100: f32 = (fConst99 + 1.0);
        let fConst101: f32 = ((fConst98 + 1.0) / fConst100);
        this.fConst102 = (0.5 * fConst101);
        let fConst103: f32 = (fConst1 * min<f32>(1200.0, fConst2));
        let fConst104: f32 = Mathf.cos(fConst103);
        let fConst105: f32 = (0.7071067690849304 * Mathf.sin(fConst103));
        let fConst106: f32 = (fConst105 + 1.0);
        let fConst107: f32 = ((fConst104 + 1.0) / fConst106);
        this.fConst108 = (0.5 * fConst107);
        this.fConst109 = (-2.0 * (fConst98 / fConst100));
        this.fConst110 = (-2.0 * (fConst104 / fConst106));
        this.fConst111 = ((1.0 - fConst99) / fConst100);
        this.fConst112 = ((1.0 - fConst105) / fConst106);
        let fConst113: f32 = (-1.0 * (12567.626953125 / this.fConst0));
        let fConst114: f32 = Mathf.sin(fConst113);
        let fConst115: f32 = (-1.0 * (6283.8134765625 / this.fConst0));
        let fConst116: f32 = Mathf.sin(fConst115);
        let fConst117: f32 = ((fConst114 * 0.5) + fConst116);
        let fConst118: f32 = Mathf.cos(fConst113);
        let fConst119: f32 = Mathf.cos(fConst115);
        let fConst120: f32 = ((((fConst118 * fConst85) - ((fConst119 * 2.0) * fConst38)) / fConst40) + 1.0);
        let fConst121: f32 = ((0.5 * (1.0 + fConst118)) + fConst119);
        let fConst122: f32 = ((fConst114 * fConst85) - ((fConst116 * 2.0) * fConst38));
        let fConst123: f32 = Mathf.pow(fConst40, 2.0);
        let fConst124: f32 = (fConst40 * (Mathf.pow(fConst120, 2.0) + (Mathf.pow(fConst122, 2.0) / fConst123)));
        this.fConst125 = (this.fConst0 * ((0.0001591390318935737 * Mathf.atan2(((fConst67 * ((fConst117 * fConst120) - ((fConst121 * fConst122) / fConst40))) / fConst124), ((fConst67 * ((fConst120 * fConst121) + ((fConst117 * fConst122) / fConst40))) / fConst124))) + 0.000999900046736002));
        let fConst126: f32 = (-1.0 * (17592.91796875 / this.fConst0));
        let fConst127: f32 = Mathf.sin(fConst126);
        let fConst128: f32 = (-1.0 * (8796.458984375 / this.fConst0));
        let fConst129: f32 = Mathf.sin(fConst128);
        let fConst130: f32 = ((fConst127 * 0.5) + fConst129);
        let fConst131: f32 = Mathf.cos(fConst126);
        let fConst132: f32 = Mathf.cos(fConst128);
        let fConst133: f32 = ((((fConst131 * fConst87) - ((fConst132 * 2.0) * fConst43)) / fConst45) + 1.0);
        let fConst134: f32 = ((0.5 * (1.0 + fConst131)) + fConst132);
        let fConst135: f32 = ((fConst127 * fConst87) - ((fConst129 * 2.0) * fConst43));
        let fConst136: f32 = (fConst45 * (Mathf.pow(fConst133, 2.0) + (Mathf.pow(fConst135, 2.0) / Mathf.pow(fConst45, 2.0))));
        this.fConst137 = (this.fConst0 * ((0.0001136821010732092 * Mathf.atan2(((fConst70 * ((fConst130 * fConst133) - ((fConst134 * fConst135) / fConst45))) / fConst136), ((fConst70 * ((fConst133 * fConst134) + ((fConst130 * fConst135) / fConst45))) / fConst136))) + 0.0007142857066355646));
        let fConst138: f32 = (-1.0 * (90477.8671875 / this.fConst0));
        let fConst139: f32 = Mathf.sin(fConst138);
        let fConst140: f32 = (-1.0 * (45238.93359375 / this.fConst0));
        let fConst141: f32 = Mathf.sin(fConst140);
        let fConst142: f32 = ((fConst139 * 0.5) + fConst141);
        let fConst143: f32 = Mathf.cos(fConst138);
        let fConst144: f32 = Mathf.cos(fConst140);
        let fConst145: f32 = ((((fConst143 * fConst34) - ((fConst144 * 2.0) * fConst16)) / fConst19) + 1.0);
        let fConst146: f32 = ((0.5 * (1.0 + fConst143)) + fConst144);
        let fConst147: f32 = ((fConst139 * fConst34) - ((fConst141 * 2.0) * fConst16));
        let fConst148: f32 = Mathf.pow(fConst19, 2.0);
        let fConst149: f32 = (fConst19 * (Mathf.pow(fConst145, 2.0) + (Mathf.pow(fConst147, 2.0) / fConst148)));
        this.fConst150 = (this.fConst0 * ((0.000022104853997007012 * Mathf.atan2(((fConst17 * ((fConst142 * fConst145) - ((fConst146 * fConst147) / fConst19))) / fConst149), ((fConst17 * ((fConst145 * fConst146) + ((fConst142 * fConst147) / fConst19))) / fConst149))) + 0.00013888889225199819));
        let fConst151: f32 = (-1.0 * (248814.140625 / this.fConst0));
        let fConst152: f32 = Mathf.sin(fConst151);
        let fConst153: f32 = (-1.0 * (124407.0703125 / this.fConst0));
        let fConst154: f32 = Mathf.sin(fConst153);
        let fConst155: f32 = ((fConst152 * 0.5) + fConst154);
        let fConst156: f32 = Mathf.cos(fConst151);
        let fConst157: f32 = Mathf.cos(fConst153);
        let fConst158: f32 = (fConst157 * 2.0);
        let fConst159: f32 = ((((fConst156 * fConst89) - (fConst158 * fConst48)) / fConst50) + 1.0);
        let fConst160: f32 = ((0.5 * (1.0 + fConst156)) + fConst157);
        let fConst161: f32 = (fConst154 * 2.0);
        let fConst162: f32 = ((fConst152 * fConst89) - (fConst161 * fConst48));
        let fConst163: f32 = Mathf.pow(fConst50, 2.0);
        let fConst164: f32 = (fConst50 * (Mathf.pow(fConst159, 2.0) + (Mathf.pow(fConst162, 2.0) / fConst163)));
        this.fConst165 = (this.fConst0 * ((0.000008038128726184368 * Mathf.atan2(((fConst73 * ((fConst155 * fConst159) - ((fConst160 * fConst162) / fConst50))) / fConst164), ((fConst73 * ((fConst159 * fConst160) + ((fConst155 * fConst162) / fConst50))) / fConst164))) + 0.000050505052058724687));
        let fConst166: f32 = ((((fConst156 * fConst91) - (fConst158 * fConst53)) / fConst55) + 1.0);
        let fConst167: f32 = ((fConst152 * fConst91) - (fConst161 * fConst53));
        let fConst168: f32 = Mathf.pow(fConst55, 2.0);
        let fConst169: f32 = (fConst55 * (Mathf.pow(fConst166, 2.0) + (Mathf.pow(fConst167, 2.0) / fConst168)));
        this.fConst170 = (this.fConst0 * ((0.000008038128726184368 * Mathf.atan2(((fConst76 * ((fConst155 * fConst166) - ((fConst160 * fConst167) / fConst55))) / fConst169), ((fConst76 * ((fConst160 * fConst166) + ((fConst155 * fConst167) / fConst55))) / fConst169))) + 0.000050505052058724687));
        let fConst171: f32 = ((((fConst156 * fConst93) - (fConst158 * fConst58)) / fConst60) + 1.0);
        let fConst172: f32 = ((fConst152 * fConst93) - (fConst161 * fConst58));
        let fConst173: f32 = Mathf.pow(fConst60, 2.0);
        let fConst174: f32 = (fConst60 * (Mathf.pow(fConst171, 2.0) + (Mathf.pow(fConst172, 2.0) / fConst173)));
        this.fConst175 = (this.fConst0 * ((0.000008038128726184368 * Mathf.atan2(((fConst79 * ((fConst155 * fConst171) - ((fConst160 * fConst172) / fConst60))) / fConst174), ((fConst79 * ((fConst160 * fConst171) + ((fConst155 * fConst172) / fConst60))) / fConst174))) + 0.000050505052058724687));
        let fConst176: f32 = ((((fConst156 * fConst95) - (fConst158 * fConst63)) / fConst65) + 1.0);
        let fConst177: f32 = ((fConst152 * fConst95) - (fConst161 * fConst63));
        let fConst178: f32 = Mathf.pow(fConst65, 2.0);
        let fConst179: f32 = (fConst65 * (Mathf.pow(fConst176, 2.0) + (Mathf.pow(fConst177, 2.0) / fConst178)));
        this.fConst180 = (this.fConst0 * ((0.000008038128726184368 * Mathf.atan2(((fConst82 * ((fConst155 * fConst176) - ((fConst160 * fConst177) / fConst65))) / fConst179), ((fConst82 * ((fConst160 * fConst176) + ((fConst155 * fConst177) / fConst65))) / fConst179))) + 0.000050505052058724687));
        let fConst231: f32 = ((0.3128689229488373 * fConst16) + (0.30901700258255005 * fConst34));
        let fConst181: f32 = fConst231;
        let fConst182: f32 = (fConst181 / fConst19);
        let fConst232: f32 = ((((1.9753767251968384 * fConst16) + (0.9510565400123596 * fConst34)) / fConst19) + 1.0);
        let fConst183: f32 = fConst232;
        let fConst184: f32 = (fConst19 * (Mathf.pow(fConst183, 2.0) + (Mathf.pow(fConst181, 2.0) / fConst148)));
        this.fConst185 = ((0.33506304025650024 * Mathf.atan2(((fConst17 * ((0.012160082347691059 * fConst182) - (0.0019259678665548563 * fConst183))) / fConst184), (-1.0 * ((fConst17 * ((0.012160082347691059 * fConst183) + (0.0019259678665548563 * fConst182))) / fConst184)))) + 2.1052632331848145);
        this.fConst186 = (-1.0 * fConst101);
        this.fConst187 = (-1.0 * fConst107);
        let fConst188: f32 = (-1.0 * (12565.1142578125 / this.fConst0));
        let fConst189: f32 = Mathf.sin(fConst188);
        let fConst190: f32 = (-1.0 * (6282.55712890625 / this.fConst0));
        let fConst191: f32 = Mathf.sin(fConst190);
        let fConst192: f32 = ((fConst189 * 0.5) + fConst191);
        let fConst193: f32 = Mathf.cos(fConst188);
        let fConst194: f32 = Mathf.cos(fConst190);
        let fConst195: f32 = ((((fConst193 * fConst85) - ((fConst194 * 2.0) * fConst38)) / fConst40) + 1.0);
        let fConst196: f32 = ((0.5 * (1.0 + fConst193)) + fConst194);
        let fConst197: f32 = ((fConst189 * fConst85) - ((fConst191 * 2.0) * fConst38));
        let fConst198: f32 = (fConst40 * (Mathf.pow(fConst195, 2.0) + (Mathf.pow(fConst197, 2.0) / fConst123)));
        this.fConst199 = (this.fConst0 * ((0.00015917085693217814 * Mathf.atan2(((fConst67 * ((fConst192 * fConst195) - ((fConst196 * fConst197) / fConst40))) / fConst198), ((fConst67 * ((fConst195 * fConst196) + ((fConst192 * fConst197) / fConst40))) / fConst198))) + 0.0010001000482589006));
        let fConst200: f32 = (-1.0 * (253840.6875 / this.fConst0));
        let fConst201: f32 = Mathf.sin(fConst200);
        let fConst202: f32 = (-1.0 * (126920.34375 / this.fConst0));
        let fConst203: f32 = Mathf.sin(fConst202);
        let fConst204: f32 = ((fConst201 * 0.5) + fConst203);
        let fConst205: f32 = Mathf.cos(fConst200);
        let fConst206: f32 = Mathf.cos(fConst202);
        let fConst207: f32 = (fConst206 * 2.0);
        let fConst208: f32 = ((((fConst205 * fConst89) - (fConst207 * fConst48)) / fConst50) + 1.0);
        let fConst209: f32 = ((0.5 * (1.0 + fConst205)) + fConst206);
        let fConst210: f32 = (fConst203 * 2.0);
        let fConst211: f32 = ((fConst201 * fConst89) - (fConst210 * fConst48));
        let fConst212: f32 = (fConst50 * (Mathf.pow(fConst208, 2.0) + (Mathf.pow(fConst211, 2.0) / fConst163)));
        this.fConst213 = (this.fConst0 * ((0.000007878957148932386 * Mathf.atan2(((fConst73 * ((fConst204 * fConst208) - ((fConst209 * fConst211) / fConst50))) / fConst212), ((fConst73 * ((fConst208 * fConst209) + ((fConst204 * fConst211) / fConst50))) / fConst212))) + 0.00004950494985678233));
        let fConst214: f32 = ((((fConst205 * fConst91) - (fConst207 * fConst53)) / fConst55) + 1.0);
        let fConst215: f32 = ((fConst201 * fConst91) - (fConst210 * fConst53));
        let fConst216: f32 = (fConst55 * (Mathf.pow(fConst214, 2.0) + (Mathf.pow(fConst215, 2.0) / fConst168)));
        this.fConst217 = (this.fConst0 * ((0.000007878957148932386 * Mathf.atan2(((fConst76 * ((fConst204 * fConst214) - ((fConst209 * fConst215) / fConst55))) / fConst216), ((fConst76 * ((fConst209 * fConst214) + ((fConst204 * fConst215) / fConst55))) / fConst216))) + 0.00004950494985678233));
        let fConst218: f32 = ((((fConst205 * fConst93) - (fConst207 * fConst58)) / fConst60) + 1.0);
        let fConst219: f32 = ((fConst201 * fConst93) - (fConst210 * fConst58));
        let fConst220: f32 = (fConst60 * (Mathf.pow(fConst218, 2.0) + (Mathf.pow(fConst219, 2.0) / fConst173)));
        this.fConst221 = (this.fConst0 * ((0.000007878957148932386 * Mathf.atan2(((fConst79 * ((fConst204 * fConst218) - ((fConst209 * fConst219) / fConst60))) / fConst220), ((fConst79 * ((fConst209 * fConst218) + ((fConst204 * fConst219) / fConst60))) / fConst220))) + 0.00004950494985678233));
        let fConst222: f32 = ((((fConst205 * fConst95) - (fConst207 * fConst63)) / fConst65) + 1.0);
        let fConst223: f32 = ((fConst201 * fConst95) - (fConst210 * fConst63));
        let fConst224: f32 = (fConst65 * (Mathf.pow(fConst222, 2.0) + (Mathf.pow(fConst223, 2.0) / fConst178)));
        this.fConst225 = (this.fConst0 * ((0.000007878957148932386 * Mathf.atan2(((fConst82 * ((fConst204 * fConst222) - ((fConst209 * fConst223) / fConst65))) / fConst224), ((fConst82 * ((fConst209 * fConst222) + ((fConst204 * fConst223) / fConst65))) / fConst224))) + 0.00004950494985678233));
        let fConst226: f32 = fConst232;
        let fConst227: f32 = fConst231;
        let fConst228: f32 = (fConst227 / fConst19);
        let fConst229: f32 = (fConst19 * (Mathf.pow(fConst226, 2.0) + (Mathf.pow(fConst227, 2.0) / fConst148)));
        this.fConst230 = ((0.30315226316452026 * Mathf.atan2(((fConst17 * ((0.0019259678665548563 * fConst226) - (0.012160082347691059 * fConst228))) / fConst229), (-1.0 * ((fConst17 * ((0.012160082347691059 * fConst226) + (0.0019259678665548563 * fConst228))) / fConst229)))) + 1.9047619104385376);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MdrumsDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.iSlow0 = <i32>(((17.312339782714844 * Mathf.log((0.0022727272007614374 * <f32>(this.fHslider1)))) + 69.5));
        this.iSlow1 = ((this.iSlow0 == <i32>(60)) ? <i32>(0) : ((this.iSlow0 == <i32>(62)) ? <i32>(1) : ((this.iSlow0 == <i32>(66)) ? <i32>(2) : ((this.iSlow0 == <i32>(68)) ? <i32>(3) : ((this.iSlow0 == <i32>(65)) ? <i32>(4) : ((this.iSlow0 == <i32>(67)) ? <i32>(5) : ((this.iSlow0 == <i32>(69)) ? <i32>(6) : ((this.iSlow0 == <i32>(71)) ? <i32>(7) : ((this.iSlow0 == <i32>(73)) ? <i32>(8) : <i32>(9))))))))));
        this.fSlow0 = (<f32>(this.fButton0) * <f32>((this.iSlow1 < <i32>(9))));
        this.fSlow1 = <f32>(this.fHslider2);
        this.fSlow2 = (127.0 * this.fSlow1);
        this.fSlow3 = (0.18000000715255737 * <f32>(this.fHslider3));
        this.fSlow4 = (1.25 * (this.fSlow1 * <f32>(this.fHslider4)));
        this.fSlow5 = (this.fSlow1 * <f32>(this.fHslider5));
        this.fSlow6 = (0.1693333387374878 * this.fSlow5);
        this.fSlow7 = (0.12700000405311584 * this.fSlow5);
        this.fSlow8 = (63.5 * (this.fSlow1 * <f32>(this.fHslider6)));
        this.fSlow9 = (0.30000001192092896 * <f32>(this.fHslider7));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        unchecked(this.fVec4643[<i32>(0)] = this.fSlow0);
        let fTemp0: f32 = unchecked(this.fVec4643[<i32>(1)]);
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : unchecked(this.iRec5[<i32>(1)])));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let fTemp1: f32 = unchecked(this.fRec5_1[<i32>(1)]);
        let iRecCur10: i32 = (iTemp0 ? this.iSlow1 : this.iRec10);
        let iTemp4: i32 = (iRecCur10 >= <i32>(5));
        let iTemp5: i32 = (iRecCur10 >= <i32>(3));
        let iTemp6: i32 = (iRecCur10 >= <i32>(2));
        let iTemp7: i32 = (iRecCur10 >= <i32>(1));
        let iTemp8: i32 = (iRecCur10 >= <i32>(4));
        let iTemp9: i32 = (iRecCur10 >= <i32>(7));
        let iTemp10: i32 = (iRecCur10 >= <i32>(8));
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + (1.0 / max<f32>(1.0, (this.fConst0 * (iTemp4 ? (iTemp9 ? (iTemp10 ? 0.00009999999747378752 : 0.0005000000237487257) : 0.0005000000237487257) : (iTemp5 ? (iTemp8 ? 0.0005000000237487257 : 0.00009999999747378752) : (iTemp6 ? 0.00009999999747378752 : (iTemp7 ? 0.004999999888241291 : 0.00009999999747378752)))))))));
        let iTemp11: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = (iTemp4 ? 1.0 : (iTemp5 ? 1.0 : (iTemp6 ? 1.0 : (iTemp7 ? 0.10000000149011612 : 1.0))));
        let fTemp4: f32 = max<f32>(fTemp3, (fTemp1 - (1.0 / max<f32>(1.0, (this.fConst0 * (iTemp4 ? <f32>((iTemp9 ? (iTemp10 ? <i32>(3) : <i32>(1)) : <i32>(1))) : (iTemp5 ? 1.0 : (iTemp6 ? 1.0 : (iTemp7 ? 0.5 : 1.0)))))))));
        let iTemp12: i32 = (iTemp0 ? <i32>(1) : unchecked(this.iRec3[<i32>(1)]));
        let iTemp13: i32 = (iTemp12 >= <i32>(2));
        let iTemp14: i32 = (iTemp12 >= <i32>(1));
        let iTemp15: i32 = (iTemp0 & (iRecCur10 != this.iRec10));
        let fTemp5: f32 = (iTemp15 ? 0.0 : unchecked(this.fRec3_1[<i32>(1)]));
        let fTemp6: f32 = min<f32>(1.0, (fTemp5 + (1.0 / max<f32>(1.0, (this.fConst0 * (iTemp4 ? (iTemp9 ? (iTemp10 ? 0.0010000000474974513 : 0.0020000000949949026) : 0.0020000000949949026) : (iTemp5 ? (iTemp8 ? 0.0020000000949949026 : 0.0010000000474974513) : (iTemp6 ? 0.012000000104308128 : (iTemp7 ? 0.004999999888241291 : 0.0010000000474974513)))))))));
        let iTemp16: i32 = (iTemp12 >= <i32>(3));
        let fTemp7: f32 = max<f32>(0.0, (fTemp5 - (1.0 / max<f32>(1.0, (this.fConst0 * (iTemp4 ? (iTemp9 ? (iTemp10 ? 0.15000000596046448 : 0.11999999731779099) : 0.11999999731779099) : (iTemp5 ? (iTemp8 ? 0.11999999731779099 : 0.5) : (iTemp6 ? 0.05999999865889549 : (iTemp7 ? 0.20000000298023224 : 0.07999999821186066)))))))));
        let fTemp8: f32 = max<f32>(0.0, fTemp5);
        let iTemp17: i32 = (<i32>(1) - iTemp15);
        let fTemp9: f32 = <f32>(iTemp17);
        let fTemp10: f32 = unchecked(this.fRec2[<i32>(1)]);
        let fTemp11: f32 = unchecked(this.fRec2_2[<i32>(1)]);
        let fTemp12: f32 = unchecked(this.fRec4[<i32>(1)]);
        let iTemp18: i32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? <i32>(2) : <i32>(1)) : <i32>(1)) : (iTemp5 ? (iTemp8 ? <i32>(1) : <i32>(0)) : <i32>(0)));
        let iTemp19: i32 = (iTemp15 | (iTemp0 & (iTemp8 & (iRecCur10 <= <i32>(7)))));
        let fTemp13: f32 = <f32>((<i32>(1) - ((iTemp18 == <i32>(1)) ? iTemp19 : iTemp15)));
        let fTemp14: f32 = unchecked(this.fRec4_2[<i32>(1)]);
        let fTemp15: f32 = unchecked(this.fRec8[<i32>(1)]);
        let fTemp16: f32 = unchecked(this.fRec8_2[<i32>(1)]);
        let fTemp17: f32 = unchecked(this.fRec9[<i32>(1)]);
        let fTemp18: f32 = unchecked(this.fRec9_2[<i32>(1)]);
        let iTemp20: i32 = (iRecCur10 >= <i32>(6));
        let fTemp19: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst20 : this.fConst83) : (iTemp20 ? this.fConst80 : this.fConst77)) : (iTemp5 ? (iTemp8 ? this.fConst74 : this.fConst20) : (iTemp6 ? this.fConst20 : (iTemp7 ? this.fConst71 : this.fConst68))));
        let iTemp21: i32 = (iTemp4 ? <i32>(2) : (iTemp5 ? (iTemp8 ? <i32>(2) : <i32>(0)) : (iTemp6 ? <i32>(0) : (iTemp7 ? <i32>(2) : <i32>(1)))));
        let iTemp22: i32 = (iTemp21 >= <i32>(2));
        let iTemp23: i32 = (iTemp21 >= <i32>(1));
        let fTemp20: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? -0.8333333134651184 : -0.9998999834060669) : -0.9998999834060669) : (iTemp5 ? (iTemp8 ? -0.9998999834060669 : -0.6666666865348816) : (iTemp6 ? -0.6666666865348816 : (iTemp7 ? -0.875 : -0.9047619104385376))));
        let iTemp24: i32 = (<i32>(1103515245) * (unchecked(this.iRec11[<i32>(1)]) + <i32>(12345)));
        let iRecBody37: i32 = (<i32>(1103515245) * (iTemp24 + <i32>(12345)));
        let iRecBody38: i32 = iTemp24;
        unchecked(this.iRec11[<i32>(0)] = iRecBody37);
        unchecked(this.iRec11_1[<i32>(0)] = iRecBody38);
        let iRecBody39: i32 = (iTemp13 ? (iTemp16 ? ((fTemp8 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp7 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp14 ? ((fTemp6 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody40: f32 = (iTemp13 ? (iTemp16 ? fTemp8 : fTemp7) : (iTemp14 ? fTemp6 : fTemp5));
        unchecked(this.iRec3[<i32>(0)] = iRecBody39);
        unchecked(this.fRec3_1[<i32>(0)] = fRecBody40);
        let fTemp21: f32 = (0.00000000023283064365386963 * (<f32>(unchecked(this.iRec11[<i32>(0)])) * unchecked(this.fRec3_1[<i32>(0)])));
        let fTemp22: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst21 : this.fConst27) : this.fConst27) : (iTemp5 ? (iTemp8 ? this.fConst27 : this.fConst21) : (iTemp6 ? this.fConst21 : (iTemp7 ? this.fConst14 : this.fConst8))));
        let fTemp23: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst20 : this.fConst26) : this.fConst26) : (iTemp5 ? (iTemp8 ? this.fConst26 : this.fConst20) : (iTemp6 ? this.fConst20 : (iTemp7 ? this.fConst13 : this.fConst7))));
        let fTemp24: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst30 : this.fConst31) : this.fConst31) : (iTemp5 ? (iTemp8 ? this.fConst31 : this.fConst30) : (iTemp6 ? this.fConst30 : (iTemp7 ? this.fConst29 : this.fConst28))));
        let fTemp25: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst35 : this.fConst36) : this.fConst36) : (iTemp5 ? (iTemp8 ? this.fConst36 : this.fConst35) : (iTemp6 ? this.fConst35 : (iTemp7 ? this.fConst33 : this.fConst32))));
        let fRecBody41: f32 = fTemp21;
        let fRecBody42: f32 = (fTemp9 * fTemp10);
        let fRecBody43: f32 = (((fTemp21 + (fTemp9 * unchecked(this.fRec2_1[<i32>(1)]))) * fTemp22) + (fTemp9 * ((fTemp10 * fTemp23) - ((fTemp11 * fTemp24) + (unchecked(this.fRec2_3[<i32>(1)]) * fTemp25)))));
        let fRecBody44: f32 = (fTemp9 * fTemp11);
        unchecked(this.fRec2[<i32>(0)] = fRecBody41);
        unchecked(this.fRec2_1[<i32>(0)] = fRecBody42);
        unchecked(this.fRec2_2[<i32>(0)] = fRecBody43);
        unchecked(this.fRec2_3[<i32>(0)] = fRecBody44);
        let fTemp26: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst185 : this.fConst180) : (iTemp20 ? this.fConst175 : this.fConst170)) : (iTemp5 ? (iTemp8 ? this.fConst165 : this.fConst150) : (iTemp6 ? this.fConst150 : (iTemp7 ? this.fConst137 : this.fConst125))));
        let iTemp25: i32 = max<i32>(<i32>(1), <i32>(fTemp26));
        let fTemp27: f32 = max<f32>(0.0, (fTemp26 - <f32>(iTemp25)));
        let fTemp28: f32 = (1.0 - fTemp27);
        let fTemp29: f32 = unchecked(this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp25 + <i32>(-1)))) + <i32>(1))) & <i32>(511))]);
        let iRecCur12: i32 = (iTemp17 * (this.iRec12 + <i32>(1)));
        let fTemp30: f32 = <f32>((iRecCur12 >= iTemp25));
        let fTemp31: f32 = (fTemp29 * fTemp30);
        let fTemp32: f32 = (fTemp27 + 1.0);
        unchecked(this.fVec10371[<i32>(0)] = fTemp31);
        let fRecCur13: f32 = (iTemp15 ? (((fTemp28 * fTemp29) * fTemp30) / fTemp32) : (((fTemp28 * (fTemp31 - this.fRec13)) / fTemp32) + unchecked(this.fVec10371[<i32>(1)])));
        let fTemp33: f32 = (unchecked(this.fRec2_2[<i32>(0)]) + fRecCur13);
        unchecked(this.fVec10385[<i32>(0)] = fTemp33);
        let fRecCur14: f32 = (iTemp19 ? (fTemp20 * fTemp33) : ((fTemp20 * (fTemp33 - this.fRec14)) + unchecked(this.fVec10385[<i32>(1)])));
        let fRecCur15: f32 = (iTemp19 ? (fTemp20 * fRecCur14) : ((fTemp20 * (fRecCur14 - this.fRec15)) + this.fRec14));
        let fRecCur16: f32 = (iTemp19 ? (fTemp20 * fRecCur15) : ((fTemp20 * (fRecCur15 - this.fRec16)) + this.fRec15));
        let fRecCur17: f32 = (iTemp19 ? (fTemp20 * fRecCur16) : ((fTemp20 * (fRecCur16 - this.fRec17)) + this.fRec16));
        let fRecCur18: f32 = (iTemp19 ? (fTemp20 * fRecCur17) : ((fTemp20 * (fRecCur17 - this.fRec18)) + this.fRec17));
        let fRecCur19: f32 = (iTemp19 ? (fTemp20 * fRecCur18) : ((fTemp20 * (fRecCur18 - this.fRec19)) + this.fRec18));
        let fTemp34: f32 = (iTemp22 ? fRecCur19 : (iTemp23 ? fRecCur17 : fRecCur16));
        let fTemp35: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst30 : this.fConst66) : (iTemp20 ? this.fConst61 : this.fConst56)) : (iTemp5 ? (iTemp8 ? this.fConst51 : this.fConst30) : (iTemp6 ? this.fConst30 : (iTemp7 ? this.fConst46 : this.fConst41))));
        let fTemp36: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst21 : this.fConst84) : (iTemp20 ? this.fConst81 : this.fConst78)) : (iTemp5 ? (iTemp8 ? this.fConst75 : this.fConst21) : (iTemp6 ? this.fConst21 : (iTemp7 ? this.fConst72 : this.fConst69))));
        let fTemp37: f32 = (fTemp34 * fTemp36);
        let fTemp38: f32 = ((fTemp9 * unchecked(this.fRec1[<i32>(1)])) + fTemp37);
        let fTemp39: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst35 : this.fConst96) : (iTemp20 ? this.fConst94 : this.fConst92)) : (iTemp5 ? (iTemp8 ? this.fConst90 : this.fConst35) : (iTemp6 ? this.fConst35 : (iTemp7 ? this.fConst88 : this.fConst86))));
        let fTemp40: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? 0.9990000128746033 : 0.9980000257492065) : 0.9980000257492065) : (iTemp5 ? (iTemp8 ? 0.9980000257492065 : 0.8500000238418579) : (iTemp6 ? 0.6000000238418579 : (iTemp7 ? 0.800000011920929 : 0.30000001192092896))));
        let fRecBody45: f32 = (((unchecked(this.fRec1_1[<i32>(1)]) * fTemp9) + (fTemp19 * fTemp34)) - (fTemp35 * fTemp38));
        let fRecBody46: f32 = (fTemp37 - (fTemp38 * fTemp39));
        let fRecBody47: f32 = fTemp38;
        unchecked(this.fRec1[<i32>(0)] = fRecBody45);
        unchecked(this.fRec1_1[<i32>(0)] = fRecBody46);
        unchecked(this.fRec1_2[<i32>(0)] = fRecBody47);
        let iRecBody48: i32 = (iTemp2 ? (iTemp11 ? <i32>(3) : ((fTemp4 <= fTemp3) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody49: f32 = (iTemp2 ? (iTemp11 ? fTemp1 : fTemp4) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - (1.0 / max<f32>(1.0, (this.fConst0 * (iTemp4 ? (iTemp9 ? (iTemp10 ? 3.0 : 0.20000000298023224) : 0.20000000298023224) : (iTemp5 ? 0.20000000298023224 : (iTemp6 ? 0.20000000298023224 : 0.30000001192092896))))))))));
        unchecked(this.iRec5[<i32>(0)] = iRecBody48);
        unchecked(this.fRec5_1[<i32>(0)] = fRecBody49);
        let fRecCur20: f32 = (iTemp15 ? this.fSlow2 : (this.fRec20 + (0.009999999776482582 * (this.fSlow2 - this.fRec20))));
        let fTemp41: f32 = (unchecked(this.fRec5_1[<i32>(0)]) * (iTemp4 ? (iTemp9 ? (iTemp10 ? (this.fSlow9 * fRecCur20) : this.fSlow8) : this.fSlow8) : (iTemp5 ? (iTemp8 ? this.fSlow8 : this.fSlow7) : (iTemp6 ? this.fSlow6 : (iTemp7 ? this.fSlow4 : (this.fSlow3 * fRecCur20))))));
        let iTemp26: i32 = (iTemp18 >= <i32>(2));
        let iTemp27: i32 = (iTemp18 >= <i32>(1));
        let fRecBody50: f32 = (fTemp40 * unchecked(this.fRec1_2[<i32>(0)]));
        let fRecBody51: f32 = unchecked(this.fRec1_2[<i32>(0)]);
        let iTemp30: i32 = (this.fIOTA & <i32>(511));
        unchecked(this.fRec0[iTemp30] = fRecBody50);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody51);
        let iTemp28: i32 = (iTemp18 == <i32>(2));
        let fTemp42: f32 = (iTemp28 ? this.fConst108 : this.fConst102);
        let fTemp43: f32 = (iTemp28 ? this.fConst187 : this.fConst186);
        let fTemp44: f32 = (iTemp28 ? this.fConst110 : this.fConst109);
        let fTemp45: f32 = (iTemp28 ? this.fConst112 : this.fConst111);
        let fRecBody52: f32 = unchecked(this.fRec0_1[<i32>(0)]);
        let fRecBody53: f32 = (fTemp12 * fTemp13);
        let fRecBody54: f32 = ((fTemp42 * ((fTemp13 * unchecked(this.fRec4_1[<i32>(1)])) + fRecBody52)) + (fTemp13 * ((fTemp12 * fTemp43) - ((fTemp14 * fTemp44) + (unchecked(this.fRec4_3[<i32>(1)]) * fTemp45)))));
        let fRecBody55: f32 = (fTemp13 * fTemp14);
        unchecked(this.fRec4[<i32>(0)] = fRecBody52);
        unchecked(this.fRec4_1[<i32>(0)] = fRecBody53);
        unchecked(this.fRec4_2[<i32>(0)] = fRecBody54);
        unchecked(this.fRec4_3[<i32>(0)] = fRecBody55);
        let fTemp46: f32 = (0.00000000023283064365386963 * (unchecked(this.fRec3_1[<i32>(0)]) * <f32>(unchecked(this.iRec11_1[<i32>(0)]))));
        let fRecBody56: f32 = fTemp46;
        let fRecBody57: f32 = (fTemp9 * fTemp15);
        let fRecBody58: f32 = (((fTemp46 + (fTemp9 * unchecked(this.fRec8_1[<i32>(1)]))) * fTemp22) + (fTemp9 * ((fTemp15 * fTemp23) - ((fTemp16 * fTemp24) + (unchecked(this.fRec8_3[<i32>(1)]) * fTemp25)))));
        let fRecBody59: f32 = (fTemp9 * fTemp16);
        unchecked(this.fRec8[<i32>(0)] = fRecBody56);
        unchecked(this.fRec8_1[<i32>(0)] = fRecBody57);
        unchecked(this.fRec8_2[<i32>(0)] = fRecBody58);
        unchecked(this.fRec8_3[<i32>(0)] = fRecBody59);
        let fTemp47: f32 = (iTemp4 ? (iTemp9 ? (iTemp10 ? this.fConst230 : this.fConst225) : (iTemp20 ? this.fConst221 : this.fConst217)) : (iTemp5 ? (iTemp8 ? this.fConst213 : this.fConst150) : (iTemp6 ? this.fConst150 : (iTemp7 ? this.fConst137 : this.fConst199))));
        let iTemp29: i32 = max<i32>(<i32>(1), <i32>(fTemp47));
        let fTemp48: f32 = max<f32>(0.0, (fTemp47 - <f32>(iTemp29)));
        let fTemp49: f32 = (1.0 - fTemp48);
        let fTemp50: f32 = unchecked(this.fRec6[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp29 + <i32>(-1)))) + <i32>(1))) & <i32>(511))]);
        let fTemp51: f32 = <f32>((iRecCur12 >= iTemp29));
        let fTemp52: f32 = (fTemp50 * fTemp51);
        let fTemp53: f32 = (fTemp48 + 1.0);
        unchecked(this.fVec10682[<i32>(0)] = fTemp52);
        let fRecCur21: f32 = (iTemp15 ? (((fTemp49 * fTemp50) * fTemp51) / fTemp53) : (((fTemp49 * (fTemp52 - this.fRec21)) / fTemp53) + unchecked(this.fVec10682[<i32>(1)])));
        let fTemp54: f32 = (unchecked(this.fRec8_2[<i32>(0)]) + fRecCur21);
        unchecked(this.fVec10696[<i32>(0)] = fTemp54);
        let fRecCur22: f32 = (iTemp19 ? (fTemp20 * fTemp54) : ((fTemp20 * (fTemp54 - this.fRec22)) + unchecked(this.fVec10696[<i32>(1)])));
        let fRecCur23: f32 = (iTemp19 ? (fTemp20 * fRecCur22) : ((fTemp20 * (fRecCur22 - this.fRec23)) + this.fRec22));
        let fRecCur24: f32 = (iTemp19 ? (fTemp20 * fRecCur23) : ((fTemp20 * (fRecCur23 - this.fRec24)) + this.fRec23));
        let fRecCur25: f32 = (iTemp19 ? (fTemp20 * fRecCur24) : ((fTemp20 * (fRecCur24 - this.fRec25)) + this.fRec24));
        let fRecCur26: f32 = (iTemp19 ? (fTemp20 * fRecCur25) : ((fTemp20 * (fRecCur25 - this.fRec26)) + this.fRec25));
        let fRecCur27: f32 = (iTemp19 ? (fTemp20 * fRecCur26) : ((fTemp20 * (fRecCur26 - this.fRec27)) + this.fRec26));
        let fTemp55: f32 = (iTemp22 ? fRecCur27 : (iTemp23 ? fRecCur25 : fRecCur24));
        let fTemp56: f32 = (fTemp36 * fTemp55);
        let fTemp57: f32 = ((fTemp9 * unchecked(this.fRec7[<i32>(1)])) + fTemp56);
        let fRecBody60: f32 = (((fTemp9 * unchecked(this.fRec7_1[<i32>(1)])) + (fTemp19 * fTemp55)) - (fTemp35 * fTemp57));
        let fRecBody61: f32 = (fTemp56 - (fTemp39 * fTemp57));
        let fRecBody62: f32 = fTemp57;
        unchecked(this.fRec7[<i32>(0)] = fRecBody60);
        unchecked(this.fRec7_1[<i32>(0)] = fRecBody61);
        unchecked(this.fRec7_2[<i32>(0)] = fRecBody62);
        let fRecBody63: f32 = (fTemp40 * unchecked(this.fRec7_2[<i32>(0)]));
        let fRecBody64: f32 = unchecked(this.fRec7_2[<i32>(0)]);
        unchecked(this.fRec6[iTemp30] = fRecBody63);
        unchecked(this.fRec6_1[<i32>(0)] = fRecBody64);
        let fRecBody65: f32 = unchecked(this.fRec6_1[<i32>(0)]);
        let fRecBody66: f32 = (fTemp13 * fTemp17);
        let fRecBody67: f32 = ((fTemp42 * ((fTemp13 * unchecked(this.fRec9_1[<i32>(1)])) + fRecBody65)) + (fTemp13 * ((fTemp17 * fTemp43) - ((fTemp18 * fTemp44) + (unchecked(this.fRec9_3[<i32>(1)]) * fTemp45)))));
        let fRecBody68: f32 = (fTemp13 * fTemp18);
        unchecked(this.fRec9[<i32>(0)] = fRecBody65);
        unchecked(this.fRec9_1[<i32>(0)] = fRecBody66);
        unchecked(this.fRec9_2[<i32>(0)] = fRecBody67);
        unchecked(this.fRec9_3[<i32>(0)] = fRecBody68);
        outputs[<i32>(0)] = <f32>((4.0 * (fTemp41 * (iTemp26 ? (0.0002699999895412475 * unchecked(this.fRec4_2[<i32>(0)])) : (iTemp27 ? (0.019999999552965164 * unchecked(this.fRec4_2[<i32>(0)])) : unchecked(this.fRec0_1[<i32>(0)]))))));
        outputs[<i32>(1)] = <f32>((4.0 * (fTemp41 * (iTemp26 ? (0.0002699999895412475 * unchecked(this.fRec9_2[<i32>(0)])) : (iTemp27 ? (0.019999999552965164 * unchecked(this.fRec9_2[<i32>(0)])) : fRecBody65)))));
        unchecked(this.fVec4643[<i32>(1)] = unchecked(this.fVec4643[<i32>(0)]));
        this.iRec10 = iRecCur10;
        unchecked(this.iRec11[<i32>(1)] = unchecked(this.iRec11[<i32>(0)]));
        unchecked(this.iRec11_1[<i32>(1)] = unchecked(this.iRec11_1[<i32>(0)]));
        unchecked(this.iRec3[<i32>(1)] = unchecked(this.iRec3[<i32>(0)]));
        unchecked(this.fRec3_1[<i32>(1)] = unchecked(this.fRec3_1[<i32>(0)]));
        unchecked(this.fRec2[<i32>(1)] = unchecked(this.fRec2[<i32>(0)]));
        unchecked(this.fRec2_1[<i32>(1)] = unchecked(this.fRec2_1[<i32>(0)]));
        unchecked(this.fRec2_2[<i32>(1)] = unchecked(this.fRec2_2[<i32>(0)]));
        unchecked(this.fRec2_3[<i32>(1)] = unchecked(this.fRec2_3[<i32>(0)]));
        this.iRec12 = iRecCur12;
        unchecked(this.fVec10371[<i32>(1)] = unchecked(this.fVec10371[<i32>(0)]));
        this.fRec13 = fRecCur13;
        unchecked(this.fVec10385[<i32>(1)] = unchecked(this.fVec10385[<i32>(0)]));
        this.fRec14 = fRecCur14;
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec17 = fRecCur17;
        this.fRec18 = fRecCur18;
        this.fRec19 = fRecCur19;
        unchecked(this.fRec1[<i32>(1)] = unchecked(this.fRec1[<i32>(0)]));
        unchecked(this.fRec1_1[<i32>(1)] = unchecked(this.fRec1_1[<i32>(0)]));
        unchecked(this.fRec1_2[<i32>(1)] = unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.iRec5[<i32>(1)] = unchecked(this.iRec5[<i32>(0)]));
        unchecked(this.fRec5_1[<i32>(1)] = unchecked(this.fRec5_1[<i32>(0)]));
        this.fRec20 = fRecCur20;
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        unchecked(this.fRec4[<i32>(1)] = unchecked(this.fRec4[<i32>(0)]));
        unchecked(this.fRec4_1[<i32>(1)] = unchecked(this.fRec4_1[<i32>(0)]));
        unchecked(this.fRec4_2[<i32>(1)] = unchecked(this.fRec4_2[<i32>(0)]));
        unchecked(this.fRec4_3[<i32>(1)] = unchecked(this.fRec4_3[<i32>(0)]));
        unchecked(this.fRec8[<i32>(1)] = unchecked(this.fRec8[<i32>(0)]));
        unchecked(this.fRec8_1[<i32>(1)] = unchecked(this.fRec8_1[<i32>(0)]));
        unchecked(this.fRec8_2[<i32>(1)] = unchecked(this.fRec8_2[<i32>(0)]));
        unchecked(this.fRec8_3[<i32>(1)] = unchecked(this.fRec8_3[<i32>(0)]));
        unchecked(this.fVec10682[<i32>(1)] = unchecked(this.fVec10682[<i32>(0)]));
        this.fRec21 = fRecCur21;
        unchecked(this.fVec10696[<i32>(1)] = unchecked(this.fVec10696[<i32>(0)]));
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec24 = fRecCur24;
        this.fRec25 = fRecCur25;
        this.fRec26 = fRecCur26;
        this.fRec27 = fRecCur27;
        unchecked(this.fRec7[<i32>(1)] = unchecked(this.fRec7[<i32>(0)]));
        unchecked(this.fRec7_1[<i32>(1)] = unchecked(this.fRec7_1[<i32>(0)]));
        unchecked(this.fRec7_2[<i32>(1)] = fRecBody64);
        unchecked(this.fRec6_1[<i32>(1)] = fRecBody65);
        unchecked(this.fRec9[<i32>(1)] = unchecked(this.fRec9[<i32>(0)]));
        unchecked(this.fRec9_1[<i32>(1)] = unchecked(this.fRec9_1[<i32>(0)]));
        unchecked(this.fRec9_2[<i32>(1)] = unchecked(this.fRec9_2[<i32>(0)]));
        unchecked(this.fRec9_3[<i32>(1)] = unchecked(this.fRec9_3[<i32>(0)]));
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mdrums extends MidiVoice {
    readonly dsp: MdrumsDsp = new MdrumsDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(2);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MdrumsChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MdrumsChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider7 = this.typedChannel.cymbalLevel;
        this.dsp.fHslider5 = this.typedChannel.hatLevel;
        this.dsp.fHslider3 = this.typedChannel.kickLevel;
        this.dsp.fHslider4 = this.typedChannel.snareLevel;
        this.dsp.fHslider6 = this.typedChannel.tomLevel;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider2 = <f32>velocity / 127.0;
        this.dsp.fHslider7 = this.typedChannel.cymbalLevel;
        this.dsp.fHslider5 = this.typedChannel.hatLevel;
        this.dsp.fHslider3 = this.typedChannel.kickLevel;
        this.dsp.fHslider4 = this.typedChannel.snareLevel;
        this.dsp.fHslider6 = this.typedChannel.tomLevel;
        this.dsp.fButton0 = 0.0;
        this.dsp.control();
        this.dsp.frame(this.fin, this.fout);
        this.dsp.fButton0 = 1.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.dsp.fButton0 = 0.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.dsp.fButton0 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
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
        if (this.dsp.fButton0 == 0.0) this.releaseSamples++;
        this.channel.signal.add(output * 0.25, output1 * 0.25);
    }
}

export class MdrumsEffectDsp {
    fSampleRate: i32;
    fConst2: f32;
    fConst3: f32;
    fConst5: f32;
    fConst6: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_3: StaticArray<f32> = new StaticArray<f32>(2);

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
        // ui openbox mdrums_effect
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
    }
    instanceClear(): void {
        for (let lRec0: i32 = 0; lRec0 < <i32>(2); lRec0 = lRec0 + 1) {
            unchecked(this.fRec0[lRec0] = 0.0);
        }
        for (let lRec1: i32 = 0; lRec1 < <i32>(2); lRec1 = lRec1 + 1) {
            unchecked(this.fRec0_1[lRec1] = 0.0);
        }
        for (let lRec2: i32 = 0; lRec2 < <i32>(2); lRec2 = lRec2 + 1) {
            unchecked(this.fRec0_2[lRec2] = 0.0);
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(2); lRec3 = lRec3 + 1) {
            unchecked(this.fRec0_3[lRec3] = 0.0);
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            unchecked(this.fRec1[lRec4] = 0.0);
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            unchecked(this.fRec1_1[lRec5] = 0.0);
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            unchecked(this.fRec1_2[lRec6] = 0.0);
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            unchecked(this.fRec1_3[lRec7] = 0.0);
        }
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        let fConst0: f32 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        let fConst1: f32 = ((6.2831854820251465 / fConst0) * min<f32>(30.0, ((fConst0 * 0.5) - 1000.0)));
        this.fConst2 = Mathf.cos(fConst1);
        this.fConst3 = (this.fConst2 + 1.0);
        let fConst4: f32 = (0.7071067690849304 * Mathf.sin(fConst1));
        this.fConst5 = (1.0 - fConst4);
        this.fConst6 = (fConst4 + 1.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MdrumsEffectDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fTemp0: f32 = <f32>(inputs[<i32>(0)]);
        let fTemp1: f32 = unchecked(this.fRec0[<i32>(1)]);
        let fTemp2: f32 = unchecked(this.fRec0_2[<i32>(1)]);
        let fRecBody8: f32 = fTemp0;
        let fRecBody9: f32 = fTemp1;
        let fRecBody10: f32 = ((((this.fConst3 * ((0.5 * (fTemp0 + unchecked(this.fRec0_1[<i32>(1)]))) - fTemp1)) + (2.0 * (fTemp2 * this.fConst2))) - (unchecked(this.fRec0_3[<i32>(1)]) * this.fConst5)) / this.fConst6);
        let fRecBody11: f32 = fTemp2;
        unchecked(this.fRec0[<i32>(0)] = fRecBody8);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody9);
        unchecked(this.fRec0_2[<i32>(0)] = fRecBody10);
        unchecked(this.fRec0_3[<i32>(0)] = fRecBody11);
        let fTemp3: f32 = <f32>(inputs[<i32>(1)]);
        let fTemp4: f32 = unchecked(this.fRec1[<i32>(1)]);
        let fTemp5: f32 = unchecked(this.fRec1_2[<i32>(1)]);
        let fRecBody12: f32 = fTemp3;
        let fRecBody13: f32 = fTemp4;
        let fRecBody14: f32 = ((((this.fConst3 * ((0.5 * (fTemp3 + unchecked(this.fRec1_1[<i32>(1)]))) - fTemp4)) + (2.0 * (fTemp5 * this.fConst2))) - (unchecked(this.fRec1_3[<i32>(1)]) * this.fConst5)) / this.fConst6);
        let fRecBody15: f32 = fTemp5;
        unchecked(this.fRec1[<i32>(0)] = fRecBody12);
        unchecked(this.fRec1_1[<i32>(0)] = fRecBody13);
        unchecked(this.fRec1_2[<i32>(0)] = fRecBody14);
        unchecked(this.fRec1_3[<i32>(0)] = fRecBody15);
        outputs[<i32>(0)] = <f32>(unchecked(this.fRec0_2[<i32>(0)]));
        outputs[<i32>(1)] = <f32>(unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.fRec0[<i32>(1)] = unchecked(this.fRec0[<i32>(0)]));
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        unchecked(this.fRec0_2[<i32>(1)] = unchecked(this.fRec0_2[<i32>(0)]));
        unchecked(this.fRec0_3[<i32>(1)] = unchecked(this.fRec0_3[<i32>(0)]));
        unchecked(this.fRec1[<i32>(1)] = unchecked(this.fRec1[<i32>(0)]));
        unchecked(this.fRec1_1[<i32>(1)] = unchecked(this.fRec1_1[<i32>(0)]));
        unchecked(this.fRec1_2[<i32>(1)] = unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.fRec1_3[<i32>(1)] = unchecked(this.fRec1_3[<i32>(0)]));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class MdrumsChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _cymbalLevel: f32 = <f32>(1);
    /** cymbal_level [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get cymbalLevel(): f32 { return this._cymbalLevel; }
    set cymbalLevel(value: f32) { this._cymbalLevel = value; this._paramsDirty = true; }
    private _hatLevel: f32 = <f32>(1);
    /** hat_level [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get hatLevel(): f32 { return this._hatLevel; }
    set hatLevel(value: f32) { this._hatLevel = value; this._paramsDirty = true; }
    private _kickLevel: f32 = <f32>(1);
    /** kick_level [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 2 */
    get kickLevel(): f32 { return this._kickLevel; }
    set kickLevel(value: f32) { this._kickLevel = value; this._paramsDirty = true; }
    private _snareLevel: f32 = <f32>(1);
    /** snare_level [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 3 */
    get snareLevel(): f32 { return this._snareLevel; }
    set snareLevel(value: f32) { this._snareLevel = value; this._paramsDirty = true; }
    private _tomLevel: f32 = <f32>(1);
    /** tom_level [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 4 */
    get tomLevel(): f32 { return this._tomLevel; }
    set tomLevel(value: f32) { this._tomLevel = value; this._paramsDirty = true; }

    readonly effectDsp: MdrumsEffectDsp = new MdrumsEffectDsp();
    private efin: StaticArray<f32> = new StaticArray<f32>(2);
    private efout: StaticArray<f32> = new StaticArray<f32>(2);

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this.effectDsp.init(<i32>SAMPLERATE);
    }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mdrums).applyParams();
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
                this.cymbalLevel = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.hatLevel = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 2:
                this.kickLevel = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 3:
                this.snareLevel = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 4:
                this.tomLevel = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MdrumsChannel(10, (channel: MidiChannel) => new Mdrums(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // cymbal level (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // hat level (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
    // kick level (CC 2, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(2, 49);
    // snare level (CC 3, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(3, 49);
    // tom level (CC 4, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(4, 49);
}

export function postprocess(): void {
}
