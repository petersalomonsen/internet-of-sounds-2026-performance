// Faust-generated Mbrass
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mbrass.dsp

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

export class MbrassDsp {
    fSampleRate: i32;
    fVec9: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3515: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3596: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fConst0: f32;
    fHslider1: f32;
    fSlow1: f32;
    fSlow2: f32;
    fHslider3: f32;
    fSlow3: f32;
    fSlow4: f32;
    fConst1: f32;
    fConst2: f32;
    fHslider4: f32;
    fSlow5: f32;
    fSlow6: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fConst6: f32;
    fConst7: f32;
    fHslider5: f32;
    fSlow7: f32;
    fConst8: f32;
    fHslider2: f32;
    fSlow8: f32;
    fConst9: f32;
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
    fSlow21: f32;
    fSlow22: f32;
    fConst10: f32;
    fSlow23: f32;
    fSlow24: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fSlow29: f32;
    fSlow30: f32;
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
    fRec5: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec5_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec6_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec7_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec8: StaticArray<i32> = new StaticArray<i32>(2);
    fRec8_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec9: StaticArray<i32> = new StaticArray<i32>(2);
    fRec9_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec10: StaticArray<i32> = new StaticArray<i32>(2);
    iRec10_1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec11: f32;
    fRec12: f32;
    iRec13: i32;
    fRec14: f32;
    fRec15: f32;
    fRec16: f32;
    fRec17: f32;

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
        // ui openbox mbrass
        // ui slider breath_tone
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
        this.fHslider3 = 1.0;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider2 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec9[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec3515[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec3596[lDelay2] = 0.0;
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
        for (let lRec14: i32 = 0; lRec14 < <i32>(16384); lRec14 = lRec14 + 1) {
            this.fRec5[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.fRec5_1[lRec15] = 0.0;
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
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            this.fRec7[lRec19] = 0.0;
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            this.fRec7_1[lRec20] = 0.0;
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            this.fRec7_2[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.fRec7_3[lRec22] = 0.0;
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            this.iRec8[lRec23] = <i32>(0);
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            this.fRec8_1[lRec24] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            this.iRec9[lRec25] = <i32>(0);
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            this.fRec9_1[lRec26] = 0.0;
        }
        for (let lRec27: i32 = 0; lRec27 < <i32>(2); lRec27 = lRec27 + 1) {
            this.iRec10[lRec27] = <i32>(0);
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(2); lRec28 = lRec28 + 1) {
            this.iRec10_1[lRec28] = <i32>(0);
        }
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.iRec13 = <i32>(0);
        this.fRec14 = 0.0;
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.fRec17 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.019999999552965164)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.15000000596046448)));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.029999999329447746)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.20000000298023224)));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst6 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst7 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst8 = (6.2831854820251465 / this.fConst0);
        this.fConst9 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst10 = (12.566370964050293 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MbrassDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = <f32>(this.fHslider1);
        this.fSlow2 = (this.fConst0 / this.fSlow1);
        this.fSlow3 = (this.fSlow1 * <f32>(this.fHslider3));
        this.fSlow4 = max<f32>(10.0, min<f32>(20000.0, (10.0 * this.fSlow3)));
        this.fSlow5 = (1.0 - (0.000009999999747378752 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0))));
        this.fSlow6 = max<f32>(10.0, min<f32>(20000.0, (8.0 * this.fSlow3)));
        this.fSlow7 = (4.0 * <f32>(this.fHslider5));
        this.fSlow8 = <f32>(this.fHslider2);
        this.fSlow9 = (this.fConst8 * min<f32>((1000.0 * this.fSlow8), this.fConst9));
        this.fSlow10 = Mathf.cos(this.fSlow9);
        this.fSlow11 = (1.0 - this.fSlow10);
        this.fSlow12 = (0.7071067690849304 * Mathf.sin(this.fSlow9));
        this.fSlow13 = (1.0 - this.fSlow12);
        this.fSlow14 = (this.fSlow12 + 1.0);
        this.fSlow15 = (this.fConst8 * min<f32>((5000.0 * this.fSlow8), this.fConst9));
        this.fSlow16 = Mathf.cos(this.fSlow15);
        this.fSlow17 = (1.0 - this.fSlow16);
        this.fSlow18 = (0.7071067690849304 * Mathf.sin(this.fSlow15));
        this.fSlow19 = (1.0 - this.fSlow18);
        this.fSlow20 = (this.fSlow18 + 1.0);
        this.fSlow21 = (-1.0 * (this.fConst8 * this.fSlow1));
        this.fSlow22 = Mathf.sin(this.fSlow21);
        this.fSlow23 = (-1.0 * (this.fConst10 * this.fSlow1));
        this.fSlow24 = Mathf.sin(this.fSlow23);
        this.fSlow25 = (this.fSlow22 + (0.5 * this.fSlow24));
        this.fSlow26 = Mathf.cos(this.fSlow21);
        this.fSlow27 = (2.0 * this.fSlow26);
        this.fSlow28 = Mathf.cos(this.fSlow23);
        this.fSlow29 = (this.fSlow26 + (0.5 * (this.fSlow28 + 1.0)));
        this.fSlow30 = (2.0 * this.fSlow22);
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec9[<i32>(0)] = this.fSlow0;
        let fTemp0: f32 = this.fVec9[<i32>(1)];
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur2: f32 = (iTemp0 ? this.fSlow1 : this.fRec2);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : this.iRec9[<i32>(1)]));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let fTemp1: f32 = this.fRec9_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst5));
        let iTemp4: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = max<f32>(1.0, (fTemp1 - this.fConst6));
        let iTemp5: i32 = (iTemp0 ? <i32>(1) : this.iRec4[<i32>(1)]);
        let iTemp6: i32 = (iTemp5 >= <i32>(2));
        let iTemp7: i32 = (iTemp5 >= <i32>(1));
        let iTemp8: i32 = (iTemp0 & (this.fSlow1 != this.fRec2));
        let fTemp4: f32 = (iTemp8 ? 0.0 : this.fRec4_1[<i32>(1)]);
        let fTemp5: f32 = min<f32>(1.0, (fTemp4 + this.fConst1));
        let iTemp9: i32 = (iTemp5 >= <i32>(3));
        let fTemp6: f32 = max<f32>(0.0, (fTemp4 - this.fConst2));
        let fTemp7: f32 = max<f32>(0.0, fTemp4);
        let iTemp10: i32 = (<i32>(1103515245) * (this.iRec10[<i32>(1)] + <i32>(12345)));
        let iRecBody29: i32 = (<i32>(1103515245) * (iTemp10 + <i32>(12345)));
        let iRecBody30: i32 = iTemp10;
        this.iRec10[<i32>(0)] = iRecBody29;
        this.iRec10_1[<i32>(0)] = iRecBody30;
        let iRecBody31: i32 = (iTemp6 ? (iTemp9 ? ((fTemp7 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp6 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp7 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody32: f32 = (iTemp6 ? (iTemp9 ? fTemp7 : fTemp6) : (iTemp7 ? fTemp5 : fTemp4));
        this.iRec4[<i32>(0)] = iRecBody31;
        this.fRec4_1[<i32>(0)] = fRecBody32;
        let fTemp8: f32 = (<f32>(this.iRec10[<i32>(0)]) * this.fRec4_1[<i32>(0)]);
        let iTemp11: i32 = (<i32>(1) - iTemp8);
        let fTemp9: f32 = <f32>(iTemp11);
        let fTemp10: f32 = this.fRec3[<i32>(1)];
        let fTemp11: f32 = this.fRec3_2[<i32>(1)];
        let iTemp12: i32 = (iTemp0 ? <i32>(1) : this.iRec8[<i32>(1)]);
        let iTemp13: i32 = (iTemp12 >= <i32>(2));
        let iTemp14: i32 = (iTemp12 >= <i32>(1));
        let fTemp12: f32 = (iTemp8 ? 0.0 : this.fRec8_1[<i32>(1)]);
        let fTemp13: f32 = min<f32>(1.0, (fTemp12 + this.fConst3));
        let iTemp15: i32 = (iTemp12 >= <i32>(3));
        let fTemp14: f32 = max<f32>(0.0, (fTemp12 - this.fConst4));
        let fTemp15: f32 = max<f32>(0.0, fTemp12);
        let iRecBody33: i32 = (iTemp13 ? (iTemp15 ? ((fTemp15 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp14 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp14 ? ((fTemp13 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody34: f32 = (iTemp13 ? (iTemp15 ? fTemp15 : fTemp14) : (iTemp14 ? fTemp13 : fTemp12));
        this.iRec8[<i32>(0)] = iRecBody33;
        this.fRec8_1[<i32>(0)] = fRecBody34;
        let fTemp16: f32 = (<f32>(this.iRec10_1[<i32>(0)]) * this.fRec8_1[<i32>(0)]);
        let fTemp17: f32 = this.fRec7[<i32>(1)];
        let fTemp18: f32 = this.fRec7_2[<i32>(1)];
        let fRecCur11: f32 = (iTemp8 ? this.fSlow4 : this.fRec11);
        let fTemp19: f32 = (this.fConst8 * min<f32>(fRecCur11, this.fConst9));
        let fTemp20: f32 = Mathf.cos(fTemp19);
        let fTemp21: f32 = (1.0 - fTemp20);
        let fRecBody35: f32 = (0.00000000023283064365386963 * fTemp8);
        let fRecBody36: f32 = (fTemp9 * fTemp10);
        let fRecBody37: f32 = (((this.fSlow11 * ((0.00000000011641532182693481 * fTemp8) + (fTemp9 * (fTemp10 + (0.5 * this.fRec3_1[<i32>(1)]))))) + (fTemp9 * ((2.0 * (fTemp11 * this.fSlow10)) - (this.fRec3_3[<i32>(1)] * this.fSlow13)))) / this.fSlow14);
        let fRecBody38: f32 = (fTemp9 * fTemp11);
        this.fRec3[<i32>(0)] = fRecBody35;
        this.fRec3_1[<i32>(0)] = fRecBody36;
        this.fRec3_2[<i32>(0)] = fRecBody37;
        this.fRec3_3[<i32>(0)] = fRecBody38;
        let fTemp22: f32 = (0.7071067690849304 * Mathf.sin(fTemp19));
        let fTemp23: f32 = (1.0 - fTemp22);
        let fTemp24: f32 = (fTemp22 + 1.0);
        let fTemp25: f32 = ((((this.fSlow28 * fTemp23) - (this.fSlow27 * fTemp20)) / fTemp24) + 1.0);
        let fTemp26: f32 = ((this.fSlow24 * fTemp23) - (this.fSlow30 * fTemp20));
        let fTemp27: f32 = (fTemp24 * (Mathf.pow(fTemp25, 2.0) + (Mathf.pow(fTemp26, 2.0) / Mathf.pow(fTemp24, 2.0))));
        let fRecCur12: f32 = (iTemp8 ? (this.fSlow2 * ((0.15915493667125702 * Mathf.atan2(((fTemp21 * ((this.fSlow25 * fTemp25) - ((this.fSlow29 * fTemp26) / fTemp24))) / fTemp27), ((fTemp21 * ((fTemp25 * this.fSlow29) + (this.fSlow25 * (fTemp26 / fTemp24)))) / fTemp27))) + 1.0)) : this.fRec12);
        let iTemp16: i32 = max<i32>(<i32>(1), <i32>(fRecCur12));
        let fTemp28: f32 = max<f32>(0.0, (fRecCur12 - <f32>(iTemp16)));
        let iRecCur13: i32 = (iTemp11 * (this.iRec13 + <i32>(1)));
        let fTemp29: f32 = (this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp16 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))] * <f32>((iRecCur13 >= iTemp16)));
        this.fVec3515[<i32>(0)] = fTemp29;
        let fRecCur14: f32 = ((((1.0 - fTemp28) * (fTemp29 - (fTemp9 * this.fRec14))) / (fTemp28 + 1.0)) + (fTemp9 * this.fVec3515[<i32>(1)]));
        let fTemp30: f32 = (fTemp21 * (this.fRec3_2[<i32>(0)] + fRecCur14));
        let fTemp31: f32 = ((fTemp9 * this.fRec1[<i32>(1)]) + (0.5 * (fTemp30 / fTemp24)));
        let fRecBody39: f32 = ((this.fRec1_1[<i32>(1)] * fTemp9) + ((fTemp30 + (2.0 * (fTemp20 * fTemp31))) / fTemp24));
        let fRecBody40: f32 = (((0.5 * fTemp30) - (fTemp23 * fTemp31)) / fTemp24);
        let fRecBody41: f32 = fTemp31;
        this.fRec1[<i32>(0)] = fRecBody39;
        this.fRec1_1[<i32>(0)] = fRecBody40;
        this.fRec1_2[<i32>(0)] = fRecBody41;
        let fRecCur15: f32 = (iTemp8 ? this.fSlow6 : this.fRec15);
        let fTemp32: f32 = (this.fConst8 * min<f32>(fRecCur15, this.fConst9));
        let fTemp33: f32 = Mathf.cos(fTemp32);
        let fTemp34: f32 = (1.0 - fTemp33);
        let fRecBody42: f32 = (0.00000000023283064365386963 * fTemp16);
        let fRecBody43: f32 = (fTemp9 * fTemp17);
        let fRecBody44: f32 = (((this.fSlow17 * ((0.00000000011641532182693481 * fTemp16) + (fTemp9 * (fTemp17 + (0.5 * this.fRec7_1[<i32>(1)]))))) + (fTemp9 * ((2.0 * (fTemp18 * this.fSlow16)) - (this.fRec7_3[<i32>(1)] * this.fSlow19)))) / this.fSlow20);
        let fRecBody45: f32 = (fTemp9 * fTemp18);
        this.fRec7[<i32>(0)] = fRecBody42;
        this.fRec7_1[<i32>(0)] = fRecBody43;
        this.fRec7_2[<i32>(0)] = fRecBody44;
        this.fRec7_3[<i32>(0)] = fRecBody45;
        let fTemp35: f32 = (0.7071067690849304 * Mathf.sin(fTemp32));
        let fTemp36: f32 = (1.0 - fTemp35);
        let fTemp37: f32 = (fTemp35 + 1.0);
        let fTemp38: f32 = ((((this.fSlow28 * fTemp36) - (this.fSlow27 * fTemp33)) / fTemp37) + 1.0);
        let fTemp39: f32 = ((this.fSlow24 * fTemp36) - (this.fSlow30 * fTemp33));
        let fTemp40: f32 = (fTemp37 * (Mathf.pow(fTemp38, 2.0) + (Mathf.pow(fTemp39, 2.0) / Mathf.pow(fTemp37, 2.0))));
        let fRecCur16: f32 = (iTemp8 ? (this.fSlow2 * ((0.15915493667125702 * Mathf.atan2(((fTemp34 * ((this.fSlow25 * fTemp38) - ((this.fSlow29 * fTemp39) / fTemp37))) / fTemp40), ((fTemp34 * ((this.fSlow29 * fTemp38) + (this.fSlow25 * (fTemp39 / fTemp37)))) / fTemp40))) + 1.0)) : this.fRec16);
        let iTemp17: i32 = max<i32>(<i32>(1), <i32>(fRecCur16));
        let fTemp41: f32 = max<f32>(0.0, (fRecCur16 - <f32>(iTemp17)));
        let fTemp42: f32 = (this.fRec5[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp17 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))] * <f32>((iRecCur13 >= iTemp17)));
        this.fVec3596[<i32>(0)] = fTemp42;
        let fRecCur17: f32 = ((((1.0 - fTemp41) * (fTemp42 - (fTemp9 * this.fRec17))) / (fTemp41 + 1.0)) + (fTemp9 * this.fVec3596[<i32>(1)]));
        let fTemp43: f32 = (fTemp34 * (this.fRec7_2[<i32>(0)] + fRecCur17));
        let fTemp44: f32 = ((fTemp9 * this.fRec6[<i32>(1)]) + (0.5 * (fTemp43 / fTemp37)));
        let iRecBody46: i32 = (iTemp2 ? (iTemp4 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody47: f32 = (iTemp2 ? (iTemp4 ? fTemp1 : fTemp3) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst7))));
        this.iRec9[<i32>(0)] = iRecBody46;
        this.fRec9_1[<i32>(0)] = fRecBody47;
        let fRecBody48: f32 = (this.fSlow5 * this.fRec1_2[<i32>(0)]);
        let fRecBody49: f32 = this.fRec1_2[<i32>(0)];
        let iTemp18: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp18] = fRecBody48;
        this.fRec0_1[<i32>(0)] = fRecBody49;
        let fRecBody50: f32 = ((fTemp9 * this.fRec6_1[<i32>(1)]) + ((fTemp43 + (2.0 * (fTemp33 * fTemp44))) / fTemp37));
        let fRecBody51: f32 = (((0.5 * fTemp43) - (fTemp36 * fTemp44)) / fTemp37);
        let fRecBody52: f32 = fTemp44;
        this.fRec6[<i32>(0)] = fRecBody50;
        this.fRec6_1[<i32>(0)] = fRecBody51;
        this.fRec6_2[<i32>(0)] = fRecBody52;
        let fRecBody53: f32 = this.fRec6_2[<i32>(0)];
        this.fRec5[iTemp18] = fRecBody53;
        this.fRec5_1[<i32>(0)] = fRecBody53;
        outputs[<i32>(0)] = <f32>((this.fSlow7 * (this.fRec9_1[<i32>(0)] * (this.fRec0_1[<i32>(0)] + this.fRec5_1[<i32>(0)]))));
        this.fVec9[<i32>(1)] = this.fVec9[<i32>(0)];
        this.fRec2 = fRecCur2;
        this.iRec10[<i32>(1)] = this.iRec10[<i32>(0)];
        this.iRec10_1[<i32>(1)] = this.iRec10_1[<i32>(0)];
        this.iRec4[<i32>(1)] = this.iRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.iRec8[<i32>(1)] = this.iRec8[<i32>(0)];
        this.fRec8_1[<i32>(1)] = this.fRec8_1[<i32>(0)];
        this.fRec11 = fRecCur11;
        this.fRec3[<i32>(1)] = this.fRec3[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec3_2[<i32>(1)] = this.fRec3_2[<i32>(0)];
        this.fRec3_3[<i32>(1)] = this.fRec3_3[<i32>(0)];
        this.fRec12 = fRecCur12;
        this.iRec13 = iRecCur13;
        this.fVec3515[<i32>(1)] = this.fVec3515[<i32>(0)];
        this.fRec14 = fRecCur14;
        this.fRec1[<i32>(1)] = this.fRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec1_2[<i32>(1)] = fRecBody49;
        this.fRec15 = fRecCur15;
        this.fRec7[<i32>(1)] = this.fRec7[<i32>(0)];
        this.fRec7_1[<i32>(1)] = this.fRec7_1[<i32>(0)];
        this.fRec7_2[<i32>(1)] = this.fRec7_2[<i32>(0)];
        this.fRec7_3[<i32>(1)] = this.fRec7_3[<i32>(0)];
        this.fRec16 = fRecCur16;
        this.fVec3596[<i32>(1)] = this.fVec3596[<i32>(0)];
        this.fRec17 = fRecCur17;
        this.iRec9[<i32>(1)] = this.iRec9[<i32>(0)];
        this.fRec9_1[<i32>(1)] = this.fRec9_1[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec6[<i32>(1)] = this.fRec6[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec6_2[<i32>(1)] = fRecBody53;
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mbrass extends MidiVoice {
    readonly dsp: MbrassDsp = new MbrassDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MbrassChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MbrassChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider2 = this.typedChannel.breathTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider2 = this.typedChannel.breathTone;
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
        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.dsp.fButton0 == 0.0) this.releaseSamples++;
        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export class MbrassChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _breathTone: f32 = <f32>(1);
    /** breath_tone [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get breathTone(): f32 { return this._breathTone; }
    set breathTone(value: f32) { this._breathTone = value; this._paramsDirty = true; }
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
            (this.voices[n] as Mbrass).applyParams();
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
            case 2:
                this.damping = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MbrassChannel(10, (channel: MidiChannel) => new Mbrass(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // breath tone (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // bright (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
    // damping (CC 2, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(2, 49);
}

export function postprocess(): void {
}
