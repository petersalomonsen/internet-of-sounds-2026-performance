// Faust-generated Pmguitar
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: pmguitar.dsp

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

export class PmguitarDsp {
    fSampleRate: i32;
    fVec7: StaticArray<f32> = new StaticArray<f32>(2);
    fVec1282: StaticArray<f32> = new StaticArray<f32>(2);
    fVec1347: StaticArray<f32> = new StaticArray<f32>(2);
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
    fHslider5: f32;
    fSlow4: f32;
    fHslider3: f32;
    fSlow5: f32;
    fConst7: f32;
    fHslider1: f32;
    fSlow6: f32;
    fSlow7: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fIOTA: i32;
    iRec1: StaticArray<i32> = new StaticArray<i32>(2);
    fRec1_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec2: StaticArray<i32> = new StaticArray<i32>(2);
    fRec2_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec3: StaticArray<f32> = new StaticArray<f32>(16384);
    fRec3_1: StaticArray<f32> = new StaticArray<f32>(2);
    iRec4: i32;
    fRec5: f32;
    fRec6: f32;
    fRec7: f32;
    iRec8: i32;
    fRec9: f32;
    fRec10: f32;
    fRec11: f32;
    fRec12: f32;
    fRec13: f32;
    fRec14: f32;

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
        // ui openbox pmguitar
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
        this.fHslider2 = 220.0;
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
            this.fVec1282[lDelay1] = 0.0;
        }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) {
            this.fVec1347[lDelay2] = 0.0;
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(16384); lRec3 = lRec3 + 1) {
            this.fRec0[lRec3] = 0.0;
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(2); lRec4 = lRec4 + 1) {
            this.fRec0_1[lRec4] = 0.0;
        }
        this.fIOTA = <i32>(0);
        for (let lRec5: i32 = 0; lRec5 < <i32>(2); lRec5 = lRec5 + 1) {
            this.iRec1[lRec5] = <i32>(0);
        }
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) {
            this.fRec1_1[lRec6] = 0.0;
        }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) {
            this.iRec2[lRec7] = <i32>(0);
        }
        for (let lRec8: i32 = 0; lRec8 < <i32>(2); lRec8 = lRec8 + 1) {
            this.fRec2_1[lRec8] = 0.0;
        }
        for (let lRec9: i32 = 0; lRec9 < <i32>(16384); lRec9 = lRec9 + 1) {
            this.fRec3[lRec9] = 0.0;
        }
        for (let lRec10: i32 = 0; lRec10 < <i32>(2); lRec10 = lRec10 + 1) {
            this.fRec3_1[lRec10] = 0.0;
        }
        this.iRec4 = <i32>(0);
        this.fRec5 = 0.0;
        this.fRec6 = 0.0;
        this.fRec7 = 0.0;
        this.iRec8 = <i32>(0);
        this.fRec9 = 0.0;
        this.fRec10 = 0.0;
        this.fRec11 = 0.0;
        this.fRec12 = 0.0;
        this.fRec13 = 0.0;
        this.fRec14 = 0.0;
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.019999999552965164)));
        this.fConst2 = (1.0 / max<f32>(1.0, this.fConst0));
        this.fConst3 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.004999999888241291)));
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst6 = (6.2831854820251465 / this.fConst0);
        this.fConst7 = (18849.556640625 / this.fConst0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        PmguitarDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.iSlow0 = (this.fSlow0 == 0.0);
        this.fSlow1 = <f32>(this.fHslider2);
        this.fSlow2 = (this.fConst0 / this.fSlow1);
        this.fSlow3 = max<f32>(0.0, (1.0 - (0.00009999999747378752 * Mathf.pow(100.0, (<f32>(this.fHslider4) + -1.0)))));
        this.fSlow4 = (63.5 * <f32>(this.fHslider5));
        this.fSlow5 = (3500.0 * ((this.fSlow1 * <f32>(this.fHslider3)) / Mathf.pow(((17.312339782714844 * Mathf.log((0.0022727272007614374 * this.fSlow1))) + 69.0), 1.2999999523162842)));
        this.fSlow6 = Mathf.exp((-1.0 * (this.fConst7 * <f32>(this.fHslider1))));
        this.fSlow7 = (0.00000000023283064365386963 * (1.0 - this.fSlow6));
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
        let iRecBody11: i32 = (iTemp2 ? (iTemp4 ? <i32>(3) : ((fTemp3 <= 1.0) ? <i32>(3) : <i32>(2))) : (iTemp3 ? ((fTemp2 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody12: f32 = (iTemp2 ? (iTemp4 ? fTemp1 : fTemp3) : (iTemp3 ? fTemp2 : max<f32>(0.0, (fTemp1 - this.fConst3))));
        this.iRec1[<i32>(0)] = iRecBody11;
        this.fRec1_1[<i32>(0)] = fRecBody12;
        let iTemp8: i32 = (this.iSlow0 & (this.fRec1_1[<i32>(0)] <= 0.0));
        let iRecCur4: i32 = (this.iRec4 ^ iTemp0);
        let iTemp9: i32 = (iRecCur4 == <i32>(1));
        let iTemp10: i32 = (iTemp0 & iTemp9);
        let fRecCur5: f32 = (iTemp10 ? this.fSlow2 : this.fRec5);
        let iTemp11: i32 = max<i32>(<i32>(1), <i32>(fRecCur5));
        let fTemp6: f32 = max<f32>(0.0, (fRecCur5 - <f32>(iTemp11)));
        let fTemp7: f32 = this.fRec0[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp11 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))];
        this.fVec1282[<i32>(0)] = fTemp7;
        let fRecCur6: f32 = ((((1.0 - fTemp6) * (fTemp7 - this.fRec6)) / (fTemp6 + 1.0)) + this.fVec1282[<i32>(1)]);
        let iRecCur8: i32 = ((<i32>(1103515245) * this.iRec8) + <i32>(12345));
        let iRecBody13: i32 = (iTemp6 ? <i32>(2) : (iTemp7 ? ((fTemp5 >= 1.0) ? <i32>(2) : <i32>(1)) : <i32>(0)));
        let fRecBody14: f32 = (iTemp6 ? max<f32>(0.0, (fTemp4 - this.fConst5)) : (iTemp7 ? fTemp5 : fTemp4));
        this.iRec2[<i32>(0)] = iRecBody13;
        this.fRec2_1[<i32>(0)] = fRecBody14;
        let fRecCur7: f32 = ((this.fSlow6 * this.fRec7) + (this.fSlow7 * (<f32>(iRecCur8) * this.fRec2_1[<i32>(0)])));
        let fRecCur9: f32 = (iTemp10 ? this.fSlow5 : this.fRec9);
        let fTemp8: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur9)));
        let fRecCur10: f32 = (((fRecCur6 + (<f32>(iTemp9) * fRecCur7)) * (1.0 - fTemp8)) + (this.fRec10 * fTemp8));
        let iTemp12: i32 = (iRecCur4 == <i32>(0));
        let iTemp13: i32 = (iTemp0 & iTemp12);
        let fRecCur11: f32 = (iTemp13 ? this.fSlow2 : this.fRec11);
        let iTemp14: i32 = max<i32>(<i32>(1), <i32>(fRecCur11));
        let fTemp9: f32 = max<f32>(0.0, (fRecCur11 - <f32>(iTemp14)));
        let fTemp10: f32 = this.fRec3[((this.fIOTA - (min<i32>(<i32>(8192), max<i32>(<i32>(0), (iTemp14 + <i32>(-1)))) + <i32>(1))) & <i32>(16383))];
        this.fVec1347[<i32>(0)] = fTemp10;
        let fRecCur12: f32 = ((((1.0 - fTemp9) * (fTemp10 - this.fRec12)) / (fTemp9 + 1.0)) + this.fVec1347[<i32>(1)]);
        let fRecCur13: f32 = (iTemp13 ? this.fSlow5 : this.fRec13);
        let fTemp11: f32 = Mathf.exp((-1.0 * (this.fConst6 * fRecCur13)));
        let fRecCur14: f32 = (((fRecCur12 + (<f32>(iTemp12) * fRecCur7)) * (1.0 - fTemp11)) + (this.fRec14 * fTemp11));
        let fRecBody15: f32 = (iTemp8 ? 0.0 : (iTemp9 ? (this.fSlow3 * fRecCur10) : (0.8999999761581421 * fRecCur6)));
        let fRecBody16: f32 = (iTemp9 ? fRecCur10 : fRecCur6);
        let iTemp15: i32 = (this.fIOTA & <i32>(16383));
        this.fRec0[iTemp15] = fRecBody15;
        this.fRec0_1[<i32>(0)] = fRecBody16;
        let fRecBody17: f32 = (iTemp8 ? 0.0 : (iTemp12 ? (this.fSlow3 * fRecCur14) : (0.8999999761581421 * fRecCur12)));
        let fRecBody18: f32 = (iTemp12 ? fRecCur14 : fRecCur12);
        this.fRec3[iTemp15] = fRecBody17;
        this.fRec3_1[<i32>(0)] = fRecBody18;
        outputs[<i32>(0)] = <f32>((this.fSlow4 * (this.fRec1_1[<i32>(0)] * (this.fRec0_1[<i32>(0)] + this.fRec3_1[<i32>(0)]))));
        this.fVec7[<i32>(1)] = this.fVec7[<i32>(0)];
        this.iRec1[<i32>(1)] = this.iRec1[<i32>(0)];
        this.fRec1_1[<i32>(1)] = this.fRec1_1[<i32>(0)];
        this.iRec4 = iRecCur4;
        this.fRec5 = fRecCur5;
        this.fVec1282[<i32>(1)] = this.fVec1282[<i32>(0)];
        this.fRec6 = fRecCur6;
        this.iRec8 = iRecCur8;
        this.iRec2[<i32>(1)] = this.iRec2[<i32>(0)];
        this.fRec2_1[<i32>(1)] = this.fRec2_1[<i32>(0)];
        this.fRec7 = fRecCur7;
        this.fRec9 = fRecCur9;
        this.fRec10 = fRecCur10;
        this.fRec11 = fRecCur11;
        this.fVec1347[<i32>(1)] = this.fVec1347[<i32>(0)];
        this.fRec12 = fRecCur12;
        this.fRec13 = fRecCur13;
        this.fRec14 = fRecCur14;
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
        this.fRec3_1[<i32>(1)] = this.fRec3_1[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Pmguitar extends MidiVoice {
    readonly dsp: PmguitarDsp = new PmguitarDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: PmguitarChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<PmguitarChannel>(changetype<usize>(channel));
        this.dsp.init(<i32>SAMPLERATE);
    }

    // Copy channel-level params into the DSP UI zones and refresh
    // control-rate state. Invoked from the channel when params change.
    applyParams(): void {
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider1 = this.typedChannel.exciterTone;
        this.dsp.control();
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider2 = notefreq(note);
        this.dsp.fHslider5 = <f32>velocity / 127.0;
        this.dsp.fHslider3 = this.typedChannel.bright;
        this.dsp.fHslider4 = this.typedChannel.damping;
        this.dsp.fHslider1 = this.typedChannel.exciterTone;
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

export class PmguitarEffectDsp {
    fSampleRate: i32;
    fVec677: StaticArray<f32> = new StaticArray<f32>(2);
    fVec678: StaticArray<f32> = new StaticArray<f32>(2);
    fHslider0: f32;
    fSlow0: f32;
    fHslider1: f32;
    fSlow1: f32;
    fSlow2: f32;
    fConst5: f32;
    fConst6: f32;
    fConst7: f32;
    fConst10: f32;
    fConst11: f32;
    fConst12: f32;
    fConst13: f32;
    fConst14: f32;
    fSlow3: f32;
    fRec0: StaticArray<f32> = new StaticArray<f32>(2);
    fRec0_1: StaticArray<f32> = new StaticArray<f32>(2);
    fRec1: StaticArray<f32> = new StaticArray<f32>(3);
    fRec2: StaticArray<f32> = new StaticArray<f32>(3);

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
        // ui openbox pmguitar_effect
        // metadata midi
        // ui slider amp_feedback
        // metadata midi
        // ui slider drive
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fHslider0 = 1.0;
        this.fHslider1 = 1.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            this.fVec677[lDelay0] = 0.0;
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) {
            this.fVec678[lDelay1] = 0.0;
        }
        for (let lRec2: i32 = 0; lRec2 < <i32>(2); lRec2 = lRec2 + 1) {
            this.fRec0[lRec2] = 0.0;
        }
        for (let lRec3: i32 = 0; lRec3 < <i32>(2); lRec3 = lRec3 + 1) {
            this.fRec0_1[lRec3] = 0.0;
        }
        for (let lRec4: i32 = 0; lRec4 < <i32>(3); lRec4 = lRec4 + 1) {
            this.fRec1[lRec4] = 0.0;
        }
        for (let lRec5: i32 = 0; lRec5 < <i32>(3); lRec5 = lRec5 + 1) {
            this.fRec2[lRec5] = 0.0;
        }
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        let fConst0: f32 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        let fConst1: f32 = (6.2831854820251465 / fConst0);
        let fConst2: f32 = ((fConst0 * 0.5) - 1000.0);
        let fConst3: f32 = (fConst1 * min<f32>(8000.0, fConst2));
        let fConst4: f32 = (0.7071067690849304 * Mathf.sin(fConst3));
        this.fConst5 = (1.0 - fConst4);
        this.fConst6 = Mathf.cos(fConst3);
        this.fConst7 = (1.0 - this.fConst6);
        let fConst8: f32 = (fConst1 * min<f32>(40.0, fConst2));
        let fConst9: f32 = (0.7071067690849304 * Mathf.sin(fConst8));
        this.fConst10 = (1.0 - fConst9);
        this.fConst11 = Mathf.cos(fConst8);
        this.fConst12 = (this.fConst11 + 1.0);
        this.fConst13 = (fConst9 + 1.0);
        this.fConst14 = (fConst4 + 1.0);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        PmguitarEffectDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = min<f32>(0.9900000095367432, (0.9200000166893005 * <f32>(this.fHslider0)));
        this.fSlow1 = <f32>(this.fHslider1);
        this.fSlow2 = (0.20000000298023224 * this.fSlow1);
        this.fSlow3 = (0.0026666666381061077 * Mathf.pow(this.fSlow1, 2.0));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fTemp0: f32 = this.fRec1[<i32>(1)];
        let fTemp1: f32 = this.fRec2[<i32>(1)];
        let fTemp3: f32 = this.fRec0[<i32>(1)];
        let fTemp4: f32 = <f32>(inputs[<i32>(0)]);
        let fTemp5: f32 = (this.fSlow2 * fTemp4);
        let fTemp6: f32 = ((fTemp5 > 1.0) ? 0.6666666865348816 : ((fTemp5 < -1.0) ? -0.6666666865348816 : (this.fSlow1 * (fTemp4 * (0.20000000298023224 - (this.fSlow3 * Mathf.pow(fTemp4, 2.0)))))));
        let fTemp7: f32 = ((this.fSlow0 * fTemp3) + fTemp6);
        this.fVec677[<i32>(0)] = fTemp7;
        let fTemp8: f32 = this.fVec677[<i32>(1)];
        this.fVec678[<i32>(0)] = fTemp8;
        this.fRec2[<i32>(0)] = ((((2.0 * (fTemp1 * this.fConst11)) + (this.fConst12 * ((0.5 * (fTemp7 + this.fVec678[<i32>(1)])) - fTemp8))) - (this.fRec2[<i32>(2)] * this.fConst10)) / this.fConst13);
        this.fRec1[<i32>(0)] = ((((2.0 * (fTemp0 * this.fConst6)) + (this.fConst7 * (fTemp1 + (0.5 * (this.fRec2[<i32>(0)] + this.fRec2[<i32>(2)]))))) - (this.fRec1[<i32>(2)] * this.fConst5)) / this.fConst14);
        let fRecBody6: f32 = this.fRec1[<i32>(0)];
        let fRecBody7: f32 = (fTemp3 + fTemp6);
        this.fRec0[<i32>(0)] = fRecBody6;
        this.fRec0_1[<i32>(0)] = fRecBody7;
        outputs[<i32>(0)] = <f32>(this.fRec0_1[<i32>(0)]);
        this.fVec677[<i32>(1)] = this.fVec677[<i32>(0)];
        this.fVec678[<i32>(1)] = this.fVec678[<i32>(0)];
        this.fRec2[<i32>(2)] = this.fRec2[<i32>(1)];
        this.fRec2[<i32>(1)] = this.fRec2[<i32>(0)];
        this.fRec1[<i32>(2)] = this.fRec1[<i32>(1)];
        this.fRec1[<i32>(1)] = fRecBody6;
        this.fRec0[<i32>(1)] = this.fRec0[<i32>(0)];
        this.fRec0_1[<i32>(1)] = this.fRec0_1[<i32>(0)];
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class PmguitarChannel extends MidiChannel {
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
    private _ampFeedback: f32 = <f32>(1);
    /** amp_feedback [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 4 */
    get ampFeedback(): f32 { return this._ampFeedback; }
    set ampFeedback(value: f32) { this._ampFeedback = value; this._paramsDirty = true; }
    private _drive: f32 = <f32>(1);
    /** drive [init: 1, min: 0.02, max: 2.56, step: 0.02] · CC 3 */
    get drive(): f32 { return this._drive; }
    set drive(value: f32) { this._drive = value; this._paramsDirty = true; }

    readonly effectDsp: PmguitarEffectDsp = new PmguitarEffectDsp();
    private efin: StaticArray<f32> = new StaticArray<f32>(1);
    private efout: StaticArray<f32> = new StaticArray<f32>(1);

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this.effectDsp.init(<i32>SAMPLERATE);
    }

    private applyParams(): void {
        for (let n = 0; n < this.voices.length; n++) {
            (this.voices[n] as Pmguitar).applyParams();
        }
        this.effectDsp.fHslider0 = this._ampFeedback;
        this.effectDsp.fHslider1 = this._drive;
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
            case 4:
                this.ampFeedback = 0.02 + (<f32>value / 127.0) * 2.54;
                break;
            case 3:
                this.drive = 0.02 + (<f32>value / 127.0) * 2.54;
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
    midichannels[0] = new PmguitarChannel(10, (channel: MidiChannel) => new Pmguitar(channel));
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
