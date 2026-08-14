// ========================================
// PROFILE MENU
// ========================================

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const restartButton = document.getElementById("restartButton");
const refreshButton = document.getElementById("refreshButton");

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

if (restartButton) {
    restartButton.addEventListener("click", () => {
        window.location.href = "intro.html";
    });
}

if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        window.location.reload();
    });
}
// ================================
// MONKEY PAGE
// ================================

const giftSound = new Audio("../Sounds/gift.mp3");

const gameGift = document.getElementById("gameGift");

if (gameGift) {

    gameGift.addEventListener("click", () => {

        // Prevent clicking again
        gameGift.style.pointerEvents = "none";

        giftSound.currentTime = 0;
        giftSound.play().catch(() => {});

        // Gift animation
        setTimeout(() => {
            gameGift.innerHTML = `
                <img
                    src="../Gift Imgs/Gift2.png"
                    alt="Gift"
                >
            `;
        }, 300);

        setTimeout(() => {
            gameGift.innerHTML = `
                <img
                    src="../Gift Imgs/Gift3.png"
                    alt="Gift"
                >
            `;
        }, 900);

        setTimeout(() => {
            gameGift.innerHTML = `
                <img
                    src="../Gift Imgs/Gift4.png"
                    alt="Gift"
                >
            `;
        }, 1500);

        // Monkey reveal
        setTimeout(() => {

            gameGift.classList.add("revealed");

            gameGift.innerHTML = `
                <div class="gift-reveal">

                    <h2>A Memorable Photo Of YOU!</h2>

                    <img
                        src="../Imgs/monkey.jpg"
                        alt="Memorable Photo"
                    >

                    <p>MY SPACE MONKEYYY!</p>
                    <p>Just Kidding! 😂</p>

                </div>
            `;

        }, 2000);

        // Cake button
        setTimeout(() => {

            const cakeButton =
                document.createElement("button");

            cakeButton.className = "cake-button";
            cakeButton.textContent =
                "🍰 One More Surprise";

            document
                .querySelector(".game-content")
                .appendChild(cakeButton);

            cakeButton.addEventListener("click", () => {
                window.location.href = "cake.html";
            });

        }, 5000);
    });
}