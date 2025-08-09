document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const mainContent = document.querySelector(".main-content");

  function openMobileMenu() {
    sidebar.classList.add("active");
    mobileMenuToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    sidebar.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileMenuToggle.addEventListener("click", function (e) {
    e.preventDefault();

    if (sidebar.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  sidebarClose.addEventListener("click", function (e) {
    e.preventDefault();
    closeMobileMenu();
  });

  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // ========================================
  //  DARK MODE TOGGLE
  // ========================================

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const themeText = themeToggle.querySelector("span");

  const savedTheme = localStorage.getItem("portfolio-theme") || "light";

  // on page load
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    themeText.textContent = "Light Mode";
  }

  themeToggle.addEventListener("click", function (e) {
    e.preventDefault();

    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.classList.replace("fa-sun", "fa-moon");
      themeText.textContent = "Dark Mode";
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
      themeText.textContent = "Light Mode";
      localStorage.setItem("portfolio-theme", "dark");
    }
  });

  // ========================================
  // SMOOTH NAVIGATION & ACTIVE LINKS
  // ========================================

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        if (window.innerWidth <= 768) {
          closeMobileMenu();
        }

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        updateActiveNavLink(this);
      }
    });
  });

  function updateActiveNavLink(activeLink) {
    navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  //based on scroll position
  function updateActiveNavOnScroll() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // for performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 10);
  });
});
