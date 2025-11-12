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
// ========================================
// PROJECTS LIST & DYNAMIC RENDERING
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  const projects = [
    {
      title: "Smart Stays",
      description: "A hotel booking platform built with React and Node.js.",
      image: "assets/images/smartstays.png",
      github: "https://github.com/SewarAslan/HotelBookingApp-FTS",
      demo: "https://hotel-booking-app-6v310zm7p-sewar-aslans-projects.vercel.app",
      tech: ["React", "TypeScript", "Material-UI", "Node.js"],
    },
    {
      title: "Amana Marketing",
      description:
        "A modern marketing website built with React and Material-UI, featuring responsive design, smooth animations, and a clean user experience. Deployed on Vercel.",
      image: "assets/images/amana-marketing.png",
      github: "https://github.com/SewarAslan/Amana-Marketing",
      demo: "https://amana-marketing-ruddy.vercel.app/",
      tech: ["React", "NextJS", "TypeScript", "Material-UI"],
    },
    {
      title: "Amana Financial",
      description:
        "A financial-services web app (beta) showcasing responsive design, clean UI and real-time data visuals, deployed on Vercel.",
      image: "assets/images/amana-financial.png",
      github: "https://github.com/SewarAslan/amana-financial",
      demo: "https://amana-financial-beta.vercel.app/",
      tech: ["React", "TypeScript", "Responsive UI"],
    },
    {
      title: "Hospital Management System",
      description:
        "A full-stack web application for managing hospital operations — including patient records, appointments, and staff dashboards. Built with React (frontend) and Node.js + Express (backend) with PostgreSQL database. Deployed on Vercel.",
      image: "assets/images/hospital-management.png",
      github: "https://github.com/SewarAslan/hospital-management-system",
      demo: "https://hospital-management-system-silk-six.vercel.app",
      tech: ["React", "tailwindCSS", "Java", "PostgreSQL"],
    },
    {
      title: "Roze'",
      description:
        "A mobile e-commerce app for selling flower bouquets, built with Flutter and Node.js, featuring product browsing, order placement, and inventory management.",
      image: "assets/images/Roze.png",
      github: "https://github.com/SewarAslan/GraduationProject",
      demo: "https://github.com/SewarAslan/GraduationProject",
      tech: ["Flutter", "Node.js", "React", "Python", "MongoDB"],
    },
    {
      title: "The Show",
      description:
        "A desktop app for managing school extracurricular activities, featuring event creation, student tracking, and scheduling. Built with Java for a user-friendly, offline experience.",
      image: "assets/images/theShow.jpg",
      github:
        "https://github.com/farahelhasan/Database-Project-The-Show-Circus-School-Application-",
      demo: "https://github.com/farahelhasan/Database-Project-The-Show-Circus-School-Application-",
      tech: ["Java", "JavaFX", "Oracle DB"],
    },
  ];

  function renderProjects() {
    const container = document.querySelector(".project-grid");
    if (!container) return;

    container.innerHTML = projects
      .map(
        (p) => `
        <div class="project-card">
          <div class="project-image">
            <img src="${p.image}" alt="${p.title}">
            <div class="project-overlay">
              <div class="project-links">
                <a href="${p.demo}" class="project-link" target="_blank">
                  <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${p.github}" class="project-link" target="_blank">
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-description">${p.description}</p>
            <div class="project-tech">
              ${p.tech
                .map((t) => `<span class="tech-tag">${t}</span>`)
                .join("")}
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  renderProjects();
});
