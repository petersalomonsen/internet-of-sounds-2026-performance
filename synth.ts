import { Mastering } from '../mixes/globalimports';
const mastering = new Mastering();
import { midichannels, MidiChannel, MidiVoice, SineOscillator, Envelope, notefreq, freeverb, midiLevelToGain, outputline } from './globalimports';
import { Kick } from '../faust/kick';
import { Hihat } from '../faust/hihat';
import { Pad } from '../faust/pad';
import { Bass } from '../faust/bass';
import { Padlead3, Padlead3Channel } from '../faust/padlead3';
import { Jumppad2, Jumppad2Channel } from '../faust/jumppad2';
import { Warmpad } from '../faust/warmpad';
import { Snare } from '../faust/snare';
import { Sololead, SololeadChannel } from '../faust/sololead';
import { Masterverb, MasterverbChannel } from '../faust/masterverb';
import { Bassguitar } from '../faust/bassguitar';
// Physical-modeling instruments ported from the 2020 AssemblyScript song
// (reference/physicalmodeling/; shared model in faust/physmod.lib).
import { Pmdrums, PmdrumsChannel } from '../faust/pmdrums';
import { Pmbass, PmbassChannel } from '../faust/pmbass';
import { Pmguitar, PmguitarChannel } from '../faust/pmguitar';
import { Pmpiano, PmpianoChannel } from '../faust/pmpiano';
import { Pmstrings, PmstringsChannel } from '../faust/pmstrings';
import { Pmbrass, PmbrassChannel } from '../faust/pmbrass';

// Global master reverb: one Zita-rev1 instance (MasterverbChannel) driven over the full mix in postprocess().
const masterReverbWet: f32 = 0.30;
let masterverb: MasterverbChannel | null = null;

class Piano extends MidiVoice {
    osc: SineOscillator = new SineOscillator();
    env: Envelope = new Envelope(0.01, 0.1, 0.7, 0.2);

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.osc.frequency = notefreq(note);
        this.env.attack();
    }

    noteoff(): void {
        this.env.release();
    }

    isDone(): boolean {
        return this.env.isDone();
    }

    nextframe(): void {
        const signal = this.osc.next() * this.env.next() * this.velocity / 256;
        this.channel.signal.add(signal, signal);
    }
}

export function initializeMidiSynth(): void {
    // --- mastering: set by auto_master / the mastering specialist (probe_mix measures the result) ---
    mastering.gainDb = 13.0;
    mastering.limiterCeilingDb = -1.5;
    mastering.highpassHz = 35.0;
    // --- end mastering ---
    midichannels[0] = new MidiChannel(2, (channel: MidiChannel) => new Kick(channel));
    midichannels[1] = new MidiChannel(3, (channel: MidiChannel) => new Hihat(channel));
    midichannels[2] = new MidiChannel(8, (channel: MidiChannel) => new Pad(channel));
    midichannels[3] = new MidiChannel(8, (channel: MidiChannel) => new Bass(channel));
    midichannels[4] = new Padlead3Channel(8, (channel: MidiChannel) => new Padlead3(channel));
    midichannels[5] = new Jumppad2Channel(8, (channel: MidiChannel) => new Jumppad2(channel));
    midichannels[6] = new MidiChannel(8, (channel: MidiChannel) => new Warmpad(channel));
    midichannels[7] = new MidiChannel(2, (channel: MidiChannel) => new Snare(channel));
    midichannels[8] = new SololeadChannel(8, (channel: MidiChannel) => new Sololead(channel));
    midichannels[9] = new MidiChannel(4, (channel: MidiChannel) => new Bassguitar(channel));

    // Physical-modeling instruments (voice counts as in the original). They are
    // ~15-30 dB hotter than the rest of this kit, so each channel volume sets it
    // level with its counterpart here (pre-master RMS): drums with the kick,
    // bass with bass/bassguitar, the rest with the pads and leads.
    midichannels[10] = new PmdrumsChannel(3, (channel: MidiChannel) => new Pmdrums(channel));     // c5 kick, d5 snare, fs5 hat
    midichannels[10].controlchange(7, 46);
    midichannels[11] = new PmbassChannel(2, (channel: MidiChannel) => new Pmbass(channel));
    midichannels[11].controlchange(7, 27);
    midichannels[12] = new PmguitarChannel(10, (channel: MidiChannel) => new Pmguitar(channel));  // with its amp as channel effect
    midichannels[12].controlchange(7, 27);
    midichannels[13] = new PmpianoChannel(10, (channel: MidiChannel) => new Pmpiano(channel));
    midichannels[13].controlchange(7, 17);
    midichannels[14] = new PmstringsChannel(8, (channel: MidiChannel) => new Pmstrings(channel));
    midichannels[14].controlchange(7, 15);
    midichannels[15] = new PmbrassChannel(4, (channel: MidiChannel) => new Pmbrass(channel));
    midichannels[15].controlchange(7, 23);

    // Global reverb is now the Zita-rev1 MASTER effect (one MasterverbChannel), driven over the
    // full mix in postprocess(). Disable the built-in Freeverb bus so the two don't stack:
    // zero its wet and every per-channel send.
    freeverb.set_wet(0.0);
    for (let ch = 0; ch < 16; ch++) {
        midichannels[ch].reverb = 0;
    }

    masterverb = new MasterverbChannel(1, (channel: MidiChannel, voiceindex: i32) => new Masterverb(channel));
}

export function postprocess(): void {
    // Master reverb: run the whole mix through the one Zita-rev1 instance and add its wet tail back.
    if (masterverb === null) return;
    const mv = masterverb as MasterverbChannel;
    mv.signal.left = outputline.left;
    mv.signal.right = outputline.right;
    mv.preprocess();
    outputline.left += mv.signal.left * masterReverbWet;
    outputline.right += mv.signal.right * masterReverbWet;
    mv.signal.clear();
    mastering.processOutputline();
}
