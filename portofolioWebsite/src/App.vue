<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ProjectModal from './components/ProjectModal.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

import translations from './translations.js'

const currentLang = ref('en')
const T = computed(() => translations[currentLang.value])

const selectedProject = ref(null)
const sections = ref([])
const currentSection = ref(0)
const isScrolling = ref(false)
const isMobile = ref(false)

function showProjectDetail(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeProjectModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

function setLanguage(lang) {
  currentLang.value = lang
}

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
  
  if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
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
  <div class="app">
    <AnimatedBackground />
    <ScrollProgress />
    
    <!-- Navbar -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <a href="#" @click.prevent="scrollToSection(0)" class="logo">
            <span class="logo-text">A</span>
            <span class="logo-dot">.</span>
          </a>
          
          <div class="nav-links">
            <a @click.prevent="scrollToSection(1)" class="nav-link">About</a>
            <a @click.prevent="scrollToSection(2)" class="nav-link">Projects</a>
            <a @click.prevent="scrollToSection(3)" class="nav-link">Contact</a>
          </div>
          
          <div class="nav-actions">
            <button 
              @click="setLanguage('en')"
              :class="['lang-btn', { active: currentLang === 'en' }]"
            >
              EN
            </button>
            <button 
              @click="setLanguage('id')"
              :class="['lang-btn', { active: currentLang === 'id' }]"
            >
              ID
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Navigation Dots -->
    <div class="scroll-navigation">
      <button
        v-for="(section, index) in sections"
        :key="index"
        @click="scrollToSection(index)"
        :class="{ 'active': currentSection === index }"
        class="nav-dot"
        :aria-label="`Go to section ${index + 1}`"
      >
        <span class="dot-label">
          {{ index === 0 ? 'Home' : index === 1 ? 'About' : index === 2 ? 'Projects' : 'Contact' }}
        </span>
      </button>
    </div>
    
    <!-- Scroll Hint -->
    <Transition name="fade">
      <div v-if="currentSection === 0 && !isMobile" class="scroll-hint">
        <span>Scroll to explore</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </Transition>
    
    <main>
      <Hero :T="T" class="fullpage-section" />
      <About :T="T" class="fullpage-section" />
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
  scroll-snap-type: y mandatory;
}

.fullpage-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
  opacity: 0;
  animation: sectionFadeIn 0.8s ease forwards;
}

@keyframes sectionFadeIn {
  to {
    opacity: 1;
  }
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  animation: navSlideDown 0.6s ease;
}

@keyframes navSlideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  background: linear-gradient(135deg, var(--accent), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-dot {
  color: var(--pink);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--text);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  gap: 0.5rem;
}

.lang-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.lang-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
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
  gap: 1.5rem;
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
  position: relative;
}

.nav-dot:hover {
  border-color: var(--accent);
  transform: scale(1.3);
}

.nav-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.4);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

.dot-label {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--card-bg);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.nav-dot:hover .dot-label {
  opacity: 1;
  right: 30px;
}

/* Scroll Hint */
.scroll-hint {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 50;
  animation: bounce 2s infinite;
}

.scroll-hint i {
  color: var(--accent);
  font-size: 1.25rem;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

/* Main */
main {
  padding-top: 60px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  html {
    scroll-snap-type: none;
  }
  
  .fullpage-section {
    min-height: auto;
    padding: 4rem 0;
  }
  
  .nav-links {
    display: none;
  }
  
  .nav-actions {
    gap: 0.25rem;
  }
  
  .lang-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .scroll-navigation {
    right: 1rem;
    gap: 1rem;
  }
  
  .nav-dot {
    width: 10px;
    height: 10px;
  }
  
  .dot-label {
    display: none;
  }
  
  .scroll-hint {
    display: none;
  }
}
</style>