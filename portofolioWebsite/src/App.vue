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
  sections.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => { isScrolling.value = false }, 1000)
}

const handleWheel = (e) => {
  if (isMobile.value || isScrolling.value || selectedProject.value) return
  e.preventDefault()
  if (e.deltaY > 0 && currentSection.value < sections.value.length - 1) {
    scrollToSection(currentSection.value + 1)
  } else if (e.deltaY < 0 && currentSection.value > 0) {
    scrollToSection(currentSection.value - 1)
  }
}

const handleKeydown = (e) => {
  if (isMobile.value || isScrolling.value || selectedProject.value) return
  if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
    e.preventDefault()
    if (currentSection.value < sections.value.length - 1) scrollToSection(currentSection.value + 1)
  } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
    e.preventDefault()
    if (currentSection.value > 0) scrollToSection(currentSection.value - 1)
  }
}

const updateCurrentSection = () => {
  if (isScrolling.value) return
  const mid = window.scrollY + window.innerHeight / 2
  sections.value.forEach((s, i) => {
    const top = s.getBoundingClientRect().top + window.scrollY
    if (mid >= top && mid < top + s.offsetHeight) currentSection.value = i
  })
}

const checkMobile = () => { isMobile.value = window.innerWidth <= 768 }

onMounted(() => {
  setTimeout(() => {
    sections.value = Array.from(document.querySelectorAll('.fullpage-section'))
    checkMobile()
    window.addEventListener('resize', checkMobile)
    if (!isMobile.value) {
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeydown)
    } else {
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

const sectionLabels = ['./init', './about', './projects', './contact']
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
            <i class="fas fa-terminal logo-icon"></i>
            <span class="logo-text">ASN_ROOT</span>
          </a>

          <div class="nav-links">
            <a @click.prevent="scrollToSection(0)" class="nav-link">./init</a>
            <a @click.prevent="scrollToSection(1)" class="nav-link">./about</a>
            <a @click.prevent="scrollToSection(2)" class="nav-link">./projects</a>
            <a @click.prevent="scrollToSection(3)" class="nav-link">./contact</a>
          </div>

          <div class="nav-actions">
            <button
              @click="setLanguage('en')"
              :class="['lang-btn', { active: currentLang === 'en' }]"
            >EN</button>
            <button
              @click="setLanguage('id')"
              :class="['lang-btn', { active: currentLang === 'id' }]"
            >ID</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Nav Dots -->
    <div class="nav-dots" v-if="!isMobile">
      <button
        v-for="(label, index) in sectionLabels"
        :key="index"
        @click="scrollToSection(index)"
        :class="['nav-dot', { active: currentSection === index }]"
      >
        <span class="dot-tooltip">{{ label }}</span>
      </button>
    </div>

    <!-- Scroll Hint -->
    <Transition name="fade">
      <div v-if="currentSection === 0 && !isMobile" class="scroll-hint">
        <span>scroll to explore</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </Transition>

    <main>
      <Hero     :T="T" class="fullpage-section" />
      <About    :T="T" class="fullpage-section" />
      <Projects :T="T" @show-detail="showProjectDetail" class="fullpage-section" />
      <Contact  :T="T" class="fullpage-section" />
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
/* ===== GLOBAL ===== */
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
}

main { padding-top: 56px; }

/* ===== NAVBAR ===== */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(5, 11, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.12);
  animation: navSlideDown 0.6s ease;
}

@keyframes navSlideDown {
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover { opacity: 0.8; }

.logo-icon {
  color: var(--accent);
  font-size: 0.85rem;
}

.logo-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
}

/* Nav Links */
.nav-links {
  display: flex;
  gap: 1.75rem;
}

.nav-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: var(--text-secondary);
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-link:hover { color: var(--accent); }
.nav-link:hover::after { width: 100%; }

/* Lang Buttons */
.nav-actions { display: flex; gap: 0.4rem; }

.lang-btn {
  padding: 0.35rem 0.85rem;
  background: transparent;
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
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
  color: var(--bg);
}

/* ===== NAV DOTS ===== */
.nav-dots {
  position: fixed;
  right: 1.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.nav-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid rgba(0, 240, 255, 0.3);
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
  box-shadow: 0 0 14px rgba(0, 240, 255, 0.55);
}

.dot-tooltip {
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(13, 25, 48, 0.95);
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
}

.nav-dot:hover .dot-tooltip {
  opacity: 1;
  right: 28px;
}

/* ===== SCROLL HINT ===== */
.scroll-hint {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-secondary);
  z-index: 50;
  animation: bounce 2s ease-in-out infinite;
}

.scroll-hint i { color: var(--accent); font-size: 1rem; }

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-8px); }
}

/* ===== TRANSITIONS ===== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  html { scroll-snap-type: none; }

  .fullpage-section {
    min-height: auto;
    padding: 4rem 0;
  }

  .nav-links { display: none; }
  .nav-dots  { display: none; }
  .scroll-hint { display: none; }

  .nav-actions { gap: 0.3rem; }
  .lang-btn { padding: 0.35rem 0.65rem; }
}
</style>