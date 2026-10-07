document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");
  const mainContent = document.querySelector(".main-content");
  
  // Extraire le chemin exact
  const pathname = window.location.pathname;

  // 1. DÉTECTION RIGOUREUSE DE LA PAGE D'ACCUEIL
  // Vrai UNIQUEMENT si on est sur la racine "/" ou "/index.html" (pas dans un sous-dossier)
  const isHomePage = pathname === "/" || 
                     pathname.endsWith("/index.html") && !pathname.includes("/portfolio/");

  if (brandPanel) {
    if (isHomePage) {
      brandPanel.classList.remove("side");
      brandPanel.classList.add("full");
    } else {
      brandPanel.classList.remove("full");
      brandPanel.classList.add("side");
    }
  }

  // 2. SOUS-MENU ACCORDÉON
  const submenuToggle = document.querySelector(".submenu-toggle");
  const hasSubmenu = document.querySelector(".has-submenu");

  if (submenuToggle && hasSubmenu) {
    submenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hasSubmenu.classList.toggle("open");
    });
  }

  // 3. NAVIGATION ANIMÉE SANS ALLER-RETOUR
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Ignorer les ancres internes (#) et liens externes
      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http")) return;

      e.preventDefault();

      // Vérifier si la cible est l'accueil racine
      const isTargetHome = targetUrl === "/" || targetUrl === "index.html" || targetUrl === "./";

      // Animation du panneau bleu
      if (brandPanel) {
        if (isTargetHome) {
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      // Fondu du contenu principal
      if (mainContent) {
        mainContent.classList.add("fade-out");
      }

      // Redirection après la transition (450ms)
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 450);
    });
  });

  // 4. MENU MOBILE HAMBURGER
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});