// TEMPORARY syntax/behaviour harness: the new dispersion-scaled string from
// mpiano.dsp, with the handful of monster.lib helpers it needs copied in, so it
// can be transpiled in an environment where import("monster.lib") does not
// resolve. Not an instrument of the kit - delete when done.
import("stdfaust.lib");

SR = ma.SR;
QB = 0.7071067811865475;
rbj(hp, fc, q, k) = ba.selectn(5, k, b0 / a0, b1 / a0, b0 / a0, -2 * c / a0, (1 - al) / a0)
with {
    w = 2 * ma.PI * min(fc, SR / 2 - 1000) / SR;
    c = cos(w);
    al = sin(w) / (2 * q);
    a0 = 1 + al;
    b0 = ba.if(hp, (1 + c) * 0.5, (1 - c) * 0.5);
    b1 = ba.if(hp, 0 - (1 + c), 1 - c);
};
df1(rst, hp, fc, q, x) = st ~ (_, _, _, _) : (!, !, _, !)
with {
    b0 = rbj(hp, fc, q, 0); b1 = rbj(hp, fc, q, 1); b2 = rbj(hp, fc, q, 2);
    a1 = rbj(hp, fc, q, 3); a2 = rbj(hp, fc, q, 4);
    st(x1p, x2p, y1p, y2p) = x, x1, y, y1
    with {
        k = 1 - rst;
        x1 = x1p * k; x2 = x2p * k; y1 = y1p * k; y2 = y2p * k;
        y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    };
};
lpf(rst, fc, x) = df1(rst, 0, fc, QB, x);
lpResponse(fc, f, k) = ba.selectn(2, k, phaseSamples, mag)
with {
    b0 = rbj(0, fc, QB, 0); b1 = rbj(0, fc, QB, 1); b2 = rbj(0, fc, QB, 2);
    a1 = rbj(0, fc, QB, 3); a2 = rbj(0, fc, QB, 4);
    w = 2 * ma.PI * f / SR;
    c1 = cos(-w); c2 = cos(-2 * w); s1 = sin(-w); s2 = sin(-2 * w);
    rz = b0 + b1 * c1 + b2 * c2; iz = b1 * s1 + b2 * s2;
    rp = 1 + a1 * c1 + a2 * c2; ip = a1 * s1 + a2 * s2;
    d = rp * rp + ip * ip;
    rh = (rz * rp + iz * ip) / d; ih = (iz * rp - rz * ip) / d;
    mag = sqrt(rh * rh + ih * ih);
    phaseSamples = 0 - (atan2(ih, rh) / (2 * ma.PI)) * (SR / f);
};
lpPhase(fc, f) = lpResponse(fc, f, 0);
lpMag(fc, f) = lpResponse(fc, f, 1);
since(rst) = (+(1) : *(1 - rst)) ~ _;
apc(delta) = (1 - delta) / (1 + delta);
ap(rst, c, x) = f ~ _
with {
    f(yp) = ba.if(rst, c * x, c * (x - yp) + x');
};
aps(n, rst, c) = seq(i, n, ap(rst, c));
delayline(rst, len) = de.delay(8192, n - 1) : *(since(rst) >= n) : ap(rst, apc(d))
with {
    n = max(1, int(len));
    d = max(0, len - n);
};
damped(fb0, d) = 1 - (1 - fb0) * pow(100, d - 1);

// ---- the code under test (identical to mpiano.dsp) --------------------------
dispersionS(f0, ds) = (pd(a1) - pd(1 / a1))
with {
    B = 0.00003 * ds; M = 5;
    lb = log(max(B, 0.000001));
    k1 = -0.00179; k2 = -0.0233; k3 = -2.93;
    m1 = 0.0126; m2 = 0.0606; m3 = -0.00825; m4 = 1.97;
    wT = 2 * ma.PI * f0 / SR;
    kd = exp(k1 * lb * lb + k2 * lb + k3);
    Cd = exp((m1 * log(M) + m2) * lb + m3 * log(M) + m4);
    trt = pow(2, 1 / 12);
    ikey = log(f0 * trt / 27.5) / log(trt);
    D = exp(Cd - ikey * kd);
    a1 = (1 - D) / (1 + D);
    pd(a) = atan(sin(wT) / (a + cos(wT))) / wT;
};
pianostringS(trig, stopped, f, env, damping, ds, hammerOut) = loop ~ delayline(rst, len) : (!, _)
with {
    held = ba.sAndH(trig, f);
    rst = trig & ((f != held') | stopped);
    df = ba.sAndH(rst, dispersionS(f, ds));
    len = ba.sAndH(rst, SR / f - lpPhase(18000, f) - df * 5);
    fb = ba.sAndH(rst, pow(0.20 / lpMag(18000, f), 1.01 / f));
    loop(read) = w, s
    with {
        s = hammerOut + lpf(rst, 18000, read) : aps(5, rst, apc(df)) : *(env);
        w = s * damped(fb, damping);
    };
};

freq = hslider("freq", 261.63, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.8, 0, 1, 0.01);
damping = hslider("damping", 1, 0.02, 2.56, 0.02);
dispScale = hslider("dispersion", 1, 0.02, 2.56, 0.02);

env = en.adsr(0.001, 1.0, 1.0, 3.0, gate);
strig = gate > gate';
stopped = env' <= 0;
// a 2 ms noise burst instead of the hammer resonator, just to excite the string
exc = no.noise * 0.5 * gain * (ba.countup(int(SR * 0.002), strig) < int(SR * 0.002) - 1)
    : lpf(strig, 700) : lpf(strig, 700) : *(8);

process = pianostringS(strig, stopped, freq, env, damping, dispScale, exc) * 4;
