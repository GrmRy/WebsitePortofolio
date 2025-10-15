<script setup>
import { ref } from 'vue'
defineProps(['T'])
const emit = defineEmits(['show-detail'])

const projectItems = ref([
    { id: 1, number: '01', 
    titleKey: 'proj1_title', 
    descKey: 'proj1_desc', 
    tags: ['Scikit-learn', 'Streamlit', 'Python'], 
    liveDemoUrl: 'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/LoanPredict'},
    { id: 2, number: '02', 
    titleKey: 'proj2_title', 
    descKey: 'proj2_desc', 
    tags: ['Plotly', 'Streamlit', 'Python'], 
    liveDemoUrl: 'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/KPI-Dashboard-Streamlit'},
    { id: 3, 
    number: '03', 
    titleKey: 'proj3_title', 
    descKey: 'proj3_desc', 
    tags: ['NLTK', 'Streamlit', 'NLP'], 
    liveDemoUrl: 'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/HOK_SentimentAnalysis'}
])


const openDetail = (project) => {
  emit('show-detail', project) 
}
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
          <div 
            class="project-card" 
            v-for="project in projectItems" 
            :key="project.id"
            @click="openDetail(project)"
            style="cursor: pointer;"
          >
            <div class="project-number">{{ project.number }}</div>
            <div class="project-content">
              <h3>{{ T[project.titleKey] }}</h3>
              <p>{{ T[project.descKey] }}</p>
              <div class="project-tags">
                <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>