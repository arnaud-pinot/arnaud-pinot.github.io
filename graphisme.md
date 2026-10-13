---
layout: page
title: Graphisme
description: "Découvrez mes créations graphiques et travaux d'édition."
permalink: /graphisme/
---

<div class="showcase-grid">
  {% for project in site.graphisme %}
  <div class="card-wrapper">
    <article class="card">
      <a href="{{ project.url | relative_url }}">
        <img class="card-preview" src="{{ project.thumb }}">
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
      </a>
    </article>
    </div>
  {% endfor %}
</div>
