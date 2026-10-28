---
layout: page
title: Graphismes
description: "Découvrez mes créations graphiques et travaux d'édition."
permalink: /graphismes/
---

<div class="showcase-grid">
  {% for project in site.graphismes %}
  <div class="card-wrapper">
    <article class="card">
      <a href="{{ project.url | relative_url }}">
        <img class="card-preview" src="{{ project.thumb | relative_url }}">
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
      </a>
    </article>
    </div>
  {% endfor %}
</div>
