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
// PUZZLE PAGE
// ================================
const clickSound = new Audio("../Sounds/click.mp3");
const successSound = new Audio("../Sounds/sucess.mp3");

const puzzle = document.getElementById("puzzle");

const puzzleImages = [
  "cake.webp",
  "catcake.webp",
  "catrose.webp",
  "loveheart.webp",
  "purposeemoji.webp",
  "realheart.webp",
  "rose.webp",
  "moon.webp",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Start puzzle
function startPuzzle() {
  if (!puzzle) return;

  puzzle.innerHTML = "";

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;

  const cards = [...puzzleImages, ...puzzleImages];

  cards.sort(() => Math.random() - 0.5);

  cards.forEach((image) => {
    const card = document.createElement("button");

    card.classList.add("puzzle-card");

    card.dataset.image = image;

    card.innerHTML = `
            <span class="card-front">?</span>

            <img
                class="card-image"
                src="../puzzle Imgs/${image}"
                alt="Puzzle image"
            >
        `;

    card.addEventListener("click", () => {
      flipCard(card);
    });

    puzzle.appendChild(card);
  });
}

// Flip card
function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");

  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  checkMatch();
}

// Check match
function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;

    resetCards();

    if (matchedPairs === puzzleImages.length) {
      puzzleComplete();
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetCards();
    }, 800);
  }
}

// Reset
function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Puzzle complete
function puzzleComplete() {
  successSound.currentTime = 0;
  successSound.play().catch(() => {});

  setTimeout(() => {
    window.location.href = window.getBirthdayPageUrl("monkey.html");
  }, 500);
}

// Start
startPuzzle();
