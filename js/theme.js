// =======================================
//  Global Day / Night Mode
//========================================

const themekey = "birthday-theme";

function applyGlobalTheme() {
    const theme =
      localStorage.getItem(themekey) || "day";

  document.body.classList.toggle(
    "night-mode",
    theme === "night"
  );
  
  const button = 
     document.getElementsBy("themeButton");

     if (button) {
     button.textContext =
      theme === "night"
             ? "☀️ Day Mode"
             : "🌛 Night Mode";
     }
}

function toggleGlobalTheme() {
    const isNight =
      document.body.classList.contains("night-mode");
   const newTheme =
         isNight ? "day" : "night";
    localStorage.setItem(
        themekey,
        newTheme
    );        

    applyGlobalTheme();

}
applyGlobalTheme();

document.addEventListener("click", (event) => {
    const button =
       event.target.closest("#themeButton");
    if (!button) return;
    toggleGlobalTheme();   
})