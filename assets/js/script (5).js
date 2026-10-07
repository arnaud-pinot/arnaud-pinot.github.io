document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");
  const mainContent = document.querySelector(".main-content");
  const submenuToggle = document.querySelector(".submenu-toggle");
  const hasSubmenu = document.querySelector(".has-submenu");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  // 1. Accordéon Portfolio
  if (submenuToggle && hasSubmenu) {
    submenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hasSubmenu.classList.toggle("open");
    });
  }

  // 2. Transition animée aller / retour
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Si c'est un lien externe ou un ancrage, on laisse le comportement par défaut
      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http")) return;

      // Nettoyage de l'URL pour vérifier si la destination est l'accueil
      const cleanUrl = targetUrl.replace(window.location.origin, "").replace(/\/$/, "");
      const isGoingHome = cleanUrl === "" || cleanUrl === "/index.html" || targetUrl === "/";

      e.preventDefault(); // Empêche le saut de page instantané

      if (brandPanel) {
        if (isGoingHome) {
          // RETOUR VERS ACCUEIL : Le panneau s'agrandit en plein écran
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          // DÉPART VERS SOUS-PAGE : Le panneau se réduit en barre latérale
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      // Disparition progressive du contenu
      if (mainContent) {
        mainContent.classList.add("fade-out");
      }

      // Attente de la fin de l'animation CSS (600ms) avant de charger la nouvelle page
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    });
  });

  // 3. Menu Hamburger Mobile
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});