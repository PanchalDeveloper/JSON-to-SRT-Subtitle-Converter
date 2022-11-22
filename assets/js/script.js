let Subtitles = new Array;

// Run the 'initializer()' function when page loads

window.onload = initializer;

// Automatically/Manually Check & Set Theme 

let darkModeState = false;

const themeToggleBtn = document.getElementById('darkModeBtn'),
useDark = window.matchMedia('(prefers-color-scheme: dark)');
console.log(useDark);
function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
    darkModeState = state;
}

function setDarkModeLocalStorage(state) {
    localStorage.setItem("dark-mode", state);
}

function changeThemeMode(){
    darkModeState = !darkModeState;
    toggleDarkMode(darkModeState);
    setDarkModeLocalStorage(darkModeState);
}

(localStorage.getItem("dark-mode"))?(toggleDarkMode(localStorage.getItem("dark-mode") == "true")):(toggleDarkMode(useDark.matches));

useDark.addListener((event)=>{toggleDarkMode(event.matches)});
themeToggleBtn.addEventListener('click', changeThemeMode);
