// Faust-generated Mstrings
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mstrings.dsp

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

export class MstringsDsp {
    fSampleRate: i32;
    fVec9: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2802: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2840: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fConst0: f32;
    fHslider1: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst1: f32;
    fConst2: f32;
    fHslider4: f32;
    fSlow3: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fHslider5: f32;
    fSlow4: f32;
    fHslider3: f32;
    fSlow5: f32;
    fConst6: f32;
    fHslider2: f32;
    fSlow6: f32;
    fConst7: f32;
    fSlow7: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fSlow11: f32;
    fSlow12: f32;
    fSlow13: f32;
    fSlow14: f32;
    fSlow15: f32;
    fSlow16: f32;
    fSlow17: f32;
    fSlow18: f32;
    fSlow19: f32;
    fSlow20: f32;
    fConst8: f32;
    fSlow21: f32;
    fSlow22: f32;
    fSlow23: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    fRec1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2: f32;
    fRec3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec4: StaticArray<i32> = new StaticArray<i32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec5: StaticArray<i32> = new StaticArray<i32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec9: StaticArray<i32> = new StaticArray<i32>(2);
    iRec9_1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec10: f32;
    fRec11: f32;
    iRec12: i32;
    fRec13: f32;
    fRec14: f32;

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
        // ui openbox mstrings
        // ui slider bow_tone
        // ui slider bright
        // ui slider damping
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider1 = 261.6300048828125;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider3 = 1.0;
        this.fHslider2 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec9[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec2802[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec2840[lDelay2] = 0.0;
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(16384); lRec3 = lRec3 + 1) {
            this.fRec0[lRec3] = 0.0;
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            this.fRec0_1[lRec4] = 0.0;
        }
        this.fIOTA = <i32>(0);
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            this.fRec1[lRec5] = 0.0;
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            this.fRec1_1[lRec6] = 0.0;
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            this.fRec1_2[lRec7] = 0.0;
        }
        this.fRec2 = 0.0;
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec3[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.fRec3_1[lRec9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec3_2[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.fRec3_3[lRec11] = 0.0;
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.iRec4[lRec12] = <i32>(0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.fRec4_1[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.iRec5[lRec14] = <i32>(0);
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec5_1[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(16384); lRec16 = lRec16 + 1) {
            this.fRec6[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.fRec6_1[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec7[lRec18] = 0.0;
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            this.fRec7_1[lRec19] = 0.0;
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec7_2[lRec20] = 0.0;
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            this.fRec8[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.fRec8_1[lRec22] = 0.0;
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            this.fRec8_2[lRec23] = 0.0;
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec8_3[lRec24] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            this.iRec9[lRec25] = <i32>(0);
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            this.iRec9_1[lRec26] = <i32>(0);
        }
        this.fRec10 = 0.0;
        this.fRec11 = 0.0;
        this.iRec12 = <i32>(0);
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 20.0)));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst4 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.30000001192092896)));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst8 = (12.566370964050293 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MstringsDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = <f32>(this.fHslider1);
        this.fSlow2 = (this.fConst0 / this.fSlow1);
        this.fSlow3 = (1.0 - (0.004999999888241291 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0))));
        this.fSlow4 = (5.079999923706055 * <f32>(this.fHslider5));
        this.fSlow5 = max<f32>(10.0, min<f32>(20000.0, (4000.0 * ((this.fSlow1 * <f32>(this.fHslider3)) / Mathf.pow(((17.312339782714844 * Mathf.log((0.0022727272007614374 * this.fSlow1))) + 69.0), 1.2999999523162842)))));
        this.fSlow6 = <f32>(this.fHslider2);
        this.fSlow7 = (this.fConst6 * min<f32>((610.0 * this.fSlow6), this.fConst7));
        this.fSlow8 = Mathf.cos(this.fSlow7);
        this.fSlow9 = (1.0 - this.fSlow8);
        this.fSlow10 = (0.7071067690849304 * Mathf.sin(this.fSlow7));
        this.fSlow11 = (1.0 - this.fSlow10);
        this.fSlow12 = (this.fSlow10 + 1.0);
        this.fSlow13 = (this.fConst6 * min<f32>((620.0 * this.fSlow6), this.fConst7));
        this.fSlow14 = Mathf.cos(this.fSlow13);
        this.fSlow15 = (1.0 - this.fSlow14);
        this.fSlow16 = (0.7071067690849304 * Mathf.sin(this.fSlow13));
        this.fSlow17 = (1.0 - this.fSlow16);
        this.fSlow18 = (this.fSlow16 + 1.0);
        this.fSlow19 = (-1.0 * (this.fConst6 * this.fSlow1));
        this.fSlow20 = Mathf.sin(this.fSlow19);
        this.fSlow21 = (-1.0 * (this.fConst8 * this.fSlow1));
        this.fSlow22 = Mathf.sin(this.fSlow21);
        this.fSlow23 = (this.fSlow20 + (0.5 * this.fSlow22));
        this.fSlow24 = Mathf.cos(this.fSlow19);
        this.fSlow25 = (2.0 * this.fSlow24);
        this.fSlow26 = Mathf.cos(this.fSlow21);
        this.fSlow27 = (this.fSlow24 + (0.5 * (this.fSlow26 + 1.0)));
        this.fSlow28 = (2.0 * this.fSlow20);
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec9[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec9[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur2: f32 = (iTemp0 ? this.fSlow1 : this.fRec2);
        let iTemp1: i32 = (this.fSlow0 < fTemp0);
        let iTemp2: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(0) : this.iRec5[<i32>(1)]));
        let iTemp3: i32 = (iTemp2 >= <i32>(2));
        let iTemp4: i32 = (iTemp2 >= <i32>(1));
        let fTemp1: f32 = this.fRec5_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst3));
        let iTemp5: i32 = (iTemp2 >= <i32>(3));
        let fTemp3: f32 = max<f32>(0.8999999761581421, (fTemp1 - this.fConst4));
        let iTemp6: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(3) : this.iRec4[<i32>(1)]));
        let iTemp7: i32 = (iTemp6 >= <i32>(2));
        let iTemp8: i32 = (iTemp6 >= <i32>(1));
        let iTemp9: i32 = (iTemp0 & (this.fSlow1 != this.fRec2));
        let fTemp4: f32 = (iTemp9 ? 0.0 : this.fRec4_1[<i32>(1)]);
        let fTemp5: f32 = min<f32>(1.0, (fTemp4 + this.fConst1));
        let iTemp10: i32 = (iTemp6 >= <i32>(3));
        let fTemp6: f32 = max<f32>(0.0, (fTemp4 - this.fConst2));
        let fTemp7: f32 = max<f32>(0.0, (fTemp4 - 0.05000000074505806));
        let iTemp11: i32 = (<i32>(1103515245) * (this.iRec9[<i32>(1)] + <i32>(12345)));
        let iRecBody27: i32 = (<i32>(1103515245) * (iTemp11 + <i32>(12345)));
        let iRecBody28: i32 = iTemp11;
        this.iRec9[<i32>(0)] = iRecBody27;
        this.iRec9_1[<i32>(0)] = iRecBody28;
        let iRecBody29: i32 = (iTemp7 ? (iTemp10 ? ((fTemp7 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp6 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp8 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody30: f32 = (iTemp7 ? (iTemp10 ? fTemp7 : fTemp6) : (iTemp8 ? fTemp5 : fTemp4));
        this.iRec4[<i32>(0)] = iRecBody29;
        this.fRec4_1[<i32>(0)] = fRecBody30;
        let fTemp8: f32 = (<f32>(this.iRec9[<i32>(0)]) * this.fRec4_1[<i32>(0)]);
        let iTemp12: i32 = (<i32>(1) - iTemp9);
        let fTemp9: f32 = <f32>(iTemp12);
        let fTemp10: f32 = this.fRec3[<i32>(1)];
        let fTemp11: f32 = this.fRec3_2[<i32>(1)];
        let fTemp12: f32 = (<f32>(this.iRec9_1[<i32>(0)]) * this.fRec4_1[<i32>(0)]);
        let fTemp13: f32 = this.fRec8[<i32>(1)];
        let fTemp14: f32 = this.fRec8_2[<i32>(1)];
        let fRecCur10: f32 = (iTemp9 ? this.fSlow5 : this.fRec10);
        let fTemp15: f32 = (this.fConst6 * min<f32>(fRecCur10, this.fConst7));
        let fTemp16: f32 = Mathf.cos(fTemp15);
        let fTemp17: f32 = (1.0 - fTemp16);
        let fRecBody31: f32 = (0.00000000023283064365386963 * fTemp8);
        let fRecBody32: f32 = (fTemp9 * fTemp10);
        let fRecBody33: f32 = (((this.fSlow9 * ((0.00000000011641532182693481 * fTemp8) + (fTemp9 * (fTemp10 + (0.5 * this.fRec3_1[<i32>(1)]))))) + (fTemp9 * ((2.0 * (fTemp11 * this.fSlow8)) - (this.fRec3_3[<i32>(1)] * this.fSlow11)))) / this.fSlow12);
        let fRecBody34: f32 = (fTemp9 * fTemp11);
        this.fRec3[<i32>(0)] = fRecBody31;
        this.fRec3_1[<i32>(0)] = fRecBody32;
        this.fRec3_2[<i32>(0)] = fRecBody33;
        this.fRec3_3[<i32>(0)] = fRecBody34;
        let fTemp18: f32 = (0.7071067690849304 * Mathf.sin(fTemp15));
        let fTemp19: f32 = (1.0 - fTemp18);
        let fTemp20: f32 = (fTemp18 + 1.0);
        let fTemp21: f32 = ((((this.fSlow26 * fTemp19) - (this.fSlow25 * fTemp16)) / fTemp20) + 1.0);
        let fTemp22: f32 = ((this.fSlow22 * fTemp19) - (this.fSlow28 * fTemp16));
        let fTemp23: f32 = (fTemp20 * (Mathf.pow(fTemp21, 2.0) + (Mathf.pow(fTemp22, 2.0) / Mathf.pow(fTemp20, 2.0))));
        let fRecCur11: f32 = (iTemp9 ? (this.fSlow2 * ((0.15915493667125702 * Mathf.atan2(((fTemp17 * ((this.fSlow23 * fTemp21) - ((this.fSlow27 * fTemp22) / fTemp20))) / fTemp23), ((fTemp17 * ((fTemp21 * this.fSlow27) + (this.fSlow23 * (fTemp22 / fTemp20)))) / fTemp23))) + 1.0)) : this.fRec11);
        let iTemp13: i32 = max<i32>(<i32>(1), <i32>(fRecCur11));
        let fTemp24: f32 = max<f32>(0.0, (fRecCur11 - <f32>(iTemp13)));
        let fTemp25: f32 = (1.0 - fTemp24);
        let iTemp14: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp13 + <i32>(-1))));
        let iRecCur12: i32 = (iTemp12 * (this.iRec12 + <i32>(1)));
        let fTemp26: f32 = <f32>((iRecCur12 >= iTemp13));
        let iTemp15: i32 = ((this.fIOTA - (iTemp14 + <i32>(1))) & <i32>(16383));
        let fTemp27: f32 = (this.fRec0[iTemp15] * fTemp26);
        let fTemp28: f32 = (fTemp24 + 1.0);
        this.fVec2802[<i32>(0)] = fTemp27;
        let fRecCur13: f32 = (((fTemp25 * (fTemp27 - (fTemp9 * this.fRec13))) / fTemp28) + (fTemp9 * this.fVec2802[<i32>(1)]));
        let fTemp29: f32 = (fTemp17 * (this.fRec3_2[<i32>(0)] + fRecCur13));
        let fTemp30: f32 = ((fTemp9 * this.fRec1[<i32>(1)]) + (0.5 * (fTemp29 / fTemp20)));
        let fRecBody35: f32 = ((this.fRec1_1[<i32>(1)] * fTemp9) + ((fTemp29 + (2.0 * (fTemp16 * fTemp30))) / fTemp20));
        let fRecBody36: f32 = (((0.5 * fTemp29) - (fTemp19 * fTemp30)) / fTemp20);
        let fRecBody37: f32 = fTemp30;
        this.fRec1[<i32>(0)] = fRecBody35;
        this.fRec1_1[<i32>(0)] = fRecBody36;
        this.fRec1_2[<i32>(0)] = fRecBody37;
        let iRecBody38: i32 = (iTemp3 ? (iTemp5 ? <i32>(3) : ((fTemp3 <= 0.8999999761581421) ? <i32>(3) : <i32>(2))) : (iTemp4 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody39: f32 = (iTemp3 ? (iTemp5 ? fTemp1 : fTemp3) : (iTemp4 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst5))));
        this.iRec5[<i32>(0)] = iRecBody38;
        this.fRec5_1[<i32>(0)] = fRecBody39;
        let fRecBody40: f32 = (this.fSlow3 * this.fRec1_2[<i32>(0)]);
        let fRecBody41: f32 = this.fRec1_2[<i32>(0)];
        let iTemp16: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp16] = fRecBody40;
        this.fRec0_1[<i32>(0)] = fRecBody41;
        let fRecBody42: f32 = (0.00000000023283064365386963 * fTemp12);
        let fRecBody43: f32 = (fTemp9 * fTemp13);
        let fRecBody44: f32 = (((this.fSlow15 * ((0.00000000011641532182693481 * fTemp12) + (fTemp9 * (fTemp13 + (0.5 * this.fRec8_1[<i32>(1)]))))) + (fTemp9 * ((2.0 * (fTemp14 * this.fSlow14)) - (this.fRec8_3[<i32>(1)] * this.fSlow17)))) / this.fSlow18);
        let fRecBody45: f32 = (fTemp9 * fTemp14);
        this.fRec8[<i32>(0)] = fRecBody42;
        this.fRec8_1[<i32>(0)] = fRecBody43;
        this.fRec8_2[<i32>(0)] = fRecBody44;
        this.fRec8_3[<i32>(0)] = fRecBody45;
        let fTemp31: f32 = (fTemp26 * this.fRec6[iTemp15]);
        this.fVec2840[<i32>(0)] = fTemp31;
        let fRecCur14: f32 = (((fTemp25 * (fTemp31 - (fTemp9 * this.fRec14))) / fTemp28) + (fTemp9 * this.fVec2840[<i32>(1)]));
        let fTemp32: f32 = (fTemp17 * (this.fRec8_2[<i32>(0)] + fRecCur14));
        let fTemp33: f32 = ((fTemp9 * this.fRec7[<i32>(1)]) + (0.5 * (fTemp32 / fTemp20)));
        let fRecBody46: f32 = ((fTemp9 * this.fRec7_1[<i32>(1)]) + ((fTemp32 + (2.0 * (fTemp16 * fTemp33))) / fTemp20));
        let fRecBody47: f32 = (((0.5 * fTemp32) - (fTemp19 * fTemp33)) / fTemp20);
        let fRecBody48: f32 = fTemp33;
        this.fRec7[<i32>(0)] = fRecBody46;
        this.fRec7_1[<i32>(0)] = fRecBody47;
        this.fRec7_2[<i32>(0)] = fRecBody48;
        let fRecBody49: f32 = (this.fSlow3 * this.fRec7_2[<i32>(0)]);
        let fRecBody50: f32 = this.fRec7_2[<i32>(0)];
        this.fRec6[iTemp16] = fRecBody49;
        this.fRec6_1[<i32>(0)] = fRecBody50;
        outputs[<i32>(0)] = <f32>((this.fSlow4 * (this.fRec5_1[<i32>(0)] * this.fRec0_1[<i32>(0)])));
        outputs[<i32>(1)] = <f32>((this.fSlow4 * (this.fRec5_1[<i32>(0)] * this.fRec6_1[<i32>(0)])));
        this.fVec9[<i32>(1)] = this.fVec9[<i32>(0)];
        this.fRec2 = fRecCur2;
        this.iRec9[<i32>(1)] = this.iRec9[<i32>(0)];
        this.iRec9_1[<i32>(1)] = this.iRec9_1[<i32>(0)];
        this.iRec4[<i32>(1)] = this.iRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec10 = fRecCur10;
        this.fRec3[<i32>(1)] = this.fRec3[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec3_2[<i32>(1)] = this.fRec3_2[<i32>(0)];
        this.fRec3_3[<i32>(1)] = this.fRec3_3[<i32>(0)];
        this.fRec11 = fRecCur11;
        this.iRec12 = iRecCur12;
        this.fVec2802[<i32>(1)] = this.fVec2802[<i32>(0)];
        this.fRec13 = fRecCur13;
        this.fRec1[<i32>(1)] = this.fRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec1_2[<i32>(1)] = fRecBody41;
        this.iRec5[<i32>(1)] = this.iRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec8[<i32>(1)] = this.fRec8[<i32>(0)];
        this.fRec8_1[<i32>(1)] = this.fRec8_1[<i32>(0)];
        this.fRec8_2[<i32>(1)] = this.fRec8_2[<i32>(0)];
        this.fRec8_3[<i32>(1)] = this.fRec8_3[<i32>(0)];
        this.fVec2840[<i32>(1)] = this.fVec2840[<i32>(0)];
        this.fRec14 = fRecCur14;
        this.fRec7[<i32>(1)] = this.fRec7[<i32>(0)];
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fRec7_2[<i32>(1)] = fRecBody50;
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mstrings extends MidiVoice {
    readonly dsp: MstringsDsp = new MstringsDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(2);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MstringsChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MstringsChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider2 = this.typedChannel.bowTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider2 = this.typedChannel.bowTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
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

export class MstringsChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _bowTone: f32 = <f32>(1);
    /** bow_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get bowTone(): f32 { return this._bowTone; }
    set bowTone(value: f32) { this._bowTone = value; this._paramsDirty = true; }
    private _bright: f32 = <f32>(1);
    /** bright [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get bright(): f32 { return this._bright; }
    set bright(value: f32) { this._bright = value; this._paramsDirty = true; }
    private _damping: f32 = <f32>(1);
    /** damping [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 2 */
    get damping(): f32 { return this._damping; }
    set damping(value: f32) { this._damping = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mstrings).applyParams();
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
                this.bowTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.bright = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 2:
                this.damping = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MstringsChannel(10, (channel: MidiChannel) => new Mstrings(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // bow tone (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // bright (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
    // damping (CC 2, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(2, 49);
}

export function postprocess(): void {
}
