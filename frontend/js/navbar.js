document.addEventListener("DOMContentLoaded", function () {
    const burgerBtn = document.getElementById("burger-btn");
    const navLinks = document.getElementById("nav-links");
  
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  