---
layout: page
title: Photographie
permalink: /photos/
---

<div class="photo-grid">
  {% for photo in site.data.photos %}
    <a href="{{ photo.full | relative_url }}" class="photo-item" data-full="{{ photo.full | relative_url }}">
      <img src="{{ photo.thumb | relative_url }}" alt="{{ photo.alt }}" loading="lazy">
    </a>
  {% endfor %}
</div>

<dialog id="photo-modal">
  <button type="button" class="modal-close" aria-label="Fermer">&times;</button>
  <img id="modal-img" src="" alt="Photo grand format">
</dialog>

<!-- Charger le script de la galerie uniquement sur cette page -->
<script src="{{ '/assets/js/gallery.js' | relative_url }}"></script>
