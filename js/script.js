
// Burger
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });



// Skrol
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});


// Scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// Menu
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  // Open/close on click
  toggleButton.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileNav.classList.toggle('active');
  });

  

  // Close when clicked outside the menu
  document.addEventListener('click', function (e) {
    const isClickInside = mobileNav.contains(e.target) || toggleButton.contains(e.target);
    if (!isClickInside) {
      mobileNav.classList.remove('active');
    }
  });

  // Closing when resizing a window
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      mobileNav.classList.remove('active');
    }
  });


// --------------

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
