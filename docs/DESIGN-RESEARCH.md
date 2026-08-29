# WAIFU ARCHIVE — Design Research Notes

Reference sites/projects studied before building, and what was borrowed. This is a fair-use tribute
site: all 3D visuals are procedural originals (no copyrighted character art), all copy is researched fact.

## References

| Reference | What it taught us | Borrowed |
|---|---|---|
| animejs.com | Structure: giant kinetic type hero, living demo tiles, feature sections | "Motion Lab" live 3D demo tiles; kinetic headline |
| nudot.com.tw (核點 Nudot Studio) | Sticky scroll-film hero (600vh track, pinned 100vh, rAF ticker with named phase breakpoints), lerped scrub values, `( 漢字 )` parenthesized CJK chapter labels, kanji + English bilingual voice, enormous fluid clamp display type with tight tracking, scroll-velocity-aware marquee, noise/grain layer gated on reduced-motion/mobile, IntersectionObserver lazy init | Scroll-dolly camera phases, lerped camera easing, `( 漢字 )` chapter labels, kanji + English dual voice, film grain (motion-safe), velocity marquee, giant fluid display type |
| github.com/monkeydcoder/3js_Portfolio | Studio Ghibli-style 3D anime scroll journey (torii, lanterns, sakura, pond) | Torii-gate dolly moment; sakura fall |
| github.com/udithavithanage/3d-web | R3F + GSAP + Rapier 3D page structure | Modern R3F project anatomy |
| github.com/SRCarlo/ThreeJS_Animation_Scroll | Scroll-linked three.js choreography | ScrollTrigger scrub patterns |
| github.com/rounakdey2003/The-Frame | Manga halftone / speed-line / glitch shaders | Sparing use of stylistic shader touches |
| mesh3d.gallery/websites?tags=Anime (Variscena, Sougen, Ameen Abdullah) | Anime-themed 3D web gallery | Motif staging, camera placement |

## Techniques inventory (as-built)

- One persistent three.js canvas, transparent, full-screen, fixed behind DOM.
- Camera dollies down -Z on scroll (`CameraRig.tsx`), eased with a lerp, breathing + pointer parallax.
- Scroll progress written by GSAP ScrollTrigger with scrub, read per-frame by the rig.
- Instanced sakura petals (`Petals.tsx`), swaying paper lanterns (`Lanterns.tsx`).
- 12 procedural alcove vignettes (`Vignettes.tsx`), each culled by camera proximity (draw-call budget stays low).
- Perpetual-motion recipes: spin, orbit, bob, sway, pulse, drift. Nothing is static.
- Post-processing: Bloom + Vignette + Noise (subtle), motion-safe CSS grain overlay.
- Lenis smooth scroll; GSAP + ScrollTrigger; Tailwind v4; OriginKit glass components (adapted).

## Anti-fabrication policy

No invented quotes, dates, studios, or voice-actress credits. Every waifu fact in
`src/lib/waifus.ts` is traced to a published source in `SOURCES.md`.