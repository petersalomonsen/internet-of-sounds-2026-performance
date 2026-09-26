import { Mastering } from '../mixes/globalimports';
const mastering = new Mastering();
import { midichannels, MidiChannel, freeverb, outputline } from './globalimports';
import { Jumppad2, Jumppad2Channel } from '../faust/jumppad2';
import { Warmpad } from '../faust/warmpad';
import { Masterverb, MasterverbChannel } from '../faust/masterverb';
import { Bassguitar } from '../faust/bassguitar';
// Instruments ported from "monster is close" (2022): the physical-modeling ones
// on faust/monster.lib, and the pad synth (reference/monstertheme/).
import { Mdrums, MdrumsChannel } from '../faust/mdrums';
import { Mbass, MbassChannel } from '../faust/mbass';
import { Mguitar, MguitarChannel } from '../faust/mguitar';
import { Mpiano, MpianoChannel } from '../faust/mpiano';
import { Mflute, MfluteChannel } from '../faust/mflute';
import { Mstrings, MstringsChannel } from '../faust/mstrings';
import { Mchoir, MchoirChannel } from '../faust/mchoir';
import { Mbrass, MbrassChannel } from '../faust/mbrass';
import { Mpadsynth, MpadsynthChannel } from '../faust/mpadsynth';

// Global master reverb: one Zita-rev1 instance (MasterverbChannel) driven over the full mix in postprocess().
const masterReverbWet: f32 = 0.30;
let masterverb: MasterverbChannel | null = null;

export function initializeMidiSynth(): void {
    // --- mastering: set by auto_master / the mastering specialist (probe_mix measures the result) ---
    mastering.gainDb = 13.0;
    mastering.limiterCeilingDb = -1.5;
    mastering.highpassHz = 35.0;
    // --- end mastering ---

    // Voice counts as in "monster is close" (the flute gets 4 instead of 1: a
    // Faust voice stays busy briefly after note-off). Channel volumes balance the
    // song's mix (measured on a full render: each layer's level within its part).
    midichannels[0] = new MdrumsChannel(9, (channel: MidiChannel) => new Mdrums(channel));        // c5 kick, d5 snare, fs5 hat, gs5 open hat, f5 g5 a5 b5 toms, cs6 cymbal
    midichannels[0].controlchange(7, 120);
    midichannels[1] = new MbassChannel(2, (channel: MidiChannel) => new Mbass(channel));
    midichannels[1].controlchange(7, 49);
    midichannels[2] = new MguitarChannel(6, (channel: MidiChannel) => new Mguitar(channel));      // amp + echo as channel effect
    midichannels[2].controlchange(7, 40);
    midichannels[3] = new MpianoChannel(10, (channel: MidiChannel) => new Mpiano(channel));       // comb network as channel effect
    midichannels[3].controlchange(7, 88);
    midichannels[4] = new MfluteChannel(4, (channel: MidiChannel) => new Mflute(channel));        // echo as channel effect
    midichannels[4].controlchange(7, 32);
    midichannels[5] = new Jumppad2Channel(8, (channel: MidiChannel) => new Jumppad2(channel));
    midichannels[6] = new MidiChannel(8, (channel: MidiChannel) => new Warmpad(channel));
    midichannels[7] = new MstringsChannel(10, (channel: MidiChannel) => new Mstrings(channel));
    midichannels[7].controlchange(7, 41);
    midichannels[8] = new MchoirChannel(10, (channel: MidiChannel) => new Mchoir(channel));
    midichannels[8].controlchange(7, 55);
    midichannels[9] = new MidiChannel(4, (channel: MidiChannel) => new Bassguitar(channel));
    midichannels[10] = new MbrassChannel(5, (channel: MidiChannel) => new Mbrass(channel));
    midichannels[10].controlchange(7, 58);
    midichannels[11] = new MpadsynthChannel(15, (channel: MidiChannel) => new Mpadsynth(channel)); // gain + 4 kHz low-pass as channel effect
    midichannels[11].controlchange(7, 74);

    // Global reverb is the Zita-rev1 MASTER effect (one MasterverbChannel), driven over the
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
