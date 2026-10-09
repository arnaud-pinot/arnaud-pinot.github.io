console.log("🟢 [Gallery JS] Le fichier gallery.js est chargé");

// Fonction centrale de fermeture avec animation CSS
function closeGalleryModal(modal) {
  console.log("🚪 [Gallery JS] Tentative de fermeture de la modale...");
  if (!modal || !modal.open || modal.classList.contains('closing')) {
    console.warn("⚠️ [Gallery JS] Fermeture annulée (modale absente, fermée ou déjà en cours de fermeture)");
    return;
  }

  modal.classList.add('closing');

  setTimeout(() => {
    try {
      modal.close();
      console.log("✅ [Gallery JS] Modale fermée avec succès");
    } catch (err) {
      console.error("❌ [Gallery JS] Erreur lors du modal.close(), utilisation du fallback", err);
      modal.removeAttribute('open');
    }
    modal.classList.remove('closing');
  }, 220);
}

// Initialisation globale des événements (s'exécute au chargement du fichier JS)
(function setupGalleryListeners() {
  if (window.galleryListenersBound) {
    console.log("ℹ️ [Gallery JS] Les écouteurs globaux sont déjà attachés");
    return;
  }
  window.galleryListenersBound = true;
  console.log("⚓ [Gallery JS] Écouteurs globaux attachés au document");

  // 1. Écouteur de clic global
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');

    // Clic sur une vignette photo -> OUVERTURE
    const photoItem = e.target.closest('.photo-item');
    if (photoItem) {
      e.preventDefault();
      const fullUrl = photoItem.getAttribute('data-full') || photoItem.getAttribute('href');
      console.log("🖼️ [Gallery JS] Clic détecté sur .photo-item ! Image ciblée :", fullUrl);

      if (!modal) {
        console.error("❌ [Gallery JS] Erreur : L'élément <dialog id=\"photo-modal\"> est introuvable dans le DOM !");
        return;
      }
      if (!modalImg) {
        console.error("❌ [Gallery JS] Erreur : L'élément <img id=\"modal-img\"> est introuvable dans le DOM !");
        return;
      }

      modalImg.src = fullUrl;
      modal.classList.remove('closing');
      
      if (!modal.open) {
        modal.showModal();
        console.log("✨ [Gallery JS] modale.showModal() exécuté avec succès");
      } else {
        console.warn("⚠️ [Gallery JS] La modale était déjà ouverte");
      }
      return;
    }

    if (!modal || !modal.open) return;

    // Clic sur le bouton de fermeture (.modal-close)
    const closeBtn = e.target.closest('.modal-close');
    if (closeBtn) {
      e.preventDefault();
      console.log("❌ [Gallery JS] Clic sur le bouton fermer");
      closeGalleryModal(modal);
      return;
    }

    // Clic sur le fond sombre
    if (e.target === modal) {
      console.log("🌑 [Gallery JS] Clic sur l'overlay extérieur");
      closeGalleryModal(modal);
    }
  });

  // 2. Touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('photo-modal');
      if (modal && modal.open) {
        console.log("⌨️ [Gallery JS] Touche Échap pressée");
        e.preventDefault();
        closeGalleryModal(modal);
      }
    }
  });
})();

function initGallery() {
  console.log("🔄 [Gallery JS] Appels de re-initialisation via initGallery()");
  const modal = document.getElementById('photo-modal');
  if (modal && modal.open) {
    modal.close();
    modal.classList.remove('closing');
  }
}