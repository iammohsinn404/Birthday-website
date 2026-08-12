 // ================================
// PRANK / POOP PAGE
// ================================

const page = document.getElementById("prankPage");
const content = document.getElementById("prankContent");

const surpriseBtn =
    document.getElementById("surpriseBtn");

const birthdayBtn =
    document.getElementById("birthdayBtn");


// ========================================
// BACKGROUND PARTICLES
// ========================================

const symbols = [
    "♡",
    "✦",
    "✧",
    "·"
];

if (page) {

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "background-particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.fontSize =
            Math.random() * 15 + 10 + "px";

        particle.style.animationDuration =
            Math.random() * 8 + 8 + "s";

        particle.style.animationDelay =
            Math.random() * -10 + "s";

        page.appendChild(particle);
    }
}


// ========================================
// FART SOUND 💨
// ========================================

function playFart() {

    const fart =
        new Audio("../Sounds/fart.mp3");

    fart.volume = 1;

    fart.currentTime = 0;

    fart.play().catch(error => {
        console.log(
            "Fart sound could not play:",
            error
        );
    });
}


// ========================================
// SCREEN SHAKE
// ========================================

function shakeScreen() {

    if (!page) return;

    page.classList.remove("shake");

    void page.offsetWidth;

    page.classList.add("shake");
}


// ========================================
// GREEN PARTICLE EXPLOSION
// ========================================

function createGreenExplosion() {

    const particles = [
        "●",
        "•",
        "✦",
        "✧",
        "✨"
    ];

    for (let i = 0; i < 80; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "green-explosion";

        particle.textContent =
            particles[
                Math.floor(
                    Math.random() *
                    particles.length
                )
            ];

        particle.style.setProperty(
            "--x",
            (Math.random() * 900 - 450) + "px"
        );

        particle.style.setProperty(
            "--y",
            (Math.random() * 650 - 325) + "px"
        );

        particle.style.setProperty(
            "--rotation",
            (Math.random() * 720 - 360) + "deg"
        );

        particle.style.setProperty(
            "--size",
            (Math.random() * 12 + 5) + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1600);
    }
}


// ========================================
// POOP IMAGE 💩
// ========================================

function showPoop() {

    const poop =
        document.createElement("img");

    poop.src =
        "../Imgs/poop.png";

    poop.alt =
        "Surprise";

    poop.className =
        "poop-surprise";

    document.body.appendChild(poop);


    // Fade out

    setTimeout(() => {

        poop.classList.add(
            "poop-fade"
        );

    }, 2200);


    // Remove

    setTimeout(() => {

        poop.remove();

    }, 2800);
}


// ========================================
// CONFETTI 🎉
// ========================================

function createConfetti() {

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💗",
        "⭐",
        "🎈"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("span");

        confetti.className =
            "confetti-piece";

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.setProperty(
            "--x",
            (Math.random() * 300 - 150) + "px"
        );

        confetti.style.setProperty(
            "--rotation",
            (Math.random() * 900 - 450) + "deg"
        );

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2500);
    }
}


// ========================================
// FINAL MESSAGE
// ========================================

function showFinalMessage() {

    if (!content) return;

    content.classList.add("revealed");
}


// ========================================
// MAIN BUTTON
// ========================================

const surpriseBtn = document.getElementById("surpriseBtn");

if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {

        console.log("OKAY BUTTON WORKING!");

        // Hide the button
        surpriseBtn.style.display = "none";

        // Your poop effects
        createGreenExplosion();
        shakeScreen();
        playFart();

        setTimeout(() => {
            showPoop();
        }, 250);

        setTimeout(() => {
            createConfetti();
        }, 700);

        setTimeout(() => {
            showFinalMessage();
        }, 2800);

    });
}


const birthdayBtn = document.getElementById("birthdayBtn");

if (birthdayBtn) {
    birthdayBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "birthday.html";
    });
}