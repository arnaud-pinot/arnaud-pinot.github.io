document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");
  const mainContent = document.querySelector(".main-content");
  const hasSubmenu = document.querySelector(".has-submenu");
  const submenuToggle = document.querySelector(".submenu-toggle");

  const pathname = window.location.pathname;
  const cleanPath = pathname.replace(/\/$/, ""); 
  const isHomePage = cleanPath === "" || cleanPath.endsWith("/index.html") || cleanPath === "/index.html";

  // 1. DÉTERMINER ET APPLIQUER L'ÉTAT DU SOUS-MENU (Sans animation au démarrage)
  if (hasSubmenu) {
    // Désactiver temporairement les transitions CSS pour éviter l'effet "ferme/ouvre"
    hasSubmenu.classList.add("no-transition");

    const savedState = sessionStorage.getItem("submenu_open");

    if (savedState === "true" || (!isHomePage && savedState === null)) {
      hasSubmenu.classList.add("open");
    } else if (savedState === "false") {
      hasSubmenu.classList.remove("open");
    }

    // Réactiver les transitions après le rendu
    requestAnimationFrame(() => {
      setTimeout(() => {
        hasSubmenu.classList.remove("no-transition");
      }, 50);
    });
  }

  // 2. POSITION DE LA SIDEBAR
  if (brandPanel) {
    if (isHomePage) {
      brandPanel.classList.remove("side");
      brandPanel.classList.add("full");
    } else {
      brandPanel.classList.remove("full");
      brandPanel.classList.add("side");
    }
  }

  // 3. CLIC SUR LE ACCORDÉON (Conserve la décision dans sessionStorage)
  if (submenuToggle && hasSubmenu) {
    submenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = hasSubmenu.classList.toggle("open");
      sessionStorage.setItem("submenu_open", isOpen ? "true" : "false");
    });
  }

  // 4. NAVIGATION INTERNE
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http")) return;

      e.preventDefault();

      const cleanTarget = targetUrl.replace(/\/$/, "");
      const isTargetHome = cleanTarget === "" || cleanTarget === "." || cleanTarget.endsWith("index.html");

      // Si on retourne à l'accueil, on peut réinitialiser l'état du sous-menu si souhaité
      if (isTargetHome) {
        sessionStorage.setItem("submenu_open", "false");
      } else {
        sessionStorage.setItem("submenu_open", "true");
      }

      if (brandPanel) {
        if (isTargetHome) {
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      if (mainContent) {
        mainContent.classList.add("fade-out");
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });

  // 5. MOBILE HAMBURGER
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});