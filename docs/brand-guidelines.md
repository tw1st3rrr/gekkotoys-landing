# ГЕККО Design System

A design system for **ГЕККО АРТ** (Gekko Art) — a Russian-market **pixel-construction toy brand**. Customers upload a photo, an online "пикселизатор" turns it into a brick-by-brick schema, and a kit (bricks + base plates + numbered plan) ships to their door. The signature product trait: a brick that clips on **all six sides** without extra parts — "like a gecko's feet". Legal entity: ООО «Алекс Тойс». Site: gekkotoys.ru.

This system was extracted from the **`Gekko Landing v2.html`** prototype and its `app/*.jsx` sources in this project (React + Tailwind landing page). Those remain the canonical reference implementation.

---

## Visual foundations

**Mood.** Warm, calm, crafted, premium-but-friendly. Deep evergreen "pine" tones on a warm paper background — feels natural and tactile, not techy or neon, despite the "pixel" subject. Lots of whitespace; sections breathe.

**Color.** A two-pole palette:
- **Paper** `#FBF6F0` — the warm off-white page background.
- **Pine / Ink** `#0D3A35` — primary text *and* the dark feature-section / dark-mode surface; deepens to `#0B302B` / `#07201C`.
- **Green** `#276152` — the single accent: CTAs, links, the pixel motif, the "popular" border. Variants `#3E7D6B` / `#0D3A35`.
- **Cream** `#ECEFE9` — text & surfaces on dark. **Sage** `#B1B7AB` — quiet dividers/detail.
- Functional colors appear *only* in small doses: amber `#F59E0B` stars, and tinted phone/email/hours contact tiles (green/blue/orange). Never as decoration.
- Saturated gradients are avoided except the single dark pine→green hero overlay.

**Type.** Three roles — `Unbounded` (geometric display, weight 800, tracking −0.02em) for headings & the wordmark; `Golos Text` (Cyrillic-first humanist sans, 400–900) for all body & UI; `Tektur` for the one giant scroll-expand hero title (alternates: Russo One, Rubik Mono One). Headings are extrabold and tight; body is relaxed (line-height 1.65). The eyebrow label is 12px uppercase, tracking 0.22em, accent green.

**Shape & space.** Everything is softly rounded — `8 / 12 / 16 / 24 / full` px. **Cards are 16px radius**, hairline border, subtle neutral shadow, and lift `−6px` with a bigger shadow on hover. Never sharp corners; never a single colored left-border accent. Section rhythm is 80–112px vertical, max content width 72rem.

**Elevation & glass.** Shadows are soft and neutral (pine-tinted, no colored glow). The floating nav and pricing cards use **frosted glass** (translucent white + 12px blur). Hero/carousel media gets a heavy ambient shadow.

**Motion.** Calm and purposeful: scroll-reveal fades (`cubic-bezier(.2,.6,.2,1)`, 700ms), a springy pricing toggle, staggered per-character hover on catalog titles, confetti on the "Индивидуальный проект" toggle, a twinkling starfield behind content. Respects `prefers-reduced-motion`.

**Hover/press.** Primary buttons darken (`color-mix … black 14%`); light buttons drop to 0.9 opacity; outline buttons swap border+text to accent; cards lift. Links fade to ~60% opacity or shift to accent.

**Imagery.** Real product photography (warm-toned brick mosaics, finished pictures), full-bleed inside rounded frames with a top-down dark gradient for legibility. In specimens, imagery is shown as diagonally-striped sage placeholders.

---

## Content & tone

- **Language: Russian.** Address the customer informally — **"ты"** ("Загрузи фото", "Собери сам или подари").
- Warm, encouraging, concrete. Short benefit-led sentences. Lowercase eyebrow labels ("как это работает", "стоимость").
- Numbers are real and reassuring (3 500 / 7 000 / 14 000 деталей; prices in ₽ with non-breaking thousands; "Более 500 собранных наборов"). No invented stat-slop.
- Honest disclaimers (pixelation is artistic interpretation, prices are indicative).
- **No emoji.** The only "icon-ish" glyphs are stroke SVG icons and the square pixel motif. Stars (★) for ratings.

---

## Iconography

The site ships its **own minimal stroke icon set** (see `app/icons.jsx` in the source) — 24×24, `currentColor`, 2px stroke, round caps/joins, in the spirit of Lucide. Recreate that style or substitute **Lucide** (CDN) one-to-one if you need more glyphs — same weight and feel. The **star** is a filled custom glyph (amber). The **brand mark** is the pixel cluster (squares), not an icon-font glyph. Avoid emoji and decorative unicode.

---

## Files / index

- **`styles.css`** — global entry point (import this). `@import`s fonts + all tokens + base.
- **`fonts.css`** — Google Fonts (Unbounded, Golos Text, Tektur, Russo One, Rubik Mono One).
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css` (brand utilities: `.gk-label`, `.gk-pixels`, `.gk-glass`, reveal).
- **`components/core/`** — React primitives: `Button`, `Card`, `Badge`, `SectionLabel`, `PixelMark`/`Wordmark`, `Input`, `Chip`. Each has `.jsx` + `.d.ts` + `.prompt.md`, plus `*.card.html` specimens.
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand, Effects) for the Design System tab.
- **`ui_kits/landing/`** — a self-contained recreation of the marketing landing (nav, hero, steps, pricing, footer).
- **Source of truth:** `Gekko Landing v2.html` + `app/*.jsx` (this project root).

## Caveats

- **Fonts are loaded from Google Fonts**, not bundled as binaries. All five faces are freely available there; swap to local `@font-face` if you need offline/self-hosted.
- **The official logo SVG** (`gekkotoys.ru/img/logoBlack.svg`) could not be fetched. The system uses the **pixel-cluster mark + "ГЕККО" wordmark** as the brand lockup — please drop the real logo file in `assets/` if you have it.
- Component specimen cards are token-driven HTML recreations (so they always render in the DS tab); the live React primitives live in the `.jsx` files.

> **Sharing:** set this file's type to **Design System** in the Share menu so your org can use it.
