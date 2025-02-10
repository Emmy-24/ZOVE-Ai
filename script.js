const faq = document.querySelector("#faq_section");
const faqbutton = document.querySelectorAll(".faq-btn");
const faqNav = document.querySelector(".faq_section");
const faqSection = document.querySelector("#faq_section");

faq.addEventListener("click", function (e) {
  const clicked = e.target.closest(".faq-btn");

  if (!clicked) return;

  faqbutton.forEach((btn) => {
    if (btn !== clicked) {
      btn.nextElementSibling.classList.remove("open");
      btn.querySelector(".icon").textContent = "+";
    }
  });

  const detail = clicked.nextElementSibling;
  const icon = clicked.querySelector(".icon");

  detail.classList.toggle("open");
  icon.textContent = detail.classList.contains("open") ? "-" : "+";
});

faqNav.addEventListener("click", function (e) {
  e.preventDefault();
  faqSection.scrollIntoView({ behavior: "smooth" });
});
