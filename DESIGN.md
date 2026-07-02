# Design

## Color Strategy

Restrained. Neutral surface carries the page; one accent hue used sparingly (links, CTA, small accents) — no AI-cream-on-white or AI-purple-on-white clichés (kept deliberately subdued, not a Linear-style saturated indigo brand).

```css
:root {
  --bg: oklch(1.000 0.000 0);          /* pure white */
  --surface: oklch(0.965 0.004 270);    /* bg pulled slightly toward ink, low-chroma */
  --ink: oklch(0.220 0.012 270);        /* near-black, faint cool tint, ~16:1 vs bg */
  --muted: oklch(0.470 0.012 270);      /* secondary text, ~5.2:1 vs bg */
  --accent: oklch(0.360 0.140 270);     /* deep muted indigo — links, CTA, small accents only */
  --accent-ink: oklch(1.000 0.000 0);   /* text on filled accent */
}
```

Usage: accent covers ≤10% of any view (text links, one CTA button, small underlines/markers). Body surfaces stay neutral white/`--surface`; warmth and character come from typography and copy, not from a tinted background.

## Typography

- Headings: serif (e.g. `"Source Serif 4", "Georgia", serif`) — carries "основательность" without formality of a corporate sans.
- Body/UI: humanist sans, IBM Plex Sans (weights 400/500), `"Helvetica Neue", sans-serif` fallback (deliberately not Inter/Public Sans — Inter is overused, Public Sans lacks Cyrillic support needed for Russian copy).
- Display heading clamp ≤ 6rem, letter-spacing ≥ -0.04em, `text-wrap: balance` on h1–h3, `text-wrap: pretty` on long prose. Body max 65–75ch.

## Motion

Moderate. Scroll-triggered reveal on section entry (fade + small upward translate, ~16px), staggered for lists/cards. Smooth `ease-out-quart`, no bounce/elastic. Every animation has a `prefers-reduced-motion` fallback (crossfade or instant). No parallax, no scroll-jacking — calm, not flashy.

## Layout

- One-page site, four sections: hero/о себе → проекты → форум-группы и ретриты → контакты.
- No card-grid cliché for projects — prefer an editorial list/row layout per project (image + text), not identical icon-cards.
- No tiny uppercase tracked eyebrows above sections, no 01/02/03 numbered markers (this isn't a real sequential process).
- Flexbox for the single-column flow; Grid only where genuinely 2D (e.g. side-by-side text/image rows on desktop, stacking on mobile).

## Components (to be extracted as built)

- Nav: minimal, name + anchor links to the four sections, no logo mark needed initially.
- Project entry: title, one-line description, optional link out (e.g. ecodorogi.ru).
- Forum-group/retreat block: short description + single contact CTA, not a booking form.
- Contact: direct channels (email/Telegram), no contact form initially — keep "один чёткий путь к действию".

## Anti-patterns to avoid (project-specific)

- No gradient text, no glassmorphism, no hero-metric stat blocks (not a SaaS product).
- No stock "handshake"/"businessman" photography — if photos are used, they should be real and specific to the person/projects.
