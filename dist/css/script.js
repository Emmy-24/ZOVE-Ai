const hamburgerContainer = document.querySelector(".hamburger__container");
const sidePanel = document.querySelector(".side__panel");
const overlay = document.querySelector(".overlay");

hamburgerContainer.addEventListener("click", function () {
  this.classList.toggle("open");
  if (this.classList.contains("open")) {
    sidePanel.style.transform = "translateX(0)";
    overlay.style.display = "block";
  } else {
    sidePanel.style.transform = "translateX(-100%)";
    overlay.style.display = "none";
  }
});
