document.addEventListener("DOMContentLoaded", function () {
    const getStartedBtn = document.getElementById("getStartedBtn");
    const openQuizBtn = document.getElementById("openQuizBtn");
    const zoveSection = document.querySelector(".zove");
    const navbar = document.querySelector(".navbar");
    const mainSection = document.querySelector(".main-section");
  
    function showZoveSection() {
      zoveSection.style.display = "block";
      navbar.style.display = "none";
      mainSection.style.display = "none";
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
  });
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
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
// Toggle Navbar
function toggleNavbar() {
    const navbar = document.querySelector(".side-navbar");
    navbar.classList.toggle("expanded");
  }