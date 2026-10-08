// Ambient hero. One <video>; the blurred environment is a small canvas that copies the same frames,
// so the two layers cannot drift apart (no second decoder, no resync timer).
(function () {
  const $ = (id) => document.getElementById(id);
  const hero = $("hero"), film = $("film"), canvas = $("ambient"), tcEl = $("tc");
  const ctx = canvas.getContext("2d", { alpha: false });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const FPS = 30;

  const poster = new Image();
  poster.onload = () => { if (!running) paint(poster); };
  poster.src = "assets/poster.webp";
  const paint = (src) => { try { ctx.drawImage(src, 0, 0, canvas.width, canvas.height); } catch (e) {} };

  const pad = (n) => String(n).padStart(2, "0");
  let lastTc = "";
  function setTC(t) {
    const s = Math.floor(t), f = Math.min(FPS - 1, Math.floor((t - s) * FPS));
    const next = `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f)}`;
    if (next !== lastTc) { tcEl.textContent = next; lastTc = next; }
  }

  const hasRVFC = "requestVideoFrameCallback" in film;
  let running = false, raf = 0;
  function pump(_now, meta) {
    if (!running) return;
    paint(film);
    setTC(meta && meta.mediaTime != null ? meta.mediaTime : film.currentTime);
    schedule();
  }
  function schedule() { hasRVFC ? film.requestVideoFrameCallback(pump) : (raf = requestAnimationFrame(pump)); }
  function start() { if (running) return; running = true; schedule(); }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

  let visible = true, armed = false;
  function armGesture() {
    if (armed) return; armed = true;
    const go = () => { armed = false; ["pointerdown", "touchstart", "keydown", "scroll"].forEach((e) => removeEventListener(e, go)); update(); };
    ["pointerdown", "touchstart", "keydown", "scroll"].forEach((e) => addEventListener(e, go, { once: true, passive: true }));
  }
  function play() {
    const p = film.play();
    if (p && p.then) p.then(start).catch(() => { stop(); armGesture(); });
    else start();
  }
  function update() {
    if (reduce.matches) { film.pause(); stop(); return; }
    if (visible && !document.hidden) play(); else { film.pause(); stop(); }
  }

  new IntersectionObserver((e) => { visible = e[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(hero);
  document.addEventListener("visibilitychange", update);
  reduce.addEventListener && reduce.addEventListener("change", update);
  update();

  const after = $("after");
  if ("IntersectionObserver" in window && !reduce.matches) {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { after.classList.add("in"); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(after);
  } else after.classList.add("in");
})();