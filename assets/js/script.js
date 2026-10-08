document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");

  // Intercepter les clics sur tous les liens internes du menu et du logo
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const targetUrl = link.getAttribute("href");

    // Filtrer : liens locaux uniquement, pas d'ancres (#) ni de liens externes (http)
    if (targetUrl && !targetUrl.startsWith("#") && !targetUrl.startsWith("http")) {
      e.preventDefault();

      // Ne rien faire si on est déjà sur cette page
      if (window.location.pathname.endsWith(targetUrl) && targetUrl !== "/") return;

      loadPage(targetUrl);
    }
  });

  // Fonction de chargement Ajax sans refresh
  async function loadPage(url) {
    try {
      const response = await fetch(url);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(htmlText, "text/html");

      const newMainContent = newDoc.querySelector(".main-content");
      let currentMainContent = document.querySelector(".main-content");

      const isGoingHome = url === "/" || url.endsWith("index.html") || url === "./";

      // 1. Déplacement du panneau latéral
      if (brandPanel) {
        if (isGoingHome) {
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      // 2. Gestion du sous-menu Portfolio
      const hasSubmenu = document.querySelector(".has-submenu");
      if (hasSubmenu) {
        if (url.includes("graphisme") || url.includes("motion") || url.includes("photos") || url.includes("portfolio")) {
          hasSubmenu.classList.add("open");
        }
      }

      // 3. Remplacement du contenu et RELANCE DE L'ANIMATION CSS
      if (newMainContent) {
        if (!currentMainContent) {
          currentMainContent = document.createElement("main");
          currentMainContent.className = "main-content";
          document.body.appendChild(currentMainContent);
        }

        // Retirer d'abord la classe d'animation si elle y était déjà
        currentMainContent.classList.remove("animate-enter");

        // Injection du nouveau contenu
        currentMainContent.innerHTML = newMainContent.innerHTML;

        // Astuce : Forcer le 'reflow' pour que le navigateur enregistre le retrait de la classe
        void currentMainContent.offsetWidth;

        // Ajouter la classe pour déclencher l'animation
        currentMainContent.classList.add("animate-enter");
      } else if (currentMainContent && isGoingHome) {
        currentMainContent.innerHTML = "";
      }

      // 4. Mise à jour du titre et de l'URL
      document.title = newDoc.title;
      history.pushState({}, "", url);

    } catch (err) {
      console.warn("Erreur Ajax, redirection classique :", err);
      window.location.href = url;
    }
  }

  // Gérer les boutons Précédent / Suivant du navigateur
  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
  });

  // Gestion du clic sur l'accordéon du sous-menu Portfolio
  document.body.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".submenu-toggle");
    if (toggleBtn) {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = toggleBtn.closest(".has-submenu");
      if (parentItem) {
        parentItem.classList.toggle("open");
      }
    }
  });

  // Gestion du menu hamburger mobile
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      brandPanel.classList.toggle("mobile-open");
    });
  }
});
