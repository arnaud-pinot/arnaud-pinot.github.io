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
      // 1. Charger le code HTML de la nouvelle page en arrière-plan
      const response = await fetch(url);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(htmlText, "text/html");

      const newMainContent = newDoc.querySelector(".main-content");
      let currentMainContent = document.querySelector(".main-content");

      // 2. Déterminer si la cible est la page d'accueil
      const isGoingHome = url === "/" || url.endsWith("index.html") || url === "./";

      // 3. Faire glisser le panneau latéral (Side <-> Full)
      if (brandPanel) {
        if (isGoingHome) {
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      // 4. Mettre à jour l'accordéon Portfolio si on navigue dans le menu
      const hasSubmenu = document.querySelector(".has-submenu");
      if (hasSubmenu) {
        if (url.includes("graphisme") || url.includes("motion") || url.includes("photos") || url.includes("portfolio")) {
          hasSubmenu.classList.add("open");
        }
      }

      // 5. Remplacer uniquement le contenu principal (.main-content)
      if (newMainContent) {
        if (!currentMainContent) {
          currentMainContent = document.createElement("main");
          currentMainContent.className = "main-content";
          document.body.appendChild(currentMainContent);
        }
        currentMainContent.innerHTML = newMainContent.innerHTML;
      } else if (currentMainContent && isGoingHome) {
        // Si retour sur l'accueil et qu'il n'y a pas de main-content
        currentMainContent.innerHTML = "";
      }

      // 6. Mettre à jour le titre et l'URL du navigateur sans recharger
      document.title = newDoc.title;
      history.pushState({}, "", url);

    } catch (err) {
      // Fallback si le fetch échoue
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