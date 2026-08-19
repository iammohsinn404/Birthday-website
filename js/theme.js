// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

const themeKey = "birthday-theme";


// ========================================
// GET SAVED THEME
// ========================================

function getSavedTheme() {

    try {

        return (
            localStorage.getItem(themeKey) ||
            "day"
        );

    } catch (error) {

        return "day";
    }
}


// ========================================
// SAVE THEME
// ========================================

function saveTheme(theme) {

    try {

        localStorage.setItem(
            themeKey,
            theme
        );

    } catch (error) {

        // Theme still works without storage
    }
}


// ========================================
// APPLY THEME
// ========================================

function applyGlobalTheme() {

    const theme =
        getSavedTheme();


    const night =
        theme === "night";


    document.body.classList.toggle(
        "night-mode",
        night
    );


    const themeButton =
        document.getElementById(
            "themeButton"
        );


    if (themeButton) {

        themeButton.textContent =
            night
                ? "☀️ Day Mode"
                : "🌙 Night Mode";
    }
}


// ========================================
// TOGGLE THEME
// ========================================

function toggleGlobalTheme(event) {

    if (event) {

        event.preventDefault();

        event.stopPropagation();
    }


    const currentTheme =
        getSavedTheme();


    const newTheme =
        currentTheme === "night"
            ? "day"
            : "night";


    saveTheme(newTheme);

    applyGlobalTheme();
}


// ========================================
// APPLY SAVED THEME
// ========================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        applyGlobalTheme
    );

} else {

    applyGlobalTheme();
}


// ========================================
// THEME BUTTON
// ========================================
//
// IMPORTANT:
// We use event delegation here.
// This does NOT touch the profile
// button or profile menu.
//

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "#themeButton"
            );


        if (!button) {
            return;
        }


        toggleGlobalTheme(event);

    },
    false
);


// ========================================
// GLOBAL FUNCTION
// ========================================

window.toggleGlobalTheme =
    toggleGlobalTheme;