---
layout: "vide"
title: "CV - Arnaud PINOT"
permalink: /cv.html
---

<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CV - Arnaud PINOT</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Import des polices officielles du site -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
  <!-- Inclusion de html2pdf.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.12.1/html2pdf.bundle.min.js"></script>
  
  <style>
    :root {
      --font-family-heading: 'Roboto Slab', Georgia, serif;
      --font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --primary-color: #0b4353;
      --secondary-color: #0e8eb0;
      --primary-dark: #08323e;
      --text-color: #333;
      --border-color: #e2e8f0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-family);
      color: var(--text-color);
      background-color: #e5e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px 0;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-family-heading);
    }

    /* Barre d'action d'exportation */
    .export-bar {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      max-width: 80%;
      padding: 0 10px;
    }

    .btn-export {
      background-color: var(--primary-color);
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      font-family: var(--font-family-heading);
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .btn-export:hover {
      background-color: var(--primary-dark);
      transform: translateY(-1px);
    }

    /* Conteneur de prévisualisation responsive */
    .cv-preview-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      position: relative;
      margin-bottom: 40px;
    }

    /* Format A4 strict */
    page[size="A4"] {
      width: 210mm;
      height: 296.7mm;
      max-height: 296.7mm;
      background: #ffffff;
      display: block;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      box-sizing: border-box;
      transform-origin: top center;
      transition: transform 0.05s ease-out;
    }

    .cv-layout {
      width: 210mm;
      height: 296.7mm;
      max-height: 296.7mm;
      display: grid;
      grid-template-columns: 68mm 142mm;
      background: #ffffff;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* ================= COLONNE DE GAUCHE : PLEIN FOND (MENU PORTFOLIO) ================= */
    .cv-sidebar {
      background: var(--primary-color);
      color: #ffffff;
      padding: 8mm;
      padding-top: 11mm;
      display: flex;
      flex-direction: column;
      gap: 13mm;
      height: 296.7mm;
      box-sizing: border-box;
    }

    .profile-card {
      text-align: center;
      padding-bottom: 1.5mm;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .profile-avatar {
      width: 35mm;
      height: 35mm;
      border-radius: 50%;
/*      border: 2px solid #ffffff;*/
      object-fit: cover;
      margin-bottom: 1mm;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .profile-name {
      font-size: 1.50rem;
      font-weight: 800;
      letter-spacing: 0.3px;
    }

    .sidebar-block {
      display: flex;
      flex-direction: column;
      gap: 0.8mm;
    }

    .sidebar-block h3 {
      font-size: 11pt;
      text-align: center;
/*      text-transform: uppercase;*/
      letter-spacing: 0.6px;
      color: #ffffff;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      padding-bottom: 1mm;
      margin-bottom: 1mm;
      font-family: var(--font-family-heading);
    }

    .contact-list, .diploma-list {
      list-style: none;
      font-size: 8pt;
      line-height: 1.5;
    }

    .contact-list li {
      margin-bottom: 0.6mm;
      display: flex;
      align-items: center;
      gap: 1.2mm;
      word-break: break-all;
    }

    .contact-list a {
      color: #ffffff;
      text-decoration: none;
    }

    .diploma-item {
      margin-bottom: 1mm;
    }

    .diploma-title {
      font-weight: bold;
/*      font-size: 0.53rem;*/
    }

    .diploma-school {
      font-size: 8pt;
      opacity: 0.82;
    }

    .badge-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6pt;
      margin-top: 0.3mm;
    }

    .badge {
      background-color: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      font-weight: 600;
      font-size: 8pt;
      padding: 0.08rem 0.3rem;
      border-radius: 8pt;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* ================= COLONNE DE DROITE : CARTES DU PORTFOLIO ================= */
    .cv-main {
      padding: 10mm 5mm 10mm 10mm;
      display: flex;
      flex-direction: column;
      gap: 6mm;
      height: 296.7mm;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Titre du poste en très grand sur 2 lignes */
    .main-title-card {
      background: #ffffff;
      border-radius: 6px;
      padding: 2.5mm 3.5mm;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .main-title-card h1 {
      font-size: 3rem;
      color: var(--primary-color);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1;
      margin: 0;
    }

    .skill-card {
      background: #ffffff;
      border-radius: 6px;
      padding: 2.2mm 3.5mm;
      border-left: 1px solid var(--secondary-color);
    }

    .skill-header {
      display: flex;
      align-items: center;
      gap: 1.8mm;
      padding-bottom: 2mm;
    }

    .skill-icon {
      color: var(--secondary-color);
      font-size: 12pt;
    }

    .skill-header h2 {
      font-size: 12pt;
      color: var(--secondary-color);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin: 0;
    }

    /* Grille de compétences */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 3mm;
    }

    .skill-card-box {
      font-size: 10pt;
      background: #f2f6f8;
      padding: 1mm 1.5mm;
      border-radius: 4px;
      border: 1px solid #d4e2e7;
    }

    .skill-card-box strong {
      display: block;
      color: var(--primary-color);
      margin-bottom: 1mm;
      font-size: 10pt;
      font-family: var(--font-family-heading);
    }

    .skill-card-box span {
      font-size: 8pt;
      color: #444;
      line-height: 1.5;
      display: block;
    }

    /* Timeline (Expériences) */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 3mm;
    }

    .timeline-item {
      position: relative;
      background: #fff;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .timeline-header h3 {
      margin: 0;
      font-size: 10pt;
      color: #222;
      font-weight: 700;
    }

    .period {
      font-size: 0.48rem;
      color: #666;
      font-weight: 500;
    }

    .company {
      font-size: 8pt;
      color: var(--primary-color);
      font-weight: 600;
      display: block;
      margin-bottom: 0.1mm;
    }

    .skill-list {
    list-style: none;
      margin: 0.1rem 0 0 1.8mm;
      padding: 0;
      font-size: 8pt;
      color: #444;
      line-height: 1.25;
    }

    .skill-list li {
    margin-right: 5px;
    margin-left: 5px;
    }
    
        .skill-list li::before {
content: '›';
  position: absolute;
  left: 0;
  color: #444;
  font-weight: bold;
    }
    

    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .export-bar {
        display: none !important;
      }
      .cv-preview-container {
        display: block;
        padding: 0;
        margin: 0;
      }
      page[size="A4"] {
        box-shadow: none;
        margin: 0;
        transform: none !important;
      }
    }
    
    
    
    /* Container de la section compétences avec timeline verticale */
.skills-timeline {
  position: relative;
  margin-top: 2mm;
  display: flex;
  flex-direction: column;
  gap: 3mm;
}



.skill-category-block {
  position: relative;
}

.skill-category-title {
  font-size: 10pt;
  color: #000;
  font-weight: 700;
  margin-bottom: 1mm;
  font-family: var(--font-family-heading);
}

/* Liste des éléments avec flèches › */
.skill-category-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  font-size: 8pt;
  line-height: 1.35;
  color: #333;
}

.skill-category-list li {
  position: relative;
  padding-left: 10px;
}

.skill-category-list li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #444;
  font-weight: bold;
}

.skill-category-list strong {
  color: var(--primary-color);
  font-weight: 700;
}
  </style>
</head>
<body>

  <!-- Barre d'action avec bouton d'exportation -->
  <div class="export-bar">
    <button class="btn-export" id="download-button">
      <i class="fa-solid fa-file-pdf"></i> Télécharger le PDF HD (Scale 3.0)
    </button>
  </div>

 <!-- Conteneur de prévisualisation responsive -->
<div class="cv-preview-container" id="preview-container">
  <!-- Élément cible A4 -->
  <page size="A4" id="cv-content">
    <div class="cv-layout">

      <!-- COLONNE DE GAUCHE -->
      <aside class="cv-sidebar">

        <!-- Profil -->
        <div class="profile-card">
          <img src="{{ '/assets/img/Portrait2.png' | relative_url }}" alt="Arnaud PINOT" class="profile-avatar">
          <h1 class="profile-name">Arnaud PINOT</h1>
        </div>

        <!-- Coordonnées -->
        <div class="sidebar-block">
          <h3></h3>
          <ul class="contact-list">
            <li><i class="fa-solid fa-location-dot"></i> 17, rue de Fey 57685 Augny</li>
            <li><i class="fa-solid fa-car"></i> Permis B & Véhicule</li>
            <li><i class="fa-solid fa-envelope"></i> arnaud.pinot@gmail.com</li>
            <li><i class="fa-solid fa-phone"></i> 07 82 78 29 76</li>
          </ul>
        </div>
        
        <!-- Coordonnées -->
        <div class="sidebar-block">
          <h3>Portfolio</h3>
          <ul class="contact-list">
             <li><i class="fa-solid fa-globe"></i> <a href="https://arnaud-pinot.github.io" target="_blank">https://arnaud-pinot.github.io</a></li>
          </ul>
        </div>

        <!-- Formations (Issu de _data/parcours.yml) -->
        <div class="sidebar-block">
          <h3>Formations & Diplômes</h3>
          <div class="diploma-list">
            {% for formation in site.data.parcours.formations %}
              <div class="diploma-item">
                <div class="diploma-title">{{ formation.period }} | {{ formation.title }}</div>
                <div class="diploma-school">{{ formation.company }} </div>
              </div>
            {% endfor %}
          </div>
        </div>

        <!-- Soft Skills (Issu de _data/parcours.yml) -->
        <div class="sidebar-block">
          <h3>Soft Skills</h3>
          <div class="badge-container">
            {% for skill in site.data.parcours.soft_skills %}
              <span class="badge">{{ skill }}</span>
            {% endfor %}
          </div>
        </div>

        <!-- Centres d'intérêt (Issu de _data/parcours.yml) -->
        <div class="sidebar-block">
          <h3>Centres d'intérêt</h3>
          <div class="badge-container">
            {% for interest in site.data.parcours.interests %}
              <span class="badge">{{ interest.name }}</span>
            {% endfor %}
          </div>
        </div>

      </aside>

      <!-- COLONNE DE DROITE -->
      <main class="cv-main">

        <!-- Titre du poste -->
        <div class="main-title-card">
          <h1>Technicien<br>Informatique</h1>
        </div>

        <!-- Compétences Techniques -->
        <section class="skill-card">
          <div class="skill-header">
            <i class="fa-solid fa-server skill-icon"></i>
            <h2>Compétences Techniques</h2>
          </div>

          <div class="skills-timeline">
            {% for card in site.data.savoir_faire.competence_cards %}
              <div class="skill-category-block">
                <div class="skill-category-title">{{ card.title }}</div>
                <ul class="skill-category-list">
                  {% for group in card.groups %}
                    {% if group.badges %}
                      <li>
                        <strong>{{ group.name }} :</strong>
                        {{ group.badges | join: ", " }}
                      </li>
                    {% endif %}
                  {% endfor %}
                </ul>
              </div>
            {% endfor %}
          </div>
        </section>

        <!-- Expériences Professionnelles (Issu de _data/parcours.yml) -->
        <section class="skill-card">
          <div class="skill-header">
            <i class="fa-solid fa-briefcase skill-icon"></i>
            <h2>Expériences Professionnelles</h2>
          </div>
          <div class="timeline">
            {% for exp in site.data.parcours.experiences %}
              <div class="timeline-item">
                <div class="timeline-header">
                  <h3>{{ exp.title }}</h3>
                  <span class="period">{{ exp.period }}</span>
                </div>
                <span class="company">{{ exp.company }}</span>
                {% if exp.tasks %}
                  <ul class="skill-list">
                    {% for task in exp.tasks %}
                      <li>{{ task }}</li>
                    {% endfor %}
                  </ul>
                {% endif %}
              </div>
            {% endfor %}
          </div>
        </section>

      </main>

    </div>
  </page>
</div>

  <script>
    const button = document.getElementById("download-button");

    function adjustScale() {
      const page = document.getElementById("cv-content");
      const container = document.getElementById("preview-container");

      const a4WidthPx = 794;  
      const a4HeightPx = 1103; 

      // On cible 80% de la largeur de l'écran pour garder ~10% de marge de chaque côté
      const targetWidth = window.innerWidth * 0.60;

      let scale = targetWidth / a4WidthPx;

      page.style.transform = `scale(${scale})`;
      container.style.width = `${a4WidthPx * scale}px`;
      container.style.height = `${a4HeightPx * scale}px`;
    }

    window.addEventListener('resize', adjustScale);
    window.addEventListener('DOMContentLoaded', adjustScale);

    function generatePDF() {
      const element = document.getElementById("cv-content");
      const container = document.getElementById("preview-container");
      
      const currentTransform = element.style.transform;
      element.style.transform = 'none';
      container.style.width = 'auto';
      container.style.height = 'auto';

      const options = {
        margin:       0,
        filename:     'CV_Arnaud-PINOT_(v20261021).pdf',
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 3.0,
          useCORS: true, 
          letterRendering: true,
          scrollY: 0
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: 'avoid-all' }
      };

      html2pdf().set(options).from(element).save().then(() => {
        adjustScale();
      });
    }

    button.addEventListener("click", generatePDF);
  </script>

</body>
</html>
