/* =========================================================
   GRAND THEORIES: complete, overarching timeline readings.
   `set` maps each one onto the theory board (unlisted theories
   use the mainstream default), so it can be loaded into your
   canon and compared side by side.
   Loaded after data.js / minigames.js and before app.js.
   ========================================================= */
(function () {
  const GRAND = [
    {
      id: "afton_saga", name: "The Afton Saga", tag: "MAINSTREAM", sprite: "purpleguy",
      since: "The standard reading since Pizzeria Simulator (2017), extended through Security Breach.",
      summary: "One man and one curse. William Afton's crimes, and his refusal to stay dead, drive every game from Fredbear's to the Pizzaplex, while his children live with the consequences.",
      differences: [
        "William Afton is the villain in every era, even after death. Springtrap, Scraptrap, Glitchtrap and Burntrap are all him.",
        "Michael Afton is the hero who follows his father through FNAF1, FNAF3 and Pizzeria Simulator.",
        "The Missing Children Incident happens in 1985, before FNAF2, and Golden Freddy is Cassidy.",
        "Henry's fire ends the classic story, UCN is Afton's hell, and the digital age is Afton's comeback.",
      ],
      set: {},
      sections: [
        { name: "Origins", beats: [
          ["Before 1983", "William Afton and Henry Emily open Fredbear's Family Diner with its spring-lock suits."],
          ["1980s", "Elizabeth Afton is killed by Circus Baby, and her soul lives on inside it."],
          ["1983", "FNAF4: the Crying Child's nightmares end in the Bite of '83."],
        ] },
        { name: "The Murders", beats: [
          ["Mid-1980s", "William kills Charlie outside the restaurant, and she becomes the Puppet."],
          ["1985", "The Missing Children Incident: five children, five haunted animatronics."],
        ] },
        { name: "The Restaurants", beats: [
          ["1987", "FNAF2: the Toy restaurant, Jeremy's week, and the Bite of '87 (Mangle)."],
          ["Unknown", "Sister Location: Michael is scooped by Ennard and survives, rotting."],
          ["1993", "FNAF1: Michael works the night shift as “Mike Schmidt”."],
          ["1993", "William dismantles the animatronics, and the spring-locks kill him."],
        ] },
        { name: "Endings", beats: [
          ["2023", "FNAF3: Fazbear's Fright, Springtrap, and the five souls freed."],
          ["~2023", "Pizzeria Simulator: Henry lures everyone in and burns it all down."],
          ["Beyond", "Ultimate Custom Night: William's personal hell."],
        ] },
        { name: "The Pizzaplex", beats: [
          ["Present", "Help Wanted: Afton's code survives as Glitchtrap and corrupts Vanessa into Vanny."],
          ["Present", "Security Breach: Burntrap, William once more, is destroyed beneath the Pizzaplex."],
          ["After", "Ruin and Secret of the Mimic: the Mimic emerges as a separate horror."],
        ] },
      ],
    },
    {
      id: "mimic", name: "The Mimic Timeline", tag: "POPULAR", sprite: "mimic",
      since: "Gained ground after Ruin (2023) and Secret of the Mimic (2025).",
      summary: "Afton died in Henry's fire and stayed dead. Everything that looked like Afton afterwards was the Mimic, a learning machine that copied his cruelty.",
      differences: [
        "William Afton's story ends with Pizzeria Simulator and UCN. He never comes back.",
        "Glitchtrap and Burntrap are the Mimic's imitations of Afton.",
        "The modern-era horror starts with Edwin Murray's grief, not with Afton's ambition.",
        "The Tales from the Pizzaplex books, where the Mimic first appeared, are treated as real history.",
      ],
      set: { glitchtrap: "mimic", burntrap: "mimic", books: "shared", gregory: "kid", vanessa: "possessed", ucn: "william" },
      sections: [
        { name: "Two Origins", beats: [
          ["Era uncertain", "Edwin Murray builds the Mimic, and it learns violence from his grief."],
          ["Before 1983", "Separately, Fredbear's opens and William Afton's crimes begin."],
        ] },
        { name: "The Afton Era", beats: [
          ["1983–1993", "The classic story plays out much as in the mainstream reading: the Bite, the MCI, FNAF2 and FNAF1."],
          ["1993", "William's spring-lock death in the safe room."],
          ["~2023", "FNAF3 and Pizzeria Simulator: Henry's fire ends William for good."],
          ["Beyond", "UCN is his final judgement, and nothing comes after it."],
        ] },
        { name: "The Imitation", beats: [
          ["Present", "Help Wanted: Glitchtrap appears, the Mimic wearing Afton's personality like a costume."],
          ["Present", "Security Breach: Vanny serves “Afton”. Burntrap is the Mimic, dressed in his remains."],
          ["After", "Ruin: the Mimic is exposed, imitating Gregory's voice to lure Cassie."],
          ["2025", "Secret of the Mimic goes back to where it all began."],
        ] },
      ],
    },
    {
      id: "classic", name: "Classic 2015", tag: "OUTDATED", sprite: "goldenfreddy",
      since: "The rough consensus before Sister Location (2014–2016).",
      summary: "Before the Aftons had names: a tight story about a “Purple Guy”, five ghosts and a mysterious crying child, with fierce arguments over whether FNAF4's bite was the Bite of '87.",
      differences: [
        "The killer is a nameless Purple Guy, nicknamed “Vincent” by fans. There's no Afton family.",
        "FNAF2 is the 1987 prequel, and the five children are murdered during its week.",
        "Many placed FNAF4's bite in 1987 and called it the Bite of '87. Later games set it in 1983.",
        "Golden Freddy and Shadow Bonnie are both the Crying Child. FNAF3's good ending frees everyone and the story is over.",
      ],
      set: { purple: "vincent", golden: "cc", shadow: "cc", nightmares: "hallucination", plush: "imagination", mci_year: "y1987", mci_map: "unknown", bite87: "foxy", bite87_victim: "jeremy", fnaf1_year: "y1988", mike: "separate", phoneguy: "golden", happiest: "cc", ucn: "none", glitchtrap: "virus", burntrap: "william", vanessa: "separate", gregory: "cc", books: "separate", motorist: "hunt", fruity: "lured", princess: "allegory" },
      sections: [
        { name: "Before Freddy's", beats: [
          ["Unknown", "Fredbear's Family Diner: a crying child is bitten, and fans argue over whether it's '83 or '87."],
          ["Unknown", "Purple Guy kills a child outside the restaurant, and the Puppet is born."],
        ] },
        { name: "1987", beats: [
          ["Nov 1987", "FNAF2: the Toy restaurant. Five children are murdered by a man in a spare yellow suit."],
          ["1987", "The Bite of '87 (Foxy, or maybe Mangle). Jeremy is on the day shift."],
          ["1987", "The new location closes, and the old animatronics are kept."],
        ] },
        { name: "The Late '80s", beats: [
          ["~1988", "FNAF1: Mike Schmidt's week. Phone Guy dies on Night 4, maybe to Golden Freddy."],
          ["Afterwards", "Purple Guy dismantles the animatronics and dies in the Spring Bonnie suit."],
        ] },
        { name: "Thirty Years Later", beats: [
          ["~2018", "FNAF3: Fazbear's Fright. Springtrap stalks the attraction, the souls are freed, and it burns."],
          ["The end?", "The story was thought to be over… until Sister Location arrived."],
        ] },
      ],
    },
    {
      id: "michael", name: "Michael's Penance", tag: "POPULAR", sprite: "michael",
      since: "“Michael is everywhere” readings, from 2017 onward.",
      summary: "The whole series as one son's guilt and penance. The brother who caused the Bite spends his life, and his afterlife, undoing his father's work.",
      differences: [
        "Michael is the player in FNAF4 (reliving his guilt), Sister Location, FNAF1, FNAF3 and Pizzeria Simulator.",
        "Mike Schmidt is Michael under an alias, kept alive by Remnant after Ennard left him.",
        "Midnight Motorist shows the Afton house, the family before it fell apart.",
        "It's a redemption arc that ends in Henry's fire, where Michael finally finds peace.",
      ],
      set: { mike: "michael", nightmares: "michael", motorist: "afton_home", ucn: "william", happiest: "mci" },
      sections: [
        { name: "Guilt", beats: [
          ["Early 1980s", "Midnight Motorist: a glimpse of the Afton household at night."],
          ["1983", "Michael's prank causes the Bite of '83."],
          ["Years later", "FNAF4's nightmares are Michael's own, reliving what he did."],
        ] },
        { name: "The Scooping", beats: [
          ["Unknown", "Sent by his father, Michael goes into Circus Baby's Entertainment and Rental. Ennard scoops him."],
          ["Unknown", "Purple and rotting, he speaks to his father: “I'm coming to find you.”"],
        ] },
        { name: "The Hunt", beats: [
          ["1993", "FNAF1: Michael (“Mike Schmidt”) works the night shift at his father's old restaurant."],
          ["2023", "FNAF3: Michael is the guard who faces Springtrap and burns down the Fright."],
        ] },
        { name: "Penance", beats: [
          ["~2023", "Pizzeria Simulator: Michael runs Henry's trap and dies in the fire."],
          ["After", "For most of them there's peace, Michael included. William gets UCN."],
        ] },
      ],
    },
    {
      id: "crying_child", name: "The Crying Child Cycle", tag: "FRINGE", sprite: "cryingchild",
      since: "Pieced together from 2015–2021 theories.",
      summary: "The youngest Afton never really leaves. His spirit drives the hauntings, guides the other children, and comes back one last time to finish off his father.",
      differences: [
        "The Crying Child shares Golden Freddy with Cassidy and also appears as Shadow Bonnie.",
        "FNAF3's Happiest Day is his release, but it doesn't last.",
        "The Fredbear plush is a separate entity watching over him.",
        "Gregory is the Crying Child returned, and he defeats Burntrap.",
      ],
      set: { golden: "both", shadow: "cc", happiest: "cc", gregory: "cc", plush: "entity", ucn: "william" },
      sections: [
        { name: "Death", beats: [
          ["1983", "The Bite of '83. A voice promises: “I will put you back together.”"],
          ["1983", "His spirit joins Cassidy inside Golden Freddy."],
        ] },
        { name: "The Guardian", beats: [
          ["1985–1993", "Golden Freddy and Shadow Bonnie haunt the restaurants, helping the other children."],
          ["2023", "FNAF3: his Happiest Day, at last."],
        ] },
        { name: "The Return", beats: [
          ["Present", "Security Breach: a strangely capable boy named Gregory turns up in the Pizzaplex."],
          ["Present", "Gregory and Freddy destroy Burntrap, and the son finally ends the father."],
        ] },
      ],
    },
    {
      id: "remnant", name: "The Remnant Universe", tag: "POPULAR", sprite: "springtrap",
      since: "The merged books-and-games reading, from 2019 onward.",
      summary: "The books aren't side stories. Remnant, Agony and the strange technology of Fazbear Frights explain how souls bind to metal, how Afton survives, and why everything Fazbear makes is cursed.",
      differences: [
        "Remnant, metal infused with souls, drives the whole story, from the Puppet to Michael's survival.",
        "FNAF4's Nightmares and the Fredbear plush are real Afton experiments.",
        "Glitchtrap's code is downloaded into Afton's remains to become Burntrap.",
        "Events from Fazbear Frights and Tales from the Pizzaplex, the Mimic included, are part of the same history.",
      ],
      set: { books: "shared", shadow: "remnant", nightmares: "real", plush: "william", burntrap: "glitch", fruity: "mci" },
      sections: [
        { name: "Experiments", beats: [
          ["Before 1983", "Afton studies Remnant: what's left of a soul when it's bound to metal."],
          ["1983", "FNAF4: the Nightmares and the watching plush are his work."],
        ] },
        { name: "Binding", beats: [
          ["1985", "The MCI. Remnant binds five souls to five machines. Fruity Maze shows Susie being lured."],
          ["Unknown", "Michael survives Ennard because of the Remnant left inside him."],
        ] },
        { name: "Persistence", beats: [
          ["~2023", "Henry's fire burns the Remnant-laden machines, but not every trace of it."],
          ["Present", "Help Wanted: boards tainted with Afton's Remnant seed Glitchtrap."],
          ["Present", "Security Breach: Glitchtrap is downloaded into Afton's remains to become Burntrap."],
          ["Always", "The books' cursed toys, Agony-driven objects and the Mimic all share this world."],
        ] },
      ],
    },
  ];

  // Rows shown in the comparison table
  const COMPARE = ["purple", "mci_year", "golden", "nightmares", "mike", "happiest", "ucn", "glitchtrap", "burntrap", "gregory", "books"];

  window.LORE.GRAND = GRAND;
  window.LORE.GRAND_COMPARE = COMPARE;
})();
