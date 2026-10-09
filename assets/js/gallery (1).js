function initGallery() {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');

  if (!modal || !modalImg) return;

  // On attache un écouteur de clic aux éléments de la galerie
  document.querySelectorAll('.photo-item').forEach(item => {
    // Éviter de rattacher plusieurs fois le même écouteur sur le même élément
    if (item.dataset.galleryBound) return;
    item.dataset.galleryBound = 'true';

    item.addEventListener('click', (e) => {
      e.preventDefault();
      const fullUrl = item.getAttribute('data-full');
      if (fullUrl) {
        modalImg.src = fullUrl;
        modal.showModal();
      }
    });
  });

  // Fermeture de la modale en cliquant à l'extérieur
  if (!modal.dataset.galleryBound) {
    modal.dataset.galleryBound = 'true';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  }
}

// Lancement au chargement direct
document.addEventListener('DOMContentLoaded', initGallery);