document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");
  const mainContent = document.querySelector(".main-content");

  // 1. DÉTECTION RIGOUREUSE DE L'ACCUEIL (compatible Jekyll)
  // On nettoie les slashes de fin
  const cleanPath = window.location.pathname.replace(/\/$/, ""); 
  
  // L'accueil est VRAI uniquement si le chemin est vide, "/", ou se termine par /index.html
  const isHomePage = cleanPath === "" || cleanPath.endsWith("/index.html") || cleanPath === "/index.html";

  if (brandPanel) {
    if (isHomePage) {
      brandPanel.classList.remove("side");
      brandPanel.classList.add("full");
    } else {
      brandPanel.classList.remove("full");
      brandPanel.classList.add("side");
    }
  }

  // 2. SOUS-MENU ACCORDÉON (Portfolio)
  const submenuToggle = document.querySelector(".submenu-toggle");
  const hasSubmenu = document.querySelector(".has-submenu");

  if (submenuToggle && hasSubmenu) {
    submenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hasSubmenu.classList.toggle("open");
    });
  }

  // 3. NAVIGATION ANIMÉE
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Ignorer les ancres et liens externes
      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http")) return;

      e.preventDefault();

      // Nettoyage de l'URL cible pour la comparaison
      const cleanTarget = targetUrl.replace(/\/$/, "");
      const isTargetHome = cleanTarget === "" || cleanTarget === "." || cleanTarget.endsWith("index.html");

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

      // Fondu du contenu
      if (mainContent) {
        mainContent.classList.add("fade-out");
      }

      // Redirection
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });

  // 4. MENU HAMBURGER MOBILE
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});