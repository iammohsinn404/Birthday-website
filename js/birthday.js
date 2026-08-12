// ========================================
// BIRTHDAY PAGE
// ========================================

const surpriseButton =
    document.getElementById("surprise-button");

const surpriseSection =
    document.getElementById("surprise");

const effects =
    document.getElementById("birthdayEffects");


// ========================================
// FLOATING HEARTS
// ========================================

function createHeart() {

    if (!effects) return;

    const heart =
        document.createElement("span");

    heart.className =
        "floating-heart";

    heart.textContent =
        ["❤️", "💗", "💖", "💕", "✨"][
            Math.floor(Math.random() * 5)
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (14 + Math.random() * 24) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    effects.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}


// Create hearts continuously

setInterval(createHeart, 700);


// ========================================
// FLOATING STARS
// ========================================

function createStars() {

    if (!effects) return;

    for (let i = 0; i < 25; i++) {

        const star =
            document.createElement("span");

        star.className =
            "floating-star";

        star.textContent = "✦";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.fontSize =
            (8 + Math.random() * 15) + "px";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        effects.appendChild(star);
    }
}

createStars();


// ========================================
// SCROLL REVEAL
// ========================================

const sections =
    document.querySelectorAll(
        ".message, .memories, .surprise"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


// ========================================
// CONFETTI
// ========================================

function createConfetti() {

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💗",
        "🎈",
        "⭐",
        "💖"
    ];


    for (let i = 0; i < 60; i++) {

        const confetti =
            document.createElement("div");

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.zIndex =
            "99999";

        confetti.style.pointerEvents =
            "none";


        document.body.appendChild(
            confetti
        );


        const duration =
            2 + Math.random() * 3;


        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 1000}deg)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    duration * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        );


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }
}


// ========================================
// SURPRISE BUTTON
// ========================================

if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        () => {

            createConfetti();


            if (surpriseSection) {

                surpriseSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}