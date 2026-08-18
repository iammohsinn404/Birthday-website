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
// CAKE PAGE
// ================================

const burpSound = new Audio("../Sounds/burp.mp3");

const cakeArea = document.getElementById("cakeArea");

const cakeMessage = document.getElementById("cakeMessage");

const moreForwardButton = document.getElementById("moreForwardButton");

let eatenPieces = 0;

// Cake pieces
if (cakeArea) {
  cakeArea.addEventListener("click", (event) => {
    const piece = event.target.closest(".cake-piece");

    if (!piece) return;

    if (piece.classList.contains("eaten")) {
      return;
    }

    piece.classList.add("eaten");

    eatenPieces++;

    burpSound.currentTime = 0;
    burpSound.play().catch(() => {});

    if (cakeMessage) {
      cakeMessage.textContent = "Yummm... another piece disappeared! 😂";
    }

    createCakeParticles(piece);

    // All six eaten
    if (eatenPieces === 6) {
      if (cakeMessage) {
        cakeMessage.textContent = "You ate them all! 😂🍰";
      }

      setTimeout(() => {
        if (moreForwardButton) {
          moreForwardButton.classList.add("show");

          moreForwardButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 800);
    }
  });
}

// More Forward → Poop
if (moreForwardButton) {
  moreForwardButton.addEventListener("click", () => {
    window.location.href = window.getBirthdayPageUrl("prank.html");
  });
}

// Cake particles
function createCakeParticles(piece) {
  const particles = ["🟫", "🟫", "🟤", "✨", "💨", "🟫", "✨", "🟤"];

  const cakePage = document.getElementById("cakePage");

  if (!cakePage) return;

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");

    particle.classList.add("cake-particle");

    particle.textContent =
      particles[Math.floor(Math.random() * particles.length)];

    particle.style.left = 45 + Math.random() * 15 + "%";

    particle.style.top = 45 + Math.random() * 15 + "%";

    particle.style.setProperty("--x", Math.random() * 220 - 110 + "px");

    particle.style.setProperty("--y", Math.random() * -180 - 30 + "px");

    particle.style.setProperty("--rotate", Math.random() * 720 - 360 + "deg");

    cakePage.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}
