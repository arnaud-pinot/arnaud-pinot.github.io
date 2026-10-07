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

  // 2. Transition animée au clic sur les liens
  const links = document.querySelectorAll(".nav-menu a, .submenu a, .logo");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Si c'est un anchor local ou un lien externe, on ne fait rien de spécial
      if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("http")) return;

      // On empêche le changement de page immédiat
      e.preventDefault();

      // Si on quitte l'accueil pour une sous-page
      if (brandPanel && brandPanel.classList.contains("full")) {
        brandPanel.classList.remove("full");
        brandPanel.classList.add("side");
      }

      // Anime le contenu sortant (s'il existe)
      if (mainContent) {
        mainContent.classList.add("fade-out");
      }

      // Attend la fin de l'animation CSS (600ms) avant de charger la nouvelle page
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