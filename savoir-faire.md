---
layout: page
title: "Compétences techniques"
description: "Savoir-faire en Systèmes & Réseaux, Infographie, Web, Motion Design et Photographie."
permalink: /savoir-faire/
---

<div class="skills-grid">
  
  {% for card in site.data.savoir_faire.competence_cards %}
    <details class="skill-card" {% if card.is_details %}open{% endif %}>
      <summary class="skill-header">
        <div class="skill-header-content">
          <div class="skill-title-row">
            <i class="{{ card.icon }} skill-icon"></i>
            <h2>{{ card.title }}</h2>
          </div>
          {% if card.intro %}
            <p class="section-intro">{{ card.intro }}</p>
          {% endif %}
        </div>
      </summary>

      {% for group in card.groups %}
        <div class="tech-group">
          {% if group.name == "Savoir-faire" or group.description %}
            <details class="skill-details">
              <summary class="skill-summary">
                <h4>Savoir-faire</h4>
              </summary>
              <p class="description-text">{{ group.description }}</p>
            </details>
          {% else %}
            <h4>{{ group.name }}</h4>
            
            {% if group.badges %}
              <div class="badge-container">
                {% for badge in group.badges %}
                  <span class="badge">{{ badge }}</span>
                {% endfor %}
              </div>
            {% endif %}
          {% endif %}
        </div>
      {% endfor %}
    </details>
  {% endfor %}

</div>
