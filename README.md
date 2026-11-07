# LORE TAPES — an interactive FNAF theory timeline

An unofficial, retro 8-bit styled fan tool that lays out the whole Five Nights at Freddy's story, from Fredbear's Family Diner to the Mega Pizzaplex. Wherever fans disagree, **you choose the theory** and the timeline, character files, connections and dates rewrite themselves.

## Features

- **Timeline**: 36 events grouped into "12 AM → 6 AM" eras. Contested events have inline theory pickers, and anything your choice changes flashes **REWRITTEN**. You can search, filter by character, or show only contested events, and a little sprite walks the progress rail as you scroll.
- **Grand Theories**: six complete readings of the series (The Afton Saga, The Mimic Timeline, Classic 2015, Michael's Penance, The Crying Child Cycle, The Remnant Universe). Each has a summary, what makes it different, a condensed timeline in collapsible sections, a % match against your canon, a one-click "load into my canon" button, and a side-by-side comparison table.
- **Minigames**: an arcade cabinet with beat-by-beat replays of 13 hidden minigames (Take Cake to the Children, Give Gifts Give Life, SAVE THEM, Foxy Go! Go! Go!, FNAF3's after-night and hidden cake games, FNAF4's countdown, Circus Baby, Security Puppet, Fruity Maze, Midnight Motorist and Princess Quest). Each replay explains what it reveals, links to the timeline, and has inline theory pickers. The replays are original pixel art, not copies of the real games.
- **Theories**: 25 open questions (Purple Guy, Golden Freddy, Mike = Michael?, the Bite of '87, MCI year, Glitchtrap, Burntrap, the Mimic, Gregory, Vanny, book canon…). Each option has a community tag (CONFIRMED / MAINSTREAM / POPULAR / FRINGE / OUTDATED / CROSSOVER), the case for and against, and links to everything it affects.
- **Characters**: 24 dossiers whose bios, aliases and forms all follow your choices.
- **Connections**: a radial relationship web. Click anyone to recentre it. Dashed gold links exist only under certain theories.
- **Archive**: a plain-text summary of "your canon", plus a game list, a glossary and a guide to the continuities.
- **Presets**: Mainstream, Classic 2015, Mimic Era, Random.
- **Shareable**: your choices are stored in the URL (`?c=…`) and in localStorage.
- Optional 8-bit sound effects, CRT scanlines, and a static burst whenever the timeline is rewritten. Respects `prefers-reduced-motion`.
- All sprites are original 16×16 pixel art, generated in code (`js/sprites.js`).

## Deploy to GitHub Pages

No build step. It's plain HTML, CSS and JS.

1. Create a new GitHub repository and push this folder to it.
2. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
3. The site will be live at `https://<you>.github.io/<repo>/` in a minute or two.

The `.nojekyll` file tells Pages to serve the files as-is.

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Add `?skipintro` to the URL to skip the title screen.

## Editing the lore

Everything lives in `js/data.js`:

- `THEORIES`: each question and its options (`id`, `label`, `tag`, `desc`, `pro`, `con`). The **first option is the default** ("Mainstream").
- `EVENTS`: timeline entries. `year`, `order`, `era`, `title`, `body` and `sprites` can be plain values or functions of the state `s`, for example `(s) => s.mike === "michael" ? … : …`. List the theory ids an event depends on in `theories: [...]` to show the inline pickers.
- `CHARACTERS` and `EDGES`: dossiers and relationships. Give an edge `when: (s) => …` to make it theory-dependent.
- `js/minigames.js`: the minigame replays (`beats` with a background, a caption and sprite positions), plus the theories and events they add. Link a timeline event to a replay with `minigames: ["id"]`.
- `js/expansion.js`: Secret of the Mimic, Help Wanted 1 & 2, Special Delivery and other additions (theories, events, characters). New theories go at the end of the list so old share links keep working.
- `js/grand.js`: the grand theories. `set` maps each one onto the theory board (anything unlisted uses the mainstream answer), and `sections` holds its condensed timeline.
- Sprites: add a new entry to `DEF` in `js/sprites.js` using one of the templates (`bear`, `rabbit`, `chicken`, `fox`, `puppet`, `human`, `endo`, …) and a palette.

> Share links store choices as option indexes. If you reorder options or theories, old links will map to different choices, so add new options at the **end**.

## Disclaimer

This is an unofficial fan project for discussion and fun. It is not affiliated with or endorsed by Scott Cawthon, Steel Wool Studios or any rights holder. Five Nights at Freddy's and its characters belong to their respective owners. Theory tags reflect common fan discussion, not official statements.
