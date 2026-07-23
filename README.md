# Lost Civilization — A Cinematic Interactive Experience

An award-winning-style storytelling website that takes visitors on an immersive journey through the forgotten ruins of an ancient civilization buried beneath endless desert sands. Every scroll reveals another chapter of the story.

Built with **HTML5**, **SCSS (7-1 architecture)**, and **Vanilla TypeScript** — no frameworks, no CSS libraries.

---

## Live Experience

The visitor is an explorer who has discovered a forgotten world. The experience unfolds across seven chapters:

| Chapter | Section | What Happens |
|---------|---------|-------------|
| — | **Loading Screen** | Ancient symbol assembles from golden dust |
| I | **The Desert** | Broken statues emerge, wind moves sand |
| II | **The Ancient Gates** | Massive doors open as you scroll, light escapes |
| III | **Hall of Kings** | Stone statues' eyes glow, cracks illuminate |
| IV | **The Forgotten Library** | Floating books reveal hidden knowledge on hover |
| V | **The Hidden Chamber** | Golden relics rotate in 3D, reflections shimmer |
| VI | **The Final Sanctuary** | A glowing relic floats, the closing message is revealed |

---

## Technology

- **HTML5** — Semantic, accessible structure
- **SCSS** — 7-1 architecture with reusable variables, mixins, and functions
- **Vanilla TypeScript (ES6+)** — Modular, typed, no frameworks
- **GSAP + ScrollTrigger** — Cinematic scroll-driven animations
- **Lenis** — Buttery smooth scrolling with physical feel
- **Splitting.js** — Character and word-level text animations
- **Web Audio API** — Procedurally generated ambient soundscape (no audio files)

No React, Vue, Angular, jQuery, Bootstrap, Tailwind, or any CSS framework.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#060606` | Primary background |
| Secondary Background | `#0F0B08` | Section backgrounds |
| Sand | `#8A6E4A` | Muted tones, stone |
| Ancient Gold | `#D8B56B` | Accents, titles, highlights |
| Stone | `#3C352D` | Statues, architecture |
| Light | `#F3EAD8` | Body text |
| Amber | `#E6A55C` | Glow, embers, eyes |

### Typography

- **Cormorant Garamond** (serif) — Cinematic titles, lead paragraphs
- **Inter** (sans-serif) — Body text, labels, UI

### Spacing

8px spacing system with a defined scale (`$space-1` through `$space-24`).

---

## Project Structure

```
src/
├── scss/
│   ├── abstracts/        # Variables, mixins, functions
│   ├── base/              # Reset, typography, global styles
│   ├── components/        # Cursor, buttons, loader, audio toggle, progress, particles
│   ├── layout/            # Navigation, footer
│   ├── sections/          # Hero, desert, gates, hall, library, chamber, sanctuary
│   ├── themes/            # Dark theme
│   ├── vendors/           # Splitting.js styles
│   └── main.scss          # Entry point
├── ts/
│   ├── modules/           # Loader, cursor, magnetic, ambient, audio, smooth-scroll, navigation
│   ├── sections/          # Hero animations, scroll animations
│   ├── utils/             # DOM helpers
│   └── ...
└── main.ts                # Application entry point
```

---

## Key Features

### Atmosphere
- Canvas-based particle system (sand, dust, glowing embers) that reacts to mouse movement
- Drifting fog, animated film grain, and vignette overlays
- Subtle light rays and ambient glow that never lets the background feel static

### Interactions
- **Custom cursor** with smooth interpolation, hover expansion, and click states
- **Magnetic buttons** that attract toward the cursor
- **Scroll-driven storytelling** — doors open, statues reveal, relics rotate
- **Progress indicator** with active chapter tracking and clickable navigation dots

### Audio
- Procedurally generated ambient soundscape using the Web Audio API
- Filtered white noise for desert wind with LFO-modulated gusts
- Low-frequency drone oscillators for temple resonance
- Animated mute/unmute toggle with equalizer-style visualizer

### Accessibility
- Semantic HTML5 landmarks and ARIA labels
- Full keyboard navigation support
- `prefers-reduced-motion` — all animations gracefully simplify
- Sufficient color contrast ratios
- Responsive from mobile to ultrawide desktop

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Performance

- Target 60 FPS with GPU-accelerated transforms
- Particle count scales with viewport size
- Animations use `will-change` and `transform` to avoid layout thrashing
- Reduced-motion users get a fully functional static experience
- Touch devices skip cursor and parallax for performance

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Requires Web Audio API for ambient sound. Custom cursor and parallax effects are desktop-only.

---

## Credits

A cinematic interactive experience built as a demonstration of creative web development. Inspired by the work of Awwwards-winning agencies, Active Theory, Resn, Locomotive, and Bruno Simon.

Stock typography by Google Fonts (Cormorant Garamond, Inter).