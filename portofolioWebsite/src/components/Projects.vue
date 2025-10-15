<script setup>
import { ref } from 'vue'
defineProps(['T'])

const projectItems = ref([
    { number: '01', titleKey: 'proj1_title', descKey: 'proj1_desc', tags: ['Scikit-learn', 'Streamlit', 'Python'] },
    { number: '02', titleKey: 'proj2_title', descKey: 'proj2_desc', tags: ['Plotly', 'Streamlit', 'SQL'] },
    { number: '03', titleKey: 'proj3_title', descKey: 'proj3_desc', tags: ['NLTK', 'Streamlit', 'NLP'] }
])
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header">
        <div class="section-number">03</div>
        <h2 class="section-title">{{ T.projects_title }}</h2>
      </div>
      <div class="section-content">
        <div class="projects-grid">
          <a href="#" class="project-card" v-for="project in projectItems" :key="project.number">
            <div class="project-number">{{ project.number }}</div>
            <div class="project-content">
              <h3>{{ T[project.titleKey] }}</h3>
              <p>{{ T[project.descKey] }}</p>
              <div class="project-tags">
                <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>