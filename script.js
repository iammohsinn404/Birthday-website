// Sounds

const clickSound = new Audio("Sounds/click.mp3");
const successSound = new Audio ("Sounds/sucess.mp3");
const giftSound = new Audio("Sounds/gift.mp3");
const burpSound = new Audio("Sounds/burp.mp3");
const backgroundMusic = new Audio ("Sounds/cute_music.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.4;

const musicButton = document.getElementById("musicButton");
musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicButton.textContent = "Stop Music";
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "Play Music";
    }
    

});

// Intro SCREEN 

const introScreen = document.getElementById("introScreen");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const gameScreen = document.getElementById("gameScreen");
const puzzle = document.getElementById("puzzle");
const cakePage = document.getElementById("cakePage");

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
    "rose.jpg",
    "moon.jpg"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


// ========================================
// START PUZZLE
// ========================================
const skipPuzzleButton = document.getElementById("skipPuzzleButton");

skipPuzzleButton.addEventListener("click", () => {
    puzzleComplete();
});
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
                src="./puzzle Imgs/${image}"
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
    clickSound.currentTime = 0;
    clickSound.play();

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
    
    successSound.currentTime = 0;
    successSound.play();

    const message = document.createElement("div");

    message.classList.add("puzzle-complete");

    message.innerHTML = `
        <h2>Congratulations!</h2>

        <p>You passed the way.</p>

        <div class="game-gift" id="gameGift">
    <img src="Gift Imgs/Gift1.png" alt="Gift">
</div>    

        <p>Something is waiting for you... </p>
    `;

    gameScreen
        .querySelector(".game-content")
        .appendChild(message);

  setTimeout(() => {
    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
  }, 200);     

       
const gameGift = document.getElementById("gameGift");

gameGift.addEventListener("click", openGift);
}
function openGift() {
const gameGift = document.getElementById("gameGift");

if(!gameGift) return;


// prevent cliking agian
gameGift.style.pointerEvents = "none"; 
   



//Gift Sound
giftSound.currentTime = 0;
giftSound.play();

//stage 1 => stage 2
setTimeout(() => {
    gameGift.querySelector("img").src = "Gift Imgs/Gift2.png";
}, 300);
setTimeout(() => {
    gameGift.querySelector("img").src = "Gift Imgs/Gift3.png";
}, 900);
setTimeout(() => {
    gameGift.querySelector("img").src = "Gift Imgs/Gift4.png";
}, 1500);

//show message after animation
setTimeout(() => {

    gameGift.classList.add("revealed");

    gameGift.innerHTML = `
        <div class="gift-reveal">

            <h2>A Memorable Photo Of YOU!</h2>

            <img
                src="Imgs/monkey.jpg"
                alt="Memorable Photo"
            >

           
             <p>MY SPACE MONKEYYY!</p>
             <p>Just Kidding! 😂</p>

        </div>
    `;

    // wait 3s after monkey appeears
    setTimeout(() => {
        const cakeButton =
        document.createElement("button");

        cakeButton.id = "cakeButton";
        cakeButton.className = "cake-button";

        cakeButton.textContent =
        "🍰 One More Surprise";


        gameScreen
            .querySelector(".game-content")
            .appendChild(cakeButton);


        // Scroll to the new button
        setTimeout(() => {

            cakeButton.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }, 3000);

}, 2000);

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

 // Cake Surprise

const cakeClose = document.getElementById("cakeClose");
const cakeArea = document.getElementById("cakeArea");
const cakeMessage = document.getElementById("cakeMessage");
   const moreForwardButton =
    document.getElementById("moreForwardButton");
    // Cake → Prank Page
moreForwardButton.addEventListener("click", () => {

    cakePage.classList.remove("cake-page-open");

    window.location.href = "prank.html";

});

    let eatenPieces = 0;

// open cake pagee

document.addEventListener("click", (event) => {
     if (event.target.closest("#cakeButton")) {

        cakePage.classList.add("cake-page-open");

    }

});
 // close cake page
cakeClose.addEventListener("click", () => {
    cakePage.classList.remove("cake-page-open");
});

// CLICK CAKE


cakeArea.addEventListener("click", (event) => {

    const piece = event.target.closest(".cake-piece");

    if (!piece) return;

    if (piece.classList.contains("eaten")) {
        return;
    }

    // Mark this piece as eaten
    piece.classList.add("eaten");

    eatenPieces++;

    // Burp sound
    burpSound.currentTime = 0;
    burpSound.play();

    // Message
    cakeMessage.textContent =
        "Yummm... another piece disappeared! 😂";

    // Breaking particles
    createCakeParticles(piece);

    // All 6 pieces eaten
    if (eatenPieces === 6) {

        cakeMessage.textContent =
            "You ate them all! 😂🍰";

        setTimeout(() => {

            moreForwardButton.classList.add("show");

            moreForwardButton.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 800);
    }

});

// CAKE PARTICLES

function createCakeParticles() {

    const particles = [
        "🟫",
        "🟫",
        "🟤",
        "✨",
        "💨",
        "🟫",
        "✨",
        "🟤"
    ];

    for (let i = 0; i < 18; i++) {

        const particle = document.createElement("span");

        particle.classList.add("cake-particle");

        particle.textContent =
            particles[Math.floor(Math.random() * particles.length)];

        particle.style.left =
            (45 + Math.random() * 15) + "%";

        particle.style.top =
            (45 + Math.random() * 15) + "%";

        particle.style.setProperty(
            "--x",
            (Math.random() * 220 - 110) + "px"
        );

        particle.style.setProperty(
            "--y",
            (Math.random() * -180 - 30) + "px"
        );

        particle.style.setProperty(
            "--rotate",
            (Math.random() * 720 - 360) + "deg"
        );

        cakePage.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


// Scratchh Cardd
// SCRATCH CARD
// ========================================
const scratchPage = document.getElementById("scratchPage");
const scratchCanvas = document.getElementById("scratchCanvas");
const scratchCard = document.getElementById("scratchCard");

if (scratchCanvas && scratchCard) {

    const ctx = scratchCanvas.getContext("2d");

    function setupScratchCanvas() {

        const rect = scratchCard.getBoundingClientRect();

        const dpr = window.devicePixelRatio || 1;

        scratchCanvas.width = rect.width * dpr;
        scratchCanvas.height = rect.height * dpr;
 

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Scratch cover
        const gradient = ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );

        gradient.addColorStop(0, "#d94f75");
        gradient.addColorStop(0.5, "#ef7895");
        gradient.addColorStop(1, "#d94f75");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Text on scratch surface
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = "bold 22px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "✨ Scratch Me ✨",
            rect.width / 2,
            rect.height / 2
        );
    }

    let scratching = false;

    function scratch(x, y) {

        const rect = scratchCanvas.getBoundingClientRect();

        const canvasX = x - rect.left;
        const canvasY = y - rect.top;

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.arc(
            canvasX,
            canvasY,
            28,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    // Mouse
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

    // Touch
    scratchCanvas.addEventListener(
        "touchstart",
        (event) => {

            scratching = true;

            const touch = event.touches[0];

            scratch(
                touch.clientX,
                touch.clientY
            );
        },
        { passive: false }
    );

    scratchCanvas.addEventListener(
        "touchmove",
        (event) => {

            event.preventDefault();

            if (!scratching) return;

            const touch = event.touches[0];

            scratch(
                touch.clientX,
                touch.clientY
            );
        },
        { passive: false }
    );

    scratchCanvas.addEventListener("touchend", () => {
        scratching = false;
    });

    // Resize
    window.addEventListener("resize", () => {

        if (
            scratchPage &&
            scratchPage.classList.contains("scratch-page-open")
        ) {
            setupScratchCanvas();
        }

    });
}
