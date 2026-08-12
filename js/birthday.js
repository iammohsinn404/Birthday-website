// ================================
// BIRTHDAY PAGE
// ================================

const surpriseButton =
    document.getElementById("surprise-button");

const surpriseSection =
    document.getElementById("surprise");

const scratchButton =
    document.getElementById("scratchButton");

// Surprise button
if (surpriseButton && surpriseSection) {

    surpriseButton.addEventListener("click", () => {

        surpriseSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        createConfetti();
    });
}

// Final Scratch button
if (scratchButton) {

    scratchButton.addEventListener("click", () => {

        window.location.href = "scratch.html";

    });
}

// Confetti
function createConfetti() {

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💗",
        "🎈"
    ];

    for (let i = 0; i < 35; i++) {

        const confetti =
            document.createElement("div");

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.position = "fixed";
        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-30px";

        confetti.style.fontSize =
            Math.random() * 15 + 15 + "px";

        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration =
            Math.random() * 2 + 2;

        confetti.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
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