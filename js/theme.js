// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

const themeKey = "birthday-theme";

function applyGlobalTheme() {

    const theme =
        localStorage.getItem(themeKey) || "day";

    document.body.classList.toggle(
        "night-mode",
        theme === "night"
    );

    const themeButton =
        document.getElementById("themeButton");

    if (themeButton) {

        themeButton.textContent =
            theme === "night"
                ? "☀️ Day Mode"
                : "🌙 Night Mode";

    }
}


function toggleGlobalTheme() {

    const isNight =
        document.body.classList.contains("night-mode");

    const newTheme =
        isNight ? "day" : "night";

    localStorage.setItem(
        themeKey,
        newTheme
    );

    applyGlobalTheme();
}


/* Apply saved theme immediately */
applyGlobalTheme();


/* Theme button */
document.addEventListener("click", (event) => {

    const button =
        event.target.closest("#themeButton");

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    toggleGlobalTheme();

});