// Intro SCREEN 

const introScreen = document.getElementById("introScreen");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
    document.body.classList.add("intro-active");

// yes Button
yesButton.addEventListener("click", () => {
    introScreen.classList.add("intro-hidden");
    document.body.classList.remove("intro-active");
});

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

   noButton.addEventListener("pointerenter", () => {
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