// Faust-generated Disptest
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: _disptest.dsp

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

export class DisptestDsp {
    fSampleRate: i32;
    fVec6: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2483: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2758: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2782: StaticArray<f32> = new StaticArray<f32>(2);
    fButton1: f32;
    fSlow0: f32;
    iSlow0: i32;
    fConst0: f32;
    iConst0: i32;
    iConst1: i32;
    fConst1: f32;
    fHslider0: f32;
    fSlow1: f32;
    fSlow2: f32;
    fSlow3: f32;
    fHslider4: f32;
    fSlow4: f32;
    fConst2: f32;
    fConst3: f32;
    fConst6: f32;
    fConst7: f32;
    fConst9: f32;
    fConst10: f32;
    fConst11: f32;
    fHslider2: f32;
    fSlow5: f32;
    fSlow6: f32;
    fSlow7: f32;
    fHslider3: f32;
    fSlow8: f32;
    fSlow9: f32;
    fSlow10: f32;
    fSlow11: f32;
    fSlow12: f32;
    fSlow13: f32;
    fConst13: f32;
    fConst14: f32;
    fSlow14: f32;
    fSlow15: f32;
    fConst15: f32;
    fSlow16: f32;
    fSlow17: f32;
    fSlow18: f32;
    fSlow19: f32;
    fConst17: f32;
    fSlow20: f32;
    fConst18: f32;
    fSlow21: f32;
    fSlow22: f32;
    fSlow23: f32;
    fSlow24: f32;
    fConst19: f32;
    fSlow25: f32;
    fSlow26: f32;
    fSlow27: f32;
    fSlow28: f32;
    fConst20: f32;
    fSlow29: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    fRec1: f32;
    fRec2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec2_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3_3: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_2: StaticArray<f32> = new StaticArray<f32>(2);
    fRec4_3: StaticArray<f32> = new StaticArray<f32>(2);
    iRec5: i32;
    iRec6: i32;
    fRec7: f32;
    iRec8: i32;
    fRec9: f32;
    fRec10: f32;
    iRec11: i32;
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
        // ui openbox _disptest
        // ui slider damping
        // ui slider dispersion
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton1 = 0.0;
        this.fHslider0 = 0.800000011920929;
        this.fHslider4 = 1.0;
        this.fHslider2 = 261.6300048828125;
        this.fHslider3 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            unchecked(this.fVec6[lDelay0] = 0.0);
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            unchecked(this.fVec2483[lDelay1] = 0.0);
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            unchecked(this.fVec2758[lDelay2] = 0.0);
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            unchecked(this.fVec2782[lDelay3] = 0.0);
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(16384); lRec4 = lRec4 + 1) {
            unchecked(this.fRec0[lRec4] = 0.0);
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            unchecked(this.fRec0_1[lRec5] = 0.0);
        }
        this.fIOTA = <i32>(0);
        this.fRec1 = 0.0;
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            unchecked(this.fRec2[lRec6] = 0.0);
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            unchecked(this.fRec2_1[lRec7] = 0.0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            unchecked(this.fRec2_2[lRec8] = 0.0);
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(2); lRec9 = lRec9 + 1) {
            unchecked(this.fRec2_3[lRec9] = 0.0);
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            unchecked(this.fRec3[lRec10] = 0.0);
        }
        for (let lRec11: i32 = 0; lRec11 < <i32>(2); lRec11 = lRec11 + 1) {
            unchecked(this.fRec3_1[lRec11] = 0.0);
        }
        for (let lRec12: i32 = 0; lRec12 < <i32>(2); lRec12 = lRec12 + 1) {
            unchecked(this.fRec3_2[lRec12] = 0.0);
        }
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            unchecked(this.fRec3_3[lRec13] = 0.0);
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            unchecked(this.fRec4[lRec14] = 0.0);
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            unchecked(this.fRec4_1[lRec15] = 0.0);
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            unchecked(this.fRec4_2[lRec16] = 0.0);
        }
        for (let lRec17: i32 = 0; lRec17 < <i32>(2); lRec17 = lRec17 + 1) {
            unchecked(this.fRec4_3[lRec17] = 0.0);
        }
        this.iRec5 = <i32>(0);
        this.iRec6 = <i32>(0);
        this.fRec7 = 0.0;
        this.iRec8 = <i32>(0);
        this.fRec9 = 0.0;
        this.fRec10 = 0.0;
        this.iRec11 = <i32>(0);
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
        this.iConst0 = <i32>((this.fConst0 * 0.0020000000949949026));
        this.iConst1 = (this.iConst0 - <i32>(1));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 3.0)));
        this.fConst3 = (6.2831854820251465 / this.fConst0);
        let fConst4: f32 = ((this.fConst0 * 0.5) - 1000.0);
        let fConst5: f32 = (this.fConst3 * min<f32>(700.0, fConst4));
        this.fConst6 = Mathf.cos(fConst5);
        this.fConst7 = (1.0 - this.fConst6);
        let fConst8: f32 = (0.7071067690849304 * Mathf.sin(fConst5));
        this.fConst9 = (1.0 - fConst8);
        this.fConst10 = (fConst8 + 1.0);
        this.fConst11 = (this.fConst0 * 0.15915493667125702);
        let fConst12: f32 = (this.fConst3 * min<f32>(18000.0, fConst4));
        this.fConst13 = Mathf.cos(fConst12);
        this.fConst14 = (1.0 - this.fConst13);
        this.fConst15 = (12.566370964050293 / this.fConst0);
        let fConst16: f32 = (0.7071067690849304 * Mathf.sin(fConst12));
        this.fConst17 = (1.0 - fConst16);
        this.fConst18 = (fConst16 + 1.0);
        this.fConst19 = Mathf.pow(this.fConst18, 2.0);
        this.fConst20 = Mathf.pow(this.fConst14, 2.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        DisptestDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton1);
        this.iSlow0 = (this.fSlow0 == 0.0);
        this.fSlow1 = <f32>(this.fHslider0);
        this.fSlow2 = (0.00000000023283064365386963 * this.fSlow1);
        this.fSlow3 = (0.00000000011641532182693481 * this.fSlow1);
        this.fSlow4 = Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0));
        this.fSlow5 = <f32>(this.fHslider2);
        this.fSlow6 = (this.fConst3 * this.fSlow5);
        this.fSlow7 = Mathf.sin(this.fSlow6);
        this.fSlow8 = Mathf.log(max<f32>((0.000029999999242136255 * <f32>(this.fHslider3)), 0.0000009999999974752427));
        this.fSlow9 = Mathf.exp((Mathf.exp(((0.08087892085313797 * this.fSlow8) + 1.9567221403121948)) - (17.312339782714844 * (Mathf.log((0.03852593153715134 * this.fSlow5)) * Mathf.exp((-1.0 * ((this.fSlow8 * ((0.0017900000093504786 * this.fSlow8) + 0.02329999953508377)) + 2.930000066757202)))))));
        this.fSlow10 = (1.0 - this.fSlow9);
        this.fSlow11 = (this.fSlow9 + 1.0);
        this.fSlow12 = Mathf.cos(this.fSlow6);
        this.fSlow13 = (this.fConst11 * ((Mathf.atan((this.fSlow7 / ((this.fSlow10 / this.fSlow11) + this.fSlow12))) - Mathf.atan((this.fSlow7 / (this.fSlow12 + (this.fSlow11 / this.fSlow10))))) / this.fSlow5));
        this.fSlow14 = (-1.0 * this.fSlow6);
        this.fSlow15 = Mathf.sin(this.fSlow14);
        this.fSlow16 = (-1.0 * (this.fConst15 * this.fSlow5));
        this.fSlow17 = Mathf.sin(this.fSlow16);
        this.fSlow18 = (this.fSlow15 + (0.5 * this.fSlow17));
        this.fSlow19 = Mathf.cos(this.fSlow16);
        this.fSlow20 = Mathf.cos(this.fSlow14);
        this.fSlow21 = ((((this.fSlow19 * this.fConst17) - ((2.0 * this.fSlow20) * this.fConst13)) / this.fConst18) + 1.0);
        this.fSlow22 = (this.fSlow20 + (0.5 * (this.fSlow19 + 1.0)));
        this.fSlow23 = ((this.fSlow17 * this.fConst17) - ((2.0 * this.fSlow15) * this.fConst13));
        this.fSlow24 = ((this.fSlow18 * this.fSlow21) - ((this.fSlow22 * this.fSlow23) / this.fConst18));
        this.fSlow25 = (Mathf.pow(this.fSlow21, 2.0) + (Mathf.pow(this.fSlow23, 2.0) / this.fConst19));
        this.fSlow26 = (this.fConst18 * this.fSlow25);
        this.fSlow27 = ((this.fSlow21 * this.fSlow22) + (this.fSlow18 * (this.fSlow23 / this.fConst18)));
        this.fSlow28 = ((this.fConst0 / this.fSlow5) * ((0.15915493667125702 * Mathf.atan2(((this.fConst14 * this.fSlow24) / this.fSlow26), ((this.fConst14 * this.fSlow27) / this.fSlow26))) + 1.0));
        this.fSlow29 = Mathf.pow((0.20000000298023224 / Mathf.sqrt(((this.fConst20 * (Mathf.pow(this.fSlow27, 2.0) + Mathf.pow(this.fSlow24, 2.0))) / (this.fConst19 * Mathf.pow(this.fSlow25, 2.0))))), (1.0099999904632568 / this.fSlow5));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        unchecked(this.fVec6[<i32>(0)] = this.fSlow0);
        let fTemp0: f32 = unchecked(this.fVec6[<i32>(1)]);
        let iTemp0: i32 = (this.fSlow0 > fTemp0);
        let fRecCur1: f32 = (iTemp0 ? this.fSlow5 : this.fRec1);
        let fTemp1: f32 = unchecked(this.fRec3[<i32>(1)]);
        let fTemp2: f32 = <f32>((<i32>(1) - iTemp0));
        let iRecCur5: i32 = ((<i32>(1103515245) * this.iRec5) + <i32>(12345));
        let iRecCur6: i32 = ((iTemp0 > <i32>(0)) ? <i32>(0) : min<i32>(this.iConst0, (this.iRec6 + <i32>(1))));
        let fTemp3: f32 = (<f32>(iRecCur5) * <f32>((iRecCur6 < this.iConst1)));
        let fTemp4: f32 = unchecked(this.fRec3_2[<i32>(1)]);
        let fTemp5: f32 = unchecked(this.fRec2[<i32>(1)]);
        let fTemp6: f32 = unchecked(this.fRec2_2[<i32>(1)]);
        let fTemp7: f32 = unchecked(this.fRec4[<i32>(1)]);
        let fRecCur7: f32 = (this.fSlow0 + (this.fRec7 * <f32>((fTemp0 >= this.fSlow0))));
        let iRecCur8: i32 = (this.iSlow0 * (this.iRec8 + <i32>(1)));
        let fTemp8: f32 = max<f32>((min<f32>((this.fConst1 * fRecCur7), 1.0) * (1.0 - (this.fConst2 * <f32>(iRecCur8)))), 0.0);
        unchecked(this.fVec2483[<i32>(0)] = fTemp8);
        let iTemp1: i32 = (iTemp0 & ((this.fSlow5 != this.fRec1) | (unchecked(this.fVec2483[<i32>(1)]) <= 0.0)));
        let iTemp2: i32 = (<i32>(1) - iTemp1);
        let fTemp9: f32 = <f32>(iTemp2);
        let fTemp10: f32 = unchecked(this.fRec4_2[<i32>(1)]);
        let fRecCur9: f32 = (iTemp1 ? this.fSlow13 : this.fRec9);
        let fTemp11: f32 = (1.0 - fRecCur9);
        let fRecBody18: f32 = (this.fSlow2 * fTemp3);
        let fRecBody19: f32 = (fTemp1 * fTemp2);
        let fRecBody20: f32 = (((this.fConst7 * ((this.fSlow3 * fTemp3) + (fTemp2 * (fTemp1 + (0.5 * unchecked(this.fRec3_1[<i32>(1)])))))) + (fTemp2 * ((2.0 * (fTemp4 * this.fConst6)) - (unchecked(this.fRec3_3[<i32>(1)]) * this.fConst9)))) / this.fConst10);
        let fRecBody21: f32 = (fTemp2 * fTemp4);
        unchecked(this.fRec3[<i32>(0)] = fRecBody18);
        unchecked(this.fRec3_1[<i32>(0)] = fRecBody19);
        unchecked(this.fRec3_2[<i32>(0)] = fRecBody20);
        unchecked(this.fRec3_3[<i32>(0)] = fRecBody21);
        let fRecBody22: f32 = unchecked(this.fRec3_2[<i32>(0)]);
        let fRecBody23: f32 = (fTemp2 * fTemp5);
        let fRecBody24: f32 = (((this.fConst7 * ((0.5 * fRecBody22) + (fTemp2 * (fTemp5 + (0.5 * unchecked(this.fRec2_1[<i32>(1)])))))) + (fTemp2 * ((2.0 * (fTemp6 * this.fConst6)) - (unchecked(this.fRec2_3[<i32>(1)]) * this.fConst9)))) / this.fConst10);
        let fRecBody25: f32 = (fTemp2 * fTemp6);
        unchecked(this.fRec2[<i32>(0)] = fRecBody22);
        unchecked(this.fRec2_1[<i32>(0)] = fRecBody23);
        unchecked(this.fRec2_2[<i32>(0)] = fRecBody24);
        unchecked(this.fRec2_3[<i32>(0)] = fRecBody25);
        let fRecCur10: f32 = (iTemp1 ? (this.fSlow28 - (5.0 * fRecCur9)) : this.fRec10);
        let iTemp3: i32 = max<i32>(<i32>(1), <i32>(fRecCur10));
        let fTemp12: f32 = max<f32>(0.0, (fRecCur10 - <f32>(iTemp3)));
        let fTemp13: f32 = (1.0 - fTemp12);
        let fTemp14: f32 = unchecked(this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp3 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))]);
        let iRecCur11: i32 = ((this.iRec11 + <i32>(1)) * iTemp2);
        let fTemp15: f32 = <f32>((iRecCur11 >= iTemp3));
        let fTemp16: f32 = (fTemp14 * fTemp15);
        let fTemp17: f32 = (fTemp12 + 1.0);
        unchecked(this.fVec2758[<i32>(0)] = fTemp16);
        let fRecCur12: f32 = (iTemp1 ? (((fTemp13 * fTemp14) * fTemp15) / fTemp17) : (((fTemp13 * (fTemp16 - this.fRec12)) / fTemp17) + unchecked(this.fVec2758[<i32>(1)])));
        let fRecBody26: f32 = fRecCur12;
        let fRecBody27: f32 = (fTemp7 * fTemp9);
        let fRecBody28: f32 = (((this.fConst14 * ((0.5 * fRecCur12) + (fTemp9 * (fTemp7 + (0.5 * unchecked(this.fRec4_1[<i32>(1)])))))) + (fTemp9 * ((2.0 * (fTemp10 * this.fConst13)) - (unchecked(this.fRec4_3[<i32>(1)]) * this.fConst17)))) / this.fConst18);
        let fRecBody29: f32 = (fTemp10 * fTemp9);
        unchecked(this.fRec4[<i32>(0)] = fRecBody26);
        unchecked(this.fRec4_1[<i32>(0)] = fRecBody27);
        unchecked(this.fRec4_2[<i32>(0)] = fRecBody28);
        unchecked(this.fRec4_3[<i32>(0)] = fRecBody29);
        let fTemp18: f32 = ((8.0 * unchecked(this.fRec2_2[<i32>(0)])) + unchecked(this.fRec4_2[<i32>(0)]));
        let fTemp19: f32 = (fRecCur9 + 1.0);
        unchecked(this.fVec2782[<i32>(0)] = fTemp18);
        let fRecCur13: f32 = (iTemp1 ? ((fTemp11 * fTemp18) / fTemp19) : (((fTemp11 * (fTemp18 - this.fRec13)) / fTemp19) + unchecked(this.fVec2782[<i32>(1)])));
        let fRecCur14: f32 = (iTemp1 ? ((fTemp11 * fRecCur13) / fTemp19) : (((fTemp11 * (fRecCur13 - this.fRec14)) / fTemp19) + this.fRec13));
        let fRecCur15: f32 = (iTemp1 ? ((fTemp11 * fRecCur14) / fTemp19) : (((fTemp11 * (fRecCur14 - this.fRec15)) / fTemp19) + this.fRec14));
        let fRecCur16: f32 = (iTemp1 ? ((fTemp11 * fRecCur15) / fTemp19) : (((fTemp11 * (fRecCur15 - this.fRec16)) / fTemp19) + this.fRec15));
        let fRecCur17: f32 = (iTemp1 ? ((fTemp11 * fRecCur16) / fTemp19) : (((fTemp11 * (fRecCur16 - this.fRec17)) / fTemp19) + this.fRec16));
        let fTemp20: f32 = (fTemp8 * fRecCur17);
        let fRecCur18: f32 = (iTemp1 ? this.fSlow29 : this.fRec18);
        let fRecBody30: f32 = (fTemp20 * (1.0 - (this.fSlow4 * (1.0 - fRecCur18))));
        let fRecBody31: f32 = fTemp20;
        unchecked(this.fRec0[(this.fIOTA & <i32>(16383))] = fRecBody30);
        unchecked(this.fRec0_1[<i32>(0)] = fRecBody31);
        outputs[<i32>(0)] = <f32>((4.0 * unchecked(this.fRec0_1[<i32>(0)])));
        unchecked(this.fVec6[<i32>(1)] = unchecked(this.fVec6[<i32>(0)]));
        this.fRec1 = fRecCur1;
        this.iRec5 = iRecCur5;
        this.iRec6 = iRecCur6;
        this.fRec7 = fRecCur7;
        this.iRec8 = iRecCur8;
        unchecked(this.fVec2483[<i32>(1)] = unchecked(this.fVec2483[<i32>(0)]));
        this.fRec9 = fRecCur9;
        unchecked(this.fRec3[<i32>(1)] = unchecked(this.fRec3[<i32>(0)]));
        unchecked(this.fRec3_1[<i32>(1)] = unchecked(this.fRec3_1[<i32>(0)]));
        unchecked(this.fRec3_2[<i32>(1)] = unchecked(this.fRec3_2[<i32>(0)]));
        unchecked(this.fRec3_3[<i32>(1)] = unchecked(this.fRec3_3[<i32>(0)]));
        unchecked(this.fRec2[<i32>(1)] = unchecked(this.fRec2[<i32>(0)]));
        unchecked(this.fRec2_1[<i32>(1)] = unchecked(this.fRec2_1[<i32>(0)]));
        unchecked(this.fRec2_2[<i32>(1)] = unchecked(this.fRec2_2[<i32>(0)]));
        unchecked(this.fRec2_3[<i32>(1)] = unchecked(this.fRec2_3[<i32>(0)]));
        this.fRec10 = fRecCur10;
        this.iRec11 = iRecCur11;
        unchecked(this.fVec2758[<i32>(1)] = unchecked(this.fVec2758[<i32>(0)]));
        this.fRec12 = fRecCur12;
        unchecked(this.fRec4[<i32>(1)] = unchecked(this.fRec4[<i32>(0)]));
        unchecked(this.fRec4_1[<i32>(1)] = unchecked(this.fRec4_1[<i32>(0)]));
        unchecked(this.fRec4_2[<i32>(1)] = unchecked(this.fRec4_2[<i32>(0)]));
        unchecked(this.fRec4_3[<i32>(1)] = unchecked(this.fRec4_3[<i32>(0)]));
        unchecked(this.fVec2782[<i32>(1)] = unchecked(this.fVec2782[<i32>(0)]));
        this.fRec13 = fRecCur13;
        this.fRec14 = fRecCur14;
        this.fRec15 = fRecCur15;
        this.fRec16 = fRecCur16;
        this.fRec17 = fRecCur17;
        this.fRec18 = fRecCur18;
        unchecked(this.fRec0_1[<i32>(1)] = unchecked(this.fRec0_1[<i32>(0)]));
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Disptest extends MidiVoice {
    readonly dsp: DisptestDsp = new DisptestDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: DisptestChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<DisptestChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider3 = this.typedChannel.dispersion;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider2 = notefreq(note);
        this.dsp.fHslider0 = <f32>velocity / 127.0;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider3 = this.typedChannel.dispersion;
        this.dsp.fButton1 = 0.0;
        this.dsp.control();
        this.dsp.frame(this.fin, this.fout);
        this.dsp.fButton1 = 1.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.dsp.fButton1 = 0.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.dsp.fButton1 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {
        this.dsp.frame(this.fin, this.fout);
        const output: f32 = this.fout[0];
        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.dsp.fButton1 == 0.0) this.releaseSamples++;
        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export class DisptestChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _damping: f32 = <f32>(1);
    /** damping [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 0 */
    get damping(): f32 { return this._damping; }
    set damping(value: f32) { this._damping = value; this._paramsDirty = true; }
    private _dispersion: f32 = <f32>(1);
    /** dispersion [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 1 */
    get dispersion(): f32 { return this._dispersion; }
    set dispersion(value: f32) { this._dispersion = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Disptest).applyParams();
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
                this.damping = 0.02 + <f32>value / 127.0 * 2.54;
                break;
            case 1:
                this.dispersion = 0.02 + <f32>value / 127.0 * 2.54;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new DisptestChannel(10, (channel: MidiChannel) => new Disptest(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // damping (CC 0, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(0, 49);
    // dispersion (CC 1, range: 0.02–2.56, default: 1)
    midichannels[0].controlchange(1, 49);
}

export function postprocess(): void {
}
