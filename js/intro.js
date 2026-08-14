// ================================
// INTRO PAGE
// ================================

const musicButton = document.getElementById("musicButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");


// ========================================
// MUSIC
// ========================================

const backgroundMusic =
    new Audio("../Sounds/cute_music.mp3");

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


// ========================================
// YES → PUZZLE
// ========================================

if (yesButton) {

    yesButton.addEventListener("click", () => {

        window.location.href = "puzzle.html";

    });

}


// ========================================
// NO BUTTON
// ========================================

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

        noButton.style.left =
            randomX + "px";

        noButton.style.top =
            randomY + "px";

    });

}


// ========================================
// INTRO PROFILE MENU
// ========================================

const profileBtn =
    document.getElementById("profileBtn");

const profileMenu =
    document.getElementById("profileMenu");

const createLinkButton =
    document.getElementById("createLinkButton");


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


// ========================================
// LINK GENERATOR
// ========================================

const linkGenerator =
    document.getElementById("linkGenerator");

const generateLinkButton =
    document.getElementById("generateLinkButton");

const generatedLink =
    document.getElementById("generatedLink");

const copyLinkButton =
    document.getElementById("copyLinkButton");


// Open link generator from Profile menu

if (createLinkButton && linkGenerator) {

    createLinkButton.addEventListener("click", (event) => {

        event.stopPropagation();

        linkGenerator.classList.toggle("show");

        profileMenu?.classList.remove("show");

    });

}


// Generate personalized link

if (generateLinkButton) {

    generateLinkButton.addEventListener("click", () => {

        const name =
            document.getElementById("personName")
                ?.value.trim();

        const day =
            document.getElementById("birthDay")
                ?.value;

        const month =
            document.getElementById("birthMonth")
                ?.value;

        const year =
            document.getElementById("birthYear")
                ?.value;

        const relationship =
            document.getElementById("relationship")
                ?.value.trim();


        if (
            !name ||
            !day ||
            !month ||
            !year ||
            !relationship
        ) {

            alert("Please fill in everything.");

            return;

        }


        const params =
            new URLSearchParams({

                name,
                day,
                month,
                year,
                relationship

            });


        const link =
            `${window.location.origin}/?${params.toString()}`;


        if (generatedLink) {

            generatedLink.value = link;

        }

    });

}
// ========================================
// LEVELS MENU
// ========================================

const levelsButton =
    document.getElementById("levelsButton");

const levelsMenu =
    document.getElementById("levelsMenu");

const levelButtons =
    document.querySelectorAll("[data-level]");


// Open / close levels

if (levelsButton && levelsMenu) {

    levelsButton.addEventListener("click", (event) => {

        event.stopPropagation();

        levelsMenu.classList.toggle("show");

    });

}


// Jump to selected level

levelButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const page =
            button.dataset.level;

        if (page) {

            window.location.href = page;

        }

    });

});

// ========================================
// COPY GENERATED LINK
// ========================================

if (copyLinkButton) {

    copyLinkButton.addEventListener("click", async () => {

        if (!generatedLink?.value) return;


        try {

            await navigator.clipboard.writeText(
                generatedLink.value
            );

            copyLinkButton.textContent =
                "Copied! ✓";


            setTimeout(() => {

                copyLinkButton.textContent =
                    "Copy Link";

            }, 1500);


        } catch {

            generatedLink.select();

            document.execCommand("copy");

            copyLinkButton.textContent =
                "Copied! ✓";

        }

    });

}