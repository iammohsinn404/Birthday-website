// ========================================
// FIREFLY GLOW CURSOR
// ========================================

(() => {
  const glowCursor = document.getElementById("glowCursor");
  const glowCursorTail = document.getElementById("glowCursorTail");
  const glowCursorRing = document.getElementById("glowCursorRing");
  const canvas = document.getElementById("fireflyCanvas");

  if (!glowCursor || !glowCursorTail || !glowCursorRing || !canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const FLY_PALETTE = [
    {
      core: "#fff8ec",
      glow: "232,176,75",
    },
    {
      core: "#ffeaf0",
      glow: "242,163,173",
    },
    {
      core: "#eef6df",
      glow: "185,199,160",
    },
    {
      core: "#fff3d6",
      glow: "255,227,163",
    },
  ];

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let velX = 0;
  let velY = 0;
  let speed = 0;

  let arrowX = mouseX;
  let arrowY = mouseY;

  let ringX = mouseX;
  let ringY = mouseY;

  let history = [];

  const MAX_HISTORY = 150;

  let idleTimer = 0;

  let flies = [];

  // ========================================
  // CANVAS
  // ========================================

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";

    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);

  resize();

  // ========================================
  // CREATE FIREFLIES
  // ========================================

  function initFlies() {
    flies = [];

    const COUNT = 7;

    for (let i = 0; i < COUNT; i++) {
      const color = FLY_PALETTE[i % FLY_PALETTE.length];

      flies.push({
        lag: 8 + i * 8,

        x: mouseX,
        y: mouseY,

        orbitAngle: Math.random() * Math.PI * 2,

        orbitSpeed: 0.3 + Math.random() * 0.35,

        orbitRadius: 9 + Math.random() * 15,

        wobble: Math.random() * Math.PI * 2,

        size: 2.2 + Math.random() * 2.4,

        core: color.core,

        glowRGB: color.glow,

        flickerSeed: Math.random() * 100,

        flashTimer: 0,

        trail: [],
      });
    }
  }

  initFlies();

  // ========================================
  // MOUSE
  // ========================================

  window.addEventListener("mousemove", (event) => {
    velX = event.clientX - mouseX;

    velY = event.clientY - mouseY;

    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  // ========================================
  // ANIMATION
  // ========================================

  let lastTime = performance.now();

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);

    const time = now * 0.001;

    lastTime = now;

    // Smooth velocity

    velX *= 0.85;
    velY *= 0.85;

    speed = Math.hypot(velX, velY);

    // ========================================
    // MAIN GLOW DOT
    // ========================================

    arrowX += (mouseX - arrowX) * 0.35;

    arrowY += (mouseY - arrowY) * 0.35;

    glowCursor.style.transform = `translate(${arrowX}px, ${arrowY}px)`;

    // ========================================
    // TRAIL
    // ========================================

    const angle = Math.atan2(velY, velX);

    const stretch = Math.min(speed / 18, 1);

    glowCursorTail.style.opacity = (stretch * 0.85).toFixed(2);

    glowCursorTail.style.transform = `rotate(${angle}rad) scaleX(${(
      0.45 +
      stretch * 1.6
    ).toFixed(2)})`;

    // ========================================
    // RING
    // ========================================

    ringX += (arrowX - ringX) * 0.13;

    ringY += (arrowY - ringY) * 0.13;

    const ringStretch = Math.min(speed / 34, 0.3);

    glowCursorRing.style.transform = `translate(${ringX}px, ${ringY}px)
             rotate(${angle}rad)
             scale(
                ${(1 + ringStretch).toFixed(3)},
                ${(1 - ringStretch * 0.6).toFixed(3)}
             )
             rotate(${-angle}rad)`;

    // ========================================
    // MOUSE HISTORY
    // ========================================

    history.unshift({
      x: mouseX,
      y: mouseY,
    });

    if (history.length > MAX_HISTORY) {
      history.length = MAX_HISTORY;
    }

    // ========================================
    // IDLE
    // ========================================

    idleTimer = speed < 0.4 ? idleTimer + dt : 0;

    const isIdle = idleTimer > 0.9;

    // ========================================
    // DRAW FIREFLIES
    // ========================================

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    flies.forEach((fly) => {
      let targetX;
      let targetY;

      // Cursor stopped
      if (isIdle) {
        fly.orbitAngle += fly.orbitSpeed * dt;

        const radius = fly.orbitRadius + Math.sin(time * 0.6 + fly.wobble) * 4;

        targetX = mouseX + Math.cos(fly.orbitAngle) * radius;

        targetY = mouseY + Math.sin(fly.orbitAngle) * radius * 0.7;
      }

      // Cursor moving
      else {
        const point = history[Math.min(fly.lag, history.length - 1)] || {
          x: mouseX,
          y: mouseY,
        };

        targetX = point.x + Math.cos(time * 0.8 + fly.wobble) * 6;

        targetY = point.y + Math.sin(time * 1.1 + fly.wobble) * 6 - 2;
      }

      // Smooth movement

      fly.x += (targetX - fly.x) * (isIdle ? 0.055 : 0.09);

      fly.y += (targetY - fly.y) * (isIdle ? 0.055 : 0.09);

      // ========================================
      // FIREFLY TRAIL
      // ========================================

      fly.trail.unshift({
        x: fly.x,
        y: fly.y,
      });

      if (fly.trail.length > 9) {
        fly.trail.length = 9;
      }

      // ========================================
      // FLICKER
      // ========================================

      const flicker =
        0.5 +
        0.5 *
          (0.5 + 0.5 * Math.sin(time * 3.1 + fly.flickerSeed)) *
          (0.6 + 0.4 * Math.sin(time * 1.3 + fly.flickerSeed * 0.6));

      // ========================================
      // RANDOM FLASH
      // ========================================

      fly.flashTimer -= dt;

      if (fly.flashTimer <= 0 && Math.random() < 0.0035) {
        fly.flashTimer = 0.4;
      }

      const flashBoost =
        fly.flashTimer > 0
          ? 1 + Math.sin(((0.4 - fly.flashTimer) / 0.4) * Math.PI) * 1.1
          : 1;

      const glowStrength = flicker * flashBoost;

      // ========================================
      // TRAIL PARTICLES
      // ========================================

      for (let k = fly.trail.length - 1; k >= 1; k--) {
        const point = fly.trail[k];

        const alpha = (1 - k / fly.trail.length) * 0.15 * flicker;

        const radius = fly.size * (1 - (k / fly.trail.length) * 0.55) * 1.8;

        ctx.beginPath();

        ctx.fillStyle = `rgba(
                        ${fly.glowRGB},
                        ${alpha.toFixed(3)}
                    )`;

        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

        ctx.fill();
      }

      // ========================================
      // GLOW
      // ========================================

      const glowRadius = fly.size * 5.5 * glowStrength;

      const gradient = ctx.createRadialGradient(
        fly.x,
        fly.y,
        0,
        fly.x,
        fly.y,
        glowRadius,
      );

      gradient.addColorStop(
        0,
        `rgba(
                    ${fly.glowRGB},
                    ${(0.55 * glowStrength).toFixed(3)}
                )`,
      );

      gradient.addColorStop(
        1,
        `rgba(
                    ${fly.glowRGB},
                    0
                )`,
      );

      ctx.beginPath();

      ctx.fillStyle = gradient;

      ctx.arc(fly.x, fly.y, glowRadius, 0, Math.PI * 2);

      ctx.fill();

      // ========================================
      // CORE
      // ========================================

      ctx.beginPath();

      ctx.globalAlpha = Math.min(flicker * flashBoost, 1);

      ctx.fillStyle = fly.core;

      ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2);

      ctx.fill();

      ctx.globalAlpha = 1;
    });

    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
