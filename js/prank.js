// ================================
// PRANK / POOP PAGE
// ================================

const fartSound =
    new Audio("../Sounds/fart.mp3");

// Change these IDs if your prank.html
// uses different IDs.

const birthdayBtn =
    document.getElementById("birthdayBtn");

// Birthday button
if (birthdayBtn) {

    birthdayBtn.addEventListener("click", () => {

        window.location.href = "birthday.html";

    });
}