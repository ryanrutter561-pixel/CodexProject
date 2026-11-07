/* =========================================================
   Original 16x16 pixel sprites, generated from text grids.
   '.' = transparent; other letters are palette keys.
   ========================================================= */
(function () {
  const T = {
    bear: [
      "................",
      "..DD........DD..",
      ".DBBD......DBBD.",
      ".DBBBDDDDDDBBBD.",
      "..DBBBBBBBBBBD..",
      "..DBBBBBBBBBBD..",
      ".DBBWWBBBBWWBBD.",
      ".DBBWEBBBBEWBBD.",
      ".DBBBBBBBBBBBBD.",
      ".DBBBBAAAABBBBD.",
      ".DBBBAAKKAABBBD.",
      ".DBBBAAAAAABBBD.",
      "..DBBAKKKKABBD..",
      "..DBBBAAAABBBD..",
      "...DDBBBBBBDD...",
      ".....DDDDDD.....",
    ],
    rabbit: [
      "...DD......DD...",
      "..DBBD....DBBD..",
      "..DBAD....DABD..",
      "..DBAD....DABD..",
      "..DBBD....DBBD..",
      "...DBBDDDDBBD...",
      "..DBBBBBBBBBBD..",
      ".DBBWWBBBBWWBBD.",
      ".DBBWEBBBBEWBBD.",
      ".DBBBBBBBBBBBBD.",
      ".DBBBBBAABBBBBD.",
      ".DBBBBAKKABBBBD.",
      "..DBBAAAAAABBD..",
      "..DBBAWWWWABBD..",
      "...DDBBBBBBDD...",
      ".....DDDDDD.....",
    ],
    chicken: [
      ".......AA.......",
      "......AAA.......",
      ".....DDAADD.....",
      "....DBBBBBBD....",
      "...DBBBBBBBBD...",
      "..DBBBBBBBBBBD..",
      "..DBWWBBBBWWBD..",
      "..DBWEBBBBEWBD..",
      "..DBBBBBBBBBBD..",
      "..DBBOOOOOOBBD..",
      "..DBOOOOOOOOBD..",
      "..DBBOOOOOOBBD..",
      "...DBBWWWWBBD...",
      "...DBBBBBBBBD...",
      "....DDBBBBDD....",
      "......DDDD......",
    ],
    fox: [
      ".D............D.",
      ".DD..........DD.",
      ".DBD........DBD.",
      ".DBBD......DBBD.",
      ".DBBBDDDDDDBBBD.",
      "..DBBBBBBBBBBD..",
      "..DBBBBBBBBBBD..",
      ".DBBWWBBBBPPBBD.",
      ".DBBWEBBBBPPBBD.",
      ".DBBBBBBBBBBBBD.",
      ".DBBBAAAAAABBBD.",
      "..DBAAAKKAAABD..",
      "..DBAWAAAAWABD..",
      "...DBAAAAAABD...",
      "....DDBBBBDD....",
      "......DDDD......",
    ],
    puppet: [
      ".....KKKKKK.....",
      "...KKWWWWWWKK...",
      "..KWWWWWWWWWWK..",
      "..KWWWWWWWWWWK..",
      ".KWWKKKWWKKKWWK.",
      ".KWWKEKWWKEKWWK.",
      ".KWWKKKWWKKKWWK.",
      ".KWPWWWWWWWWPWK.",
      ".KWPRRWWWWRRPWK.",
      ".KWPRRWWWWRRPWK.",
      "..KWPWWKKWWPWK..",
      "..KWWWKRRKWWWK..",
      "...KWWWKKWWWK...",
      "....KKWWWWKK....",
      ".....KKKKKK.....",
      "................",
    ],
    human: [
      "................",
      ".....HHHHHH.....",
      "....HHHHHHHH....",
      "...HHHHHHHHHH...",
      "...HSSSSSSSSH...",
      "...HSESSSSESH...",
      "...SSESSSSESS...",
      "...SSSSSSSSSS...",
      "....SSSMMSSS....",
      ".....SSSSSS.....",
      "......SSSS......",
      "...CCCCCCCCCC...",
      "..CCCCCCCCCCCC..",
      "..CCCCCCCCCCCC..",
      "..CC.CCCCCC.CC..",
      "..SS.CCCCCC.SS..",
    ],
    endo: [
      "................",
      "....DDDDDDDD....",
      "...DBBBBBBBBD...",
      "..DBBBBBBBBBBD..",
      "..DBKKKBBKKKBD..",
      "..DBKEKBBKEKBD..",
      "..DBKKKBBKKKBD..",
      "..DBBBBDDBBBBD..",
      "...DBBBDDBBBD...",
      "...DWDWDWDWDD...",
      "...DDWDWDWDWD...",
      "....DBBBBBBD....",
      ".....DDDDDD.....",
      "......D..D......",
      ".....DDDDDD.....",
      "....D.D..D.D....",
    ],
    cake: [
      "................",
      ".......Y........",
      ".......O........",
      ".......W........",
      ".......W........",
      "...PPPPPPPPPP...",
      "..PWPPWPPWPPWP..",
      "..PPPPPPPPPPPP..",
      "..BBBBBBBBBBBB..",
      "..BBBBBBBBBBBB..",
      "..PPPPPPPPPPPP..",
      "..BBBBBBBBBBBB..",
      "..BBBBBBBBBBBB..",
      ".WWWWWWWWWWWWWW.",
      "................",
      "................",
    ],
    phone: [
      "................",
      "................",
      "..KKKK....KKKK..",
      ".KRRRRKKKKRRRRK.",
      ".KRRRRRRRRRRRRK.",
      "..KKRRRRRRRRKK..",
      "....KRRRRRRK....",
      "...KRRRRRRRRK...",
      "..KRRKWKWKWRRK..",
      "..KRRWKWKWKRRK..",
      "..KRRKWKWKWRRK..",
      "..KRRRRRRRRRRK..",
      "..KKKKKKKKKKKK..",
      "................",
      "................",
      "................",
    ],
    tape: [
      "................",
      "................",
      "................",
      ".KKKKKKKKKKKKKK.",
      ".KGGGGGGGGGGGGK.",
      ".KGWWWWWWWWWWGK.",
      ".KGWKKWWWWKKWGK.",
      ".KGWKWKWWKWKWGK.",
      ".KGWKKWWWWKKWGK.",
      ".KGWWWWWWWWWWGK.",
      ".KGGGKKKKKKGGGK.",
      ".KGGKGGGGGGKGGK.",
      ".KKKKKKKKKKKKKK.",
      "................",
      "................",
      "................",
    ],
    fire: [
      ".......R........",
      "......RR........",
      "......RRR...R...",
      ".....RRORR..RR..",
      "....RROORR.RRR..",
      "...RROOYORRROR..",
      "...ROOYYYOOROR..",
      "..RROYYWYYOOOR..",
      "..ROOYWWWYYOOR..",
      "..ROYYWWWWYOOR..",
      "..ROYYWWWWYYOR..",
      "..RROYYWWYYORR..",
      "...RROOYYOORR...",
      "....RRROORRR....",
      "......RRRR......",
      "................",
    ],
  };

  // Shared palettes
  const SKIN = "#f2c49b";
  const DEF = {
    // name: { t: template, p: palette, o: overlays }
    freddy:       { t: "bear",   p: { B: "#8a4b22", D: "#3b1d0c", A: "#d29a62", W: "#fff", E: "#3a8ad8", K: "#111" }, o: ["hat", "bowtie"] },
    goldenfreddy: { t: "bear",   p: { B: "#e2b23a", D: "#6a4a0c", A: "#f4d888", W: "#111", E: "#fff", K: "#111" }, o: ["hat", "bowtie"] },
    fredbear:     { t: "bear",   p: { B: "#e8b830", D: "#6a4a0c", A: "#f4d888", W: "#fff", E: "#3a8ad8", K: "#111", H: "#7a35c8" }, o: ["hatP", "bowtieP"] },
    glamfreddy:   { t: "bear",   p: { B: "#9b5a2c", D: "#3b1d0c", A: "#f0b37a", W: "#fff", E: "#2fd0ff", K: "#111", H: "#ff4fa8" }, o: ["hatP", "bowtieP"] },
    bonnie:       { t: "rabbit", p: { B: "#5a5ad6", D: "#1e1a5a", A: "#a9a9ff", W: "#fff", E: "#e0306a", K: "#111" }, o: ["bowtieR"] },
    springbonnie: { t: "rabbit", p: { B: "#d9c13a", D: "#5e520c", A: "#f2e38a", W: "#fff", E: "#3fb04a", K: "#111" }, o: [] },
    springtrap:   { t: "rabbit", p: { B: "#8a9a3a", D: "#2d330e", A: "#b9c46a", W: "#111", E: "#fff", K: "#111", X: "#3a1a10" }, o: ["damage"] },
    glitchtrap:   { t: "rabbit", p: { B: "#e3d24a", D: "#5d27a8", A: "#b58cff", W: "#fff", E: "#7a35c8", K: "#111" }, o: ["glitch", "bowtieP"] },
    burntrap:     { t: "rabbit", p: { B: "#5a4a3a", D: "#1a120c", A: "#8a6a4a", W: "#111", E: "#ff3b3b", K: "#111", X: "#ff7a1a" }, o: ["damage"] },
    vanny:        { t: "rabbit", p: { B: "#f2f2f2", D: "#7a7a8a", A: "#ff9ccc", W: "#111", E: "#ff3b3b", K: "#111" }, o: [] },
    shadowbonnie: { t: "rabbit", p: { B: "#1b1530", D: "#000", A: "#2a2248", W: "#000", E: "#fff", K: "#000" }, o: [] },
    chica:        { t: "chicken",p: { B: "#f3d23a", D: "#6a520c", A: "#ff6a8a", W: "#fff", E: "#c03af0", K: "#111", O: "#ff8a1a" }, o: ["bib"] },
    foxy:         { t: "fox",    p: { B: "#c8402a", D: "#4a1208", A: "#e6c2a0", W: "#fff", E: "#ffcc33", K: "#111", P: "#111" }, o: [] },
    mangle:       { t: "fox",    p: { B: "#f2f2f2", D: "#7a5a8a", A: "#ff7ab8", W: "#fff", E: "#ffcc33", K: "#111", P: "#ff4fa8", X: "#7a5a8a" }, o: ["damage"] },
    puppet:       { t: "puppet", p: { K: "#0d0a14", W: "#f4f4f4", E: "#fff", P: "#7a35c8", R: "#e0306a" }, o: [] },
    lefty:        { t: "bear",   p: { B: "#262030", D: "#000", A: "#3a3446", W: "#111", E: "#ffcc33", K: "#e0306a" }, o: ["hatR"] },
    mimic:        { t: "endo",   p: { B: "#8c8c98", D: "#2a2a34", K: "#111", E: "#ffffff", W: "#e6e6e6" }, o: [] },
    ennard:       { t: "endo",   p: { B: "#c8c8d8", D: "#3a3a52", K: "#111", E: "#3fe07a", W: "#e6e6e6" }, o: ["wires"] },
    purpleguy:    { t: "human",  p: { H: "#4a1f8a", S: "#7a35c8", E: "#fff", M: "#fff", C: "#6a2ab8", Y: "#ffcc33" }, o: ["badge"] },
    michael:      { t: "human",  p: { H: "#4a2a14", S: SKIN, E: "#111", M: "#9a4a4a", C: "#7a35c8", Y: "#ffcc33" }, o: [] },
    henry:        { t: "human",  p: { H: "#9a9aa8", S: SKIN, E: "#111", M: "#9a4a4a", C: "#5a3a22", R: "#c8402a" }, o: ["tie"] },
    elizabeth:    { t: "human",  p: { H: "#e2662a", S: "#fbe9e2", E: "#2a8a3a", M: "#e0306a", C: "#e0306a", R: "#e0306a" }, o: ["pigtails"] },
    circusbaby:   { t: "human",  p: { H: "#e2442a", S: "#f4f4f4", E: "#2a8a3a", M: "#e0306a", C: "#e0306a", R: "#e0306a" }, o: ["pigtails", "nose"] },
    cryingchild:  { t: "human",  p: { H: "#5a3418", S: SKIN, E: "#111", M: "#9a4a4a", C: "#3a6ad8", T: "#6ad0ff" }, o: ["tears", "stripes"] },
    charlie:      { t: "human",  p: { H: "#1a1018", S: SKIN, E: "#111", M: "#9a4a4a", C: "#3a6a5a" }, o: [] },
    guard:        { t: "human",  p: { H: "#1e2a6a", S: SKIN, E: "#111", M: "#9a4a4a", C: "#2a3a8a", Y: "#ffcc33" }, o: ["cap", "badge"] },
    guard2:       { t: "human",  p: { H: "#2a3a8a", S: "#e8b48a", E: "#111", M: "#9a4a4a", C: "#3a4a9a", Y: "#ffcc33" }, o: ["cap", "badge"] },
    guard3:       { t: "human",  p: { H: "#1a2a4a", S: "#d8a07a", E: "#111", M: "#9a4a4a", C: "#24305a", Y: "#ffcc33" }, o: ["cap", "badge"] },
    vanessa:      { t: "human",  p: { H: "#f2d27a", S: SKIN, E: "#2a6ad8", M: "#c0506a", C: "#2a3a8a", Y: "#ffcc33" }, o: ["badge"] },
    gregory:      { t: "human",  p: { H: "#4a2a14", S: SKIN, E: "#111", M: "#9a4a4a", C: "#3a8a4a" }, o: [] },
    cassie:       { t: "human",  p: { H: "#2a1a10", S: "#c88a5a", E: "#111", M: "#9a4a4a", C: "#ff4fa8", A: "#ff9ccc" }, o: ["ears"] },
    edwin:        { t: "human",  p: { H: "#6a6a72", S: SKIN, E: "#111", M: "#9a4a4a", C: "#3a2a1a", R: "#7a5a2a" }, o: ["tie"] },
    oswald:       { t: "human",  p: { H: "#2a1a10", S: "#8a5a3a", E: "#111", M: "#5a2a2a", C: "#e2b23a" }, o: [] },
    cake:         { t: "cake",   p: { P: "#ff7ab8", W: "#fff", B: "#8a4b22", Y: "#ffcc33", O: "#ff8a1a" }, o: [] },
    phone:        { t: "phone",  p: { K: "#111", R: "#c8402a", W: "#f4f4f4" }, o: [] },
    tape:         { t: "tape",   p: { K: "#111", G: "#8a8a98", W: "#f4f4f4" }, o: [] },
    fire:         { t: "fire",   p: { R: "#d8301a", O: "#ff8a1a", Y: "#ffd23a", W: "#fff6c8" }, o: [] },
  };

  function setPx(g, r, c, ch) {
    if (r < 0 || r > 15 || c < 0 || c > 15) return;
    const row = g[r];
    g[r] = row.slice(0, c) + ch + row.slice(c + 1);
  }

  // deterministic pseudo-random
  function rng(seed) {
    let s = seed;
    return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  }

  const OVERLAYS = {
    hat(g) {
      for (let r = 0; r < 3; r++) for (let c = 6; c <= 9; c++) setPx(g, r, c, "K");
      for (let c = 4; c <= 11; c++) setPx(g, 3, c, "K");
    },
    hatP(g) {
      for (let r = 0; r < 3; r++) for (let c = 6; c <= 9; c++) setPx(g, r, c, "H");
      for (let c = 4; c <= 11; c++) setPx(g, 3, c, "H");
    },
    hatR(g) {
      for (let r = 0; r < 3; r++) for (let c = 6; c <= 9; c++) setPx(g, r, c, "K");
      for (let c = 4; c <= 11; c++) setPx(g, 3, c, "K");
    },
    bowtie(g) { [6, 7, 8, 9].forEach((c) => setPx(g, 15, c, "K")); setPx(g, 14, 7, "K"); setPx(g, 14, 8, "K"); },
    bowtieP(g) { [6, 7, 8, 9].forEach((c) => setPx(g, 15, c, "H")); setPx(g, 14, 7, "H"); setPx(g, 14, 8, "H"); },
    bowtieR(g) { [6, 7, 8, 9].forEach((c) => setPx(g, 15, c, "E")); },
    bib(g) { for (let c = 6; c <= 9; c++) setPx(g, 15, c, "W"); },
    damage(g, seed) {
      const R = rng(seed);
      for (let i = 0; i < 18; i++) {
        const r = 1 + Math.floor(R() * 14), c = 1 + Math.floor(R() * 14);
        if (g[r][c] === "B" || g[r][c] === "A") setPx(g, r, c, R() > 0.5 ? "D" : "X");
      }
    },
    glitch(g) {
      [4, 5, 11].forEach((r) => (g[r] = "." + g[r].slice(0, 15)));
      [9, 13].forEach((r) => (g[r] = g[r].slice(1) + "."));
    },
    badge(g) { setPx(g, 12, 5, "Y"); },
    tie(g) { setPx(g, 11, 7, "R"); setPx(g, 11, 8, "R"); setPx(g, 12, 7, "R"); setPx(g, 12, 8, "R"); setPx(g, 13, 7, "R"); },
    pigtails(g) {
      [[3, 1], [4, 1], [4, 2], [5, 1], [6, 1], [3, 14], [4, 14], [4, 13], [5, 14], [6, 14]].forEach(([r, c]) => setPx(g, r, c, "H"));
    },
    nose(g) { setPx(g, 7, 7, "R"); setPx(g, 7, 8, "R"); },
    tears(g) { [[6, 4], [7, 4], [8, 5], [6, 11], [7, 11], [8, 10]].forEach(([r, c]) => setPx(g, r, c, "T")); },
    stripes(g) { for (let c = 2; c <= 13; c++) if (g[12][c] === "C") setPx(g, 12, c, "S"); },
    cap(g) { for (let c = 2; c <= 9; c++) setPx(g, 4, c, "H"); setPx(g, 2, 7, "Y"); },
    ears(g) { [[0, 3], [1, 3], [1, 2], [0, 12], [1, 12], [1, 13]].forEach(([r, c]) => setPx(g, r, c, "A")); },
    wires(g, seed) {
      const R = rng(seed);
      const cols = ["E", "M", "C"];
      for (let i = 0; i < 10; i++) {
        const r = 11 + Math.floor(R() * 5), c = 2 + Math.floor(R() * 12);
        setPx(g, r, c, cols[i % 3]);
      }
    },
  };
  // extra palette for ennard wires
  DEF.ennard.p.M = "#ff4fa8";
  DEF.ennard.p.C = "#3fb0ff";

  const cache = {};

  function grid(id) {
    const d = DEF[id];
    if (!d) return null;
    const g = T[d.t].map((r) => (r + "................").slice(0, 16));
    let seed = 0;
    for (const ch of id) seed = (seed * 31 + ch.charCodeAt(0)) % 100000;
    (d.o || []).forEach((o) => OVERLAYS[o] && OVERLAYS[o](g, seed));
    return { g, p: d.p };
  }

  function url(id) {
    if (cache[id]) return cache[id];
    const res = grid(id) || grid("tape");
    const cv = document.createElement("canvas");
    cv.width = 16;
    cv.height = 16;
    const ctx = cv.getContext("2d");
    for (let r = 0; r < 16; r++)
      for (let c = 0; c < 16; c++) {
        const ch = res.g[r][c];
        if (ch === "." || !res.p[ch]) continue;
        ctx.fillStyle = res.p[ch];
        ctx.fillRect(c, r, 1, 1);
      }
    cache[id] = cv.toDataURL("image/png");
    return cache[id];
  }

  function img(id, size, extraClass) {
    const s = size || 48;
    return `<img class="spr ${extraClass || ""}" src="${url(id)}" width="${s}" height="${s}" alt="" draggable="false">`;
  }

  window.SPRITES = { url, img, ids: Object.keys(DEF) };
})();
