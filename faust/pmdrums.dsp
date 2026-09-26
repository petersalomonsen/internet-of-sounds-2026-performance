// Drum kit ported from reference/physicalmodeling/synth.ts (Kick2, Snare2, Hihat).
// One channel, one drum per note, like the original: c5 (60) kick, d5 (62) snare,
// fs5 (66) hi-hat; every other note is silent. All three are filtered noise.
import("physmod.lib");

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);

// Live tweaks: every slider scales one original value, 1 = the original sound,
// 0.02-2.56 in steps of 0.02 so a MIDI CC (7-bit) lands exactly on 1 (CC 49).
kickDecay  = 0.3   * hslider("kick_decay", 1, 0.02, 2.56, 0.02);  // thump length
kickSweep  = 80    * hslider("kick_sweep", 1, 0.02, 2.56, 0.02);  // low-pass sweep depth
kickClick  = 1     * hslider("kick_click", 1, 0.02, 2.56, 0.02);  // 4-5 kHz click level
kickLevel  = 1     * hslider("kick_level", 1, 0.02, 2.56, 0.02);
snareDecay = 0.3   * hslider("snare_decay", 1, 0.02, 2.56, 0.02); // body (350-500 Hz) length
snareSnap  = 0.08  * hslider("snare_snap", 1, 0.02, 2.56, 0.02);  // 3-5 kHz snap length
snareLevel = 1     * hslider("snare_level", 1, 0.02, 2.56, 0.02);
hatDecay   = 0.07  * hslider("hat_decay", 1, 0.02, 2.56, 0.02);
hatCutoff  = 10000 * hslider("hat_cutoff", 1, 0.02, 2.56, 0.02);  // high-pass
hatLevel   = 1     * hslider("hat_level", 1, 0.02, 2.56, 0.02);

velo = gain * 127;

kick = velo / 40 * kickLevel * (
        (noise : bandpass(4000, 5000)) * e2 * kickClick
      + (noise : bandpass(10, 11 + e3 * kickSweep)) * e3 * 30)
with {
    g = gate * (key(freq) == 60);
    e2 = adsr(0.001, 0.01, 0, 0.01, g);
    e3 = adsr(0.001, kickDecay, 0, 0.1, g);
};

// The original is stereo (L = body + 0.7 snap, R = 0.7 body + snap); a Faust
// voice is mono, so this is their average.
snare = velo / 64 * snareLevel * 0.85 * (
        (noise : bandpass(350, 500)) * e1 * 7
      + (noise : bandpass(3000, 5000)) * e2 * 2)
with {
    g = gate * (key(freq) == 62);
    e1 = adsr(0.001, snareDecay, 0, 0.3, g);
    e2 = adsr(0.001, snareSnap, 0, 0.2, g);
};

hihat = (velo / 32 * hatLevel * 1.2 * e * noise) : hpf(hatCutoff + 2000 * e)
with {
    g = gate * (key(freq) == 66);
    e = adsr(0, hatDecay, 0, 0.1, g);
};

// x4: a Faust voice lands on the channel at 0.25 per side, the original at 1.0.
process = (kick + snare + hihat) * 4;
