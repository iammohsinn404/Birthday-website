// ========================================
// PROFILE MENU
// ========================================

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const restartButton = document.getElementById("restartButton");
const refreshButton = document.getElementById("refreshButton");

if (profileBtn && profileMenu) {
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    if (
      !profileMenu.contains(event.target) &&
      !profileBtn.contains(event.target)
    ) {
      profileMenu.classList.remove("show");
    }
  });
}

if (restartButton) {
  restartButton.addEventListener("click", () => {
    window.location.href = window.getBirthdayPageUrl("intro.html");
  });
}

if (refreshButton) {
  refreshButton.addEventListener("click", () => {
    window.location.reload();
  });
}
// ================================
// SCRATCH CARD
// ================================

const scratchCanvas = document.getElementById("scratchCanvas");

const scratchCard = document.getElementById("scratchCard");

const scratchContinueButton = document.getElementById("scratchContinueButton");

if (scratchCanvas && scratchCard) {
  const ctx = scratchCanvas.getContext("2d");

  let scratching = false;

  let checkingScratch = false;

  // ========================================
  // SETUP CANVAS
  // ========================================

  function setupScratchCanvas() {
    const rect = scratchCard.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    scratchCanvas.width = rect.width * dpr;

    scratchCanvas.height = rect.height * dpr;

    scratchCanvas.style.width = rect.width + "px";

    scratchCanvas.style.height = rect.height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ========================================
    // SCRATCH COVER — MATCH WEBSITE THEME
    // ========================================

    ctx.globalCompositeOperation = "source-over";

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);

    gradient.addColorStop(0, "#241d30");
    gradient.addColorStop(0.45, "#30243b");
    gradient.addColorStop(1, "#1a1524");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, rect.width, rect.height);

    // ========================================
    // SUBTLE GOLD / ROSE GLOW
    // ========================================

    const glow = ctx.createRadialGradient(
      rect.width * 0.25,
      rect.height * 0.2,
      0,
      rect.width * 0.25,
      rect.height * 0.2,
      rect.width * 0.65,
    );

    glow.addColorStop(0, "rgba(232,176,75,0.16)");

    glow.addColorStop(0.45, "rgba(242,163,173,0.08)");

    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;

    ctx.fillRect(0, 0, rect.width, rect.height);

    // ========================================
    // SCRATCH TEXT
    // ========================================

    ctx.fillStyle = "rgba(250,243,232,0.92)";

    ctx.font = "600 22px Manrope, Arial, sans-serif";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText("✨ Scratch Me ✨", rect.width / 2, rect.height / 2);
  }
  // ========================================
  // SCRATCH
  // ========================================

  function scratch(x, y) {
    const rect = scratchCanvas.getBoundingClientRect();

    const canvasX = x - rect.left;

    const canvasY = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(canvasX, canvasY, 28, 0, Math.PI * 2);

    ctx.fill();

    checkScratchProgress();
  }

  // ========================================
  // CHECK HOW MUCH IS SCRATCHED
  // ========================================

  function checkScratchProgress() {
    if (checkingScratch) return;

    checkingScratch = true;

    setTimeout(() => {
      checkingScratch = false;

      const width = scratchCanvas.width;

      const height = scratchCanvas.height;

      const imageData = ctx.getImageData(0, 0, width, height);

      const data = imageData.data;

      let transparentPixels = 0;

      let totalPixels = 0;

      // Check every 8th pixel

      for (let i = 3; i < data.length; i += 32) {
        totalPixels++;

        if (data[i] < 50) {
          transparentPixels++;
        }
      }

      const scratchedPercentage = (transparentPixels / totalPixels) * 100;

      // Reveal button after 40%

      if (scratchedPercentage >= 40 && scratchContinueButton) {
        scratchContinueButton.classList.add("show");
      }
    }, 100);
  }

  // ========================================
  // MOUSE
  // ========================================

  scratchCanvas.addEventListener("mousedown", () => {
    scratching = true;
  });

  scratchCanvas.addEventListener("mouseup", () => {
    scratching = false;
  });

  scratchCanvas.addEventListener("mouseleave", () => {
    scratching = false;
  });

  scratchCanvas.addEventListener("mousemove", (event) => {
    if (!scratching) return;

    scratch(event.clientX, event.clientY);
  });

  // ========================================
  // TOUCH
  // ========================================

  scratchCanvas.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();

      scratching = true;

      const touch = event.touches[0];

      scratch(touch.clientX, touch.clientY);
    },
    {
      passive: false,
    },
  );

  scratchCanvas.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();

      if (!scratching) return;

      const touch = event.touches[0];

      scratch(touch.clientX, touch.clientY);
    },
    {
      passive: false,
    },
  );

  scratchCanvas.addEventListener("touchend", () => {
    scratching = false;
  });

  // ========================================
  // RESIZE
  // ========================================

  window.addEventListener("resize", () => {
    setupScratchCanvas();
  });

  // ========================================
  // CONTINUE → BIRTHDAY
  // ========================================

  if (scratchContinueButton) {
    scratchContinueButton.addEventListener("click", () => {
      scratchContinueButton.textContent = "💗 You Found It!";

      scratchContinueButton.disabled = true;

      scratchContinueButton.classList.add("revealed");
    });
  }

  // ========================================
  // START
  // ========================================

  setupScratchCanvas();
}
