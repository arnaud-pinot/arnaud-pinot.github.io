function initGallery() {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');

  if (!modal || !modalImg) return;

  // Fonction pour gérer la fermeture animée
  function closeModalWithAnimation() {
    if (modal.classList.contains('closing')) return;

    modal.classList.add('closing');

    setTimeout(() => {
      modal.close();
      modal.classList.remove('closing');
    }, 250); // Durée alignée avec l'animation CSS (0.25s)
  }

  // Empêcher l'attachement multiple des événements sur le document
  if (!document.body.dataset.galleryEventsBound) {
    document.body.dataset.galleryEventsBound = 'true';

    document.body.addEventListener('click', (e) => {
      const activeModal = document.getElementById('photo-modal');
      if (!activeModal) return;

      // 1. Clic sur une vignette photo pour ouvrir
      const photoItem = e.target.closest('.photo-item');
      if (photoItem) {
        e.preventDefault();
        const fullUrl = photoItem.getAttribute('data-full');
        const activeModalImg = document.getElementById('modal-img');
        if (fullUrl && activeModalImg) {
          activeModalImg.src = fullUrl;
          activeModal.classList.remove('closing');
          activeModal.showModal();
        }
        return;
      }

      // 2. Clic sur le bouton de fermeture (.modal-close)
      const closeBtn = e.target.closest('.modal-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closeModalWithAnimation();
        return;
      }

      // 3. Clic sur l'overlay / fond noir
      if (e.target === activeModal) {
        closeModalWithAnimation();
      }
    });
  }

  // Intercepter la touche Échap pour jouer l'animation de fermeture aussi
  if (!modal.dataset.cancelBound) {
    modal.dataset.cancelBound = 'true';
    modal.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeModalWithAnimation();
    });
  }
}

// Initialisation au chargement direct de la page
document.addEventListener('DOMContentLoaded', initGallery);