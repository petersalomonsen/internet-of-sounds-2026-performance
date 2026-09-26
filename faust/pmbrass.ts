// Faust-generated Pmbrass
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: pmbrass.dsp

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

export class PmbrassDsp {
    fSampleRate: i32;
    fVec7: StaticArray<f32> = new StaticArray<f32>(2);
    fVec1926: StaticArray<f32> = new StaticArray<f32>(2);
    fVec1992: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2050: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2083: StaticArray<f32> = new StaticArray<f32>(2);
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
    fHslider3: f32;
    fSlow3: f32;
    fSlow4: f32;
    fConst6: f32;
    fHslider4: f32;
    fSlow5: f32;
    fConst7: f32;
    fConst8: f32;
    fSlow6: f32;
    fHslider5: f32;
    fSlow7: f32;
    fConst9: f32;
    fHslider1: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fConst10: f32;
    fSlow11: f32;
    fSlow12: f32;
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
    iRec7: i32;
    fRec8: f32;
    fRec9: f32;
    fRec10: f32;
    fRec11: f32;
    fRec12: f32;
    iRec13: StaticArray<i32> = new StaticArray<i32>(2);
    iRec13_1: StaticArray<i32> = new StaticArray<i32>(2);
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
        // ui openbox pmbrass
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
        this.fHslider2 = 261.6300048828125;
        this.fHslider3 = 1.0;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider1 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec7[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec1926[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec1992[lDelay2] = 0.0;
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            this.fVec2050[lDelay3] = 0.0;
        }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) {
            this.fVec2083[lDelay4] = 0.0;
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(16384); lRec5 = lRec5 + 1) {
            this.fRec0[lRec5] = 0.0;
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            this.fRec0_1[lRec6] = 0.0;
        }
        this.fIOTA = <i32>(0);
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            this.iRec1[lRec7] = <i32>(0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec1_1[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            this.iRec2[lRec9] = <i32>(0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec2_1[lRec10] = 0.0;
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(16384); lRec11 = lRec11 + 1) {
            this.fRec3[lRec11] = 0.0;
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            this.fRec3_1[lRec12] = 0.0;
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(16384); lRec13 = lRec13 + 1) {
            this.fRec4[lRec13] = 0.0;
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.fRec4_1[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.iRec5[lRec15] = <i32>(0);
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec5_1[lRec16] = 0.0;
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(16384); lRec17 = lRec17 + 1) {
            this.fRec6[lRec17] = 0.0;
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            this.fRec6_1[lRec18] = 0.0;
        }
        this.iRec7 = <i32>(0);
        this.fRec8 = 0.0;
        this.fRec9 = 0.0;
        this.fRec10 = 0.0;
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            this.iRec13[lRec21] = <i32>(0);
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            this.iRec13_1[lRec22] = <i32>(0);
        }
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
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst2 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.019999999552965164)));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.15000000596046448)));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.029999999329447746)));
        this.fConst8 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.20000000298023224)));
        this.fConst9 = (31415.92578125 / this.fConst0);
        this.fConst10 = (6283.185546875 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        PmbrassDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.iSlow0 = (this.fSlow0 == 0.0);
        this.fSlow1 = <f32>(this.fHslider2);
        this.fSlow2 = (this.fConst0 / this.fSlow1);
        this.fSlow3 = (this.fSlow1 * <f32>(this.fHslider3));
        this.fSlow4 = (10.0 * this.fSlow3);
        this.fSlow5 = max<f32>(0.0, (1.0 - (0.000009999999747378752 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0)))));
        this.fSlow6 = (8.0 * this.fSlow3);
        this.fSlow7 = (21.16666603088379 * <f32>(this.fHslider5));
        this.fSlow8 = <f32>(this.fHslider1);
        this.fSlow9 = Mathf.exp((-1.0 * (this.fConst9 * this.fSlow8)));
        this.fSlow10 = (0.00000000023283064365386963 * (1.0 - this.fSlow9));
        this.fSlow11 = Mathf.exp((-1.0 * (this.fConst10 * this.fSlow8)));
        this.fSlow12 = (0.00000000023283064365386963 * (1.0 - this.fSlow11));
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
        let iTemp5: i32 = (iTemp0 ? <i32>(1) : this.iRec5[<i32>(1)]);
        let iTemp6: i32 = (iTemp5 >= <i32>(2));
        let iTemp7: i32 = (iTemp5 >= <i32>(1));
        let fTemp4: f32 = this.fRec5_1[<i32>(1)];
        let fTemp5: f32 = min<f32>(1.0, ((iTemp0 ? 0.0 : fTemp4) + this.fConst7));
        let iTemp8: i32 = (iTemp0 ? <i32>(1) : this.iRec2[<i32>(1)]);
        let iTemp9: i32 = (iTemp8 >= <i32>(2));
        let iTemp10: i32 = (iTemp8 >= <i32>(1));
        let fTemp6: f32 = this.fRec2_1[<i32>(1)];
        let fTemp7: f32 = min<f32>(1.0, ((iTemp0 ? 0.0 : fTemp6) + this.fConst4));
        let iRecBody19: i32 = (iTemp2 ? (iTemp4 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody20: f32 = (iTemp2 ? (iTemp4 ? fTemp1 : fTemp3) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst3))));
        this.iRec1[<i32>(0)] = iRecBody19;
        this.fRec1_1[<i32>(0)] = fRecBody20;
        let iTemp11: i32 = (this.iSlow0 & (this.fRec1_1[<i32>(0)] <= 0.0));
        let iRecCur7: i32 = (this.iRec7 ^ iTemp0);
        let iTemp12: i32 = (iRecCur7 == <i32>(1));
        let iTemp13: i32 = (iTemp0 & iTemp12);
        let fRecCur8: f32 = (iTemp13 ? this.fSlow2 : this.fRec8);
        let iTemp14: i32 = max<i32>(<i32>(1), <i32>(fRecCur8));
        let fTemp8: f32 = max<f32>(0.0, (fRecCur8 - <f32>(iTemp14)));
        let fTemp9: f32 = (1.0 - fTemp8);
        let iTemp15: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp14 + <i32>(-1))));
        let iTemp21: i32 = ((this.fIOTA - (iTemp15 + <i32>(1))) & <i32>(16383));
        let fTemp10: f32 = this.fRec4[iTemp21];
        let fTemp11: f32 = (fTemp8 + 1.0);
        this.fVec1926[<i32>(0)] = fTemp10;
        let fRecCur9: f32 = (((fTemp9 * (fTemp10 - this.fRec9)) / fTemp11) + this.fVec1926[<i32>(1)]);
        let fRecCur10: f32 = (iTemp13 ? this.fSlow6 : this.fRec10);
        let fTemp12: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur10)));
        let fTemp13: f32 = <f32>(iTemp12);
        let iTemp16: i32 = (<i32>(1103515245) * (this.iRec13[<i32>(1)] + <i32>(12345)));
        let iRecBody23: i32 = (<i32>(1103515245) * (iTemp16 + <i32>(12345)));
        let iRecBody24: i32 = iTemp16;
        this.iRec13[<i32>(0)] = iRecBody23;
        this.iRec13_1[<i32>(0)] = iRecBody24;
        let iRecBody25: i32 = (iTemp6 ? <i32>(2) : (iTemp7 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody26: f32 = (iTemp6 ? max<f32>(0.0, (fTemp4 - this.fConst8)) : (iTemp7 ? fTemp5 : fTemp4));
        this.iRec5[<i32>(0)] = iRecBody25;
        this.fRec5_1[<i32>(0)] = fRecBody26;
        let fRecCur12: f32 = ((this.fSlow9 * this.fRec12) + (this.fSlow10 * (<f32>(this.iRec13_1[<i32>(0)]) * this.fRec5_1[<i32>(0)])));
        let fRecCur11: f32 = ((fTemp12 * this.fRec11) + ((1.0 - fTemp12) * (fRecCur9 + (fTemp13 * fRecCur12))));
        let iTemp17: i32 = (iRecCur7 == <i32>(0));
        let iTemp18: i32 = (iTemp0 & iTemp17);
        let fRecCur14: f32 = (iTemp18 ? this.fSlow2 : this.fRec14);
        let iTemp19: i32 = max<i32>(<i32>(1), <i32>(fRecCur14));
        let fTemp14: f32 = max<f32>(0.0, (fRecCur14 - <f32>(iTemp19)));
        let fTemp15: f32 = (1.0 - fTemp14);
        let iTemp20: i32 = min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp19 + <i32>(-1))));
        let iTemp22: i32 = ((this.fIOTA - (iTemp20 + <i32>(1))) & <i32>(16383));
        let fTemp16: f32 = this.fRec3[iTemp22];
        let fTemp17: f32 = (fTemp14 + 1.0);
        this.fVec1992[<i32>(0)] = fTemp16;
        let fRecCur15: f32 = (((fTemp15 * (fTemp16 - this.fRec15)) / fTemp17) + this.fVec1992[<i32>(1)]);
        let fRecCur16: f32 = (iTemp18 ? this.fSlow4 : this.fRec16);
        let fTemp18: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur16)));
        let fTemp19: f32 = <f32>(iTemp17);
        let iRecBody27: i32 = (iTemp9 ? <i32>(2) : (iTemp10 ? ((fTemp7 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody28: f32 = (iTemp9 ? max<f32>(0.0, (fTemp6 - this.fConst5)) : (iTemp10 ? fTemp7 : fTemp6));
        this.iRec2[<i32>(0)] = iRecBody27;
        this.fRec2_1[<i32>(0)] = fRecBody28;
        let fRecCur18: f32 = ((this.fSlow11 * this.fRec18) + (this.fSlow12 * (<f32>(this.iRec13[<i32>(0)]) * this.fRec2_1[<i32>(0)])));
        let fRecCur17: f32 = ((fTemp18 * this.fRec17) + ((1.0 - fTemp18) * (fRecCur15 + (fTemp19 * fRecCur18))));
        let fTemp20: f32 = this.fRec6[iTemp22];
        this.fVec2050[<i32>(0)] = fTemp20;
        let fRecCur19: f32 = (((fTemp15 * (fTemp20 - this.fRec19)) / fTemp17) + this.fVec2050[<i32>(1)]);
        let fRecCur20: f32 = (iTemp18 ? this.fSlow6 : this.fRec20);
        let fTemp21: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur20)));
        let fRecCur21: f32 = ((fTemp21 * this.fRec21) + ((1.0 - fTemp21) * (fRecCur19 + (fTemp19 * fRecCur12))));
        let fTemp22: f32 = this.fRec0[iTemp21];
        this.fVec2083[<i32>(0)] = fTemp22;
        let fRecCur22: f32 = (((fTemp9 * (fTemp22 - this.fRec22)) / fTemp11) + this.fVec2083[<i32>(1)]);
        let fRecCur23: f32 = (iTemp13 ? this.fSlow4 : this.fRec23);
        let fTemp23: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur23)));
        let fRecCur24: f32 = ((fTemp23 * this.fRec24) + ((1.0 - fTemp23) * (fRecCur22 + (fTemp13 * fRecCur18))));
        let fRecBody29: f32 = (iTemp11 ? 0.0 : (iTemp12 ? fRecCur11 : (0.8999999761581421 * fRecCur9)));
        let fRecBody30: f32 = (iTemp12 ? fRecCur11 : fRecCur9);
        let iTemp23: i32 = (this.fIOTA & <i32>(16383));
        this.fRec4[iTemp23] = fRecBody29;
        this.fRec4_1[<i32>(0)] = fRecBody30;
        let fRecBody31: f32 = (iTemp11 ? 0.0 : (iTemp17 ? (this.fSlow5 * fRecCur17) : (0.8999999761581421 * fRecCur15)));
        let fRecBody32: f32 = (iTemp17 ? fRecCur17 : fRecCur15);
        this.fRec3[iTemp23] = fRecBody31;
        this.fRec3_1[<i32>(0)] = fRecBody32;
        let fRecBody33: f32 = (iTemp11 ? 0.0 : (iTemp17 ? fRecCur21 : (0.8999999761581421 * fRecCur19)));
        let fRecBody34: f32 = (iTemp17 ? fRecCur21 : fRecCur19);
        this.fRec6[iTemp23] = fRecBody33;
        this.fRec6_1[<i32>(0)] = fRecBody34;
        let fRecBody35: f32 = (iTemp11 ? 0.0 : (iTemp12 ? (this.fSlow5 * fRecCur24) : (0.8999999761581421 * fRecCur22)));
        let fRecBody36: f32 = (iTemp12 ? fRecCur24 : fRecCur22);
        this.fRec0[iTemp23] = fRecBody35;
        this.fRec0_1[<i32>(0)] = fRecBody36;
        outputs[<i32>(0)] = <f32>((this.fSlow7 * (this.fRec1_1[<i32>(0)] * (this.fRec4_1[<i32>(0)] + (this.fRec3_1[<i32>(0)] + (this.fRec6_1[<i32>(0)] + this.fRec0_1[<i32>(0)]))))));
        this.fVec7[<i32>(1)] = this.fVec7[<i32>(0)];
        this.iRec1[<i32>(1)] = this.iRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.iRec7 = iRecCur7;
        this.fRec8 = fRecCur8;
        this.fVec1926[<i32>(1)] = this.fVec1926[<i32>(0)];
        this.fRec9 = fRecCur9;
        this.fRec10 = fRecCur10;
        this.iRec13[<i32>(1)] = this.iRec13[<i32>(0)];
        this.iRec13_1[<i32>(1)] = this.iRec13_1[<i32>(0)];
        this.iRec5[<i32>(1)] = this.iRec5[<i32>(0)];
        this.fRec5_1[<i32>(1)] = this.fRec5_1[<i32>(0)];
        this.fRec12 = fRecCur12;
        this.fRec11 = fRecCur11;
        this.fRec14 = fRecCur14;
        this.fVec1992[<i32>(1)] = this.fVec1992[<i32>(0)];
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.iRec2[<i32>(1)] = this.iRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec18 = fRecCur18;
        this.fRec17 = fRecCur17;
        this.fVec2050[<i32>(1)] = this.fVec2050[<i32>(0)];
        this.fRec19 = fRecCur19;
        this.fRec20 = fRecCur20;
        this.fRec21 = fRecCur21;
        this.fVec2083[<i32>(1)] = this.fVec2083[<i32>(0)];
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec24 = fRecCur24;
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fRec6_1[<i32>(1)] = this.fRec6_1[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Pmbrass extends MidiVoice {
    readonly dsp: PmbrassDsp = new PmbrassDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: PmbrassChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<PmbrassChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider1 = this.typedChannel.breathTone;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider2 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider1 = this.typedChannel.breathTone;
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

export class PmbrassChannel extends MidiChannel {
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
            (this.voices[n] as Pmbrass).applyParams();
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
    midichannels[0] = new PmbrassChannel(10, (channel: MidiChannel) => new Pmbrass(channel));
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
