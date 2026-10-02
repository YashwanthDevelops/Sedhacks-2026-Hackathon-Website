# Sedhacks 2026 — website implementation plan

## Summary

Build one responsive, single-page site with vanilla HTML, CSS and JavaScript. Use the supplied Sedhacks badge as the top-left event logo, preserve the reference’s continuous navy star field and pixel-art chapter composition, and create the missing space-themed artwork as original stepped SVG or pixel-grid assets. Do not add routes, unprovided event claims, registration hours or fake contact/social links.

The section order is fixed: Header → Hero → Timer → Timeline → Tracks → Prizes → Sponsors → About SEDS → FAQ → Footer.

Use the provided type and colour tokens. The values of layout dimensions and font sizes below are implementation estimates, labelled by confidence; they are not measurements of the reference’s original CSS. The supplied design tokens, content, event times and asset dimensions are confirmed inputs.

## 1. Grounding, assets and visual direction

### Reference and identity

- **Observed:** The supplied reference is a 640 × 4,500 px full-page image. It has a continuous deep navy star field, blue-violet cloud bands, pixel-art chapter scenes, terminal-style headings, generous vertical gaps, a dotted yellow timeline, open trophy composition, stepped forms, and a scenic pixel footer.
- **Observed:** The hero is centred; most chapter headings align to a shared left edge. The reference uses no general-purpose rounded cards, glass panels or soft shadows.
- **Observed:** The reference’s top-left corner contains another event’s identity. Replace it with the supplied Sedhacks 2026 badge. Keep that badge as the only logo in the top-left header position and link it to the hero.
- **Observed:** The supplied badge is a transparent RGBA PNG, 1,354 × 1,162 px, with a white word panel, cyan and blue pixel illustration, navy lettering and small yellow/red details. Preserve the supplied artwork and its original colours.
- **Observed:** The supplied pixel-art portrait is an RGBA PNG, 1,312 × 1,199 px. Its visible palette includes deep and bright blues, white hair, warm skin tones and a small red accent. Use its blue/white palette to anchor the new art. Preserve the portrait itself.
- **Observed:** The SEDS REC logo is a 1,254 × 1,254 px transparent RGBA PNG. The REC logo is SVG with a 288 × 93 viewBox. The Aeroin Space Tech logo is a 406 × 406 px RGBA PNG.
- **Unknown:** The original browser viewport and original font files are not available. The reference image width is not proof that the original page used a 640 px viewport.
- **Inferred — proposed:** Keep #040942 as the page base. Preserve the supplied tokens below; let the original illustrations carry blue/cyan/white, with the provided violet, pink, red and gold tokens as controlled accents.

### Asset locations to use

| Asset | Verified location | Use |
|---|---|---|
| Sedhacks 2026 badge | C:\Users\Yashwanth\Downloads\Sedhacks 2026 pixel-art badge.png | Header logo at top left; link to the hero |
| SEDS REC logo | C:\Users\Yashwanth\Downloads\Seds Logo.png | About SEDS section |
| REC logo | C:\Users\Yashwanth\Downloads\download.svg | Header right |
| Hero pixel-art portrait | C:\Users\Yashwanth\Downloads\Chest-up pixel-art portrait of Abdul Kalam.png | Centred in hero |
| Aeroin Space Tech logo | C:\Users\Yashwanth\Downloads\b5ce83_06303e63ca4248d4a637be46f1cf4237~mv2.png | Sponsors section; link to Aeroin |
| Reference image | C:\Users\Yashwanth\Downloads\Sedhacks inspo.webp | Visual comparison source |

The Aeroin logo was found directly in Downloads at the verified location above. The path previously supplied placed an extra directory separator before the filename; use the verified direct-file path.

### Tokens and type

**Confirmed colour tokens:** background #040942; text #F3EFF5; secondary text #C7B5E3; violet #8650C7; pink #DF55A5; deep violet #382080; red #C32638; gold #FFCB28; cyan #55D8E8; pale button #EEE8F5.

**Confirmed type roles:** self-host VT323 for body text, navigation and numerals; use Pixelify Sans for display lettering. Use VT323 for the ₹10,000 prize amount and preserve its ₹ glyph. Check both ₹ and the en dash in the actual self-hosted font files after subsetting or conversion.

**Inferred — proposed sizing estimates, Medium confidence:** Begin with an 88–96 px desktop header and a 72 px mobile header. Display the wide badge at approximately 88 × 76 px on desktop and 68 × 58 px on mobile, preserving its aspect ratio. Place the REC logo at approximately 96 × 31 px. Display the hero character at approximately 300–360 px wide on desktop, scaling it proportionally on smaller layouts. About-logo width is approximately 140–180 px. Use VT323 body text around 22 px mobile and 24 px desktop; display sizes should be fluid and bounded with clamp-style sizing. Start the content column at a maximum width near 1,120 px with 20 px mobile gutters. Validate every value against screenshots; no text may clip or be made small to force a fit.

Use the supplied logo and portrait without hue shifts. Compress and resize delivery copies to their real display sizes while preserving transparency, edges and readable artwork. Self-host the two fonts and keep their licences.

## 2. Page structure, locked content and navigation

| Order | ID | Contents and layout |
|---|---|---|
| Header | — | Top-left Sedhacks badge linked to hero; Timeline, Tracks, Prizes and About links; REC logo at right |
| Hero | hero | Sedhacks 2026, headline, hero portrait, Register button, introduction |
| Timer | timer | Countdown to kickoff, state after kickoff, event dates and venue |
| Timeline | timeline | Three confirmed date markers on a dotted rail |
| Tracks | tracks | Five selectable tracks, all five thumbnails visible |
| Prizes | prizes | Central trophy, prize pool, complete internship qualification |
| Sponsors | sponsors | Industry Collaboration heading, linked Aeroin logo and paragraph |
| About SEDS | about | SEDS REC heading and logo, full supplied paragraph, original pixel accent |
| FAQ | faq | Eight disclosures with answers drawn from confirmed facts |
| Footer | footer | Closing wordmark and Register CTA, Contact / Explore / Stay connected columns, scenic ground, credit |

### Header and in-page navigation

Header links map exactly as follows: **Timeline → timeline; Tracks → tracks; Prizes → prizes; About → about.**

Footer Explore links appear in the requested order: **Timeline → timeline; Tracks → tracks; Prizes → prizes; Sponsors → sponsors; About → about; FAQ → faq.**

The header logo links to #hero. The REC logo is not linked unless a destination is later supplied. Keep the header fixed, update a header-height CSS variable for the current layout, and use scroll padding equal to that height plus approximately 16 px (**proposed estimate, Medium confidence**). After scrolling, give the header a solid #040942 background. Use a small gold active-section marker. Keep anchor navigation functional without JavaScript and without custom smooth scrolling.

On mobile, the menu opens below the header. The menu button exposes expanded/collapsed state. Close the menu after selecting a link, pressing Escape or tapping outside. Escape returns focus to the menu button; selecting a link moves focus to its heading. Use heading focusability without creating extra normal tab stops.

### Hero

Event name: **Sedhacks 2026**, with the year accented red.

Headline: **Innovate. Build. Explore Beyond the Sky.**

Place the supplied portrait below the headline, then the **Register** button, then this exact introduction:

SEDS REC presents a student-led hackathon bringing together young innovators from diverse disciplines to develop solutions for challenges related to space, technology and sustainability.

The hero Register button opens the registration form in the same tab. Use this exact URL, with no query parameters:

https://docs.google.com/forms/d/e/1FAIpQLSfEC7Sndyksvk125Jr8TzwKhKVcqiFLFZwL3chNYuNbataJRg/viewform

### Timer and event details

Kickoff is **12 am IST on 12 October 2026**. Store the target as an offset-aware instant equivalent to 12 October 2026 at 00:00 in India Standard Time (UTC+05:30), in one setting within the configuration object.

Show the red urgency line **“Kickoff begins in”**, followed by large VT323 days, hours, minutes and seconds, each with a visible label. Beneath the timer show, exactly:

**12–13 October 2026**

**Rajalakshmi Engineering College, Chennai**

Update the displayed remaining time from the configured instant once per second. Calculate from the current clock rather than decrementing a stored value. Refresh when a suspended tab becomes visible. At or after kickoff, replace the digits with **“The hackathon has begun”**; never show negative values. Do not infer an end time from 13 October.

Do not place aria-live on the digits. If desired, announce only the one-time transition to the started state using a separate status message; never announce each tick. Without JavaScript, show the kickoff time, dates and venue as static content.

### Timeline

Build a chronological data array with only these three currently confirmed entries. Dates, labels and event venue must remain ordinary visible text.

| Date | Label | Additional detail |
|---|---|---|
| 10 October 2026 | Registration closes | No closing time supplied |
| 12 October 2026 | Hackathon begins | 12 am IST; Rajalakshmi Engineering College, Chennai |
| 13 October 2026 | Hackathon ends | Rajalakshmi Engineering College, Chennai; no end time supplied |

The 10 October registration deadline is newly confirmed and supersedes the earlier two-entry-only timeline. Do not invent any other deadlines, rounds, judging or results times. Use a horizontal dotted gold rail on desktop and a vertical rail on mobile. Use static pixel markers and allow later entries to be added through the data array.

### Tracks

Heading: **Hackathon Tracks**. Default to track 01. Show all five thumbnail tabs with no scrolling rail and no automatic advance. Use five equal columns at wide sizes and a three-plus-two grid at narrow sizes. Each thumbnail’s accessible name contains its full title; each tab controls its matching panel.

1. **01. Space Applications & Defence Technology** — Explore innovative technologies and applications for space and defence.
2. **02. Medical, Food & Agriculture in Space** — Develop ideas addressing healthcare, food systems and agriculture for space environments.
3. **03. Autonomous & Communication Technology** — Build solutions involving autonomous systems, communication technologies and intelligent applications.
4. **04. Sustainability in Space** — Address challenges related to sustainable space exploration, resource utilisation and future space missions.
5. **05. Miscellaneous / Open Innovation** — Have an innovative space-related idea that does not fit the above tracks? This is your space to explore it.

Use the ARIA tabs pattern: tablist, tabs, selected state and controlled panels. Keep only the selected tab in the ordinary tab sequence. Left/Right arrows move focus and activate tabs; Home and End select the first and fifth. Without JavaScript, display all five complete tracks in sequence.

### Prizes, sponsors and About SEDS

**Prizes heading:** **Why Participate?**

Central gold trophy and prize amount: **₹10,000 Prize Pool**

Prize description: **Compete, innovate and get recognised for your solution.**

Beneath the trophy, show **Internship Opportunities** and this full sentence as normal body text:

The Top 3 teams will receive internship opportunities through our industry collaboration with Aeroin Space Tech, subject to the organisation's selection process.

**Sponsors heading:** **Industry Collaboration**. Link the Aeroin Space Tech logo to https://www.aeroin.space/ in the same tab. Beneath it show:

This hackathon is being conducted with industry collaboration from Aeroin Space Tech, creating opportunities for students to interact with industry perspectives and explore potential internship opportunities.

**About heading:** **About SEDS REC**. Place the supplied SEDS REC logo beside or above this full text and add one small original pixel satellite accent:

SEDS REC is a student-led community at Rajalakshmi Engineering College dedicated to promoting interest in space science, technology, innovation and interdisciplinary learning. Through technical activities, industry interactions and student initiatives, SEDS REC provides a platform for students to explore opportunities beyond the classroom.

### FAQ

Use eight factual questions. The first seven answers repeat the facts supplied elsewhere; the last describes the specified Register buttons.

1. **What is Sedhacks 2026?** Answer with the exact hero introduction.
2. **When and where is the hackathon?** Answer with the exact date range and venue.
3. **When does the kickoff happen?** Answer: **12 am IST on 12 October 2026.**
4. **What is the last date to register?** Answer: **10 October 2026.** No cutoff time is supplied.
5. **What are the hackathon tracks?** List all five track titles and descriptions exactly.
6. **What is the prize pool?** Answer with the exact prize heading and supplied prize description.
7. **What are the internship benefit and qualification?** Include the complete internship sentence, with its organisation-selection qualification visible.
8. **How do I register?** Proposed wording: **Use either Register button to open the registration form in this tab.**

Create the questions and answers in a configuration data array. With JavaScript enabled, render accessible disclosure buttons with aria-expanded and associated answer panels; start them collapsed and allow multiple answers to stay open. Without JavaScript, show every question and answer in sequence. Yellow plus markers change instantly to minus markers when open. Do not add questions about eligibility, teams, fees, rules, unprovided times or other event terms.

### Footer

Inside the footer, place a large decorative **Sedhacks** wordmark in live Pixelify Sans text, deep violet #382080, behind the registration CTA. Add the original white pixel registration icon and a **Register** button pointing to the same shortened form URL as the hero CTA.

Below the CTA place **Contact**, **Explore** and **Stay connected** columns over the original scenic ground. The Explore links follow the exact mapping and order above. Include the credit line **“SEDS REC · Sedhacks 2026”**.

Store Contact and social details in the single configuration object. Start both empty. When Contact is empty, show **“Contact details to be added”**; when social links are empty, show **“Social links to be added”**. Do not show fake names, contact values, icons or anchors; never use # or another dead URL as a placeholder. Only render a contact/social link when the user has filled in both its display name and destination.

## 3. Artwork, implementation and responsive behaviour

### Original art to create

Create all artwork in the project assets directory; no external imagery is required.

| Asset | Composition and treatment |
|---|---|
| Hero cloud layer | Full-width, transparent, blocky violet-blue clouds; fade edges into #040942 |
| Footer scene | Space-themed pixel ground and scenery, approximately 320–400 px tall; reserve a quiet, readable area behind footer text |
| Track scenes 01–05 | One original scene per track theme, with a dark quiet area on the left for desktop copy |
| Track thumbnails 01–05 | Crops derived from their corresponding scenes; all five shown at once |
| Lower cloud layer | Muted violet/pink clouds behind the footer’s closing CTA |
| Mountain ridge | Full-width stepped dark-purple ridge immediately below Prizes |
| Registration icon | White pixel silhouette, approximately 96 × 96 px |
| About accent | Small blue/white pixel satellite; secondary to the supplied SEDS logo |
| Star field, trophy, confetti, chevrons and controls | Original static shapes matching the reference’s pixel scale |

Use a low native artwork grid and integer scaling. Recommended track-scene source grid is approximately 256 × 144 logical pixels (**proposed estimate, Medium confidence**). Preserve transparency where needed. Avoid antialiased outlines, repeated obvious star patterns, soft shadows, particle effects or moving backgrounds. Keep all actual copy as selectable live text.

Match the new art to the inspected portrait’s royal-blue/navy suit, bright blue edges, white hair and restrained warm highlights. Reuse the badge’s blue/cyan, white, yellow and red details sparingly. Preserve the supplied portrait and logos without recolouring. Keep the reference’s navy base and atmospheric layering.

### Page-level implementation

Recommended project parts are one HTML page, one stylesheet, one main JavaScript file, and organised assets for supplied logos, original scenes, icons and self-hosted fonts. Use no framework, router, remote imagery, or animation library.

Put one plainly labelled configuration object at the top of the main JavaScript file. It holds the kickoff instant, registration deadline date, timeline entries, FAQ entries, registration URL, Aeroin URL, Contact fields and social fields. Keep required copy in the page’s static markup for no-JavaScript access. Keep the configuration’s Contact/social fields empty until real details arrive.

For the fixed header, set a CSS variable to the current header height at each layout. Account for it in document scroll padding so linked headings never land behind the header. Use semantic header, navigation, main, section headings and footer landmarks.

### Responsive rules

All layout sizes below are **Inferred — proposed estimates, Medium confidence**. Required screenshot widths are **320, 375, 768 and 1,280 px**.

- At 1,280 px, keep a single-line desktop navigation, centred hero, horizontal event timeline, wide illustrated track stage and footer columns.
- At 768 px, reduce display scale and gutters before wrapping nav or milestone labels. Keep all five thumbnail controls visible.
- At 375 and 320 px, switch to the fixed-header dropdown and vertical timeline; stack hero content, track description and track art; arrange all thumbnails in three columns plus two; stack footer columns.
- Use whole-character or whole-word wrapping for event identity and display headings. Keep “Sedhacks 2026” and the full closing “Sedhacks” wordmark within the viewport.
- Give touch controls at least 44 × 44 CSS px. Preserve the pixel-art grid. Crop background scenery where necessary; do not crop logos, faces or content.
- No page-level horizontal overflow at any required width.

### Accessibility and performance

- Use a skip link, visible keyboard focus, 44 px minimum touch targets, semantic landmarks and appropriate heading order.
- Give the Sedhacks badge a useful alternative text such as **“Sedhacks 2026”**. Give the supplied hero image concise, factual alt text. Give SEDS, REC and Aeroin marks their organisation names. Mark decorative generated art hidden from assistive technology.
- Use white #F3EFF5 or secondary #C7B5E3 for body copy. Violet and red are reserved for large display text. Check at least 4.5:1 body contrast over the actual layered scenes, especially behind the long internship sentence.
- Do not announce each countdown tick. Give each tab/panel and FAQ disclosure a programmatic relationship and selected/expanded state.
- Load the hero assets eagerly; lazy-load below-the-fold scenes. Set image dimensions to prevent layout shifts. Self-host and preload VT323 and Pixelify Sans with font-display swap.
- Optimise the supplied PNG assets into display-sized transparent delivery files and minify the original SVG art. Keep total transferred page assets under approximately 2.5 MB. If optimisation cannot meet that target without visible degradation, report the measured total and the largest assets.

## 4. Implementation phases and completion checks

| Phase | Work | Completion check |
|---|---|---|
| **1. Confirm inputs** | Resolve and copy the five supplied assets from the verified paths. Record the character’s pixel grid and palette. Confirm the badge’s transparent margins and the fonts’ ₹ and – glyphs. | All four logos/character and reference image resolve; no broken source path remains; art palette is documented |
| **2. Build page structure and configuration** | Create the one-page section order, IDs, locked text, navigation/footer link maps, configuration object and no-JavaScript content fallbacks. Add all three confirmed timeline dates. | Every nav/footer link reaches its section; contact/social fields are empty and dead links are absent |
| **3. Establish the visual system** | Apply supplied tokens, self-hosted fonts, pixel scale, spacing, fixed header and star-field foundation. Put the supplied badge at top left and REC mark at top right. | Header identity and initial viewport match the reference’s hierarchy and composition |
| **4. Create original art and integrate supplied art** | Create hero clouds, five track scenes and thumbnails, trophy/confetti, mountain ridge, lower clouds, registration icon, satellite accent and footer scenery. Integrate and optimise the supplied portrait and logos. | Each artwork slot has an original or supplied asset; colours match the badge/portrait; all artwork remains legible at the pixel grid |
| **5. Add and fit all content** | Add hero, timer/date/venue, timeline, tracks, prizes, sponsors, About, FAQ and footer copy. Keep the full internship qualification visible. | Copy matches this plan; event facts are represented once or in their explicitly requested repeated locations; no text is clipped |
| **6. Implement interactions and responsive layouts** | Add countdown state handling, data-driven timeline, ARIA tabs, FAQ disclosures, anchors, mobile menu and empty contact/social states. Adapt at the four required viewport widths. | Countdown reaches “The hackathon has begun”; tabs and FAQs work by keyboard; no-JavaScript track/FAQ fallbacks work; no overflow |
| **7. Compare and correct** | Capture the page at 1,280 px and the specified narrow widths. Compare hero, timer, timeline, tracks, prizes, About and footer against the reference. Correct palette, spacing, typography, art placement and pixel scale. | One complete comparison and one correction pass show the reference’s composition is retained with the specified content and responsive changes |
| **8. Add the limited animation** | Apply the accessible-animation guidance only to the Register button press and mobile menu fade, after Phases 1–7 pass. | Normal and reduced-motion paths preserve orientation and functionality; no additional motion has been introduced |

## 5. Animation plan and assumptions

Use the [accessible-animation skill](C:/Users/Yashwanth/.agents/skills/accessible-animation/SKILL.md) for the animation phase only. Keep the site static by default. There is no animation in the reference image.

Only these two small interaction effects are allowed:

| Priority | Element and trigger | Purpose | Proposed duration/easing | Reduced-motion treatment |
|---|---|---|---|---|
| Nice to have | Register button while pressed | Confirm the press | Approximately 80–120 ms, ease-out; a 1–2 px translate is an estimate, Medium confidence | Remove the translation; retain a brief colour/opacity cue |
| Nice to have | Mobile menu on open/close | Clarify the menu transition | Approximately 120–160 ms opacity fade, linear; estimate, Medium confidence | Retain only a short opacity fade of at most 150 ms |

Respect the operating-system reduced-motion preference in CSS. Reduce or remove the small movement while keeping orientation and focus feedback. No JavaScript-driven animation is planned, so animation preference changes are handled by the CSS media query. Do not animate scrolling, countdown digits, FAQ height, tabs, stars, clouds or chapter entrances.

**Confirmed:** Midnight kickoff time, 10 October registration deadline, venue, registration URL, Aeroin URL, asset identities, section order and copy supplied in the conversation.

**Pending implementation detail:** Confirm all external asset files can be copied to the project and optimise them without degrading legibility. The Aeroin file’s verified path is the direct Downloads path in section 1.

**Empty by design until supplied:** Contact names/values/URLs and social platform names/URLs. Show clearly labelled plain-text placeholders only; render no fake data or dead links.

**No facts to infer:** Registration closing time; hackathon end time; team size; eligibility; fees; rounds; judging; results time; additional timeline entries.

**Visual estimate:** Generated artwork style and pixel grid follow the inspected badge and portrait while retaining the reference image’s navy star-field composition. All layout and duration values marked proposed are starting estimates to be tuned during reference comparison.
