/* =========================================================
   LORE DATA
   Text fields may be strings or functions of the current
   "canon" state S (an object of theoryId -> optionId).
   ========================================================= */
(function () {
  // ---------- helpers ----------
  const KILLER = (s) =>
    ({ william: "William Afton", vincent: "the killer fans called “Vincent”", dave: "William Afton (alias “Dave Miller”)" })[s.purple];
  const KSHORT = (s) => ({ william: "William", vincent: "“Vincent”", dave: "“Dave”" })[s.purple];
  const Y1 = (s) => ({ y1993: 1993, y1988: 1988, vague: null })[s.fnaf1_year];
  const yr = (s, off) => (Y1(s) ? String(Y1(s) + off) : off ? `FNAF1 + ${off} yrs` : "Early 199X");
  const MAP = {
    books: { gabriel: "Freddy", jeremy_k: "Bonnie", susie: "Chica", fritz_k: "Foxy", cassidy: "Golden Freddy" },
  };
  const possessed = (s, kid) => {
    if (kid === "cassidy") {
      if (s.golden === "cc") return "possibly nothing — in this canon Golden Freddy belongs to the Crying Child";
      return "Golden Freddy";
    }
    if (s.mci_map === "books") return MAP.books[kid];
    if (s.mci_map === "toys") return "a Toy animatronic first, moving to the withered originals later";
    return "one of the original four animatronics (the games never say which)";
  };
  const goldenWho = (s) =>
    ({ cassidy: "Cassidy, the fifth missing child", cc: "the Crying Child", both: "two souls at once — Cassidy and the Crying Child" })[s.golden];

  // ---------- GAMES / SOURCES ----------
  const GAMES = {
    FNAF1: { n: "Five Nights at Freddy's", y: 2014 },
    FNAF2: { n: "Five Nights at Freddy's 2", y: 2014 },
    FNAF3: { n: "Five Nights at Freddy's 3", y: 2015 },
    FNAF4: { n: "Five Nights at Freddy's 4", y: 2015 },
    WORLD: { n: "FNaF World", y: 2016 },
    SL: { n: "Sister Location", y: 2016 },
    FFPS: { n: "Freddy Fazbear's Pizzeria Simulator", y: 2017 },
    UCN: { n: "Ultimate Custom Night", y: 2018 },
    HW: { n: "Help Wanted", y: 2019 },
    SB: { n: "Security Breach", y: 2021 },
    RUIN: { n: "Security Breach: Ruin", y: 2023 },
    HW2: { n: "Help Wanted 2", y: 2023 },
    PIT: { n: "Into the Pit", y: 2024 },
    SOTM: { n: "Secret of the Mimic", y: 2025 },
    BOOKS: { n: "Tie-in books (Fazbear Frights / Tales from the Pizzaplex)", y: 2019 },
  };

  // ---------- THEORIES ----------
  // tag: CONFIRMED | MAINSTREAM | POPULAR | FRINGE | OUTDATED | CROSSOVER
  const THEORIES = [
    {
      id: "purple", cat: "IDENTITY", short: "Purple Guy",
      title: "Who is the Purple Guy?",
      q: "A purple, grinning figure stalks children through the hidden 8-bit minigames of FNAF2 and FNAF3. For years, nobody knew his name.",
      options: [
        { id: "william", label: "William Afton", tag: "CONFIRMED", desc: "Co-founder of Fredbear's Family Diner and owner of Afton Robotics. Later games name him and tie him directly to the murders and to Springtrap.", pro: ["Sister Location and Pizzeria Simulator name William Afton and connect him to the killings.", "Henry's final speech in Pizzeria Simulator speaks to his “old friend” as the man responsible."], con: ["The first four games never name him, which is why other names took hold."] },
        { id: "vincent", label: "“Vincent”", tag: "OUTDATED", desc: "A fan-made name used everywhere in 2014–2016, before the official name was revealed.", pro: ["It was the community's shorthand for the killer for years."], con: ["It never appears in any official game or book."] },
        { id: "dave", label: "“Dave Miller”", tag: "CROSSOVER", desc: "In The Silver Eyes novel, William Afton hides behind the alias “Dave Miller”, a security guard. Some fans carried the alias over into game theories.", pro: ["It's the same man and the same crimes, in a parallel continuity."], con: ["The novels are a separate continuity, and the games never use the alias."] },
      ],
    },
    {
      id: "golden", cat: "IDENTITY", short: "Golden Freddy",
      title: "Who haunts Golden Freddy?",
      q: "The slumped golden bear appears out of nowhere, crashes the game, and whispers “IT'S ME”. Whose spirit is it?",
      options: [
        { id: "cassidy", label: "Cassidy (MCI victim)", tag: "MAINSTREAM", desc: "The fifth child of the Missing Children Incident. Tie-in material names the five victims, and Cassidy is the one tied to Golden Freddy.", pro: ["It makes five victims for five animatronics.", "Ultimate Custom Night is often read as Golden Freddy (Cassidy) trapping Afton in an endless nightmare."], con: ["The games never put a name to Golden Freddy."] },
        { id: "cc", label: "The Crying Child", tag: "POPULAR", desc: "The Bite of '83 victim haunts the golden bear, the counterpart of the Fredbear suit that killed him.", pro: ["FNAF4 centres on Fredbear and the child's death.", "The FNAF3 “Happiest Day” minigame shows a crying child who may be wearing a golden mask."], con: ["That leaves the fifth MCI child without a vessel."] },
        { id: "both", label: "Both (two souls)", tag: "POPULAR", desc: "Golden Freddy holds two spirits at once: Cassidy and the Crying Child. That would explain why it behaves so inconsistently.", pro: ["Explains both the “IT'S ME” hauntings and the FNAF4 connection.", "Golden Freddy has two separate jumpscare behaviours."], con: ["It's an elegant fix, but there's very little direct evidence for it."] },
      ],
    },
    {
      id: "shadow", cat: "IDENTITY", short: "Shadow Bonnie",
      title: "What is Shadow Bonnie (RWQFSFASXC)?",
      q: "A pitch-black Bonnie with white eyes and teeth. It shows up in FNAF2, wanders the FNAF3 minigames, and has the internal name “RWQFSFASXC”.",
      options: [
        { id: "cc", label: "The Crying Child", tag: "POPULAR", desc: "The Crying Child's spirit, lingering in shadow form and helping other souls move on in the FNAF3 minigames.", pro: ["Shadow Bonnie appears in FNAF3 minigames that are linked to freeing souls.", "It's a vessel for the one child who doesn't get an animatronic."], con: ["No direct confirmation.", "Shadow Freddy appears alongside it, which complicates the picture."] },
        { id: "remnant", label: "A Remnant manifestation", tag: "POPULAR", desc: "Shadow animatronics are psychic echoes made of “Remnant”, the soul-charged metal described in tie-in material. They're not a single person at all.", pro: ["It fits the shadowy, out-of-place way they behave in UCN and FFPS."], con: ["Remnant itself comes from tie-in material rather than the games."] },
        { id: "meta", label: "A glitch / easter egg", tag: "FRINGE", desc: "Shadow Bonnie is an atmospheric easter egg rather than a character with a story.", pro: ["Its appearances are rare, random and unexplained."], con: ["It recurs across several games, which suggests intent."] },
      ],
    },
    {
      id: "nightmares", cat: "EVENTS", short: "FNAF4 Nightmares",
      title: "Were FNAF4's Nightmare animatronics real?",
      q: "Every night the child in FNAF4 holds the bedroom doors shut against monstrous, many-toothed versions of the Freddy's cast.",
      options: [
        { id: "hallucination", label: "Childhood nightmares", tag: "MAINSTREAM", desc: "They're terrors born of trauma: the child's fear of the animatronics, made worse by his brother's cruel mask pranks.", pro: ["The game is framed around a child's bedroom, his fears and a countdown to “the party”.", "The minigames show the big brother scaring him in masks."], con: ["The Nightmares come back later, in UCN and Help Wanted."] },
        { id: "real", label: "Afton's creations", tag: "POPULAR", desc: "The Nightmares are real constructs (or Remnant-fuelled manifestations) that William uses to torment or study his son.", pro: ["The plush and its strange “I will put you back together” line suggest someone is watching.", "They exist physically in later games."], con: ["There's no clear motive, and no physical evidence in FNAF4 itself."] },
        { id: "michael", label: "Michael's nightmares", tag: "FRINGE", desc: "The player is Michael, after the Bite, haunted by guilt for what he did to his brother.", pro: ["It would explain the guilt-soaked tone and the brother's apology."], con: ["The minigames clearly show the child as a separate person from the player."] },
      ],
    },
    {
      id: "plush", cat: "IDENTITY", short: "Fredbear plush",
      title: "Who speaks through the Fredbear plush?",
      q: "A small Fredbear plush talks to the child in FNAF4's minigames, comforting him and promising things.",
      options: [
        { id: "william", label: "William Afton", tag: "POPULAR", desc: "The plush is an Afton Robotics device that William uses to watch, or experiment on, his own son.", pro: ["William builds animatronics with hidden features.", "The plush seems to know too much."], con: ["Nothing in the game shows the plush as a machine."] },
        { id: "imagination", label: "The child's imagination", tag: "MAINSTREAM", desc: "A lonely, frightened child talking to his favourite toy.", pro: ["It's simple and fits a story told through a child's eyes."], con: ["The plush sometimes talks without the child prompting it."] },
        { id: "entity", label: "Nightmare Fredbear", tag: "FRINGE", desc: "The plush is a vessel for a separate, malevolent entity, the same one that later appears as Nightmare Fredbear.", pro: ["Nightmare Fredbear stands apart from the other Nightmares."], con: ["It needs a new, unexplained entity."] },
      ],
    },
    {
      id: "mci_year", cat: "TIMELINE", short: "MCI year",
      title: "When did the Missing Children Incident happen?",
      q: "Five children vanish after being led into a back room by a man in a mascot suit. But when?",
      options: [
        { id: "y1985", label: "1985", tag: "MAINSTREAM", desc: "The murders happen at the original Freddy Fazbear's Pizza in 1985, two years before FNAF2.", pro: ["Into the Pit sends its hero back to 1985 to face the yellow rabbit taking children.", "It gives the restaurants time for the cleanup, the closures and the Toy replacements."], con: ["FNAF2's phone calls describe a suit incident happening during that week."] },
        { id: "y1987", label: "1987 (during FNAF2)", tag: "OUTDATED", desc: "The murders happen during FNAF2's week at the new location, in November 1987.", pro: ["Late in the week, Phone Guy mentions someone using a spare yellow suit, followed by an investigation and a lockdown.", "The “Give Gifts, Give Life” minigame fits the FNAF2 setting."], con: ["Later material points to 1985 instead."] },
      ],
    },
    {
      id: "mci_map", cat: "IDENTITY", short: "Who's in which suit",
      title: "Which MCI child is in which animatronic?",
      q: "The Puppet “gives life” to the murdered children. But which spirit ends up in which character?",
      options: [
        { id: "books", label: "Named mapping", tag: "MAINSTREAM", desc: "Gabriel is Freddy, Jeremy is Bonnie, Susie is Chica, Fritz is Foxy and Cassidy is Golden Freddy. These names come from tie-in material.", pro: ["It's the most widely cited assignment of names to characters."], con: ["The names come from books, not from in-game text."] },
        { id: "unknown", label: "Unknown", tag: "POPULAR", desc: "The games never say which child is which, and the names are only flavour.", pro: ["It's strictly what the games show."], con: ["It doesn't make for satisfying storytelling."] },
        { id: "toys", label: "Toys first", tag: "FRINGE", desc: "The spirits first possess the Toy animatronics in 1987 and move to the withered originals once the Toys are scrapped.", pro: ["The Toys are the ones hostile to the FNAF2 guard."], con: ["The withered originals are clearly the ones haunted in FNAF1 and FNAF3."] },
      ],
    },
    {
      id: "bite87", cat: "EVENTS", short: "Bite of '87 culprit",
      title: "Who caused the Bite of '87?",
      q: "“It's amazing that the human body can live without the frontal lobe…” Phone Guy, FNAF1. Who did the biting?",
      options: [
        { id: "mangle", label: "Mangle", tag: "MAINSTREAM", desc: "The dismantled “kids' cove” fox, constantly torn apart and rebuilt, finally snaps.", pro: ["Mangle's jaw and ceiling-hanging behaviour fit an attack on a guard at the office.", "Toy animatronics were the ones active in 1987."], con: ["FNAF1 still has Foxy's Pirate Cove marked “out of order”, which keeps Foxy in the frame."] },
        { id: "foxy", label: "Foxy", tag: "OUTDATED", desc: "The pirate fox, retired to an out-of-order cove ever since.", pro: ["The “out of order” sign in FNAF1 suggests something happened.", "This was the most popular early theory."], con: ["Foxy was stashed in the back as withered parts during 1987."] },
        { id: "unknown", label: "Unknown / Toy Freddy", tag: "FRINGE", desc: "Another Toy, or simply unknowable. The games never show the event.", pro: ["The games never show the Bite of '87 at all."], con: ["It doesn't satisfy anyone."] },
      ],
    },
    {
      id: "bite87_victim", cat: "EVENTS", short: "Bite of '87 victim",
      title: "Who was the Bite of '87 victim?",
      q: "Someone lost their frontal lobe — and survived.",
      options: [
        { id: "jeremy", label: "Jeremy Fitzgerald", tag: "MAINSTREAM", desc: "FNAF2's night guard is moved to the day shift for a birthday party, which is exactly where the bite is believed to happen.", pro: ["After Night 6 he's moved to the day shift for a birthday party, right when the bite is thought to happen."], con: ["Nothing shows Jeremy being bitten."] },
        { id: "child", label: "A party guest", tag: "POPULAR", desc: "A child at the birthday party, which would make it a mirror of the Bite of '83.", pro: ["The Toys were built around children and a party setting."], con: ["Phone Guy's “human body” remark sounds like he's talking about an adult."] },
        { id: "unknown", label: "Unknown", tag: "FRINGE", desc: "An unnamed staff member or bystander.", pro: ["It's strictly what the games show."], con: ["It drops a satisfying connection."] },
      ],
    },
    {
      id: "fnaf1_year", cat: "TIMELINE", short: "FNAF1 year",
      title: "What year does FNAF1 take place?",
      q: "FNAF2 is dated 1987 and FNAF3 is “30 years after” Freddy's closed. Where does FNAF1 fall?",
      options: [
        { id: "y1993", label: "1993", tag: "MAINSTREAM", desc: "FNAF1 is in 1993, which puts FNAF3 around 2023.", pro: ["It leaves room for Sister Location and the restaurant's decline in between.", "It's the date most commonly used in timelines."], con: ["No in-game document shows the year."] },
        { id: "y1988", label: "1988", tag: "OUTDATED", desc: "FNAF1 happens shortly after FNAF2, as the old location reopens.", pro: ["Phone Guy talks about the Bite of '87 as if it was recent."], con: ["It crowds the timeline and clashes with the restaurant's “decline”."] },
        { id: "vague", label: "Leave it vague", tag: "POPULAR", desc: "Some year in the late '80s or '90s. The games never pin it down.", pro: ["It's the most faithful to what the games actually show."], con: ["Fans love a timeline with dates on it."] },
      ],
    },
    {
      id: "mike", cat: "IDENTITY", short: "Mike Schmidt",
      title: "Is Mike Schmidt really Michael Afton?",
      q: "FNAF1's guard is Mike Schmidt. William's eldest son is Michael Afton. Coincidence?",
      options: [
        { id: "michael", label: "Yes, under an alias", tag: "MAINSTREAM", desc: "After Sister Location, Michael's body is kept going by Remnant, and he takes night shifts at his father's old restaurants to find what's left of William.", pro: ["At the end of Sister Location, Michael promises his father: “I'm coming to find you.”", "Pizzeria Simulator echoes FNAF1's mechanics (and FNAF1's tone)."], con: ["The games never say outright that Schmidt is Afton."] },
        { id: "fnaf3", label: "No, but he's the FNAF3 guard", tag: "POPULAR", desc: "Mike Schmidt is a stranger. Michael's hunt for his father leads him to Fazbear's Fright decades later.", pro: ["Michael's quest is all about finding William, and William is at Fazbear's Fright."], con: ["The FNAF3 guard is never identified either."] },
        { id: "separate", label: "Different people", tag: "POPULAR", desc: "“Mike” is a common name. Schmidt is just a guard who had a very bad week.", pro: ["It's the simplest reading."], con: ["The parallel between the names feels deliberate."] },
      ],
    },
    {
      id: "phoneguy", cat: "EVENTS", short: "Phone Guy's fate",
      title: "What happened to Phone Guy on Night 4?",
      q: "Banging on the door, a jingle of “Toreador March”, a stifled scream… then static.",
      options: [
        { id: "animatronics", label: "Caught by the animatronics", tag: "MAINSTREAM", desc: "He's caught in his office and stuffed into a suit, the fate he spent four nights warning about.", pro: ["The audio shows a struggle, Freddy's jingle and an animatronic screech."], con: ["The specific killer is never shown."] },
        { id: "golden", label: "Golden Freddy", tag: "POPULAR", desc: "The final screech is Golden Freddy's, and he's the one who kills Phone Guy.", pro: ["Some fans match the scream at the end to Golden Freddy's."], con: ["The audio is muddy, and the Freddy jingle points elsewhere."] },
        { id: "survived", label: "He survived", tag: "FRINGE", desc: "He escaped, or faked it. His training tapes resurface in FNAF3.", pro: ["His voice lives on in recordings."], con: ["Those tapes predate FNAF1, and Night 5's call is just distorted noise with no sign of him."] },
      ],
    },
    {
      id: "happiest", cat: "EVENTS", short: "Happiest Day",
      title: "Whose soul is freed in FNAF3's “Happiest Day”?",
      q: "A crying child in a mask walks to a party table. The other children have masks too, and a cake waits… then the masks fall away.",
      options: [
        { id: "mci", label: "The MCI children", tag: "MAINSTREAM", desc: "Completing FNAF3's secret minigames frees the five murdered children. The Puppet's work is finally done.", pro: ["The good ending shows the five heads of the original animatronics going dark."], con: ["The child walking is visibly crying, and that's the Crying Child's motif."] },
        { id: "cc", label: "The Crying Child", tag: "POPULAR", desc: "It's the Crying Child's own long-delayed happy birthday, and his release.", pro: ["The crying sprite and the mask match FNAF4's child."], con: ["It ignores the five other children at the table."] },
        { id: "puppet", label: "Charlie (the Puppet)", tag: "FRINGE", desc: "The Puppet, the one who gave everyone else life, is finally freed.", pro: ["The Puppet mask is present."], con: ["Lefty still holds the Puppet in Pizzeria Simulator, so Charlie isn't free yet."] },
      ],
    },
    {
      id: "ucn", cat: "EVENTS", short: "UCN's prisoner",
      title: "Who is trapped in Ultimate Custom Night?",
      q: "Fifty animatronics, an office, endless nights. Golden Freddy's lines suggest that someone is serving a sentence.",
      options: [
        { id: "william", label: "William Afton", tag: "MAINSTREAM", desc: "After Pizzeria Simulator's fire, Afton wakes in a personal hell of his own victims, guarded by Golden Freddy.", pro: ["Henry promised “the darkest pit of Hell” to one of them.", "The hidden voice lines taunt someone who caused all of this."], con: ["The player-character is never shown."] },
        { id: "michael", label: "Michael Afton", tag: "FRINGE", desc: "Michael is still stuck in a nightmare after the fire.", pro: ["He's suffered through the whole story."], con: ["Henry said that most of them would find peace, and Michael was on Henry's side."] },
        { id: "none", label: "Nobody, it's a game mode", tag: "POPULAR", desc: "UCN is a celebratory challenge mode with only light lore.", pro: ["It was presented as a fan-service send-off."], con: ["The secret cutscenes and voice lines look intentional."] },
      ],
    },
    {
      id: "glitchtrap", cat: "IDENTITY", short: "Glitchtrap",
      title: "What is Glitchtrap?",
      q: "Hidden in a VR game's code is a bunny-suited figure who dances, beckons, and wants to be let out.",
      options: [
        { id: "afton", label: "William's digital ghost", tag: "MAINSTREAM", desc: "Scanned Afton-era circuit boards carry William's consciousness into the Freddy Fazbear Virtual Experience.", pro: ["The Spring Bonnie look and the purple vest.", "The developers scanned old animatronic boards to build the game."], con: ["Ruin and the Mimic's mimicry raise doubts."] },
        { id: "mimic", label: "The Mimic, imitating Afton", tag: "POPULAR", desc: "The AI-driven Mimic learned Afton's behaviour and has been wearing his persona. “Afton” keeps coming back because something keeps pretending to be him.", pro: ["Ruin shows the Mimic imitating voices convincingly.", "Secret of the Mimic expanded its history."], con: ["Glitchtrap is digital, while the Mimic is a physical endoskeleton."] },
        { id: "virus", label: "An independent virus", tag: "FRINGE", desc: "A new digital entity, born in the VR code and only wearing Afton's image.", pro: ["It's a digital being with its own goals."], con: ["It doesn't explain the clear Afton parallels."] },
      ],
    },
    {
      id: "burntrap", cat: "IDENTITY", short: "Burntrap",
      title: "Who is Burntrap?",
      q: "Beneath the Mega Pizzaplex, in the burnt ruins of an old pizzeria, a scorched rabbit-shaped thing rises on wires.",
      options: [
        { id: "william", label: "William, rebuilt", tag: "MAINSTREAM", desc: "William's remains, rebuilt after the fire and still unwilling to die.", pro: ["Same location as Pizzeria Simulator.", "Glitchtrap's plan is to get back into a body."], con: ["Burntrap is barely in the game and has no clear personality."] },
        { id: "mimic", label: "The Mimic in disguise", tag: "POPULAR", desc: "The Mimic has dressed itself in Afton's charred remains: it imitates whatever it has learned.", pro: ["After Ruin, the Mimic is a known impersonator under the Pizzaplex.", "This would explain Burntrap's oddly hollow behaviour."], con: ["It's an after-the-fact reinterpretation of Security Breach."] },
        { id: "glitch", label: "Glitchtrap's new body", tag: "POPULAR", desc: "Vanny's work pays off. Glitchtrap's code is downloaded into Afton's remains.", pro: ["It's the goal Glitchtrap seems to be working towards in Help Wanted."], con: ["The game never shows the download happening."] },
      ],
    },
    {
      id: "vanessa", cat: "IDENTITY", short: "Vanessa / Vanny",
      title: "Are Vanessa and Vanny the same person?",
      q: "Vanessa is the Pizzaplex's night guard. Vanny is a rabbit-suited stalker who serves Glitchtrap.",
      options: [
        { id: "possessed", label: "Same woman, controlled", tag: "MAINSTREAM", desc: "Vanessa was a Help Wanted tester who was corrupted and controlled by Glitchtrap. In the costume, she's Vanny.", pro: ["The two are never seen at the same time.", "Endings show Vanessa breaking down or being freed."], con: ["How Glitchtrap controls her is never explained."] },
        { id: "separate", label: "Two different people", tag: "FRINGE", desc: "Vanny is someone else. Vanessa is just a strange guard.", pro: ["It's technically possible."], con: ["Security Breach's endings strongly link them."] },
        { id: "afton", label: "An Afton relation", tag: "CROSSOVER", desc: "In the 2023 film, Vanessa is William Afton's daughter. Some fans fold that back into the games.", pro: ["The film makes this explicit within its own continuity."], con: ["The games never establish it."] },
      ],
    },
    {
      id: "gregory", cat: "IDENTITY", short: "Gregory",
      title: "Who is Gregory?",
      q: "A boy trapped overnight in the Mega Pizzaplex, oddly calm, oddly capable and evasive about his past.",
      options: [
        { id: "kid", label: "A real, runaway kid", tag: "MAINSTREAM", desc: "Gregory is a human child, possibly homeless, and Ruin treats him as one.", pro: ["Ruin's story centres on finding and rescuing him."], con: ["That doesn't explain his eerie competence in Security Breach."] },
        { id: "android", label: "An android", tag: "POPULAR", desc: "Gregory is a robot, and that's why Freddy trusts him and the systems treat him strangely.", pro: ["His medical scan and odd behaviour fuelled early speculation."], con: ["Ruin's portrayal undercuts it."] },
        { id: "cc", label: "The Crying Child, reborn", tag: "OUTDATED", desc: "The Crying Child's spirit returned, to finish off Afton for good.", pro: ["He's the hero who defeats Burntrap."], con: ["There's nothing supporting it after Ruin."] },
      ],
    },
    {
      id: "books", cat: "CANON", short: "Book canon",
      title: "Do the books share the games' universe?",
      q: "The Fazbear Frights and Tales from the Pizzaplex books introduced ideas like Remnant, Agony and the Mimic. Games later adapted some of them.",
      options: [
        { id: "shared", label: "Shared universe", tag: "MAINSTREAM", desc: "The anthology books and the games share a world. Into the Pit and Secret of the Mimic adapt book material directly.", pro: ["The Mimic was introduced in Tales from the Pizzaplex and then appeared in Ruin.", "Into the Pit adapts a Fazbear Frights story."], con: ["Some book stories contradict each other."] },
        { id: "partial", label: "Shared concepts only", tag: "POPULAR", desc: "The books are a source of ideas. Only what the games adopt becomes canon.", pro: ["It's a safe middle ground."], con: ["It's subjective which parts count."] },
        { id: "separate", label: "Separate continuities", tag: "POPULAR", desc: "The novels, the anthologies, the movies and the games are separate universes.", pro: ["The Silver Eyes trilogy is clearly a separate continuity.", "The films are separate too."], con: ["It's hard to sustain now that games adapt the books directly."] },
      ],
    },
  ];

  // ---------- ERAS ----------
  const ERAS = [
    { id: 0, clock: "12 AM", name: "THE FAMILY DINER" },
    { id: 1, clock: "1 AM", name: "THE MURDERS" },
    { id: 2, clock: "2 AM", name: "THE PIZZERIAS" },
    { id: 3, clock: "3 AM", name: "ROT & FIRE" },
    { id: 4, clock: "4 AM", name: "THE DIGITAL AGE" },
    { id: 5, clock: "5 AM", name: "THE MEGA PIZZAPLEX" },
  ];

  // ---------- EVENTS ----------
  const EVENTS = [
    {
      id: "diner", era: 0, order: 10, year: "Before 1983",
      title: "Fredbear's Family Diner opens",
      sprites: ["fredbear", "springbonnie"], games: ["FNAF4", "FFPS"], chars: ["william", "henry"],
      body: (s) => `${KILLER(s)} and his partner <b>Henry Emily</b> open <b>Fredbear's Family Diner</b>, starring two dual-purpose <b>spring-lock suits</b>: Fredbear and Spring Bonnie. They can perform as animatronics or be worn by staff, as long as the spring-locks hold. Henry is the gentle engineer. ${KSHORT(s)} will turn out to have very different plans.`,
    },
    {
      id: "mimic_origin", era: 0, order: 12, year: "Era uncertain",
      title: "Edwin Murray builds the Mimic",
      sprites: ["mimic", "edwin"], games: ["SOTM", "RUIN", "BOOKS"], chars: ["edwin", "mimic"],
      theories: ["books"],
      body: (s) => `Inventor <b>Edwin Murray</b> designs the <b>Mimic</b>, an endoskeleton made to learn by watching people and copying them. After Edwin's family suffers a devastating loss, his grief turns to rage, and the Mimic learns that too. <i>Secret of the Mimic</i> (2025) explores Murray's workshop and the machine's beginnings.` +
        ({ shared: ` <br><span class="note">Your canon: the <i>Tales from the Pizzaplex</i> books, where the Mimic first appeared, count as history. Its later rampages in those stories really happened.</span>`,
           partial: ` <br><span class="note">Your canon: only what the games adopted from the books counts, so the Mimic is real but most of its book exploits are hazy.</span>`,
           separate: ` <br><span class="note">Your canon: the books are their own universe, so this Mimic is defined by Ruin and Secret of the Mimic alone.</span>` })[s.books],
    },
    {
      id: "aftons", era: 0, order: 20, year: "Early 1980s",
      title: "The Afton household",
      sprites: ["michael", "elizabeth", "cryingchild"], games: ["FNAF4", "SL", "FFPS"], chars: ["william", "michael", "elizabeth", "cc"],
      body: (s) => `${KSHORT(s)} Afton has three children: <b>Michael</b>, the eldest, <b>Elizabeth</b>, and the youngest, known only as <b>the Crying Child</b>. Through <b>Afton Robotics</b>, William builds increasingly sinister machines: the Funtime animatronics come with hidden features, including a way to lure and capture children.`,
    },
    {
      id: "elizabeth", era: 0, order: 25, year: "1980s (unknown)",
      title: "“She just wanted ice cream”",
      sprites: ["circusbaby", "elizabeth"], games: ["SL"], chars: ["elizabeth", "william"],
      body: () => `At the grand opening of <b>Circus Baby's Pizza World</b>, the star animatronic, <b>Circus Baby</b>, offers ice cream to a little girl. William had told Elizabeth to stay away from Baby. She doesn't. The claw comes down, and Elizabeth's spirit is now inside Circus Baby.`,
    },
    {
      id: "fnaf4", era: 0, order: 28, year: "1983",
      title: "Five nights of nightmares (FNAF4)",
      sprites: ["fredbear", "cryingchild"], games: ["FNAF4"], chars: ["cc", "michael"],
      theories: ["nightmares", "plush"],
      body: (s) => {
        const n = {
          hallucination: `By day, his <b>older brother</b> ambushes him in a Foxy mask. By night, in his bedroom, his fear takes shape as monstrous <b>Nightmare</b> animatronics: real only to him, and no less terrifying.`,
          real: `By day, his <b>older brother</b> ambushes him in a Foxy mask. By night, the <b>Nightmare</b> animatronics in his bedroom are horribly real: machines, or something worse, made by his own father.`,
          michael: `Except, in your canon, the bedroom belongs to <b>Michael</b>, years later. The Nightmares are his guilt over what he did to his little brother, replaying every night.`,
        }[s.nightmares];
        const p = {
          william: `His only friend, a <b>Fredbear plush</b>, talks to him. In your canon, the voice on the other end is <b>William</b>, watching his son from the shadows.`,
          imagination: `His only friend is a <b>Fredbear plush</b>, which only ever speaks in his imagination.`,
          entity: `His only friend, a <b>Fredbear plush</b>, is actually a vessel for <b>Nightmare Fredbear</b>, an entity of its own.`,
        }[s.plush];
        return `The days count down to a party at Fredbear's. ${n} ${p}`;
      },
    },
    {
      id: "bite83", era: 0, order: 30, year: "1983",
      title: "The Bite of '83",
      sprites: ["fredbear", "michael"], games: ["FNAF4"], chars: ["cc", "michael"],
      body: () => `At a party at Fredbear's, Michael and his friends carry the sobbing child up to Fredbear “to get a closer look”, and push his head into its mouth. The jaws snap shut. The prank kills his brother. A voice later whispers, <i>“I'm sorry.”</i>`,
    },
    {
      id: "cc_after", era: 0, order: 31, year: "1983",
      title: "“I will put you back together”",
      sprites: ["cryingchild", "goldenfreddy"], games: ["FNAF4", "FNAF3"], chars: ["cc"],
      theories: ["golden", "shadow"],
      body: (s) => {
        const who = { william: "a voice that may be William's", imagination: "the plush's gentle voice", entity: "the voice of Nightmare Fredbear" }[s.plush];
        let fate;
        if (s.golden === "cc") fate = `the boy's spirit takes residence in <b>Golden Freddy</b>, the bear that killed him, given a golden twin.`;
        else if (s.golden === "both") fate = `the boy's spirit joins <b>Cassidy</b> inside <b>Golden Freddy</b>, two souls sharing one empty suit.`;
        else if (s.shadow === "cc") fate = `the boy's spirit doesn't get an animatronic. Instead it lingers as <b>Shadow Bonnie</b>, a black silhouette that later helps the other children escape.`;
        else fate = `what happens to the boy's spirit is unclear. In your canon he isn't Golden Freddy or Shadow Bonnie, so he may simply have moved on.`;
        return `As the child fades, ${who} promises to put him back together. In your canon, ${fate}`;
      },
    },
    {
      id: "charlie", era: 1, order: 35, year: "Mid-1980s",
      title: "Take cake to the children",
      sprites: ["puppet", "cake"], games: ["FNAF2", "FFPS"], chars: ["charlie", "william", "henry"],
      body: (s) => `Outside a Freddy Fazbear's Pizza, Henry's daughter <b>Charlotte “Charlie” Emily</b> is locked out in the rain. A purple car pulls up. ${KILLER(s)} gets out and kills her. Her spirit enters <b>the Puppet</b>, the gift-giving guardian of the prize corner, and it will spend decades protecting other children.`,
    },
    {
      id: "mci", era: (s) => (s.mci_year === "y1985" ? 1 : 2), order: (s) => (s.mci_year === "y1985" ? 40 : 51),
      year: (s) => (s.mci_year === "y1985" ? "1985" : "Nov 1987"),
      title: "The Missing Children Incident",
      sprites: ["springbonnie", "puppet", "cake"], games: ["FNAF1", "FNAF2", "FNAF3", "PIT"], chars: ["william", "gabriel", "jeremy_k", "susie", "fritz_k", "cassidy", "charlie"],
      theories: ["mci_year", "mci_map"],
      body: (s) => {
        const where = s.mci_year === "y1985" ? `at the original <b>Freddy Fazbear's Pizza</b>` : `during FNAF2's week at the new location. Phone Guy mentions a spare yellow suit, an investigation and a lockdown`;
        const map = s.mci_map === "books"
          ? `Gabriel → <b>Freddy</b>, Jeremy → <b>Bonnie</b>, Susie → <b>Chica</b>, Fritz → <b>Foxy</b>, Cassidy → <b>Golden Freddy</b>.`
          : s.mci_map === "toys" ? `In your canon they first wake inside the shiny new <b>Toy</b> animatronics, and drift to the old ones once the Toys are scrapped.`
          : `Which child ends up in which suit is left a mystery.`;
        const rem = s.books === "shared" ? ` (Tie-in books call the binding force <b>Remnant</b>.)` : "";
        return `${KILLER(s)}, wearing the yellow <b>Spring Bonnie</b> suit, lures five children into a back room ${where}. They're never seen again. The Puppet <i>gives gifts, gives life</i> and places each soul in an animatronic${rem}. ${map}`;
      },
    },
    {
      id: "pit", era: 1, order: 42, year: "1985 (via the ball pit)",
      title: "Into the Pit",
      sprites: ["oswald", "springbonnie"], games: ["PIT", "BOOKS"], chars: ["oswald", "william"],
      theories: ["books"],
      body: (s) => `Decades from now, a boy named <b>Oswald</b> discovers that the ball pit at <b>Jeff's Pizza</b>, a building that used to be a Freddy Fazbear's, drops him into <b>1985</b>, where a <b>yellow rabbit</b> is stalking children. Then something follows him home. ${s.books === "separate" ? `<span class="note">Your canon: the 2024 game counts, but its Fazbear Frights source story doesn't.</span>` : `<span class="note">The game adapts the Fazbear Frights story “Into the Pit”.</span>`}`,
    },
    {
      id: "fnaf2", era: 2, order: 50, year: "Nov 1987",
      title: "The Toy restaurant (FNAF2)",
      sprites: ["guard2", "mangle", "puppet"], games: ["FNAF2"], chars: ["jeremyf", "fritzs", "phoneguy", "charlie"],
      body: () => `A new Freddy Fazbear's Pizza opens with friendlier <b>Toy</b> animatronics, said to be tied into a criminal database with facial recognition. The old, withered models sit in the back, kept for parts. Night guard <b>Jeremy Fitzgerald</b> survives a week of increasingly hostile robots, guided by <b>Phone Guy</b> and a music box that keeps the Puppet asleep. On Night 7, <b>Fritz Smith</b> covers the shift and is fired the next day.`,
    },
    {
      id: "bite87", era: 2, order: 53, year: "1987",
      title: "The Bite of '87",
      sprites: (s) => [s.bite87 === "foxy" ? "foxy" : s.bite87 === "mangle" ? "mangle" : "freddy"],
      games: ["FNAF1", "FNAF2"], chars: ["jeremyf"],
      theories: ["bite87", "bite87_victim"],
      body: (s) => {
        const who = { mangle: "<b>Mangle</b>, the endlessly dismantled fox", foxy: "<b>Foxy</b>, the old pirate fox", unknown: "an animatronic the games never identify" }[s.bite87];
        const vic = { jeremy: "<b>Jeremy Fitzgerald</b>, newly moved to the day shift for a birthday party", child: "<b>a guest</b> at the birthday party, echoing the Bite of '83", unknown: "<b>an unnamed person</b>" }[s.bite87_victim];
        return `During the day, ${who} bites ${vic}. The victim loses their frontal lobe and survives. Phone Guy will later marvel at it: <i>“It's amazing that the human body can live without the frontal lobe.”</i>`;
      },
    },
    {
      id: "fnaf2close", era: 2, order: 55, year: "Late 1987",
      title: "The Toys are scrapped",
      sprites: ["freddy", "bonnie"], games: ["FNAF2"], chars: ["phoneguy"],
      body: () => `The new location closes under a cloud of scandal. The Toys are scrapped, and the withered originals are refurbished for an older restaurant that's struggling to stay open. Phone Guy keeps his job.`,
    },
    {
      id: "sl", era: 2, order: 58, year: "Unknown",
      title: "Sister Location",
      sprites: ["michael", "circusbaby", "ennard"], games: ["SL"], chars: ["michael", "elizabeth", "ennard", "william"],
      theories: ["mike"],
      body: (s) => {
        const after = {
          michael: `Barely alive and kept going by what's inside him, he heads for his father's old restaurants, and in your canon signs up as night guard <b>“Mike Schmidt”</b>.`,
          fnaf3: `He spends the following decades searching. In your canon, the trail ends at <b>Fazbear's Fright</b>.`,
          separate: `What he does in the years that follow is unknown, until Pizzeria Simulator.`,
        }[s.mike];
        return `<b>Michael Afton</b> takes a job at <b>Circus Baby's Entertainment and Rental</b>, an underground facility where his father's Funtime animatronics are stored. Circus Baby (Elizabeth) manipulates him, and on Night 5 the Funtimes merge into <b>Ennard</b>, “scoop” Michael, and wear his body to escape. Michael survives, somehow, with his body rotting: <i>“Father… it's me, Michael… I'm coming to find you.”</i> ${after}`;
      },
    },
    {
      id: "fnaf1", era: 2, order: 70, year: (s) => yr(s, 0),
      title: "Night shift (FNAF1)",
      sprites: ["guard", "freddy", "phone"], games: ["FNAF1"], chars: ["mike", "phoneguy", "gabriel", "jeremy_k", "susie", "fritz_k"],
      theories: ["fnaf1_year", "mike", "phoneguy"],
      body: (s) => {
        const guard = { michael: `<b>Mike Schmidt</b> (in your canon, Michael Afton under an alias)`, fnaf3: `<b>Mike Schmidt</b>, a stranger to the family`, separate: `<b>Mike Schmidt</b>, a stranger to the family` }[s.mike];
        const pg = {
          animatronics: `On Night 4, Phone Guy's call is cut off by banging, Freddy's jingle and a scream. The animatronics have caught him.`,
          golden: `On Night 4, Phone Guy's call ends in a scream. In your canon, <b>Golden Freddy</b> is the one who got him.`,
          survived: `On Night 4, Phone Guy's call ends in chaos, but in your canon <b>he survived</b> and went quiet.`,
        }[s.phoneguy];
        return `The refurbished originals perform at <b>Freddy Fazbear's Pizza</b>, although a newspaper clipping reports parents complaining of a bad smell, and of something like blood and mucus around their eyes and mouths. ${guard} takes the night shift. ${pg} After Night 7, Mike is fired for <i>“tampering with the animatronics, general unprofessionalism, and odor”</i>.`;
      },
    },
    {
      id: "close", era: 2, order: 74, year: (s) => yr(s, 0),
      title: "Freddy's closes for good",
      sprites: ["freddy"], games: ["FNAF1", "FNAF3"], chars: [],
      body: () => `Newspaper clippings in FNAF1 report the restaurant facing closure by the end of the year. The building is boarded up, but what's inside it is still awake.`,
    },
    {
      id: "aftondeath", era: 3, order: 78, year: (s) => (Y1(s) ? `${Y1(s)} or shortly after` : "After the closure"),
      title: "The safe room",
      sprites: ["springbonnie", "purpleguy"], games: ["FNAF3"], chars: ["william", "gabriel", "jeremy_k", "susie", "fritz_k", "cassidy"],
      body: (s) => `${KILLER(s)} returns to the closed restaurant and dismantles the animatronics. The children's spirits rise and corner him in the hidden <b>safe room</b>. He climbs into the old <b>Spring Bonnie</b> suit and laughs, until the spring-locks fail and the suit's mechanisms crush him. He's sealed in, and that's where Springtrap begins.`,
    },
    {
      id: "fnaf3", era: 3, order: 90, year: (s) => yr(s, 30),
      title: "Fazbear's Fright (FNAF3)",
      sprites: ["springtrap", "guard3"], games: ["FNAF3"], chars: ["william", "michael", "phoneguy"],
      theories: ["mike", "happiest"],
      body: (s) => {
        const g = s.mike === "fnaf3" || s.mike === "michael" ? `Its night guard is, in your canon, <b>Michael Afton</b>, still hunting his father.` : `Its night guard is never identified.`;
        const h = {
          mci: `Complete the hidden minigames and the five murdered children are released. The cake is served at last.`,
          cc: `Complete the hidden minigames and, in your canon, the <b>Crying Child</b> finally gets his happy day and is released.`,
          puppet: `Complete the hidden minigames and, in your canon, <b>Charlie</b> (the Puppet) is released. But Lefty will still be holding something in Pizzeria Simulator…`,
        }[s.happiest];
        return `Thirty years after Freddy's closed, <b>Fazbear's Fright: The Horror Attraction</b> opens, built from scavenged relics. The one genuine find is <b>Springtrap</b>: William, fused with the suit. ${g} Phantom animatronics, hallucinations caused by the faulty ventilation, haunt the cameras, and old training tapes from Phone Guy explain the spring-lock dangers. ${h}`;
      },
    },
    {
      id: "fright_fire", era: 3, order: 92, year: (s) => yr(s, 30),
      title: "The Fright burns",
      sprites: ["fire", "springtrap"], games: ["FNAF3"], chars: ["william"],
      body: () => `Fazbear's Fright burns to the ground. Some relics are salvaged and sold at auction, and Springtrap is not among the confirmed dead.`,
    },
    {
      id: "ffps", era: 3, order: 100, year: (s) => (Y1(s) ? `~${Y1(s) + 30}` : "Soon after the fire"),
      title: "Pizzeria Simulator: the trap",
      sprites: ["tape", "lefty", "fire"], games: ["FFPS"], chars: ["henry", "michael", "william", "elizabeth", "ennard", "charlie"],
      body: (s) => `Henry Emily, the <b>Cassette Man</b>, opens a pizzeria that's really a trap. Its salvage nights draw in the last haunted machines: <b>Scrap Baby</b> (Elizabeth), <b>Molten Freddy</b> (Ennard's remains), <b>Scraptrap</b> (${KSHORT(s)}) and <b>Lefty</b>, built to capture the Puppet. The volunteer running it is <b>Michael</b>. Then Henry seals the building and sets it on fire. <i>“For most of you, I believe there is peace… but for one of you, the darkest pit of Hell has opened to swallow you whole.”</i> Henry, Michael and the machines burn.`,
    },
    {
      id: "ucn", era: 3, order: 102, year: "Beyond time",
      title: "Ultimate Custom Night",
      sprites: ["goldenfreddy", "purpleguy"], games: ["UCN"], chars: ["cassidy", "william"],
      theories: ["ucn", "golden"],
      body: (s) => ({
        william: `In your canon, this is <b>William Afton's</b> hell: an endless office, every one of his victims and creations coming for him, overseen by Golden Freddy (${goldenWho(s)}).`,
        michael: `In your canon, <b>Michael</b> wakes in an endless nightmare after the fire. It's a cruel twist for the brother who tried to make things right.`,
        none: `In your canon, UCN is a celebratory challenge mode with only light story significance. Its secret cutscenes are easter eggs.`,
      })[s.ucn],
    },
    {
      id: "hw", era: 4, order: 110, year: "Present day",
      title: "Help Wanted: the VR experience",
      sprites: ["glitchtrap", "tape"], games: ["HW"], chars: ["william", "vanessa"],
      theories: ["glitchtrap"],
      body: (s) => {
        const g = {
          afton: `Hidden in the scanned circuit boards is <b>Glitchtrap</b>, ${KSHORT(s)} Afton's consciousness, surviving as code.`,
          mimic: `Hidden in the code is <b>Glitchtrap</b>, which in your canon isn't Afton at all but the <b>Mimic's</b> learned imitation of him, a copy of a copy.`,
          virus: `Hidden in the code is <b>Glitchtrap</b>, a new digital entity that wears Afton's image and wants out.`,
        }[s.glitchtrap];
        return `Fazbear Entertainment, trying to rebrand its grim legacy as fiction, hires <b>Silver Parrot Media</b> to build the <b>Freddy Fazbear Virtual Experience</b>. ${g} A beta tester is drawn in, and something follows them out of the headset.`;
      },
    },
    {
      id: "vanny", era: 4, order: 112, year: "Present day",
      title: "The birth of Vanny",
      sprites: ["vanny"], games: ["HW", "SB"], chars: ["vanessa"],
      theories: ["vanessa"],
      body: (s) => ({
        possessed: `In your canon, the tester is <b>Vanessa</b>. Controlled by Glitchtrap, she puts on a white rabbit suit and becomes <b>Vanny</b>, a stalker who serves the rabbit and hunts children.`,
        separate: `A woman in a white rabbit suit, <b>Vanny</b>, begins serving Glitchtrap. In your canon she's not Vanessa, so her real identity is unknown.`,
        afton: `In your canon, the woman who becomes <b>Vanny</b> is <b>Vanessa</b>, connected to the Afton bloodline in a nod to the 2023 film, and now Glitchtrap's devoted servant.`,
      })[s.vanessa],
    },
    {
      id: "sb", era: 5, order: 115, year: "Present day",
      title: "Security Breach",
      sprites: ["gregory", "glamfreddy", "burntrap"], games: ["SB"], chars: ["gregory", "glamfreddy", "vanessa", "william"],
      theories: ["gregory", "burntrap"],
      body: (s) => {
        const gg = { kid: "a runaway kid", android: "a kid who, in your canon, is secretly an <b>android</b>", cc: "a kid who, in your canon, carries the <b>Crying Child's</b> soul" }[s.gregory];
        const bt = {
          william: `<b>Burntrap</b>: in your canon, ${KSHORT(s)} Afton, rebuilt and still refusing to die`,
          mimic: `<b>Burntrap</b>: in your canon, the <b>Mimic</b> dressed in Afton's charred remains`,
          glitch: `<b>Burntrap</b>: in your canon, Glitchtrap's code finally downloaded into Afton's remains`,
        }[s.burntrap];
        return `<b>Gregory</b>, ${gg}, is trapped overnight in the <b>Mega Pizzaplex</b>. <b>Glamrock Freddy</b> hides him and protects him, while Vanny and the Glamrocks hunt him. In one ending, deep beneath the Pizzaplex in the burnt ruins of Henry's trap, he confronts ${bt}.`;
      },
    },
    {
      id: "ruin", era: 5, order: 120, year: "After Security Breach",
      title: "Ruin",
      sprites: ["cassie", "mimic"], games: ["RUIN"], chars: ["cassie", "gregory", "mimic"],
      body: () => `The Pizzaplex lies sealed and crumbling. <b>Cassie</b>, Gregory's friend, goes in after him, guided by Gregory's voice. But the voice isn't Gregory. It's the <b>Mimic</b>, which has learned to copy voices well enough to lure her deeper.`,
    },
    {
      id: "hw2", era: 5, order: 125, year: "After Ruin",
      title: "Help Wanted 2",
      sprites: ["glitchtrap", "cassie"], games: ["HW2"], chars: ["cassie"],
      body: () => `Fazbear returns to VR with a new “employee experience” built from mini-jobs. Under the arcade-style surface, the game ties back into Cassie's story and the digital rabbit, deepening the question of what has really been behind “Afton” all along.`,
    },
    {
      id: "puppeteer", era: 5, order: 128, year: "Your verdict",
      title: "Who's really pulling the strings?",
      sprites: (s) => (s.glitchtrap === "mimic" || s.burntrap === "mimic" ? ["mimic", "glitchtrap"] : ["purpleguy", "springtrap"]),
      games: ["SB", "RUIN", "SOTM"], chars: ["mimic", "william"],
      theories: ["glitchtrap", "burntrap"],
      body: (s) => {
        const gm = s.glitchtrap === "mimic", bm = s.burntrap === "mimic";
        if (gm && bm) return `In your canon, <b>William Afton has been dead since the fire</b>. Glitchtrap and Burntrap were both the <b>Mimic</b>, a machine that learned cruelty from Edwin Murray and then learned to be Afton. The killer lives on only as a pattern something else repeats.`;
        if (gm || bm) return `In your canon, the story splits: ${gm ? "Glitchtrap was the Mimic" : "Glitchtrap was something else"}, while ${bm ? "Burntrap was the Mimic wearing Afton's remains" : "Burntrap was Afton's own remains"}. Afton's legacy and the Mimic's imitation have become hard to tell apart.`;
        return `In your canon, it's <b>Afton, start to finish</b>: the man behind the Spring Bonnie suit, the rotting Springtrap, the digital Glitchtrap and the burnt Burntrap. The Mimic is a separate horror, not his stand-in.`;
      },
    },
  ];

  // ---------- CHARACTERS ----------
  const CHARACTERS = [
    {
      id: "william", name: "William Afton", sprite: "purpleguy", role: "Co-founder · Serial killer",
      aka: (s) => ["Purple Guy", ...(s.purple === "dave" ? ["“Dave Miller”"] : []), ...(s.purple === "vincent" ? ["“Vincent” (fan name)"] : []), "Springtrap", "Scraptrap", ...(s.glitchtrap === "afton" ? ["Glitchtrap"] : []), ...(s.burntrap === "william" ? ["Burntrap"] : [])],
      forms: (s) => ["springbonnie", "springtrap", ...(s.glitchtrap === "afton" ? ["glitchtrap"] : []), ...(s.burntrap === "william" ? ["burntrap"] : [])],
      games: ["FNAF2", "FNAF3", "SL", "FFPS", "UCN", "HW", "SB", "PIT"],
      theories: ["purple", "glitchtrap", "burntrap", "ucn"],
      bio: (s) => `Henry Emily's business partner at Fredbear's Family Diner, founder of Afton Robotics and father of Michael, Elizabeth and the Crying Child. He murdered Charlie Emily and the five children of the Missing Children Incident. When the spring-locks failed in the safe room, he became <b>Springtrap</b>. Henry's fire in Pizzeria Simulator should have finished him. ${s.glitchtrap === "afton" || s.burntrap === "william" ? "In your canon, it didn't: he came back as code, and then in burnt metal." : "In your canon, the “Afton” that came back later was mostly an imitation."}`,
    },
    {
      id: "henry", name: "Henry Emily", sprite: "henry", role: "Co-founder · Engineer",
      aka: () => ["Cassette Man"], forms: () => ["tape", "lefty"],
      games: ["FFPS"], theories: [],
      bio: () => `The engineering genius behind the original animatronics and William's “old friend”. After William murdered his daughter, Charlie, Henry spent years planning an ending. In Pizzeria Simulator he lures every remaining haunted machine into one building, alongside himself and Michael, and burns it to the ground.`,
    },
    {
      id: "michael", name: "Michael Afton", sprite: "michael", role: "Eldest Afton child",
      aka: (s) => ["Eggs Benedict (HandUnit's typo)", ...(s.mike === "michael" ? ["“Mike Schmidt”"] : [])],
      forms: () => ["michael", "ennard"],
      games: ["FNAF4", "SL", "FFPS", ...[]], theories: ["mike", "nightmares"],
      bio: (s) => `The big brother who tormented the Crying Child, and whose prank caused the Bite of '83. Following his father's instructions, he goes into Circus Baby's Entertainment and Rental, where Ennard scoops him and wears his body. He survives, rotting and purple-tinged, and devotes himself to undoing his father's work.${s.mike === "michael" ? " In your canon he worked the FNAF1 night shift as Mike Schmidt." : ""}${s.mike !== "separate" ? " He finds his father again at Fazbear's Fright." : ""} He dies in Henry's fire in Pizzeria Simulator.`,
    },
    {
      id: "elizabeth", name: "Elizabeth Afton", sprite: "elizabeth", role: "Afton's daughter",
      aka: () => ["Circus Baby", "Scrap Baby"], forms: () => ["circusbaby", "ennard"],
      games: ["SL", "FFPS"], theories: [],
      bio: () => `Despite her father's warning, she's drawn in by Circus Baby's offer of ice cream and killed by the animatronic. Her spirit lives on inside it. As Baby she manipulates Michael in Sister Location and becomes part of Ennard, before resurfacing as <b>Scrap Baby</b> and burning in Henry's fire. She seems to share her father's ambitions.`,
    },
    {
      id: "cc", name: "The Crying Child", sprite: "cryingchild", role: "Youngest Afton child",
      aka: (s) => ["“Evan” (unofficial fan name)", ...(s.golden !== "cassidy" ? ["Golden Freddy?"] : []), ...(s.shadow === "cc" && s.golden === "cassidy" ? ["Shadow Bonnie?"] : [])],
      forms: (s) => ["cryingchild", ...(s.golden !== "cassidy" ? ["goldenfreddy"] : []), ...(s.shadow === "cc" && s.golden === "cassidy" ? ["shadowbonnie"] : [])],
      games: ["FNAF4", "FNAF3"], theories: ["golden", "shadow", "nightmares", "plush", "gregory"],
      bio: (s) => `The youngest Afton, terrified of the animatronics and bullied by his older brother. He dies after the Bite of '83. ${s.golden === "cc" ? "In your canon his spirit haunts Golden Freddy." : s.golden === "both" ? "In your canon his spirit shares Golden Freddy with Cassidy." : s.shadow === "cc" ? "In your canon his spirit lingers as Shadow Bonnie." : "In your canon his spirit's fate is unknown."}${s.gregory === "cc" ? " And in your canon he returns, much later, as Gregory." : ""}`,
    },
    {
      id: "charlie", name: "Charlotte “Charlie” Emily", sprite: "charlie", role: "Henry's daughter",
      aka: () => ["The Puppet", "The Marionette", "Lefty (captured)"], forms: () => ["puppet", "lefty"],
      games: ["FNAF2", "FNAF3", "FFPS"], theories: ["happiest"],
      bio: (s) => `Murdered by ${KSHORT(s)} outside the restaurant, Charlie's spirit inhabits <b>the Puppet</b>, a protector who gave the murdered children a second life inside the animatronics. In Pizzeria Simulator, Henry captures her inside <b>Lefty</b> and apologises to her before the end.`,
    },
    ...[
      ["gabriel", "Gabriel", "freddy"],
      ["jeremy_k", "Jeremy", "bonnie"],
      ["susie", "Susie", "chica"],
      ["fritz_k", "Fritz", "foxy"],
      ["cassidy", "Cassidy", "goldenfreddy"],
    ].map(([id, nm, spr]) => ({
      id, name: nm, sprite: spr, role: "MCI victim",
      aka: (s) => [possessed(s, id)],
      forms: () => [spr],
      games: id === "cassidy" ? ["FNAF1", "FNAF2", "UCN"] : ["FNAF1", "FNAF2", "FNAF3"],
      theories: id === "cassidy" ? ["golden", "mci_map", "ucn"] : ["mci_map", "happiest"],
      bio: (s) => `One of the five children murdered by ${KSHORT(s)} in the Missing Children Incident (${s.mci_year === "y1985" ? "1985" : "1987"}). The name comes from tie-in material. In your canon, this spirit ended up in ${possessed(s, id)}.${id === "cassidy" && s.ucn === "william" ? " Often seen as the jailer of Ultimate Custom Night." : ""}${s.happiest === "mci" && id !== "cassidy" ? " Freed in FNAF3's good ending." : ""}`,
    })),
    {
      id: "phoneguy", name: "Phone Guy", sprite: "phone", role: "Trainer · Voice on the phone",
      aka: () => ["(never named)"], forms: () => ["phone", "tape"],
      games: ["FNAF1", "FNAF2", "FNAF3"], theories: ["phoneguy"],
      bio: (s) => `A cheerful, nervous employee who leaves recorded messages for the night guards of FNAF2 and FNAF1 and records the training tapes heard in FNAF3. ${({ animatronics: "In your canon, the animatronics caught him on Night 4.", golden: "In your canon, Golden Freddy killed him on Night 4.", survived: "In your canon, he made it out of Night 4 alive." })[s.phoneguy]}`,
    },
    {
      id: "mike", name: "Mike Schmidt", sprite: "guard", role: "FNAF1 night guard",
      aka: (s) => (s.mike === "michael" ? ["Michael Afton"] : []), forms: () => ["guard"],
      games: ["FNAF1"], theories: ["mike"],
      bio: (s) => `Worked five nights (and two more) at Freddy Fazbear's Pizza for $120 a week, then got fired for tampering, unprofessionalism and odor. ${({ michael: "In your canon, he's really Michael Afton.", fnaf3: "In your canon he's an ordinary man, and Michael is the FNAF3 guard instead.", separate: "In your canon, he's just a guy." })[s.mike]}`,
    },
    {
      id: "jeremyf", name: "Jeremy Fitzgerald", sprite: "guard2", role: "FNAF2 night guard",
      aka: () => [], forms: () => ["guard2"], games: ["FNAF2"], theories: ["bite87_victim"],
      bio: (s) => `Night guard at the new 1987 location, later moved to the day shift for a birthday party. ${s.bite87_victim === "jeremy" ? "In your canon, he's the victim of the Bite of '87." : "In your canon, he walks away with his frontal lobe intact."}`,
    },
    {
      id: "fritzs", name: "Fritz Smith", sprite: "guard3", role: "FNAF2 Night 7",
      aka: () => [], forms: () => ["guard3"], games: ["FNAF2"], theories: [],
      bio: () => `Covered FNAF2's seventh night and was fired the next day for tampering with the animatronics and for odor. His first name is the same as one of the MCI victims', which is either a coincidence or something more.`,
    },
    {
      id: "vanessa", name: "Vanessa / Vanny", sprite: "vanessa", role: "Pizzaplex night guard",
      aka: (s) => (s.vanessa === "separate" ? [] : ["Vanny"]), forms: () => ["vanessa", "vanny"],
      games: ["HW", "SB"], theories: ["vanessa", "glitchtrap"],
      bio: (s) => `The Mega Pizzaplex's night security guard. ${({ possessed: "In your canon she's also Vanny: a former tester corrupted by Glitchtrap who hunts children in a white rabbit suit.", separate: "In your canon she's not Vanny, and the rabbit-suited stalker is someone else.", afton: "In your canon she's both Vanny and tied to the Afton family, in a nod to the 2023 film." })[s.vanessa]}`,
    },
    {
      id: "gregory", name: "Gregory", sprite: "gregory", role: "Security Breach protagonist",
      aka: () => [], forms: () => ["gregory"], games: ["SB", "RUIN"], theories: ["gregory"],
      bio: (s) => `A sharp, secretive kid who spends a night evading the Pizzaplex with Glamrock Freddy's help. ${({ kid: "In your canon, he's just a real kid with a hard life.", android: "In your canon, he's an android.", cc: "In your canon, he's the Crying Child's soul, returned." })[s.gregory]}`,
    },
    {
      id: "cassie", name: "Cassie", sprite: "cassie", role: "Ruin protagonist",
      aka: () => [], forms: () => ["cassie"], games: ["RUIN", "HW2"], theories: [],
      bio: () => `Gregory's friend, who goes into the ruined Pizzaplex to find him and is led astray by the Mimic's imitation of his voice.`,
    },
    {
      id: "mimic", name: "The Mimic", sprite: "mimic", role: "Learning endoskeleton",
      aka: (s) => [...(s.glitchtrap === "mimic" ? ["Glitchtrap"] : []), ...(s.burntrap === "mimic" ? ["Burntrap"] : [])],
      forms: (s) => ["mimic", ...(s.glitchtrap === "mimic" ? ["glitchtrap"] : []), ...(s.burntrap === "mimic" ? ["burntrap"] : [])],
      games: ["RUIN", "SOTM", "BOOKS"], theories: ["glitchtrap", "burntrap", "books"],
      bio: (s) => `Edwin Murray's endoskeleton, built to learn by copying. It picked up its creator's grief-fuelled violence and kept learning. In Ruin it lures Cassie with Gregory's voice. ${s.glitchtrap === "mimic" || s.burntrap === "mimic" ? "In your canon it has also spent years impersonating William Afton." : "In your canon, it's a separate monster from Afton."}`,
    },
    {
      id: "edwin", name: "Edwin Murray", sprite: "edwin", role: "Inventor",
      aka: () => [], forms: () => ["edwin", "mimic"], games: ["SOTM", "BOOKS"], theories: ["books"],
      bio: () => `The inventor behind the Mimic and the subject of Secret of the Mimic, whose workshop holds the machine's origins.`,
    },
    {
      id: "glamfreddy", name: "Glamrock Freddy", sprite: "glamfreddy", role: "Pizzaplex rockstar",
      aka: () => [], forms: () => ["glamfreddy"], games: ["SB", "RUIN"], theories: [],
      bio: () => `The Pizzaplex's headline animatronic, who glitches out of the night's hunt to hide and protect Gregory. A popular theory says a familiar spirit, perhaps Gabriel, is behind his kindness.`,
    },
    {
      id: "ennard", name: "Ennard", sprite: "ennard", role: "Fused Funtimes",
      aka: () => ["Molten Freddy (remains)"], forms: () => ["ennard"], games: ["SL", "FFPS"], theories: [],
      bio: () => `A mass of wires and faceplates formed when Circus Baby, Ballora, Funtime Freddy and Funtime Foxy merge. Ennard wears Michael's body to escape into the world, then abandons it. Its remains return as Molten Freddy.`,
    },
    {
      id: "oswald", name: "Oswald", sprite: "oswald", role: "Into the Pit protagonist",
      aka: () => [], forms: () => ["oswald"], games: ["PIT", "BOOKS"], theories: ["books"],
      bio: () => `A bored kid in a small town who finds that the ball pit at Jeff's Pizza is a doorway to 1985, and to the yellow rabbit.`,
    },
  ];

  // ---------- RELATIONSHIPS ----------
  // a -> b with rel (from a's view) and rev (from b's view). when(s) optional => theory-dependent edge.
  const EDGES = [
    { a: "william", b: "henry", rel: "business partner of", rev: "business partner of" },
    { a: "henry", b: "william", rel: "trapped & burned", rev: "burned by", hide: true },
    { a: "william", b: "michael", rel: "father of", rev: "son of" },
    { a: "william", b: "elizabeth", rel: "father of", rev: "daughter of" },
    { a: "william", b: "cc", rel: "father of", rev: "son of" },
    { a: "henry", b: "charlie", rel: "father of", rev: "daughter of" },
    { a: "william", b: "charlie", rel: "murdered", rev: "murdered by", k: "kill" },
    ...["gabriel", "jeremy_k", "susie", "fritz_k", "cassidy"].map((b) => ({ a: "william", b, rel: "murdered", rev: "murdered by", k: "kill" })),
    ...["gabriel", "jeremy_k", "susie", "fritz_k", "cassidy"].map((b) => ({ a: "charlie", b, rel: "gave life to", rev: "given life by" })),
    { a: "michael", b: "cc", rel: "bullied (Bite of '83)", rev: "bullied by", k: "kill" },
    { a: "michael", b: "elizabeth", rel: "brother of", rev: "sister of" },
    { a: "elizabeth", b: "ennard", rel: "merged into", rev: "contains" },
    { a: "ennard", b: "michael", rel: "scooped & wore", rev: "scooped by" },
    { a: "henry", b: "michael", rel: "enlisted (FFPS)", rev: "volunteer for" },
    { a: "michael", b: "mike", rel: "same person as", rev: "really", when: (s) => s.mike === "michael" },
    { a: "cc", b: "cassidy", rel: "shares Golden Freddy with", rev: "shares Golden Freddy with", when: (s) => s.golden === "both" },
    { a: "cassidy", b: "william", rel: "torments (UCN)", rev: "tormented by", when: (s) => s.ucn === "william" },
    { a: "phoneguy", b: "mike", rel: "trained", rev: "trained by" },
    { a: "phoneguy", b: "jeremyf", rel: "trained", rev: "trained by" },
    { a: "glamfreddy", b: "gregory", rel: "protects", rev: "protected by" },
    { a: "gabriel", b: "glamfreddy", rel: "may inhabit", rev: "may be inhabited by", when: (s) => s.mci_map === "books" },
    { a: "gregory", b: "cassie", rel: "friend of", rev: "friend of" },
    { a: "vanessa", b: "gregory", rel: "hunts (as Vanny)", rev: "hunted by", when: (s) => s.vanessa !== "separate" },
    { a: "william", b: "vanessa", rel: "controls (as Glitchtrap)", rev: "controlled by", when: (s) => s.glitchtrap === "afton" && s.vanessa !== "separate" },
    { a: "mimic", b: "vanessa", rel: "controls (as Glitchtrap)", rev: "controlled by", when: (s) => s.glitchtrap === "mimic" && s.vanessa !== "separate" },
    { a: "william", b: "vanessa", rel: "related to", rev: "related to", when: (s) => s.vanessa === "afton" },
    { a: "edwin", b: "mimic", rel: "created", rev: "created by" },
    { a: "mimic", b: "cassie", rel: "lured (as Gregory's voice)", rev: "lured by" },
    { a: "mimic", b: "william", rel: "imitates", rev: "imitated by", when: (s) => s.glitchtrap === "mimic" || s.burntrap === "mimic" },
    { a: "gregory", b: "william", rel: "defeats (as Burntrap)", rev: "defeated by", when: (s) => s.burntrap !== "mimic" },
    { a: "gregory", b: "mimic", rel: "defeats (as Burntrap)", rev: "defeated by", when: (s) => s.burntrap === "mimic" },
    { a: "gregory", b: "cc", rel: "reincarnation of", rev: "reborn as", when: (s) => s.gregory === "cc" },
    { a: "william", b: "oswald", rel: "stalks (as the yellow rabbit)", rev: "stalked by" },
  ];

  // ---------- ARCHIVE ----------
  const GLOSSARY = [
    ["Spring-lock suits", "Hybrid costume/animatronics from Fredbear's era. Coiled springs hold the machinery back so that a person can wear the suit. Moisture or a sudden movement can release them, with fatal results."],
    ["Missing Children Incident (MCI)", "Five children lured into a back room by a man in the Spring Bonnie suit. Their spirits go on to haunt the animatronics."],
    ["Bite of '83", "FNAF4's tragedy: Fredbear's jaws close on the Crying Child's head during a cruel prank."],
    ["Bite of '87", "A daytime attack mentioned by Phone Guy in FNAF1. The victim lost their frontal lobe but survived."],
    ["Remnant", "A concept from tie-in material: soul-charged metal that explains how spirits bind to machines and keep bodies like Michael's going."],
    ["Agony", "A concept from the Fazbear Frights books: concentrated, violent emotion that can cling to objects and animate them."],
    ["Afton Robotics", "William's company. It built the Funtime animatronics, complete with hidden capture features."],
    ["Phantoms", "FNAF3's hallucinated animatronics, blamed on the faulty ventilation."],
    ["Nightmares", "The monstrous animatronics of FNAF4's bedroom, later reused as playable horrors in UCN and Help Wanted."],
    ["Fazbear's Fright", "A horror attraction built from Freddy's relics, 30 years after the restaurants closed. Home to Springtrap."],
    ["Silver Parrot Media", "The developer, within the story, of Help Wanted's VR game, which accidentally gave Glitchtrap a home."],
    ["Mega Pizzaplex", "Fazbear Entertainment's vast entertainment complex, built over the ruins of Henry's burnt trap."],
    ["“IT'S ME”", "A recurring hallucinated message, associated with Golden Freddy since FNAF1."],
    ["Salvage", "Pizzeria Simulator's mechanic for taking in strange animatronics found in alleys. It's Henry's bait."],
  ];

  const CONTINUITIES = [
    ["The games", "The core timeline on this site: FNAF1 (2014) through Secret of the Mimic (2025)."],
    ["The Silver Eyes trilogy", "Novels (2015–2018) starring an adult Charlie. They share names with the games but form a separate continuity."],
    ["Fazbear Frights & Tales from the Pizzaplex", "Anthology books (2019–2023). They introduced Remnant, Agony and the Mimic. How canon they are is debated, so use the BOOK CANON theory."],
    ["The films", "Five Nights at Freddy's (2023) and its sequel (2025) form their own continuity. Vanessa is Afton's daughter there."],
    ["FNaF World", "A 2016 RPG spin-off, generally treated as non-canon fun, despite a few lore-tinged secrets."],
  ];

  const PRESETS = {
    mainstream: { name: "MAINSTREAM", desc: "The most widely accepted reading." },
    classic: {
      name: "CLASSIC 2015", desc: "Pre-Sister Location theorist energy.",
      set: { purple: "vincent", golden: "cc", shadow: "cc", nightmares: "hallucination", plush: "imagination", mci_year: "y1987", mci_map: "unknown", bite87: "foxy", bite87_victim: "jeremy", fnaf1_year: "y1988", mike: "separate", phoneguy: "golden", happiest: "cc", ucn: "none", glitchtrap: "virus", burntrap: "william", vanessa: "separate", gregory: "cc", books: "separate" },
    },
    mimic: {
      name: "MIMIC ERA", desc: "Afton has been dead a long time…",
      set: { glitchtrap: "mimic", burntrap: "mimic", books: "shared", gregory: "kid", vanessa: "possessed" },
    },
    random: { name: "RANDOM", desc: "Spin the prize wheel." },
  };

  window.LORE = { THEORIES, ERAS, EVENTS, CHARACTERS, EDGES, GAMES, GLOSSARY, CONTINUITIES, PRESETS };
})();
