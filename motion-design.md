---
layout: page
title: Motion Design
description: "Découvrez mes créations animées et projets vidéo."
permalink: /motion-design/
---

<div class="showcase-grid">
  {% for project in site.motion-design %}
  <div class="card-wrapper">
    <article class="card">
      <a href="{{ project.url | relative_url }}">
        <img class="card-preview" src="{{ project.thumb | relative_url }}" alt="{{ project.title }}">
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
      </a>
    </article>
    </div>
  {% endfor %}
</div>
