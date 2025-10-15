<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

import translations from './translations.js'


const currentLang = ref('en')
const isLightMode = ref(false)

const T = computed(() => translations[currentLang.value])


function setLanguage(lang) {
  currentLang.value = lang
}

function toggleTheme() {
  isLightMode.value = !isLightMode.value
  document.body.classList.toggle('light-mode', isLightMode.value)
}

onMounted(() => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})
</script>

<template>
  <Header 
    @set-language="setLanguage" 
    @toggle-theme="toggleTheme"
    :current-lang="currentLang"
    :is-light-mode="isLightMode"
    :T="T"
  />
  <main>
    <Hero :T="T" />
    <About :T="T" />
    <Expertise :T="T" />
    <Projects :T="T" />
    <Contact :T="T" />
  </main>
  <Footer :T="T" />
</template>

<style scoped>
</style>