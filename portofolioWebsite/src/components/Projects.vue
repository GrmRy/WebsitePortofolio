<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps(['T'])
const emit = defineEmits(['show-detail'])

const projectItems = ref([
  { 
    id: 1,
    number: '01',
    icon: 'fas fa-brain',
    titleKey: 'proj1_title',
    descKey: 'proj1_desc',
    tags: ['Scikit-learn', 'Streamlit', 'Python'],
    liveDemoUrl: 'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/LoanPredict',
    detailedDesc: 'A comprehensive machine learning system built with scikit-learn that analyzes multiple factors including credit history, income, employment status, and loan amount to predict loan approval likelihood.',
    techStack: ['Python 3.9', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'Plotly'],
    features: [
      'Real-time loan approval prediction',
      'Interactive data visualization',
      'Model performance metrics',
      'Feature importance analysis'
    ]
  },
  { 
    id: 2,
    number: '02',
    icon: 'fas fa-chart-line',
    titleKey: 'proj2_title',
    descKey: 'proj2_desc',
    tags: ['Plotly', 'Streamlit', 'Python'],
    liveDemoUrl: 'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    detailedDesc: 'An interactive business intelligence dashboard for real-time sales performance monitoring with beautiful visualizations.',
    techStack: ['Python 3.9', 'Plotly', 'Streamlit', 'Pandas', 'SQL'],
    features: [
      'Real-time KPI tracking',
      'Interactive charts using Plotly',
      'Sales trend analysis',
      'Regional performance comparison'
    ]
  },
  { 
    id: 3,
    number: '03',
    icon: 'fas fa-comments',
    titleKey: 'proj3_title',
    descKey: 'proj3_desc',
    tags: ['NLTK', 'Streamlit', 'NLP'],
    liveDemoUrl: 'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/HOK_SentimentAnalysis',
    detailedDesc: 'A natural language processing application that analyzes customer opinions from Honor of Kings game reviews.',
    techStack: ['Python 3.9', 'NLTK', 'Scikit-learn', 'Streamlit', 'Pandas'],
    features: [
      'Multi-class sentiment classification',
      'Real-time text analysis',
      'Topic modeling and keyword extraction',
      'Word cloud visualization'
    ]
  }
])

// Carousel logic
const currentIndex = ref(0)
const isPaused = ref(false)
let autoSlideInterval = null

const currentProject = computed(() => projectItems.value[currentIndex.value])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projectItems.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? projectItems.value.length - 1 
    : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

const handleMouseEnter = () => {
  isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}

const openDetail = () => {
  emit('show-detail', currentProject.value)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header">
        <div class="section-number">03</div>
        <h2 class="section-title">{{ T.projects_title }}</h2>
      </div>
      <div class="section-content">
        <!-- Carousel Container -->
        <div class="carousel-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <!-- Navigation Arrows -->
          <button @click="prevSlide" class="carousel-nav left" aria-label="Previous project">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <button @click="nextSlide" class="carousel-nav right" aria-label="Next project">
            <i class="fas fa-chevron-right"></i>
          </button>

          <!-- Carousel Card -->
          <TransitionGroup name="fade" mode="out-in">
            <div :key="currentIndex" class="carousel-card">
              <div class="carousel-icon">
                <i :class="currentProject.icon"></i>
              </div>
              
              <h3 class="carousel-title">{{ T[currentProject.titleKey] }}</h3>
              
              <p class="carousel-description">{{ T[currentProject.descKey] }}</p>
              
              <div class="carousel-tags">
                <span v-for="tag in currentProject.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>

              <div class="carousel-actions">
                <button @click="openDetail" class="carousel-btn primary">
                  <i class="fas fa-info-circle"></i> View Details
                </button>
                <a 
                  v-if="currentProject.liveDemoUrl"
                  :href="currentProject.liveDemoUrl" 
                  target="_blank" 
                  class="carousel-btn secondary"
                >
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a 
                  v-if="currentProject.githubUrl"
                  :href="currentProject.githubUrl" 
                  target="_blank" 
                  class="carousel-btn secondary"
                >
                  <i class="fab fa-github"></i> View Code
                </a>
              </div>

              <!-- Project Counter -->
              <div class="project-counter">
                {{ currentIndex + 1 }} / {{ projectItems.length }}
              </div>
            </div>
          </TransitionGroup>

          <!-- Dots Navigation -->
          <div class="carousel-dots">
            <button
              v-for="(project, index) in projectItems"
              :key="index"
              @click="goToSlide(index)"
              :class="['dot', { active: currentIndex === index }]"
              :aria-label="`Go to project ${index + 1}`"
            ></button>
          </div>

          <!-- Auto-play indicator -->
          <div class="autoplay-indicator" :class="{ paused: isPaused }">
            <i :class="isPaused ? 'fas fa-pause' : 'fas fa-play'"></i>
            {{ isPaused ? 'Paused' : 'Auto-playing' }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-container {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 4rem;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--accent);
  font-size: 1.2rem;
  z-index: 10;
}

.carousel-nav:hover {
  background: var(--accent);
  color: var(--bg);
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav.left {
  left: 0;
}

.carousel-nav.right {
  right: 0;
}

.carousel-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.carousel-card:hover {
  border-color: var(--accent);
  box-shadow: 0 10px 40px rgba(0, 217, 255, 0.1);
}

.carousel-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 255, 136, 0.1));
  border: 2px solid rgba(0, 217, 255, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 2rem;
  color: var(--accent);
}

.carousel-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.carousel-description {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.carousel-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--accent);
}

.carousel-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.carousel-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.carousel-btn.primary {
  background: linear-gradient(135deg, var(--accent), #00ff88);
  color: var(--bg);
  border: none;
}

.carousel-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 217, 255, 0.4);
}

.carousel-btn.secondary {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}

.carousel-btn.secondary:hover {
  background: rgba(0, 217, 255, 0.1);
  transform: translateY(-2px);
}

.project-counter {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: rgba(0, 217, 255, 0.5);
  transform: scale(1.2);
}

.dot.active {
  background: var(--accent);
  width: 35px;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.autoplay-indicator {
  position: absolute;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  opacity: 0.6;
}

.autoplay-indicator i {
  color: var(--accent);
}

.autoplay-indicator.paused {
  color: #ff8800;
}

.autoplay-indicator.paused i {
  color: #ff8800;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 0 3rem;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .carousel-card {
    padding: 2rem 1.5rem;
  }

  .carousel-icon {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .carousel-title {
    font-size: 1.5rem;
  }

  .carousel-description {
    font-size: 0.95rem;
  }

  .carousel-actions {
    flex-direction: column;
  }

  .carousel-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>