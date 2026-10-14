document.querySelectorAll(".report-trigger").forEach(function (button) {
  button.addEventListener("click", function () {
    const form = document.getElementById(button.dataset.reportTarget);
    const opening = form.hidden;
    form.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
  });
});
