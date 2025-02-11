const hamburgerContainer = document.querySelector(".hamburger__container");
const sidePanel = document.querySelector(".side__panel");
const overlay = document.querySelector(".overlay");

// document.addEventListener("DOMContentLoaded", function () {
const getStartedBtn = document.getElementById("getStartedBtn");
const openQuizBtn = document.getElementById("openQuizBtn");
const zoveSection = document.querySelector(".zove");
const navbar = document.querySelector(".navbar");
const mainSection = document.querySelector(".main-section");

function showZoveSection() {
  zoveSection.style.display = "block";
  navbar.style.display = "none";
  mainSection.style.display = "none";

  if (window.innerWidth >= 1366) {
    hamburgerContainer.style.display = "none";
    sidePanel.style.display = "block";
    sidePanel.style.transform = "translateX(0)";
    overlay.style.display = "none";
  } else {
    hamburgerContainer.style.display = "block";
    hamburgerContainer.classList.remove("open");
    sidePanel.style.display = "none";
    sidePanel.style.transform = "translateX(-100%)";
    overlay.style.display = "none";
  }
}

if (getStartedBtn) {
  getStartedBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showZoveSection();
  });
}

if (openQuizBtn) {
  openQuizBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showZoveSection();
  });
}
// });

// handle hamburger click on toggle
hamburgerContainer.addEventListener("click", function () {
  this.classList.toggle("open");
  if (this.classList.contains("open")) {
    sidePanel.style.transform = "translateX(0)";
    sidePanel.style.display = "block";
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
    sidePanel.style.transform = "translateX(-100%)";
  }
});

//handle overlay click
overlay.addEventListener("click", function () {
  hamburgerContainer.classList.remove("open");
  sidePanel.style.transform = "translate(-100%)";
  overlay.style.display = "none";
});

//handle window resize
window.addEventListener("resize", showZoveSection);

const text = "Hello, World!";
let index = 0;
const container = document.getElementById("container-animate");

function typeEffect() {
  if (index < text.length) {
    const span = document.createElement("span");
    span.textContent = text[index];
    span.classList.add("text");
    container.appendChild(span);
    index++;
    setTimeout(typeEffect, 200);
  } else {
    setTimeout(() => {
      container.innerHTML = "";
      index = 0;
      typeEffect();
    }, 1000);
  }
}

typeEffect();
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
// Toggle Navbar
function toggleNavbar() {
  const navbar = document.querySelector(".side-navbar");
  navbar.classList.toggle("expanded");
}
