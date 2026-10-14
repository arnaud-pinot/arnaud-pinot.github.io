  document.addEventListener('DOMContentLoaded', function() {
    // On cible tous les liens ayant la classe .external-link
    const externalLinks = document.querySelectorAll('.external-link');
    
    externalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Empêche le comportement par défaut du navigateur
        e.preventDefault();
        // Empêche le script AJAX/PJAX du thème de capturer le clic
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Ouvre proprement le lien dans un nouvel onglet
        window.open(this.href, '_blank');
        
        return false;
      }, true); // Le 'true' (capture phase) permet d'intercepter le clic avant le thème
    });
  });
