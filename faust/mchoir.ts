// Faust-generated Mchoir
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mchoir.dsp

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

export class MchoirDsp {
    fSampleRate: i32;
    fVec9: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3000: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3088: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fHslider2: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fHslider4: f32;
    fSlow3: f32;
    fConst6: f32;
    fHslider1: f32;
    fConst7: f32;
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
    fConst8: f32;
    fSlow21: f32;
    fSlow22: f32;
    fConst9: f32;
    fSlow23: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fSlow29: f32;
    fSlow30: f32;
    fSlow31: f32;
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
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
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
    fRec4: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec5_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: f32;
    iRec7: StaticArray<i32> = new StaticArray<i32>(2);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec8: f32;
    iRec9: i32;
    fRec10: f32;
    fRec11: f32;
    iRec12: i32;
    fRec13: f32;
    fRec14: f32;
    fRec15: f32;
    fRec16: f32;
    fRec17: f32;
    fRec18: f32;
    iRec19: i32;
    fRec20: f32;
    fRec21: f32;
    fRec22: f32;
    fRec23: f32;

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
        // ui openbox mchoir
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
        this.fHslider2 = 587.3300170898438;
        this.fHslider4 = 0.800000011920929;
        this.fHslider1 = 1.0;
        this.fHslider3 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec9[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec3000[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec3088[lDelay2] = 0.0;
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
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec2[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.fRec2_1[lRec9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec2_2[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            this.fRec2_3[lRec11] = 0.0;
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.iRec3[lRec12] = <i32>(0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.fRec3_1[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(16384); lRec14 = lRec14 + 1) {
            this.fRec4[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec4_1[lRec15] = 0.0;
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec5[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            this.fRec5_1[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec5_2[lRec18] = 0.0;
        }
        this.fRec6 = 0.0;
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            this.iRec7[lRec19] = <i32>(0);
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec7_1[lRec20] = 0.0;
        }
        this.fRec8 = 0.0;
        this.iRec9 = <i32>(0);
        this.fRec10 = 0.0;
        this.fRec11 = 0.0;
        this.iRec12 = <i32>(0);
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.fRec17 = 0.0;
        this.fRec18 = 0.0;
        this.iRec19 = <i32>(0);
        this.fRec20 = 0.0;
        this.fRec21 = 0.0;
        this.fRec22 = 0.0;
        this.fRec23 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.15000000596046448)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.20000000298023224)));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.30000001192092896)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.05000000074505806)));
        this.fConst5 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst8 = (12.566370964050293 / this.fConst0);
        this.fConst9 = (25.132741928100586 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MchoirDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = <f32>(this.fHslider2);
        this.fSlow2 = (2.0 * this.fSlow1);
        this.fSlow3 = (1.5240000486373901 * <f32>(this.fHslider4));
        this.fSlow4 = (this.fConst6 * min<f32>((2500.0 * <f32>(this.fHslider1)), this.fConst7));
        this.fSlow5 = Mathf.cos(this.fSlow4);
        this.fSlow6 = (1.0 - this.fSlow5);
        this.fSlow7 = (0.8333333134651184 * Mathf.sin(this.fSlow4));
        this.fSlow8 = (1.0 - this.fSlow7);
        this.fSlow9 = (this.fSlow7 + 1.0);
        this.fSlow10 = (this.fConst6 * min<f32>(max<f32>(10.0, min<f32>(20000.0, (2000.0 * (<f32>(this.fHslider3) * Mathf.log((0.009999999776482582 * this.fSlow1)))))), this.fConst7));
        this.fSlow11 = Mathf.cos(this.fSlow10);
        this.fSlow12 = (0.7071067690849304 * Mathf.sin(this.fSlow10));
        this.fSlow13 = (this.fSlow12 + 1.0);
        this.fSlow14 = (-2.0 * (this.fSlow11 / this.fSlow13));
        this.fSlow15 = (1.0 - this.fSlow11);
        this.fSlow16 = (this.fSlow15 / this.fSlow13);
        this.fSlow17 = (0.5 * this.fSlow16);
        this.fSlow18 = (1.0 - this.fSlow12);
        this.fSlow19 = (this.fSlow18 / this.fSlow13);
        this.fSlow20 = (this.fConst0 / this.fSlow1);
        this.fSlow21 = (-1.0 * (this.fConst8 * this.fSlow1));
        this.fSlow22 = Mathf.sin(this.fSlow21);
        this.fSlow23 = (-1.0 * (this.fConst9 * this.fSlow1));
        this.fSlow24 = Mathf.sin(this.fSlow23);
        this.fSlow25 = (this.fSlow22 + (0.5 * this.fSlow24));
        this.fSlow26 = Mathf.cos(this.fSlow23);
        this.fSlow27 = Mathf.cos(this.fSlow21);
        this.fSlow28 = ((((this.fSlow26 * this.fSlow18) - ((2.0 * this.fSlow27) * this.fSlow11)) / this.fSlow13) + 1.0);
        this.fSlow29 = (this.fSlow27 + (0.5 * (this.fSlow26 + 1.0)));
        this.fSlow30 = ((this.fSlow24 * this.fSlow18) - ((2.0 * this.fSlow22) * this.fSlow11));
        this.fSlow31 = Mathf.pow(this.fSlow13, 2.0);
        this.fSlow32 = (this.fSlow13 * (Mathf.pow(this.fSlow28, 2.0) + (Mathf.pow(this.fSlow30, 2.0) / this.fSlow31)));
        this.fSlow33 = (this.fSlow20 * ((0.07957746833562851 * Mathf.atan2(((this.fSlow15 * ((this.fSlow25 * this.fSlow28) - ((this.fSlow29 * this.fSlow30) / this.fSlow13))) / this.fSlow32), ((this.fSlow15 * ((this.fSlow28 * this.fSlow29) + (this.fSlow25 * (this.fSlow30 / this.fSlow13)))) / this.fSlow32))) + 0.5));
        this.fSlow34 = (-1.0 * (this.fConst6 * this.fSlow1));
        this.fSlow35 = Mathf.sin(this.fSlow34);
        this.fSlow36 = (this.fSlow35 + (0.5 * this.fSlow22));
        this.fSlow37 = Mathf.cos(this.fSlow34);
        this.fSlow38 = ((((this.fSlow27 * this.fSlow18) - ((2.0 * this.fSlow37) * this.fSlow11)) / this.fSlow13) + 1.0);
        this.fSlow39 = (this.fSlow37 + (0.5 * (this.fSlow27 + 1.0)));
        this.fSlow40 = ((this.fSlow22 * this.fSlow18) - ((2.0 * this.fSlow35) * this.fSlow11));
        this.fSlow41 = (this.fSlow13 * (Mathf.pow(this.fSlow38, 2.0) + (Mathf.pow(this.fSlow40, 2.0) / this.fSlow31)));
        this.fSlow42 = (this.fSlow20 * ((0.15915493667125702 * Mathf.atan2(((this.fSlow15 * ((this.fSlow36 * this.fSlow38) - ((this.fSlow39 * this.fSlow40) / this.fSlow13))) / this.fSlow41), ((this.fSlow15 * ((this.fSlow38 * this.fSlow39) + (this.fSlow36 * (this.fSlow40 / this.fSlow13)))) / this.fSlow41))) + 1.0));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec9[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec9[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur6: f32 = (iTemp0 ? this.fSlow1 : this.fRec6);
        let iTemp1: i32 = (this.fSlow0 < fTemp0);
        let iTemp2: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(0) : this.iRec7[<i32>(1)]));
        let iTemp3: i32 = (iTemp2 >= <i32>(2));
        let iTemp4: i32 = (iTemp2 >= <i32>(1));
        let fTemp1: f32 = this.fRec7_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst4));
        let iTemp5: i32 = (iTemp2 >= <i32>(3));
        let fTemp3: f32 = max<f32>(1.0, (fTemp1 - this.fConst5));
        let fRecCur8: f32 = (iTemp0 ? this.fSlow2 : this.fRec8);
        let iTemp6: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(0) : this.iRec3[<i32>(1)]));
        let iTemp7: i32 = (iTemp6 >= <i32>(2));
        let iTemp8: i32 = (iTemp6 >= <i32>(1));
        let fTemp4: f32 = this.fRec3_1[<i32>(1)];
        let fTemp5: f32 = min<f32>(1.0, (fTemp4 + this.fConst1));
        let iTemp9: i32 = (iTemp6 >= <i32>(3));
        let fTemp6: f32 = max<f32>(0.6000000238418579, (fTemp4 - this.fConst2));
        let iRecCur9: i32 = (<i32>(1103515245) * (this.iRec9 + <i32>(12345)));
        let iRecBody21: i32 = (iTemp7 ? (iTemp9 ? <i32>(3) : ((fTemp6 <= 0.6000000238418579) ? <i32>(3) : <i32>(2))) : (iTemp8 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody22: f32 = (iTemp7 ? (iTemp9 ? fTemp4 : fTemp6) : (iTemp8 ? fTemp5 : max<f32>(0.0, (fTemp4 - this.fConst3))));
        this.iRec3[<i32>(0)] = iRecBody21;
        this.fRec3_1[<i32>(0)] = fRecBody22;
        let fTemp7: f32 = (<f32>(iRecCur9) * this.fRec3_1[<i32>(0)]);
        let iTemp10: i32 = (iTemp0 & (this.fSlow2 != this.fRec8));
        let iTemp11: i32 = (<i32>(1) - iTemp10);
        let fTemp8: f32 = <f32>(iTemp11);
        let fRecCur10: f32 = (iTemp10 ? this.fSlow16 : this.fRec10);
        let fTemp9: f32 = this.fRec2[<i32>(1)];
        let fTemp10: f32 = this.fRec2_2[<i32>(1)];
        let fRecBody23: f32 = (0.00000000023283064365386963 * fTemp7);
        let fRecBody24: f32 = fTemp9;
        let fRecBody25: f32 = ((((((fTemp9 + (0.00000000011641532182693481 * fTemp7)) + (0.5 * this.fRec2_1[<i32>(1)])) * this.fSlow6) + (2.0 * (fTemp10 * this.fSlow5))) - (this.fRec2_3[<i32>(1)] * this.fSlow8)) / this.fSlow9);
        let fRecBody26: f32 = fTemp10;
        this.fRec2[<i32>(0)] = fRecBody23;
        this.fRec2_1[<i32>(0)] = fRecBody24;
        this.fRec2_2[<i32>(0)] = fRecBody25;
        this.fRec2_3[<i32>(0)] = fRecBody26;
        let fRecCur11: f32 = (iTemp10 ? this.fSlow33 : this.fRec11);
        let iTemp12: i32 = max<i32>(<i32>(1), <i32>(fRecCur11));
        let fTemp11: f32 = max<f32>(0.0, (fRecCur11 - <f32>(iTemp12)));
        let fTemp12: f32 = (1.0 - fTemp11);
        let fTemp13: f32 = this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp12 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))];
        let iRecCur12: i32 = (iTemp11 * (this.iRec12 + <i32>(1)));
        let fTemp14: f32 = <f32>((iRecCur12 >= iTemp12));
        let fTemp15: f32 = (fTemp13 * fTemp14);
        let fTemp16: f32 = (fTemp11 + 1.0);
        this.fVec3000[<i32>(0)] = fTemp15;
        let fRecCur13: f32 = (iTemp10 ? (((fTemp12 * fTemp13) * fTemp14) / fTemp16) : (((fTemp12 * (fTemp15 - this.fRec13)) / fTemp16) + this.fVec3000[<i32>(1)]));
        let fTemp17: f32 = (this.fRec2_2[<i32>(0)] + fRecCur13);
        let fRecCur14: f32 = (iTemp10 ? this.fSlow14 : this.fRec14);
        let fRecCur15: f32 = (iTemp10 ? this.fSlow17 : this.fRec15);
        let fTemp18: f32 = (fTemp17 * fRecCur15);
        let fTemp19: f32 = ((fTemp8 * this.fRec1[<i32>(1)]) + fTemp18);
        let fRecCur16: f32 = (iTemp10 ? this.fSlow19 : this.fRec16);
        let fRecBody27: f32 = (((this.fRec1_1[<i32>(1)] * fTemp8) + (fRecCur10 * fTemp17)) - (fRecCur14 * fTemp19));
        let fRecBody28: f32 = (fTemp18 - (fTemp19 * fRecCur16));
        let fRecBody29: f32 = fTemp19;
        this.fRec1[<i32>(0)] = fRecBody27;
        this.fRec1_1[<i32>(0)] = fRecBody28;
        this.fRec1_2[<i32>(0)] = fRecBody29;
        let iTemp13: i32 = (iTemp0 & (this.fSlow1 != this.fRec6));
        let iTemp14: i32 = (<i32>(1) - iTemp13);
        let fTemp20: f32 = <f32>(iTemp14);
        let fRecCur17: f32 = (iTemp13 ? this.fSlow16 : this.fRec17);
        let fRecCur18: f32 = (iTemp13 ? this.fSlow42 : this.fRec18);
        let iTemp15: i32 = max<i32>(<i32>(1), <i32>(fRecCur18));
        let fTemp21: f32 = max<f32>(0.0, (fRecCur18 - <f32>(iTemp15)));
        let fTemp22: f32 = (1.0 - fTemp21);
        let fTemp23: f32 = this.fRec4[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp15 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))];
        let iRecCur19: i32 = (iTemp14 * (this.iRec19 + <i32>(1)));
        let fTemp24: f32 = <f32>((iRecCur19 >= iTemp15));
        let fTemp25: f32 = (fTemp23 * fTemp24);
        let fTemp26: f32 = (fTemp21 + 1.0);
        this.fVec3088[<i32>(0)] = fTemp25;
        let fRecCur20: f32 = (iTemp13 ? (((fTemp22 * fTemp23) * fTemp24) / fTemp26) : (((fTemp22 * (fTemp25 - this.fRec20)) / fTemp26) + this.fVec3088[<i32>(1)]));
        let fTemp27: f32 = (this.fRec2_2[<i32>(0)] + fRecCur20);
        let fRecCur21: f32 = (iTemp13 ? this.fSlow14 : this.fRec21);
        let fRecCur22: f32 = (iTemp13 ? this.fSlow17 : this.fRec22);
        let fTemp28: f32 = (fTemp27 * fRecCur22);
        let fTemp29: f32 = ((fTemp20 * this.fRec5[<i32>(1)]) + fTemp28);
        let fRecCur23: f32 = (iTemp13 ? this.fSlow19 : this.fRec23);
        let fRecBody30: f32 = (((this.fRec5_1[<i32>(1)] * fTemp20) + (fRecCur17 * fTemp27)) - (fRecCur21 * fTemp29));
        let fRecBody31: f32 = (fTemp28 - (fTemp29 * fRecCur23));
        let fRecBody32: f32 = fTemp29;
        this.fRec5[<i32>(0)] = fRecBody30;
        this.fRec5_1[<i32>(0)] = fRecBody31;
        this.fRec5_2[<i32>(0)] = fRecBody32;
        let iRecBody33: i32 = (iTemp3 ? (iTemp5 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp4 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody34: f32 = (iTemp3 ? (iTemp5 ? fTemp1 : fTemp3) : (iTemp4 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst3))));
        this.iRec7[<i32>(0)] = iRecBody33;
        this.fRec7_1[<i32>(0)] = fRecBody34;
        let fRecBody35: f32 = (-1.0 * this.fRec1_2[<i32>(0)]);
        let fRecBody36: f32 = this.fRec1_2[<i32>(0)];
        let iTemp16: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp16] = fRecBody35;
        this.fRec0_1[<i32>(0)] = fRecBody36;
        let fRecBody37: f32 = (-1.0 * this.fRec5_2[<i32>(0)]);
        let fRecBody38: f32 = this.fRec5_2[<i32>(0)];
        this.fRec4[iTemp16] = fRecBody37;
        this.fRec4_1[<i32>(0)] = fRecBody38;
        outputs[<i32>(0)] = <f32>((this.fSlow3 * (this.fRec7_1[<i32>(0)] * (this.fRec0_1[<i32>(0)] + (0.4000000059604645 * this.fRec4_1[<i32>(0)])))));
        outputs[<i32>(1)] = <f32>((this.fSlow3 * (this.fRec7_1[<i32>(0)] * (this.fRec4_1[<i32>(0)] + (0.4000000059604645 * this.fRec0_1[<i32>(0)])))));
        this.fVec9[<i32>(1)] = this.fVec9[<i32>(0)];
        this.fRec6 = fRecCur6;
        this.fRec8 = fRecCur8;
        this.iRec9 = iRecCur9;
        this.iRec3[<i32>(1)] = this.iRec3[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec10 = fRecCur10;
        this.fRec2[<i32>(1)] = this.fRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec2_2[<i32>(1)] = this.fRec2_2[<i32>(0)];
        this.fRec2_3[<i32>(1)] = this.fRec2_3[<i32>(0)];
        this.fRec11 = fRecCur11;
        this.iRec12 = iRecCur12;
        this.fVec3000[<i32>(1)] = this.fVec3000[<i32>(0)];
        this.fRec13 = fRecCur13;
        this.fRec14 = fRecCur14;
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec1[<i32>(1)] = this.fRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec1_2[<i32>(1)] = fRecBody36;
        this.fRec17 = fRecCur17;
        this.fRec18 = fRecCur18;
        this.iRec19 = iRecCur19;
        this.fVec3088[<i32>(1)] = this.fVec3088[<i32>(0)];
        this.fRec20 = fRecCur20;
        this.fRec21 = fRecCur21;
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec5[<i32>(1)] = this.fRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec5_2[<i32>(1)] = fRecBody38;
        this.iRec7[<i32>(1)] = this.iRec7[<i32>(0)];
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mchoir extends MidiVoice {
    readonly dsp: MchoirDsp = new MchoirDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(2);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MchoirChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MchoirChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider1 = this.typedChannel.breathTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider2 = notefreq(note);
        this.dsp.fHslider4 = <f32>velocity / 127.0;
        this.dsp.fHslider1 = this.typedChannel.breathTone;
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

export class MchoirChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _breathTone: f32 = <f32>(1);
    /** breath_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get breathTone(): f32 { return this._breathTone; }
    set breathTone(value: f32) { this._breathTone = value; this._paramsDirty = true; }
    private _bright: f32 = <f32>(1);
    /** bright [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get bright(): f32 { return this._bright; }
    set bright(value: f32) { this._bright = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mchoir).applyParams();
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
                this.breathTone = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.bright = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MchoirChannel(10, (channel: MidiChannel) => new Mchoir(channel));
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
