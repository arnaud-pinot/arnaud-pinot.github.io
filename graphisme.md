---
layout: page
title: Portfolio Graphisme
description: "Découvrez mes créations graphiques et travaux d'édition."
permalink: /graphisme/
---

<div class="showcase-grid">
  {% for project in site.graphisme %}
    <article class="card">
      <a href="{{ project.url | relative_url }}">
        <img class="card-preview" src="{{ project.thumb }}" alt="{{ project.title }}">
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
      </a>
    </article>
  {% endfor %}
</div>
