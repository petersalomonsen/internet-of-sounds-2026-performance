/*
 * Copyright (c) 2022-2026 Peter Johan Salomonsen ( petersalomonsen.com )
 * Licensed under CC BY-NC 4.0 — see LICENSE
 */

import { TriBandStereoCompressor, MidSideProcessor, DelayLineFloat, Noise, outputline, CustomExciterWaveGuide, Comb, MonoAudioPlayer, hardclip, AuxExciterWaveGuide, allocateAudioBuffer, LoPassBiQuadFilter, HiPassBiQuadFilter, noise, Freeverb, WaveGuide, AllPassFloat, beatToFrame, AudioPlayer, cos, outputline, Limiter, TriangleOscillator, PI, sin, cos, FFT, EQBand, TriBandEQ, EnvelopeState, Pan, SineOscillator, IFFTOscillator, BiQuadFilter, FilterType, Q_BUTTERWORTH, BandPass,SawOscillator,softclip, midichannels, MidiChannel, MidiVoice, StereoSignal, SineOscillator, Envelope } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';
import { MasterMe } from '../faust/dsp/master_me';

const BPM: f32 = 92;
function notefreq(note: f32): f32 {
	return 440 * Mathf.pow(2, (-69 + note) / 12);
}

export class DelayLine {
    readonly bufferPointer: usize;
    index: usize = 0;
    length: usize = 0;
    currentPeak: f32 = 0;
    currentPeakSamplesToLive: usize = 0;

    private numsamplesf64: f64 = 0
    private meanSquared: f64 = 0;

    constructor(private numsamples: usize) {
        this.numsamplesf64 = numsamples as f64;
        this.length = numsamples * 4 as usize;
        this.bufferPointer = __new(this.length, 0);
    }

    read(): f32 {
        return load<f32>(this.bufferPointer + this.index);
    }

    calculateRMS(): f32 {
        let ndx = this.index;
        let bufferPointer = this.bufferPointer;

        let leastrecentsample: f64 = load<f32>(bufferPointer + ndx) as f64;
        if (ndx === 0) {
            ndx = this.length;
        }
        ndx -= 4;
        let mostrecentsample: f64 = load<f32>(bufferPointer + ndx) as f64;

        let meanSquared: f64 = this.meanSquared;
        let numSamples: f64 = this.numsamplesf64;
        meanSquared += ((mostrecentsample * mostrecentsample) / numSamples);
        meanSquared -= ((leastrecentsample * leastrecentsample) / numSamples);
        this.meanSquared = meanSquared;

        return Math.sqrt(meanSquared) as f32;
    }

    getPeakValue(): f32 {
        let ndx = this.index;
        if (ndx === 0) {
            ndx = this.length;
        }
        ndx -= 4;
        let mostrecentsample: f32 = load<f32>(this.bufferPointer + ndx) as f32;
        if (mostrecentsample < 0) {
            mostrecentsample = -mostrecentsample;
        }
        if (mostrecentsample > this.currentPeak) {
            this.currentPeak = mostrecentsample;
            this.currentPeakSamplesToLive = this.numsamples;
        } else if (this.currentPeakSamplesToLive > 0) {
            this.currentPeakSamplesToLive--;
            if (this.currentPeakSamplesToLive === 0) {
                this.currentPeak = this.calculatePeakValue();
            }
        }
        return this.currentPeak;
    }

    private calculatePeakValue(): f32 {
        let peak: f32 = 0.0;
        for (let i: usize = 0; i < this.length; i += 4) {
            let value = load<f32>(this.bufferPointer + i);
            if (value < 0) {
              value = -value;
            }
            if (value > peak) {
                peak = value;
            }
        }
        return peak;
    }

    write_and_advance(value: f32): void {
        store<f32>(this.bufferPointer + this.index, value);

        if (this.index === this.length - 4) {
            this.index = 0;
        } else {
            this.index += 4;
        }
    }
}

export class MonoCompressor {
    delay: DelayLine;

    gain: f64 = 1.0;
    targetgain: f64 = 1.0;
    gainChangePerSample: f64 = 0;
    delaybuffersamplecount: f64;

    constructor(numsamples: usize) {
        this.delaybuffersamplecount = numsamples as f64;
        this.delay = new DelayLine(numsamples);
    }

    process(signal: f32, threshold: f32, makeupgain: f32): f32 {
        this.delay.write_and_advance(signal);

        let currentTargetGain: f64 = this.targetgain;
        let currentGain: f64 = this.gain;

        let peak: f64 = this.delay.getPeakValue();

        if(peak > threshold) {
            let targetGain = threshold / peak;

            if(targetGain < currentTargetGain) {
              currentTargetGain = targetGain;
              this.targetgain = targetGain;

              let newGainChangePerSample = (currentTargetGain - currentGain) / this.delaybuffersamplecount;
        
              if(newGainChangePerSample < this.gainChangePerSample) {
                  this.gainChangePerSample = newGainChangePerSample;
              }
            }   
        } else if(currentTargetGain < 1.0) {
            currentTargetGain = 1.0;
            this.targetgain = currentTargetGain;            
            this.gainChangePerSample = (currentTargetGain - currentGain) / this.delaybuffersamplecount;
        }

        let gainChangePerSample: f64 = this.gainChangePerSample;
        if((gainChangePerSample < 0 && currentTargetGain < currentGain) ||
            (gainChangePerSample > 0 && currentTargetGain > currentGain)) {
            currentGain += gainChangePerSample;
            this.gain = currentGain;
        }

        return this.delay.read() * currentGain as f32 * makeupgain;
    }
}

export class StereoCompressor {
    leftCompressor: MonoCompressor;
    rightCompressor: MonoCompressor;

    resultSignal: StereoSignal = new StereoSignal();
    
    constructor(numsamples: usize) {
        this.leftCompressor = new MonoCompressor(numsamples);
        this.rightCompressor = new MonoCompressor(numsamples);
    }

    process(left: f32, right: f32, threshold: f32, makeupgain: f32): void {
        this.resultSignal.left = this.leftCompressor.process(left, threshold, makeupgain);
      	this.resultSignal.right = this.rightCompressor.process(right, threshold, makeupgain);        
    }
}


class XorshiftPRNG {
  private state: Uint32Array;

  constructor(seed: u32) {
    this.state = new Uint32Array(2);
    this.init(seed);
  }

  init(seed: u32): void {
    this.state[0] = seed;
    this.state[1] = 0x9e3779b9;
  }

  t(): u32 {
    let t = this.state[0] + this.state[1];
    this.state[0] = this.state[1];
    this.state[1] = t;
    t ^= t << 23;
    t ^= t >> 17;
    t ^= this.state[0];
    t ^= this.state[0] >> 26;
    return t;
  }

  random(): f32 {   
    return ((this.t() / Math.pow(2, 32)) - 0.5) as f32;
  }
}

let seed = 1;
class MultiXorshiftPRNG {
  prngs: StaticArray<XorshiftPRNG> = new StaticArray<XorshiftPRNG>(8);
  
  constructor() {
    for (let n=0;n<this.prngs.length;n++) {
      this.prngs[n] = new XorshiftPRNG(seed);
      seed ++;
    }
  }
  random(): f32 {
    let t: u32;
    t = this.prngs[0].t();
    for (let n=1;n<this.prngs.length;n++) {
      t ^= this.prngs[n].t();
    }
    return ((t  / Math.pow(2, 32)) - 0.5) as f32;  	
  }
}


const delayframes = (SAMPLERATE * (6/8) * 60 / BPM) as usize;
const echoLeft = new DelayLine(delayframes);
const echoRight = new DelayLine(delayframes);
const echoline = new StereoSignal();

class MultiBandEQ {
  	bands: StaticArray<EQBand>;
  
    constructor(freqs: f32[]) {
        this.bands = new StaticArray<EQBand>(freqs.length - 1);
      	for ( let n=1; n<freqs.length; n++) {
          this.bands[n-1] = new EQBand(freqs[n-1], freqs[n]);
        }
    }


    process(signal: f32, levels: f32[]): f32 {
        let ret: f32 = 0;
      	for (let n = 0;n<this.bands.length; n++) {
          ret += this.bands[n].process(signal) * levels[n];
        }
      	return ret;
    }
}

export class WaveGuideFeedbackLimit {
    envExciter: Envelope;
    filterExciter: BiQuadFilter = new BiQuadFilter();
    delay: DelayLineFloat = new DelayLineFloat((SAMPLERATE / notefreq(1)) as i32);
    filterFeedback: BiQuadFilter = new BiQuadFilter();
    feedbackLevel: f32;
    feedbackFilterFreq: f32;
    freq: f32;
    exciterenvlevel: f32;

    constructor(exciterAttack: f32, exciterRelease: f32, exciterFilterFreq: f32, feedbackLevel: f32) {
        this.envExciter = new Envelope(exciterAttack,
            exciterRelease, 0,
            exciterRelease);
        this.filterExciter.update_coeffecients(FilterType.LowPass, SAMPLERATE,
            exciterFilterFreq, Q_BUTTERWORTH);

        this.feedbackLevel = feedbackLevel;
    }

    setFilterExciterFreq(freq: f32): void {
        this.filterExciter.update_coeffecients(FilterType.LowPass, SAMPLERATE,
            freq, Q_BUTTERWORTH);

    }

    start(freq: f32, feedbackFilterFreq: f32): void {
        if (freq != this.freq) {
            this.freq = freq;
            const maxFeedbackFilterFreq: f32 = 20000;
            if (feedbackFilterFreq > maxFeedbackFilterFreq as f32) {
                feedbackFilterFreq = maxFeedbackFilterFreq as f32;
            } else if (feedbackFilterFreq < 10) {
                feedbackFilterFreq = 10;
            }
            this.filterFeedback.update_coeffecients(FilterType.LowPass, SAMPLERATE,
                feedbackFilterFreq, Q_BUTTERWORTH);

            this.filterFeedback.coeffs.calculatePhaseAndMagnitudeForFreq(freq);
            const filterphase = this.filterFeedback.coeffs.phaseSamples;

            this.filterFeedback.clearBuffers();            
            this.filterExciter.clearBuffers();

            this.feedbackFilterFreq = feedbackFilterFreq;
            this.delay.setNumFramesAndClear(
                (SAMPLERATE /
                    (freq)
                ) - filterphase
            );
            this.envExciter.val = 0;

        }
        this.exciterenvlevel = 1;
        this.envExciter.attack();

    }

    process(): f32 {
        const envexciter = this.envExciter.next() * this.exciterenvlevel;
        let exciterSignal: f32 = noise() * envexciter;
        exciterSignal = this.filterExciter.process(exciterSignal);

        const feedback = this.delay.read();
        let signal = exciterSignal + feedback;

        signal = this.filterFeedback.processForm2(signal);
        this.delay.write_and_advance(
            Mathf.tanh(signal * this.feedbackLevel)
        );
        return signal;

    }
}

export class BandPassWaveGuide {
    envExciter: Envelope;
    filterExciter: BiQuadFilter = new BiQuadFilter();
    delay: DelayLineFloat = new DelayLineFloat((SAMPLERATE / notefreq(1)) as i32);
  	hipass: HiPassBiQuadFilter = new HiPassBiQuadFilter();
    filterFeedback: BiQuadFilter = new BiQuadFilter();
    feedbackLevel: f32;
    feedbackFilterFreq: f32;
    freq: f32;
    exciterenvlevel: f32;

    constructor(exciterAttack: f32, exciterRelease: f32, exciterFilterFreq: f32, feedbackLevel: f32) {
        this.envExciter = new Envelope(exciterAttack,
            exciterRelease, 0,
            exciterRelease);
        this.filterExciter.update_coeffecients(FilterType.LowPass, SAMPLERATE,
            exciterFilterFreq, Q_BUTTERWORTH);

        this.feedbackLevel = feedbackLevel;
    }

    setFilterExciterFreq(freq: f32): void {
        this.filterExciter.update_coeffecients(FilterType.LowPass, SAMPLERATE,
            freq, Q_BUTTERWORTH);

    }

    start(freq: f32, feedbackFilterFreq: f32): void {
      	freq*=1.6;
        if (freq != this.freq) {
            this.freq = freq;
            const maxFeedbackFilterFreq: f32 = 20000;
            if (feedbackFilterFreq > maxFeedbackFilterFreq as f32) {
                feedbackFilterFreq = maxFeedbackFilterFreq as f32;
            } else if (feedbackFilterFreq < 10) {
                feedbackFilterFreq = 10;
            }
            this.filterFeedback.update_coeffecients(FilterType.LowPass, SAMPLERATE,
                feedbackFilterFreq, Q_BUTTERWORTH);

          	this.hipass.update(freq * 0.5 , 0.93);
          	this.hipass.coeffs.calculatePhaseAndMagnitudeForFreq(freq);
            this.filterFeedback.coeffs.calculatePhaseAndMagnitudeForFreq(freq);
            const filterphase = this.filterFeedback.coeffs.phaseSamples +
                  					this.hipass.coeffs.phaseSamples;

          	this.hipass.clearBuffers();
            this.filterFeedback.clearBuffers();            
            this.filterExciter.clearBuffers();
			
            this.feedbackFilterFreq = feedbackFilterFreq;
            this.delay.setNumFramesAndClear(
                (SAMPLERATE /
                    (freq)
                ) - filterphase
            );
            this.envExciter.val = 0;

        }
        this.exciterenvlevel = 1;
        this.envExciter.attack();

    }

    process(): f32 {
        const envexciter = this.envExciter.next() * this.exciterenvlevel;
        let exciterSignal: f32 = noise() * envexciter;
        exciterSignal = this.filterExciter.process(exciterSignal);

        const feedback = this.delay.read();
        let signal = exciterSignal + feedback;

        signal = this.filterFeedback.processForm2(signal);
      	signal = this.hipass.process(signal);

        this.delay.write_and_advance(
            Mathf.tanh(signal * this.feedbackLevel)
        );
        return signal;

    }
}

export class PianoExciterWaveGuide extends WaveGuide {
    filterExciter: BiQuadFilter = new BiQuadFilter();
  	noise: MultiXorshiftPRNG = new MultiXorshiftPRNG();
	t: f32;	
  	vel: f32;
  	attenuation: f32;

  	allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(75);
  	
 	freq:f32;
  	delaysize: f32;
  
    constructor() {
      super(0.0001,0.01,2000,0.01);

      this.filterFeedback.update_coeffecients(FilterType.HighPass, SAMPLERATE,
            100, Q_BUTTERWORTH);  
      
      const delayfreq: f32 = 650;
      const delaysize: f32 = SAMPLERATE / delayfreq;                         
      
      for(var n=0;n<this.allpasses.length;n++) {
          this.allpasses[n] = new AllPassFloat();
          this.allpasses[n].setDelta(delaysize);
      }

      this.delaysize = delaysize;

    }

    start2(lo: f32,notefreq: f32, stopped: boolean): void {
      this.t = 0.0005;
	  this.vel = lo;
            
      
      this.delay.setNumFramesAndClear(this.delaysize); 
      this.filterFeedback.clearBuffers();
      this.filterExciter.clearBuffers();

     const filterbasefreq: f32 = (2500 + Mathf.pow(notefreq , 0.8)) * this.vel;
     this.attenuation = 1 / Mathf.log2(notefreq);
     this.filterExciter.update_coeffecients(FilterType.LowPass, SAMPLERATE,
              filterbasefreq, Q_BUTTERWORTH);

      this.feedbackLevel = 1.0;
        
      this.freq = notefreq;
      
      for(var n=0;n<this.allpasses.length;n++) {
        this.allpasses[n].clearBuffers();
      }
      for (let n=0;n<((SAMPLERATE * 0.02) as i32); n++) {
	      this.process();
      }


    }

    process(): f32 {
      this.t += 0.02/ SAMPLERATE;
      let signal = this.noise.random() / Mathf.pow(this.t,1.8);
      signal = this.filterExciter.process(signal);
      signal*= this.attenuation;

      let feedback = this.delay.read();
      signal+=this.filterFeedback.process(feedback);

      for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);

      this.delay.write_and_advance(
        signal * this.feedbackLevel
      );

      this.feedbackLevel *= 0.9999;
      return signal;      
    }
}


const trt = Math.pow(2.0,1.0/12.0); // 12th root of 2
const logb = (b: f64,x: f64): f64 => Math.log(x) / Math.log(b); // log-base-b of x
const Ikey = (f0: f64): f64 => logb(trt,f0*trt/27.5);
       
class PianoWaveGuide extends WaveGuide {
  exciterWaveGuide: PianoExciterWaveGuide = new PianoExciterWaveGuide();
	
  dispersionmodindex: f64 = 0.0;
  dispersiondelta: f32;
    allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(5);
  level: f32;
  notefreq: f32;
  stopped: boolean = false;
  
  constructor() {
    super(0.0001,0.06,100,0.2);
    for(let n=0;n<this.allpasses.length;n++) {
            this.allpasses[n] = new AllPassFloat();
      }
  }
  
  start2(note: f32, velocity: u8): void {
    const velocitylevel = (velocity as f32 / 127);
    const freq: f32 = notefreq(note);
    this.notefreq = freq;
    this.exciterWaveGuide.start2(velocitylevel , freq, this.stopped);
    
    
    if (this.stopped || freq != this.freq) {
      let feedbackFilterFreq: f32 = 18000; 
      this.filterFeedback.update_coeffecients(FilterType.LowPass, SAMPLERATE, feedbackFilterFreq, Q_BUTTERWORTH);
      this.filterFeedback.coeffs.calculatePhaseAndMagnitudeForFreq(freq);
      const delaysize: f32 = (SAMPLERATE /
         (freq)
        ) 
        - this.filterFeedback.coeffs.phaseSamples;


         const B = 0.00003;
         const M = this.allpasses.length;
         const f0: f64 = freq;

         const Bc = Math.max(B,0.000001);
         const k1 = -0.00179;
         const k2 = -0.0233;
         const k3 = -2.93;
         const m1 = 0.0126;
         const m2 = 0.0606;
         const m3 = -0.00825;
         const m4 = 1.97;
         const wT = 2*Math.PI*f0/SAMPLERATE;
         const kd = Math.exp(k1*Math.log(Bc)*Math.log(Bc) + k2*Math.log(Bc)+k3);
         const Cd = Math.exp((m1*Math.log(M)+m2)*Math.log(Bc)+m3*Math.log(M)+m4);

         const polydel = (a: f64, wT: f64): f64 => Math.atan(Math.sin(wT)/(a+Math.cos(wT)))/wT;
         const D = Math.exp(Cd - Ikey(f0)*kd);
         const a1 = (1-D)/(1+D); // By Eq. 3, have D >= 0, hence a1 >= 0 also       

        const Df0 = polydel(a1, wT) - polydel(1.0/a1, wT);

        const dispersion: f32 = Df0 as f32;

        for(let n=0;n<this.allpasses.length;n++) {
            this.allpasses[n].clearBuffers();     
            this.allpasses[n].setDelta(dispersion);       
        }
        this.filterFeedback.clearBuffers();
        this.delay.setNumFramesAndClear(delaysize - (dispersion * (M as f32)));
      

      let feedbacklevel: f32 = Mathf.pow(0.20/ this.filterFeedback.coeffs.magnitude, 1.01 / freq);
      
      this.feedbackLevel = feedbacklevel;
      this.freq = freq;
      this.stopped = false;
	}
    
  }
  
  process2(env: f32): f32 {
    let exciterSignal: f32 = this.exciterWaveGuide.process();

    let feedback = this.delay.read();
	let signal = exciterSignal;
    signal+=this.filterFeedback.process(feedback);
    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    
    signal *= env;
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    return signal;
  }
}

class Piano extends MidiVoice {
    env: Envelope = new Envelope(0.001, 1.0, 1.0, 3.0);

  	waveguide1: PianoWaveGuide = new PianoWaveGuide();
  	waveguide2: PianoWaveGuide = new PianoWaveGuide();
 
    noteon(note: u8, velocity: u8): void {
      super.noteon(note, velocity);
     
      this.waveguide1.start2(note as f32 , velocity);
	  this.waveguide2.start2(note as f32 , velocity);

      this.env.attack();   
    }

    noteoff(): void {
      	this.env.release();
    }

    isDone(): boolean {
      
      const isDone =  this.env.isDone();      
      if (isDone) {
        this.waveguide1.stopped = true;
      	this.waveguide2.stopped = true;
      	
      }
      return isDone;
    }

    nextframe(): void {
        let env = this.env.next();

      	const wg1: f32 = this.waveguide1.process2(env);
      	const wg2: f32 = this.waveguide2.process2(env);
		      	
       	this.channel.signal.add(wg1, wg2);
    }
}

const numpianofilters = 42;
const feedback: f32 = 0.21;
const dampening: f32 = 0.4;

class PianoChannel extends MidiChannel {
  allpassesLeft: StaticArray<Comb> = new StaticArray<Comb>(numpianofilters);  	
  allpassesRight: StaticArray<Comb> = new StaticArray<Comb>(numpianofilters);  

  constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
    super(numvoices, factoryFunc);

    
    let combsize: usize = 1 as usize;
  	for(let n=0;n<this.allpassesLeft.length;n++) {
      	
        this.allpassesLeft[n] = new Comb(combsize);
      	this.allpassesLeft[n].set_feedback(feedback);
      	this.allpassesLeft[n].set_dampening(dampening);
        this.allpassesRight[n] = new Comb(combsize);
      	this.allpassesRight[n].set_feedback(feedback);
      	this.allpassesRight[n].set_dampening(dampening);

    }
  }

  preprocess(): void {
    const in_gain: f32 = 1 * Mathf.pow(10.0, -0);
    let left = this.signal.left * in_gain;
    let right = this.signal.right * in_gain;    

    
    const spread: f32 = 0.001;
    for (let n=0;n<this.allpassesLeft.length;n++) {
      left += this.allpassesLeft[n].tick(left * (1.0-spread) + right * spread);
      left *= (1-feedback);
      right += this.allpassesRight[n].tick(right * (1.0-spread) + left * spread);
      right *= (1-feedback);
    }
    const combgain: f32 =  0.5 * Mathf.pow(10.0, -15);
    
    this.signal.left = left * combgain;
    this.signal.right = right * combgain;
  }
}

class String extends MidiVoice {
    env: Envelope = new Envelope(0.001, 1, 0.9, 0.3);
  	waveguide1: WaveGuide = new WaveGuide(0.01, 20.0, 610, 0.995);
  	waveguide2: WaveGuide = new WaveGuide(0.01, 20.0, 620, 0.995);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 4000 / Mathf.pow(note, 1.3) );
      	this.waveguide2.start(freq, freq * 4000 / Mathf.pow(note, 1.3) );
      	this.env.attack();   
    
    }

    noteoff(): void {
       this.env.release();
       this.waveguide1.envExciter.releaseStep = 0.05;
       this.waveguide2.envExciter.releaseStep = 0.05;
       this.waveguide1.envExciter.release();
       this.waveguide2.envExciter.release();
    }

    isDone(): boolean {
      return this.env.isDone() &&
        	this.waveguide1.envExciter.isDone() &&
       		this.waveguide2.envExciter.isDone();
    }

    nextframe(): void {
        const env:f32 = this.env.next() * this.velocity * 0.01;
      	const left = 
          		this.waveguide1.process()              	
        	* env;
      	const right = 
          		this.waveguide2.process()              	
        	* env;
      	this.channel.signal.add(
          left, right
        );
        
    }
}

class Brass extends MidiVoice {
    env: Envelope = new Envelope(0.01, 1.0, 1.0, 0.1);
  	waveguide1: WaveGuide = new WaveGuide(0.02, 0.15, 1000, 0.99999);  	
  	waveguide2: WaveGuide = new WaveGuide(0.03, 0.2, 5000, 1.0);  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 10);
      	this.waveguide2.start(freq, freq * 8);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next();
      	let signal = (
          		this.waveguide1.process()  +
          		this.waveguide2.process()
              )
        	* env * this.velocity / 127 as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

class Guitar extends MidiVoice {
    env: Envelope = new Envelope(0.002, 1, 1.0, 0.2);
  	waveguide1: WaveGuide = new WaveGuide(0.002, 0.03, 2000, 0.997);
  	waveguide2: WaveGuide = new WaveGuide(0.002, 0.03, 2000, 0.997);
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq * 1.001, freq * 4400 / Mathf.pow(note, 1.28) );
      	this.waveguide2.start(freq * 0.999, freq * 4400 / Mathf.pow(note, 1.28) );
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next();
      	const signal = ((
          		this.waveguide1.process()              	
              )
        	* env * this.velocity * 0.04) as f32;
      	const signal2 = ((
          		this.waveguide2.process()              	
              )
        	* env * this.velocity * 0.04) as f32;
       	this.channel.signal.add(
          signal, signal2
        );
        
    }
}

class GuitarChannel extends MidiChannel {
  
  bandpassleft: BandPass = new BandPass(150,3600);
  bandpassright: BandPass = new BandPass(150,3600);
  feedbackleft: f32 = 0;
  feedbackright: f32 = 0;

  preprocess(): void {
    let left = this.signal.left;
    let right = this.signal.right;
    const feedbackleft = this.feedbackleft;
    const feedbackright = this.feedbackleft;
    
    left = softclip(left * 0.8);
    right = softclip(right * 0.8);
    this.feedbackleft += this.bandpassleft.process(left * 1.5);
    this.feedbackright += this.bandpassright.process(right * 1.5);
	left += feedbackleft;
    left *= 0.6;
    right += feedbackright;
    right *= 0.6;
    echoline.left += (left) * this.volume * 1.4;
    echoline.right += (right) * this.volume * 1.4;
    this.signal.left = left;
    this.signal.right = right;
  }
}


class Bass extends MidiVoice {
    env: Envelope = new Envelope(0.001, 1, 1.0, 0.1);
  	waveguide1: WaveGuide = new WaveGuide(0.001, 0.01, 200, 0.999);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 8000 / Mathf.pow(note, 1.7));
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next();
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity * 0.25 as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

class TubeLead extends MidiVoice {
    env: Envelope = new Envelope(0.05, 1, 1.0, 0.1);
  	waveguide1: WaveGuideFeedbackLimit = new WaveGuideFeedbackLimit(0.001, 0.01,200, -1.12);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, 230 * Mathf.pow(freq, 0.36 ));
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.02;
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}


class FluteChannel extends MidiChannel {
  preprocess(): void {
    let signal = this.signal.left;
    
    echoline.left += (signal) * this.volume;
    echoline.right += (signal) * this.volume;
  }
}


class Flute extends MidiVoice {
    env: Envelope = new Envelope(0.05, 1, 1.0, 0.01);
  	waveguide1: BandPassWaveGuide = new BandPassWaveGuide(0.001, 0.01,150, -1.1);
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, 80 * Mathf.pow(freq, 0.5 ));
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.01;
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

class HihatGuide extends WaveGuide {
  allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(3);
  constructor(attack: f32, decay: f32, feedbackfreq: f32, feedback: f32) {
    super(attack, decay, feedbackfreq, feedback);
  	for(var n=0;n<this.allpasses.length;n++) {
    	this.allpasses[n] = new AllPassFloat();
      	this.allpasses[n].setDelta(5);
    }
  }
  
  process(): f32 {
    const envexciter = this.envExciter.next() * this.exciterenvlevel;
    let exciterSignal: f32 = noise() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();
    let signal = exciterSignal + feedback;

    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    signal = this.filterFeedback.processForm2(signal);
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    return signal;

  }
}

class Hihat extends MidiVoice {
    env: Envelope = new Envelope(0.0001, 1, 1.0, 0.2);
  	waveguide1: HihatGuide = new HihatGuide(0.012, 0.06, 20000, 0.6);
  	waveguide2: HihatGuide = new HihatGuide(0.012, 0.06, 20000, 0.6);

  	constructor(channel: MidiChannel) {
       super(channel);
      this.minnote = 66;
      this.maxnote = 66;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq: f32 = 7200;
      	this.waveguide1.start(freq, 20000);
      	this.waveguide2.start(freq, 20000);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.04 * this.velocity / 30;;
      	let left = (
          		this.waveguide1.process()              	
              )
        	* env as f32;
        let right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
      
      	this.channel.signal.add(
          left, right
        );
        
    }
}

class OpenHihat extends MidiVoice {
    env: Envelope = new Envelope(0.0001, 1, 1.0, 0.2);
  	waveguide1: HihatGuide = new HihatGuide(0.001, 0.5, 20000, 0.85);
  	waveguide2: HihatGuide = new HihatGuide(0.001, 0.5, 20000, 0.85);

  	constructor(channel: MidiChannel) {
       super(channel);
      this.minnote = 68;
      this.maxnote = 68;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);

      	const freq: f32 = 7200;
      	this.waveguide1.start(freq, 20000);
      	this.waveguide2.start(freq, 20000);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.03 * this.velocity / 30;
      	let left = (
          		this.waveguide1.process()              	
              )
        	* env as f32;
        let right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
      
      	this.channel.signal.add(
          left, right
        );
        
    }
}

class KickGuide extends WaveGuide {
  allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(4);
  constructor(attack: f32, decay: f32, feedbackfreq: f32, feedback: f32) {
    super(attack, decay, feedbackfreq, feedback);
  	for(var n=0;n<this.allpasses.length;n++) {
    	this.allpasses[n] = new AllPassFloat();
      	this.allpasses[n].setDelta(20);
    }
  }
  
  start(freq:f32, filterfreq: f32):void {
  	super.start(freq,filterfreq);
    //this.filterExciter.clearBuffers();
    //this.filterFeedback.clearBuffers();
    for(var n=0;n<this.allpasses.length;n++) {
      	//this.allpasses[n].clearBuffers();
    }
  }
  
  process(): f32 {
    const envexciter = this.envExciter.next() * this.exciterenvlevel;
    let exciterSignal: f32 = noise() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();
    let signal = exciterSignal + feedback;

    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    signal = this.filterFeedback.processForm2(signal);
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    return signal;


  }
}

class Kick2 extends MidiVoice {
    env: Envelope = new Envelope(0.0001, 1, 1.0, 0.3);
  	waveguide1: KickGuide = new KickGuide(0.001, 0.08, 140, 0.3);
  	waveguide2: KickGuide = new KickGuide(0.001, 0.08, 140, 0.3);
  	chasingvelocity: f32 = 0;

  	constructor(channel: MidiChannel) {
       super(channel);
      this.minnote = 60;
      this.maxnote = 60;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq: f32 = 1000;
      	this.waveguide1.start(freq * 1.0001, 600);
      	this.waveguide2.start(freq * 0.9999, 600);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.18 * this.chasingvelocity;
      	this.chasingvelocity += (this.velocity - this.chasingvelocity) * 0.01;
      	const left = (
          		this.waveguide1.process()              	
              )
        	* env  as f32;
      	const right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
       	this.channel.signal.add(
          left, right
        );
        
    }
}

class SnareGuide extends WaveGuide {
  allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(6);
  constructor(attack: f32, decay: f32, feedbackfreq: f32, feedback: f32) {
    super(attack, decay, feedbackfreq, feedback);
  	for(var n=0;n<this.allpasses.length;n++) {
    	this.allpasses[n] = new AllPassFloat();
      	this.allpasses[n].setDelta(15);
    }
  }
  
  process(): f32 {
    const envexciter = this.envExciter.next() * this.exciterenvlevel;
    let exciterSignal: f32 = noise() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();
    let signal = exciterSignal + feedback;

    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    signal = this.filterFeedback.processForm2(signal);
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    return signal;


  }
}
class Snare2 extends MidiVoice {
    env: Envelope = new Envelope(0.005, 0.5, 0.1, 0.3);
  	waveguide1: SnareGuide = new SnareGuide(0.005, 0.2, 10000, 0.8);
  	waveguide2: SnareGuide = new SnareGuide(0.005, 0.2, 10000, 0.8);

    constructor(channel: MidiChannel) {
       super(channel);
      this.minnote = 62;
      this.maxnote = 62;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq: f32 = 1400;
      	this.waveguide1.start(freq, 1660);
      	this.waveguide2.start(freq, 1660);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 1.25 * this.velocity as f32 / 127 as f32;
      	let left = (
          		this.waveguide1.process()              	
              )
        	* env as f32;
      	let right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
       	this.channel.signal.add(
          left, right
        );
    }
}

class CymbalGuide extends WaveGuide {
  allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(6);
  hipass: HiPassBiQuadFilter = new HiPassBiQuadFilter();
  constructor(attack: f32, decay: f32, feedbackfreq: f32, feedback: f32) {
    super(attack, decay, feedbackfreq, feedback);
  	for(var n=0;n<this.allpasses.length;n++) {
    	this.allpasses[n] = new AllPassFloat();
      	this.allpasses[n].setDelta(11);
    }
    this.hipass.update_coeffecients(FilterType.HighPass, SAMPLERATE,
                          1200, Q_BUTTERWORTH);
  }
  
  process(): f32 {
    const envexciter = this.envExciter.next() * this.exciterenvlevel;
    let exciterSignal: f32 = noise() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();
    let signal = exciterSignal + feedback;

    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    signal = this.filterFeedback.processForm2(signal);
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    signal = this.hipass.process(signal);
    return signal * 0.00027;
  }
}

class Cymbal extends MidiVoice {
    env: Envelope = new Envelope(0.0001, 3.0, 1.0, 3.0);
  	waveguide1: CymbalGuide = new CymbalGuide(0.001, 0.15, 20000, 0.999);
  	waveguide2: CymbalGuide = new CymbalGuide(0.001, 0.15, 20000, 0.999);
  	chasingvelocity: f32 = 0;

  	constructor(channel: MidiChannel, note: u8) {
       super(channel);
      this.minnote = note;
      this.maxnote = note;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq: f32 = SAMPLERATE / 2;
      	this.waveguide1.start(freq * 0.95, 20000);
      	this.waveguide2.start(freq * 1.05, 20000);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.3 * this.chasingvelocity;
      	this.chasingvelocity += 0.01 * (this.velocity-this.chasingvelocity);
      	const left = (
          		this.waveguide1.process()              	
              )
        	* env  as f32;
      	const right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
       	this.channel.signal.add(
          left, right
        );
        
    }
}
class TomGuide extends WaveGuide {
  allpasses: StaticArray<AllPassFloat> = new StaticArray<AllPassFloat>(6);
  hipass: HiPassBiQuadFilter = new HiPassBiQuadFilter();
  constructor(attack: f32, decay: f32, feedbackfreq: f32, feedback: f32) {
    super(attack, decay, feedbackfreq, feedback);
  	for(var n=0;n<this.allpasses.length;n++) {
    	this.allpasses[n] = new AllPassFloat();
      	this.allpasses[n].setDelta(20000);
    }
    this.hipass.update_coeffecients(FilterType.HighPass, SAMPLERATE,
                          300, Q_BUTTERWORTH);
  }
  
  start(notefreq: f32, filterfreq: f32): void {
  	super.start(notefreq,filterfreq);
    for(let n=0;n<this.allpasses.length;n++)
      this.allpasses[n].clearBuffers();
    this.hipass.clearBuffers();
  }

  process(): f32 {
    const envexciter = this.envExciter.next() * this.exciterenvlevel;
    let exciterSignal: f32 = noise() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();
    let signal = exciterSignal + feedback;

    for(let n=0;n<this.allpasses.length;n++) signal = this.allpasses[n].process(signal);
    signal = this.filterFeedback.processForm2(signal);
    this.delay.write_and_advance(
      signal * this.feedbackLevel
    );
    signal = this.hipass.process(signal);
    return signal * 0.020;


  }
}

class Tom extends MidiVoice {
    env: Envelope = new Envelope(0.0005, 1, 1.0, 0.2);
  	waveguide1: TomGuide = new TomGuide(0.002, 0.12, 1000, 0.998);
  	waveguide2: TomGuide = new TomGuide(0.002, 0.12, 1000, 0.998);
  	
  	constructor(channel: MidiChannel, note: u8) {
       super(channel);
      this.minnote = note;
      this.maxnote = note;
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq: f32 = 20000;
      	this.waveguide1.start(freq * 0.99, 1600 + ((this.minnote - 58 ) as f32 * 250));
      	this.waveguide2.start(freq * 1.01, 1600 + ((this.minnote - 58 ) as f32 * 250));
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      return this.env.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.5 * this.velocity;
      	const left = (
          		this.waveguide1.process()              	
              )
        	* env  as f32;
      	const right = (
          		this.waveguide2.process()              	
              )
        	* env as f32;
       	this.channel.signal.add(
          left, right
        );
        
        echoline.left += (left) * 0.9;
    	echoline.right += (right) * 0.9;
    
    }
}

class DrumChannel extends MidiChannel {  

  hipassl: BiQuadFilter = new BiQuadFilter();
  hipassr: BiQuadFilter = new BiQuadFilter();

  constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
    super(numvoices, factoryFunc);
  
  	this.hipassl.update_coeffecients(FilterType.HighPass, SAMPLERATE, 30, Q_BUTTERWORTH);
    this.hipassr.update_coeffecients(FilterType.HighPass, SAMPLERATE, 30, Q_BUTTERWORTH);
  }
  preprocess(): void {
    let left = this.signal.left;
    let right = this.signal.right;
    left = this.hipassl.process(left);
    right = this.hipassr.process(right);
    this.signal.left = left;
    this.signal.right = right;
    //echoline.left += (left) * this.volume;
    //echoline.right += (right) * this.volume;
    
  }
}

const fft: FFT = new FFT(11);
for (let n=1; n< (fft.buffer.length / 2) - 1; n+=1) {
  let v = Mathf.exp((-n as f32 ) * 0.2) * 1023 * cos((n * 5) as f32);  
  //fft.buffer[n].re = v;
  //fft.buffer[fft.buffer.length - n].re = -v;
  fft.buffer[n].im = -v;
  fft.buffer[fft.buffer.length - n].im = v;
}


fft.calculateInverse();

class PadSynth extends MidiVoice {
  	env: Envelope = new Envelope(0.001, 2.5, 0.00, 0.2);
  	t: f64 = 0;
  	freq: f32 = 0;

  	spread: i32 = 9;
  	
  	hprofile: StaticArray<f32> = new StaticArray<f32>(this.spread);
  	phase: StaticArray<f32> = new StaticArray<f32>(this.spread);
  	freqs: StaticArray<f32> = new StaticArray<f32>(this.spread);
  	
  	level: f32 = 1.0;
  
  	constructor(channel: MidiChannel) {
       super(channel);
       const halfspread: f32 = (this.spread / 2) as f32;
	   for(let n=0;n<this.spread;n++) {
         const v: f32 = 2 as f32 * (
           n as f32 - halfspread);
         this.hprofile[n] = Mathf.exp(v * -v);
         this.phase[n] = noise() * 0x800 as f32;
       }
    }
 
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	this.env.attack();
      	const halfspread: f32 = (this.spread / 2) as f32;
        for (let n = 0;n<this.freqs.length; n++) {
          	const v: f32 = 0.04 as f32 * (n as f32 - halfspread);
      		this.freqs[n] = notefreq((note + v));
        }
      	this.level = (velocity as f32 / 100.0) * (-(1/(notefreq(note)-200)) + 1) as f32;
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      const ret = this.env.isDone();      
      return ret;
    }

    nextframe(): void {
        const env = this.env.next() * this.level;
      	let left: f32 = 0;
      	let right: f32 = 0;
      	const t = this.t;
      	const freq = this.freq;
     	for(let n = 0;n < this.spread ; n++) {
          const f = this.freqs[n];
          const bufferpos = t * 0x800 * f + this.phase[n];
          const floorbufferpos = Math.floor(bufferpos);
          const delta = (bufferpos - floorbufferpos) as f32;
          const v1 =  fft.buffer[((bufferpos as i64) & 0x7ff) as i32].re;
                    
          const v = v1;
          const leftlevel: f32 = (((n) / 2) + 0.5) as f32;
          const rightlevel: f32 = (((this.hprofile.length - n) / 2) + 0.5) as f32;
          left += v* leftlevel;
          right += v* rightlevel;
        }

      	left *= env;
      	right *= env;

        this.t += 1 / SAMPLERATE;
       	this.channel.signal.add(
          left, right
        );
    }
}

class PadSynthChannel extends MidiChannel {
  lopassleft: BiQuadFilter = new BiQuadFilter();
  lopassright: BiQuadFilter = new BiQuadFilter();
  
  constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
    super(numvoices, factoryFunc);
  	this.lopassleft.update_coeffecients(FilterType.LowPass, SAMPLERATE,
                          4000, 0.3);
    this.lopassright.update_coeffecients(FilterType.LowPass, SAMPLERATE,
                          4000, 0.3);
  }

  preprocess(): void {
    let left = this.signal.left;
    let right = this.signal.right;
    
    const gain:f32 = 0.04;
    left*=gain;
    right*=gain;
    left = this.lopassleft.process(left);
    right = this.lopassright.process(right);

    //echoline.left += (left * 0.1);
    //echoline.right += (right * 0.1);
    this.signal.left = left;
    this.signal.right = right;
  }
}

class Choir extends MidiVoice {
    env: Envelope = new Envelope(0.05, 1, 1.0, 0.3);
  	waveguide1: CustomExciterWaveGuide = new CustomExciterWaveGuide();
  	waveguide2: CustomExciterWaveGuide = new CustomExciterWaveGuide();
  	exciterEnv: Envelope = new Envelope(0.15, 0.2, 0.6, 0.3);
  	saw: SawOscillator = new SawOscillator();
  	lopass: LoPassBiQuadFilter = new LoPassBiQuadFilter();
  
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
		this.saw.frequency = freq ;
      	this.waveguide1.feedbackLevel = -1;
      	this.waveguide2.feedbackLevel = -1;
      	this.waveguide1.start(freq, Mathf.log(freq * 0.01) * 2000);
      	this.waveguide2.start(freq * 2.0, Mathf.log(freq * 0.01) * 2000);

      	this.lopass.update(2500,0.6);
      	this.env.attack();   
        this.exciterEnv.attack();
    }

    noteoff(): void {
        this.env.release();
      	this.exciterEnv.release();
    }

    isDone(): boolean {
      return this.env.isDone() && this.exciterEnv.isDone();
    }

    nextframe(): void {
        const env = this.env.next() * 0.003;
      	const exciterSignal = this.lopass.process((noise()) * this.exciterEnv.next());
     	this.waveguide1.exciterSignal = exciterSignal;
	    this.waveguide2.exciterSignal = exciterSignal;

      	const signal1 = this.waveguide1.process(); 
        const signal2 = this.waveguide2.process();
              
		const left = (signal2 + signal1 * 0.4 ) * env * this.velocity as f32;
      	const right = (signal1 + signal2 * 0.4 ) * env * this.velocity as f32;
       	this.channel.signal.add(
          left, right
        );
        
    }
}

export function initializeMidiSynth(): void {
  midichannels[0] = new PianoChannel(10, (ch) => new Piano(ch)); 
  midichannels[0].controlchange(7, 82);
  midichannels[0].controlchange(10, 64);
  midichannels[0].controlchange(91,55);
  midichannels[1] = new MidiChannel(10, (ch) => new String(ch)); 
  midichannels[1].controlchange(7,60);
  midichannels[1].controlchange(10, 64);
  midichannels[1].controlchange(91, 40);
  midichannels[2] = new DrumChannel(9, (ch, ndx) => {
    switch(ndx) {
      case 1:
        return new Hihat(ch);
      case 2:
        return new Snare2(ch);
      case 3:
        return new OpenHihat(ch);
      case 4:
        return new Tom(ch, 65);
      case 5:
        return new Tom(ch, 67);
      case 6:
        return new Tom(ch, 69);
      case 7:
        return new Tom(ch, 71);
      case 8:
        return new Cymbal(ch, 73);
      default:
        return new Kick2(ch);
    }
  });
  midichannels[2].controlchange(7, 120);
  midichannels[2].controlchange(91, 20);
  midichannels[3] = new GuitarChannel(6, (ch) => new Guitar(ch)); 
  midichannels[3].controlchange(7, 33);
  midichannels[3].controlchange(10, 64);
  midichannels[3].controlchange(91, 40);
  midichannels[4] = new MidiChannel(2, (ch) => new Bass(ch)); 
  midichannels[4].controlchange(7, 90);
  midichannels[4].controlchange(10, 64);
  midichannels[4].controlchange(91, 20);
  midichannels[5] = new MidiChannel(1, (ch) => new TubeLead(ch)); 
  midichannels[5].controlchange(7, 32);
  midichannels[5].controlchange(10, 50);
  midichannels[5].controlchange(91, 40);
  midichannels[6] = new FluteChannel(1, (ch) => new Flute(ch)); 
  midichannels[6].controlchange(7, 65);
  midichannels[6].controlchange(10, 64);
  midichannels[6].controlchange(91, 57);
  midichannels[7] = new PadSynthChannel(15, (ch) => new PadSynth(ch)); 
  midichannels[7].controlchange(7, 70);
  midichannels[7].controlchange(10, 64);
  midichannels[7].controlchange(91, 60);
  midichannels[8] = new MidiChannel(5, (ch) => new Brass(ch)); 
  midichannels[8].controlchange(7, 40);
  midichannels[8].controlchange(10, 32);
  midichannels[8].controlchange(91, 40);
  midichannels[9] = new MidiChannel(10, (ch) => new Choir(ch)); 
  midichannels[9].controlchange(7, 50);
  midichannels[9].controlchange(10, 64);
  midichannels[9].controlchange(91, 70);
}

const eqfreqs: f32[] = [40,150,1200,24000]
const eqlevels: f32[] = [1.15,0.7,1.3];

const eqleft = new MultiBandEQ(eqfreqs);
const eqright = new MultiBandEQ(eqfreqs);

const compressor = new TriBandStereoCompressor(25,150,2000,20000, 0.05);
compressor.compressorLow.leftCompressor.setRelaseSampleCount((0.5 * SAMPLERATE) as usize);
compressor.compressorLow.rightCompressor.setRelaseSampleCount((0.5 * SAMPLERATE) as usize);

const limiter_left = new MonoCompressor((0.005 * SAMPLERATE) as usize);
const limiter_right = new MonoCompressor((0.005 * SAMPLERATE) as usize);

const midsideprocessor = new MidSideProcessor(1.5);

const liveMaster = new MasterMe();

export function postprocess(): void {
  const gain: f32 = 1.3;
  let left = outputline.left;
  let right = outputline.right;
  
  const echol = echoLeft.read() * 0.3;
  const echor = echoRight.read() * 0.3;

  echoLeft.write_and_advance(echol + echoline.left);
  echoRight.write_and_advance(echor + echoline.right);
  
  left+=echol;
  right+=echor;
  
  left = eqleft.process(left, eqlevels);
  right = eqright.process(right, eqlevels);
  
  left*=gain;
  right*=gain;

  const COMPRESS_AND_STEREO_ENHANCE = false;
  if (COMPRESS_AND_STEREO_ENHANCE) {
    midsideprocessor.process(left,right);
    left = midsideprocessor.signal.left;
    right = midsideprocessor.signal.right;

    compressor.process(left, right, 0.8, 0.7, 1.0, 1.0, 1.0, 1.0);
    left = compressor.stereosignal.left;
    right = compressor.stereosignal.right;

    const master_gain: f32 = 1.0;
    left *= master_gain;
    right *= master_gain;

    const limiter_threshold: f32 = 0.99;
    left = limiter_left.process(left, limiter_threshold, 1.0);
    right = limiter_right.process(right, limiter_threshold, 1.0);
  }

  
  outputline.left = left;
  outputline.right = right;

  liveMaster.process(outputline.left, outputline.right);
  outputline.left = liveMaster.signal.left;
  outputline.right = liveMaster.signal.right;
  echoline.clear();
}
