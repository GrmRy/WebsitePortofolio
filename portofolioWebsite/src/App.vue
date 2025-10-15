<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import ProjectModal from './components/ProjectModal.vue' // 1. Impor komponen modal

import translations from './translations.js'

// ... (state untuk bahasa dan tema tetap sama)
const currentLang = ref('en')
const isLightMode = ref(false)
const T = computed(() => translations[currentLang.value])

// 2. Tambahkan state untuk modal
const selectedProject = ref(null) // null berarti modal tersembunyi

// 3. Buat fungsi untuk menampilkan dan menyembunyikan modal
function showProjectDetail(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'; // Mencegah scroll di belakang modal
}

function closeProjectModal() {
  selectedProject.value = null
  document.body.style.overflow = ''; // Mengembalikan fungsi scroll
}

// ... (sisa script setup Anda)
</script>

<template>
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
</template>