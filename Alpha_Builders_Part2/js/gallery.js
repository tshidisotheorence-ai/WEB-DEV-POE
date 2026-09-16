document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-content");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.dataset.tab;

            panels.forEach(function (panel) {
                panel.classList.toggle("active", panel.id === targetId);
            });

            buttons.forEach(function (item) {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-selected", String(active));
            });
        });
    });
});
