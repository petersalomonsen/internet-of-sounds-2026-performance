// Faust-generated Pmdrums
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: pmdrums.dsp

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

export class PmdrumsDsp {
    fSampleRate: i32;
    fVec1714: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2150: StaticArray<f32> = new StaticArray<f32>(2);
    fVec2377: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3022: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3023: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3262: StaticArray<f32> = new StaticArray<f32>(2);
    fVec3263: StaticArray<f32> = new StaticArray<f32>(2);
    fHslider4: f32;
    fSlow0: f32;
    fHslider6: f32;
    fSlow1: f32;
    fHslider12: f32;
    fSlow2: f32;
    fButton2: f32;
    fSlow3: f32;
    fHslider3: f32;
    iSlow0: i32;
    fSlow4: f32;
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fHslider5: f32;
    fSlow5: f32;
    fConst3: f32;
    fSlow6: f32;
    fHslider8: f32;
    fSlow7: f32;
    fConst4: f32;
    fHslider9: f32;
    fSlow8: f32;
    fConst5: f32;
    fHslider1: f32;
    fSlow9: f32;
    fHslider7: f32;
    fSlow10: f32;
    fSlow11: f32;
    fHslider11: f32;
    fSlow12: f32;
    fHslider0: f32;
    fSlow13: f32;
    fHslider10: f32;
    fSlow14: f32;
    fSlow15: f32;
    fSlow16: f32;
    fConst6: f32;
    fConst7: f32;
    fConst10: f32;
    fConst11: f32;
    fConst12: f32;
    fConst15: f32;
    fConst16: f32;
    fConst17: f32;
    fConst18: f32;
    fConst19: f32;
    fConst22: f32;
    fConst23: f32;
    fConst24: f32;
    fConst25: f32;
    fConst28: f32;
    fConst29: f32;
    fConst30: f32;
    fConst33: f32;
    fConst34: f32;
    fConst35: f32;
    fConst36: f32;
    fConst37: f32;
    fConst40: f32;
    fConst41: f32;
    fConst42: f32;
    fConst43: f32;
    iRec0: StaticArray<i32> = new StaticArray<i32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec2: StaticArray<i32> = new StaticArray<i32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec3: StaticArray<i32> = new StaticArray<i32>(2);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec4: StaticArray<i32> = new StaticArray<i32>(2);
    fRec4_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec5: i32;
    fRec6: StaticArray<f32> = new StaticArray<f32>(3);
    fRec7: StaticArray<f32> = new StaticArray<f32>(3);
    fRec8: StaticArray<f32> = new StaticArray<f32>(3);
    fRec9: StaticArray<f32> = new StaticArray<f32>(3);
    fRec10: StaticArray<f32> = new StaticArray<f32>(3);
    fRec11: StaticArray<f32> = new StaticArray<f32>(3);
    fRec12: StaticArray<f32> = new StaticArray<f32>(3);
    fRec13: StaticArray<f32> = new StaticArray<f32>(3);
    fRec14: StaticArray<f32> = new StaticArray<f32>(3);

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
        // ui openbox pmdrums
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui slider hat_cutoff
        // ui slider hat_decay
        // ui slider hat_level
        // ui slider kick_click
        // ui slider kick_decay
        // ui slider kick_level
        // ui slider kick_sweep
        // ui slider snare_decay
        // ui slider snare_level
        // ui slider snare_snap
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fHslider4 = 1.0;
        this.fHslider6 = 80.0;
        this.fHslider12 = 10000.0;
        this.fButton2 = 0.0;
        this.fHslider3 = 261.6300048828125;
        this.fHslider5 = 0.30000001192092896;
        this.fHslider8 = 0.30000001192092896;
        this.fHslider9 = 0.07999999821186066;
        this.fHslider1 = 1.0;
        this.fHslider7 = 1.0;
        this.fHslider11 = 0.07000000029802322;
        this.fHslider0 = 0.800000011920929;
        this.fHslider10 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec1714[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec2150[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec2377[lDelay2] = 0.0;
        }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) {
            this.fVec3022[lDelay3] = 0.0;
        }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) {
            this.fVec3023[lDelay4] = 0.0;
        }
        for (let lDelay5: i32 = 0; lDelay5 < <i32>(2); lDelay5 = lDelay5 + 1) {
            this.fVec3262[lDelay5] = 0.0;
        }
        for (let lDelay6: i32 = 0; lDelay6 < <i32>(2); lDelay6 = lDelay6 + 1) {
            this.fVec3263[lDelay6] = 0.0;
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            this.iRec0[lRec7] = <i32>(0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec0_1[lRec8] = 0.0;
        }
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
        for (let lRec13: i32 = 0; lRec13 < <i32>(2); lRec13 = lRec13 + 1) {
            this.iRec3[lRec13] = <i32>(0);
        }
        for (let lRec14: i32 = 0; lRec14 < <i32>(2); lRec14 = lRec14 + 1) {
            this.fRec3_1[lRec14] = 0.0;
        }
        for (let lRec15: i32 = 0; lRec15 < <i32>(2); lRec15 = lRec15 + 1) {
            this.iRec4[lRec15] = <i32>(0);
        }
        for (let lRec16: i32 = 0; lRec16 < <i32>(2); lRec16 = lRec16 + 1) {
            this.fRec4_1[lRec16] = 0.0;
        }
        this.iRec5 = <i32>(0);
        for (let lRec21: i32 = 0; lRec21 < <i32>(3); lRec21 = lRec21 + 1) {
            this.fRec6[lRec21] = 0.0;
        }
        for (let lRec22: i32 = 0; lRec22 < <i32>(3); lRec22 = lRec22 + 1) {
            this.fRec7[lRec22] = 0.0;
        }
        for (let lRec25: i32 = 0; lRec25 < <i32>(3); lRec25 = lRec25 + 1) {
            this.fRec8[lRec25] = 0.0;
        }
        for (let lRec26: i32 = 0; lRec26 < <i32>(3); lRec26 = lRec26 + 1) {
            this.fRec9[lRec26] = 0.0;
        }
        for (let lRec27: i32 = 0; lRec27 < <i32>(3); lRec27 = lRec27 + 1) {
            this.fRec10[lRec27] = 0.0;
        }
        for (let lRec28: i32 = 0; lRec28 < <i32>(3); lRec28 = lRec28 + 1) {
            this.fRec11[lRec28] = 0.0;
        }
        for (let lRec31: i32 = 0; lRec31 < <i32>(3); lRec31 = lRec31 + 1) {
            this.fRec12[lRec31] = 0.0;
        }
        for (let lRec32: i32 = 0; lRec32 < <i32>(3); lRec32 = lRec32 + 1) {
            this.fRec13[lRec32] = 0.0;
        }
        for (let lRec35: i32 = 0; lRec35 < <i32>(3); lRec35 = lRec35 + 1) {
            this.fRec14[lRec35] = 0.0;
        }
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.0010000000474974513)));
        this.fConst2 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.30000001192092896)));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.20000000298023224)));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = ((this.fConst0 * 0.5) - 1000.0);
        let fConst8: f32 = (this.fConst6 * min<f32>(5000.0, this.fConst7));
        let fConst9: f32 = (0.7071067690849304 * Mathf.sin(fConst8));
        this.fConst10 = (1.0 - fConst9);
        this.fConst11 = Mathf.cos(fConst8);
        this.fConst12 = (1.0 - this.fConst11);
        let fConst13: f32 = (this.fConst6 * min<f32>(4000.0, this.fConst7));
        let fConst14: f32 = (0.7071067690849304 * Mathf.sin(fConst13));
        this.fConst15 = (1.0 - fConst14);
        this.fConst16 = Mathf.cos(fConst13);
        this.fConst17 = (this.fConst16 + 1.0);
        this.fConst18 = (fConst14 + 1.0);
        this.fConst19 = (fConst9 + 1.0);
        let fConst20: f32 = (this.fConst6 * min<f32>(10.0, this.fConst7));
        let fConst21: f32 = (0.7071067690849304 * Mathf.sin(fConst20));
        this.fConst22 = (1.0 - fConst21);
        this.fConst23 = Mathf.cos(fConst20);
        this.fConst24 = (this.fConst23 + 1.0);
        this.fConst25 = (fConst21 + 1.0);
        let fConst26: f32 = (this.fConst6 * min<f32>(500.0, this.fConst7));
        let fConst27: f32 = (0.7071067690849304 * Mathf.sin(fConst26));
        this.fConst28 = (1.0 - fConst27);
        this.fConst29 = Mathf.cos(fConst26);
        this.fConst30 = (1.0 - this.fConst29);
        let fConst31: f32 = (this.fConst6 * min<f32>(350.0, this.fConst7));
        let fConst32: f32 = (0.7071067690849304 * Mathf.sin(fConst31));
        this.fConst33 = (1.0 - fConst32);
        this.fConst34 = Mathf.cos(fConst31);
        this.fConst35 = (this.fConst34 + 1.0);
        this.fConst36 = (fConst32 + 1.0);
        this.fConst37 = (fConst27 + 1.0);
        let fConst38: f32 = (this.fConst6 * min<f32>(3000.0, this.fConst7));
        let fConst39: f32 = (0.7071067690849304 * Mathf.sin(fConst38));
        this.fConst40 = (1.0 - fConst39);
        this.fConst41 = Mathf.cos(fConst38);
        this.fConst42 = (this.fConst41 + 1.0);
        this.fConst43 = (fConst39 + 1.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        PmdrumsDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fHslider4);
        this.fSlow1 = <f32>(this.fHslider6);
        this.fSlow2 = <f32>(this.fHslider12);
        this.fSlow3 = <f32>(this.fButton2);
        this.iSlow0 = <i32>(((17.312339782714844 * Mathf.log((0.0022727272007614374 * <f32>(this.fHslider3)))) + 69.5));
        this.fSlow4 = (this.fSlow3 * <f32>((this.iSlow0 == <i32>(60))));
        this.fSlow5 = (1.0 / max<f32>(1.0, (this.fConst0 * <f32>(this.fHslider5))));
        this.fSlow6 = (this.fSlow3 * <f32>((this.iSlow0 == <i32>(62))));
        this.fSlow7 = (1.0 / max<f32>(1.0, (this.fConst0 * <f32>(this.fHslider8))));
        this.fSlow8 = (1.0 / max<f32>(1.0, (this.fConst0 * <f32>(this.fHslider9))));
        this.fSlow9 = (3.174999952316284 * <f32>(this.fHslider1));
        this.fSlow10 = (1.6867187023162842 * <f32>(this.fHslider7));
        this.fSlow11 = (this.fSlow3 * <f32>((this.iSlow0 == <i32>(66))));
        this.fSlow12 = (1.0 / max<f32>(1.0, (this.fConst0 * <f32>(this.fHslider11))));
        this.fSlow13 = <f32>(this.fHslider0);
        this.fSlow14 = (this.fSlow13 * <f32>(this.fHslider10));
        this.fSlow15 = (0.0000000011088558959926331 * this.fSlow14);
        this.fSlow16 = (0.0000000005544279479963166 * this.fSlow14);
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        this.fVec1714[<i32>(0)] = this.fSlow4;
        let fTemp0: f32 = this.fVec1714[<i32>(1)];
        let iTemp0: i32 = (this.fSlow4 > fTemp0);
        let iTemp1: i32 = (this.fSlow4 < fTemp0);
        let iTemp2: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(0) : this.iRec0[<i32>(1)]));
        let iTemp3: i32 = (iTemp2 >= <i32>(2));
        let iTemp4: i32 = (iTemp2 >= <i32>(1));
        let fTemp1: f32 = this.fRec0_1[<i32>(1)];
        let fTemp2: f32 = min<f32>(1.0, (fTemp1 + this.fConst1));
        let iTemp5: i32 = (iTemp2 >= <i32>(3));
        let fTemp3: f32 = max<f32>(0.0, (fTemp1 - this.fConst2));
        let iRecCur5: i32 = ((<i32>(1103515245) * this.iRec5) + <i32>(12345));
        let fTemp4: f32 = <f32>(iRecCur5);
        let iTemp6: i32 = (iTemp0 ? <i32>(1) : (iTemp1 ? <i32>(0) : this.iRec1[<i32>(1)]));
        let iTemp7: i32 = (iTemp6 >= <i32>(2));
        let iTemp8: i32 = (iTemp6 >= <i32>(1));
        let fTemp5: f32 = this.fRec1_1[<i32>(1)];
        let fTemp6: f32 = min<f32>(1.0, (fTemp5 + this.fConst1));
        let iTemp9: i32 = (iTemp6 >= <i32>(3));
        let fTemp7: f32 = max<f32>(0.0, (fTemp5 - this.fSlow5));
        this.fVec2150[<i32>(0)] = this.fSlow6;
        let fTemp8: f32 = this.fVec2150[<i32>(1)];
        let iTemp10: i32 = (this.fSlow6 > fTemp8);
        let iTemp11: i32 = (this.fSlow6 < fTemp8);
        let iTemp12: i32 = (iTemp10 ? <i32>(1) : (iTemp11 ? <i32>(0) : this.iRec2[<i32>(1)]));
        let iTemp13: i32 = (iTemp12 >= <i32>(2));
        let iTemp14: i32 = (iTemp12 >= <i32>(1));
        let fTemp9: f32 = this.fRec2_1[<i32>(1)];
        let fTemp10: f32 = min<f32>(1.0, (fTemp9 + this.fConst1));
        let iTemp15: i32 = (iTemp12 >= <i32>(3));
        let fTemp11: f32 = max<f32>(0.0, (fTemp9 - this.fSlow7));
        let iTemp16: i32 = (iTemp10 ? <i32>(1) : (iTemp11 ? <i32>(0) : this.iRec3[<i32>(1)]));
        let iTemp17: i32 = (iTemp16 >= <i32>(2));
        let iTemp18: i32 = (iTemp16 >= <i32>(1));
        let fTemp12: f32 = this.fRec3_1[<i32>(1)];
        let fTemp13: f32 = min<f32>(1.0, (fTemp12 + this.fConst1));
        let iTemp19: i32 = (iTemp16 >= <i32>(3));
        let fTemp14: f32 = max<f32>(0.0, (fTemp12 - this.fSlow8));
        this.fVec2377[<i32>(0)] = this.fSlow11;
        let fTemp15: f32 = this.fVec2377[<i32>(1)];
        let iTemp20: i32 = ((this.fSlow11 > fTemp15) ? <i32>(1) : ((this.fSlow11 < fTemp15) ? <i32>(0) : this.iRec4[<i32>(1)]));
        let iTemp21: i32 = (iTemp20 >= <i32>(2));
        let iTemp22: i32 = (iTemp20 >= <i32>(1));
        let fTemp16: f32 = this.fRec4_1[<i32>(1)];
        let fTemp17: f32 = min<f32>(1.0, (fTemp16 + 1.0));
        let iTemp23: i32 = (iTemp20 >= <i32>(3));
        let fTemp18: f32 = max<f32>(0.0, (fTemp16 - this.fSlow12));
        let iRecBody17: i32 = (iTemp21 ? (iTemp23 ? <i32>(3) : ((fTemp18 <= 0.0) ? <i32>(3) : <i32>(2))) : (iTemp22 ? ((fTemp17 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody18: f32 = (iTemp21 ? (iTemp23 ? fTemp16 : fTemp18) : (iTemp22 ? fTemp17 : max<f32>(0.0, (fTemp16 - this.fConst3))));
        this.iRec4[<i32>(0)] = iRecBody17;
        this.fRec4_1[<i32>(0)] = fRecBody18;
        let fTemp19: f32 = (fTemp4 * this.fRec4_1[<i32>(0)]);
        let iRecBody19: i32 = (iTemp3 ? (iTemp5 ? <i32>(3) : ((fTemp3 <= 0.0) ? <i32>(3) : <i32>(2))) : (iTemp4 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody20: f32 = (iTemp3 ? (iTemp5 ? fTemp1 : fTemp3) : (iTemp4 ? fTemp2 : fTemp3));
        this.iRec0[<i32>(0)] = iRecBody19;
        this.fRec0_1[<i32>(0)] = fRecBody20;
        let fTemp20: f32 = this.fRec6[<i32>(1)];
        let fTemp21: f32 = this.fRec7[<i32>(1)];
        this.fVec3022[<i32>(0)] = (0.00000000023283064365386963 * fTemp4);
        let fTemp23: f32 = this.fVec3022[<i32>(1)];
        this.fVec3023[<i32>(0)] = fTemp23;
        let fTemp24: f32 = (((0.00000000011641532182693481 * fTemp4) + (0.5 * this.fVec3023[<i32>(1)])) - fTemp23);
        this.fRec7[<i32>(0)] = ((((2.0 * (fTemp21 * this.fConst16)) + (this.fConst17 * fTemp24)) - (this.fRec7[<i32>(2)] * this.fConst15)) / this.fConst18);
        this.fRec6[<i32>(0)] = ((((2.0 * (fTemp20 * this.fConst11)) + (this.fConst12 * (fTemp21 + (0.5 * (this.fRec7[<i32>(0)] + this.fRec7[<i32>(2)]))))) - (this.fRec6[<i32>(2)] * this.fConst10)) / this.fConst19);
        let iRecBody23: i32 = (iTemp7 ? (iTemp9 ? <i32>(3) : ((fTemp7 <= 0.0) ? <i32>(3) : <i32>(2))) : (iTemp8 ? ((fTemp6 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody24: f32 = (iTemp7 ? (iTemp9 ? fTemp5 : fTemp7) : (iTemp8 ? fTemp6 : max<f32>(0.0, (fTemp5 - this.fConst3))));
        this.iRec1[<i32>(0)] = iRecBody23;
        this.fRec1_1[<i32>(0)] = fRecBody24;
        let fTemp25: f32 = this.fRec8[<i32>(1)];
        let fTemp26: f32 = (this.fConst6 * min<f32>(((this.fSlow1 * this.fRec1_1[<i32>(0)]) + 11.0), this.fConst7));
        let fTemp27: f32 = Mathf.cos(fTemp26);
        let fTemp28: f32 = this.fRec9[<i32>(1)];
        this.fRec9[<i32>(0)] = ((((2.0 * (fTemp28 * this.fConst23)) + (fTemp24 * this.fConst24)) - (this.fRec9[<i32>(2)] * this.fConst22)) / this.fConst25);
        let fTemp30: f32 = (0.7071067690849304 * Mathf.sin(fTemp26));
        this.fRec8[<i32>(0)] = ((((2.0 * (fTemp25 * fTemp27)) + ((1.0 - fTemp27) * (fTemp28 + (0.5 * (this.fRec9[<i32>(0)] + this.fRec9[<i32>(2)]))))) - (this.fRec8[<i32>(2)] * (1.0 - fTemp30))) / (fTemp30 + 1.0));
        let fTemp31: f32 = this.fRec10[<i32>(1)];
        let fTemp32: f32 = this.fRec11[<i32>(1)];
        this.fRec11[<i32>(0)] = ((((2.0 * (fTemp32 * this.fConst34)) + (fTemp24 * this.fConst35)) - (this.fRec11[<i32>(2)] * this.fConst33)) / this.fConst36);
        this.fRec10[<i32>(0)] = ((((2.0 * (fTemp31 * this.fConst29)) + (this.fConst30 * (fTemp32 + (0.5 * (this.fRec11[<i32>(0)] + this.fRec11[<i32>(2)]))))) - (this.fRec10[<i32>(2)] * this.fConst28)) / this.fConst37);
        let iRecBody29: i32 = (iTemp13 ? (iTemp15 ? <i32>(3) : ((fTemp11 <= 0.0) ? <i32>(3) : <i32>(2))) : (iTemp14 ? ((fTemp10 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody30: f32 = (iTemp13 ? (iTemp15 ? fTemp9 : fTemp11) : (iTemp14 ? fTemp10 : max<f32>(0.0, (fTemp9 - this.fConst4))));
        this.iRec2[<i32>(0)] = iRecBody29;
        this.fRec2_1[<i32>(0)] = fRecBody30;
        let fTemp34: f32 = this.fRec12[<i32>(1)];
        let fTemp35: f32 = this.fRec13[<i32>(1)];
        this.fRec13[<i32>(0)] = ((((2.0 * (fTemp35 * this.fConst41)) + (fTemp24 * this.fConst42)) - (this.fRec13[<i32>(2)] * this.fConst40)) / this.fConst43);
        this.fRec12[<i32>(0)] = ((((2.0 * (fTemp34 * this.fConst11)) + (this.fConst12 * (fTemp35 + (0.5 * (this.fRec13[<i32>(0)] + this.fRec13[<i32>(2)]))))) - (this.fRec12[<i32>(2)] * this.fConst10)) / this.fConst19);
        let iRecBody33: i32 = (iTemp17 ? (iTemp19 ? <i32>(3) : ((fTemp14 <= 0.0) ? <i32>(3) : <i32>(2))) : (iTemp18 ? ((fTemp13 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody34: f32 = (iTemp17 ? (iTemp19 ? fTemp12 : fTemp14) : (iTemp18 ? fTemp13 : max<f32>(0.0, (fTemp12 - this.fConst5))));
        this.iRec3[<i32>(0)] = iRecBody33;
        this.fRec3_1[<i32>(0)] = fRecBody34;
        let fTemp37: f32 = this.fRec14[<i32>(1)];
        let fTemp38: f32 = (this.fConst6 * min<f32>((this.fSlow2 + (2000.0 * this.fRec4_1[<i32>(0)])), this.fConst7));
        let fTemp39: f32 = Mathf.cos(fTemp38);
        this.fVec3262[<i32>(0)] = (this.fSlow15 * fTemp19);
        let fTemp40: f32 = this.fVec3262[<i32>(1)];
        this.fVec3263[<i32>(0)] = fTemp40;
        let fTemp41: f32 = (0.7071067690849304 * Mathf.sin(fTemp38));
        this.fRec14[<i32>(0)] = ((((2.0 * (fTemp37 * fTemp39)) + ((fTemp39 + 1.0) * (((this.fSlow16 * fTemp19) + (0.5 * this.fVec3263[<i32>(1)])) - fTemp40))) - (this.fRec14[<i32>(2)] * (1.0 - fTemp41))) / (fTemp41 + 1.0));
        outputs[<i32>(0)] = <f32>((4.0 * ((this.fSlow13 * ((this.fSlow9 * ((this.fSlow0 * (this.fRec0_1[<i32>(0)] * this.fRec6[<i32>(0)])) + (30.0 * (this.fRec1_1[<i32>(0)] * this.fRec8[<i32>(0)])))) + (this.fSlow10 * ((7.0 * (this.fRec10[<i32>(0)] * this.fRec2_1[<i32>(0)])) + (2.0 * (this.fRec12[<i32>(0)] * this.fRec3_1[<i32>(0)])))))) + this.fRec14[<i32>(0)])));
        this.fVec1714[<i32>(1)] = this.fVec1714[<i32>(0)];
        this.iRec5 = iRecCur5;
        this.fVec2150[<i32>(1)] = this.fVec2150[<i32>(0)];
        this.fVec2377[<i32>(1)] = this.fVec2377[<i32>(0)];
        this.iRec4[<i32>(1)] = this.iRec4[<i32>(0)];
        this.fRec4_1[<i32>(1)] = this.fRec4_1[<i32>(0)];
        this.iRec0[<i32>(1)] = this.iRec0[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fVec3022[<i32>(1)] = this.fVec3022[<i32>(0)];
        this.fVec3023[<i32>(1)] = this.fVec3023[<i32>(0)];
        this.fRec7[<i32>(2)] = this.fRec7[<i32>(1)];
        this.fRec7[<i32>(1)] = this.fRec7[<i32>(0)];
        this.fRec6[<i32>(2)] = this.fRec6[<i32>(1)];
        this.fRec6[<i32>(1)] = this.fRec6[<i32>(0)];
        this.iRec1[<i32>(1)] = this.iRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.fRec9[<i32>(2)] = this.fRec9[<i32>(1)];
        this.fRec9[<i32>(1)] = this.fRec9[<i32>(0)];
        this.fRec8[<i32>(2)] = this.fRec8[<i32>(1)];
        this.fRec8[<i32>(1)] = this.fRec8[<i32>(0)];
        this.fRec11[<i32>(2)] = this.fRec11[<i32>(1)];
        this.fRec11[<i32>(1)] = this.fRec11[<i32>(0)];
        this.fRec10[<i32>(2)] = this.fRec10[<i32>(1)];
        this.fRec10[<i32>(1)] = this.fRec10[<i32>(0)];
        this.iRec2[<i32>(1)] = this.iRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec13[<i32>(2)] = this.fRec13[<i32>(1)];
        this.fRec13[<i32>(1)] = this.fRec13[<i32>(0)];
        this.fRec12[<i32>(2)] = this.fRec12[<i32>(1)];
        this.fRec12[<i32>(1)] = this.fRec12[<i32>(0)];
        this.iRec3[<i32>(1)] = this.iRec3[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fVec3262[<i32>(1)] = this.fVec3262[<i32>(0)];
        this.fVec3263[<i32>(1)] = this.fVec3263[<i32>(0)];
        this.fRec14[<i32>(2)] = this.fRec14[<i32>(1)];
        this.fRec14[<i32>(1)] = this.fRec14[<i32>(0)];
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Pmdrums extends MidiVoice {
    readonly dsp: PmdrumsDsp = new PmdrumsDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: PmdrumsChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<PmdrumsChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider12 = this.typedChannel.hatCutoff;
        this.dsp.fHslider11 = this.typedChannel.hatDecay;
        this.dsp.fHslider10 = this.typedChannel.hatLevel;
        this.dsp.fHslider4 = this.typedChannel.kickClick;
        this.dsp.fHslider5 = this.typedChannel.kickDecay;
        this.dsp.fHslider1 = this.typedChannel.kickLevel;
        this.dsp.fHslider6 = this.typedChannel.kickSweep;
        this.dsp.fHslider8 = this.typedChannel.snareDecay;
        this.dsp.fHslider7 = this.typedChannel.snareLevel;
        this.dsp.fHslider9 = this.typedChannel.snareSnap;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider3 = notefreq(note);
        this.dsp.fHslider0 = <f32>velocity / 127.0;
        this.dsp.fHslider12 = this.typedChannel.hatCutoff;
        this.dsp.fHslider11 = this.typedChannel.hatDecay;
        this.dsp.fHslider10 = this.typedChannel.hatLevel;
        this.dsp.fHslider4 = this.typedChannel.kickClick;
        this.dsp.fHslider5 = this.typedChannel.kickDecay;
        this.dsp.fHslider1 = this.typedChannel.kickLevel;
        this.dsp.fHslider6 = this.typedChannel.kickSweep;
        this.dsp.fHslider8 = this.typedChannel.snareDecay;
        this.dsp.fHslider7 = this.typedChannel.snareLevel;
        this.dsp.fHslider9 = this.typedChannel.snareSnap;
        this.dsp.fButton2 = 0.0;
        this.dsp.control();
        this.dsp.frame(this.fin, this.fout);
        this.dsp.fButton2 = 1.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.dsp.fButton2 = 0.0;
        this.dsp.control();
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.dsp.fButton2 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {
        this.dsp.frame(this.fin, this.fout);
        const output: f32 = this.fout[0];
        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.dsp.fButton2 == 0.0) this.releaseSamples++;
        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export class PmdrumsChannel extends MidiChannel {
    private _paramsDirty: bool = true;

    private _hatCutoff: f32 = <f32>(10000);
    /** hat_cutoff [init: 10000, min: 2000, max: 16000, step: 10] · CC 0 */
    get hatCutoff(): f32 { return this._hatCutoff; }
    set hatCutoff(value: f32) { this._hatCutoff = value; this._paramsDirty = true; }
    private _hatDecay: f32 = <f32>(0.07);
    /** hat_decay [init: 0.07, min: 0.01, max: 0.5, step: 0.005] · CC 1 */
    get hatDecay(): f32 { return this._hatDecay; }
    set hatDecay(value: f32) { this._hatDecay = value; this._paramsDirty = true; }
    private _hatLevel: f32 = <f32>(1);
    /** hat_level [init: 1, min: 0, max: 2, step: 0.01] · CC 2 */
    get hatLevel(): f32 { return this._hatLevel; }
    set hatLevel(value: f32) { this._hatLevel = value; this._paramsDirty = true; }
    private _kickClick: f32 = <f32>(1);
    /** kick_click [init: 1, min: 0, max: 4, step: 0.01] · CC 3 */
    get kickClick(): f32 { return this._kickClick; }
    set kickClick(value: f32) { this._kickClick = value; this._paramsDirty = true; }
    private _kickDecay: f32 = <f32>(0.3);
    /** kick_decay [init: 0.3, min: 0.05, max: 1.5, step: 0.01] · CC 4 */
    get kickDecay(): f32 { return this._kickDecay; }
    set kickDecay(value: f32) { this._kickDecay = value; this._paramsDirty = true; }
    private _kickLevel: f32 = <f32>(1);
    /** kick_level [init: 1, min: 0, max: 2, step: 0.01] · CC 5 */
    get kickLevel(): f32 { return this._kickLevel; }
    set kickLevel(value: f32) { this._kickLevel = value; this._paramsDirty = true; }
    private _kickSweep: f32 = <f32>(80);
    /** kick_sweep [init: 80, min: 10, max: 400, step: 1] · CC 6 */
    get kickSweep(): f32 { return this._kickSweep; }
    set kickSweep(value: f32) { this._kickSweep = value; this._paramsDirty = true; }
    private _snareDecay: f32 = <f32>(0.3);
    /** snare_decay [init: 0.3, min: 0.05, max: 1.5, step: 0.01] · CC 8 */
    get snareDecay(): f32 { return this._snareDecay; }
    set snareDecay(value: f32) { this._snareDecay = value; this._paramsDirty = true; }
    private _snareLevel: f32 = <f32>(1);
    /** snare_level [init: 1, min: 0, max: 2, step: 0.01] · CC 9 */
    get snareLevel(): f32 { return this._snareLevel; }
    set snareLevel(value: f32) { this._snareLevel = value; this._paramsDirty = true; }
    private _snareSnap: f32 = <f32>(0.08);
    /** snare_snap [init: 0.08, min: 0.01, max: 0.5, step: 0.005] · CC 11 */
    get snareSnap(): f32 { return this._snareSnap; }
    set snareSnap(value: f32) { this._snareSnap = value; this._paramsDirty = true; }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Pmdrums).applyParams();
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
                this.hatCutoff = 2000 + <f32>value / 127.0 * 14000;
                break;
            case 1:
                this.hatDecay = 0.01 + <f32>value / 127.0 * 0.49;
                break;
            case 2:
                this.hatLevel = <f32>value / 127.0 * 2;
                break;
            case 3:
                this.kickClick = <f32>value / 127.0 * 4;
                break;
            case 4:
                this.kickDecay = 0.05 + <f32>value / 127.0 * 1.45;
                break;
            case 5:
                this.kickLevel = <f32>value / 127.0 * 2;
                break;
            case 6:
                this.kickSweep = 10 + <f32>value / 127.0 * 390;
                break;
            case 8:
                this.snareDecay = 0.05 + <f32>value / 127.0 * 1.45;
                break;
            case 9:
                this.snareLevel = <f32>value / 127.0 * 2;
                break;
            case 11:
                this.snareSnap = 0.01 + <f32>value / 127.0 * 0.49;
                break;
        }
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new PmdrumsChannel(10, (channel: MidiChannel) => new Pmdrums(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);

    // hat cutoff (CC 0, range: 2000–16000, default: 10000)
    midichannels[0].controlchange(0, 73);
    // hat decay (CC 1, range: 0.01–0.5, default: 0.07)
    midichannels[0].controlchange(1, 16);
    // hat level (CC 2, range: 0–2, default: 1)
    midichannels[0].controlchange(2, 64);
    // kick click (CC 3, range: 0–4, default: 1)
    midichannels[0].controlchange(3, 32);
    // kick decay (CC 4, range: 0.05–1.5, default: 0.3)
    midichannels[0].controlchange(4, 22);
    // kick level (CC 5, range: 0–2, default: 1)
    midichannels[0].controlchange(5, 64);
    // kick sweep (CC 6, range: 10–400, default: 80)
    midichannels[0].controlchange(6, 23);
    // snare decay (CC 8, range: 0.05–1.5, default: 0.3)
    midichannels[0].controlchange(8, 22);
    // snare level (CC 9, range: 0–2, default: 1)
    midichannels[0].controlchange(9, 64);
    // snare snap (CC 11, range: 0.01–0.5, default: 0.08)
    midichannels[0].controlchange(11, 18);
}

export function postprocess(): void {
}
