// Faust-generated Mflute
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mflute.dsp

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

export class MfluteDsp {
    fSampleRate: i32;
    fVec22: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2889: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fHslider1: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fConst3: f32;
    fConst4: f32;
    fHslider4: f32;
    fSlow3: f32;
    fConst5: f32;
    fHslider2: f32;
    fConst6: f32;
    fSlow4: f32;
    fSlow5: f32;
    fSlow6: f32;
    fSlow7: f32;
    fSlow8: f32;
    fSlow9: f32;
    fHslider3: f32;
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
    fSlow21: f32;
    fSlow22: f32;
    fSlow23: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fSlow29: f32;
    fConst7: f32;
    fSlow30: f32;
    fSlow31: f32;
    fConst8: f32;
    fSlow32: f32;
    fSlow33: f32;
    fSlow34: f32;
    fSlow35: f32;
    fSlow36: f32;
    fSlow37: f32;
    fSlow38: f32;
    fSlow39: f32;
    fSlow40: f32;
    fSlow41: f32;
    fSlow42: f32;
    fSlow43: f32;
    fSlow44: f32;
    fSlow45: f32;
    fSlow46: f32;
    fSlow47: f32;
    fSlow48: f32;
    fSlow49: f32;
    fSlow50: f32;
    fSlow51: f32;
    iRec0: StaticArray<i32> = new StaticArray<i32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2: f32;
    iRec3: i32;
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
    fRec7: f32;
    fRec8: f32;
    fRec9: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    iRec10: i32;
    fRec11: f32;
    fRec12: f32;
    fRec13: f32;
    fRec14: f32;
    fRec15: f32;
    fRec16: f32;
    fRec17: f32;
    fRec18: f32;

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
        // ui openbox mflute
        // ui slider breath_tone
        // ui slider bright
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider1 = 880.0;
        this.fHslider4 = 0.800000011920929;
        this.fHslider2 = 1.0;
        this.fHslider3 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec22[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec2889[lDelay1] = 0.0;
        }
        for (let lRec2: i32 = 0; lRec2 < <i32>(2); lRec2 = lRec2 + 1) {
            this.iRec0[lRec2] = <i32>(0);
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(2); lRec3 = lRec3 + 1) {
            this.fRec0_1[lRec3] = 0.0;
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            this.iRec1[lRec4] = <i32>(0);
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            this.fRec1_1[lRec5] = 0.0;
        }
        this.fRec2 = 0.0;
        this.iRec3 = <i32>(0);
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec4[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.fRec4_1[lRec9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec4_2[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.fRec4_3[lRec11] = 0.0;
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.fRec5[lRec12] = 0.0;
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.fRec5_1[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.fRec5_2[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec5_3[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec6[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.fRec6_1[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec6_2[lRec18] = 0.0;
        }
        this.fRec7 = 0.0;
        this.fRec8 = 0.0;
        for (let lRec23: i32 = 0; lRec23 < <i32>(16384); lRec23 = lRec23 + 1) {
            this.fRec9[lRec23] = 0.0;
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec9_1[lRec24] = 0.0;
        }
        this.fIOTA = <i32>(0);
        this.iRec10 = <i32>(0);
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.fRec17 = 0.0;
        this.fRec18 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.05000000074505806)));
        this.fConst4 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst5 = (6.2831854820251465 / this.fConst0);
        this.fConst6 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst7 = (10.053096771240234 / this.fConst0);
        this.fConst8 = (20.10619354248047 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MfluteDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = <f32>(this.fHslider1);
        this.fSlow2 = (1.600000023841858 * this.fSlow1);
        this.fSlow3 = (5.079999923706055 * <f32>(this.fHslider4));
        this.fSlow4 = (this.fConst5 * min<f32>((150.0 * <f32>(this.fHslider2)), this.fConst6));
        this.fSlow5 = Mathf.cos(this.fSlow4);
        this.fSlow6 = (1.0 - this.fSlow5);
        this.fSlow7 = (0.7071067690849304 * Mathf.sin(this.fSlow4));
        this.fSlow8 = (1.0 - this.fSlow7);
        this.fSlow9 = (this.fSlow7 + 1.0);
        this.fSlow10 = (this.fConst5 * min<f32>(max<f32>(10.0, min<f32>(20000.0, (80.0 * (Mathf.pow(this.fSlow1, 0.5) * <f32>(this.fHslider3))))), this.fConst6));
        this.fSlow11 = Mathf.cos(this.fSlow10);
        this.fSlow12 = (0.7071067690849304 * Mathf.sin(this.fSlow10));
        this.fSlow13 = (this.fSlow12 + 1.0);
        this.fSlow14 = (-2.0 * (this.fSlow11 / this.fSlow13));
        this.fSlow15 = (1.0 - this.fSlow11);
        this.fSlow16 = (this.fSlow15 / this.fSlow13);
        this.fSlow17 = (0.5 * this.fSlow16);
        this.fSlow18 = (1.0 - this.fSlow12);
        this.fSlow19 = (this.fSlow18 / this.fSlow13);
        this.fSlow20 = (this.fConst5 * min<f32>((0.800000011920929 * this.fSlow1), this.fConst6));
        this.fSlow21 = Mathf.cos(this.fSlow20);
        this.fSlow22 = (this.fSlow21 + 1.0);
        this.fSlow23 = (0.5376344323158264 * Mathf.sin(this.fSlow20));
        this.fSlow24 = (this.fSlow23 + 1.0);
        this.fSlow25 = (this.fSlow22 / this.fSlow24);
        this.fSlow26 = (0.5 * this.fSlow25);
        this.fSlow27 = (-2.0 * (this.fSlow21 / this.fSlow24));
        this.fSlow28 = (1.0 - this.fSlow23);
        this.fSlow29 = (this.fSlow28 / this.fSlow24);
        this.fSlow30 = (-1.0 * (this.fConst7 * this.fSlow1));
        this.fSlow31 = Mathf.sin(this.fSlow30);
        this.fSlow32 = (-1.0 * (this.fConst8 * this.fSlow1));
        this.fSlow33 = Mathf.sin(this.fSlow32);
        this.fSlow34 = (0.5 * this.fSlow33);
        this.fSlow35 = (this.fSlow31 + this.fSlow34);
        this.fSlow36 = Mathf.cos(this.fSlow32);
        this.fSlow37 = Mathf.cos(this.fSlow30);
        this.fSlow38 = (2.0 * this.fSlow37);
        this.fSlow39 = ((((this.fSlow36 * this.fSlow18) - (this.fSlow38 * this.fSlow11)) / this.fSlow13) + 1.0);
        this.fSlow40 = (0.5 * (this.fSlow36 + 1.0));
        this.fSlow41 = (this.fSlow37 + this.fSlow40);
        this.fSlow42 = (2.0 * this.fSlow31);
        this.fSlow43 = ((this.fSlow33 * this.fSlow18) - (this.fSlow42 * this.fSlow11));
        this.fSlow44 = (this.fSlow13 * (Mathf.pow(this.fSlow39, 2.0) + (Mathf.pow(this.fSlow43, 2.0) / Mathf.pow(this.fSlow13, 2.0))));
        this.fSlow45 = (this.fSlow34 - this.fSlow31);
        this.fSlow46 = ((((this.fSlow36 * this.fSlow28) - (this.fSlow38 * this.fSlow21)) / this.fSlow24) + 1.0);
        this.fSlow47 = (this.fSlow40 - this.fSlow37);
        this.fSlow48 = ((this.fSlow33 * this.fSlow28) - (this.fSlow42 * this.fSlow21));
        this.fSlow49 = (this.fSlow24 * (Mathf.pow(this.fSlow46, 2.0) + (Mathf.pow(this.fSlow48, 2.0) / Mathf.pow(this.fSlow24, 2.0))));
        this.fSlow50 = ((this.fConst0 / this.fSlow1) * ((0.09947183728218079 * (Mathf.atan2(((this.fSlow15 * ((this.fSlow35 * this.fSlow39) - ((this.fSlow41 * this.fSlow43) / this.fSlow13))) / this.fSlow44), ((this.fSlow15 * ((this.fSlow39 * this.fSlow41) + (this.fSlow35 * (this.fSlow43 / this.fSlow13)))) / this.fSlow44)) + Mathf.atan2(((this.fSlow22 * ((this.fSlow45 * this.fSlow46) - ((this.fSlow47 * this.fSlow48) / this.fSlow24))) / this.fSlow49), ((this.fSlow22 * ((this.fSlow46 * this.fSlow47) + (this.fSlow45 * (this.fSlow48 / this.fSlow24)))) / this.fSlow49)))) + 0.625));
        this.fSlow51 = (-1.0 * this.fSlow25);
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec22[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec22[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : this.iRec0[<i32>(1)]));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let fTemp1: f32 = this.fRec0_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst3));
        let iTemp4: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = max<f32>(1.0, (fTemp1 - this.fConst4));
        let iTemp5: i32 = (iTemp0 ? <i32>(1) : this.iRec1[<i32>(1)]);
        let iTemp6: i32 = (iTemp5 >= <i32>(2));
        let iTemp7: i32 = (iTemp5 >= <i32>(1));
        let iTemp8: i32 = (iTemp0 & (this.fSlow2 != this.fRec2));
        let fTemp4: f32 = (iTemp8 ? 0.0 : this.fRec1_1[<i32>(1)]);
        let fTemp5: f32 = min<f32>(1.0, (fTemp4 + this.fConst1));
        let iTemp9: i32 = (iTemp5 >= <i32>(3));
        let fTemp6: f32 = max<f32>(0.0, (fTemp4 - this.fConst2));
        let fTemp7: f32 = max<f32>(0.0, fTemp4);
        let iRecCur3: i32 = (<i32>(1103515245) * (this.iRec3 + <i32>(12345)));
        let iRecBody6: i32 = (iTemp6 ? (iTemp9 ? ((fTemp7 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp6 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp7 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody7: f32 = (iTemp6 ? (iTemp9 ? fTemp7 : fTemp6) : (iTemp7 ? fTemp5 : fTemp4));
        this.iRec1[<i32>(0)] = iRecBody6;
        this.fRec1_1[<i32>(0)] = fRecBody7;
        let fTemp8: f32 = (<f32>(iRecCur3) * this.fRec1_1[<i32>(0)]);
        let iTemp10: i32 = (<i32>(1) - iTemp8);
        let fTemp9: f32 = <f32>(iTemp10);
        let fTemp10: f32 = this.fRec4[<i32>(1)];
        let fTemp11: f32 = this.fRec4_2[<i32>(1)];
        let fTemp12: f32 = this.fRec5[<i32>(1)];
        let fTemp13: f32 = this.fRec5_2[<i32>(1)];
        let fRecCur7: f32 = (iTemp8 ? this.fSlow16 : this.fRec7);
        let fRecBody19: f32 = (0.00000000023283064365386963 * fTemp8);
        let fRecBody20: f32 = (fTemp9 * fTemp10);
        let fRecBody21: f32 = (((this.fSlow6 * ((0.00000000011641532182693481 * fTemp8) + (fTemp9 * (fTemp10 + (0.5 * this.fRec4_1[<i32>(1)]))))) + (fTemp9 * ((2.0 * (fTemp11 * this.fSlow5)) - (this.fRec4_3[<i32>(1)] * this.fSlow8)))) / this.fSlow9);
        let fRecBody22: f32 = (fTemp9 * fTemp11);
        this.fRec4[<i32>(0)] = fRecBody19;
        this.fRec4_1[<i32>(0)] = fRecBody20;
        this.fRec4_2[<i32>(0)] = fRecBody21;
        this.fRec4_3[<i32>(0)] = fRecBody22;
        let fRecCur8: f32 = (iTemp8 ? this.fSlow50 : this.fRec8);
        let iTemp11: i32 = max<i32>(<i32>(1), <i32>(fRecCur8));
        let fTemp14: f32 = max<f32>(0.0, (fRecCur8 - <f32>(iTemp11)));
        let fTemp15: f32 = (1.0 - fTemp14);
        let fTemp16: f32 = this.fRec9[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp11 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))];
        let iRecCur10: i32 = (iTemp10 * (this.iRec10 + <i32>(1)));
        let fTemp17: f32 = <f32>((iRecCur10 >= iTemp11));
        let fTemp18: f32 = (fTemp16 * fTemp17);
        let fTemp19: f32 = (fTemp14 + 1.0);
        this.fVec2889[<i32>(0)] = fTemp18;
        let fRecCur11: f32 = (iTemp8 ? (((fTemp15 * fTemp16) * fTemp17) / fTemp19) : (((fTemp15 * (fTemp18 - this.fRec11)) / fTemp19) + this.fVec2889[<i32>(1)]));
        let fTemp20: f32 = (this.fRec4_2[<i32>(0)] + fRecCur11);
        let fRecCur12: f32 = (iTemp8 ? this.fSlow14 : this.fRec12);
        let fRecCur13: f32 = (iTemp8 ? this.fSlow17 : this.fRec13);
        let fTemp21: f32 = (fTemp20 * fRecCur13);
        let fTemp22: f32 = ((fTemp9 * this.fRec6[<i32>(1)]) + fTemp21);
        let fRecCur14: f32 = (iTemp8 ? this.fSlow19 : this.fRec14);
        let fRecBody25: f32 = (((this.fRec6_1[<i32>(1)] * fTemp9) + (fRecCur7 * fTemp20)) - (fRecCur12 * fTemp22));
        let fRecBody26: f32 = (fTemp21 - (fTemp22 * fRecCur14));
        let fRecBody27: f32 = fTemp22;
        this.fRec6[<i32>(0)] = fRecBody25;
        this.fRec6_1[<i32>(0)] = fRecBody26;
        this.fRec6_2[<i32>(0)] = fRecBody27;
        let fRecCur15: f32 = (iTemp8 ? this.fSlow26 : this.fRec15);
        let fRecCur16: f32 = (iTemp8 ? this.fSlow51 : this.fRec16);
        let fRecCur17: f32 = (iTemp8 ? this.fSlow27 : this.fRec17);
        let fRecCur18: f32 = (iTemp8 ? this.fSlow29 : this.fRec18);
        let fRecBody28: f32 = this.fRec6_2[<i32>(0)];
        let fRecBody29: f32 = (fTemp9 * fTemp12);
        let fRecBody30: f32 = ((fRecBody28 * fRecCur15) + (fTemp9 * (((fTemp12 * fRecCur16) + (this.fRec5_1[<i32>(1)] * fRecCur15)) - ((fTemp13 * fRecCur17) + (this.fRec5_3[<i32>(1)] * fRecCur18)))));
        let fRecBody31: f32 = (fTemp9 * fTemp13);
        this.fRec5[<i32>(0)] = fRecBody28;
        this.fRec5_1[<i32>(0)] = fRecBody29;
        this.fRec5_2[<i32>(0)] = fRecBody30;
        this.fRec5_3[<i32>(0)] = fRecBody31;
        let fRecCur2: f32 = (iTemp0 ? this.fSlow2 : this.fRec2);
        let iRecBody32: i32 = (iTemp2 ? (iTemp4 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody33: f32 = (iTemp2 ? (iTemp4 ? fTemp1 : fTemp3) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst2))));
        this.iRec0[<i32>(0)] = iRecBody32;
        this.fRec0_1[<i32>(0)] = fRecBody33;
        let fRecBody34: f32 = Mathf.tanh((-1.100000023841858 * this.fRec5_2[<i32>(0)]));
        let fRecBody35: f32 = this.fRec5_2[<i32>(0)];
        this.fRec9[(this.fIOTA & <i32>(16383))] = fRecBody34;
        this.fRec9_1[<i32>(0)] = fRecBody35;
        outputs[<i32>(0)] = <f32>((this.fSlow3 * (this.fRec0_1[<i32>(0)] * this.fRec9_1[<i32>(0)])));
        this.fVec22[<i32>(1)] = this.fVec22[<i32>(0)];
        this.iRec3 = iRecCur3;
        this.iRec1[<i32>(1)] = this.iRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec7 = fRecCur7;
        this.fRec4[<i32>(1)] = this.fRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec4_2[<i32>(1)] = this.fRec4_2[<i32>(0)];
        this.fRec4_3[<i32>(1)] = this.fRec4_3[<i32>(0)];
        this.fRec8 = fRecCur8;
        this.iRec10 = iRecCur10;
        this.fVec2889[<i32>(1)] = this.fVec2889[<i32>(0)];
        this.fRec11 = fRecCur11;
        this.fRec12 = fRecCur12;
        this.fRec13 = fRecCur13;
        this.fRec14 = fRecCur14;
        this.fRec6[<i32>(1)] = this.fRec6[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec6_2[<i32>(1)] = this.fRec6_2[<i32>(0)];
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec17 = fRecCur17;
        this.fRec18 = fRecCur18;
        this.fRec5[<i32>(1)] = this.fRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec5_2[<i32>(1)] = fRecBody35;
        this.fRec5_3[<i32>(1)] = this.fRec5_3[<i32>(0)];
        this.fRec2 = fRecCur2;
        this.iRec0[<i32>(1)] = this.iRec0[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec9_1[<i32>(1)] = this.fRec9_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mflute extends MidiVoice {
    readonly dsp: MfluteDsp = new MfluteDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MfluteChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MfluteChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider2 = this.typedChannel.breathTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider4 = <f32>velocity / 127.0;
        this.dsp.fHslider2 = this.typedChannel.breathTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
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

export class MfluteEffectDsp {
    fSampleRate: i32;
    fHslider0: f32;
    fSlow0: f32;
    fConst0: f32;
    fHslider1: f32;
    iSlow0: i32;
    iSlow1: i32;
    iSlow2: i32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(262144);
    fIOTA: i32;

    getSampleRate(): i32 {
        return this.fSampleRate;
    }
    getNumInputs(): i32 {
        return 1;
    }
    getNumOutputs(): i32 {
        return 1;
    }
    metadata(m: usize): void {
    }
    buildUserInterface(ui_interface: usize): void {
        // ui openbox mflute_effect
        // metadata midi
        // ui slider echo_send
        // metadata midi
        // ui slider echo_time
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fHslider0 = 1.0;
        this.fHslider1 = 1.0;
    }
    instanceClear(): void {
        for (let lRec0: i32 = 0; lRec0 < <i32>(262144); lRec0 = lRec0 + 1) {
            this.fRec0[lRec0] = 0.0;
        }
        this.fIOTA = <i32>(0);
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = (min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate))) * 0.36000001430511475);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MfluteEffectDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fHslider0);
        this.iSlow0 = max<i32>(<i32>(1), <i32>((this.fConst0 * <f32>(this.fHslider1))));
        this.iSlow1 = min<i32>(<i32>(131072), max<i32>(<i32>(0), (this.iSlow0 + <i32>(-1))));
        this.iSlow2 = min<i32>(<i32>(131072), max<i32>(<i32>(0), this.iSlow0));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fTemp0: f32 = <f32>(inputs[<i32>(0)]);
        this.fRec0[(this.fIOTA & <i32>(262143))] = ((0.30000001192092896 * this.fRec0[((this.fIOTA - (this.iSlow1 + <i32>(1))) & <i32>(262143))]) + (this.fSlow0 * fTemp0));
        outputs[<i32>(0)] = <f32>((fTemp0 + (0.4242640733718872 * this.fRec0[((this.fIOTA - (this.iSlow2 + <i32>(0))) & <i32>(262143))])));
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class MfluteChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _breathTone: f32 = <f32>(1);
    /** breath_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get breathTone(): f32 { return this._breathTone; }
    set breathTone(value: f32) { this._breathTone = value; this._paramsDirty = true; }
    private _bright: f32 = <f32>(1);
    /** bright [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get bright(): f32 { return this._bright; }
    set bright(value: f32) { this._bright = value; this._paramsDirty = true; }
    private _echoSend: f32 = <f32>(1);
    /** echo_send [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 3 */
    get echoSend(): f32 { return this._echoSend; }
    set echoSend(value: f32) { this._echoSend = value; this._paramsDirty = true; }
    private _echoTime: f32 = <f32>(1);
    /** echo_time [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 2 */
    get echoTime(): f32 { return this._echoTime; }
    set echoTime(value: f32) { this._echoTime = value; this._paramsDirty = true; }

    readonly effectDsp: MfluteEffectDsp = new MfluteEffectDsp();
    private efin: StaticArray<f32> = new StaticArray<f32>(1);
    private efout: StaticArray<f32> = new StaticArray<f32>(1);

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this.effectDsp.init(<i32>SAMPLERATE);
    }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mflute).applyParams();
        }
        this.effectDsp.fHslider0 = this._echoSend;
        this.effectDsp.fHslider1 = this._echoTime;
        this.effectDsp.control();
    }

    preprocess(): void {
        if (this._paramsDirty) {
            this._paramsDirty = false;
            this.applyParams();
        }
        this.efin[0] = this.signal.left;
        this.effectDsp.frame(this.efin, this.efout);
        this.signal.left = this.efout[0];
        this.signal.right = this.efout[0];
    }

    controlchange(controller: u8, value: u8): void {
        super.controlchange(controller, value);
        switch (controller) {
            case 3:
                this.echoSend = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
            case 2:
                this.echoTime = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
            case 0:
                this.breathTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.bright = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MfluteChannel(10, (channel: MidiChannel) => new Mflute(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // breath tone (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // bright (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
}

export function postprocess(): void {
}
