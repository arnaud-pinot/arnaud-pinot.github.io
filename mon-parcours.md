---
layout: page
title: "Mon parcours"
description: "Parcours professionnel, formations et compétences d'Arnaud PINOT, Technicien Informatique."
permalink: /mon-parcours/
---

<div class="cv-layout">

  <!-- Colonne de gauche : Profil & Résumé des compétences -->
  <aside class="cv-sidebar">
    <div class="skill-card profile-card">
      
      <h3>Soft Skills</h3>
      <div class="badge-container">
        {% for skill in site.data.parcours.soft_skills %}
          <span class="badge">{{ skill }}</span>
        {% endfor %}
      </div>

      <h3>Centres d'intérêt</h3>
      <div class="badge-container">
        {% for interest in site.data.parcours.interests %}
          <span class="badge {% if interest.outline %}outline{% endif %}">{{ interest.name }}</span>
        {% endfor %}
      </div>
    </div>
  </aside>

  <!-- Colonne de droite : Expériences, Formations & Compétences -->
  <main class="cv-main">

    <!-- Expériences (fermées par défaut) -->
    <details class="skill-card" open>
      <summary class="skill-header">
        <div class="skill-title-row">
          <i class="fa-solid fa-briefcase skill-icon"></i>
          <h2>Ils m'ont fait confiance...</h2>
        </div>
      </summary>

      <div class="experience-list">
        {% for exp in site.data.parcours.experiences %}
          <details class="experience-card">
            <summary class="experience-header">
              <div>
                <h3>{{ exp.title }}</h3>
                <span class="company">{{ exp.company }}</span>
              </div>
              <span class="period">{{ exp.period }}</span>
            </summary>
            <ul class="task-list">
              {% for task in exp.tasks %}
                <li>{{ task }}</li>
              {% endfor %}
            </ul>
          </details>
        {% endfor %}
      </div>
    </details>

    <!-- Formations (fermées par défaut) -->
    <details class="skill-card">
      <summary class="skill-header">
        <div class="skill-title-row">
          <i class="fa-solid fa-graduation-cap skill-icon"></i>
          <h2>Formations & diplômes</h2>
        </div>
      </summary>

      <div class="experience-list">
        {% for form in site.data.parcours.formations %}
          <details class="experience-card">
            <summary class="experience-header">
              <div>
                <h3>{{ form.title }}</h3>
                <span class="company">{{ form.company }}</span>
              </div>
              <span class="period">{{ form.period }}</span>
            </summary>
          </details>
        {% endfor %}
      </div>
    </details>

  </main>

</div>
