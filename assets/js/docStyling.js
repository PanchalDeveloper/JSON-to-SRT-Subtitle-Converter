window.addEventListener('scroll', checkHeaderPosition);

function checkHeaderPosition() {
    const header = document.getElementById('navHeader');
    if (window.scrollY > 0) {
        if (!header.className.includes('header-minimizer')) { header.classList.add('header-minimizer'); }
    } else { header.classList.remove('header-minimizer'); }
}

// Automatically Check & Set Color-Schemes 

const checkDarkMode = () => { return (localStorage.getItem("dark-mode") || sessionStorage.getItem("os-has-dark-mode") || 'false') == 'true'; }

let darkModeState = checkDarkMode();
const useDark = window.matchMedia('(prefers-color-scheme: dark)');
setDarkModeSessionStorage(useDark.matches);

function toggleDarkMode(state) {
    try {
        themeTogglerBtn.checked = state;
        changeTogglerIcon(themeTogglerBtn);
    } catch {
        // console.log('Page is loading currently');
    }
    finally {
        document.documentElement.classList.toggle("dark-mode", state);
        darkModeState = state;
    }
}

function setDarkModeLocalStorage(state) {
    localStorage.setItem("dark-mode", state);
}
function setDarkModeSessionStorage(state) {
    sessionStorage.setItem("os-has-dark-mode", state);
}

function changeThemeMode() {
    darkModeState = !darkModeState;
    toggleDarkMode(darkModeState);
    setDarkModeLocalStorage(darkModeState);
}

(localStorage.getItem("dark-mode")) ? (toggleDarkMode(localStorage.getItem("dark-mode") == "true")) : (toggleDarkMode(useDark.matches));

useDark.addListener((event) => { setDarkModeSessionStorage(event.matches); if(localStorage.getItem("dark-mode") != 'false'){toggleDarkMode(checkDarkMode())}; });