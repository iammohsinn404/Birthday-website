const prefersReducedMotion = matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const pointerFine = matchMedia("(pointer:fine)").matches;

/* ---------- assign --i index to every reveal-stagger child (generic, any length) ---------- */
document.querySelectorAll(".reveal-stagger").forEach((container) => {
  [...container.children].forEach((child, i) =>
    child.style.setProperty("--i", i),
  );
});

/* ---------- confetti (canvas particle system) ---------- */
const fxCanvas = document.getElementById("fxCanvas");
const ctx = fxCanvas.getContext("2d");
let dpr = 1,
  particles = [],
  rafRunning = false;
function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  fxCanvas.width = innerWidth * dpr;
  fxCanvas.height = innerHeight * dpr;
  fxCanvas.style.width = innerWidth + "px";
  fxCanvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", resizeCanvas);
resizeCanvas();

function confettiBurst(cx, cy, count) {
  if (prefersReducedMotion) return;
  const colors = [
    "#ff4e91",
    "#ff9dc0",
    "#8b5cf6",
    "#ffc861",
    "#7c4df0",
    "#ffffff",
  ];
  if (particles.length > 500) particles.splice(0, particles.length - 500);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 11,
      vy: -(Math.random() * 9 + 4),
      size: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "rect" : "circle",
      life: 0,
      maxLife: 85 + Math.random() * 40,
      gravity: 0.25 + Math.random() * 0.12,
      drag: 0.992,
    });
  }
  if (!rafRunning) {
    rafRunning = true;
    requestAnimationFrame(tickConfetti);
  }
}
function tickConfetti() {
  ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    const lifeRatio = p.life / p.maxLife;
    const alpha =
      lifeRatio > 0.75 ? Math.max(0, 1 - (lifeRatio - 0.75) / 0.25) : 1;
    if (p.life >= p.maxLife || p.y > innerHeight + 40) {
      particles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  if (particles.length > 0) {
    requestAnimationFrame(tickConfetti);
  } else {
    rafRunning = false;
    ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  }
}

/* ---------- count-up vitals numbers ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const dur = 1100,
    start = performance.now();
  function step(t) {
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  requestAnimationFrame(step);
}

// START BIRTHDAY PAGE DIRECTLY


document.body.style.overflow = '';

if (heroSection) {
    heroSection.classList.add('play');
}

if (topNav) {
    topNav.classList.add('show');
}

document
    .querySelectorAll('.vitals-num[data-target]')
    .forEach(countUp);

// ========================================
// BIRTHDAY → SCRATCH PAGE
// ========================================

const scratchButton =
    document.getElementById("scratchButton");

scratchButton?.addEventListener("click", () => {

    window.location.href = "scratch.html";

});

/* nav bar background/shadow once the page is scrolled */
addEventListener(
  "scroll",
  () => {
    topNav?.classList.toggle("scrolled", scrollY > 30);
  },
  { passive: true },
);

/* ---------- scroll progress bar ---------- */
const progressBar = document.getElementById("scrollProgress");
function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
}

/* ---------- back to top ---------- */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);

/* ---------- scroll reveals ---------- */
const revealIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        revealIO.unobserve(en.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
);
document
  .querySelectorAll(".reveal,.reveal-stagger")
  .forEach((el) => revealIO.observe(el));

/* ---------- section wayfinding: side dots + top-nav links share one observer ---------- */
const navTargets = [
  ...document.querySelectorAll(".section-dots .dot, .nav-links a"),
];
const dotSectionIds = [
  "heroSection",
  "messageSection",
  "storySection",
  "memoriesSection",
  "surpriseSection",
];
const dotSections = dotSectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const dotIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navTargets.forEach((el) => {
          el.classList.toggle("active", el.dataset.navFor === en.target.id);
        });
      }
    });
  },
  { threshold: 0.5 },
);
dotSections.forEach((s) => dotIO.observe(s));

/* ---------- story rail: scroll-tracked progress line + active-step highlight ---------- */
const storyItems = [...document.querySelectorAll(".story-item")];
const storyRailFill = document.getElementById("storyRailFill");
if (storyItems.length) {
  const storyIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const idx = storyItems.indexOf(en.target);
          storyItems.forEach((it) => it.classList.remove("active"));
          en.target.classList.add("active");
          if (storyRailFill)
            storyRailFill.style.height =
              ((idx + 1) / storyItems.length) * 100 + "%";
        }
      });
    },
    { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" },
  );
  storyItems.forEach((it) => storyIO.observe(it));
}

/* ---------- cinematic line-mask reveal (triggers once, in view) ---------- */
const cinematicLines = document.getElementById("cinematicLines");
if (cinematicLines) {
  const cineIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          cinematicLines.classList.add("in");
          cineIO.unobserve(en.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  cineIO.observe(cinematicLines);
}

/* ---------- ambient floating hearts (skipped for reduced-motion users) ---------- */
if (!prefersReducedMotion) {
  const ambient = document.getElementById("ambient");
  const glyphs = ["♡", "✦", "🎈", "✨"];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 12 + Math.random() * 20 + "px";
    s.style.animationDuration = 10 + Math.random() * 14 + "s";
    s.style.animationDelay = Math.random() * 14 + "s";
    s.style.setProperty("--dx", Math.random() * 140 - 70 + "px");
    s.style.color =
      Math.random() > 0.5 ? "rgba(255,94,155,.4)" : "rgba(139,92,246,.35)";
    ambient.appendChild(s);
  }
}

/* ---------- reel: scroll-linked pinned photo mechanism ---------- */
const reelTrack = document.getElementById("reelTrack");
const reelFrames = [...document.querySelectorAll(".reel-frame")];
const reelDashes = [...document.querySelectorAll(".dash")];
const reelCurrent = document.getElementById("reelCurrent");
const motionOK = matchMedia("(prefers-reduced-motion: no-preference)").matches;

/* Each frame's opacity/position/scale is a continuous function of scroll progress
   (not a stepped class-toggle), so the crossfade tracks the scrollbar 1:1 — scrub
   up or down and the transition follows instantly, the way a scrubbed video would. */
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function updateReel() {
  if (!reelTrack || !motionOK) return;
  const rect = reelTrack.getBoundingClientRect();
  const total = rect.height - innerHeight;
  let progress = total > 0 ? -rect.top / total : rect.top < 0 ? 1 : 0;
  progress = Math.max(0, Math.min(1, progress));
  const n = reelFrames.length;

  reelFrames.forEach((f, i) => {
    const t = progress * n - i;
    let opacity,
      ty,
      scale,
      z,
      active = false;
    if (t <= 0) {
      opacity = 0;
      ty = 70;
      scale = 0.86;
      z = 1;
    } else if (t < 1) {
      const e = easeOutCubic(t);
      opacity = e;
      ty = 70 * (1 - e);
      scale = 0.86 + 0.14 * e;
      z = 3;
      active = true;
    } else if (t < 2) {
      const e = easeOutCubic(t - 1);
      opacity = 1 - e;
      ty = -80 * e;
      scale = 1 - 0.08 * e;
      z = 2;
    } else {
      opacity = 0;
      ty = -80;
      scale = 0.92;
      z = 1;
    }
    f.style.opacity = opacity;
    f.style.transform = `translateY(${ty}px) scale(${scale}) rotate(var(--r,0deg))`;
    f.style.zIndex = z;
    f.classList.toggle("active", active);
  });

  const idx = Math.min(n - 1, Math.max(0, Math.floor(progress * n)));
  if (reelCurrent) reelCurrent.textContent = String(idx + 1).padStart(2, "0");
  reelDashes.forEach((d, i) => d.classList.toggle("active", i === idx));
}

let scrollTicking = false;
function onScroll() {
  updateProgress();
  backToTop.classList.toggle("show", scrollY > innerHeight * 0.6);
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateReel();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}
addEventListener("scroll", onScroll, { passive: true });
updateProgress();
updateReel();

/* ---------- desktop-only flourishes: cursor, magnetism, balloon parallax, tilt ---------- */
if (pointerFine && !prefersReducedMotion) {
  document.body.classList.add("cursor-ready");

  const glow = document.getElementById("cursorGlow");
  const ring = document.getElementById("cursorRing");
  let mx = innerWidth / 2,
    my = innerHeight / 2,
    gx = mx,
    gy = my,
    rx = mx,
    ry = my;
  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  (function loop() {
    gx += (mx - gx) * 0.22;
    gy += (my - gy) * 0.22;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a,button,.chip").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

  // magnetic pull on the main buttons
  [surpriseBtn, backToTop].forEach((el) => {
    if (!el) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28 - 3}px) scale(1.04)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // hero balloon mouse-parallax (layered depth)
  const balloons = [...document.querySelectorAll(".balloon")];
  heroSection.addEventListener("mousemove", (e) => {
    const r = heroSection.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    balloons.forEach((b) => {
      const depth = parseFloat(b.dataset.depth || 1);
      b.style.transform = `translate(${dx * depth * 10}px, ${dy * depth * 8}px)`;
    });
  });
  heroSection.addEventListener("mouseleave", () => {
    balloons.forEach((b) => (b.style.transform = ""));
  });
}

/* ---------- preloader: wait for the 3 photos (or a timeout), then reveal ---------- */
const preloader = document.getElementById("preloader");
const preloaderFill = document.getElementById("preloaderFill");
const photosToLoad = [
  "images/decoration.jpg",
  "images/cake-cat.jpg",
  "images/happybirthday-card.jpg",
];
let loadedCount = 0;
function bumpPreloader() {
  loadedCount++;
  preloaderFill.style.width =
    Math.round((loadedCount / photosToLoad.length) * 100) + "%";
}
const loadPromises = photosToLoad.map(
  (src) =>
    new Promise((resolve) => {
      const im = new Image();
      im.onload = im.onerror = () => {
        bumpPreloader();
        resolve();
      };
      im.src = src;
    }),
);
const minWait = new Promise((resolve) => setTimeout(resolve, 900));
Promise.all([...loadPromises, minWait]).then(() => {
  preloader.classList.add("hide");
});
