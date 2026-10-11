document.addEventListener("DOMContentLoaded", () => {
  const brandPanel = document.querySelector(".brand-panel");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  // 1. Gestion du clic sur le bouton hamburger mobile
  if (mobileBtn && brandPanel) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = brandPanel.classList.toggle("mobile-open");
      mobileBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Fonction pour fermer le menu mobile et réinitialiser l'icône
  function closeMobileMenu() {
    if (brandPanel) {
      brandPanel.classList.remove("mobile-open");
    }
    if (mobileBtn) {
      mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  }

  // 2. Intercepter les clics sur tous les liens internes
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const targetUrl = link.getAttribute("href");

    // Filtrer : liens locaux uniquement, pas d'ancres (#) ni de liens externes (http)
    if (targetUrl && !targetUrl.startsWith("#") && !targetUrl.startsWith("http")) {
      e.preventDefault();

      // Ne rien faire si on est déjà sur cette page
      if (window.location.pathname.endsWith(targetUrl) && targetUrl !== "/") return;

      // Fermer le menu mobile si on clique sur un lien du menu
      closeMobileMenu();

      loadPage(targetUrl);
    }
  });

  // 3. Fonction de chargement Ajax sans refresh
  async function loadPage(url) {
    try {
      const response = await fetch(url);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(htmlText, "text/html");

      const newMainContent = newDoc.querySelector(".main-content");
      let currentMainContent = document.querySelector(".main-content");

      const isGoingHome = url === "/" || url.endsWith("index.html") || url === "./";

      // Gestion du panneau latéral (full / side)
      if (brandPanel) {
        if (isGoingHome) {
          brandPanel.classList.remove("side");
          brandPanel.classList.add("full");
        } else {
          brandPanel.classList.remove("full");
          brandPanel.classList.add("side");
        }
      }

      // Gestion du sous-menu Portfolio
      const hasSubmenu = document.querySelector(".has-submenu");
      if (hasSubmenu) {
        if (url.includes("graphisme") || url.includes("motion") || url.includes("photos") || url.includes("portfolio")) {
          hasSubmenu.classList.add("open");
        }
      }

      // Remplacement du contenu principal
      if (newMainContent) {
        if (!currentMainContent) {
          currentMainContent = document.createElement("main");
          currentMainContent.className = "main-content";
          document.body.appendChild(currentMainContent);
        }

        // Fermer la modale photo si ouverte
        const activeModal = document.getElementById('photo-modal');
        if (activeModal && activeModal.open) {
          activeModal.close();
          activeModal.classList.remove('closing');
        }

        currentMainContent.classList.remove("animate-enter");
        currentMainContent.innerHTML = newMainContent.innerHTML;
        void currentMainContent.offsetWidth;
        currentMainContent.classList.add("animate-enter");

        // Remonter en haut de page proprement
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        if (typeof initGallery === 'function') {
          initGallery();
        }
      } else if (currentMainContent && isGoingHome) {
        const activeModal = document.getElementById('photo-modal');
        if (activeModal && activeModal.open) {
          activeModal.close();
          activeModal.classList.remove('closing');
        }
        currentMainContent.innerHTML = "";
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      document.title = newDoc.title;
      history.pushState({}, "", url);

    } catch (err) {
      console.warn("Erreur Ajax, redirection classique :", err);
      window.location.href = url;
    }
  }

  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
  });

  // Gestion du sous-menu accordéon Portfolio
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
});