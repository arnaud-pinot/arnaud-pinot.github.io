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

  // 2. Gestion de la navigation
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Ignorer les ancres locales, liens externes ou le bouton accordéon
      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http") || link.classList.contains("submenu-toggle")) return;

      const cleanUrl = targetUrl.replace(window.location.origin, "").replace(/\/$/, "");
      const isGoingHome = cleanUrl === "" || cleanUrl === "/index.html" || targetUrl === "/";

      e.preventDefault(); // Empêche la redirection immédiate

      if (isGoingHome) {
        // --- SCÉNARIO RETOUR ACCUEIL ---
        let delayBeforeSlide = 0;

        // ÉTAPE 1 : Si le menu Portfolio est ouvert, on le ferme d'abord
        if (hasSubmenu && hasSubmenu.classList.contains("open")) {
          hasSubmenu.classList.remove("open");
          delayBeforeSlide = 300; // Temps de fermeture de l'accordéon en CSS
        }

        // ÉTAPE 2 : Une fois l'accordéon fermé, on agrandit le panneau bleu en plein écran
        setTimeout(() => {
          if (brandPanel) {
            brandPanel.classList.remove("side");
            brandPanel.classList.add("full");
          }
          if (mainContent) {
            mainContent.classList.add("fade-out");
          }
        }, delayBeforeSlide);

        // ÉTAPE 3 : On charge la page d'accueil une fois toutes les animations terminées
        setTimeout(() => {
          window.location.href = targetUrl;
        }, delayBeforeSlide + 600);

      } else {
        // --- SCÉNARIO ALLER VERS SOUS-PAGE ---
        if (brandPanel) {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
        if (mainContent) {
          mainContent.classList.add("fade-out");
        }

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 600);
      }
    });
  });

  // 3. Menu Mobile
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});