/* =========================================================
   EXPANSION: Secret of the Mimic, Help Wanted 1 & 2, and
   other side releases. New theories are appended so old
   share links keep their meaning.
   Loaded after grand.js and before app.js.
   ========================================================= */
(function () {
  const L = window.LORE;
  const KSHORT = (s) => ({ william: "William", vincent: "“Vincent”", dave: "“Dave”" })[s.purple];
  const ev = (id) => L.EVENTS.find((e) => e.id === id);

  // ---------- games / sources ----------
  Object.assign(L.GAMES, {
    DREAD: { n: "Curse of Dreadbear (Help Wanted DLC)", y: 2019 },
    SD: { n: "Special Delivery", y: 2019 },
  });

  // ---------- new theories ----------
  L.THEORIES.push(
    {
      id: "mcm_designs", cat: "ORIGINS", short: "MCM designs",
      title: "How did Murray's designs end up at Fazbear's?",
      q: "Secret of the Mimic takes you through Murray's Costume Manor (MCM), Edwin Murray's company, where familiar-looking mascot designs show up years before Freddy's became famous.",
      options: [
        { id: "poached", label: "Poached by Afton", tag: "POPULAR", desc: "The characters began as MCM designs, and William Afton took them, along with ideas from Edwin's work, and built them into Fredbear's and Freddy's.", pro: ["It fits Afton's pattern of taking other people's work and twisting it.", "It explains why MCM's designs echo the Fazbear cast so closely."], con: ["How directly Afton was involved, rather than Fazbear Entertainment as a company, is still debated."] },
        { id: "acquired", label: "Bought or licensed", tag: "POPULAR", desc: "MCM's work passed to Fazbear Entertainment through a business deal, and Afton built on what the company owned.", pro: ["Fazbear Entertainment absorbing other companies' tech is a recurring theme."], con: ["It's less dramatic, and it doesn't explain the bad blood."] },
        { id: "parallel", label: "Parallel designs", tag: "FRINGE", desc: "The MCM designs are a separate line that only resembles the Fazbear cast.", pro: ["It's the cautious, minimal reading."], con: ["The resemblance is clearly deliberate."] },
      ],
    },
    {
      id: "hw2_player", cat: "IDENTITY", short: "HW2 protagonist",
      title: "Who is Help Wanted 2's protagonist?",
      q: "Help Wanted 2's player is a new Fazbear “employee” working through VR jobs. Its secrets point back to the Bite of '83, and to the boys in masks who were there.",
      options: [
        { id: "bonnie_bro", label: "The “Bonnie bro”", tag: "POPULAR", desc: "The player is the friend in the Bonnie mask who helped Michael carry the Crying Child to Fredbear in FNAF4's final scene. Grown up, he's being pulled back to what he helped cause.", pro: ["HW2's story leans heavily on the Bite of '83 and the masked boys.", "It gives one of FNAF's biggest unnamed characters a story."], con: ["The connection comes from hints and symbolism rather than a direct statement."] },
        { id: "cassie", label: "Cassie", tag: "POPULAR", desc: "HW2 follows Cassie, linking it straight to Ruin and her VR headset.", pro: ["Ruin ends close to HW2 in time and theme."], con: ["It sits awkwardly with the Bite of '83 focus."] },
        { id: "employee", label: "A new nobody", tag: "FRINGE", desc: "Just another unlucky Fazbear employee. The Bite of '83 material is atmosphere.", pro: ["It's the safest reading."], con: ["It ignores HW2's deliberate callbacks."] },
      ],
    },
    {
      id: "coverup", cat: "CANON", short: "The cover-up",
      title: "Are the FNAF games part of a cover-up within the story?",
      q: "Help Wanted's hidden tapes describe Fazbear Entertainment turning its history into “just a game” to bury the truth.",
      options: [
        { id: "yes", label: "Yes: propaganda", tag: "MAINSTREAM", desc: "Within the story, Fazbear Entertainment backs the games, Help Wanted included, so the real incidents look like urban legends and fiction.", pro: ["Help Wanted's tapes frame the VR game as part of a rebranding effort.", "It explains how the company survives its own history."], con: ["How far it reaches (all the games, or only the VR one) is unclear."] },
        { id: "vr_only", label: "Only the VR game", tag: "POPULAR", desc: "Only the Freddy Fazbear Virtual Experience is the PR stunt. The earlier games aren't objects inside the story.", pro: ["It's the narrowest reading of the tapes."], con: ["It drops one of Help Wanted's most memorable twists."] },
        { id: "meta", label: "A meta joke", tag: "FRINGE", desc: "A fourth-wall wink, not lore.", pro: ["The series loves meta humour."], con: ["The tapes treat it seriously."] },
      ],
    }
  );

  // ---------- characters & sprites ----------
  L.CHARACTERS.push(
    {
      id: "bonniebro", name: "The “Bonnie bro”", sprite: "bonniebro", role: "Michael's friend at the Bite",
      aka: (s) => (s.hw2_player === "bonnie_bro" ? ["HW2's protagonist?"] : []),
      forms: () => ["bonniebro"], games: ["FNAF4", "HW2"], theories: ["hw2_player"],
      bio: (s) => `One of the older boys in FNAF4's final scene, wearing a Bonnie mask, who helped Michael carry the Crying Child up to Fredbear. The others wore Freddy and Chica masks. None of them are ever named. ${({ bonnie_bro: "In your canon, he grows up to be Help Wanted 2's protagonist, drawn back into Fazbear's orbit by what he did.", cassie: "In your canon, he's not HW2's protagonist (that's Cassie), and his fate is unknown.", employee: "In your canon, his fate is unknown." })[s.hw2_player]}`,
    },
    {
      id: "tapegirl", name: "Tape Girl", sprite: "tapegirl", role: "Help Wanted's hidden tapes",
      aka: () => ["(fan name)"], forms: () => ["tapegirl", "tape"], games: ["HW"], theories: ["coverup", "glitchtrap"],
      bio: (s) => `The unnamed woman whose cassette tapes are hidden throughout Help Wanted. Through them she reveals the company's plan to rebrand its history as fiction, and the strange, dangerous thing hiding in the code. ${s.glitchtrap === "mimic" ? "In your canon, the thing she's warning about is the Mimic's copy of Afton." : "In your canon, she's warning about Afton's digital ghost."}`,
    }
  );
  L.EDGES.push(
    { a: "bonniebro", b: "michael", rel: "friend of", rev: "friend of" },
    { a: "bonniebro", b: "cc", rel: "helped carry (Bite of '83)", rev: "carried by", k: "kill" },
    { a: "tapegirl", b: "william", rel: "warns about (Glitchtrap)", rev: "exposed by", when: (s) => s.glitchtrap === "afton" },
    { a: "tapegirl", b: "mimic", rel: "warns about (Glitchtrap)", rev: "exposed by", when: (s) => s.glitchtrap === "mimic" },
    { a: "william", b: "edwin", rel: "poached designs from", rev: "designs poached by", when: (s) => s.mcm_designs === "poached" },
    { a: "edwin", b: "william", rel: "designs passed to", rev: "inherited designs from", when: (s) => s.mcm_designs === "acquired" }
  );
  const edwin = L.CHARACTERS.find((c) => c.id === "edwin");
  if (edwin) {
    edwin.theories = edwin.theories.concat(["mcm_designs"]);
    edwin.role = "Founder of Murray's Costume Manor";
    edwin.bio = (s) => `The founder of <b>Murray's Costume Manor</b> and creator of the Mimic. Secret of the Mimic explores his company and workshop. ${({ poached: `In your canon, the mascot designs that became Fredbear's and Freddy's began at MCM, before ${KSHORT(s)} Afton poached them.`, acquired: "In your canon, his designs passed to Fazbear Entertainment through a business deal.", parallel: "In your canon, MCM's designs are a separate line that only resembles the Fazbear cast." })[s.mcm_designs]}`;
  }

  // ---------- timeline events ----------
  L.EVENTS.push(
    {
      id: "mcm", era: 0, order: 5, year: "Before Fredbear's",
      title: "Murray's Costume Manor",
      sprites: ["edwin", "springbonnie", "fredbear"], games: ["SOTM"], chars: ["edwin", "william"],
      theories: ["mcm_designs"],
      body: (s) => `Before there was a Fredbear's, there was <b>Murray's Costume Manor (MCM)</b>, Edwin Murray's costume and animatronics company. Secret of the Mimic (2025) shows that mascot designs the series would make famous first took shape there. ` + ({
        poached: `In your canon, <b>${KSHORT(s)} Afton poached them</b>, carrying MCM's ideas into Fredbear's Family Diner and leaving Murray behind.`,
        acquired: `In your canon, the designs passed to Fazbear Entertainment <b>through a business deal</b>, and Afton built on what the company owned.`,
        parallel: `In your canon, MCM's designs are a <b>separate line</b> that only resembles what came later.`,
      })[s.mcm_designs],
    },
    {
      id: "masks", era: 0, order: 29.5, year: "1983",
      title: "The boys in the masks",
      sprites: ["michael", "bonniebro"], games: ["FNAF4", "HW2"], chars: ["michael", "bonniebro", "cc"],
      theories: ["hw2_player"], minigames: ["fnaf4_days"],
      body: (s) => `Michael doesn't act alone. In FNAF4's final scene, his friends in <b>Freddy, Bonnie and Chica masks</b> laugh along and help lift the Crying Child up to Fredbear. They're never named, and for decades they were just background. ` + ({
        bonnie_bro: `In your canon, the boy in the Bonnie mask, the <b>“Bonnie bro”</b>, comes back as Help Wanted 2's protagonist.`,
        cassie: `In your canon, they stay nameless, and Help Wanted 2's player is Cassie instead.`,
        employee: `In your canon, they stay nameless.`,
      })[s.hw2_player],
    },
    {
      id: "coverup", era: 4, order: 108, year: "Present day",
      title: "Fazbear's cover story",
      sprites: ["tapegirl", "tape"], games: ["HW"], chars: ["tapegirl"],
      theories: ["coverup"],
      body: (s) => `Hidden cassette tapes in Help Wanted, left by a woman fans call <b>Tape Girl</b>, reveal Fazbear Entertainment's strategy: if the horrors are entertainment, nobody believes they were real. ` + ({
        yes: `In your canon, the games themselves are part of that <b>cover-up</b>, propaganda to turn real murders into an urban legend.`,
        vr_only: `In your canon, only the <b>VR game</b> is the PR stunt.`,
        meta: `In your canon, it's a <b>fourth-wall joke</b>, not lore.`,
      })[s.coverup],
    },
    {
      id: "dreadbear", era: 4, order: 111, year: "Present day",
      title: "Curse of Dreadbear",
      sprites: ["freddy", "fire"], games: ["DREAD"], chars: [],
      body: () => `A Halloween expansion for Help Wanted (2019) with spooky remixed characters like Dreadbear and Grim Foxy. It's mostly seasonal fun with light lore, but it shows the VR project spreading further, along with whatever is hiding in it.`,
    },
    {
      id: "special_delivery", era: 4, order: 113, year: "Present day",
      title: "Special Delivery",
      sprites: ["freddy", "glitchtrap"], games: ["SD"], chars: [],
      body: () => `An augmented-reality mobile game (2019) where Fazbear Entertainment's service sends animatronics to your home. The setup itself is the joke: a company that never learns, putting its machines into living rooms. Its event lore touches the same digital-era threats as Help Wanted.`,
    },
    {
      id: "world", era: 3, order: 104, year: "Outside time",
      title: "FNaF World (side story)",
      sprites: ["fredbear", "freddy"], games: ["WORLD"], chars: [],
      body: () => `A whimsical 2016 RPG spin-off, generally treated as non-canon. Even so, it hides a few lore-tinged secrets and hints, and fans still mine them for clues.`,
    }
  );
  Object.assign(L.GAMES, { WORLD: L.GAMES.WORLD || { n: "FNaF World", y: 2016 } });

  // enrich existing events
  const hw = ev("hw");
  if (hw) {
    hw.theories = (hw.theories || []).concat(["coverup"]);
    hw.chars = (hw.chars || []).concat(["tapegirl"]);
  }
  const hw2 = ev("hw2");
  if (hw2) {
    hw2.sprites = ["glitchtrap", "bonniebro"];
    hw2.chars = ["bonniebro", "cassie"];
    hw2.theories = ["hw2_player", "glitchtrap"];
    hw2.body = (s) => `Fazbear returns to VR with a new “employee experience” made of mini-jobs that remix the classic games. Under the arcade surface, its secrets reach back to the <b>Bite of '83</b>. ` + ({
      bonnie_bro: `In your canon, the player is the <b>“Bonnie bro”</b>, the masked friend who helped carry the Crying Child to Fredbear, now an adult who can't escape what he did.`,
      cassie: `In your canon, the player is <b>Cassie</b>, continuing her story from Ruin.`,
      employee: `In your canon, the player is just <b>another unlucky employee</b>.`,
    })[s.hw2_player] + ` The digital rabbit is never far away${s.glitchtrap === "mimic" ? ", and in your canon it's the Mimic underneath" : ""}.`;
  }
  const mo = ev("mimic_origin");
  if (mo) {
    mo.theories = ["books", "mcm_designs"];
    mo.chars = ["edwin", "mimic"];
  }

  // ---------- grand timelines ----------
  const g = (id) => (L.GRAND || []).find((x) => x.id === id);
  const addBeat = (gid, secIdx, beat, at) => { const x = g(gid); if (x && x.sections[secIdx]) x.sections[secIdx].beats.splice(at == null ? x.sections[secIdx].beats.length : at, 0, beat); };
  addBeat("afton_saga", 0, ["Before Fredbear's", "Murray's Costume Manor designs the first mascots. Afton poaches them for Fredbear's."], 0);
  addBeat("afton_saga", 0, ["1983", "Michael's masked friends, the “Bonnie bro” among them, help him carry his brother to Fredbear."]);
  addBeat("afton_saga", 4, ["Present", "Help Wanted's tapes expose the cover-up: the horrors repackaged as games."], 0);
  addBeat("afton_saga", 4, ["After Ruin", "Help Wanted 2: the “Bonnie bro”, grown up, is pulled back into the VR world."]);
  addBeat("mimic", 0, ["Before Fredbear's", "MCM's designs are taken by Afton. Edwin is left with grief, and with the Mimic."], 1);
  addBeat("mimic", 2, ["After Ruin", "Help Wanted 2: the “Afton” in the code is still the Mimic's imitation."], 3);
  const ms = g("mimic");
  if (ms) ms.set = Object.assign({ mcm_designs: "poached" }, ms.set);
  const remn = g("remnant");
  if (remn) remn.set = Object.assign({ coverup: "yes" }, remn.set);
  const cl = g("classic");
  if (cl) cl.set = Object.assign({ mcm_designs: "parallel", hw2_player: "employee", coverup: "meta" }, cl.set);
  if (L.GRAND_COMPARE) L.GRAND_COMPARE.push("mcm_designs", "hw2_player");

  // ---------- glossary ----------
  L.GLOSSARY.push(
    ["Murray's Costume Manor (MCM)", "Edwin Murray's costume and animatronics company, explored in Secret of the Mimic. It's where the Mimic was made, and where early versions of familiar mascot designs began."],
    ["The cover-up", "Help Wanted's in-universe premise: Fazbear Entertainment turns its history into “just a game” so the truth reads as fiction."],
    ["The masked boys", "Michael's friends in Freddy, Bonnie and Chica masks in FNAF4's final scene. The Bonnie one is at the centre of Help Wanted 2 theories."]
  );
})();
