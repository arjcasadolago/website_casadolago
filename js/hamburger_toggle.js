document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const curtainMenu = document.getElementById('curtain-menu');

    console.log("Dropdown script loaded");
    hamburger.addEventListener('click', function () {
        console.log("Hamburger clicked!");
        this.classList.toggle('active');
        curtainMenu.classList.toggle('active');
    });
});
