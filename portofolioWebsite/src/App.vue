<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import ProjectModal from './components/ProjectModal.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import translations from './translations.js'



const currentLang = ref('en')
const isLightMode = ref(false)
const T = computed(() => translations[currentLang.value])


const selectedProject = ref(null) 


function showProjectDetail(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'; 
}

function closeProjectModal() {
  selectedProject.value = null
  document.body.style.overflow = ''; 
}


</script>

<template>
  <div>
     <ScrollProgress />
     <ScrollToTop />
  <main>
    <Hero :T="T" />
    <About :T="T" />
    <Expertise :T="T" />
    <Projects :T="T" @show-detail="showProjectDetail" />
    <Contact :T="T" />
  </main>
  
  <ProjectModal 
    v-if="selectedProject" 
    :project="selectedProject"
    :T="T"
    @close="closeProjectModal" 
  />
  </div>
</template>