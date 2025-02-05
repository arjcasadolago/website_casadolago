document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const curtainMenu = document.getElementById('curtain-menu');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        curtainMenu.classList.toggle('active');
    });
});
