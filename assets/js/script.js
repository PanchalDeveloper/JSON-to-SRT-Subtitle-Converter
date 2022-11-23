let Subtitles = new Array;

// Run the 'initializer()' function when page loads

window.onload = initializer;

// Manually Check & Set Color-Schemes 
const themeTogglerBtn = document.getElementById('themeTogglerBtn');
themeTogglerBtn.addEventListener('change', changeThemeMode);

themeTogglerBtn.checked = checkDarkMode();
