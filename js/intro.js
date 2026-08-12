// ================================
// INTRO PAGE
// ================================

const musicButton = document.getElementById("musicButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

// Music
const backgroundMusic = new Audio("../Sounds/cute_music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4;

if (musicButton) {
    musicButton.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.textContent = "Stop Music";
        } else {
            backgroundMusic.pause();
            musicButton.textContent = "Play Music";
        }
    });
}

// YES → Puzzle
if (yesButton) {
    yesButton.addEventListener("click", () => {
        window.location.href = "puzzle.html";
    });
}

// NO button
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

if (noButton) {
    noButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();

        noAttempts++;

        if (noAttempts <= 3) {
            noButton.textContent = noMessages[noAttempts - 1];

            if (noAttempts === 3) {
                noButton.classList.remove("angry");
                void noButton.offsetWidth;
                noButton.classList.add("angry");
            }
        } else {
            const randomMessage =
                noMessages[Math.floor(Math.random() * noMessages.length)];

            noButton.textContent = randomMessage;

            noButton.classList.remove("angry");
            void noButton.offsetWidth;
            noButton.classList.add("angry");
        }

        const padding = 20;

        const maxX =
            document.documentElement.clientWidth -
            noButton.offsetWidth -
            padding;

        const maxY =
            document.documentElement.clientHeight -
            noButton.offsetHeight -
            padding;

        const randomX =
            Math.max(padding, Math.random() * maxX);

        const randomY =
            Math.max(padding, Math.random() * maxY);

        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
    });
}