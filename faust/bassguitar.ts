// Faust-generated Bassguitar
// Auto-transpiled from Faust DSP by faust2as.js (AS backend, native control/frame)
// Source: bassguitar.dsp

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

export class BassguitarDsp {
    fSampleRate: i32;
    fVec31: StaticArray<f32> = new StaticArray<f32>(2);
    fVec1058: StaticArray<f32> = new StaticArray<f32>(8192);
    fConst0: f32;
    fConst1: f32;
    fConst2: f32;
    fButton0: f32;
    fSlow0: f32;
    iSlow0: i32;
    fSlow1: f32;
    fConst3: f32;
    fConst4: f32;
    fConst5: f32;
    fConst6: f32;
    fConst7: f32;
    fHslider2: f32;
    fSlow2: f32;
    fHslider1: f32;
    fSlow3: f32;
    fConst8: f32;
    fSlow4: f32;
    fSlow5: f32;
    fSlow6: f32;
    fSlow7: f32;
    fSlow8: f32;
    fSlow9: f32;
    iSlow1: i32;
    iSlow2: i32;
    iSlow3: i32;
    fSlow10: f32;
    fSlow11: f32;
    fSlow12: f32;
    iSlow4: i32;
    fSlow13: f32;
    fSlow14: f32;
    iSlow5: i32;
    fSlow15: f32;
    fSlow16: f32;
    iSlow6: i32;
    fConst9: f32;
    fConst10: f32;
    fRec0: f32;
    fRec1: f32;
    fRec2: f32;
    fRec3: f32;
    iRec4: i32;
    fRec5: f32;
    iRec6: i32;
    fIOTA: i32;

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
        // ui openbox bassguitar
        // ui slider freq
        // ui slider gain
        // ui button gate
        // ui closebox
    }
    static classInit(sample_rate: i32): void {
    }
    instanceResetUserInterface(): void {
        this.fButton0 = 0.0;
        this.fHslider2 = 0.5;
        this.fHslider1 = 110.0;
    }
    instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) {
            unchecked(this.fVec31[lDelay0] = 0.0);
        }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(8192); lDelay1 = lDelay1 + 1) {
            unchecked(this.fVec1058[lDelay1] = 0.0);
        }
        this.fRec0 = 0.0;
        this.fRec1 = 0.0;
        this.fRec2 = 0.0;
        this.fRec3 = 0.0;
        this.iRec4 = <i32>(0);
        this.fRec5 = 0.0;
        this.iRec6 = <i32>(0);
        this.fIOTA = <i32>(0);
    }
    instanceConstants(sample_rate: i32): void {
        this.fSampleRate = sample_rate;
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, <f32>(this.fSampleRate)));
        this.fConst1 = (44.099998474121094 / this.fConst0);
        this.fConst2 = (1.0 - this.fConst1);
        this.fConst3 = max<f32>(1.0, (this.fConst0 * 0.03999999910593033));
        this.fConst4 = (1.0 / this.fConst3);
        this.fConst5 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.009999999776482582)));
        this.fConst6 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.004999999888241291)));
        this.fConst7 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.04500000178813934)));
        this.fConst8 = (43.982295989990234 / this.fConst0);
        this.fConst9 = Mathf.exp((-1.0 * (1884.95556640625 / this.fConst0)));
        this.fConst10 = ((1.0 - this.fConst9) * 0.0000000004656612873077393);
    }
    instanceInit(sample_rate: i32): void {
        this.instanceConstants(sample_rate);
        this.instanceResetUserInterface();
        this.instanceClear();
    }
    init(sample_rate: i32): void {
        BassguitarDsp.classInit(sample_rate);
        this.instanceInit(sample_rate);
    }
    control(): void {
        this.fSlow0 = <f32>(this.fButton0);
        this.iSlow0 = (this.fSlow0 == 0.0);
        this.fSlow1 = (this.fConst1 * ((0.9750000238418579 * this.fSlow0) + (0.8500000238418579 * (1.0 - this.fSlow0))));
        this.fSlow2 = (11.0 * <f32>(this.fHslider2));
        this.fSlow3 = <f32>(this.fHslider1);
        this.fSlow4 = Mathf.exp((-1.0 * (this.fConst8 * this.fSlow3)));
        this.fSlow5 = (1.0 - this.fSlow4);
        this.fSlow6 = max<f32>(2.0, ((this.fConst0 / this.fSlow3) + (-1.0 - (this.fSlow4 / this.fSlow5))));
        this.fSlow7 = (this.fSlow6 - 1.4999949932098389);
        this.fSlow8 = Mathf.floor(this.fSlow7);
        this.fSlow9 = (this.fSlow6 - (4.0 + this.fSlow8));
        this.iSlow1 = <i32>(this.fSlow7);
        this.iSlow2 = min<i32>(<i32>(4096), max<i32>(<i32>(0), this.iSlow1));
        this.iSlow3 = min<i32>(<i32>(4096), max<i32>(<i32>(0), (this.iSlow1 + <i32>(1))));
        this.fSlow10 = (this.fSlow6 + (-1.0 - this.fSlow8));
        this.fSlow11 = (this.fSlow6 - this.fSlow8);
        this.fSlow12 = (this.fSlow10 * this.fSlow11);
        this.iSlow4 = min<i32>(<i32>(4096), max<i32>(<i32>(0), (this.iSlow1 + <i32>(2))));
        this.fSlow13 = (this.fSlow6 + (-2.0 - this.fSlow8));
        this.fSlow14 = ((this.fSlow13 * this.fSlow10) * this.fSlow11);
        this.iSlow5 = min<i32>(<i32>(4096), max<i32>(<i32>(0), (this.iSlow1 + <i32>(3))));
        this.fSlow15 = (this.fSlow6 - (3.0 + this.fSlow8));
        this.fSlow16 = (((this.fSlow15 * this.fSlow13) * this.fSlow10) * this.fSlow11);
        this.iSlow6 = min<i32>(<i32>(4096), max<i32>(<i32>(0), (this.iSlow1 + <i32>(4))));
    }
    frame(inputs: StaticArray<f32>, outputs: StaticArray<f32>): void {
        let fRecCur2: f32 = (this.fSlow1 + (this.fConst2 * this.fRec2));
        let fTemp0: f32 = (this.fRec1 * fRecCur2);
        unchecked(this.fVec1058[(this.fIOTA & <i32>(8191))] = fTemp0);
        let iRecCur4: i32 = ((<i32>(1103515245) * this.iRec4) + <i32>(12345));
        unchecked(this.fVec31[<i32>(0)] = this.fSlow0);
        let fRecCur5: f32 = (this.fSlow0 + (this.fRec5 * <f32>((unchecked(this.fVec31[<i32>(1)]) >= this.fSlow0))));
        let iRecCur6: i32 = (this.iSlow0 * (this.iRec6 + <i32>(1)));
        let fTemp1: f32 = <f32>(iRecCur6);
        let fRecCur3: f32 = ((this.fConst9 * this.fRec3) + (this.fConst10 * (<f32>(iRecCur4) * max<f32>((min<f32>((this.fConst4 * fRecCur5), max<f32>(((this.fConst5 * (this.fConst3 - fRecCur5)) + 1.0), 0.0)) * (1.0 - (this.fConst5 * fTemp1))), 0.0))));
        let fRecCur0: f32 = ((this.fSlow4 * this.fRec0) + (this.fSlow5 * (((this.fSlow9 * ((this.fSlow15 * ((this.fSlow13 * ((0.0416666679084301 * (unchecked(this.fVec1058[((this.fIOTA - this.iSlow2) & <i32>(8191))]) * this.fSlow10)) - (0.1666666716337204 * (this.fSlow11 * unchecked(this.fVec1058[((this.fIOTA - this.iSlow3) & <i32>(8191))]))))) + (0.25 * (this.fSlow12 * unchecked(this.fVec1058[((this.fIOTA - this.iSlow4) & <i32>(8191))]))))) - (0.1666666716337204 * (this.fSlow14 * unchecked(this.fVec1058[((this.fIOTA - this.iSlow5) & <i32>(8191))]))))) + (0.0416666679084301 * (this.fSlow16 * unchecked(this.fVec1058[((this.fIOTA - this.iSlow6) & <i32>(8191))])))) + fRecCur3)));
        let fRecCur1: f32 = fRecCur0;
        outputs[<i32>(0)] = <f32>((this.fSlow2 * (fRecCur1 * max<f32>((min<f32>((this.fConst6 * fRecCur5), 1.0) - (this.fConst7 * fTemp1)), 0.0))));
        this.fRec2 = fRecCur2;
        this.iRec4 = iRecCur4;
        unchecked(this.fVec31[<i32>(1)] = unchecked(this.fVec31[<i32>(0)]));
        this.fRec5 = fRecCur5;
        this.iRec6 = iRecCur6;
        this.fRec3 = fRecCur3;
        this.fRec0 = fRecCur0;
        this.fRec1 = fRecCur1;
        this.fIOTA = (this.fIOTA + <i32>(1));
    }
    compute(count: i32, inputs: Array<StaticArray<f32>>, outputs: Array<StaticArray<f32>>): void {
    }
}

export class Bassguitar extends MidiVoice {
    readonly dsp: BassguitarDsp = new BassguitarDsp();
    private fin: StaticArray<f32> = new StaticArray<f32>(0);
    private fout: StaticArray<f32> = new StaticArray<f32>(1);
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;

    constructor(channel: MidiChannel) {
        super(channel);
        this.dsp.init(<i32>SAMPLERATE);
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.dsp.fHslider1 = notefreq(note);
        this.dsp.fHslider2 = <f32>velocity / 127.0;
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

export function initializeMidiSynth(): void {
    midichannels[0] = new MidiChannel(10, (channel: MidiChannel) => new Bassguitar(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);
}

export function postprocess(): void {
}
