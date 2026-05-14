# About This Website — Full Rebuild Specification

This document is intended to be the single canonical specification you would need to rebuild this site from scratch given only this file and the repository scaffold. It covers product goals, content, information architecture, UI components, animations and timings, 3D scene and assets, accessibility and performance constraints, developer workflows, build/deploy steps, and design tokens. Use this as both a design brief and an implementation blueprint.

1) Project Summary

- Purpose: Present JZ's personal work and design thinking as a cinematic, editorial single-page experience that emphasizes mood, craft, and a curated selection of artifacts.
- Audience: Creative directors, collaborators, recruiters, and peers who value taste-led design and clear craft.
- Tone: Minimal, tactile, editorial — restrained motion and high-contrast type with occasional texture.

2) High-level Requirements

- Single-page application with smooth scroll-driven reveals and anchored navigation.
- Declarative components that are modular and testable in isolation.
- Respect user preferences for reduced motion and audio control.
- Accessible semantics and keyboard navigable components.
- Fast initial paint: critical content visible quickly; heavier visuals lazy-load.

3) Content & Information Architecture

- Hero: Brand statement, primary call-to-action (CTA), large typographic lead.
- About: Short bio, design statement, contact CTA, optional resume link.
- Timeline: Chronological milestones (date, title, summary, optional media). Keep to 6–12 items.
- Toolkit: Categorized tools (Design, Frontend, 3D, Audio) with short notes and proficiency tags.
- Polaroid Strip: Horizontal scroller of images (format, caption, optional link). Click opens lightbox.
- Contact: Email, social links, short note on availability.
- Footer: Credits, license, build info, last-updated timestamp.

4) Project File Structure (recommended)

- src/
	- main.tsx (app boot)
	- App.tsx (layout + router if needed)
	- index.css (globals)
	- components/
		- Hero.tsx
		- About.tsx
		- Timeline.tsx
		- ToolkitSection.tsx
		- PolaroidStrip.tsx
		- ContactSection.tsx
		- Footer.tsx
		- Navbar.tsx (sticky)
		- StickyRail.tsx (section nav)
		- Background3D.tsx (R3F scene)
		- MusicPlayer.tsx
		- Cursor.tsx
		- utilities/
			- usePrefersReducedMotion.ts
			- useScrollProgress.ts
			- media.ts (image/audio helpers)

5) Component API & Behavior (by component)

- `Hero` props: { title: string, subtitle?: string, cta?: {label:string, href:string} }
	- Behavior: Large type animates on entrance; parallax offset on scroll; CTA anchors to Contact.

- `About` props: { bio: string, highlights: string[] }
	- Behavior: Fade/translate on scroll; supports keyboard focus for read-more.

- `Timeline` props: { items: TimelineItem[] } where TimelineItem = { date: string, title:string, body:string, media?: Media }
	- Behavior: Staggered reveal; expand item on click to show media; accessible keyboard navigation.

- `ToolkitSection` contains categorized chips; chips are focusable and reveal short descriptions on hover/focus.

- `PolaroidStrip` props: { items: ImageItem[] } with horizontal scroll snapping and drag support; clicking opens an accessible lightbox.

- `Background3D` props: {variant?: 'subtle'|'active'}
	- Behavior: Renders low-poly geometry, soft bloom; runs at lower update frequency on mobile; disabled when `prefers-reduced-motion`.

- `MusicPlayer` handles play/pause, volume, and remembers preference in localStorage.

6) Data & Content Schema

- content/site.json (or export from Markdown frontmatter):
	- title, description, sections[], timeline[], toolkit[], polaroids[], contact { email, links }

- Media naming conventions:
	- images/: 800w and 1600w `jpg` optimized versions, a `webp` fallback, 16:9 and square crops where needed.
	- audio/: `ambient.mp3` (128kbps) + `ambient.ogg` fallback; include duration metadata.

7) Design Tokens

- Colors:
	- --color-bg: #0b0b0b
	- --color-surface: rgba(255,255,255,0.03)
	- --color-accent: #b8860b (gold/brass accent)
	- --color-text: #e6e6e6
	- --color-muted: #9a9a9a

- Typography:
	- Display: 'GT Sectra Display' or fallback serif, weight 700, sizes: 80/64/48 (desktop), 44/36 (tablet), 32/24 (mobile)
	- UI: Inter / System UI, weights 400/600
	- Microcopy: monospace for labels

- Spacing & Breakpoints:
	- Breakpoints: 1200px, 992px, 768px, 480px
	- Grid: 12-column for content; concentrated center column for reading area.

8) Motion & Animation Specs

- Global easing: cubic-bezier(.16,.84,.3,1)
- Durations:
	- entrance: 480ms
	- micro: 180ms
	- stagger gap: 80ms
- Parallax ranges: 0–30px for UI elements, 0–120px for background layers.
- Glitch text: short jitter keyframe (10–120ms offset) with max displacement 2px; run at low frequency and avoid on reduced-motion.

9) 3D Scene Blueprint (Background3D)

- Scene purpose: subtle depth and motion; never compete with primary content.
- Objects:
	- a few low-poly frames (thin extruded rectangles) positioned on Z layers -400 to -50
	- soft ambient light + a directional key light; color slightly warm (rgba(255,230,200,0.3))
	- simple particle layer with very low opacity for drift.
- Camera:
	- Perspective camera, fov 40–50, default position z=12, animate small slow orbit tied to scroll progress.
- Performance rules:
	- Use baked low-poly geometry, single draw calls where possible, bake matcap or simple PBR without map textures.
	- On mobile, reduce detail, lower shadow resolution, and reduce render loop frequency to 30 FPS.

10) Accessibility Requirements

- All interactive elements must be keyboard reachable (tab order, visible focus outlines).
- Provide `aria-label`, `role` where semantics are unclear.
- Respect `prefers-reduced-motion`: use CSS media query and a global JS toggle.
- Ensure color contrast >= 4.5:1 for body text, >=3:1 for large display text.
- Lightbox: trap focus while open and restore focus on close.

11) Performance Budget & Strategies

- Target: First Contentful Paint under 1s on modern desktop, less than 2.5s on mid-tier mobile on 4G.
- Budget:
	- Initial JS: <= 250KB gzipped
	- Initial images: <= 300KB critical images
	- Third-party scripts: minimal; defer analytics until idle.
- Strategies:
	- Code-splitting by route/section.
	- Lazy-load 3D and polaroid images after hero.
	- Use native `loading=lazy`, srcset, and modern image formats (webp/avif) where available.

12) Developer Workflow & Scripts

- npm scripts (recommended in package.json):
	- `dev`: vite
	- `build`: vite build
	- `preview`: vite preview
	- `lint`: eslint --ext .ts,.tsx src/
	- `format`: prettier --write .

- Local env:
	- Node 18+ recommended.
	- Use `npm ci` to install locked dependencies.

13) Testing & QA

- Unit test components with Jest + React Testing Library.
- Visual regression: Percy or Chromatic for critical components (Hero, Timeline, PolaroidStrip).
- Accessibility tests: axe/core in CI and Lighthouse audit as part of PR checks.

14) CI / CD Recommendations

- GitHub Actions workflow:
	- on: [push,pull_request]
	- jobs:
		- lint
		- test
		- build (artifact)
		- deploy (on merge to main) -> GitHub Pages via `peaceiris/actions-gh-pages` or Vercel.

15) Deployment (GitHub Pages)

- Vite config: ensure `base` is set to `'/<repo-name>/'` if deploying to a repo page.
- Build command: `npm run build`
- Publish `dist/` to GitHub Pages. Use action or `gh-pages` package.

16) Analytics & Privacy

- If adding analytics, prefer privacy-friendly options (Plausible) and defer loading until user interaction or after `idle`.
- Do not auto-play audio; only enable on explicit user action.

17) Asset Licensing & Credits

- Keep a `CREDITS.md` with third-party licenses and composer/artist credits for audio and imagery.

18) Content Authoring Guidelines

- Keep bios short (2–3 sentences) with one paragraph for context and one for approach/what you're looking for.
- Timeline entries: keep each under 120–160 words; link to external case studies when available.

19) Example Implementation Notes (code pointers)

- Use `framer-motion`'s `useInView` and `useViewportScroll`/`useTransform` for scroll-linked transforms.
- For horizontal polaroid scroller, prefer a native scrolling container with `scroll-snap-type: x mandatory` and small JS to support drag-to-scroll.
- Store site content in a JSON/MD files under `content/` for easy editing and programmatic rendering.

20) Maintenance & Future Enhancements

- Make the 3D scene replaceable with a static hero image for low-bandwidth mode.
- Add an admin-editable content source (headless CMS) if the site will be updated frequently.

21) Contact & Next Steps

- Replace this placeholder contact block with the preferred email and social handles.
- If you want, I can now:
	- commit these changes and push a PR, or
	- generate a `CREDITS.md`, `package.json` updates, and a GitHub Actions workflow.

Appendix A — Quick Commands

Install and run locally:

```bash
npm ci
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Appendix B — Contact Placeholder

- Preferred contact: [replace-with-email@example.com]

---

This file is intentionally prescriptive. If you want a different level of verbosity (more code snippets, component prop-types, or an example content `site.json`), tell me which part to expand and I'll generate it directly into the repo.

---

SECTION 21 — Complete Animation & Motion Specification

**Overview**
- **Goal:** motion reinforces reading rhythm, highlights hierarchy, and creates depth without distracting.
- **Scope:** page-level choreography (hero → sections → footer), component reveals, micro-interactions, typographic accents (glitch), parallax layers, and 3D scene motion.

**Global Motion Settings**
- **Easing:** `cubic-bezier(.16,.84,.3,1)` (custom ease-out, snappy with light bounce).
- **Durations:** 
  - entrance: 480ms
  - micro (buttons, small reveals): 160–220ms
  - hover: 140–180ms
  - stagger-gap: 80ms between children
- **Stagger:** 80ms per child by default; lists can use 40–60ms for denser groups.
- **Max concurrent animations:** keep <10 simultaneous transforms on main thread.

**Entrance / Reveal Animations**
- **Pattern:** translateY + opacity + slight scale for emphasis.
- **Keyframe concept:** translateY: 40px → 0, opacity: 0 → 1, scale: 0.995 → 1
- **Values:** duration 480ms, easing cubic-bezier(.16,.84,.3,1).
- **When to use:** hero headline, section headings, cards on first arrival, timeline items.
- **Framer Motion variant (copy-paste ready):**
  ```tsx
  const item = { 
    hidden: { y: 40, opacity: 0, scale: 0.995 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.48, ease: [0.16, 0.84, 0.3, 1] } 
    } 
  }
  const container = { 
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } } 
  }
  ```

**Staggered Lists & Cascades**
- **Use cases:** timeline entries, polaroid grid, toolkit chips, list items.
- **Stagger options:** `staggerChildren: 0.08`, `delayChildren: 0.12` (optional initial delay).
- **Expand pattern:** collapsed summary → expanded body uses height + fade with 300ms duration.
- **Example in JSX:**
  ```tsx
  <motion.ul initial="hidden" animate="visible" variants={container}>
    {items.map(item => <motion.li key={item.id} variants={item}>...</motion.li>)}
  </motion.ul>
  ```

**Scroll-linked / Parallax Animations**
- **Concept:** map scroll progress to translate/rotate/opacity for subtle motion tied to user scroll position.
- **Ranges:** 
  - UI elements: 0 → 30px vertical offset
  - background layers: 0 → 120px vertical offset
  - parallax speed factor: 0.05–0.25 (affects how much element moves relative to scroll)
- **Implementation:** use `useScroll()` + `useTransform()` (Framer Motion) or compute with throttled `window.scrollY`.
- **Parallax hook example (pseudo code):**
  ```ts
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]); // moves up 30px over full scroll
  return <motion.div style={{ y }}>Content</motion.div>
  ```

**Typographic Glitch Effect**
- **Purpose:** sparing accent only on key words (hero title, section leads).
- **Behavior:** short jitter bursts, tiny translations, slight clip + optional color shift.
- **Key constraints:** 
  - max displacement 1–2px
  - burst duration 30–120ms
  - run at most once per 6–10 seconds
  - disabled entirely on `prefers-reduced-motion`
- **CSS keyframes (example):**
  ```css
  @keyframes glitch-x {
    0% { transform: translateX(0) skewX(0deg); }
    25% { transform: translateX(-1px) skewX(-0.5deg); }
    50% { transform: translateX(2px) skewX(0.5deg); }
    75% { transform: translateX(-1px) skewX(-0.5deg); }
    100% { transform: translateX(0) skewX(0deg); }
  }
  .glitch { animation: glitch-x 80ms linear 1; mix-blend-mode: screen; color: rgba(184,134,11,0.5); }
  ```
- **Trigger:** add `.glitch` class on demand, remove after animation ends; use debounce to prevent spam.

**Cursor & Micro-interactions**
- **Cursor behavior:** small scale up + color glow on hover of interactive elements; motion 120–160ms.
- **Button hover:** scale 1 → 1.03, subtle translateY -2px, box-shadow increase (from 0 to 0 0 12px rgba(184,134,11,0.4)), duration 150ms easing.
- **Button active (click):** scale 1 → 0.98, slight shadow inset to feel "pressed".
- **Focus (keyboard):** show 3–4px accent outline instantly (no animation) with color --color-accent to aid accessibility.
- **Framer example:**
  ```tsx
  <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
    Click me
  </motion.button>
  ```

**3D Scene Motion (Background3D with Three.js / R3F)**
- **Purpose:** slow, low-frequency motion to add depth; never steal attention from content.
- **Camera motion:**
  - Subtle orbit ±2–6 degrees over 20–60s mapped to scroll progress or time elapsed.
  - Optional bob/sway: very small (±2px) on Y-axis, slow (8s period).
- **Object motion:**
  - Slow drift: 0.01–0.05 units/s, infinite looping.
  - Gentle z-parallax with scroll: position.z responds lightly to scroll progress (e.g., ±20 units).
- **Performance rules:**
  - Reduce render loop on mobile to 30 FPS (use conditional `useFrame` or `invalidateFrameloop`).
  - Suspend rendering when not visible (use Intersection Observer).
  - Keep geometry low-poly; total scene <100KB.
- **R3F pattern (useFrame hook):**
  ```tsx
  useFrame((state, delta) => {
    // Slow orbit
    groupRef.current.rotation.y += delta * 0.01; // adjust speed factor
    // Tie to scroll (if provided via context)
    const scrollProgress = useScroll().scrollYProgress.get();
    groupRef.current.position.z = THREE.MathUtils.lerp(-5, -30, scrollProgress);
  });
  ```

**Audio Sync & Timing**
- **Use:** optional ambient bed to reinforce mood; do not auto-play (user action required).
- **Sync patterns:** light beats can trigger micro-animations (e.g., small type pulses or glow flashes), but keep optional and tied to user preference.
- **Latency assumptions:** audio can have 100–200ms variability; do not rely on audio for precise UX-critical animation timing.
- **Implementation:** use `<audio>` element with explicit play/pause controls; optionally dispatch custom events on beat detection (if needed).

**Reduced-Motion Behavior (prefers-reduced-motion)**
- **Respect:** CSS media query `@media (prefers-reduced-motion: reduce)` and in-site toggle stored in `localStorage`.
- **Behavior changes:**
  - Disable non-essential transforms (parallax, 3D orbit, glitch effects).
  - Replace with subtle opacity changes or instant reveals (no translate/scale).
  - Disable background 3D scene or render a static fallback image.
- **Implementation tip:**
  ```ts
  const reduced = usePrefersReducedMotion(); // from hook in utilities/
  if (reduced) {
    // choose variants with opacity only, no translate/rotate
    const reduceItemVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  } else {
    // full motion variant
  }
  ```

**Accessibility & Focus Management**
- **Focus transitions:** keep motion short for focus interactions (≤180ms) or avoid animation on focus altogether.
- **Readable motion:** ensure motion does not induce vestibular issues (avoid large accelerations/rotations, cap parallax at 30–40px).
- **Provide controls:** global "Reduce motion" toggle and audio mute persist in `localStorage`.
- **Focus outline:** always visible (3–4px solid --color-accent) with no animation delay.
- **Lightbox (if used):** trap focus while open; ESC key closes; restore focus to trigger button on close.

**Performance Best Practices**
- **Offload to compositor:** animate only `transform` and `opacity`; avoid animating `width/height/top/left/margin/padding`.
- **Limit paint cost:** avoid animating expensive properties; pre-render shadows where possible using box-shadow presets.
- **Batch & throttle:** throttle scroll-driven calculations to 30–60 FPS; debounce heavy updates to 100ms intervals.
- **Lazy-load:** begin heavy animations (3D, polaroids) only after hero paint or on idle callback.
- **GPU acceleration:** use `will-change: transform; transform: translateZ(0);` on animated elements sparingly (can increase memory).

**Animation Timing Table (reference)**
| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| Entrance (hero, section) | 480ms | cubic-bezier(.16,.84,.3,1) | Initial page load reveals |
| Stagger gap | 80ms | — | Between children in list |
| Button hover | 150ms | cubic-bezier(.16,.84,.3,1) | Interactive feedback |
| Micro (badges, pills) | 160–220ms | cubic-bezier(.16,.84,.3,1) | Small reveal highlights |
| Glitch | 30–120ms | linear | Typographic accent |
| Parallax (scroll-linked) | continuous | linear | Depth effect tied to scroll |
| 3D orbit | 30–60s | linear | Slow background motion |
| Expand (accordion) | 300ms | cubic-bezier(.16,.84,.3,1) | Timeline expand |

**Implementation Patterns & Code Examples**

1. **Framer Motion container + children (list stagger):**
   ```tsx
   <motion.ul initial="hidden" animate="visible" variants={container}>
     {items.map((item, i) => (
       <motion.li key={i} variants={itemVariant}>
         {item.title}
       </motion.li>
     ))}
   </motion.ul>
   ```

2. **Scroll-linked parallax (Framer):**
   ```tsx
   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
   return <motion.div style={{ y }}>Parallax content</motion.div>
   ```

3. **Glitch trigger (JS + Tailwind):**
   ```ts
   const triggerGlitch = (el) => {
     el.classList.add('glitch');
     setTimeout(() => el.classList.remove('glitch'), 100);
   }
   // debounce or call on specific event
   ```

4. **3D suspend on reduced-motion:**
   ```tsx
   if (prefersReduced) return <img src="fallback-hero.jpg" alt="hero" />;
   return <Background3D />;
   ```

5. **Button with full hover feedback:**
   ```tsx
   <motion.button 
     whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 12px rgba(184,134,11,0.4)' }}
     whileTap={{ scale: 0.98 }}
     transition={{ duration: 0.15, ease: [0.16, 0.84, 0.3, 1] }}
   >
     Contact me
   </motion.button>
   ```

**Testing & QA Checklist**
- [ ] Smoke test all animations on 4G mobile (mid-tier phone).
- [ ] Verify reduced-motion toggle disables parallax, 3D, glitch, and stagger.
- [ ] Check keyboard navigation does not trigger unintended animation cascades.
- [ ] Audit focus outlines and tab order in animated sections.
- [ ] Run Lighthouse performance audit; ensure FCP < 1.2s, TTI < 3s on mobile.
- [ ] Visual regression: capture hero, timeline, polaroid strip with and without reduced-motion.
- [ ] Test glitch effect on different screen sizes (should not exceed 2px displacement).
- [ ] Verify 3D render loop pauses when tab loses focus or component unmounts.

**Browser Support & Fallbacks**
- **CSS animations:** all modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+).
- **Transforms & will-change:** widely supported; ensure fallbacks (opacity only) on older devices.
- **Three.js / R3F:** requires WebGL; provide static fallback image for non-WebGL browsers.

**Future Enhancements & Notes**
- Consider adding audio-reactive animations if ambient audio track is prominently featured.
- Investigate timeline micro-interactions (expand/collapse) with bounce easing for liveliness.
- Profile performance on low-end devices and consider adaptive animation detail levels.

**End of Animation & Motion Specification**

---

If you want me to:
- Generate `src/utilities/usePrefersReducedMotion.ts` and a `useParallax.ts` hook, or
- Create `src/components/Hero.tsx` and `Background3D.tsx` wired with these exact animations, or
- Add this animation spec directly into `about.md` (done), or
- Commit and push changes to remote

Tell me what's next.