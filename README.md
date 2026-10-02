# Sedhacks 2026

A responsive, single-page website for the SEDS REC student hackathon at Rajalakshmi Engineering College, Chennai. It uses static HTML, CSS and JavaScript, so there is no package installation or build step.

## Preview locally

From the project folder, run:

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

Then open [http://127.0.0.1:8765](http://127.0.0.1:8765).

## Live site

**Live website:** [https://yashwanthdevelops.github.io/Sedhacks-2026-Hackathon-Website/](https://yashwanthdevelops.github.io/Sedhacks-2026-Hackathon-Website/)

GitHub Actions publishes updates whenever a commit is pushed to `main`.

## What’s included

- Event overview, launch countdown, schedule, five hackathon tracks, prize details, partner information and FAQ.
- A highlighted launch window with a live countdown, plus direct registration access in the navigation.
- Keyboard-operable track tabs and FAQ controls.
- Slow cloud and scene motion, section reveals, clean track transitions and a subtle registration outline pulse. Ambient movement can be paused; the site follows the system’s reduced-motion setting.
- Self-hosted fonts and WebP artwork, with no SVG assets.

## Project layout

- `index.html` — page content and semantic structure.
- `styles.css` — layout, responsive styles and motion.
- `main.js` — countdown, track tabs, FAQ, navigation state and motion controls.
- `assets/art/` — generated WebP scenes used by the page.
- `assets/images/` — optimized WebP identity and portrait images.
- `assets/source/` — supplied source images and the visual reference.

## Updating event details

Edit `CONFIG` in `main.js` for the kickoff countdown, registration link, timeline, tracks and FAQ. Keep matching date text and `<time>` values in `index.html` in sync. Replace artwork in `assets/art/` or `assets/images/` while preserving the filenames referenced by the page.
