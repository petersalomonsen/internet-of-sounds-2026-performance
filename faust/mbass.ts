// Faust-generated Mbass
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mbass.dsp

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

export class MbassDsp {
    fSampleRate: i32;
    fVec9: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2100: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fHslider4: f32;
    fSlow1: f32;
    fConst3: f32;
    fConst4: f32;
    fHslider5: f32;
    fSlow2: f32;
    fConst5: f32;
    fHslider2: f32;
    fConst6: f32;
    fSlow3: f32;
    fSlow4: f32;
    fSlow5: f32;
    fSlow6: f32;
    fSlow7: f32;
    fSlow8: f32;
    fHslider1: f32;
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
    fConst7: f32;
    fSlow22: f32;
    fSlow23: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fSlow29: f32;
    fSlow30: f32;
    fSlow31: f32;
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
    iRec6: i32;
    fRec7: f32;
    fRec8: f32;
    iRec9: i32;
    fRec10: f32;
    fRec11: f32;
    fRec12: f32;
    fRec13: f32;

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
        // ui openbox mbass
        // ui slider bright
        // ui slider damping
        // ui slider exciter_tone
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider2 = 1.0;
        this.fHslider1 = 55.0;
        this.fHslider3 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            unchecked(this.fVec9[lDelay0] = 0.0);
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            unchecked(this.fVec2100[lDelay1] = 0.0);
        }
        for (let lRec2: i32 = 0; lRec2 < <i32>(16384); lRec2 = lRec2 + 1) {
            unchecked(this.fRec0[lRec2] = 0.0);
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(2); lRec3 = lRec3 + 1) {
            unchecked(this.fRec0_1[lRec3] = 0.0);
        }
        this.fIOTA = <i32>(0);
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            unchecked(this.fRec1[lRec4] = 0.0);
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            unchecked(this.fRec1_1[lRec5] = 0.0);
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            unchecked(this.fRec1_2[lRec6] = 0.0);
        }
        this.fRec2 = 0.0;
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            unchecked(this.fRec3[lRec7] = 0.0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            unchecked(this.fRec3_1[lRec8] = 0.0);
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            unchecked(this.fRec3_2[lRec9] = 0.0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            unchecked(this.fRec3_3[lRec10] = 0.0);
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            unchecked(this.iRec4[lRec11] = <i32>(0));
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            unchecked(this.fRec4_1[lRec12] = 0.0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            unchecked(this.iRec5[lRec13] = <i32>(0));
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            unchecked(this.fRec5_1[lRec14] = 0.0);
        }
        this.iRec6 = <i32>(0);
        this.fRec7 = 0.0;
        this.fRec8 = 0.0;
        this.iRec9 = <i32>(0);
        this.fRec10 = 0.0;
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.fRec13 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst3 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst5 = (6.2831854820251465 / this.fConst0);
        this.fConst6 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst7 = (12.566370964050293 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MbassDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = (1.0 - (0.0010000000474974513 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0))));
        this.fSlow2 = (127.0 * <f32>(this.fHslider5));
        this.fSlow3 = (this.fConst5 * min<f32>((200.0 * <f32>(this.fHslider2)), this.fConst6));
        this.fSlow4 = Mathf.cos(this.fSlow3);
        this.fSlow5 = (1.0 - this.fSlow4);
        this.fSlow6 = (0.7071067690849304 * Mathf.sin(this.fSlow3));
        this.fSlow7 = (1.0 - this.fSlow6);
        this.fSlow8 = (this.fSlow6 + 1.0);
        this.fSlow9 = <f32>(this.fHslider1);
        this.fSlow10 = (this.fConst5 * min<f32>(max<f32>(10.0, min<f32>(20000.0, (8000.0 * ((this.fSlow9 * <f32>(this.fHslider3)) / Mathf.pow(((17.312339782714844 * Mathf.log((0.0022727272007614374 * this.fSlow9))) + 69.0), 1.7000000476837158))))), this.fConst6));
        this.fSlow11 = Mathf.cos(this.fSlow10);
        this.fSlow12 = (0.7071067690849304 * Mathf.sin(this.fSlow10));
        this.fSlow13 = (this.fSlow12 + 1.0);
        this.fSlow14 = (-2.0 * (this.fSlow11 / this.fSlow13));
        this.fSlow15 = (1.0 - this.fSlow11);
        this.fSlow16 = (this.fSlow15 / this.fSlow13);
        this.fSlow17 = (0.5 * this.fSlow16);
        this.fSlow18 = (1.0 - this.fSlow12);
        this.fSlow19 = (this.fSlow18 / this.fSlow13);
        this.fSlow20 = (-1.0 * (this.fConst5 * this.fSlow9));
        this.fSlow21 = Mathf.sin(this.fSlow20);
        this.fSlow22 = (-1.0 * (this.fConst7 * this.fSlow9));
        this.fSlow23 = Mathf.sin(this.fSlow22);
        this.fSlow24 = (this.fSlow21 + (0.5 * this.fSlow23));
        this.fSlow25 = Mathf.cos(this.fSlow22);
        this.fSlow26 = Mathf.cos(this.fSlow20);
        this.fSlow27 = ((((this.fSlow25 * this.fSlow18) - ((2.0 * this.fSlow26) * this.fSlow11)) / this.fSlow13) + 1.0);
        this.fSlow28 = (this.fSlow26 + (0.5 * (this.fSlow25 + 1.0)));
        this.fSlow29 = ((this.fSlow23 * this.fSlow18) - ((2.0 * this.fSlow21) * this.fSlow11));
        this.fSlow30 = (this.fSlow13 * (Mathf.pow(this.fSlow27, 2.0) + (Mathf.pow(this.fSlow29, 2.0) / Mathf.pow(this.fSlow13, 2.0))));
        this.fSlow31 = ((this.fConst0 / this.fSlow9) * ((0.15915493667125702 * Mathf.atan2(((this.fSlow15 * ((this.fSlow24 * this.fSlow27) - ((this.fSlow28 * this.fSlow29) / this.fSlow13))) / this.fSlow30), ((this.fSlow15 * ((this.fSlow27 * this.fSlow28) + (this.fSlow24 * (this.fSlow29 / this.fSlow13)))) / this.fSlow30))) + 1.0));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        unchecked(this.fVec9[<i32>(0)] = this.fSlow0);
        let fTemp0: f32 = unchecked(this.fVec9[<i32>(1)]);
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur2: f32 = (iTemp0 ? this.fSlow9 : this.fRec2);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : unchecked(this.iRec4[<i32>(1)]));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let iTemp4: i32 = (iTemp0 & (this.fSlow9 != this.fRec2));
        let fTemp1: f32 = (iTemp4 ? 0.0 : unchecked(this.fRec4_1[<i32>(1)]));
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst1));
        let iTemp5: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = max<f32>(0.0, (fTemp1 - this.fConst2));
        let fTemp4: f32 = max<f32>(0.0, fTemp1);
        let iRecCur6: i32 = (<i32>(1103515245) * (this.iRec6 + <i32>(12345)));
        let iRecBody15: i32 = (iTemp2 ? (iTemp5 ? ((fTemp4 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp3 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody16: f32 = (iTemp2 ? (iTemp5 ? fTemp4 : fTemp3) : (iTemp3 ? fTemp2 : fTemp1));
        unchecked(this.iRec4[<i32>(0)] = iRecBody15);
        unchecked(this.fRec4_1[<i32>(0)] = fRecBody16);
        let fTemp5: f32 = (<f32>(iRecCur6) * unchecked(this.fRec4_1[<i32>(0)]));
        let iTemp6: i32 = (<i32>(1) - iTemp4);
        let fTemp6: f32 = <f32>(iTemp6);
        let fTemp7: f32 = unchecked(this.fRec3[<i32>(1)]);
        let fTemp8: f32 = unchecked(this.fRec3_2[<i32>(1)]);
        let iTemp7: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : unchecked(this.iRec5[<i32>(1)])));
        let iTemp8: i32 = (iTemp7 >= <i32>(2));
        let iTemp9: i32 = (iTemp7 >= <i32>(1));
        let fTemp9: f32 = unchecked(this.fRec5_1[<i32>(1)]);
        let fTemp10: f32 = min<f32>(1.0, (fTemp9 + this.fConst1));
        let iTemp10: i32 = (iTemp7 >= <i32>(3));
        let fTemp11: f32 = max<f32>(1.0, (fTemp9 - this.fConst3));
        let fRecCur7: f32 = (iTemp4 ? this.fSlow16 : this.fRec7);
        let fRecBody17: f32 = (0.00000000023283064365386963 * fTemp5);
        let fRecBody18: f32 = (fTemp6 * fTemp7);
        let fRecBody19: f32 = (((this.fSlow5 * ((0.00000000011641532182693481 * fTemp5) + (fTemp6 * (fTemp7 + (0.5 * unchecked(this.fRec3_1[<i32>(1)])))))) + (fTemp6 * ((2.0 * (fTemp8 * this.fSlow4)) - (unchecked(this.fRec3_3[<i32>(1)]) * this.fSlow7)))) / this.fSlow8);
        let fRecBody20: f32 = (fTemp6 * fTemp8);
        unchecked(this.fRec3[<i32>(0)] = fRecBody17);
        unchecked(this.fRec3_1[<i32>(0)] = fRecBody18);
        unchecked(this.fRec3_2[<i32>(0)] = fRecBody19);
        unchecked(this.fRec3_3[<i32>(0)] = fRecBody20);
        let fRecCur8: f32 = (iTemp4 ? this.fSlow31 : this.fRec8);
        let iTemp11: i32 = max<i32>(<i32>(1), <i32>(fRecCur8));
        let fTemp12: f32 = max<f32>(0.0, (fRecCur8 - <f32>(iTemp11)));
        let fTemp13: f32 = (1.0 - fTemp12);
        let fTemp14: f32 = unchecked(this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp11 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))]);
        let iRecCur9: i32 = (iTemp6 * (this.iRec9 + <i32>(1)));
        let fTemp15: f32 = <f32>((iRecCur9 >= iTemp11));
        let fTemp16: f32 = (fTemp14 * fTemp15);
        let fTemp17: f32 = (fTemp12 + 1.0);
        unchecked(this.fVec2100[<i32>(0)] = fTemp16);
        let fRecCur10: f32 = (iTemp4 ? (((fTemp13 * fTemp14) * fTemp15) / fTemp17) : (((fTemp13 * (fTemp16 - this.fRec10)) / fTemp17) + unchecked(this.fVec2100[<i32>(1)])));
        let fTemp18: f32 = (unchecked(this.fRec3_2[<i32>(0)]) + fRecCur10);
        let fRecCur11: f32 = (iTemp4 ? this.fSlow14 : this.fRec11);
        let fRecCur12: f32 = (iTemp4 ? this.fSlow17 : this.fRec12);
        let fTemp19: f32 = (fTemp18 * fRecCur12);
        let fTemp20: f32 = ((fTemp6 * unchecked(this.fRec1[<i32>(1)])) + fTemp19);
        let fRecCur13: f32 = (iTemp4 ? this.fSlow19 : this.fRec13);
        let fRecBody21: f32 = (((unchecked(this.fRec1_1[<i32>(1)]) * fTemp6) + (fRecCur7 * fTemp18)) - (fRecCur11 * fTemp20));
        let fRecBody22: f32 = (fTemp19 - (fTemp20 * fRecCur13));
        let fRecBody23: f32 = fTemp20;
        unchecked(this.fRec1[<i32>(0)] = fRecBody21);
        unchecked(this.fRec1_1[<i32>(0)] = fRecBody22);
        unchecked(this.fRec1_2[<i32>(0)] = fRecBody23);
        let fRecBody24: f32 = (this.fSlow1 * unchecked(this.fRec1_2[<i32>(0)]));
        let fRecBody25: f32 = unchecked(this.fRec1_2[<i32>(0)]);
        unchecked(this.fRec0[(this.fIOTA & <i32>(16383))] = fRecBody24);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody25);
        let iRecBody26: i32 = (iTemp8 ? (iTemp10 ? <i32>(3) : ((fTemp11 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp9 ? ((fTemp10 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody27: f32 = (iTemp8 ? (iTemp10 ? fTemp9 : fTemp11) : (iTemp9 ? fTemp10 : max<f32>(0.0, (fTemp9 - this.fConst4))));
        unchecked(this.iRec5[<i32>(0)] = iRecBody26);
        unchecked(this.fRec5_1[<i32>(0)] = fRecBody27);
        outputs[<i32>(0)] = <f32>((this.fSlow2 * (unchecked(this.fRec0_1[<i32>(0)]) * unchecked(this.fRec5_1[<i32>(0)]))));
        unchecked(this.fVec9[<i32>(1)] = unchecked(this.fVec9[<i32>(0)]));
        this.fRec2 = fRecCur2;
        this.iRec6 = iRecCur6;
        unchecked(this.iRec4[<i32>(1)] = unchecked(this.iRec4[<i32>(0)]));
        unchecked(this.fRec4_1[<i32>(1)] = unchecked(this.fRec4_1[<i32>(0)]));
        this.fRec7 = fRecCur7;
        unchecked(this.fRec3[<i32>(1)] = unchecked(this.fRec3[<i32>(0)]));
        unchecked(this.fRec3_1[<i32>(1)] = unchecked(this.fRec3_1[<i32>(0)]));
        unchecked(this.fRec3_2[<i32>(1)] = unchecked(this.fRec3_2[<i32>(0)]));
        unchecked(this.fRec3_3[<i32>(1)] = unchecked(this.fRec3_3[<i32>(0)]));
        this.fRec8 = fRecCur8;
        this.iRec9 = iRecCur9;
        unchecked(this.fVec2100[<i32>(1)] = unchecked(this.fVec2100[<i32>(0)]));
        this.fRec10 = fRecCur10;
        this.fRec11 = fRecCur11;
        this.fRec12 = fRecCur12;
        this.fRec13 = fRecCur13;
        unchecked(this.fRec1[<i32>(1)] = unchecked(this.fRec1[<i32>(0)]));
        unchecked(this.fRec1_1[<i32>(1)] = unchecked(this.fRec1_1[<i32>(0)]));
        unchecked(this.fRec1_2[<i32>(1)] = unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        unchecked(this.iRec5[<i32>(1)] = unchecked(this.iRec5[<i32>(0)]));
        unchecked(this.fRec5_1[<i32>(1)] = unchecked(this.fRec5_1[<i32>(0)]));
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mbass extends MidiVoice {
    readonly dsp: MbassDsp = new MbassDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MbassChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MbassChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider2 = this.typedChannel.exciterTone;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider2 = this.typedChannel.exciterTone;
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

export class MbassChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _bright: f32 = <f32>(1);
    /** bright [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get bright(): f32 { return this._bright; }
    set bright(value: f32) { this._bright = value; this._paramsDirty = true; }
    private _damping: f32 = <f32>(1);
    /** damping [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get damping(): f32 { return this._damping; }
    set damping(value: f32) { this._damping = value; this._paramsDirty = true; }
    private _exciterTone: f32 = <f32>(1);
    /** exciter_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 2 */
    get exciterTone(): f32 { return this._exciterTone; }
    set exciterTone(value: f32) { this._exciterTone = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mbass).applyParams();
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
                this.exciterTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MbassChannel(10, (channel: MidiChannel) => new Mbass(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // bright (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // damping (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
    // exciter tone (CC 2, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(2, 49);
}

export function postprocess(): void {
}
