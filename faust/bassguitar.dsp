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

// LOOP GAIN: was 0.999999 (a reused voice still held a near-full-amplitude
// standing wave, so a retrigger's fresh noise burst stacked on top -> jump/click).
// 0.975 combined with the loop-filter loss still rings ~2.5 s at d2 but decays,
// and the loop is damped harder while the gate is down so repeats don't pile up.
// AMP ENV (click fix): a slew-limited gate that ramps from WHERE IT IS - linear
// 4 ms up, 45 ms down - then rounded by a 1.5 ms one-pole so neither corner is a
// step in slope. A same-note retrigger 7 ms after note-off (the allocator reuses
// the still-releasing voice) just climbs back from ~0.85 instead of restarting.
slew(att, rel, t) = t : (step ~ _) with {
  step(y, x) = y + max(-1.0/(rel*ma.SR), min(1.0/(att*ma.SR), x - y));
};
ampenv = slew(0.004, 0.045, gate) : si.smooth(ba.tau2pole(0.0015));

// VELOCITY (click fix): gain is a per-note field that jumps at note-on; on a
// reused, still-sounding voice (d2 vel100 -> d2 vel50) that was a step in level.
// Glide it over ~4 ms instead.
gainS = gain : si.smooth(ba.tau2pole(0.004));

// Once the note is fully released, open the loop (feedback 0) so the delay line
// flushes to silence before the voice is reused at another pitch: a recycled
// voice starts on an empty string instead of the old one at a new delay time.
alive = (gate > 0.0) | (ampenv > 0.0005);
loopgain = (0.975*gate + 0.85*(1.0 - gate)) : si.smoo : *(alive);

string = exciter : (+ : onepole(loopfc)) ~ (*(loopgain) : de.fdelay4(MAXDEL, deltime));

process = string * ampenv * gainS * 11.0;
