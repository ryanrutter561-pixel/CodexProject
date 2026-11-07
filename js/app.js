/* =========================================================
   LORE TAPES — app logic (vanilla JS, no build step)
   ========================================================= */
(function () {
  "use strict";
  const { THEORIES, ERAS, EVENTS, CHARACTERS, EDGES, GAMES, GLOSSARY, CONTINUITIES, PRESETS } = window.LORE;
  const SP = window.SPRITES;
  const MINIGAMES = window.LORE.MINIGAMES || [];
  const MG = Object.fromEntries(MINIGAMES.map((m) => [m.id, m]));

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const TH = Object.fromEntries(THEORIES.map((t) => [t.id, t]));
  const CH = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const strip = (h) => String(h).replace(/<[^>]+>/g, "");

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };

  // ---------------- state ----------------
  const defaults = () => Object.fromEntries(THEORIES.map((t) => [t.id, t.options[0].id]));
  const encode = (s) => THEORIES.map((t) => Math.max(0, t.options.findIndex((o) => o.id === s[t.id]))).join("");
  function decode(str) {
    if (!str || !/^\d+$/.test(str)) return null;
    const o = defaults();
    THEORIES.forEach((t, i) => { const n = +str[i]; if (t.options[n]) o[t.id] = t.options[n].id; });
    return o;
  }
  let S = decode(new URLSearchParams(location.search).get("c")) || decode(store.get("loretapes.canon")) || defaults();
  let soundOn = store.get("loretapes.sfx") === "1";
  const val = (x) => (typeof x === "function" ? x(S) : x);

  function persist() {
    const code = encode(S);
    store.set("loretapes.canon", code);
    try {
      const u = new URL(location.href);
      u.searchParams.set("c", code);
      history.replaceState(null, "", u.pathname + u.search + location.hash);
    } catch (e) { /* ignore (e.g. sandboxed iframe) */ }
  }

  // ---------------- sound ----------------
  let actx;
  function blip(freq = 660, dur = 0.06, type = "square", when = 0) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = actx.currentTime + when;
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.05, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g).connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    } catch (e) { /* audio unavailable */ }
  }
  const jingle = () => { [523, 659, 784, 1047].forEach((f, i) => blip(f, 0.08, "square", i * 0.07)); };
  const glitchSfx = () => { for (let i = 0; i < 6; i++) blip(120 + Math.random() * 900, 0.04, "sawtooth", i * 0.035); };

  // ---------------- static / toast ----------------
  const stat = $("#static");
  const sctx = stat.getContext("2d");
  let reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function flashStatic(frames = 8) {
    if (reduced) return;
    stat.classList.add("on");
    let f = 0;
    const img = sctx.createImageData(160, 90);
    (function draw() {
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v * 0.8; img.data[i + 1] = v * 0.7; img.data[i + 2] = v; img.data[i + 3] = 255;
      }
      sctx.putImageData(img, 0, 0);
      if (++f < frames) requestAnimationFrame(draw);
      else stat.classList.remove("on");
    })();
  }
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ---------------- choices ----------------
  function snapshot() {
    const m = {};
    EVENTS.forEach((e) => {
      const shown = !e.when || e.when(S);
      m[e.id] = shown ? `${val(e.year)}|${val(e.title)}|${val(e.body)}|${val(e.era)}` : "";
    });
    return m;
  }
  let changed = new Set();

  function applyChanges(mutator, label) {
    const before = snapshot();
    mutator();
    const after = snapshot();
    changed = new Set(Object.keys(after).filter((k) => after[k] && after[k] !== before[k]));
    persist();
    syncPresetSelect();
    renderAll();
    if (changed.size) {
      flashStatic();
      glitchSfx();
      toast(`${label ? esc(label) + "<br>" : ""}TIMELINE REWRITTEN · ${changed.size} EVENT${changed.size > 1 ? "S" : ""} CHANGED`);
    } else {
      blip(880);
      if (label) toast(esc(label));
    }
    // clear the "rewritten" marker after the animation has played
    setTimeout(() => { changed = new Set(); $$(".ev.rewritten").forEach((n) => n.classList.remove("rewritten")); }, 4000);
  }
  function setChoice(tid, oid) {
    if (S[tid] === oid) return;
    applyChanges(() => { S = { ...S, [tid]: oid }; });
  }

  // ---------------- presets ----------------
  function presetState(key) {
    const base = defaults();
    if (key === "random") return Object.fromEntries(THEORIES.map((t) => [t.id, t.options[Math.floor(Math.random() * t.options.length)].id]));
    return { ...base, ...(PRESETS[key].set || {}) };
  }
  function syncPresetSelect() {
    const sel = $("#preset");
    const code = encode(S);
    let match = "";
    for (const k of Object.keys(PRESETS)) if (k !== "random" && encode(presetState(k)) === code) match = k;
    sel.value = match;
  }
  function initPresets() {
    const sel = $("#preset");
    Object.entries(PRESETS).forEach(([k, p]) => {
      const o = document.createElement("option");
      o.value = k; o.textContent = p.name; o.title = p.desc;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () => {
      const k = sel.value;
      if (!k) return;
      applyChanges(() => { S = presetState(k); }, `PRESET LOADED: ${PRESETS[k].name}`);
    });
    syncPresetSelect();
  }

  // ---------------- shared bits ----------------
  function optButtons(tid, compact) {
    const t = TH[tid];
    return t.options.map((o) =>
      `<button class="opt" data-tid="${tid}" data-oid="${o.id}" aria-pressed="${S[tid] === o.id}" title="${esc(o.tag)}: ${esc(strip(o.desc))}">${esc(o.label)}${compact ? "" : ` <span class="tag t-${o.tag}">${o.tag}</span>`}</button>`
    ).join("");
  }
  function contestBox(tid) {
    const t = TH[tid];
    return `<div class="contest">
      <div class="contest-q"><span>⚠ ${esc(t.title)}</span><button data-goto-theory="${tid}">WHY? &gt;</button></div>
      <div class="opt-row">${optButtons(tid, true)}</div>
    </div>`;
  }
  function gameChips(list) {
    return (list || []).map((g) => `<span class="chip" title="${esc(GAMES[g] ? GAMES[g].n : g)}">${esc(g)}</span>`).join("");
  }

  // delegated click handling for option buttons & cross-links
  document.addEventListener("click", (e) => {
    const opt = e.target.closest("[data-tid][data-oid]");
    if (opt) { setChoice(opt.dataset.tid, opt.dataset.oid); return; }
    const gm = e.target.closest("[data-goto-mg]");
    if (gm) { closeDossier(); gotoMinigame(gm.dataset.gotoMg); return; }
    const gt = e.target.closest("[data-goto-theory]");
    if (gt) { closeDossier(); gotoTheory(gt.dataset.gotoTheory); return; }
    const ge = e.target.closest("[data-goto-event]");
    if (ge) { closeDossier(); gotoEvent(ge.dataset.gotoEvent); return; }
    const gc = e.target.closest("[data-open-char]");
    if (gc) { openDossier(gc.dataset.openChar); return; }
    const gw = e.target.closest("[data-web]");
    if (gw) { closeDossier(); webCenter = gw.dataset.web; showTab("web"); renderWeb(); return; }
  });

  // ---------------- TIMELINE ----------------
  const tlFilter = { q: "", ch: "", contested: false };
  function eventsResolved() {
    return EVENTS.filter((e) => !e.when || e.when(S)).map((e) => ({
      ...e, _year: val(e.year), _order: val(e.order), _era: val(e.era), _title: val(e.title), _body: val(e.body), _sprites: val(e.sprites) || [],
    })).sort((a, b) => a._order - b._order);
  }
  function renderTimeline() {
    const wrap = $("#timeline");
    let evs = eventsResolved();
    const q = tlFilter.q.trim().toLowerCase();
    if (q) evs = evs.filter((e) => (`${e._year} ${e._title} ${strip(e._body)} ${(e.games || []).join(" ")}`).toLowerCase().includes(q));
    if (tlFilter.ch) evs = evs.filter((e) => (e.chars || []).includes(tlFilter.ch));
    if (tlFilter.contested) evs = evs.filter((e) => (e.theories || []).length);

    let html = "", lastEra = -1, side = 0;
    evs.forEach((e) => {
      if (e._era !== lastEra) {
        const era = ERAS[e._era];
        html += `<div class="era" id="era-${era.id}" data-era="${era.id}"><div class="era-badge"><span class="era-clock">${era.clock}</span><span class="era-name">${era.name}</span></div></div>`;
        lastEra = e._era;
      }
      const cls = ["ev", side++ % 2 ? "right" : "left"];
      if ((e.theories || []).length) cls.push("contested");
      if (changed.has(e.id)) cls.push("rewritten");
      html += `<article class="${cls.join(" ")}" id="ev-${e.id}" data-era="${e._era}">
        <div class="ev-card">
          <div class="ev-head">
            <div class="ev-sprites">${e._sprites.map((s) => SP.img(s, 36)).join("")}</div>
            <div><span class="ev-year">${esc(e._year)}</span><h3 class="ev-title">${esc(e._title)}</h3></div>
          </div>
          <p class="ev-body">${e._body}</p>
          ${(e.theories || []).map(contestBox).join("")}
          <div class="chips">${(e.minigames || []).filter((m) => MG[m]).map((m) => `<button class="chip chip-tape" data-goto-mg="${m}">▶ REPLAY: ${esc(MG[m].title)}</button>`).join("")}${gameChips(e.games)}${(e.chars || []).filter((c) => CH[c]).slice(0, 6).map((c) => `<button class="chip" data-open-char="${c}">${esc(CH[c].name)}</button>`).join("")}</div>
        </div>
      </article>`;
    });
    if (!evs.length) html = `<p class="tl-empty">NO TAPES MATCH THAT FILTER.</p>`;
    else if (!q && !tlFilter.ch && !tlFilter.contested) {
      html += `<div class="tl-end"><div class="era-badge"><span class="era-clock">6 AM</span><span class="era-name">TO BE CONTINUED…</span></div>
        <p>You survived the night. ${canonHeadline()}</p></div>`;
    }
    wrap.innerHTML = html;
    updateWalker();
  }
  function canonHeadline() {
    const killer = { william: "William Afton", vincent: "“Vincent”", dave: "“Dave Miller”" }[S.purple];
    const mimicy = S.glitchtrap === "mimic" || S.burntrap === "mimic";
    return `In your version, ${esc(killer)} started it all${mimicy ? ", and the Mimic carried his shadow forward." : ", and he never truly stopped."}`;
  }
  function initTimelineTools() {
    const sel = $("#tlChar");
    CHARACTERS.forEach((c) => { const o = document.createElement("option"); o.value = c.id; o.textContent = c.name; sel.appendChild(o); });
    $("#tlSearch").addEventListener("input", (e) => { tlFilter.q = e.target.value; renderTimeline(); });
    sel.addEventListener("change", (e) => { tlFilter.ch = e.target.value; renderTimeline(); });
    $("#tlContested").addEventListener("change", (e) => { tlFilter.contested = e.target.checked; renderTimeline(); });
    $("#tlClocks").innerHTML = ERAS.map((e) => `<button data-era-jump="${e.id}" title="${e.name}">${e.clock}</button>`).join("") + `<span>6 AM</span>`;
    $("#tlClocks").addEventListener("click", (e) => {
      const b = e.target.closest("[data-era-jump]");
      if (!b) return;
      const n = $(`.ev[data-era="${b.dataset.eraJump}"]`) || $(`#era-${b.dataset.eraJump}`);
      if (n) { blip(520); n.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); }
    });
    $("#tlWalker").innerHTML = SP.img("purpleguy", 30);
    window.addEventListener("scroll", updateWalker, { passive: true });
    const setTabsH = () => document.documentElement.style.setProperty("--tabs-h", $(".tabs").offsetHeight + "px");
    setTabsH();
    window.addEventListener("resize", () => { setTabsH(); updateWalker(); });
  }
  let lastFrac = 0;
  function updateWalker() {
    const tl = $("#timeline");
    const w = $("#tlWalker");
    if (!tl || !w || tl.offsetParent === null) return;
    const r = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    const frac = Math.max(0, Math.min(1, (vh * 0.4 - r.top) / Math.max(1, r.height - vh * 0.2)));
    w.style.left = `${3 + frac * 94}%`;
    w.classList.toggle("flip", frac < lastFrac);
    lastFrac = frac;
    // highlight current era clock
    let cur = 0;
    $$(".era", tl).forEach((n) => { if (n.getBoundingClientRect().top < vh * 0.45) cur = +n.dataset.era; });
    $$("#tlClocks button").forEach((b) => b.classList.toggle("on", +b.dataset.eraJump === cur));
  }
  function gotoEvent(id) {
    showTab("timeline");
    tlFilter.q = ""; tlFilter.ch = ""; tlFilter.contested = false;
    $("#tlSearch").value = ""; $("#tlChar").value = ""; $("#tlContested").checked = false;
    renderTimeline();
    const n = $(`#ev-${id}`);
    if (n) {
      n.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      n.classList.add("flash");
      setTimeout(() => n.classList.remove("flash"), 1800);
    }
  }

  // ---------------- THEORIES ----------------
  let thCat = "ALL";
  function affects(tid) {
    const evs = EVENTS.filter((e) => (e.theories || []).includes(tid) && (!e.when || e.when(S)));
    const chs = CHARACTERS.filter((c) => (c.theories || []).includes(tid));
    return { evs, chs };
  }
  function renderTheories() {
    const cats = ["ALL", ...new Set(THEORIES.map((t) => t.cat))];
    $("#thCats").innerHTML = cats.map((c) => `<button class="chip ${c === thCat ? "on" : ""}" data-thcat="${c}">${c}</button>`).join("");
    const list = THEORIES.filter((t) => thCat === "ALL" || t.cat === thCat);
    $("#theories").innerHTML = list.map((t) => {
      const sel = t.options.find((o) => o.id === S[t.id]) || t.options[0];
      const { evs, chs } = affects(t.id);
      const mgs = MINIGAMES.filter((m) => (m.theories || []).includes(t.id));
      return `<article class="panel th" id="th-${t.id}">
        <div class="th-top"><span class="th-cat">${t.cat}</span><span class="tag t-${sel.tag}">${sel.tag}</span></div>
        <h3 class="th-title">${esc(t.title)}</h3>
        <p class="th-q">${esc(t.q)}</p>
        <div class="th-opts">${t.options.map((o) => `<button class="th-opt" data-tid="${t.id}" data-oid="${o.id}" aria-pressed="${o.id === sel.id}"><span class="th-opt-l">${esc(o.label)}</span><span class="tag t-${o.tag}">${o.tag}</span></button>`).join("")}</div>
        <div class="th-detail">
          <p>${esc(sel.desc)}</p>
          <div class="pc">
            <div class="pro"><span class="for">FOR</span><ul>${sel.pro.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
            <div class="con"><span class="against">AGAINST</span><ul>${sel.con.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
          </div>
        </div>
        ${evs.length || chs.length || mgs.length ? `<div class="chips affects"><span class="chip" style="border:0;padding-left:0">AFFECTS:</span>${evs.map((e) => `<button class="chip" data-goto-event="${e.id}">⏱ ${esc(val(e.title))}</button>`).join("")}${chs.map((c) => `<button class="chip" data-open-char="${c.id}">☺ ${esc(c.name)}</button>`).join("")}${mgs.map((m) => `<button class="chip chip-tape" data-goto-mg="${m.id}">▶ ${esc(m.title)}</button>`).join("")}</div>` : ""}
      </article>`;
    }).join("");
  }
  $("#thCats").addEventListener("click", (e) => {
    const b = e.target.closest("[data-thcat]");
    if (!b) return;
    thCat = b.dataset.thcat; blip(600); renderTheories();
  });
  function gotoTheory(tid) {
    thCat = "ALL";
    showTab("theories");
    renderTheories();
    const n = $(`#th-${tid}`);
    if (n) {
      n.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      n.classList.add("flash");
      setTimeout(() => n.classList.remove("flash"), 1800);
    }
  }

  // ---------------- CHARACTERS ----------------
  function renderChars() {
    $("#chars").innerHTML = CHARACTERS.map((c) => {
      const aka = val(c.aka) || [];
      return `<button class="char" data-open-char="${c.id}">
        ${SP.img(c.sprite, 64)}
        <span class="char-name">${esc(c.name)}</span>
        <span class="char-role">${esc(c.role)}</span>
        ${aka.length ? `<span class="char-alias">aka ${esc(aka[0])}</span>` : ""}
      </button>`;
    }).join("");
  }
  function relationsOf(id) {
    const out = [];
    EDGES.forEach((e) => {
      const active = !e.when || e.when(S);
      if (!active) return;
      if (e.a === id && CH[e.b]) out.push({ other: e.b, label: e.rel, theory: !!e.when, kind: e.k });
      else if (e.b === id && CH[e.a]) out.push({ other: e.a, label: e.rev, theory: !!e.when, kind: e.k });
    });
    // merge duplicates per neighbour
    const m = new Map();
    out.forEach((r) => {
      if (!m.has(r.other)) m.set(r.other, { ...r, labels: [r.label] });
      else { const x = m.get(r.other); if (!x.labels.includes(r.label)) x.labels.push(r.label); x.theory = x.theory || r.theory; x.kind = x.kind || r.kind; }
    });
    return [...m.values()];
  }
  let dossierId = null;
  function dossierHTML(id) {
    const c = CH[id];
    const aka = val(c.aka) || [];
    const forms = val(c.forms) || [];
    const rels = relationsOf(id);
    const evs = eventsResolved().filter((e) => (e.chars || []).includes(id));
    return `<div class="dos-head">
        ${SP.img(c.sprite, 88)}
        <div><h2>${esc(c.name)}</h2><div class="muted">${esc(c.role)}</div>${aka.length ? `<div class="char-alias">aka ${aka.map(esc).join(" · ")}</div>` : ""}</div>
        <button class="btn btn-sm dos-close" data-close-dossier aria-label="Close">X</button>
      </div>
      <div class="dos-body">
        <div><h3>FILE</h3><p style="margin:0">${val(c.bio)}</p></div>
        ${forms.length ? `<div><h3>FORMS</h3><div class="forms">${forms.map((f) => SP.img(f, 48)).join("")}</div></div>` : ""}
        ${(c.theories || []).length ? `<div><h3>CONTESTED</h3>${c.theories.map(contestBox).join("")}</div>` : ""}
        ${rels.length ? `<div><h3>CONNECTIONS</h3><ul class="rel-list">${rels.map((r) => `<li>${SP.img(CH[r.other].sprite, 24)}<span>${esc(r.labels.join(" · "))}</span> <button data-open-char="${r.other}">${esc(CH[r.other].name)}</button>${r.theory ? ` <span class="rel-theory">THEORY</span>` : ""}</li>`).join("")}</ul></div>` : ""}
        ${evs.length ? `<div><h3>APPEARS IN</h3><div class="chips">${evs.map((e) => `<button class="chip" data-goto-event="${e.id}">${esc(e._year)} · ${esc(e._title)}</button>`).join("")}</div></div>` : ""}
        <div class="row"><button class="btn btn-sm" data-web="${id}">VIEW IN CONNECTIONS ▸</button></div>
      </div>`;
  }
  function openDossier(id) {
    const d = $("#dossier");
    dossierId = id;
    d.innerHTML = dossierHTML(id);
    if (!d.open) { if (d.showModal) d.showModal(); else d.setAttribute("open", ""); }
    d.scrollTop = 0;
    blip(740);
  }
  function closeDossier() {
    const d = $("#dossier");
    dossierId = null;
    if (d.open) { if (d.close) d.close(); else d.removeAttribute("open"); }
  }
  $("#dossier").addEventListener("click", (e) => {
    if (e.target.closest("[data-close-dossier]") || e.target === e.currentTarget) closeDossier();
  });
  $("#dossier").addEventListener("close", () => { dossierId = null; });

  // ---------------- CONNECTIONS (radial web) ----------------
  let webCenter = "william";
  function renderWeb() {
    $("#webList").innerHTML = CHARACTERS.map((c) => `<button data-webpick="${c.id}" aria-current="${c.id === webCenter}">${SP.img(c.sprite, 28)}<span>${esc(c.name)}</span></button>`).join("");
    const rels = relationsOf(webCenter);
    const W = 980, H = 700, cx = W / 2, cy = H / 2;
    const n = rels.length;
    const RX = n > 6 ? 380 : 300, RY = n > 10 ? 292 : n > 6 ? 265 : 220;
    const nodeW = 150, nodeH = 46;
    const pos = rels.map((r, i) => {
      const a = -Math.PI / 2 + ((i + (n > 8 ? 0.5 : 0)) / Math.max(1, n)) * Math.PI * 2;
      return { ...r, x: cx + Math.cos(a) * RX, y: cy + Math.sin(a) * RY, i };
    });
    const colorOf = (r) => (r.theory ? "var(--gold)" : r.kind === "kill" ? "var(--red)" : "var(--cyan)");
    const node = (id, x, y, center, label, color) => {
      const c = CH[id];
      const w = center ? 190 : 176, h = center ? 60 : 56;
      const sz = center ? 44 : 36;
      const nm = c.name.length > 16 && !center ? c.name.slice(0, 15) + "…" : c.name;
      const lb = label ? (label.length > 21 ? label.slice(0, 20) + "…" : label) : "";
      return `<g class="node" data-webpick="${id}" transform="translate(${x - w / 2},${y - h / 2})" tabindex="0" role="button" aria-label="${esc(c.name)}${label ? ": " + esc(label) : ""}">
        <title>${esc(c.name)}${label ? " — " + esc(label) : ""}</title>
        <rect width="${w}" height="${h}" fill="${center ? "#231c06" : "#110e1f"}" stroke="${center ? "var(--gold)" : color}" stroke-width="3"/>
        <image href="${SP.url(c.sprite)}" x="6" y="${(h - sz) / 2}" width="${sz}" height="${sz}" style="image-rendering:pixelated"/>
        ${center
          ? `<text x="${sz + 14}" y="${h / 2 + 7}" font-size="22">${esc(nm)}</text>`
          : `<text x="${sz + 12}" y="23" font-size="18">${esc(nm)}</text><text x="${sz + 12}" y="44" font-size="15" style="fill:${color}">${esc(lb)}</text>`}
      </g>`;
    };
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Connections of ${esc(CH[webCenter].name)}">`;
    pos.forEach((p) => {
      svg += `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="${colorOf(p)}" stroke-width="3" ${p.theory ? 'stroke-dasharray="8 6"' : ""}/>`;
    });
    pos.forEach((p) => { svg += node(p.other, p.x, p.y, false, p.labels.join(" · "), colorOf(p)); });
    svg += node(webCenter, cx, cy, true);
    if (!n) svg += `<text x="${cx}" y="${cy + 70}" text-anchor="middle" font-size="18" fill="#9a91c4">No connections in your current canon.</text>`;
    svg += `</svg>`;
    $("#webStage").innerHTML = svg;

    const c = CH[webCenter];
    $("#webDetail").innerHTML = `<div class="dos-head" style="background:none;border:0;padding:0 0 10px">${SP.img(c.sprite, 56)}<div><h2 class="h2" style="margin:0 0 4px">${esc(c.name)}</h2><span class="muted">${esc(c.role)}</span></div><button class="btn btn-sm dos-close" data-open-char="${c.id}">OPEN FILE</button></div>
      <ul class="rel-list">${rels.map((r) => `<li>${SP.img(CH[r.other].sprite, 24)}<span>${esc(r.labels.join(" · "))}</span> <button data-webpick="${r.other}">${esc(CH[r.other].name)}</button>${r.theory ? ` <span class="rel-theory">THEORY</span>` : ""}</li>`).join("")}</ul>`;
  }
  function pickWeb(e) {
    const b = e.target.closest("[data-webpick]");
    if (!b) return;
    webCenter = b.dataset.webpick;
    blip(500 + Math.random() * 300);
    renderWeb();
  }
  ["#webList", "#webStage", "#webDetail"].forEach((s) => $(s).addEventListener("click", pickWeb));
  $("#webStage").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickWeb(e); } });

  // ---------------- ARCHIVE ----------------
  function canonText() {
    const lines = ["MY FNAF CANON (Lore Tapes)", "=".repeat(28)];
    THEORIES.forEach((t) => {
      const o = t.options.find((x) => x.id === S[t.id]);
      lines.push(`• ${t.title}\n  → ${o.label} [${o.tag}]`);
    });
    lines.push("", strip(canonHeadline()));
    return lines.join("\n");
  }
  function renderArchive() {
    $("#canonText").textContent = canonText();
    $("#gamesList").innerHTML = Object.entries(GAMES).filter(([k]) => k !== "BOOKS").map(([k, g]) => `<div class="game"><span><b>${esc(g.n)}</b> <span class="muted">(${k})</span></span><span>${g.y}</span></div>`).join("");
    $("#glossary").innerHTML = GLOSSARY.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("");
    $("#continuities").innerHTML = CONTINUITIES.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("");
  }
  async function copy(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMsg);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast(okMsg); } catch (e2) { toast("COPY FAILED, SELECT THE TEXT MANUALLY"); }
      ta.remove();
    }
    jingle();
  }
  $("#copyCanon").addEventListener("click", () => copy(canonText(), "CANON COPIED TO CLIPBOARD"));
  $("#resetCanon").addEventListener("click", () => applyChanges(() => { S = defaults(); }, "RESET TO MAINSTREAM"));
  $("#shareBtn").addEventListener("click", () => {
    const u = new URL(location.href);
    u.searchParams.set("c", encode(S));
    copy(u.toString(), "SHARE LINK COPIED! YOUR CANON IS IN THE URL");
  });
  function syncSoundBtn() {
    const b = $("#soundBtn");
    b.setAttribute("aria-pressed", String(soundOn));
    b.textContent = `SFX: ${soundOn ? "ON" : "OFF"}`;
  }
  $("#soundBtn").addEventListener("click", () => {
    soundOn = !soundOn;
    store.set("loretapes.sfx", soundOn ? "1" : "0");
    syncSoundBtn();
    if (soundOn) jingle();
  });

  // ---------------- MINIGAMES (storyboard replays) ----------------
  let mgId = MINIGAMES.length ? MINIGAMES[0].id : null;
  let mgBeat = 0, mgAuto = false, mgTimer = null, mgType = null;
  function mgStop() { mgAuto = false; clearTimeout(mgTimer); syncMgAuto(); }
  function syncMgAuto() {
    const b = $("#mgAuto");
    if (b) { b.setAttribute("aria-pressed", String(mgAuto)); b.textContent = mgAuto ? "❚❚ PAUSE" : "AUTO ▶▶"; }
  }
  function renderMgGrid() {
    const games = [...new Set(MINIGAMES.map((m) => m.game))];
    $("#mgGrid").innerHTML = games.map((g) => `<div class="mg-group"><h3 class="mg-group-h">${esc(g)} <span class="muted">· ${esc(GAMES[g] ? GAMES[g].n : g)}</span></h3><div class="mg-row">${
      MINIGAMES.filter((m) => m.game === g).map((m) => `<button class="mg-cab" data-mg="${m.id}" aria-current="${m.id === mgId}">${SP.img(m.icon, 40)}<span class="mg-cab-t">${esc(m.title)}</span></button>`).join("")
    }</div></div>`).join("");
  }
  function renderMgLore() {
    const m = MG[mgId];
    if (!m || !$("#mgLore")) return;
    $("#mgLore").innerHTML = `
      <h2 class="h2">${esc(m.title)}</h2>
      <div class="chips" style="margin:0 0 10px"><span class="chip">${esc(m.game)} · ${esc(GAMES[m.game] ? GAMES[m.game].n : m.game)}</span><span class="chip">${esc(m.when)}</span></div>
      <h3 class="mg-h3">WHAT IT REVEALS</h3>
      <p class="mg-lore">${m.lore(S)}</p>
      ${(m.theories || []).length ? `<h3 class="mg-h3">CONTESTED</h3>${m.theories.map(contestBox).join("")}` : ""}
      ${(m.events || []).length ? `<h3 class="mg-h3" style="margin-top:12px">ON THE TIMELINE</h3><div class="chips">${m.events.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean).map((e) => `<button class="chip" data-goto-event="${e.id}">⏱ ${esc(val(e.title))}</button>`).join("")}</div>` : ""}`;
  }
  function typeCaption(text) {
    const el = $("#mgCap");
    clearInterval(mgType);
    if (reduced) { el.textContent = text; return; }
    let i = 0;
    el.textContent = "";
    mgType = setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(mgType);
    }, 18);
  }
  function renderBeat(fresh) {
    const m = MG[mgId];
    if (!m) return;
    const b = m.beats[mgBeat];
    const scr = $("#mgScreen");
    const layer = $("#mgActors");
    if (fresh) layer.innerHTML = "";
    scr.className = `mg-screen bg-${b.bg}${b.fx ? " fx-" + b.fx : ""}`;
    const counts = {}, keep = new Set();
    b.s.forEach(([id, x, y = 0, mods = ""]) => {
      counts[id] = (counts[id] || 0) + 1;
      const key = `${id}#${counts[id]}`;
      keep.add(key);
      let el = layer.querySelector(`[data-key="${key}"]`);
      if (!el) {
        el = document.createElement("div");
        el.dataset.key = key;
        el.innerHTML = SP.img(id, 64);
        el.style.left = x + "%";
        el.style.bottom = 12 + y + "%";
        layer.appendChild(el);
        mods += " enter";
      }
      el.className = `actor ${mods}`;
      el.style.left = x + "%";
      el.style.bottom = 12 + y + "%";
    });
    $$(".actor", layer).forEach((el) => { if (!keep.has(el.dataset.key)) layer.removeChild(el); });
    $("#mgBanner").textContent = b.banner || "";
    $("#mgBanner").hidden = !b.banner;
    $("#mgCount").textContent = `${mgBeat + 1} / ${m.beats.length}`;
    $("#mgMarquee").textContent = m.title.toUpperCase();
    $("#mgPrev").disabled = mgBeat === 0;
    $("#mgNext").textContent = mgBeat === m.beats.length - 1 ? "REPLAY ↺" : "NEXT ▶";
    typeCaption(b.cap);
    if (b.fx === "glitch") glitchSfx(); else blip(330 + mgBeat * 110, 0.07);
    if (mgAuto) {
      clearTimeout(mgTimer);
      mgTimer = setTimeout(() => {
        if (mgBeat < m.beats.length - 1) { mgBeat++; renderBeat(); } else mgStop();
      }, 1800 + b.cap.length * 32);
    }
  }
  function loadMinigame(id) {
    if (!MG[id]) return;
    mgId = id; mgBeat = 0;
    clearTimeout(mgTimer);
    renderMgGrid();
    renderMgLore();
    renderBeat(true);
  }
  function renderMinigames() {
    if (!$("#mgGrid").children.length) renderMgGrid();
    renderMgLore();
    if (!$("#mgActors").children.length) renderBeat(true);
  }
  function gotoMinigame(id) {
    showTab("minigames");
    loadMinigame(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  $("#mgGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-mg]");
    if (!b) return;
    mgStop();
    loadMinigame(b.dataset.mg);
    $("#mgCab").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  });
  $("#mgPrev").addEventListener("click", () => { mgStop(); if (mgBeat > 0) { mgBeat--; renderBeat(); } });
  $("#mgNext").addEventListener("click", () => {
    const m = MG[mgId];
    if (mgBeat < m.beats.length - 1) { mgBeat++; renderBeat(); } else { mgBeat = 0; renderBeat(true); }
  });
  $("#mgAuto").addEventListener("click", () => {
    mgAuto = !mgAuto;
    syncMgAuto();
    if (mgAuto) {
      const m = MG[mgId];
      if (mgBeat >= m.beats.length - 1) mgBeat = 0;
      renderBeat(mgBeat === 0);
    } else clearTimeout(mgTimer);
  });
  $("#mgScreen").addEventListener("click", () => $("#mgNext").click());
  document.addEventListener("keydown", (e) => {
    if ($("#tab-minigames").hidden || $("#dossier").open) return;
    if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowRight") { e.preventDefault(); $("#mgNext").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $("#mgPrev").click(); }
  });

  // ---------------- GRAND THEORIES (complete timelines) ----------------
  const GRAND = window.LORE.GRAND || [];
  const GRAND_COMPARE = window.LORE.GRAND_COMPARE || [];
  let grandId = GRAND.length ? GRAND[0].id : null;
  const grandState = (g) => ({ ...defaults(), ...(g.set || {}) });
  const optLabel = (tid, oid) => { const o = TH[tid].options.find((x) => x.id === oid); return o ? o.label : oid; };
  function grandMatch(g) {
    const st = grandState(g);
    const same = THEORIES.filter((t) => st[t.id] === S[t.id]).length;
    return Math.round((same / THEORIES.length) * 100);
  }
  function renderGrand() {
    if (!$("#grandPick") || !GRAND.length) return;
    const g = GRAND.find((x) => x.id === grandId) || GRAND[0];
    const best = GRAND.reduce((a, b) => (grandMatch(b) > grandMatch(a) ? b : a));
    $("#grandPick").innerHTML = GRAND.map((x) => {
      const pct = grandMatch(x);
      return `<button class="grand-card" data-grand="${x.id}" aria-current="${x.id === g.id}">
        ${SP.img(x.sprite, 48)}
        <span class="grand-card-body">
          <span class="grand-card-name">${esc(x.name)}</span>
          <span class="tag t-${x.tag}">${x.tag}</span>
          <span class="grand-meter" title="How closely your current canon matches"><span style="width:${pct}%"></span></span>
          <span class="grand-pct">${pct}% MATCH${x.id === best.id ? " · CLOSEST" : ""}</span>
        </span>
      </button>`;
    }).join("");

    const st = grandState(g);
    const pivots = THEORIES.filter((t) => g.set && g.set[t.id] && g.set[t.id] !== t.options[0].id);
    $("#grandDetail").innerHTML = `
      <div class="panel grand-info">
        <div class="grand-head">${SP.img(g.sprite, 64)}<div><h2 class="h2" style="margin:0 0 6px">${esc(g.name)}</h2><span class="tag t-${g.tag}">${g.tag}</span> <span class="muted">${esc(g.since)}</span></div></div>
        <p>${esc(g.summary)}</p>
        <h3 class="mg-h3">WHAT MAKES IT DIFFERENT</h3>
        <ul class="grand-diffs">${g.differences.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        ${pivots.length ? `<h3 class="mg-h3">ITS KEY CALLS <span class="muted" style="font-family:var(--font-body);font-size:16px;letter-spacing:0">(where it breaks from the mainstream)</span></h3>
          <div class="chips" style="margin:0 0 12px">${pivots.map((t) => `<button class="chip" data-goto-theory="${t.id}" title="${esc(t.title)}">${esc(t.short)}: ${esc(optLabel(t.id, st[t.id]))}</button>`).join("")}</div>` : `<p class="muted">This is the baseline: every other grand theory is measured against it.</p>`}
        <div class="row">
          <button class="btn btn-sm" data-grand-load="${g.id}">LOAD INTO MY CANON</button>
          <span class="grand-pct" style="align-self:center">YOUR CANON: ${grandMatch(g)}% MATCH</span>
        </div>
      </div>
      <div class="panel grand-tl">
        <h3 class="mg-h3">THE CONDENSED TIMELINE</h3>
        ${g.sections.map((sec, i) => `<details class="grand-sec" ${i < 2 ? "open" : ""}>
          <summary><span class="grand-sec-n">${String(i + 1).padStart(2, "0")}</span> ${esc(sec.name)} <span class="muted">· ${sec.beats.length}</span></summary>
          <ol class="grand-beats">${sec.beats.map(([y, t]) => `<li><span class="grand-y">${esc(y)}</span><span>${esc(t)}</span></li>`).join("")}</ol>
        </details>`).join("")}
        <div class="row" style="margin-top:10px"><button class="btn btn-sm" data-grand-expand>EXPAND ALL</button></div>
      </div>`;

    // comparison table
    const base = grandState(GRAND[0]);
    $("#grandCmp").innerHTML = `<thead><tr><th scope="col">QUESTION</th>${GRAND.map((x) => `<th scope="col" class="${x.id === g.id ? "sel" : ""}"><button data-grand="${x.id}">${SP.img(x.sprite, 24)}<span>${esc(x.name)}</span></button></th>`).join("")}<th scope="col" class="you">YOU</th></tr></thead>
      <tbody>${GRAND_COMPARE.filter((tid) => TH[tid]).map((tid) => `<tr>
        <th scope="row"><button data-goto-theory="${tid}">${esc(TH[tid].short)}</button></th>
        ${GRAND.map((x) => { const v = grandState(x)[tid]; const cls = [x.id === g.id ? "sel" : "", v !== base[tid] ? "diff" : "", v === S[tid] ? "mine" : ""].join(" "); return `<td class="${cls}">${esc(optLabel(tid, v))}</td>`; }).join("")}
        <td class="you">${esc(optLabel(tid, S[tid]))}</td>
      </tr>`).join("")}</tbody>`;
  }
  ["#grandPick", "#grandCmp"].forEach((sel) => $(sel) && $(sel).addEventListener("click", (e) => {
    const b = e.target.closest("[data-grand]");
    if (!b) return;
    grandId = b.dataset.grand;
    blip(520);
    renderGrand();
    if (sel === "#grandCmp") $("#grandDetail").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }));
  $("#grandDetail") && $("#grandDetail").addEventListener("click", (e) => {
    const ld = e.target.closest("[data-grand-load]");
    if (ld) {
      const g = GRAND.find((x) => x.id === ld.dataset.grandLoad);
      applyChanges(() => { S = grandState(g); }, `LOADED: ${g.name.toUpperCase()}`);
      return;
    }
    if (e.target.closest("[data-grand-expand]")) {
      const secs = $$(".grand-sec", $("#grandDetail"));
      const allOpen = secs.every((d) => d.open);
      secs.forEach((d) => { d.open = !allOpen; });
      e.target.textContent = allOpen ? "EXPAND ALL" : "COLLAPSE ALL";
    }
  });

  // ---------------- tabs ----------------
  const TABS = ["timeline", "grand", "minigames", "theories", "characters", "web", "archive"];
  function showTab(name, fromHash) {
    if (!TABS.includes(name)) name = "timeline";
    TABS.forEach((t) => {
      const sec = $(`#tab-${t}`);
      sec.hidden = t !== name;
    });
    $$(".tabs [data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    if (!fromHash) {
      try { history.replaceState(null, "", location.pathname + location.search + "#" + name); } catch (e) { /* ignore */ }
    }
    if (name === "web") renderWeb();
    if (name === "minigames") renderMinigames();
    if (name === "archive") renderArchive();
    if (name !== "minigames") mgStop();
    if (name === "timeline") requestAnimationFrame(updateWalker);
  }
  $(".tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (!b) return;
    blip(440);
    showTab(b.dataset.tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  $(".tabs").addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const btns = $$(".tabs [data-tab]");
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    const nb = btns[(i + (e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length];
    nb.focus(); nb.click();
  });
  window.addEventListener("hashchange", () => showTab(location.hash.slice(1), true));

  // ---------------- render all ----------------
  function renderAll() {
    renderTimeline();
    renderTheories();
    renderChars();
    renderMgLore();
    renderGrand();
    if (!$("#tab-web").hidden) renderWeb();
    if (!$("#tab-archive").hidden) renderArchive();
    if (dossierId) {
      const d = $("#dossier");
      const st = d.scrollTop;
      d.innerHTML = dossierHTML(dossierId);
      d.scrollTop = st;
    }
  }

  // ---------------- boot screen ----------------
  function fillSprites(root) {
    $$("[data-spr]", root).forEach((n) => { n.innerHTML = SP.img(n.dataset.spr, 48); });
  }
  function boot() {
    const el = $("#boot");
    const done = () => {
      el.classList.add("gone");
      store.sset("loretapes.booted", "1");
      jingle();
      $(".tabs [aria-selected='true']") && $(".tabs [aria-selected='true']").focus({ preventScroll: true });
    };
    if (store.sget("loretapes.booted") === "1" || new URLSearchParams(location.search).has("skipintro")) { el.classList.add("gone"); return; }
    fillSprites(el);
    $("#bootWalker").innerHTML = SP.img("purpleguy", 48);
    const lines = [
      "LORE TAPES BIOS v1.987",
      "MEMORY CHECK ......... 640K OK",
      "LOADING CASSETTE ..... ████████ OK",
      `THEORIES INDEXED ..... ${THEORIES.length}`,
      `EVENTS ON RECORD ..... ${EVENTS.length}`,
      "WARNING: SPRING-LOCKS UNSTABLE",
    ];
    const log = $("#bootLog");
    let i = 0;
    const title = $("#bootTitle");
    const step = () => {
      if (i < lines.length) { log.textContent += (i ? "\n" : "") + "> " + lines[i++]; setTimeout(step, reduced ? 0 : 170); }
      else { title.classList.add("show"); $("#startBtn").focus(); }
    };
    step();
    $("#startBtn").addEventListener("click", done);
    el.addEventListener("keydown", (e) => { if (e.key === "Escape") done(); });
  }

  // ---------------- init ----------------
  fillSprites(document.querySelector(".top"));
  initPresets();
  initTimelineTools();
  syncSoundBtn();
  renderAll();
  showTab(location.hash.slice(1) || "timeline", true);
  persist();
  boot();
})();
