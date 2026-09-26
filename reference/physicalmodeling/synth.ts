/*
* (c) Peter Johan Salomonsen 2020
*/

import { cos, outputline, FFT, EQBand, TriBandEQ, Pan, IFFTOscillator, BiQuadFilter, FilterType, Q_BUTTERWORTH, Noise, DelayLine, BandPass,SawOscillator,softclip, midichannels, MidiChannel, MidiVoice, StereoSignal, Freeverb, Envelope, notefreq } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';

export class AllPass {
  	coeff: f32;
  	previousinput: f32;
  	previousoutput: f32;
  
  	setDelta(delta: f32): void {
      this.coeff = (1 - delta) / (1 + delta);
    }
  
	process(input: f32): f32 {
      const output = this.coeff * (input                                     
                                   	- this.previousoutput)
                                  + this.previousinput;
      this.previousoutput = output;
      this.previousinput = input;
      return output;
    }
}

export class DelayLineFloat {
    buffer: StaticArray<f32>;
    frame: f64 = 0;
  	numframes: f64 = 1;
  	previous: f32;
  	allpass: AllPass = new AllPass();
  
    constructor(private buffersizeframes: i32) {        
        this.buffer = new StaticArray<f32>(buffersizeframes);
    }

    read(): f32 {        
      const index = this.frame as i32 % this.buffer.length;
      return this.allpass.process(this.buffer[index]);
      //return this.buffer[index];
    }
  	
  	setNumFramesAndClear(numframes: f64): void {
      this.numframes = Math.floor(numframes);
      this.allpass.setDelta ( (numframes - this.numframes) as f32 );
    }

    write_and_advance(value: f32): void {
	  //const index = Math.round((this.frame++) + this.numframes) as i32 % this.buffer.length;
      const index = ((this.frame++) + this.numframes) as i32 % this.buffer.length;

      this.buffer[index] = value;
    }
}



class OnePole { 
  a0: f32 = 1.0;
  b1: f32 = 0.0;
  z1: f32 = 0.0;
    	
  lopass(fc: f32): void {
      this.b1 = Mathf.exp(-2.0 * Mathf.PI * fc / SAMPLERATE);
      this.a0 = 1.0 - this.b1;
  }
  
  hipass(fc: f32): void {
      this.b1 = -Mathf.exp(-2.0 * Mathf.PI * (0.5 - (fc / SAMPLERATE)));
	  this.a0 = 1.0 + this.b1;
  }

  process(val: f32): f32 {
      this.z1 = val * this.a0 + this.z1 * this.b1;
      return this.z1;
  } 
}


class WaveGuide {
  exciter: Noise = new Noise();
  envExciter: Envelope;
  filterExciter: OnePole;
  delay: DelayLineFloat = new DelayLineFloat((SAMPLERATE / notefreq(1)) as i32);
  delay2: DelayLineFloat = new DelayLineFloat((SAMPLERATE / notefreq(1)) as i32);
  filterFeedback: OnePole;
  feedbackLevel: f32;
  feedbackFilterFreq: f32;

  constructor(exciterAttack: f32, exciterRelease: f32, exciterFilterFreq : f32, feedbackLevel: f32) {
    this.envExciter = new Envelope(exciterAttack,
                                   exciterRelease, 0,
                                   exciterRelease);
    this.filterExciter = new OnePole();
    this.filterFeedback = new OnePole();
    this.feedbackLevel = feedbackLevel;
    this.filterExciter.lopass(exciterFilterFreq);
  }

  start(freq: f32, feedbackFilterFreq: f32): void {
    const tmpDelay = this.delay;
    this.delay = this.delay2;
    this.delay2 = tmpDelay;

    this.filterFeedback.lopass(feedbackFilterFreq);
    this.feedbackFilterFreq = feedbackFilterFreq;
    this.delay.setNumFramesAndClear(
      (SAMPLERATE  /
       	(freq)
       )
      );
    this.envExciter.val = 0;
    this.envExciter.attack();
  }
  
  stop(): void {
    this.delay.setNumFramesAndClear(1);
    this.delay2.setNumFramesAndClear(1);
  }
 
  process(): f32 {
    const envexciter = this.envExciter.next();
    let exciterSignal = this.exciter.next() * envexciter;
    exciterSignal = this.filterExciter.process(exciterSignal);

    const feedback = this.delay.read();      	
    let signal = exciterSignal + feedback;

    signal = this.filterFeedback.process(signal);
    this.delay.write_and_advance(          
      signal * this.feedbackLevel
    );
    const delay2 = this.delay2.read();
    this.delay2.write_and_advance(delay2 * 0.9);
	return signal + delay2;
    
  }
}

class Piano extends MidiVoice {
    env: Envelope = new Envelope(0.01, 1, 1.0, 0.1);
  	waveguide1: WaveGuide = new WaveGuide(0.06, 0.25, 50, 0.9999);
  	waveguide2: WaveGuide = new WaveGuide(0.01, 0.1, 100, 0.999);
  	waveguide3: WaveGuide = new WaveGuide(0.02, 0.05,150, 0.99);
  
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 6000 / (Mathf.pow(note, 1.35) ));
      	this.waveguide2.start(freq , freq * 4000 / (Mathf.pow(note, 1.3) ));
      	this.waveguide3.start(freq , freq * 2000 / (Mathf.pow(note, 1.3) ));
      	
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      const ret = this.env.isDone();
      if(ret) {
        this.waveguide1.stop();
        this.waveguide2.stop();
        this.waveguide3.stop();
      }
      return ret;
    }

    nextframe(): void {
        const env = this.env.next();
      
      	const wg1: f32 = this.waveguide1.process();
		const wg2: f32 = this.waveguide2.process();
 		const wg3: f32 = this.waveguide3.process();
              
      	const velocity = env * this.velocity / 8;
       	this.channel.signal.add(
          (wg1 + wg2 * 0.8 + wg3) * velocity , 
          (wg1 + wg2 + wg3 * 0.8) * velocity
        );
        
    }
}

class String extends MidiVoice {
    env: Envelope = new Envelope(0.1, 1, 0.9, 0.3);
  	waveguide1: WaveGuide = new WaveGuide(0.2, 20.0, 100, 0.995);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 3500 / Mathf.pow(note, 1.3) );
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      const ret = this.env.isDone();
      if(ret) {
      	this.waveguide1.stop();
      }
      return ret;
    }

    nextframe(): void {
        const env = this.env.next();
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity / 8 as f32;
       	this.channel.signal.add(
          signal, signal
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
      const ret = this.env.isDone();
      if(ret) {
      	this.waveguide1.stop();
        this.waveguide2.stop();
      }
      return ret;
    }

    nextframe(): void {
        const env = this.env.next();
      	let signal = (
          		this.waveguide1.process()  +
          		this.waveguide2.process()
              )
        	* env * this.velocity / 24 as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

class Guitar extends MidiVoice {
    env: Envelope = new Envelope(0.02, 1, 1.0, 0.1);
  	waveguide1: WaveGuide = new WaveGuide(0.005, 0.01, 3000, 0.9999);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 3500 / Mathf.pow(note, 1.3) );
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      const ret = this.env.isDone();
      if(ret) {
      	this.waveguide1.stop();
      }
      return ret;
    }

    nextframe(): void {
        const env = this.env.next();
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity / 8 as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

class GuitarChannel extends MidiChannel {
  feedback: f32 = 0;
  bpfilter: BandPass = new BandPass(40, 8000);
  
  preprocess(): void {
    let signal = this.signal.left;
    const feedback = this.feedback;
               
    signal = softclip(signal * 0.2);
    this.feedback = this.bpfilter.process(feedback * 0.92 + signal);

    signal += feedback;    

    this.signal.left = signal;
    this.signal.right = signal;
  }
}


class Bass extends MidiVoice {
    env: Envelope = new Envelope(0.1, 1, 1.0, 0.1);
  	waveguide1: WaveGuide = new WaveGuide(0.04, 0.01, 300, 0.999999);
  	
  	
    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
      	const freq = notefreq(note);
      	this.waveguide1.start(freq, freq * 7);
      	this.env.attack();   
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
      const ret = this.env.isDone();
      if(ret) {
      	this.waveguide1.stop();
      }
      return ret;
    }

    nextframe(): void {
        const env = this.env.next();
      	const signal = (
          		this.waveguide1.process()              	
              )
        	* env * this.velocity / 2 as f32;
       	this.channel.signal.add(
          signal, signal
        );
        
    }
}

export class Hihat extends MidiVoice {
    vel: f32;

    readonly envelope: Envelope = new Envelope(0.0, 0.07, 0, 0.1);
    readonly noise: Noise = new Noise();

    readonly filter: BiQuadFilter = new BiQuadFilter();
    readonly signal: StereoSignal = new StereoSignal();


  	constructor(channel: MidiChannel) {
       super(channel);
       this.minnote = 66;
       this.maxnote = 66;
    }

    noteon(note: u8, velocity: u8):void {
        if(note > 1) {
            this.vel = (velocity as f32) / 32;
            this.envelope.attack();
        }
    }

  	noteoff(): void {
      this.envelope.release();
    }

  	isDone(): boolean {
      return this.envelope.isDone();
    }

    nextframe(): void {
        let env: f32 = this.envelope.next();

        let osc: f32 = this.noise.next();
        let signal: f32 = this.vel * <f32>1.2 * env * osc;

        this.filter.update_coeffecients(FilterType.HighPass, SAMPLERATE,
            10000 + 2000 * env, Q_BUTTERWORTH);

        signal = this.filter.process(signal);

        this.channel.signal.add(signal, signal);
    }
}

export class Kick2 extends MidiVoice {
    vel: f32;

    readonly noise: Noise = new Noise();

    readonly env2: Envelope = new Envelope(0.001, 0.01, 0.0, 0.01);
    readonly bp2: BandPass = new BandPass(4000, 5000);

    readonly env3: Envelope = new Envelope(0.001, 0.3, 0.0, 0.1);
    readonly bp3: BandPass = new BandPass(10, 100);

  	constructor(channel: MidiChannel) {
       super(channel);
       this.minnote = 60;
       this.maxnote = 60;
    }

    noteon(note: u8, velocity: u8): void {
      super.noteon(note, velocity);
      this.vel = (velocity as f32) / 40;
      this.env2.attack();
      this.env3.attack();
    }

  	noteoff(): void {
        this.env2.release();
        this.env3.release();
    }

	isDone(): boolean {
        return this.env3.isDone();
    }

    nextframe(): void {
        let env2: f32 = this.env2.next();
        let env3: f32 = this.env3.next();

        const osc: f32 = this.noise.next();

      	this.bp3.update_frequencies(10, 11 + env3 * 80);
        const sig: f32 = this.vel * (
          	this.bp2.process(osc) * env2 +
          	this.bp3.process(osc) * env3 * 30);


        this.channel.signal.add(sig, sig);
    }
}

export class Snare2 extends MidiVoice {
    vel: f32;

    readonly noise: Noise = new Noise();
    readonly env1: Envelope = new Envelope(0.001, 0.3, 0.0, 0.3);
    readonly bp1: BandPass = new BandPass(350, 500);
    readonly env2: Envelope = new Envelope(0.001, 0.08, 0.00, 0.2);
    readonly bp2: BandPass = new BandPass(3000, 5000);


    constructor(channel: MidiChannel) {
       super(channel);
       this.minnote = 62;
      	this.maxnote = 62;
    }

    noteon(note: u8, velocity: u8): void {
      super.noteon(note, velocity);

      this.vel = (velocity as f32) / 64;
      this.env1.attack();
      this.env2.attack();
    }

  	noteoff(): void {
            this.env1.release();
            this.env2.release();

    }

  	isDone(): boolean {
      return this.env1.isDone();
    }

    nextframe(): void {
        let env1: f32 = this.env1.next();
        let env2: f32 = this.env2.next();

        let osc: f32 = this.noise.next();

        let sig1: f32 = this.bp1.process(osc) * env1 * 7;
        let sig2: f32 = this.bp2.process(osc) * env2 * 2;

        this.channel.signal.add(
         	this.vel * (sig1 + sig2 * <f32>0.7),
        	this.vel * (sig1 * <f32>0.7 + sig2)
          );


    }
}
  


export function initializeMidiSynth(): void {
  midichannels[0] = new MidiChannel(10, (ch) => new Piano(ch)); 
  midichannels[0].controlchange(7, 95);
  midichannels[0].controlchange(10, 75);
  midichannels[0].controlchange(91, 50);
  midichannels[1] = new MidiChannel(8, (ch) => new String(ch)); 
  midichannels[1].controlchange(7, 70);
  midichannels[1].controlchange(10, 50);
  midichannels[1].controlchange(91, 50);
  midichannels[2] = new MidiChannel(3, (ch, ndx) => {
    switch(ndx) {
      case 1:
        return new Hihat(ch);
      case 2:
        return new Snare2(ch);
      default:
        return new Kick2(ch);
    }
  });
  midichannels[2].controlchange(7, 100);
  midichannels[2].controlchange(91, 20);
  midichannels[3] = new MidiChannel(4, (ch) => new Brass(ch)); 
  midichannels[3].controlchange(7, 52);
  midichannels[3].controlchange(10, 50);
  midichannels[3].controlchange(91, 30);
  midichannels[4] = new GuitarChannel(10, (ch) => new Guitar(ch)); 
  midichannels[4].controlchange(7, 85);
  midichannels[4].controlchange(10, 45);
  midichannels[4].controlchange(91, 55);
  midichannels[5] = new MidiChannel(2, (ch) => new Bass(ch)); 
  midichannels[5].controlchange(7, 105);
  midichannels[5].controlchange(10, 70);
  midichannels[5].controlchange(91, 20);
}

export class MultiBandEQ {
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

const eqfreqs: f32[] = [20,70,250,12000,19000]
const eqlevels: f32[] = [0.8, 1.0, 0.8, 0.7];
//const eqlevels: f32[] = [1.0, 1.0, 1.0, 1.0];

const eqleft = new MultiBandEQ(eqfreqs);
const eqright = new MultiBandEQ(eqfreqs);

export function postprocess(): void {
  const gain: f32 = 0.37;
  let left = outputline.left;
  let right = outputline.right;
  left*=gain;
  right*=gain;
  
  // stereo enhancement
  left += (left - right) * 0.15;
  right += (right - left) * 0.15;

  left = eqleft.process(left, eqlevels);
  right = eqright.process(right, eqlevels);
  
  outputline.left = left;
  outputline.right = right;
}
