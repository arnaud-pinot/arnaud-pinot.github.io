function initGallery() {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');

  if (!modal || !modalImg) return;

  // Si la modale est restée ouverte lors d'un changement de page Ajax, on la réinitialise
  if (modal.open) {
    modal.close();
  }
  modal.classList.remove('closing');

  // Attacher les écouteurs d'événements une seule fois sur le document
  if (!document.body.dataset.galleryEventsBound) {
    document.body.dataset.galleryEventsBound = 'true';

    // 1. Clic global (Ouverture, Bouton Fermer, Overlay)
    document.body.addEventListener('click', (e) => {
      const activeModal = document.getElementById('photo-modal');
      const activeModalImg = document.getElementById('modal-img');
      if (!activeModal || !activeModalImg) return;

      // Clic sur une vignette photo -> OUVERTURE
      const photoItem = e.target.closest('.photo-item');
      if (photoItem) {
        e.preventDefault();
        const fullUrl = photoItem.getAttribute('data-full');
        if (fullUrl) {
          activeModalImg.src = fullUrl;
          activeModal.classList.remove('closing');
          if (!activeModal.open) {
            activeModal.showModal();
          }
        }
        return;
      }

      // Clic sur le bouton de fermeture (.modal-close) -> FERMETURE
      const closeBtn = e.target.closest('.modal-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closeGalleryModal(activeModal);
        return;
      }

      // Clic sur l'overlay / fond noir en dehors de l'image -> FERMETURE
      if (e.target === activeModal) {
        closeGalleryModal(activeModal);
      }
    });

    // 2. Touche Échap (Escape)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.getElementById('photo-modal');
        if (activeModal && activeModal.open) {
          e.preventDefault();
          closeGalleryModal(activeModal);
        }
      }
    });
  }
}

// Fonction centrale pour fermer la modale avec animation
function closeGalleryModal(modal) {
  if (!modal || !modal.open || modal.classList.contains('closing')) return;

  modal.classList.add('closing');

  setTimeout(() => {
    try {
      modal.close();
    } catch (err) {
      // Fallback si l'état de la dialog était incohérent
      modal.removeAttribute('open');
    }
    modal.classList.remove('closing');
  }, 230); // Un poil plus court que les 250ms CSS pour éviter les décalages
}

// Initialisation au chargement direct
document.addEventListener('DOMContentLoaded', initGallery);