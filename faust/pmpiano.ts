// Faust-generated Pmpiano
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: pmpiano.dsp

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

export class PmpianoDsp {
    fSampleRate: i32;
    fVec7: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2747: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2817: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2853: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2910: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2967: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3002: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    iSlow0: i32;
    fConst0: f32;
    fHslider2: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst1: f32;
    fConst2: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fConst6: f32;
    fHslider4: f32;
    fSlow3: f32;
    fSlow4: f32;
    fSlow5: f32;
    fConst7: f32;
    fConst8: f32;
    fSlow6: f32;
    fHslider5: f32;
    fSlow7: f32;
    fHslider3: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fSlow11: f32;
    fSlow12: f32;
    fSlow13: f32;
    fConst9: f32;
    fHslider1: f32;
    fSlow14: f32;
    fSlow15: f32;
    fSlow16: f32;
    fConst10: f32;
    fSlow17: f32;
    fSlow18: f32;
    fConst11: f32;
    fSlow19: f32;
    fSlow20: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    iRec1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec2: StaticArray<i32> = new StaticArray<i32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec5: StaticArray<i32> = new StaticArray<i32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec8: StaticArray<i32> = new StaticArray<i32>(2);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec9: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec10: i32;
    fRec11: f32;
    fRec12: f32;
    fRec13: f32;
    iRec14: StaticArray<i32> = new StaticArray<i32>(2);
    iRec14_1: StaticArray<i32> = new StaticArray<i32>(2);
    iRec14_2: StaticArray<i32> = new StaticArray<i32>(2);
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
    fRec28: f32;
    fRec29: f32;
    fRec30: f32;
    fRec31: f32;
    fRec32: f32;
    fRec33: f32;
    fRec34: f32;

    getSampleRate(): i32 {
        return this.fSampleRate;
    }
    getNumInputs(): i32 {
        return 0;
    }
    getNumOutputs(): i32 {
        return 1;
    }
    metadata(m: usize): void {
    }
    buildUserInterface(ui_interface: usize): void {
        // ui openbox pmpiano
        // ui slider bright
        // ui slider damping
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui slider hammer_tone
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider2 = 261.6300048828125;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider3 = 1.0;
        this.fHslider1 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec7[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec2747[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec2817[lDelay2] = 0.0;
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            this.fVec2853[lDelay3] = 0.0;
        }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) {
            this.fVec2910[lDelay4] = 0.0;
        }
        for (let lDelay5: i32 = 0; lDelay5 < <i32>(2); lDelay5 = lDelay5 + 1) {
            this.fVec2967[lDelay5] = 0.0;
        }
        for (let lDelay6: i32 = 0; lDelay6 < <i32>(2); lDelay6 = lDelay6 + 1) {
            this.fVec3002[lDelay6] = 0.0;
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(16384); lRec7 = lRec7 + 1) {
            this.fRec0[lRec7] = 0.0;
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec0_1[lRec8] = 0.0;
        }
        this.fIOTA = <i32>(0);
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.iRec1[lRec9] = <i32>(0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec1_1[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.iRec2[lRec11] = <i32>(0);
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.fRec2_1[lRec12] = 0.0;
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(16384); lRec13 = lRec13 + 1) {
            this.fRec3[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.fRec3_1[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(16384); lRec15 = lRec15 + 1) {
            this.fRec4[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec4_1[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.iRec5[lRec17] = <i32>(0);
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec5_1[lRec18] = 0.0;
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(16384); lRec19 = lRec19 + 1) {
            this.fRec6[lRec19] = 0.0;
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec6_1[lRec20] = 0.0;
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(16384); lRec21 = lRec21 + 1) {
            this.fRec7[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.fRec7_1[lRec22] = 0.0;
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            this.iRec8[lRec23] = <i32>(0);
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec8_1[lRec24] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(16384); lRec25 = lRec25 + 1) {
            this.fRec9[lRec25] = 0.0;
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            this.fRec9_1[lRec26] = 0.0;
        }
        this.iRec10 = <i32>(0);
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.fRec13 = 0.0;
        for (let lRec29: i32 = 0; lRec29 < <i32>(2); lRec29 = lRec29 + 1) {
            this.iRec14[lRec29] = <i32>(0);
        }
        for (let lRec30: i32 = 0; lRec30 < <i32>(2); lRec30 = lRec30 + 1) {
            this.iRec14_1[lRec30] = <i32>(0);
        }
        for (let lRec31: i32 = 0; lRec31 < <i32>(2); lRec31 = lRec31 + 1) {
            this.iRec14_2[lRec31] = <i32>(0);
        }
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
        this.fRec28 = 0.0;
        this.fRec29 = 0.0;
        this.fRec30 = 0.0;
        this.fRec31 = 0.0;
        this.fRec32 = 0.0;
        this.fRec33 = 0.0;
        this.fRec34 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst2 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.05999999865889549)));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.25)));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.019999999552965164)));
        this.fConst8 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.05000000074505806)));
        this.fConst9 = (314.1592712402344 / this.fConst0);
        this.fConst10 = (942.477783203125 / this.fConst0);
        this.fConst11 = (628.3185424804688 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        PmpianoDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.iSlow0 = (this.fSlow0 == 0.0);
        this.fSlow1 = <f32>(this.fHslider2);
        this.fSlow2 = (this.fConst0 / this.fSlow1);
        this.fSlow3 = Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0));
        this.fSlow4 = max<f32>(0.0, (1.0 - (0.00009999999747378752 * this.fSlow3)));
        this.fSlow5 = max<f32>(0.0, (1.0 - (0.0010000000474974513 * this.fSlow3)));
        this.fSlow6 = max<f32>(0.0, (1.0 - (0.009999999776482582 * this.fSlow3)));
        this.fSlow7 = (63.5 * <f32>(this.fHslider5));
        this.fSlow8 = (this.fSlow1 * <f32>(this.fHslider3));
        this.fSlow9 = ((17.312339782714844 * Mathf.log((0.0022727272007614374 * this.fSlow1))) + 69.0);
        this.fSlow10 = (6000.0 * (this.fSlow8 / Mathf.pow(this.fSlow9, 1.350000023841858)));
        this.fSlow11 = (this.fSlow8 / Mathf.pow(this.fSlow9, 1.2999999523162842));
        this.fSlow12 = (4000.0 * this.fSlow11);
        this.fSlow13 = (2000.0 * this.fSlow11);
        this.fSlow14 = <f32>(this.fHslider1);
        this.fSlow15 = Mathf.exp((-1.0 * (this.fConst9 * this.fSlow14)));
        this.fSlow16 = (0.00000000023283064365386963 * (1.0 - this.fSlow15));
        this.fSlow17 = Mathf.exp((-1.0 * (this.fConst10 * this.fSlow14)));
        this.fSlow18 = (0.00000000023283064365386963 * (1.0 - this.fSlow17));
        this.fSlow19 = Mathf.exp((-1.0 * (this.fConst11 * this.fSlow14)));
        this.fSlow20 = (0.00000000023283064365386963 * (1.0 - this.fSlow19));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec7[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec7[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : this.iRec1[<i32>(1)]));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let fTemp1: f32 = this.fRec1_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst1));
        let iTemp4: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = max<f32>(1.0, (fTemp1 - this.fConst2));
        let iTemp5: i32 = (iTemp0 ? <i32>(1) : this.iRec2[<i32>(1)]);
        let iTemp6: i32 = (iTemp5 >= <i32>(2));
        let iTemp7: i32 = (iTemp5 >= <i32>(1));
        let fTemp4: f32 = this.fRec2_1[<i32>(1)];
        let fTemp5: f32 = min<f32>(1.0, ((iTemp0 ? 0.0 : fTemp4) + this.fConst4));
        let iTemp8: i32 = (iTemp0 ? <i32>(1) : this.iRec8[<i32>(1)]);
        let iTemp9: i32 = (iTemp8 >= <i32>(2));
        let iTemp10: i32 = (iTemp8 >= <i32>(1));
        let fTemp6: f32 = this.fRec8_1[<i32>(1)];
        let fTemp7: f32 = min<f32>(1.0, ((iTemp0 ? 0.0 : fTemp6) + this.fConst7));
        let iTemp11: i32 = (iTemp0 ? <i32>(1) : this.iRec5[<i32>(1)]);
        let iTemp12: i32 = (iTemp11 >= <i32>(2));
        let iTemp13: i32 = (iTemp11 >= <i32>(1));
        let fTemp8: f32 = this.fRec5_1[<i32>(1)];
        let fTemp9: f32 = min<f32>(1.0, ((iTemp0 ? 0.0 : fTemp8) + this.fConst1));
        let iRecBody27: i32 = (iTemp2 ? (iTemp4 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody28: f32 = (iTemp2 ? (iTemp4 ? fTemp1 : fTemp3) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst3))));
        this.iRec1[<i32>(0)] = iRecBody27;
        this.fRec1_1[<i32>(0)] = fRecBody28;
        let iTemp14: i32 = (this.iSlow0 & (this.fRec1_1[<i32>(0)] <= 0.0));
        let iRecCur10: i32 = (this.iRec10 ^ iTemp0);
        let iTemp15: i32 = (iRecCur10 == <i32>(1));
        let iTemp16: i32 = (iTemp0 & iTemp15);
        let fRecCur11: f32 = (iTemp16 ? this.fSlow2 : this.fRec11);
        let iTemp17: i32 = max<i32>(<i32>(1), <i32>(fRecCur11));
        let fTemp10: f32 = max<f32>(0.0, (fRecCur11 - <f32>(iTemp17)));
        let fTemp11: f32 = (1.0 - fTemp10);
        let iTemp18: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp17 + <i32>(-1))));
        let iTemp25: i32 = ((this.fIOTA - (iTemp18 + <i32>(1))) & <i32>(16383));
        let fTemp12: f32 = this.fRec0[iTemp25];
        let fTemp13: f32 = (fTemp10 + 1.0);
        this.fVec2747[<i32>(0)] = fTemp12;
        let fRecCur12: f32 = (((fTemp11 * (fTemp12 - this.fRec12)) / fTemp13) + this.fVec2747[<i32>(1)]);
        let fTemp14: f32 = <f32>(iTemp15);
        let iTemp19: i32 = (<i32>(1103515245) * (this.iRec14[<i32>(1)] + <i32>(12345)));
        let iTemp20: i32 = (<i32>(1103515245) * (iTemp19 + <i32>(12345)));
        let iRecBody32: i32 = (<i32>(1103515245) * (iTemp20 + <i32>(12345)));
        let iRecBody33: i32 = iTemp20;
        let iRecBody34: i32 = iTemp19;
        this.iRec14[<i32>(0)] = iRecBody32;
        this.iRec14_1[<i32>(0)] = iRecBody33;
        this.iRec14_2[<i32>(0)] = iRecBody34;
        let iRecBody35: i32 = (iTemp6 ? <i32>(2) : (iTemp7 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody36: f32 = (iTemp6 ? max<f32>(0.0, (fTemp4 - this.fConst5)) : (iTemp7 ? fTemp5 : fTemp4));
        this.iRec2[<i32>(0)] = iRecBody35;
        this.fRec2_1[<i32>(0)] = fRecBody36;
        let fRecCur13: f32 = ((this.fSlow15 * this.fRec13) + (this.fSlow16 * (<f32>(this.iRec14[<i32>(0)]) * this.fRec2_1[<i32>(0)])));
        let fRecCur15: f32 = (iTemp16 ? this.fSlow10 : this.fRec15);
        let fTemp15: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur15)));
        let fRecCur16: f32 = (((fRecCur12 + (fTemp14 * fRecCur13)) * (1.0 - fTemp15)) + (this.fRec16 * fTemp15));
        let iTemp21: i32 = (iRecCur10 == <i32>(0));
        let iTemp22: i32 = (iTemp0 & iTemp21);
        let fRecCur17: f32 = (iTemp22 ? this.fSlow2 : this.fRec17);
        let iTemp23: i32 = max<i32>(<i32>(1), <i32>(fRecCur17));
        let fTemp16: f32 = max<f32>(0.0, (fRecCur17 - <f32>(iTemp23)));
        let fTemp17: f32 = (1.0 - fTemp16);
        let iTemp24: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp23 + <i32>(-1))));
        let iTemp26: i32 = ((this.fIOTA - (iTemp24 + <i32>(1))) & <i32>(16383));
        let fTemp18: f32 = this.fRec3[iTemp26];
        let fTemp19: f32 = (fTemp16 + 1.0);
        this.fVec2817[<i32>(0)] = fTemp18;
        let fRecCur18: f32 = (((fTemp17 * (fTemp18 - this.fRec18)) / fTemp19) + this.fVec2817[<i32>(1)]);
        let fTemp20: f32 = <f32>(iTemp21);
        let fRecCur19: f32 = (iTemp22 ? this.fSlow10 : this.fRec19);
        let fTemp21: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur19)));
        let fRecCur20: f32 = (((fRecCur18 + (fTemp20 * fRecCur13)) * (1.0 - fTemp21)) + (this.fRec20 * fTemp21));
        let fTemp22: f32 = this.fRec9[iTemp26];
        this.fVec2853[<i32>(0)] = fTemp22;
        let fRecCur21: f32 = (((fTemp17 * (fTemp22 - this.fRec21)) / fTemp19) + this.fVec2853[<i32>(1)]);
        let iRecBody37: i32 = (iTemp9 ? <i32>(2) : (iTemp10 ? ((fTemp7 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody38: f32 = (iTemp9 ? max<f32>(0.0, (fTemp6 - this.fConst8)) : (iTemp10 ? fTemp7 : fTemp6));
        this.iRec8[<i32>(0)] = iRecBody37;
        this.fRec8_1[<i32>(0)] = fRecBody38;
        let fRecCur22: f32 = ((this.fSlow17 * this.fRec22) + (this.fSlow18 * (<f32>(this.iRec14_2[<i32>(0)]) * this.fRec8_1[<i32>(0)])));
        let fRecCur23: f32 = (iTemp22 ? this.fSlow13 : this.fRec23);
        let fTemp23: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur23)));
        let fRecCur24: f32 = (((fRecCur21 + (fTemp20 * fRecCur22)) * (1.0 - fTemp23)) + (this.fRec24 * fTemp23));
        let fTemp24: f32 = this.fRec4[iTemp25];
        this.fVec2910[<i32>(0)] = fTemp24;
        let fRecCur25: f32 = (((fTemp11 * (fTemp24 - this.fRec25)) / fTemp13) + this.fVec2910[<i32>(1)]);
        let iRecBody39: i32 = (iTemp12 ? <i32>(2) : (iTemp13 ? ((fTemp9 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody40: f32 = (iTemp12 ? max<f32>(0.0, (fTemp8 - this.fConst3)) : (iTemp13 ? fTemp9 : fTemp8));
        this.iRec5[<i32>(0)] = iRecBody39;
        this.fRec5_1[<i32>(0)] = fRecBody40;
        let fRecCur26: f32 = ((this.fSlow19 * this.fRec26) + (this.fSlow20 * (<f32>(this.iRec14_1[<i32>(0)]) * this.fRec5_1[<i32>(0)])));
        let fRecCur27: f32 = (iTemp16 ? this.fSlow12 : this.fRec27);
        let fTemp25: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur27)));
        let fRecCur28: f32 = (((fRecCur25 + (fTemp14 * fRecCur26)) * (1.0 - fTemp25)) + (this.fRec28 * fTemp25));
        let fTemp26: f32 = this.fRec6[iTemp26];
        this.fVec2967[<i32>(0)] = fTemp26;
        let fRecCur29: f32 = (((fTemp17 * (fTemp26 - this.fRec29)) / fTemp19) + this.fVec2967[<i32>(1)]);
        let fRecCur30: f32 = (iTemp22 ? this.fSlow12 : this.fRec30);
        let fTemp27: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur30)));
        let fRecCur31: f32 = (((fRecCur29 + (fTemp20 * fRecCur26)) * (1.0 - fTemp27)) + (this.fRec31 * fTemp27));
        let fTemp28: f32 = this.fRec7[iTemp25];
        this.fVec3002[<i32>(0)] = fTemp28;
        let fRecCur32: f32 = (((fTemp11 * (fTemp28 - this.fRec32)) / fTemp13) + this.fVec3002[<i32>(1)]);
        let fRecCur33: f32 = (iTemp16 ? this.fSlow13 : this.fRec33);
        let fTemp29: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur33)));
        let fRecCur34: f32 = (((fRecCur32 + (fTemp14 * fRecCur22)) * (1.0 - fTemp29)) + (this.fRec34 * fTemp29));
        let fRecBody41: f32 = (iTemp14 ? 0.0 : (iTemp15 ? (this.fSlow4 * fRecCur16) : (0.8999999761581421 * fRecCur12)));
        let fRecBody42: f32 = (iTemp15 ? fRecCur16 : fRecCur12);
        let iTemp27: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp27] = fRecBody41;
        this.fRec0_1[<i32>(0)] = fRecBody42;
        let fRecBody43: f32 = (iTemp14 ? 0.0 : (iTemp21 ? (this.fSlow4 * fRecCur20) : (0.8999999761581421 * fRecCur18)));
        let fRecBody44: f32 = (iTemp21 ? fRecCur20 : fRecCur18);
        this.fRec3[iTemp27] = fRecBody43;
        this.fRec3_1[<i32>(0)] = fRecBody44;
        let fRecBody45: f32 = (iTemp14 ? 0.0 : (iTemp21 ? (this.fSlow6 * fRecCur24) : (0.8999999761581421 * fRecCur21)));
        let fRecBody46: f32 = (iTemp21 ? fRecCur24 : fRecCur21);
        this.fRec9[iTemp27] = fRecBody45;
        this.fRec9_1[<i32>(0)] = fRecBody46;
        let fRecBody47: f32 = (iTemp14 ? 0.0 : (iTemp15 ? (this.fSlow5 * fRecCur28) : (0.8999999761581421 * fRecCur25)));
        let fRecBody48: f32 = (iTemp15 ? fRecCur28 : fRecCur25);
        this.fRec4[iTemp27] = fRecBody47;
        this.fRec4_1[<i32>(0)] = fRecBody48;
        let fRecBody49: f32 = (iTemp14 ? 0.0 : (iTemp21 ? (this.fSlow5 * fRecCur31) : (0.8999999761581421 * fRecCur29)));
        let fRecBody50: f32 = (iTemp21 ? fRecCur31 : fRecCur29);
        this.fRec6[iTemp27] = fRecBody49;
        this.fRec6_1[<i32>(0)] = fRecBody50;
        let fRecBody51: f32 = (iTemp14 ? 0.0 : (iTemp15 ? (this.fSlow6 * fRecCur34) : (0.8999999761581421 * fRecCur32)));
        let fRecBody52: f32 = (iTemp15 ? fRecCur34 : fRecCur32);
        this.fRec7[iTemp27] = fRecBody51;
        this.fRec7_1[<i32>(0)] = fRecBody52;
        outputs[<i32>(0)] = <f32>((this.fSlow7 * (this.fRec1_1[<i32>(0)] * ((this.fRec0_1[<i32>(0)] + this.fRec3_1[<i32>(0)]) + (0.8999999761581421 * (this.fRec9_1[<i32>(0)] + ((this.fRec4_1[<i32>(0)] + this.fRec6_1[<i32>(0)]) + this.fRec7_1[<i32>(0)])))))));
        this.fVec7[<i32>(1)] = this.fVec7[<i32>(0)];
        this.iRec1[<i32>(1)] = this.iRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.iRec10 = iRecCur10;
        this.fRec11 = fRecCur11;
        this.fVec2747[<i32>(1)] = this.fVec2747[<i32>(0)];
        this.fRec12 = fRecCur12;
        this.iRec14[<i32>(1)] = this.iRec14[<i32>(0)];
        this.iRec14_1[<i32>(1)] = this.iRec14_1[<i32>(0)];
        this.iRec14_2[<i32>(1)] = this.iRec14_2[<i32>(0)];
        this.iRec2[<i32>(1)] = this.iRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec13 = fRecCur13;
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec17 = fRecCur17;
        this.fVec2817[<i32>(1)] = this.fVec2817[<i32>(0)];
        this.fRec18 = fRecCur18;
        this.fRec19 = fRecCur19;
        this.fRec20 = fRecCur20;
        this.fVec2853[<i32>(1)] = this.fVec2853[<i32>(0)];
        this.fRec21 = fRecCur21;
        this.iRec8[<i32>(1)] = this.iRec8[<i32>(0)];
        this.fRec8_1[<i32>(1)] = this.fRec8_1[<i32>(0)];
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec24 = fRecCur24;
        this.fVec2910[<i32>(1)] = this.fVec2910[<i32>(0)];
        this.fRec25 = fRecCur25;
        this.iRec5[<i32>(1)] = this.iRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec26 = fRecCur26;
        this.fRec27 = fRecCur27;
        this.fRec28 = fRecCur28;
        this.fVec2967[<i32>(1)] = this.fVec2967[<i32>(0)];
        this.fRec29 = fRecCur29;
        this.fRec30 = fRecCur30;
        this.fRec31 = fRecCur31;
        this.fVec3002[<i32>(1)] = this.fVec3002[<i32>(0)];
        this.fRec32 = fRecCur32;
        this.fRec33 = fRecCur33;
        this.fRec34 = fRecCur34;
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec9_1[<i32>(1)] = this.fRec9_1[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Pmpiano extends MidiVoice {
    readonly dsp: PmpianoDsp = new PmpianoDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: PmpianoChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<PmpianoChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider1 = this.typedChannel.hammerTone;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider2 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider1 = this.typedChannel.hammerTone;
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
        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.dsp.fButton0 == 0.0) this.releaseSamples++;
        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export class PmpianoChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _bright: f32 = <f32>(1);
    /** bright [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get bright(): f32 { return this._bright; }
    set bright(value: f32) { this._bright = value; this._paramsDirty = true; }
    private _damping: f32 = <f32>(1);
    /** damping [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get damping(): f32 { return this._damping; }
    set damping(value: f32) { this._damping = value; this._paramsDirty = true; }
    private _hammerTone: f32 = <f32>(1);
    /** hammer_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 2 */
    get hammerTone(): f32 { return this._hammerTone; }
    set hammerTone(value: f32) { this._hammerTone = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Pmpiano).applyParams();
        }
    }

    preprocess(): void {
        if (this._paramsDirty) {
            this._paramsDirty = false;
            this.applyParams();
        }
    }

    controlchange(controller: u8, value: u8): void {
        super.controlchange(controller, value);
        switch (controller) {
            case 0:
                this.bright = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.damping = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 2:
                this.hammerTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new PmpianoChannel(10, (channel: MidiChannel) => new Pmpiano(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // bright (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // damping (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
    // hammer tone (CC 2, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(2, 49);
}

export function postprocess(): void {
}
