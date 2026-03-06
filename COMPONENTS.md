# Component Structure

## Layout
- **BrutalLayout** — Root layout: navbar, Ribbons overlay, Toaster, page wrapper
- **BrutalNav** — Top navigation with mobile hamburger menu

## Sections
- **BrutalHero** — Animated hero with glitch text, speed lines, and CTA buttons
- **About** — Bio + skills grid
- **Skills** — Tech stack with animated tags *(memo)*
- **Projects** — Featured project cards *(memo)*
- **Journey** — Education & experience timeline
- **FavMangaPanel** — 3D vertical carousel of 19 favourite manga panels (lazy-mounted, auto-rotates, click-to-expand lightbox)
- **GitHubActivity** — Live contribution graph via ghchart.rshah.org *(memo)*
- **Contact** — Contact links + working email form

## UI Components
- **GlitchText** — Animated text glitch effect *(memo)*
- **Shuffle** — Letter-scramble reveal animation
- **Ribbons** — GPU-accelerated canvas ribbon animation (fixed overlay)
- **SectionLoader** — Suspense fallback spinner
- **LoadingSpinner** — Reusable spinner with optional fullscreen mode

## Modals
- **ResumeModal** — Full-screen PDF viewer via `<iframe>` with download button

## Utilities
- `src/utils/performance.ts` — `measurePerformance()` and `logComponentRender()` helpers
- `src/lib/api.ts` — `submitContactForm()` API call
- `src/hooks/useCommon.ts` — Shared hooks

## Best Practices
1. Use semantic HTML elements
2. Add ARIA labels for accessibility
3. Wrap expensive components in `memo()`
4. Lazy-mount heavy sections with `IntersectionObserver`
5. Use `will-change: transform` + `contain: strict` for GPU-heavy animations
