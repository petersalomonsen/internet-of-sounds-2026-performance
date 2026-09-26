import("stdfaust.lib");

// Karplus-Strong plucked electric bass string.
// Port of the "Beach Drive" AssemblyScript Bass voice (class Bass + WaveGuide):
//   WaveGuide(exciterAttack=0.04, exciterRelease=0.01, exciterFilterFreq=300, feedback=0.999999)
//   amp Envelope(attack=0.1, decay=1, sustain=1.0, release=0.1), out = wg * env * velocity * 0.5
//   loop filter frequency = 7 * freq

freq = hslider("freq", 110, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// one-pole lowpass exactly as the original OnePole class:
//   b1 = exp(-2*pi*fc/SR); a0 = 1 - b1;  y = a0*x + b1*y[n-1]
pcoef(fc) = exp(-2.0*ma.PI*fc/ma.SR);
onepole(fc) = *(1.0 - pcoef(fc)) : + ~ *(pcoef(fc));

// EXCITER: white noise through a short burst env (lin attack 0.04, decay 0.01 to
// sustain 0) then a 300 Hz one-pole lowpass -> soft thumpy pluck, not clicky.
exciter = no.noise * en.adsr(0.04, 0.01, 0.0, 0.01, gate) : onepole(300.0);

// STRING LOOP: fractional delay of SR/freq samples, loop lowpass at 7*freq,
// feedback 0.999999 (the loop filter loss is what shapes the decay).
MAXDEL = 4096;                       // covers down to ~12 Hz at 48 kHz
loopfc  = 7.0*freq;
// compensate the loop's implicit 1-sample delay and the one-pole's group delay
// at DC (b1/(1-b1)) so the fundamental tracks the played note exactly.
phasedel = pcoef(loopfc) / (1.0 - pcoef(loopfc));
deltime  = max(2.0, ma.SR/freq - 1.0 - phasedel);

string = exciter : (+ : onepole(loopfc)) ~ (*(0.999999) : de.fdelay4(MAXDEL, deltime));

// AMP ENV: linear attack 0.1, sustain 1.0, release 0.1
ampenv = en.asr(0.1, 1.0, 0.1, gate);

process = string * ampenv * gain * 11.0;
