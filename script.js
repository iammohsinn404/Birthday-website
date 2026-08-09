// Intro SCREEN 

const introScreen = document.getElementById("introScreen");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
    document.body.classList.add("intro-active");

// yes Button
yesButton.addEventListener("click", () => {
    introScreen.classList.add("intro-hidden");
    document.body.classList.remove("intro-active");
    gameScreen.classList.add("show-game");
    startPuzzle();
});

 // ========================================
// PUZZLE GAME
// ========================================
const puzzleImages = [
    "cake.jpg",
    "catcake.jpg",
    "catrose.jpg",
    "loveheart.jpg",
    "purposeemoji.jpg",
    "realheart.jpg",
    "rose.jpg"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


// ========================================
// START PUZZLE
// ========================================

function startPuzzle() {

    puzzle.innerHTML = "";

    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

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
                src="puzzle Imgs/${image}"
                alt="Puzzle image"
            >
        `;

        card.addEventListener("click", () => {
            flipCard(card);
        });

        puzzle.appendChild(card);
    });
}


// ========================================
// FLIP CARD
// ========================================

function flipCard(card) {

    if (lockBoard) return;

    if (card === firstCard) return;

    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {

        firstCard = card;

        return;
    }

    secondCard = card;

    checkMatch();
}


// ========================================
// CHECK MATCH
// ========================================

function checkMatch() {

    const isMatch =
        firstCard.dataset.image === secondCard.dataset.image;


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


// ========================================
// RESET SELECTED CARDS
// ========================================

function resetCards() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


// PUZZLE COMPLETE

function puzzleComplete() {

    const message = document.createElement("div");

    message.classList.add("puzzle-complete");

    message.innerHTML = `
        <h2>Congratulations!</h2>

        <p>You passed the way.</p>

        <div class="game-gift">
            🎁
        </div>

        <p>Something is waiting for you...</p>
    `;

    gameScreen
        .querySelector(".game-content")
        .appendChild(message);
}
   
// no Button
// 'No' button - running loop\
   let noAttempts = 0;  

   const noMessages = [
    "NO 😐",
    "Are you sure? 😑",
    "Really?! 😒",
    "STOP! 😡",
    "JUST CLICK YES! 😤",
    "WHY ARE YOU STILL TRYING?! 😠",
    "NOPE! 😂"
   ];

   noButton.addEventListener("pointerdown", (event) => {
     event.preventDefault();

    noAttempts++;

    //changing text 
    if (noAttempts <= 3) {
        noButton.textContent = noMessages[noAttempts - 1];

    if (noAttempts === 3) {
        noButton.classList.remove("angry");
        void noButton.offsetWidth;
        noButton.classList.add("angry");
    }    
} 
    else {
        const randomMessage =
                noMessages[Math.floor(Math.random() * noMessages.length)];
                noButton.textContent = randomMessage;

                noButton.classList.remove("angry");
                void noButton.offsetWidth;
                noButton.classList.add("angry");
    }

    // Calculate safe screen area 
    const padding = 20;

    const maxX =
          document.documentElement.clientWidth - noButton.offsetWidth - padding;
    const maxY = 
          document.documentElement.clientHeight -noButton.offsetHeight - padding;
    const randomX =
    Math.max(padding, Math.random() * maxX);

    const randomY =
    Math.max(padding, Math.random() * maxY);          


    noButton.style.position = "fixed";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    });

// Brithday surprise //

const surpriseButton = document.getElementById("surprise-button");
const surpriseSection = document.getElementById("surprise");

surpriseButton.addEventListener ("click", () => {
    // Scrool to the surprise section

    surpriseSection.scrollIntoView({
        behavior: "smooth"
    });

    // Start confetti
    createConfetti();
});

// SIMPLE CONFETII

function createConfetti() {
    const symbols = ["🎉", "🎊", "✨", "💗", "🎈"];

    for (let i = 0; i < 35; i++) {
        const confetti = document.createElement("div");
        confetti.textContent =
         symbols[Math.floor(Math.random() * symbols.length)];

        
           confetti.style.position = "fixed";
           confetti.style.left = Math.random() * 100 + "vw";
           confetti.style.top = "-30px";
           confetti.style.fontSize = Math.random() * 15 + 15 + "px";
           confetti.style.zIndex = "9999";
           confetti.style.pointerEvents = "none";

           document.body.appendChild(confetti);

           const duration = Math.random() * 2 + 2;
             confetti.animate(
                [
                    {
                        transform: "translateY(0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform: 
                             `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                             opacity: 0
                    }

                ],
                { 
                    duration: duration * 1000,
                    easing: "ease-out"
                }
             );

             setTimeout(() => {
                confetti.remove();
             }, duration * 1000);
    }
}