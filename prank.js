const page = document.getElementById("prankPage");
const content = document.getElementById("prankContent");
const surpriseBtn = document.getElementById("surpriseBtn");
const birthdayBtn = document.getElementById("birthdayBtn");

/* Background Paticles */

const symbols = [
    "♡",
    "✦",
    "✧",
    "·"
];
for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");

    particle.className = 
     "background-particle";

     particle.textContent =
      symbols[
         Math.floor(
             Math.floor(
                Math.random() *
                symbols.length
             )
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

    /* funny Sound */

    function playFunnySound () {
        const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

        if (!AudioContext) return;

        const audio =
        new AudioContext();

        const oscillator = 
        audio.createGain();

        const gain = audio.createGain();
        

        oscillator.type = "sawtooth";

       oscillator.frequency.setValueAtTime(
        120,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        45,
        audio.currentTime + 0.7
    );

    gain.gain.setValueAtTime(
        0.001,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.2,
        audio.currentTime + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.75
    );

    oscillator.connect(gain);

    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.8
    );

}
/* ========================================
   EXPLOSION PARTICLES
======================================== */

function createExplosion() {

    const explosionSymbols = [
        "✨",
        "🎉",
        "🎊",
        "💗",
        "💕",
        "⭐",
        "🎈",
        "💖"
    ];

    for (let i = 0; i < 70; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "explosion";

        particle.textContent =
            explosionSymbols[
                Math.floor(
                    Math.random() *
                    explosionSymbols.length
                )
            ];

        particle.style.setProperty(
            "--x",
            (Math.random() * 900 - 450) + "px"
        );

        particle.style.setProperty(
            "--y",
            (Math.random() * 700 - 350) + "px"
        );

        particle.style.setProperty(
            "--rotation",
            (Math.random() * 720 - 360) + "deg"
        );

        particle.style.fontSize =
            Math.random() * 22 + 14 + "px";

        document.body.appendChild(
            particle
        );

        setTimeout(() => {
            particle.remove();
        }, 1600);
    }
}


/* ========================================
   CONFETTI
======================================== */

function createConfetti() {

    const confettiSymbols = [
        "🎉",
        "🎊",
        "✨",
        "💗",
        "🎈"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("span");

        confetti.className =
            "explosion";

        confetti.textContent =
            confettiSymbols[
                Math.floor(
                    Math.random() *
                    confettiSymbols.length
                )
            ];

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.top =
            Math.random() * 20 + "%";

        confetti.style.setProperty(
            "--x",
            (Math.random() * 500 - 250) + "px"
        );

        confetti.style.setProperty(
            "--y",
            (Math.random() * 800 + 300) + "px"
        );

        confetti.style.setProperty(
            "--rotation",
            (Math.random() * 900 - 450) + "deg"
        );

        document.body.appendChild(
            confetti
        );

        setTimeout(() => {
            confetti.remove();
        }, 1800);
    }
}


/* ========================================
   MAIN SURPRISE
======================================== */

surpriseBtn.addEventListener(
    "click",
    () => {

        surpriseBtn.style.pointerEvents =
            "none";

        surpriseBtn.style.transition =
            "all .35s ease";

        surpriseBtn.style.opacity =
            "0";

        surpriseBtn.style.transform =
            "scale(.6)";


        // Funny sound
        playFunnySound();


        // Screen shake
        page.classList.remove("shake");

        void page.offsetWidth;

        page.classList.add("shake");


        // Explosion
        createExplosion();


        // Presents
        setTimeout(() => {

            content.classList.add(
                "revealed"
            );

        }, 250);


        // More confetti
        setTimeout(() => {

            createConfetti();

        }, 850);

    }
);


/* ========================================
   GO TO MAIN BIRTHDAY PAGE
======================================== */

birthdayBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "index.html";

    }
);