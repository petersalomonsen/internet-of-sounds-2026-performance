// Faust-generated Mguitar
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: mguitar.dsp

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

export class MguitarDsp {
    fSampleRate: i32;
    fVec9: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3568: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3661: StaticArray<f32> = new StaticArray<f32>(2);
    fButton0: f32;
    fSlow0: f32;
    fHslider1: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fHslider4: f32;
    fSlow3: f32;
    fConst3: f32;
    fConst4: f32;
    fHslider5: f32;
    fSlow4: f32;
    fSlow5: f32;
    fConst5: f32;
    fHslider2: f32;
    fConst6: f32;
    fSlow6: f32;
    fSlow7: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fSlow11: f32;
    fHslider3: f32;
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
    fConst7: f32;
    fSlow23: f32;
    fSlow24: f32;
    fConst8: f32;
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
    fConst9: f32;
    fSlow36: f32;
    fSlow37: f32;
    fConst10: f32;
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
    fRec9: f32;
    iRec10: StaticArray<i32> = new StaticArray<i32>(2);
    iRec10_1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec11: f32;
    fRec12: f32;
    fRec13: f32;
    iRec14: i32;
    fRec15: f32;
    fRec16: f32;
    fRec17: f32;
    fRec18: f32;
    fRec19: f32;
    fRec20: f32;
    iRec21: i32;
    fRec22: f32;
    fRec23: f32;
    fRec24: f32;
    fRec25: f32;

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
        // ui openbox mguitar
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
        this.fHslider1 = 220.0;
        this.fHslider4 = 1.0;
        this.fHslider5 = 0.800000011920929;
        this.fHslider2 = 1.0;
        this.fHslider3 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            unchecked(this.fVec9[lDelay0] = 0.0);
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            unchecked(this.fVec3568[lDelay1] = 0.0);
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            unchecked(this.fVec3661[lDelay2] = 0.0);
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(16384); lRec3 = lRec3 + 1) {
            unchecked(this.fRec0[lRec3] = 0.0);
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            unchecked(this.fRec0_1[lRec4] = 0.0);
        }
        this.fIOTA = <i32>(0);
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            unchecked(this.fRec1[lRec5] = 0.0);
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            unchecked(this.fRec1_1[lRec6] = 0.0);
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            unchecked(this.fRec1_2[lRec7] = 0.0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            unchecked(this.fRec2[lRec8] = 0.0);
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            unchecked(this.fRec2_1[lRec9] = 0.0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            unchecked(this.fRec2_2[lRec10] = 0.0);
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            unchecked(this.fRec2_3[lRec11] = 0.0);
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            unchecked(this.iRec3[lRec12] = <i32>(0));
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            unchecked(this.fRec3_1[lRec13] = 0.0);
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            unchecked(this.iRec4[lRec14] = <i32>(0));
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            unchecked(this.fRec4_1[lRec15] = 0.0);
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(16384); lRec16 = lRec16 + 1) {
            unchecked(this.fRec5[lRec16] = 0.0);
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            unchecked(this.fRec5_1[lRec17] = 0.0);
        }
        for (let lRec18: i32 = 0; lRec18 < <i32>(2); lRec18 = lRec18 + 1) {
            unchecked(this.fRec6[lRec18] = 0.0);
        }
        for (let lRec19: i32 = 0; lRec19 < <i32>(2); lRec19 = lRec19 + 1) {
            unchecked(this.fRec6_1[lRec19] = 0.0);
        }
        for (let lRec20: i32 = 0; lRec20 < <i32>(2); lRec20 = lRec20 + 1) {
            unchecked(this.fRec6_2[lRec20] = 0.0);
        }
        for (let lRec21: i32 = 0; lRec21 < <i32>(2); lRec21 = lRec21 + 1) {
            unchecked(this.fRec7[lRec21] = 0.0);
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(2); lRec22 = lRec22 + 1) {
            unchecked(this.fRec7_1[lRec22] = 0.0);
        }
        for (let lRec23: i32 = 0; lRec23 < <i32>(2); lRec23 = lRec23 + 1) {
            unchecked(this.fRec7_2[lRec23] = 0.0);
        }
        for (let lRec24: i32 = 0; lRec24 < <i32>(2); lRec24 = lRec24 + 1) {
            unchecked(this.fRec7_3[lRec24] = 0.0);
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(2); lRec25 = lRec25 + 1) {
            unchecked(this.iRec8[lRec25] = <i32>(0));
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(2); lRec26 = lRec26 + 1) {
            unchecked(this.fRec8_1[lRec26] = 0.0);
        }
        this.fRec9 = 0.0;
        for (let lRec27: i32 = 0; lRec27 < <i32>(2); lRec27 = lRec27 + 1) {
            unchecked(this.iRec10[lRec27] = <i32>(0));
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(2); lRec28 = lRec28 + 1) {
            unchecked(this.iRec10_1[lRec28] = <i32>(0));
        }
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.fRec13 = 0.0;
        this.iRec14 = <i32>(0);
        this.fRec15 = 0.0;
        this.fRec16 = 0.0;
        this.fRec17 = 0.0;
        this.fRec18 = 0.0;
        this.fRec19 = 0.0;
        this.fRec20 = 0.0;
        this.iRec21 = <i32>(0);
        this.fRec22 = 0.0;
        this.fRec23 = 0.0;
        this.fRec24 = 0.0;
        this.fRec25 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0020000000949949026)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.029999999329447746)));
        this.fConst3 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.20000000298023224)));
        this.fConst5 = (6.2831854820251465 / this.fConst0);
        this.fConst6 = ((this.fConst0 * 0.5) - 1000.0);
        this.fConst7 = (6.289468288421631 / this.fConst0);
        this.fConst8 = (12.578936576843262 / this.fConst0);
        this.fConst9 = (6.276902198791504 / this.fConst0);
        this.fConst10 = (12.553804397583008 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MguitarDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.fSlow1 = <f32>(this.fHslider1);
        this.fSlow2 = (1.0010000467300415 * this.fSlow1);
        this.fSlow3 = (1.0 - (0.003000000026077032 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0))));
        this.fSlow4 = (20.31999969482422 * <f32>(this.fHslider5));
        this.fSlow5 = (0.9990000128746033 * this.fSlow1);
        this.fSlow6 = (this.fConst5 * min<f32>((2000.0 * <f32>(this.fHslider2)), this.fConst6));
        this.fSlow7 = Mathf.cos(this.fSlow6);
        this.fSlow8 = (1.0 - this.fSlow7);
        this.fSlow9 = (0.7071067690849304 * Mathf.sin(this.fSlow6));
        this.fSlow10 = (1.0 - this.fSlow9);
        this.fSlow11 = (this.fSlow9 + 1.0);
        this.fSlow12 = (this.fConst5 * min<f32>(max<f32>(10.0, min<f32>(20000.0, (4400.0 * ((this.fSlow1 * <f32>(this.fHslider3)) / Mathf.pow(((17.312339782714844 * Mathf.log((0.0022727272007614374 * this.fSlow1))) + 69.0), 1.2799999713897705))))), this.fConst6));
        this.fSlow13 = Mathf.cos(this.fSlow12);
        this.fSlow14 = (0.7071067690849304 * Mathf.sin(this.fSlow12));
        this.fSlow15 = (this.fSlow14 + 1.0);
        this.fSlow16 = (-2.0 * (this.fSlow13 / this.fSlow15));
        this.fSlow17 = (1.0 - this.fSlow13);
        this.fSlow18 = (this.fSlow17 / this.fSlow15);
        this.fSlow19 = (0.5 * this.fSlow18);
        this.fSlow20 = (1.0 - this.fSlow14);
        this.fSlow21 = (this.fSlow20 / this.fSlow15);
        this.fSlow22 = (this.fConst0 / this.fSlow1);
        this.fSlow23 = (-1.0 * (this.fConst7 * this.fSlow1));
        this.fSlow24 = Mathf.sin(this.fSlow23);
        this.fSlow25 = (-1.0 * (this.fConst8 * this.fSlow1));
        this.fSlow26 = Mathf.sin(this.fSlow25);
        this.fSlow27 = (this.fSlow24 + (0.5 * this.fSlow26));
        this.fSlow28 = Mathf.cos(this.fSlow25);
        this.fSlow29 = Mathf.cos(this.fSlow23);
        this.fSlow30 = ((((this.fSlow28 * this.fSlow20) - ((2.0 * this.fSlow29) * this.fSlow13)) / this.fSlow15) + 1.0);
        this.fSlow31 = (this.fSlow29 + (0.5 * (this.fSlow28 + 1.0)));
        this.fSlow32 = ((this.fSlow26 * this.fSlow20) - ((2.0 * this.fSlow24) * this.fSlow13));
        this.fSlow33 = Mathf.pow(this.fSlow15, 2.0);
        this.fSlow34 = (this.fSlow15 * (Mathf.pow(this.fSlow30, 2.0) + (Mathf.pow(this.fSlow32, 2.0) / this.fSlow33)));
        this.fSlow35 = (this.fSlow22 * ((0.15899594128131866 * Mathf.atan2(((this.fSlow17 * ((this.fSlow27 * this.fSlow30) - ((this.fSlow31 * this.fSlow32) / this.fSlow15))) / this.fSlow34), ((this.fSlow17 * ((this.fSlow30 * this.fSlow31) + (this.fSlow27 * (this.fSlow32 / this.fSlow15)))) / this.fSlow34))) + 0.9990010261535645));
        this.fSlow36 = (-1.0 * (this.fConst9 * this.fSlow1));
        this.fSlow37 = Mathf.sin(this.fSlow36);
        this.fSlow38 = (-1.0 * (this.fConst10 * this.fSlow1));
        this.fSlow39 = Mathf.sin(this.fSlow38);
        this.fSlow40 = (this.fSlow37 + (0.5 * this.fSlow39));
        this.fSlow41 = Mathf.cos(this.fSlow38);
        this.fSlow42 = Mathf.cos(this.fSlow36);
        this.fSlow43 = ((((this.fSlow41 * this.fSlow20) - ((2.0 * this.fSlow42) * this.fSlow13)) / this.fSlow15) + 1.0);
        this.fSlow44 = (this.fSlow42 + (0.5 * (this.fSlow41 + 1.0)));
        this.fSlow45 = ((this.fSlow39 * this.fSlow20) - ((2.0 * this.fSlow37) * this.fSlow13));
        this.fSlow46 = (this.fSlow15 * (Mathf.pow(this.fSlow43, 2.0) + (Mathf.pow(this.fSlow45, 2.0) / this.fSlow33)));
        this.fSlow47 = (this.fSlow22 * ((0.15931425988674164 * Mathf.atan2(((this.fSlow17 * ((this.fSlow40 * this.fSlow43) - ((this.fSlow44 * this.fSlow45) / this.fSlow15))) / this.fSlow46), ((this.fSlow17 * ((this.fSlow43 * this.fSlow44) + (this.fSlow40 * (this.fSlow45 / this.fSlow15)))) / this.fSlow46))) + 1.001001000404358));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        unchecked(this.fVec9[<i32>(0)] = this.fSlow0);
        let fTemp0: f32 = unchecked(this.fVec9[<i32>(1)]);
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur9: f32 = (iTemp0 ? this.fSlow2 : this.fRec9);
        let iTemp1: i32 = (iTemp0 ? <i32>(1) : unchecked(this.iRec3[<i32>(1)]));
        let iTemp2: i32 = (iTemp1 >= <i32>(2));
        let iTemp3: i32 = (iTemp1 >= <i32>(1));
        let iTemp4: i32 = (iTemp0 & (this.fSlow2 != this.fRec9));
        let fTemp1: f32 = (iTemp4 ? 0.0 : unchecked(this.fRec3_1[<i32>(1)]));
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst1));
        let iTemp5: i32 = (iTemp1 >= <i32>(3));
        let fTemp3: f32 = max<f32>(0.0, (fTemp1 - this.fConst2));
        let fTemp4: f32 = max<f32>(0.0, fTemp1);
        let iTemp6: i32 = (<i32>(1103515245) * (unchecked(this.iRec10[<i32>(1)]) + <i32>(12345)));
        let iRecBody29: i32 = (<i32>(1103515245) * (iTemp6 + <i32>(12345)));
        let iRecBody30: i32 = iTemp6;
        unchecked(this.iRec10[<i32>(0)] = iRecBody29);
        unchecked(this.iRec10_1[<i32>(0)] = iRecBody30);
        let iRecBody31: i32 = (iTemp2 ? (iTemp5 ? ((fTemp4 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp3 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody32: f32 = (iTemp2 ? (iTemp5 ? fTemp4 : fTemp3) : (iTemp3 ? fTemp2 : fTemp1));
        unchecked(this.iRec3[<i32>(0)] = iRecBody31);
        unchecked(this.fRec3_1[<i32>(0)] = fRecBody32);
        let fTemp5: f32 = (<f32>(unchecked(this.iRec10[<i32>(0)])) * unchecked(this.fRec3_1[<i32>(0)]));
        let iTemp7: i32 = (<i32>(1) - iTemp4);
        let fTemp6: f32 = <f32>(iTemp7);
        let fTemp7: f32 = unchecked(this.fRec2[<i32>(1)]);
        let fTemp8: f32 = unchecked(this.fRec2_2[<i32>(1)]);
        let iTemp8: i32 = (iTemp0 ? <i32>(1) : ((this.fSlow0 < fTemp0) ? <i32>(0) : unchecked(this.iRec4[<i32>(1)])));
        let iTemp9: i32 = (iTemp8 >= <i32>(2));
        let iTemp10: i32 = (iTemp8 >= <i32>(1));
        let fTemp9: f32 = unchecked(this.fRec4_1[<i32>(1)]);
        let fTemp10: f32 = min<f32>(1.0, (fTemp9 + this.fConst1));
        let iTemp11: i32 = (iTemp8 >= <i32>(3));
        let fTemp11: f32 = max<f32>(1.0, (fTemp9 - this.fConst3));
        let fRecCur11: f32 = (iTemp0 ? this.fSlow5 : this.fRec11);
        let iTemp12: i32 = (iTemp0 ? <i32>(1) : unchecked(this.iRec8[<i32>(1)]));
        let iTemp13: i32 = (iTemp12 >= <i32>(2));
        let iTemp14: i32 = (iTemp12 >= <i32>(1));
        let iTemp15: i32 = (iTemp0 & (this.fSlow5 != this.fRec11));
        let fTemp12: f32 = (iTemp15 ? 0.0 : unchecked(this.fRec8_1[<i32>(1)]));
        let fTemp13: f32 = min<f32>(1.0, (fTemp12 + this.fConst1));
        let iTemp16: i32 = (iTemp12 >= <i32>(3));
        let fTemp14: f32 = max<f32>(0.0, (fTemp12 - this.fConst2));
        let fTemp15: f32 = max<f32>(0.0, fTemp12);
        let iRecBody33: i32 = (iTemp13 ? (iTemp16 ? ((fTemp15 <= 0.0) ? <i32>(0) : <i32>(3)) : ((fTemp14 <= 0.0) ? <i32>(0) : <i32>(2))) : (iTemp14 ? ((fTemp13 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody34: f32 = (iTemp13 ? (iTemp16 ? fTemp15 : fTemp14) : (iTemp14 ? fTemp13 : fTemp12));
        unchecked(this.iRec8[<i32>(0)] = iRecBody33);
        unchecked(this.fRec8_1[<i32>(0)] = fRecBody34);
        let fTemp16: f32 = (<f32>(unchecked(this.iRec10_1[<i32>(0)])) * unchecked(this.fRec8_1[<i32>(0)]));
        let iTemp17: i32 = (<i32>(1) - iTemp15);
        let fTemp17: f32 = <f32>(iTemp17);
        let fTemp18: f32 = unchecked(this.fRec7[<i32>(1)]);
        let fTemp19: f32 = unchecked(this.fRec7_2[<i32>(1)]);
        let fRecCur12: f32 = (iTemp4 ? this.fSlow18 : this.fRec12);
        let fRecBody35: f32 = (0.00000000023283064365386963 * fTemp5);
        let fRecBody36: f32 = (fTemp6 * fTemp7);
        let fRecBody37: f32 = (((this.fSlow8 * ((0.00000000011641532182693481 * fTemp5) + (fTemp6 * (fTemp7 + (0.5 * unchecked(this.fRec2_1[<i32>(1)])))))) + (fTemp6 * ((2.0 * (fTemp8 * this.fSlow7)) - (unchecked(this.fRec2_3[<i32>(1)]) * this.fSlow10)))) / this.fSlow11);
        let fRecBody38: f32 = (fTemp6 * fTemp8);
        unchecked(this.fRec2[<i32>(0)] = fRecBody35);
        unchecked(this.fRec2_1[<i32>(0)] = fRecBody36);
        unchecked(this.fRec2_2[<i32>(0)] = fRecBody37);
        unchecked(this.fRec2_3[<i32>(0)] = fRecBody38);
        let fRecCur13: f32 = (iTemp4 ? this.fSlow35 : this.fRec13);
        let iTemp18: i32 = max<i32>(<i32>(1), <i32>(fRecCur13));
        let fTemp20: f32 = max<f32>(0.0, (fRecCur13 - <f32>(iTemp18)));
        let fTemp21: f32 = (1.0 - fTemp20);
        let fTemp22: f32 = unchecked(this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp18 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))]);
        let iRecCur14: i32 = (iTemp7 * (this.iRec14 + <i32>(1)));
        let fTemp23: f32 = <f32>((iRecCur14 >= iTemp18));
        let fTemp24: f32 = (fTemp22 * fTemp23);
        let fTemp25: f32 = (fTemp20 + 1.0);
        unchecked(this.fVec3568[<i32>(0)] = fTemp24);
        let fRecCur15: f32 = (iTemp4 ? (((fTemp21 * fTemp22) * fTemp23) / fTemp25) : (((fTemp21 * (fTemp24 - this.fRec15)) / fTemp25) + unchecked(this.fVec3568[<i32>(1)])));
        let fTemp26: f32 = (unchecked(this.fRec2_2[<i32>(0)]) + fRecCur15);
        let fRecCur16: f32 = (iTemp4 ? this.fSlow16 : this.fRec16);
        let fRecCur17: f32 = (iTemp4 ? this.fSlow19 : this.fRec17);
        let fTemp27: f32 = (fTemp26 * fRecCur17);
        let fTemp28: f32 = ((fTemp6 * unchecked(this.fRec1[<i32>(1)])) + fTemp27);
        let fRecCur18: f32 = (iTemp4 ? this.fSlow21 : this.fRec18);
        let fRecBody39: f32 = (((unchecked(this.fRec1_1[<i32>(1)]) * fTemp6) + (fRecCur12 * fTemp26)) - (fRecCur16 * fTemp28));
        let fRecBody40: f32 = (fTemp27 - (fTemp28 * fRecCur18));
        let fRecBody41: f32 = fTemp28;
        unchecked(this.fRec1[<i32>(0)] = fRecBody39);
        unchecked(this.fRec1_1[<i32>(0)] = fRecBody40);
        unchecked(this.fRec1_2[<i32>(0)] = fRecBody41);
        let fRecBody42: f32 = (this.fSlow3 * unchecked(this.fRec1_2[<i32>(0)]));
        let fRecBody43: f32 = unchecked(this.fRec1_2[<i32>(0)]);
        let iTemp20: i32 = (this.fIOTA & <i32>(16383));
        unchecked(this.fRec0[iTemp20] = fRecBody42);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody43);
        let iRecBody44: i32 = (iTemp9 ? (iTemp11 ? <i32>(3) : ((fTemp11 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp10 ? ((fTemp10 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody45: f32 = (iTemp9 ? (iTemp11 ? fTemp9 : fTemp11) : (iTemp10 ? fTemp10 : max<f32>(0.0, (fTemp9 - this.fConst4))));
        unchecked(this.iRec4[<i32>(0)] = iRecBody44);
        unchecked(this.fRec4_1[<i32>(0)] = fRecBody45);
        let fRecCur19: f32 = (iTemp15 ? this.fSlow18 : this.fRec19);
        let fRecBody46: f32 = (0.00000000023283064365386963 * fTemp16);
        let fRecBody47: f32 = (fTemp17 * fTemp18);
        let fRecBody48: f32 = (((this.fSlow8 * ((0.00000000011641532182693481 * fTemp16) + (fTemp17 * (fTemp18 + (0.5 * unchecked(this.fRec7_1[<i32>(1)])))))) + (fTemp17 * ((2.0 * (fTemp19 * this.fSlow7)) - (unchecked(this.fRec7_3[<i32>(1)]) * this.fSlow10)))) / this.fSlow11);
        let fRecBody49: f32 = (fTemp17 * fTemp19);
        unchecked(this.fRec7[<i32>(0)] = fRecBody46);
        unchecked(this.fRec7_1[<i32>(0)] = fRecBody47);
        unchecked(this.fRec7_2[<i32>(0)] = fRecBody48);
        unchecked(this.fRec7_3[<i32>(0)] = fRecBody49);
        let fRecCur20: f32 = (iTemp15 ? this.fSlow47 : this.fRec20);
        let iTemp19: i32 = max<i32>(<i32>(1), <i32>(fRecCur20));
        let fTemp29: f32 = max<f32>(0.0, (fRecCur20 - <f32>(iTemp19)));
        let fTemp30: f32 = (1.0 - fTemp29);
        let fTemp31: f32 = unchecked(this.fRec5[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp19 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))]);
        let iRecCur21: i32 = (iTemp17 * (this.iRec21 + <i32>(1)));
        let fTemp32: f32 = <f32>((iRecCur21 >= iTemp19));
        let fTemp33: f32 = (fTemp31 * fTemp32);
        let fTemp34: f32 = (fTemp29 + 1.0);
        unchecked(this.fVec3661[<i32>(0)] = fTemp33);
        let fRecCur22: f32 = (iTemp15 ? (((fTemp30 * fTemp31) * fTemp32) / fTemp34) : (((fTemp30 * (fTemp33 - this.fRec22)) / fTemp34) + unchecked(this.fVec3661[<i32>(1)])));
        let fTemp35: f32 = (unchecked(this.fRec7_2[<i32>(0)]) + fRecCur22);
        let fRecCur23: f32 = (iTemp15 ? this.fSlow16 : this.fRec23);
        let fRecCur24: f32 = (iTemp15 ? this.fSlow19 : this.fRec24);
        let fTemp36: f32 = (fTemp35 * fRecCur24);
        let fTemp37: f32 = ((fTemp17 * unchecked(this.fRec6[<i32>(1)])) + fTemp36);
        let fRecCur25: f32 = (iTemp15 ? this.fSlow21 : this.fRec25);
        let fRecBody50: f32 = (((unchecked(this.fRec6_1[<i32>(1)]) * fTemp17) + (fRecCur19 * fTemp35)) - (fRecCur23 * fTemp37));
        let fRecBody51: f32 = (fTemp36 - (fTemp37 * fRecCur25));
        let fRecBody52: f32 = fTemp37;
        unchecked(this.fRec6[<i32>(0)] = fRecBody50);
        unchecked(this.fRec6_1[<i32>(0)] = fRecBody51);
        unchecked(this.fRec6_2[<i32>(0)] = fRecBody52);
        let fRecBody53: f32 = (this.fSlow3 * unchecked(this.fRec6_2[<i32>(0)]));
        let fRecBody54: f32 = unchecked(this.fRec6_2[<i32>(0)]);
        unchecked(this.fRec5[iTemp20] = fRecBody53);
        unchecked(this.fRec5_1[<i32>(0)] = fRecBody54);
        outputs[<i32>(0)] = <f32>((this.fSlow4 * (unchecked(this.fRec0_1[<i32>(0)]) * unchecked(this.fRec4_1[<i32>(0)]))));
        outputs[<i32>(1)] = <f32>((this.fSlow4 * (unchecked(this.fRec4_1[<i32>(0)]) * unchecked(this.fRec5_1[<i32>(0)]))));
        unchecked(this.fVec9[<i32>(1)] = unchecked(this.fVec9[<i32>(0)]));
        this.fRec9 = fRecCur9;
        unchecked(this.iRec10[<i32>(1)] = unchecked(this.iRec10[<i32>(0)]));
        unchecked(this.iRec10_1[<i32>(1)] = unchecked(this.iRec10_1[<i32>(0)]));
        unchecked(this.iRec3[<i32>(1)] = unchecked(this.iRec3[<i32>(0)]));
        unchecked(this.fRec3_1[<i32>(1)] = unchecked(this.fRec3_1[<i32>(0)]));
        this.fRec11 = fRecCur11;
        unchecked(this.iRec8[<i32>(1)] = unchecked(this.iRec8[<i32>(0)]));
        unchecked(this.fRec8_1[<i32>(1)] = unchecked(this.fRec8_1[<i32>(0)]));
        this.fRec12 = fRecCur12;
        unchecked(this.fRec2[<i32>(1)] = unchecked(this.fRec2[<i32>(0)]));
        unchecked(this.fRec2_1[<i32>(1)] = unchecked(this.fRec2_1[<i32>(0)]));
        unchecked(this.fRec2_2[<i32>(1)] = unchecked(this.fRec2_2[<i32>(0)]));
        unchecked(this.fRec2_3[<i32>(1)] = unchecked(this.fRec2_3[<i32>(0)]));
        this.fRec13 = fRecCur13;
        this.iRec14 = iRecCur14;
        unchecked(this.fVec3568[<i32>(1)] = unchecked(this.fVec3568[<i32>(0)]));
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec17 = fRecCur17;
        this.fRec18 = fRecCur18;
        unchecked(this.fRec1[<i32>(1)] = unchecked(this.fRec1[<i32>(0)]));
        unchecked(this.fRec1_1[<i32>(1)] = unchecked(this.fRec1_1[<i32>(0)]));
        unchecked(this.fRec1_2[<i32>(1)] = unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        unchecked(this.iRec4[<i32>(1)] = unchecked(this.iRec4[<i32>(0)]));
        unchecked(this.fRec4_1[<i32>(1)] = unchecked(this.fRec4_1[<i32>(0)]));
        this.fRec19 = fRecCur19;
        unchecked(this.fRec7[<i32>(1)] = unchecked(this.fRec7[<i32>(0)]));
        unchecked(this.fRec7_1[<i32>(1)] = unchecked(this.fRec7_1[<i32>(0)]));
        unchecked(this.fRec7_2[<i32>(1)] = unchecked(this.fRec7_2[<i32>(0)]));
        unchecked(this.fRec7_3[<i32>(1)] = unchecked(this.fRec7_3[<i32>(0)]));
        this.fRec20 = fRecCur20;
        this.iRec21 = iRecCur21;
        unchecked(this.fVec3661[<i32>(1)] = unchecked(this.fVec3661[<i32>(0)]));
        this.fRec22 = fRecCur22;
        this.fRec23 = fRecCur23;
        this.fRec24 = fRecCur24;
        this.fRec25 = fRecCur25;
        unchecked(this.fRec6[<i32>(1)] = unchecked(this.fRec6[<i32>(0)]));
        unchecked(this.fRec6_1[<i32>(1)] = unchecked(this.fRec6_1[<i32>(0)]));
        unchecked(this.fRec6_2[<i32>(1)] = fRecBody54);
        unchecked(this.fRec5_1[<i32>(1)] = unchecked(this.fRec5_1[<i32>(0)]));
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Mguitar extends MidiVoice {
    readonly dsp: MguitarDsp = new MguitarDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(2);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MguitarChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MguitarChannel>(changetype<usize>(channel));
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

export class MguitarEffectDsp {
    fSampleRate: i32;
    fHslider0: f32;
    fSlow0: f32;
    fSlow1: f32;
    fConst1: f32;
    fHslider2: f32;
    iSlow0: i32;
    iSlow1: i32;
    fHslider1: f32;
    fSlow2: f32;
    iSlow2: i32;
    fConst5: f32;
    fConst6: f32;
    fConst8: f32;
    fConst9: f32;
    fConst11: f32;
    fConst12: f32;
    fConst14: f32;
    fConst15: f32;
    fSlow3: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2: f32;
    fRec3: StaticArray<f32> = new StaticArray<f32>(262144);
    fIOTA: i32;
    fRec4: StaticArray<f32> = new StaticArray<f32>(262144);

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
        // ui openbox mguitar_effect
        // metadata midi
        // ui slider drive
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
        this.fHslider2 = 1.0;
        this.fHslider1 = 1.0;
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
        this.fRec2 = 0.0;
        for (let lRec16: i32 = 0; lRec16 < <i32>(262144); lRec16 = lRec16 + 1) {
            unchecked(this.fRec3[lRec16] = 0.0);
        }
        this.fIOTA = <i32>(0);
        for (let lRec17: i32 = 0; lRec17 < <i32>(262144); lRec17 = lRec17 + 1) {
            unchecked(this.fRec4[lRec17] = 0.0);
        }
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        let fConst0: f32 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (fConst0 * 0.36000001430511475);
        let fConst2: f32 = (6.2831854820251465 / fConst0);
        let fConst3: f32 = ((fConst0 * 0.5) - 1000.0);
        let fConst4: f32 = (fConst2 * min<f32>(150.0, fConst3));
        this.fConst5 = Mathf.cos(fConst4);
        this.fConst6 = (this.fConst5 + 1.0);
        let fConst7: f32 = (0.7071067690849304 * Mathf.sin(fConst4));
        this.fConst8 = (1.0 - fConst7);
        this.fConst9 = (fConst7 + 1.0);
        let fConst10: f32 = (fConst2 * min<f32>(3600.0, fConst3));
        this.fConst11 = Mathf.cos(fConst10);
        this.fConst12 = (1.0 - this.fConst11);
        let fConst13: f32 = (0.7071067690849304 * Mathf.sin(fConst10));
        this.fConst14 = (1.0 - fConst13);
        this.fConst15 = (fConst13 + 1.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        MguitarEffectDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fHslider0);
        this.fSlow1 = (0.800000011920929 * this.fSlow0);
        this.iSlow0 = max<i32>(<i32>(1), <i32>((this.fConst1 * <f32>(this.fHslider2))));
        this.iSlow1 = min<i32>(<i32>(131072), max<i32>(<i32>(0), (this.iSlow0 + <i32>(-1))));
        this.fSlow2 = (0.8399999737739563 * <f32>(this.fHslider1));
        this.iSlow2 = min<i32>(<i32>(131072), max<i32>(<i32>(0), this.iSlow0));
        this.fSlow3 = (0.1706666648387909 * Mathf.pow(this.fSlow0, 2.0));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fTemp0: f32 = <f32>(inputs[<i32>(0)]);
        let fTemp1: f32 = (this.fSlow1 * fTemp0);
        let fTemp2: f32 = ((fTemp1 > 1.0) ? 0.6666666865348816 : ((fTemp1 < -1.0) ? -0.6666666865348816 : (this.fSlow0 * (fTemp0 * (0.800000011920929 - (this.fSlow3 * Mathf.pow(fTemp0, 2.0)))))));
        let fTemp3: f32 = unchecked(this.fRec0[<i32>(1)]);
        let fTemp4: f32 = unchecked(this.fRec1[<i32>(1)]);
        let fTemp5: f32 = unchecked(this.fRec1_2[<i32>(1)]);
        let fRecBody8: f32 = (1.5 * fTemp2);
        let fRecBody9: f32 = fTemp4;
        let fRecBody10: f32 = ((((this.fConst6 * (((0.75 * fTemp2) + (0.5 * unchecked(this.fRec1_1[<i32>(1)]))) - fTemp4)) + (2.0 * (fTemp5 * this.fConst5))) - (unchecked(this.fRec1_3[<i32>(1)]) * this.fConst8)) / this.fConst9);
        let fRecBody11: f32 = fTemp5;
        unchecked(this.fRec1[<i32>(0)] = fRecBody8);
        unchecked(this.fRec1_1[<i32>(0)] = fRecBody9);
        unchecked(this.fRec1_2[<i32>(0)] = fRecBody10);
        unchecked(this.fRec1_3[<i32>(0)] = fRecBody11);
        let fTemp6: f32 = unchecked(this.fRec0_2[<i32>(1)]);
        let fRecBody12: f32 = unchecked(this.fRec1_2[<i32>(0)]);
        let fRecBody13: f32 = fTemp3;
        let fRecBody14: f32 = ((((this.fConst12 * (fTemp3 + (0.5 * (unchecked(this.fRec0_1[<i32>(1)]) + fRecBody12)))) + (2.0 * (fTemp6 * this.fConst11))) - (unchecked(this.fRec0_3[<i32>(1)]) * this.fConst14)) / this.fConst15);
        let fRecBody15: f32 = fTemp6;
        unchecked(this.fRec0[<i32>(0)] = fRecBody12);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody13);
        unchecked(this.fRec0_2[<i32>(0)] = fRecBody14);
        unchecked(this.fRec0_3[<i32>(0)] = fRecBody15);
        let fRecCur2: f32 = (this.fRec2 + unchecked(this.fRec0_2[<i32>(0)]));
        let fTemp7: f32 = (fTemp2 + this.fRec2);
        let iTemp0: i32 = (this.fIOTA & <i32>(262143));
        let iTemp1: i32 = ((this.fIOTA - (this.iSlow1 + <i32>(1))) & <i32>(262143));
        unchecked(this.fRec3[iTemp0] = ((0.30000001192092896 * unchecked(this.fRec3[iTemp1])) + (this.fSlow2 * fTemp7)));
        let fTemp8: f32 = <f32>(inputs[<i32>(1)]);
        let fTemp9: f32 = (this.fSlow1 * fTemp8);
        let fTemp10: f32 = (((fTemp9 > 1.0) ? 0.6666666865348816 : ((fTemp9 < -1.0) ? -0.6666666865348816 : (this.fSlow0 * (fTemp8 * (0.800000011920929 - (this.fSlow3 * Mathf.pow(fTemp8, 2.0))))))) + this.fRec2);
        unchecked(this.fRec4[iTemp0] = ((0.30000001192092896 * unchecked(this.fRec4[iTemp1])) + (this.fSlow2 * fTemp10)));
        let iTemp2: i32 = ((this.fIOTA - (this.iSlow2 + <i32>(0))) & <i32>(262143));
        outputs[<i32>(0)] = <f32>(((0.6000000238418579 * fTemp7) + (0.4242640733718872 * unchecked(this.fRec3[iTemp2]))));
        outputs[<i32>(1)] = <f32>(((0.6000000238418579 * fTemp10) + (0.4242640733718872 * unchecked(this.fRec4[iTemp2]))));
        unchecked(this.fRec1[<i32>(1)] = unchecked(this.fRec1[<i32>(0)]));
        unchecked(this.fRec1_1[<i32>(1)] = unchecked(this.fRec1_1[<i32>(0)]));
        unchecked(this.fRec1_2[<i32>(1)] = unchecked(this.fRec1_2[<i32>(0)]));
        unchecked(this.fRec1_3[<i32>(1)] = unchecked(this.fRec1_3[<i32>(0)]));
        unchecked(this.fRec0[<i32>(1)] = unchecked(this.fRec0[<i32>(0)]));
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        unchecked(this.fRec0_2[<i32>(1)] = unchecked(this.fRec0_2[<i32>(0)]));
        unchecked(this.fRec0_3[<i32>(1)] = unchecked(this.fRec0_3[<i32>(0)]));
        this.fRec2 = fRecCur2;
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class MguitarChannel extends MidiChannel {
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
    private _drive: f32 = <f32>(1);
    /** drive [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 3 */
    get drive(): f32 { return this._drive; }
    set drive(value: f32) { this._drive = value; this._paramsDirty = true; }
    private _echoSend: f32 = <f32>(1);
    /** echo_send [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 5 */
    get echoSend(): f32 { return this._echoSend; }
    set echoSend(value: f32) { this._echoSend = value; this._paramsDirty = true; }
    private _echoTime: f32 = <f32>(1);
    /** echo_time [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 4 */
    get echoTime(): f32 { return this._echoTime; }
    set echoTime(value: f32) { this._echoTime = value; this._paramsDirty = true; }

    readonly effectDsp: MguitarEffectDsp = new MguitarEffectDsp();
    private efin: StaticArray<f32> = new StaticArray<f32>(2);
    private efout: StaticArray<f32> = new StaticArray<f32>(2);

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this.effectDsp.init(<i32>SAMPLERATE);
    }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Mguitar).applyParams();
        }
        this.effectDsp.fHslider0 = this._drive;
        this.effectDsp.fHslider1 = this._echoSend;
        this.effectDsp.fHslider2 = this._echoTime;
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
            case 3:
                this.drive = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
            case 5:
                this.echoSend = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
            case 4:
                this.echoTime = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
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
    midichannels[0] = new MguitarChannel(10, (channel: MidiChannel) => new Mguitar(channel));
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
