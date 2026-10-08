# Ambient cinematic hero POC

One 5-second clip -> a seamless-loop ambient hero that never crops the product. Plain HTML/CSS/JS, no framework, no GSAP.

    npm run build:assets   # source/burger.mp4 -> assets/hero.mp4 + hero.webm (seamless loop) + poster.webp  (needs ffmpeg)
    npm start              # http://localhost:5174  (index.html also works opened directly from disk)

How it works
- ONE <video> (contain, feathered edges) is the product. The environment is a 128x77 <canvas> that copies the same
  frames (requestVideoFrameCallback), blurred + darkened by CSS. One decoder, so the layers can't drift apart.
- Product box size is min(86vw, 166vh): bounded by width AND height, so the burger is never cropped.
- Portrait is its own composition: box is 158vw wide (burger fills ~85% of phone width), copy sits above it.
- Ambient motion is CSS only: 26s ease-in-out drift + 1.00->1.028 scale; background drifts the opposite way.
- Loop: build script trims soft opening frames, then crossfades the last 0.7s into the first 0.7s.
- Autoplay: muted + playsinline; if blocked, poster stays and first touch/key/scroll retries. Pauses offscreen/hidden tab.
- prefers-reduced-motion: poster only. The video is never downloaded and no drift runs.

Swap the footage: replace source/burger.mp4, re-run build:assets. Tune TRIM_START_FRAMES / OVERLAP at the top of the script.
Copy lives in index.html; --burger-x / --burger-y in style.css move the product.