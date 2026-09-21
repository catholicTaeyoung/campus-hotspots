const panels = document.querySelectorAll(".place-panel");
const buttons = document.querySelectorAll("[data-place]");

function showPlace(id) {
    for (const panel of panels) {
        if (panel.id === id) {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    }
}

for (const button of buttons) {
    button.addEventListener("click", function () {
        showPlace(button.dataset.place);
    });
}