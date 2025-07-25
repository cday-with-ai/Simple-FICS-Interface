var Sf167Web = (() => {
    var _scriptName = import.meta.url;

    return (
        async function (moduleArg = {}) {
            var moduleRtn;

            var h = moduleArg, aa, ba, ha = new Promise((a, b) => {
                    aa = a;
                    ba = b
                }), ia = "object" == typeof window, k = "undefined" != typeof WorkerGlobalScope,
                l = k && self.name?.startsWith("em-pthread");
            h.listen || (h.listen = a => console.log(a));
            h.onError || (h.onError = a => console.error(a));
            h.getRecommendedNnue = (a = 0) => ja(ka(a));
            h.setNnueBuffer = function (a, b = 0) {
                if (!a) throw Error("buf is null");
                if (0 >= a.byteLength) throw Error(`${a.byteLength} bytes?`);
                const c = la(a.byteLength);
                if (!c) throw Error(`could not allocate ${a.byteLength} bytes`);
                h.HEAPU8.set(a, c);
                ma(c, a.byteLength, b)
            };
            h.uci = function (a) {
                const b = na(a) + 1, c = la(b);
                if (!c) throw Error(`Could not allocate ${b} bytes`);
                oa(a, pa(), c, b);
                qa(c)
            };
            h.print = a => h.listen?.(a);
            h.printErr = a => h.onError?.(a);
            var ra = [], p = "", sa, ua;
            if (ia || k) k ? p = self.location.href : "undefined" != typeof document && document.currentScript && (p = document.currentScript.src), _scriptName && (p = _scriptName), p.startsWith("blob:") ? p = "" : p = p.slice(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1), k && (ua = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), sa = async a => {
                a = await fetch(a, {credentials: "same-origin"});
                if (a.ok) return a.arrayBuffer();
                throw Error(a.status + " : " + a.url);
            };
            var va = console.log.bind(console), q = console.error.bind(console), t, wa, xa = !1, u, v, ya, za, Aa, Ba,
                w, Ca, Da = !1;

            function x() {
                t.buffer != v.buffer && z();
                return v
            }

            function pa() {
                t.buffer != v.buffer && z();
                return ya
            }

            function Ea() {
                t.buffer != v.buffer && z();
                return za
            }

            function A() {
                t.buffer != v.buffer && z();
                return Aa
            }

            function B() {
                t.buffer != v.buffer && z();
                return Ba
            }

            function Fa() {
                t.buffer != v.buffer && z();
                return Ca
            }

            if (l) {
                var Ga, Ha = !1;
                self.onunhandledrejection = b => {
                    throw b.reason || b;
                };

                function a(b) {
                    try {
                        var c = b.data, d = c.ka;
                        if ("load" === d) {
                            let e = [];
                            self.onmessage = f => e.push(f);
                            self.startWorker = () => {
                                postMessage({ka: "loaded"});
                                for (let f of e) a(f);
                                self.onmessage = a
                            };
                            for (const f of c.Wa) if (!h[f] || h[f].proxy) h[f] = (...g) => {
                                postMessage({ka: "callHandler", Va: f, Ta: g})
                            }, "print" == f && (va = h[f]), "printErr" == f && (q = h[f]);
                            t = c.ib;
                            z();
                            Ga(c.jb)
                        } else if ("run" === d) {
                            Ia(c.ia);
                            Ja(c.ia, 0, 0, 1, 0, 0);
                            Ka();
                            La(c.ia);
                            Ha ||= !0;
                            try {
                                Ma(c.eb, c.Ba)
                            } catch (e) {
                                if ("unwind" !=
                                    e) throw e;
                            }
                        } else "setimmediate" !== c.target && ("checkMailbox" === d ? Ha && Na() : d && (q(`worker: received unknown command ${d}`), q(c)))
                    } catch (e) {
                        throw Oa(), e;
                    }
                }

                self.onmessage = a
            }

            function z() {
                var a = t.buffer;
                v = new Int8Array(a);
                za = new Int16Array(a);
                h.HEAPU8 = ya = new Uint8Array(a);
                new Uint16Array(a);
                Aa = new Int32Array(a);
                Ba = new Uint32Array(a);
                new Float32Array(a);
                Ca = new Float64Array(a);
                w = new BigInt64Array(a);
                new BigUint64Array(a)
            }

            function Pa() {
                l ? startWorker(h) : (h.noFSInit || Qa || (Qa = !0, Ra("/dev/tty", "/dev/stdin"), Ra("/dev/tty", "/dev/stdout"), Ra("/dev/tty1", "/dev/stderr"), Sa("/dev/stdin", 0), Sa("/dev/stdout", 1), Sa("/dev/stderr", 1)), C.D(), Ta = !1)
            }

            var D = 0, G = null;

            function Ua() {
                D--;
                if (0 == D && G) {
                    var a = G;
                    G = null;
                    a()
                }
            }

            function Va(a) {
                a = "Aborted(" + a + ")";
                q(a);
                xa = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                ba(a);
                throw a;
            }

            var Wa;

            async function Xa(a) {
                try {
                    var b = await sa(a);
                    return new Uint8Array(b)
                } catch {
                }
                if (ua) a = ua(a); else throw "both async and sync fetching of the wasm failed";
                return a
            }

            async function Ya(a, b) {
                try {
                    var c = await Xa(a);
                    return await WebAssembly.instantiate(c, b)
                } catch (d) {
                    q(`failed to asynchronously prepare wasm: ${d}`), Va(d)
                }
            }

            async function Za(a) {
                var b = Wa;
                if ("function" == typeof WebAssembly.instantiateStreaming) try {
                    var c = fetch(b, {credentials: "same-origin"});
                    return await WebAssembly.instantiateStreaming(c, a)
                } catch (d) {
                    q(`wasm streaming compile failed: ${d}`), q("falling back to ArrayBuffer instantiation")
                }
                return Ya(b, a)
            }

            function $a() {
                ab = {
                    B: bb,
                    f: cb,
                    w: db,
                    x: eb,
                    m: fb,
                    k: gb,
                    A: hb,
                    i: ib,
                    o: jb,
                    g: kb,
                    j: La,
                    h: lb,
                    p: mb,
                    q: nb,
                    C: ob,
                    d: pb,
                    l: qb,
                    b: rb,
                    z: sb,
                    u: tb,
                    r: ub,
                    s: vb,
                    c: wb,
                    e: xb,
                    v: yb,
                    t: zb,
                    y: Ab,
                    a: t,
                    n: Bb
                };
                return {a: ab}
            }

            class Cb {
                name = "ExitStatus";

                constructor(a) {
                    this.message = `Program terminated with exit(${a})`;
                    this.status = a
                }
            }

            var Db = a => {
                a.terminate();
                a.onmessage = () => {
                }
            }, Eb = [], Hb = a => {
                0 == H.length && (Fb(), Gb(H[0]));
                var b = H.pop();
                if (!b) return 6;
                I.push(b);
                J[a.ia] = b;
                b.ia = a.ia;
                b.postMessage({ka: "run", eb: a.cb, Ba: a.Ba, ia: a.ia}, a.Ra);
                return 0
            }, K = 0, tb = () => 0 < K, L = (a, b, ...c) => {
                for (var d = 2 * c.length, e = Ib(), f = Jb(8 * d), g = f >> 3, m = 0; m < c.length; m++) {
                    var r = c[m];
                    "bigint" == typeof r ? (w[g + 2 * m] = 1n, w[g + 2 * m + 1] = r) : (w[g + 2 * m] = 0n, Fa()[g + 2 * m + 1] = r)
                }
                a = Kb(a, 0, d, f, b);
                Lb(e);
                return a
            };

            function Bb(a) {
                if (l) return L(0, 1, a);
                u = a;
                0 < K || (Mb(), xa = !0);
                throw new Cb(a);
            }

            function Nb(a) {
                if (l) return L(1, 0, a);
                --K;
                wb(a)
            }

            var wb = a => {
                u = a;
                if (l) throw Nb(a), "unwind";
                if (!(0 < K || l)) {
                    Ob();
                    Qa = !1;
                    Pb(0);
                    for (var b of M) b && Qb(b);
                    Mb();
                    Da = !0
                }
                Bb(a)
            }, H = [], I = [], Rb = [], J = {};

            function Sb() {
                for (var a = navigator.hardwareConcurrency; a--;) Fb();
                Eb.push(() => {
                    D++;
                    Tb(() => Ua())
                })
            }

            var Mb = () => {
                for (var a of I) Db(a);
                for (a of H) Db(a);
                H = [];
                I = [];
                J = {}
            }, Vb = a => {
                var b = a.ia;
                delete J[b];
                H.push(a);
                I.splice(I.indexOf(a), 1);
                a.ia = 0;
                Ub(b)
            };

            function Ka() {
                Rb.forEach(a => a())
            }

            var Gb = a => new Promise(b => {
                a.onmessage = f => {
                    f = f.data;
                    var g = f.ka;
                    if (f.Aa && f.Aa != Wb()) {
                        var m = J[f.Aa];
                        m ? m.postMessage(f, f.Ra) : q(`Internal error! Worker sent a message "${g}" to target pthread ${f.Aa}, but that thread no longer exists!`)
                    } else if ("checkMailbox" === g) Na(); else if ("spawnThread" === g) Hb(f); else if ("cleanupThread" === g) Vb(J[f.fb]); else if ("loaded" === g) a.loaded = !0, b(a); else if ("setimmediate" === f.target) a.postMessage(f); else if ("callHandler" === g) h[f.Va](...f.Ta); else g && q(`worker sent an unknown command ${g}`)
                };
                a.onerror = f => {
                    q(`${"worker sent an error!"} ${f.filename}:${f.lineno}: ${f.message}`);
                    throw f;
                };
                var c = [], d = ["print", "printErr"], e;
                for (e of d) h.propertyIsEnumerable(e) && c.push(e);
                a.postMessage({ka: "load", Wa: c, ib: t, jb: wa})
            });

            function Tb(a) {
                l ? a() : Promise.all(H.map(Gb)).then(a)
            }

            function Fb() {
                if (h.mainScriptUrlOrBlob) {
                    var a = h.mainScriptUrlOrBlob;
                    "string" != typeof a && (a = URL.createObjectURL(a));
                    a = new Worker(a, {type: "module", name: "em-pthread"})
                } else a = new Worker(new URL("sf16-7.js", import.meta.url), {type: "module", name: "em-pthread"});
                H.push(a)
            }

            var Ia = a => {
                z();
                var b = B()[a + 52 >> 2];
                a = B()[a + 56 >> 2];
                Xb(b, b - a);
                Lb(b)
            }, Yb = [], Zb, Ma = (a, b) => {
                K = 0;
                var c = Yb[a];
                c || (Yb[a] = c = Zb.get(a));
                a = c(b);
                0 < K ? u = a : $b(a)
            };

            function ac(a, b, c, d) {
                return l ? L(2, 1, a, b, c, d) : bb(a, b, c, d)
            }

            var bb = (a, b, c, d) => {
                if ("undefined" == typeof SharedArrayBuffer) return 6;
                var e = [];
                if (l && 0 === e.length) return ac(a, b, c, d);
                a = {cb: c, ia: a, Ba: d, Ra: e};
                return l ? (a.ka = "spawnThread", postMessage(a, e), 0) : Hb(a)
            }, O = () => {
                var a = A()[+N >> 2];
                N += 4;
                return a
            }, bc = (a, b) => {
                for (var c = 0, d = a.length - 1; 0 <= d; d--) {
                    var e = a[d];
                    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
                }
                if (b) for (; c; c--) a.unshift("..");
                return a
            }, cc = a => {
                var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
                (a = bc(a.split("/").filter(d => !!d), !b).join("/")) ||
                b || (a = ".");
                a && c && (a += "/");
                return (b ? "/" : "") + a
            }, dc = a => {
                var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
                a = b[0];
                b = b[1];
                if (!a && !b) return ".";
                b &&= b.slice(0, -1);
                return a + b
            }, ec = () => a => a.set(crypto.getRandomValues(new Uint8Array(a.byteLength))), fc = a => {
                (fc = ec())(a)
            }, gc = (...a) => {
                for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
                    c = 0 <= d ? a[d] : "/";
                    if ("string" != typeof c) throw new TypeError("Arguments to path.resolve must be strings");
                    if (!c) return "";
                    b = c + "/" + b;
                    c = "/" === c.charAt(0)
                }
                b =
                    bc(b.split("/").filter(e => !!e), !c).join("/");
                return (c ? "/" : "") + b || "."
            }, hc = "undefined" != typeof TextDecoder ? new TextDecoder : void 0, P = (a, b = 0, c = NaN) => {
                var d = b + c;
                for (c = b; a[c] && !(c >= d);) ++c;
                if (16 < c - b && a.buffer && hc) return hc.decode(a.buffer instanceof ArrayBuffer ? a.subarray(b, c) : a.slice(b, c));
                for (d = ""; b < c;) {
                    var e = a[b++];
                    if (e & 128) {
                        var f = a[b++] & 63;
                        if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | f); else {
                            var g = a[b++] & 63;
                            e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                            65536 > e ? d += String.fromCharCode(e) :
                                (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023))
                        }
                    } else d += String.fromCharCode(e)
                }
                return d
            }, ic = [], na = a => {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var d = a.charCodeAt(c);
                    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3
                }
                return b
            }, oa = (a, b, c, d) => {
                if (!(0 < d)) return 0;
                var e = c;
                d = c + d - 1;
                for (var f = 0; f < a.length; ++f) {
                    var g = a.charCodeAt(f);
                    if (55296 <= g && 57343 >= g) {
                        var m = a.charCodeAt(++f);
                        g = 65536 + ((g & 1023) << 10) | m & 1023
                    }
                    if (127 >= g) {
                        if (c >= d) break;
                        b[c++] = g
                    } else {
                        if (2047 >= g) {
                            if (c + 1 >= d) break;
                            b[c++] = 192 | g >> 6
                        } else {
                            if (65535 >=
                                g) {
                                if (c + 2 >= d) break;
                                b[c++] = 224 | g >> 12
                            } else {
                                if (c + 3 >= d) break;
                                b[c++] = 240 | g >> 18;
                                b[c++] = 128 | g >> 12 & 63
                            }
                            b[c++] = 128 | g >> 6 & 63
                        }
                        b[c++] = 128 | g & 63
                    }
                }
                b[c] = 0;
                return c - e
            }, jc = [];

            function kc(a, b) {
                jc[a] = {input: [], output: [], ma: b};
                lc(a, mc)
            }

            var mc = {
                open(a) {
                    var b = jc[a.node.ya];
                    if (!b) throw new R(43);
                    a.ca = b;
                    a.seekable = !1
                }, close(a) {
                    a.ca.ma.va(a.ca)
                }, va(a) {
                    a.ca.ma.va(a.ca)
                }, read(a, b, c, d) {
                    if (!a.ca || !a.ca.ma.Ka) throw new R(60);
                    for (var e = 0, f = 0; f < d; f++) {
                        try {
                            var g = a.ca.ma.Ka(a.ca)
                        } catch (m) {
                            throw new R(29);
                        }
                        if (void 0 === g && 0 === e) throw new R(6);
                        if (null === g || void 0 === g) break;
                        e++;
                        b[c + f] = g
                    }
                    e && (a.node.qa = Date.now());
                    return e
                }, write(a, b, c, d) {
                    if (!a.ca || !a.ca.ma.Fa) throw new R(60);
                    try {
                        for (var e = 0; e < d; e++) a.ca.ma.Fa(a.ca, b[c + e])
                    } catch (f) {
                        throw new R(29);
                    }
                    d && (a.node.fa = a.node.ea = Date.now());
                    return e
                }
            }, nc = {
                Ka() {
                    a:{
                        if (!ic.length) {
                            var a = null;
                            "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
                            if (!a) {
                                var b = null;
                                break a
                            }
                            b = Array(na(a) + 1);
                            a = oa(a, b, 0, b.length);
                            b.length = a;
                            ic = b
                        }
                        b = ic.shift()
                    }
                    return b
                }, Fa(a, b) {
                    null === b || 10 === b ? (va(P(a.output)), a.output = []) : 0 != b && a.output.push(b)
                }, va(a) {
                    0 < a.output?.length && (va(P(a.output)), a.output = [])
                }, Ya() {
                    return {
                        ob: 25856, qb: 5, nb: 191, pb: 35387, mb: [3, 28, 127, 21, 4, 0, 1, 0,
                            17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                }, Za() {
                    return 0
                }, $a() {
                    return [24, 80]
                }
            }, oc = {
                Fa(a, b) {
                    null === b || 10 === b ? (q(P(a.output)), a.output = []) : 0 != b && a.output.push(b)
                }, va(a) {
                    0 < a.output?.length && (q(P(a.output)), a.output = [])
                }
            }, S = {
                ha: null, la() {
                    return S.createNode(null, "/", 16895, 0)
                }, createNode(a, b, c, d) {
                    if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new R(63);
                    S.ha || (S.ha = {
                        dir: {
                            node: {
                                pa: S.ba.pa,
                                ja: S.ba.ja,
                                sa: S.ba.sa,
                                wa: S.ba.wa,
                                Pa: S.ba.Pa,
                                Sa: S.ba.Sa,
                                Qa: S.ba.Qa,
                                Ga: S.ba.Ga,
                                za: S.ba.za
                            }, stream: {ga: S.$.ga}
                        },
                        file: {
                            node: {pa: S.ba.pa, ja: S.ba.ja},
                            stream: {ga: S.$.ga, read: S.$.read, write: S.$.write, Ma: S.$.Ma, Oa: S.$.Oa}
                        },
                        link: {node: {pa: S.ba.pa, ja: S.ba.ja, ta: S.ba.ta}, stream: {}},
                        Ia: {node: {pa: S.ba.pa, ja: S.ba.ja}, stream: pc}
                    });
                    c = qc(a, b, c, d);
                    16384 === (c.mode & 61440) ? (c.ba = S.ha.dir.node, c.$ = S.ha.dir.stream, c.aa = {}) : 32768 === (c.mode & 61440) ? (c.ba = S.ha.file.node, c.$ = S.ha.file.stream, c.da = 0, c.aa = null) : 40960 === (c.mode & 61440) ? (c.ba = S.ha.link.node, c.$ = S.ha.link.stream) : 8192 === (c.mode & 61440) && (c.ba = S.ha.Ia.node, c.$ = S.ha.Ia.stream);
                    c.qa = c.fa = c.ea = Date.now();
                    a && (a.aa[b] = c, a.qa = a.fa = a.ea = c.qa);
                    return c
                }, ub(a) {
                    return a.aa ? a.aa.subarray ? a.aa.subarray(0, a.da) : new Uint8Array(a.aa) : new Uint8Array(0)
                }, ba: {
                    pa(a) {
                        var b = {};
                        b.rb = 8192 === (a.mode & 61440) ? a.id : 1;
                        b.wb = a.id;
                        b.mode = a.mode;
                        b.xb = 1;
                        b.uid = 0;
                        b.vb = 0;
                        b.ya = a.ya;
                        16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.da : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
                        b.qa = new Date(a.qa);
                        b.fa = new Date(a.fa);
                        b.ea = new Date(a.ea);
                        b.Ua = 4096;
                        b.lb = Math.ceil(b.size / b.Ua);
                        return b
                    },
                    ja(a, b) {
                        for (var c of ["mode", "atime", "mtime", "ctime"]) null != b[c] && (a[c] = b[c]);
                        void 0 !== b.size && (b = b.size, a.da != b && (0 == b ? (a.aa = null, a.da = 0) : (c = a.aa, a.aa = new Uint8Array(b), c && a.aa.set(c.subarray(0, Math.min(b, a.da))), a.da = b)))
                    }, sa() {
                        throw S.Ja;
                    }, wa(a, b, c, d) {
                        return S.createNode(a, b, c, d)
                    }, Pa(a, b, c) {
                        try {
                            var d = rc(b, c)
                        } catch (f) {
                        }
                        if (d) {
                            if (16384 === (a.mode & 61440)) for (var e in d.aa) throw new R(55);
                            e = sc(d.parent.id, d.name);
                            if (T[e] === d) T[e] = d.ra; else for (e = T[e]; e;) {
                                if (e.ra === d) {
                                    e.ra = d.ra;
                                    break
                                }
                                e = e.ra
                            }
                        }
                        delete a.parent.aa[a.name];
                        b.aa[c] = a;
                        a.name = c;
                        b.ea = b.fa = a.parent.ea = a.parent.fa = Date.now()
                    }, Sa(a, b) {
                        delete a.aa[b];
                        a.ea = a.fa = Date.now()
                    }, Qa(a, b) {
                        var c = rc(a, b), d;
                        for (d in c.aa) throw new R(55);
                        delete a.aa[b];
                        a.ea = a.fa = Date.now()
                    }, Ga(a) {
                        return [".", "..", ...Object.keys(a.aa)]
                    }, za(a, b, c) {
                        a = S.createNode(a, b, 41471, 0);
                        a.link = c;
                        return a
                    }, ta(a) {
                        if (40960 !== (a.mode & 61440)) throw new R(28);
                        return a.link
                    }
                }, $: {
                    read(a, b, c, d, e) {
                        var f = a.node.aa;
                        if (e >= a.node.da) return 0;
                        a = Math.min(a.node.da - e, d);
                        if (8 < a && f.subarray) b.set(f.subarray(e, e + a), c); else for (d =
                                                                                               0; d < a; d++) b[c + d] = f[e + d];
                        return a
                    }, write(a, b, c, d, e, f) {
                        b.buffer === x().buffer && (f = !1);
                        if (!d) return 0;
                        a = a.node;
                        a.fa = a.ea = Date.now();
                        if (b.subarray && (!a.aa || a.aa.subarray)) {
                            if (f) return a.aa = b.subarray(c, c + d), a.da = d;
                            if (0 === a.da && 0 === e) return a.aa = b.slice(c, c + d), a.da = d;
                            if (e + d <= a.da) return a.aa.set(b.subarray(c, c + d), e), d
                        }
                        f = e + d;
                        var g = a.aa ? a.aa.length : 0;
                        g >= f || (f = Math.max(f, g * (1048576 > g ? 2 : 1.125) >>> 0), 0 != g && (f = Math.max(f, 256)), g = a.aa, a.aa = new Uint8Array(f), 0 < a.da && a.aa.set(g.subarray(0, a.da), 0));
                        if (a.aa.subarray &&
                            b.subarray) a.aa.set(b.subarray(c, c + d), e); else for (f = 0; f < d; f++) a.aa[e + f] = b[c + f];
                        a.da = Math.max(a.da, e + d);
                        return d
                    }, ga(a, b, c) {
                        1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.da);
                        if (0 > b) throw new R(28);
                        return b
                    }, Ma(a, b, c, d, e) {
                        if (32768 !== (a.node.mode & 61440)) throw new R(43);
                        a = a.node.aa;
                        if (e & 2 || !a || a.buffer !== x().buffer) {
                            d = !0;
                            Va();
                            e = void 0;
                            if (!e) throw new R(48);
                            if (a) {
                                if (0 < c || c + b < a.length) a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
                                x().set(a, e)
                            }
                        } else d = !1, e = a.byteOffset;
                        return {zb: e, kb: d}
                    }, Oa(a, b, c, d) {
                        S.$.write(a, b, 0, d, c, !1);
                        return 0
                    }
                }
            }, tc = a => {
                var b = 0;
                a && (b |= 365);
                return b
            }, uc = null, vc = {}, M = [], wc = 1, T = null, Qa = !1, Ta = !0, R = class {
                name = "ErrnoError";

                constructor(a) {
                    this.na = a
                }
            }, xc = class {
                ua = {};
                node = null;

                get flags() {
                    return this.ua.flags
                }

                set flags(a) {
                    this.ua.flags = a
                }

                get position() {
                    return this.ua.position
                }

                set position(a) {
                    this.ua.position = a
                }
            }, yc = class {
                ba = {};
                $ = {};
                xa = null;

                constructor(a, b, c, d) {
                    a ||= this;
                    this.parent = a;
                    this.la = a.la;
                    this.id = wc++;
                    this.name = b;
                    this.mode = c;
                    this.ya = d;
                    this.qa =
                        this.fa = this.ea = Date.now()
                }

                get read() {
                    return 365 === (this.mode & 365)
                }

                set read(a) {
                    a ? this.mode |= 365 : this.mode &= -366
                }

                get write() {
                    return 146 === (this.mode & 146)
                }

                set write(a) {
                    a ? this.mode |= 146 : this.mode &= -147
                }
            };

            function U(a, b = {}) {
                if (!a) throw new R(44);
                b.Da ?? (b.Da = !0);
                "/" === a.charAt(0) || (a = "//" + a);
                var c = 0;
                a:for (; 40 > c; c++) {
                    a = a.split("/").filter(m => !!m);
                    for (var d = uc, e = "/", f = 0; f < a.length; f++) {
                        var g = f === a.length - 1;
                        if (g && b.parent) break;
                        if ("." !== a[f]) if (".." === a[f]) if (e = dc(e), d === d.parent) {
                            a = e + "/" + a.slice(f + 1).join("/");
                            continue a
                        } else d = d.parent; else {
                            e = cc(e + "/" + a[f]);
                            try {
                                d = rc(d, a[f])
                            } catch (m) {
                                if (44 === m?.na && g && b.bb) return {path: e};
                                throw m;
                            }
                            !d.xa || g && !b.Da || (d = d.xa.root);
                            if (40960 === (d.mode & 61440) && (!g || b.Ca)) {
                                if (!d.ba.ta) throw new R(52);
                                d = d.ba.ta(d);
                                "/" === d.charAt(0) || (d = dc(e) + "/" + d);
                                a = d + "/" + a.slice(f + 1).join("/");
                                continue a
                            }
                        }
                    }
                    return {path: e, node: d}
                }
                throw new R(32);
            }

            function sc(a, b) {
                for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
                return (a + c >>> 0) % T.length
            }

            function rc(a, b) {
                var c = 16384 === (a.mode & 61440) ? (c = zc(a, "x")) ? c : a.ba.sa ? 0 : 2 : 54;
                if (c) throw new R(c);
                for (c = T[sc(a.id, b)]; c; c = c.ra) {
                    var d = c.name;
                    if (c.parent.id === a.id && d === b) return c
                }
                return a.ba.sa(a, b)
            }

            function qc(a, b, c, d) {
                a = new yc(a, b, c, d);
                b = sc(a.parent.id, a.name);
                a.ra = T[b];
                return T[b] = a
            }

            function Ac(a) {
                var b = ["r", "w", "rw"][a & 3];
                a & 512 && (b += "w");
                return b
            }

            function zc(a, b) {
                if (Ta) return 0;
                if (!b.includes("r") || a.mode & 292) {
                    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) return 2
                } else return 2;
                return 0
            }

            function Bc(a, b) {
                if (16384 !== (a.mode & 61440)) return 54;
                try {
                    return rc(a, b), 20
                } catch (c) {
                }
                return zc(a, "wx")
            }

            function V(a) {
                a = M[a];
                if (!a) throw new R(8);
                return a
            }

            function Cc(a, b = -1) {
                a = Object.assign(new xc, a);
                if (-1 == b) a:{
                    for (b = 0; 4096 >= b; b++) if (!M[b]) break a;
                    throw new R(33);
                }
                a.oa = b;
                return M[b] = a
            }

            function Dc(a, b = -1) {
                a = Cc(a, b);
                a.$?.tb?.(a);
                return a
            }

            function Ec(a, b) {
                var c = null?.$.ja, d = c ? null : a;
                c ??= a.ba.ja;
                if (!c) throw new R(63);
                c(d, b)
            }

            var pc = {
                open(a) {
                    a.$ = vc[a.node.ya].$;
                    a.$.open?.(a)
                }, ga() {
                    throw new R(70);
                }
            };

            function lc(a, b) {
                vc[a] = {$: b}
            }

            function Fc(a, b) {
                var c = "/" === b;
                if (c && uc) throw new R(10);
                if (!c && b) {
                    var d = U(b, {Da: !1});
                    b = d.path;
                    d = d.node;
                    if (d.xa) throw new R(10);
                    if (16384 !== (d.mode & 61440)) throw new R(54);
                }
                b = {type: a, yb: {}, Na: b, ab: []};
                a = a.la(b);
                a.la = b;
                b.root = a;
                c ? uc = a : d && (d.xa = b, d.la && d.la.ab.push(b))
            }

            function Gc(a, b, c) {
                var d = U(a, {parent: !0}).node;
                a = a && a.match(/([^\/]+|\/)\/*$/)[1];
                if (!a) throw new R(28);
                if ("." === a || ".." === a) throw new R(20);
                var e = Bc(d, a);
                if (e) throw new R(e);
                if (!d.ba.wa) throw new R(63);
                return d.ba.wa(d, a, b, c)
            }

            function W(a) {
                return Gc(a, 16895, 0)
            }

            function Hc(a, b, c) {
                "undefined" == typeof c && (c = b, b = 438);
                Gc(a, b | 8192, c)
            }

            function Ra(a, b) {
                if (!gc(a)) throw new R(44);
                var c = U(b, {parent: !0}).node;
                if (!c) throw new R(44);
                b = b && b.match(/([^\/]+|\/)\/*$/)[1];
                var d = Bc(c, b);
                if (d) throw new R(d);
                if (!c.ba.za) throw new R(63);
                c.ba.za(c, b, a)
            }

            function Sa(a, b, c = 438) {
                if ("" === a) throw new R(44);
                if ("string" == typeof b) {
                    var d = {r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090}[b];
                    if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
                    b = d
                }
                c = b & 64 ? c & 4095 | 32768 : 0;
                if ("object" == typeof a) d = a; else {
                    var e = a.endsWith("/");
                    var f = U(a, {Ca: !(b & 131072), bb: !0});
                    d = f.node;
                    a = f.path
                }
                f = !1;
                if (b & 64) if (d) {
                    if (b & 128) throw new R(20);
                } else {
                    if (e) throw new R(31);
                    d = Gc(a, c | 511, 0);
                    f = !0
                }
                if (!d) throw new R(44);
                8192 === (d.mode & 61440) && (b &= -513);
                if (b & 65536 && 16384 !== (d.mode &
                    61440)) throw new R(54);
                if (!f && (e = d ? 40960 === (d.mode & 61440) ? 32 : 16384 === (d.mode & 61440) && ("r" !== Ac(b) || b & 576) ? 31 : zc(d, Ac(b)) : 44)) throw new R(e);
                if (b & 512 && !f) {
                    e = d;
                    e = "string" == typeof e ? U(e, {Ca: !0}).node : e;
                    if (16384 === (e.mode & 61440)) throw new R(31);
                    if (32768 !== (e.mode & 61440)) throw new R(28);
                    if (a = zc(e, "w")) throw new R(a);
                    Ec(e, {size: 0, timestamp: Date.now()})
                }
                a:for (e = d; ;) {
                    if (e === e.parent) {
                        e = e.la.Na;
                        var g = g ? "/" !== e[e.length - 1] ? `${e}/${g}` : e + g : e;
                        break a
                    }
                    g = g ? `${e.name}/${g}` : e.name;
                    e = e.parent
                }
                b = Cc({
                    node: d, path: g,
                    flags: b & -131713, seekable: !0, position: 0, $: d.$, gb: [], error: !1
                });
                b.$.open && b.$.open(b);
                f && (c &= 511, d = "string" == typeof d ? U(d, {Ca: !0}).node : d, Ec(d, {
                    mode: c & 4095 | d.mode & -4096,
                    ea: Date.now(),
                    sb: void 0
                }));
                return b
            }

            function Qb(a) {
                if (null === a.oa) throw new R(8);
                a.Ea && (a.Ea = null);
                try {
                    a.$.close && a.$.close(a)
                } catch (b) {
                    throw b;
                } finally {
                    M[a.oa] = null
                }
                a.oa = null
            }

            function Ic(a, b, c) {
                if (null === a.oa) throw new R(8);
                if (!a.seekable || !a.$.ga) throw new R(70);
                if (0 != c && 1 != c && 2 != c) throw new R(28);
                a.position = a.$.ga(a, b, c);
                a.gb = []
            }

            function X(a, b) {
                a = cc("/dev/" + a);
                var c = tc(!!b);
                X.La ?? (X.La = 64);
                var d = X.La++ << 8 | 0;
                lc(d, {
                    open(e) {
                        e.seekable = !1
                    }, close() {
                        (void 0)?.buffer?.length && (void 0)(10)
                    }, read(e, f, g, m) {
                        for (var r = 0, n = 0; n < m; n++) {
                            try {
                                var y = b()
                            } catch (ta) {
                                throw new R(29);
                            }
                            if (void 0 === y && 0 === r) throw new R(6);
                            if (null === y || void 0 === y) break;
                            r++;
                            f[g + n] = y
                        }
                        r && (e.node.qa = Date.now());
                        return r
                    }, write(e, f, g, m) {
                        for (var r = 0; r < m; r++) try {
                            (void 0)(f[g + r])
                        } catch (n) {
                            throw new R(29);
                        }
                        m && (e.node.fa = e.node.ea = Date.now());
                        return r
                    }
                });
                Hc(a, c, d)
            }

            var Y = {}, ja = (a, b) => a ? P(pa(), a, b) : "", N = void 0;

            function cb(a, b, c) {
                if (l) return L(3, 1, a, b, c);
                N = c;
                try {
                    var d = V(a);
                    switch (b) {
                        case 0:
                            var e = O();
                            if (0 > e) break;
                            for (; M[e];) e++;
                            return Dc(d, e).oa;
                        case 1:
                        case 2:
                            return 0;
                        case 3:
                            return d.flags;
                        case 4:
                            return e = O(), d.flags |= e, 0;
                        case 12:
                            return e = O(), Ea()[e + 0 >> 1] = 2, 0;
                        case 13:
                        case 14:
                            return 0
                    }
                    return -28
                } catch (f) {
                    if ("undefined" == typeof Y || "ErrnoError" !== f.name) throw f;
                    return -f.na
                }
            }

            function db(a, b, c) {
                if (l) return L(4, 1, a, b, c);
                N = c;
                try {
                    var d = V(a);
                    switch (b) {
                        case 21509:
                            return d.ca ? 0 : -59;
                        case 21505:
                            if (!d.ca) return -59;
                            if (d.ca.ma.Ya) {
                                a = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                var e = O();
                                A()[e >> 2] = 25856;
                                A()[e + 4 >> 2] = 5;
                                A()[e + 8 >> 2] = 191;
                                A()[e + 12 >> 2] = 35387;
                                for (var f = 0; 32 > f; f++) x()[e + f + 17] = a[f] || 0
                            }
                            return 0;
                        case 21510:
                        case 21511:
                        case 21512:
                            return d.ca ? 0 : -59;
                        case 21506:
                        case 21507:
                        case 21508:
                            if (!d.ca) return -59;
                            if (d.ca.ma.Za) for (e = O(), A(), A(), A(), A(), a = [], f =
                                0; 32 > f; f++) a.push(x()[e + f + 17]);
                            return 0;
                        case 21519:
                            if (!d.ca) return -59;
                            e = O();
                            return A()[e >> 2] = 0;
                        case 21520:
                            return d.ca ? -28 : -59;
                        case 21531:
                            e = O();
                            if (!d.$.Xa) throw new R(59);
                            return d.$.Xa(d, b, e);
                        case 21523:
                            if (!d.ca) return -59;
                            d.ca.ma.$a && (f = [24, 80], e = O(), Ea()[e >> 1] = f[0], Ea()[e + 2 >> 1] = f[1]);
                            return 0;
                        case 21524:
                            return d.ca ? 0 : -59;
                        case 21515:
                            return d.ca ? 0 : -59;
                        default:
                            return -28
                    }
                } catch (g) {
                    if ("undefined" == typeof Y || "ErrnoError" !== g.name) throw g;
                    return -g.na
                }
            }

            function eb(a, b, c, d) {
                if (l) return L(5, 1, a, b, c, d);
                N = d;
                try {
                    b = ja(b);
                    var e = b;
                    if ("/" === e.charAt(0)) b = e; else {
                        var f = -100 === a ? "/" : V(a).path;
                        if (0 == e.length) throw new R(44);
                        b = f + "/" + e
                    }
                    var g = d ? O() : 0;
                    return Sa(b, c, g).oa
                } catch (m) {
                    if ("undefined" == typeof Y || "ErrnoError" !== m.name) throw m;
                    return -m.na
                }
            }

            var fb = () => Va(""), gb = a => {
                Ja(a, !k, 1, !ia, 3145728, !1);
                Ka()
            }, Jc = a => {
                if (!(a instanceof Cb || "unwind" == a)) throw a;
            }, Kc = a => {
                if (!Da && !xa) try {
                    if (a(), !(Da || 0 < K)) try {
                        l ? $b(u) : wb(u)
                    } catch (b) {
                        Jc(b)
                    }
                } catch (b) {
                    Jc(b)
                }
            }, La = a => {
                "function" === typeof Atomics.hb && (Atomics.hb(A(), a >> 2, a).value.then(Na), a += 128, Atomics.store(A(), a >> 2, 1))
            }, Na = () => {
                var a = Wb();
                a && (La(a), Kc(Lc))
            }, hb = (a, b) => {
                a == b ? setTimeout(Na) : l ? postMessage({
                    Aa: a,
                    ka: "checkMailbox"
                }) : (a = J[a]) && a.postMessage({ka: "checkMailbox"})
            }, Mc = [], ib = (a, b, c, d, e) => {
                d /= 2;
                Mc.length =
                    d;
                b = e >> 3;
                for (c = 0; c < d; c++) Mc[c] = w[b + 2 * c] ? w[b + 2 * c + 1] : Fa()[b + 2 * c + 1];
                return (0, Nc[a])(...Mc)
            }, jb = () => {
                K = 0
            }, kb = a => {
                l ? postMessage({ka: "cleanupThread", fb: a}) : Vb(J[a])
            }, lb = () => {
            }, Oc = {}, rb = () => performance.timeOrigin + performance.now();

            function mb(a, b) {
                if (l) return L(6, 1, a, b);
                Oc[a] && (clearTimeout(Oc[a].id), delete Oc[a]);
                if (!b) return 0;
                var c = setTimeout(() => {
                    delete Oc[a];
                    Kc(() => Pc(a, performance.timeOrigin + performance.now()))
                }, b);
                Oc[a] = {id: c, Ab: b};
                return 0
            }

            var Z = (a, b, c) => oa(a, pa(), b, c), nb = (a, b, c, d) => {
                var e = (new Date).getFullYear(), f = (new Date(e, 0, 1)).getTimezoneOffset();
                e = (new Date(e, 6, 1)).getTimezoneOffset();
                var g = Math.max(f, e);
                B()[a >> 2] = 60 * g;
                A()[b >> 2] = Number(f != e);
                b = m => {
                    var r = Math.abs(m);
                    return `UTC${0 <= m ? "-" : "+"}${String(Math.floor(r / 60)).padStart(2, "0")}${String(r % 60).padStart(2, "0")}`
                };
                a = b(f);
                b = b(e);
                e < f ? (Z(a, c, 17), Z(b, d, 17)) : (Z(a, d, 17), Z(b, c, 17))
            }, Qc = 1;

            function ob(a, b, c) {
                if (!(0 <= a && 3 >= a)) return 28;
                if (0 === a) a = Date.now(); else if (Qc) a = performance.timeOrigin + performance.now(); else return 52;
                w[c >> 3] = BigInt(Math.round(1E6 * a));
                return 0
            }

            var Rc = () => {
                    Rc.Ha || (Rc.Ha = {});
                    Rc.Ha["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"] || (Rc.Ha["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"] = 1, q("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"))
                }, pb = () => {
                    k || (Rc(), Va("Blocking on the main thread is not allowed by default. See https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"))
                },
                qb = () => {
                    K += 1;
                    throw "unwind";
                }, sb = a => {
                    var b = pa().length;
                    a >>>= 0;
                    if (a <= b || 2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var d = b * (1 + .2 / c);
                        d = Math.min(d, a + 100663296);
                        a:{
                            d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - t.buffer.byteLength + 65535) / 65536 | 0;
                            try {
                                t.grow(d);
                                z();
                                var e = 1;
                                break a
                            } catch (f) {
                            }
                            e = void 0
                        }
                        if (e) return !0
                    }
                    return !1
                }, Sc = {}, Uc = () => {
                    if (!Tc) {
                        var a = {
                            USER: "web_user",
                            LOGNAME: "web_user",
                            PATH: "/",
                            PWD: "/",
                            HOME: "/home/web_user",
                            LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] ||
                                "C").replace("-", "_") + ".UTF-8",
                            _: "./this.program"
                        }, b;
                        for (b in Sc) void 0 === Sc[b] ? delete a[b] : a[b] = Sc[b];
                        var c = [];
                        for (b in a) c.push(`${b}=${a[b]}`);
                        Tc = c
                    }
                    return Tc
                }, Tc;

            function ub(a, b) {
                if (l) return L(7, 1, a, b);
                var c = 0, d = 0, e;
                for (e of Uc()) {
                    var f = b + c;
                    B()[a + d >> 2] = f;
                    c += Z(e, f, Infinity) + 1;
                    d += 4
                }
                return 0
            }

            function vb(a, b) {
                if (l) return L(8, 1, a, b);
                var c = Uc();
                B()[a >> 2] = c.length;
                a = 0;
                for (var d of c) a += na(d) + 1;
                B()[b >> 2] = a;
                return 0
            }

            function xb(a) {
                if (l) return L(9, 1, a);
                try {
                    var b = V(a);
                    Qb(b);
                    return 0
                } catch (c) {
                    if ("undefined" == typeof Y || "ErrnoError" !== c.name) throw c;
                    return c.na
                }
            }

            function yb(a, b, c, d) {
                if (l) return L(10, 1, a, b, c, d);
                try {
                    a:{
                        var e = V(a);
                        a = b;
                        for (var f, g = b = 0; g < c; g++) {
                            var m = B()[a >> 2], r = B()[a + 4 >> 2];
                            a += 8;
                            var n = e, y = x(), ta = m, ca = r, E = f;
                            if (0 > ca || 0 > E) throw new R(28);
                            if (null === n.oa) throw new R(8);
                            if (1 === (n.flags & 2097155)) throw new R(8);
                            if (16384 === (n.node.mode & 61440)) throw new R(31);
                            if (!n.$.read) throw new R(28);
                            var da = "undefined" != typeof E;
                            if (!da) E = n.position; else if (!n.seekable) throw new R(70);
                            var ea = n.$.read(n, y, ta, ca, E);
                            da || (n.position += ea);
                            var F = ea;
                            if (0 > F) {
                                var fa = -1;
                                break a
                            }
                            b +=
                                F;
                            if (F < r) break;
                            "undefined" != typeof f && (f += F)
                        }
                        fa = b
                    }
                    B()[d >> 2] = fa;
                    return 0
                } catch (Q) {
                    if ("undefined" == typeof Y || "ErrnoError" !== Q.name) throw Q;
                    return Q.na
                }
            }

            function zb(a, b, c, d) {
                if (l) return L(11, 1, a, b, c, d);
                b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
                try {
                    if (isNaN(b)) return 61;
                    var e = V(a);
                    Ic(e, b, c);
                    w[d >> 3] = BigInt(e.position);
                    e.Ea && 0 === b && 0 === c && (e.Ea = null);
                    return 0
                } catch (f) {
                    if ("undefined" == typeof Y || "ErrnoError" !== f.name) throw f;
                    return f.na
                }
            }

            function Ab(a, b, c, d) {
                if (l) return L(12, 1, a, b, c, d);
                try {
                    a:{
                        var e = V(a);
                        a = b;
                        for (var f, g = b = 0; g < c; g++) {
                            var m = B()[a >> 2], r = B()[a + 4 >> 2];
                            a += 8;
                            var n = e, y = x(), ta = m, ca = r, E = f;
                            if (0 > ca || 0 > E) throw new R(28);
                            if (null === n.oa) throw new R(8);
                            if (0 === (n.flags & 2097155)) throw new R(8);
                            if (16384 === (n.node.mode & 61440)) throw new R(31);
                            if (!n.$.write) throw new R(28);
                            n.seekable && n.flags & 1024 && Ic(n, 0, 2);
                            var da = "undefined" != typeof E;
                            if (!da) E = n.position; else if (!n.seekable) throw new R(70);
                            var ea = n.$.write(n, y, ta, ca, E, void 0);
                            da || (n.position +=
                                ea);
                            var F = ea;
                            if (0 > F) {
                                var fa = -1;
                                break a
                            }
                            b += F;
                            if (F < r) break;
                            "undefined" != typeof f && (f += F)
                        }
                        fa = b
                    }
                    B()[d >> 2] = fa;
                    return 0
                } catch (Q) {
                    if ("undefined" == typeof Y || "ErrnoError" !== Q.name) throw Q;
                    return Q.na
                }
            }

            l || Sb();
            T = Array(4096);
            Fc(S, "/");
            W("/tmp");
            W("/home");
            W("/home/web_user");
            (function () {
                W("/dev");
                lc(259, {read: () => 0, write: (d, e, f, g) => g, ga: () => 0});
                Hc("/dev/null", 259);
                kc(1280, nc);
                kc(1536, oc);
                Hc("/dev/tty", 1280);
                Hc("/dev/tty1", 1536);
                var a = new Uint8Array(1024), b = 0, c = () => {
                    0 === b && (fc(a), b = a.byteLength);
                    return a[--b]
                };
                X("random", c);
                X("urandom", c);
                W("/dev/shm");
                W("/dev/shm/tmp")
            })();
            (function () {
                W("/proc");
                var a = W("/proc/self");
                W("/proc/self/fd");
                Fc({
                    la() {
                        var b = qc(a, "fd", 16895, 73);
                        b.$ = {ga: S.$.ga};
                        b.ba = {
                            sa(c, d) {
                                c = +d;
                                var e = V(c);
                                c = {parent: null, la: {Na: "fake"}, ba: {ta: () => e.path}, id: c + 1};
                                return c.parent = c
                            }, Ga() {
                                return Array.from(M.entries()).filter(([, c]) => c).map(([c]) => c.toString())
                            }
                        };
                        return b
                    }
                }, "/proc/self/fd")
            })();
            S.Ja = new R(44);
            S.Ja.stack = "<generic error, no stack>";
            l || (h.wasmMemory ? t = h.wasmMemory : t = new WebAssembly.Memory({
                initial: 1024,
                maximum: 32768,
                shared: !0
            }), z());
            h.print && (va = h.print);
            h.printErr && (q = h.printErr);
            h.UTF8ToString = ja;
            h.stringToUTF8 = Z;
            var Nc = [Bb, Nb, ac, cb, db, eb, mb, ub, vb, xb, yb, zb, Ab], ab, C = await (async function () {
                function a(d, e) {
                    C = d.exports;
                    Rb.push(C.J);
                    Zb = C.M;
                    wa = e;
                    Ua();
                    return C
                }

                D++;
                var b = $a();
                if (h.instantiateWasm) return new Promise(d => {
                    h.instantiateWasm(b, (e, f) => {
                        d(a(e, f))
                    })
                });
                if (l) return new Promise(d => {
                    Ga = e => {
                        var f = new WebAssembly.Instance(e, $a());
                        d(a(f, e))
                    }
                });
                Wa ??= h.locateFile ? h.locateFile ? h.locateFile("sf16-7.wasm", p) : p + "sf16-7.wasm" : (new URL("sf16-7.wasm", import.meta.url)).href;
                try {
                    var c = await Za(b);
                    return a(c.instance,
                        c.module)
                } catch (d) {
                    return ba(d), Promise.reject(d)
                }
            }());
            h._main = (a, b) => (h._main = C.E)(a, b);
            h.__Z10js_getlinev = a => (h.__Z10js_getlinev = C.F)(a);
            var qa = h._uci = a => (qa = h._uci = C.G)(a),
                ma = h._setNnueBuffer = (a, b, c) => (ma = h._setNnueBuffer = C.H)(a, b, c),
                ka = h._getRecommendedNnue = a => (ka = h._getRecommendedNnue = C.I)(a), Wb = () => (Wb = C.K)(),
                Vc = h.__emscripten_proxy_main = (a, b) => (Vc = h.__emscripten_proxy_main = C.L)(a, b),
                Ob = () => (Ob = C.N)(), Ja = (a, b, c, d, e, f) => (Ja = C.O)(a, b, c, d, e, f),
                Oa = () => (Oa = C.P)(), Pb = a => (Pb = C.Q)(a), la = h._malloc = a => (la = h._malloc = C.R)(a),
                Kb = (a, b, c, d, e) => (Kb = C.S)(a, b, c, d, e), Ub = a => (Ub = C.T)(a), $b = a => ($b = C.U)(a),
                Pc = (a, b) => (Pc = C.V)(a, b), Lc = () => (Lc = C.W)(), Xb =
                    (a, b) => (Xb = C.X)(a, b), Lb = a => (Lb = C.Y)(a), Jb = a => (Jb = C.Z)(a), Ib = () => (Ib = C._)();

            function Wc(a = []) {
                var b = Vc;
                K += 1;
                a.unshift("./this.program");
                var c = a.length, d = Jb(4 * (c + 1)), e = d;
                a.forEach(g => {
                    var m = B(), r = e >> 2, n = na(g) + 1, y = Jb(n);
                    Z(g, y, n);
                    m[r] = y;
                    e += 4
                });
                B()[e >> 2] = 0;
                try {
                    var f = b(c, d);
                    wb(f, !0)
                } catch (g) {
                    Jc(g)
                }
            }

            function Xc(a = ra) {
                if (0 < D) G = Xc; else if (l) aa(h), Pa(); else {
                    for (; 0 < Eb.length;) Eb.shift()(h);
                    0 < D ? G = Xc : (h.calledRun = !0, xa || (Pa(), aa(h), Wc(a)))
                }
            }

            Xc();
            moduleRtn = ha;


            return moduleRtn;
        }
    );
})();
export default Sf167Web;
var isPthread = globalThis.self?.name?.startsWith('em-pthread');
// When running as a pthread, construct a new instance on startup
isPthread && Sf167Web();
