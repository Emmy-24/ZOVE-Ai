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