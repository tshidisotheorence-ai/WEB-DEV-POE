document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("navMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
});
