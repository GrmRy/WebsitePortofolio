<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ProjectModal from './components/ProjectModal.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

import translations from './translations.js'

const currentLang = ref('en')
const T = computed(() => translations[currentLang.value])

const selectedProject = ref(null)

function showProjectDetail(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeProjectModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const sections = ref([])
const currentSection = ref(0)
const isScrolling = ref(false)
const isMobile = ref(false)

const scrollToSection = (index) => {
  if (index < 0 || index >= sections.value.length || isScrolling.value) return
  
  isScrolling.value = true
  currentSection.value = index
  
  const section = sections.value[index]
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  setTimeout(() => {
    isScrolling.value = false
  }, 1000)
}

const handleWheel = (e) => {
  if (isMobile.value || isScrolling.value || selectedProject.value) return
  
  e.preventDefault()
  
  if (e.deltaY > 0) {
    if (currentSection.value < sections.value.length - 1) {
      scrollToSection(currentSection.value + 1)
    }
  } else {
    if (currentSection.value > 0) {
      scrollToSection(currentSection.value - 1)
    }
  }
}

const handleKeydown = (e) => {
  if (isMobile.value || isScrolling.value || selectedProject.value) return
  
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault()
    if (currentSection.value < sections.value.length - 1) {
      scrollToSection(currentSection.value + 1)
    }
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault()
    if (currentSection.value > 0) {
      scrollToSection(currentSection.value - 1)
    }
  } else if (e.key === 'Home') {
    e.preventDefault()
    scrollToSection(0)
  } else if (e.key === 'End') {
    e.preventDefault()
    scrollToSection(sections.value.length - 1)
  }
}

const updateCurrentSection = () => {
  if (isMobile.value || isScrolling.value) return
  
  const scrollPosition = window.scrollY + window.innerHeight / 2
  
  sections.value.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const sectionBottom = sectionTop + rect.height
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection.value = index
    }
  })
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  setTimeout(() => {
    sections.value = Array.from(document.querySelectorAll('.fullpage-section'))
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    if (!isMobile.value) {
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeydown)
    }
    
    // For mobile, track scroll position
    if (isMobile.value) {
      window.addEventListener('scroll', updateCurrentSection)
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', updateCurrentSection)
})
</script>

<template>
  <div>
    <AnimatedBackground />
    <ScrollProgress />
    <ScrollToTop />
    
    <div class="scroll-navigation">
      <button
        v-for="(section, index) in sections"
        :key="index"
        @click="scrollToSection(index)"
        :class="{ 'active': currentSection === index }"
        class="nav-dot"
        :aria-label="`Go to section ${index + 1}`"
      ></button>
    </div>
    
    <main>
      <Hero :T="T" class="fullpage-section" />
      <About :T="T" class="fullpage-section" />
      <Expertise :T="T" class="fullpage-section" />
      <Projects :T="T" @show-detail="showProjectDetail" class="fullpage-section" />
      <Contact :T="T" class="fullpage-section" />
    </main>
    
    <ProjectModal 
      v-if="selectedProject" 
      :project="selectedProject"
      :T="T"
      @close="closeProjectModal" 
    />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
}

.fullpage-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
}

/* Navigation Dots */
.scroll-navigation {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.nav-dot:hover {
  border-color: var(--accent);
  transform: scale(1.2);
}

.nav-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

@media (max-width: 768px) {
  html {
    scroll-snap-type: none;
  }
  
  .fullpage-section {
    min-height: auto;
    padding: 4rem 0;
  }
  
  .scroll-navigation {
    right: 1rem;
    gap: 0.75rem;
  }
  
  .nav-dot {
    width: 10px;
    height: 10px;
  }
}
</style>