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