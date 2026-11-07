/* =========================================================
   MINIGAMES: storyboard "replays" of the series' hidden
   8-bit minigames, plus the theories and events they add.
   Loaded after data.js and before app.js.

   Beat format:
     { bg, fx?, banner?, cap, s: [[spriteId, x%, yOffset%, "mods"], ...] }
   bg:   room | party | night | rain | road | house | dark | maze | castle | stage | diner
   mods: flip down dim ghost shake big walk enter
   ========================================================= */
(function () {
  const L = window.LORE;
  const KSHORT = (s) => ({ william: "William", vincent: "“Vincent”", dave: "“Dave”" })[s.purple];

  // ---------- new theories (appended, so old share links stay valid) ----------
  L.THEORIES.push(
    {
      id: "motorist", cat: "MINIGAMES", short: "Midnight Motorist",
      title: "Where is the Midnight Motorist driving?",
      q: "In Pizzeria Simulator's arcade, a purple car laps a dark road. Take the hidden route and it ends up somewhere else entirely.",
      options: [
        { id: "afton_home", label: "The Afton house", tag: "POPULAR", desc: "William drives home at night, and the hidden scene shows the Afton household. That ties the minigame to the Crying Child's story.", pro: ["A child alone in a house fits FNAF4's setting.", "It's the reading most often cited by theorists."], con: ["Nothing in the minigame names the house or the people in it."] },
        { id: "hunt", label: "To find a victim", tag: "POPULAR", desc: "It's the same purple car that pulls up in Take Cake to the Children. The drive is a killer on the hunt.", pro: ["The purple car is a recurring signature of the killer."], con: ["The scene never shows an attack."] },
        { id: "henry", label: "Henry's house", tag: "FRINGE", desc: "He's driving to his old partner's home, before or after Charlie's death.", pro: ["It would link the two founders' families."], con: ["Nothing ties the house to Henry."] },
      ],
    },
    {
      id: "fruity", cat: "MINIGAMES", short: "Fruity Maze",
      title: "Is Fruity Maze's Susie an MCI victim?",
      q: "A little girl named Susie races through a maze, missing her dog. Then a yellow rabbit appears.",
      options: [
        { id: "mci", label: "Yes, one of the five", tag: "MAINSTREAM", desc: "Susie is one of the Missing Children Incident victims, and Fruity Maze shows how she was lured.", pro: ["Her name matches the victim linked to Chica in tie-in material.", "The yellow rabbit is the Spring Bonnie suit used in the MCI."], con: ["The victim names come from tie-ins. The minigame itself never shows the abduction."] },
        { id: "lured", label: "Lured, fate unknown", tag: "POPULAR", desc: "The game cuts out before anything happens, so what became of her is left unsaid.", pro: ["It's strictly what's on screen."], con: ["The name and the rabbit are hard to ignore."] },
        { id: "earlier", label: "A separate victim", tag: "FRINGE", desc: "Susie was taken in a different attack, not as one of the famous five.", pro: ["It keeps the MCI count tidy if the names are shuffled."], con: ["It needs an extra, otherwise unmentioned murder."] },
      ],
    },
    {
      id: "princess", cat: "MINIGAMES", short: "Princess Quest",
      title: "Who is Princess Quest's princess?",
      q: "Three arcade cabinets hidden around the Pizzaplex tell the story of a princess trapped in a dark castle. Finishing them all unlocks a special ending.",
      options: [
        { id: "vanessa", label: "Vanessa, breaking free", tag: "MAINSTREAM", desc: "The princess stands for Vanessa. Clearing the games breaks Glitchtrap's hold, and the ending shows her leaving the Pizzaplex.", pro: ["Completing Princess Quest triggers an ending centred on Vanessa."], con: ["The arcade game never names her."] },
        { id: "allegory", label: "Just an allegory", tag: "POPULAR", desc: "It's a metaphor for anyone trapped in the Pizzaplex's cycle, not one specific person.", pro: ["Arcade stories in the series are often symbolic."], con: ["The ending it unlocks is very specific."] },
        { id: "elizabeth", label: "Elizabeth Afton", tag: "FRINGE", desc: "Another trapped girl: Elizabeth's spirit, still caught in her father's machines.", pro: ["The Aftons' daughters keep echoing through the series."], con: ["Elizabeth has no known link to Security Breach."] },
      ],
    }
  );

  // ---------- new timeline events ----------
  L.EVENTS.push(
    {
      id: "motorist", era: 0, order: 26, year: "Unknown",
      title: "Midnight Motorist",
      sprites: ["car"], games: ["FFPS"], chars: ["william"],
      theories: ["motorist"], minigames: ["midnight_motorist"],
      body: (s) => `A hidden arcade game in Pizzeria Simulator shows a purple car, unmistakably ${KSHORT(s)}'s, driving through the night. ` + ({
        afton_home: `In your canon, the secret route leads <b>home to the Afton house</b>, where a child is waiting, a glimpse of the family before everything fell apart.`,
        hunt: `In your canon, the drive is <b>a hunt</b>: the same car that pulls up outside the restaurant in Take Cake to the Children.`,
        henry: `In your canon, the secret route leads to <b>Henry's house</b>, a visit between old partners with a dark undertone.`,
      })[s.motorist],
    },
    {
      id: "fruity", era: (s) => (s.mci_year === "y1985" ? 1 : 2), order: (s) => (s.mci_year === "y1985" ? 39 : 50.5),
      year: (s) => (s.mci_year === "y1985" ? "1985" : "1987"),
      title: "Susie and the yellow rabbit",
      sprites: ["susie", "dog", "springbonnie"], games: ["FFPS"], chars: ["susie", "william"],
      theories: ["fruity"], minigames: ["fruity_maze"],
      body: (s) => `In Pizzeria Simulator's <b>Fruity Maze</b>, a girl named <b>Susie</b> is heartbroken: her dog has gone missing. As the game glitches apart, a figure in a <b>yellow rabbit suit</b> appears. ` + ({
        mci: `In your canon, this is how one of the <b>Missing Children Incident</b> victims was lured away.`,
        lured: `In your canon, the minigame cuts out and her fate is <b>left unknown</b>.`,
        earlier: `In your canon, Susie is <b>a separate victim</b>, taken outside the famous five.`,
      })[s.fruity],
    },
    {
      id: "princess", era: 5, order: 117, year: "Present day",
      title: "Princess Quest",
      sprites: ["princess", "glitchtrap"], games: ["SB"], chars: ["vanessa"],
      theories: ["princess", "vanessa"], minigames: ["princess_quest"],
      body: (s) => `Three arcade cabinets hidden around the Pizzaplex tell the story of a princess trapped in a dark castle. Clear all three and Security Breach unlocks a special ending. ` + ({
        vanessa: `In your canon, the princess is <b>Vanessa</b>, and finishing the quest lets her break free of Glitchtrap and walk out of the Pizzaplex.`,
        allegory: `In your canon, it's <b>an allegory</b> for everyone trapped in the Pizzaplex, though the ending still focuses on Vanessa.`,
        elizabeth: `In your canon, the princess is <b>Elizabeth</b>, still trapped in her father's machines after all these years.`,
      })[s.princess],
    }
  );

  // link existing timeline events to the minigames that depict them
  const LINKS = {
    charlie: ["take_cake", "security_puppet"],
    mci: ["give_gifts", "save_them", "foxy_go"],
    fnaf4: ["fnaf4_days"], bite83: ["fnaf4_days"], cc_after: ["fnaf4_days"],
    elizabeth: ["sl_baby"],
    aftondeath: ["follow_me", "dismantling"],
    fnaf3: ["cake_games"],
  };
  L.EVENTS.forEach((e) => { if (LINKS[e.id]) e.minigames = (e.minigames || []).concat(LINKS[e.id]); });

  const susie = L.CHARACTERS.find((c) => c.id === "susie");
  if (susie) susie.theories = susie.theories.concat(["fruity"]);

  // extra lore glossary entries
  L.GLOSSARY.push(
    ["Shadow Freddy", "A purple, shadowy Freddy who leads the animatronics to the back room in FNAF3's after-night minigames. Who, or what, it is remains a mystery."],
    ["The Box (FNAF4)", "A locked box shown in FNAF4's extras, held shut with tape. Its contents have never been revealed, and Scott Cawthon has suggested they'll stay a mystery."],
    ["Candy Cadet", "A robot in Pizzeria Simulator who tells short, unsettling stories, often about broken things being put back together. Fans read them as nods to the MCI and to Ennard."],
    ["Death minigames", "FNAF2's Atari-style scenes that sometimes play after a game over. They were the first real window into the murders."]
  );

  // ---------- the minigames ----------
  const MINIGAMES = [
    {
      id: "take_cake", title: "Take Cake to the Children", game: "FNAF2", when: "Random, after a game over", icon: "cake",
      theories: ["purple"], events: ["charlie"],
      lore: (s) => `The first time players saw a murder on screen. While Freddy is busy delivering cake inside, a child stands crying outside in the rain, and ${KSHORT(s)} pulls up in a purple car and kills her. Pizzeria Simulator later makes it clear this is <b>Charlie Emily</b>, whose spirit becomes <b>the Puppet</b>.`,
      beats: [
        { bg: "party", banner: "TAKE CAKE TO THE CHILDREN", cap: "Freddy carries cake to a table of children. Each one waits, getting impatient.", s: [["freddy", 18, 0, "walk"], ["kid", 52], ["kid2", 68], ["kid3", 84]] },
        { bg: "party", cap: "Serve them quickly and they stay happy. Wait too long and they turn red, then cry.", s: [["freddy", 46, 0, "walk"], ["cake", 56, 22, "enter"], ["kid", 52], ["kid2", 68, 0, "shake"], ["kid3", 84, 0, "shake"]] },
        { bg: "rain", cap: "Outside the window, a lone child is crying in the rain. Freddy can't get to her.", s: [["kidgrey", 70, 0, "dim"], ["freddy", 12, 0, "dim"]] },
        { bg: "rain", cap: "A purple car pulls up. A purple man gets out.", s: [["car", 34, 0, "enter"], ["purpleguy", 52, 0, "walk"], ["kidgrey", 70, 0, "dim"]] },
        { bg: "rain", fx: "glitch", cap: "The child turns grey. Freddy slows to a crawl, and the screen tears into a jumpscare.", s: [["purpleguy", 52], ["kidgrey", 70, 0, "down"], ["puppet", 88, 0, "ghost big"]] },
      ],
    },
    {
      id: "give_gifts", title: "Give Gifts, Give Life", game: "FNAF2", when: "Random, after a game over", icon: "gift",
      theories: ["golden", "mci_map"], events: ["mci"],
      lore: (s) => `The Puppet's side of the story. It gives gifts to four slumped, grey children, then <i>gives life</i> by placing animatronic masks on them. That's how the murdered children ended up in the animatronics. A fifth figure appears with a sudden <b>Golden Freddy</b> jumpscare. In your canon, Golden Freddy holds ${({ cassidy: "Cassidy", cc: "the Crying Child", both: "Cassidy and the Crying Child" })[s.golden]}.`,
      beats: [
        { bg: "dark", banner: "GIVE GIFTS", cap: "The Puppet drifts through a dark room. Four children sit motionless on the floor.", s: [["puppet", 12, 6, "walk"], ["kidgrey", 34], ["kidgrey", 50], ["kidgrey", 66], ["kidgrey", 82]] },
        { bg: "dark", cap: "One by one, it places a gift beside each of them.", s: [["puppet", 74, 6], ["kidgrey", 34], ["gift", 40, 0, "enter"], ["kidgrey", 50], ["gift", 56, 0, "enter"], ["kidgrey", 66], ["gift", 72, 0, "enter"], ["kidgrey", 82]] },
        { bg: "dark", banner: "GIVE LIFE", cap: "Then it gives life: an animatronic mask for every child.", s: [["puppet", 18, 6], ["freddy", 34, 0, "enter"], ["bonnie", 50, 0, "enter"], ["chica", 66, 0, "enter"], ["foxy", 82, 0, "enter"]] },
        { bg: "dark", fx: "glitch", banner: "IT'S ME", cap: "Four children, four masks… and then Golden Freddy lunges at the screen.", s: [["freddy", 34, 0, "dim"], ["bonnie", 50, 0, "dim"], ["chica", 66, 0, "dim"], ["foxy", 82, 0, "dim"], ["goldenfreddy", 50, 20, "big shake"]] },
      ],
    },
    {
      id: "save_them", title: "SAVE THEM", game: "FNAF2", when: "Random, after a game over", icon: "freddy",
      theories: ["mci_year"], events: ["mci"],
      lore: (s) => `Freddy wanders the restaurant and finds a child's body in room after room, while the purple man moves through the halls. A distorted voice spells out letters that fans usually transcribe as <b>S-A-V-E-H-I-M</b>. Whoever is meant, it's too late. ${s.mci_year === "y1987" ? "In your canon, this is the FNAF2 restaurant during the week of the murders." : "In your canon, it echoes the 1985 murders in a later building."}`,
      beats: [
        { bg: "room", banner: "SAVE THEM", cap: "Freddy walks through the restaurant's empty halls.", s: [["freddy", 16, 0, "walk"]] },
        { bg: "room", cap: "In one room after another, a child lies on the floor, grey and still.", s: [["freddy", 36, 0, "walk"], ["kidgrey", 70, 0, "down"]] },
        { bg: "room", cap: "Somewhere nearby, the purple man is moving through the building.", s: [["freddy", 30], ["kidgrey", 50, 0, "down"], ["purpleguy", 82, 0, "walk"]] },
        { bg: "dark", fx: "glitch", banner: "S-A-V-E-H-I-M", cap: "A garbled voice spells out letters. The minigame ends in a jumpscare.", s: [["freddy", 50, 0, "shake"], ["puppet", 80, 10, "ghost"]] },
      ],
    },
    {
      id: "foxy_go", title: "Foxy Go! Go! Go!", game: "FNAF2", when: "Random, after a game over", icon: "foxy",
      theories: ["mci_map"], events: ["mci"],
      lore: () => `Foxy dashes out of Pirate's Cove to cheering children, twice. The third time, a purple man is waiting by the door, and the party room falls silent. It shows the killer striking during a party and links Foxy to the murders.`,
      beats: [
        { bg: "stage", banner: "GO! GO! GO!", cap: "Behind the curtain of Pirate's Cove, Foxy waits for the signal.", s: [["foxy", 14]] },
        { bg: "party", cap: "Foxy runs to the party room and the children cheer!", s: [["foxy", 40, 0, "walk"], ["kid", 60], ["kid2", 74], ["kid3", 88]] },
        { bg: "party", cap: "Again. Back to the cove, then out to cheering children once more.", s: [["foxy", 46, 0, "walk"], ["kid", 60, 0, "shake"], ["kid2", 74, 0, "shake"], ["kid3", 88, 0, "shake"]] },
        { bg: "room", cap: "The third time, a purple man is waiting by the door.", s: [["foxy", 22, 0, "walk"], ["purpleguy", 48]] },
        { bg: "party", fx: "glitch", cap: "The party room is silent. The children lie still. Then a jumpscare.", s: [["foxy", 36], ["kidgrey", 60, 0, "down"], ["kidgrey", 74, 0, "down"], ["kidgrey", 88, 0, "down"]] },
      ],
    },
    {
      id: "follow_me", title: "Follow Me (FNAF3 Nights 1–4)", game: "FNAF3", when: "After each night", icon: "shadowfreddy",
      theories: ["shadow"], events: ["aftondeath"],
      lore: (s) => `After each night of FNAF3 you play as one of the old animatronics. A purple <b>Shadow Freddy</b> lures each one into the back room, where ${KSHORT(s)} is waiting to <b>dismantle</b> them. These scenes show what happened to the original cast after the restaurant closed.`,
      beats: [
        { bg: "room", banner: "FOLLOW ME", cap: "After Night 1, you're Freddy, wandering the closed restaurant.", s: [["freddy", 16, 0, "walk"]] },
        { bg: "room", cap: "A purple Shadow Freddy appears and beckons him onward.", s: [["freddy", 30, 0, "walk"], ["shadowfreddy", 62, 0, "ghost"]] },
        { bg: "dark", cap: "The path ends in a back room. The purple man is waiting.", s: [["freddy", 40], ["purpleguy", 64, 0, "walk"]] },
        { bg: "dark", fx: "glitch", cap: "Night after night it repeats: Bonnie, then Chica, then Foxy, each one taken apart.", s: [["bonnie", 22, 0, "down dim"], ["chica", 42, 0, "down dim"], ["foxy", 62, 0, "down dim"], ["purpleguy", 82]] },
      ],
    },
    {
      id: "dismantling", title: "The Safe Room (FNAF3 Night 5)", game: "FNAF3", when: "After Night 5", icon: "springbonnie",
      theories: ["purple"], events: ["aftondeath"],
      lore: (s) => `${KSHORT(s)}'s downfall. Cornered by the ghosts of his victims, he hides in the old Spring Bonnie suit and laughs, until the spring-locks fail. This is how <b>Springtrap</b> was born.`,
      beats: [
        { bg: "dark", cap: "The purple man has taken the animatronics apart. Their pieces lie around him.", s: [["purpleguy", 50], ["freddy", 20, 0, "down dim"], ["chica", 80, 0, "down dim"]] },
        { bg: "dark", cap: "A crying ghost child appears. Then more. He runs.", s: [["purpleguy", 60, 0, "walk flip"], ["kidgrey", 22, 6, "ghost"], ["kidgrey", 36, 6, "ghost"]] },
        { bg: "dark", cap: "Cornered, he climbs into the old Spring Bonnie suit and laughs at them.", s: [["springbonnie", 64], ["kidgrey", 22, 6, "ghost"], ["kidgrey", 34, 6, "ghost"], ["kidgrey", 46, 6, "ghost"]] },
        { bg: "dark", fx: "glitch", cap: "The spring-locks snap. The suit crushes him, and he collapses in the safe room.", s: [["springtrap", 64, 0, "down shake"]] },
      ],
    },
    {
      id: "cake_games", title: "The Hidden Cake Minigames", game: "FNAF3", when: "Secret arcade games", icon: "cake",
      theories: ["happiest", "shadow"], events: ["fnaf3"],
      lore: (s) => `FNAF3 hides secret routes inside its arcade games: BB's Air Adventure, Mangle's Quest, Chica's Party, Stage01 and a glitchy Shadow Bonnie game. Each one hides a crying child who needs cake. Give cake to them all and you unlock <b>Happiest Day</b> and the good ending. Stage01 is also the first look at <b>Fredbear and Spring Bonnie</b> on stage. In your canon, Happiest Day frees ${({ mci: "the five MCI children", cc: "the Crying Child", puppet: "Charlie, the Puppet" })[s.happiest]}.`,
      beats: [
        { bg: "stage", banner: "STAGE01", cap: "Five little arcade games. Stage01 shows Fredbear and Spring Bonnie, performing at the old diner.", s: [["fredbear", 40], ["springbonnie", 60]] },
        { bg: "night", cap: "Hidden in each game is a grey, crying child, somewhere you're not supposed to reach.", s: [["kidgrey", 70], ["shadowbonnie", 24, 0, "walk"]] },
        { bg: "night", cap: "Find the secret path and give them cake.", s: [["kidgrey", 70], ["cake", 58, 0, "enter"], ["shadowbonnie", 40]] },
        { bg: "party", banner: "HAPPIEST DAY", cap: "With every cake delivered, a masked child joins the party table…", s: [["cryingchild", 18, 0, "walk"], ["kid", 50], ["kid2", 64], ["kid3", 78], ["cake", 92]] },
        { bg: "party", cap: "…and the masks fall away. Balloons rise. They're free.", s: [["kid", 34, 8, "ghost"], ["kid2", 50, 8, "ghost"], ["kid3", 66, 8, "ghost"], ["cryingchild", 82, 8, "ghost"]] },
      ],
    },
    {
      id: "fnaf4_days", title: "Countdown to the Party", game: "FNAF4", when: "Between nights", icon: "cryingchild",
      theories: ["nightmares", "plush"], events: ["fnaf4", "bite83", "cc_after"],
      lore: (s) => `The daytime half of FNAF4: the Crying Child's last days before the party at Fredbear's. His brother torments him in a Foxy mask, his Fredbear plush keeps him company, and the countdown ends in the <b>Bite of '83</b>. In your canon, the plush's voice is ${({ william: "William's", imagination: "only in his head", entity: "a separate entity, Nightmare Fredbear" })[s.plush]}.`,
      beats: [
        { bg: "room", banner: "4 DAYS UNTIL THE PARTY", cap: "The child cries alone. His big brother, wearing a Foxy mask, leaps out to scare him.", s: [["cryingchild", 30], ["foxy", 62, 0, "shake"]] },
        { bg: "night", cap: "His Fredbear plush talks to him. It comforts him and tells him where to go.", s: [["cryingchild", 40], ["fredbear", 58, 0, "enter"]] },
        { bg: "diner", cap: "At Fredbear's Family Diner, Fredbear and Spring Bonnie perform on stage.", s: [["fredbear", 34], ["springbonnie", 54], ["cryingchild", 82, 0, "dim"]] },
        { bg: "dark", cap: "Later, he ends up shut in a dark back room with the old suits, crying for help.", s: [["cryingchild", 50, 0, "shake"], ["fredbear", 20, 0, "dim"], ["springbonnie", 80, 0, "dim"]] },
        { bg: "diner", banner: "0 DAYS", cap: "The party. The older kids lift him up to Fredbear “for a closer look”…", s: [["fredbear", 40, 0, "big"], ["cryingchild", 58, 14, "shake"], ["michael", 76]] },
        { bg: "dark", fx: "glitch", banner: "I WILL PUT YOU BACK TOGETHER", cap: "Darkness. A voice: “I'm still here. I will put you back together.”", s: [["fredbear", 50, 0, "ghost"]] },
      ],
    },
    {
      id: "sl_baby", title: "Circus Baby's Pizza World", game: "SL", when: "Sister Location death screens", icon: "circusbaby",
      theories: [], events: ["elizabeth"],
      lore: () => `Circus Baby hands out cupcakes, until one little girl comes to her alone. It's <b>Elizabeth Afton</b>, who was told never to go near Baby. Baby's hidden capture feature does the rest, and Elizabeth's spirit ends up inside the animatronic that killed her.`,
      beats: [
        { bg: "stage", cap: "Circus Baby gives out cupcakes as children come to her stage.", s: [["circusbaby", 30], ["kid", 58, 0, "walk"], ["kid2", 74], ["kid3", 88]] },
        { bg: "stage", cap: "The crowd thins out. No more children… except one little girl.", s: [["circusbaby", 30], ["elizabeth", 70, 0, "walk"]] },
        { bg: "stage", banner: "ICE CREAM?", cap: "She knows she isn't supposed to get close. Baby offers her ice cream.", s: [["circusbaby", 34], ["elizabeth", 54]] },
        { bg: "dark", fx: "glitch", cap: "A claw lowers. The girl is gone.", s: [["circusbaby", 40, 0, "big"], ["elizabeth", 54, 18, "ghost"]] },
      ],
    },
    {
      id: "security_puppet", title: "Security Puppet", game: "FFPS", when: "Pizzeria Simulator arcade", icon: "puppet",
      theories: ["happiest"], events: ["charlie"],
      lore: (s) => `The Puppet's tragedy, told from its side. Its job was to keep a child safe, and the one night she slipped away, it found her outside in the rain. It's the other half of <b>Take Cake to the Children</b>, and it explains why the Puppet carries <b>Charlie's</b> spirit and protects other children. ${s.happiest === "puppet" ? "In your canon, Charlie is finally freed in FNAF3's Happiest Day." : "Henry captures her in Lefty before the end."}`,
      beats: [
        { bg: "party", banner: "SECURITY PUPPET", cap: "The Puppet watches over a girl while she plays inside the restaurant.", s: [["puppet", 30, 6], ["charlie", 58, 0, "walk"]] },
        { bg: "party", cap: "She keeps wandering off, and the Puppet keeps bringing her back.", s: [["puppet", 54, 6, "walk"], ["charlie", 72]] },
        { bg: "rain", cap: "Then one night she's gone. The Puppet finds her outside, behind the building, in the rain.", s: [["puppet", 30, 6, "walk"], ["charlie", 68, 0, "down"]] },
        { bg: "rain", fx: "glitch", cap: "Too late. The Puppet holds her as the scene fades.", s: [["puppet", 56, 6], ["charlie", 62, 0, "down dim"]] },
      ],
    },
    {
      id: "fruity_maze", title: "Fruity Maze", game: "FFPS", when: "Pizzeria Simulator arcade", icon: "susie",
      theories: ["fruity"], events: ["fruity"],
      lore: (s) => `A cheerful fruit-collecting game that falls apart. Susie talks about her missing dog between rounds, and the game glitches more and more until a <b>yellow rabbit</b> appears. ${({ mci: "In your canon, this is the lure that led to one of the five MCI murders.", lured: "In your canon, what happened next is left unknown.", earlier: "In your canon, Susie was a separate victim." })[s.fruity]}`,
      beats: [
        { bg: "maze", banner: "FRUITY MAZE", cap: "A girl named Susie races through a maze, collecting fruit.", s: [["susie", 30, 0, "walk"]] },
        { bg: "maze", cap: "Between rounds she talks about her dog. He ran away, and she can't find him anywhere.", s: [["susie", 40], ["dog", 78, 0, "dim"]] },
        { bg: "maze", fx: "glitch", cap: "The game starts to break up. Her words grow strange and sad.", s: [["susie", 44, 0, "shake"]] },
        { bg: "night", cap: "A figure in a yellow rabbit suit appears beside her… and the game cuts out.", s: [["susie", 40], ["springbonnie", 64, 0, "enter"]] },
      ],
    },
    {
      id: "midnight_motorist", title: "Midnight Motorist", game: "FFPS", when: "Pizzeria Simulator arcade", icon: "car",
      theories: ["motorist"], events: ["motorist"],
      lore: (s) => `On the surface it's a simple racing game: a purple car laps a dark road. A hidden route leads to a house, where the strangest scene in Pizzeria Simulator's arcade plays out. It raises more questions than it answers. ${({ afton_home: "In your canon, it's the Afton house.", hunt: "In your canon, the drive is a killer's hunt.", henry: "In your canon, it's Henry's house." })[s.motorist]}`,
      beats: [
        { bg: "road", banner: "MIDNIGHT MOTORIST", cap: "A purple car laps a dark road, over and over.", s: [["car", 20, 0, "walk"]] },
        { bg: "road", cap: "Drive the wrong way, and the road leads somewhere it shouldn't.", s: [["car", 70, 0, "walk flip"]] },
        { bg: "house", cap: "The car arrives at a house in the dark. Inside, a child is alone.", s: [["car", 18], ["kid", 72, 0, "dim"]] },
        { bg: "house", fx: "glitch", cap: "The scene ends without an explanation, and fans have argued about it ever since.", s: [["car", 18, 0, "dim"], ["purpleguy", 46, 0, "walk"], ["kid", 72, 0, "dim"]] },
      ],
    },
    {
      id: "princess_quest", title: "Princess Quest", game: "SB", when: "Pizzaplex arcade cabinets", icon: "princess",
      theories: ["princess", "vanessa"], events: ["princess"],
      lore: (s) => `Three cabinets, one story. A little princess fights her way through a dark castle toward whatever is holding her there. Clear all three and Security Breach unlocks its <b>Princess Quest ending</b>, the series' most hopeful finish for <b>Vanessa</b>. ${({ vanessa: "In your canon, the princess is Vanessa.", allegory: "In your canon, it's an allegory.", elizabeth: "In your canon, the princess is Elizabeth." })[s.princess]}`,
      beats: [
        { bg: "castle", banner: "PRINCESS QUEST", cap: "A tiny princess wanders a dark, monster-filled castle.", s: [["princess", 20, 0, "walk"]] },
        { bg: "castle", cap: "Three separate cabinets, hidden around the Pizzaplex, continue her journey.", s: [["princess", 48, 0, "walk"], ["shadowbonnie", 80, 0, "dim"]] },
        { bg: "dark", cap: "At the heart of the castle she reaches the thing that has been holding her.", s: [["princess", 36], ["glitchtrap", 66, 0, "big"]] },
        { bg: "night", cap: "Finish all three and the special ending plays: the princess walks free.", s: [["princess", 50, 0, "walk"], ["glitchtrap", 86, 0, "ghost"]] },
      ],
    },
  ];

  L.MINIGAMES = MINIGAMES;
})();
