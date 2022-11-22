
window.addEventListener('scroll', checkHeaderPosition);

function checkHeaderPosition() {
    const header = document.getElementById('navHeader');
    if (window.scrollY > 0) {
        if (!header.className.includes('header-minimizer')) {header.classList.add('header-minimizer'); }
    } else { header.classList.remove('header-minimizer'); }
}

function themeToggle(){
    
}