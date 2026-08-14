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

            noButton.textContent =
                noMessages[noAttempts - 1];

            if (noAttempts === 3) {

                noButton.classList.remove("angry");

                void noButton.offsetWidth;

                noButton.classList.add("angry");
            }

        } else {

            const randomMessage =
                noMessages[
                    Math.floor(
                        Math.random() * noMessages.length
                    )
                ];

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
            Math.max(
                padding,
                Math.random() * maxX
            );

        const randomY =
            Math.max(
                padding,
                Math.random() * maxY
            );

        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";

    });

}

// ========================================
// BIRTHDAY LINK GENERATOR
// ========================================

const createLinkButton =
    document.getElementById("createLinkButton");

const linkGenerator =
    document.getElementById("linkGenerator");

const generateLinkButton =
    document.getElementById("generateLinkButton");

const copyLinkButton =
    document.getElementById("copyLinkButton");

const generatedLink =
    document.getElementById("generatedLink");


createLinkButton?.addEventListener("click", () => {

    linkGenerator.classList.toggle("show");

});


generateLinkButton?.addEventListener("click", () => {

    const name =
        document.getElementById("personName").value.trim();

    const day =
        document.getElementById("birthDay").value;

    const month =
        document.getElementById("birthMonth").value;

    const year =
        document.getElementById("birthYear").value;

    const relationship =
        document.getElementById("relationship").value.trim();


    if (!name || !day || !month || !year || !relationship) {

        alert("Please fill in everything.");

        return;
    }


    const params = new URLSearchParams({

        name: name,
        day: day,
        month: month,
        year: year,
        relationship: relationship

    });


    const link =
        `${window.location.origin}/?${params.toString()}`;


    generatedLink.value = link;

});


copyLinkButton?.addEventListener("click", async () => {

    if (!generatedLink.value) return;

    await navigator.clipboard.writeText(
        generatedLink.value
    );

    copyLinkButton.textContent = "Copied! ✓";

    setTimeout(() => {

        copyLinkButton.textContent = "Copy Link";

    }, 1500);

});