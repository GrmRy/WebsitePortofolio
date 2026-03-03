<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['T'])
const emit = defineEmits(['show-detail'])

const projectItems = ref([
  { 
    id: 1,
    icon: 'fas fa-brain',
    titleKey: 'proj1_title',
    descKey: 'proj1_desc',
    tags: ['Scikit-learn', 'Streamlit', 'Python'],
    color: '#3b82f6',
    liveDemoUrl: 'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/LoanPredict',
    detailedDesc: 'A comprehensive machine learning system built with scikit-learn that analyzes multiple factors including credit history, income, employment status, and loan amount to predict loan approval likelihood.',
    techStack: ['Python 3.9', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'Plotly'],
    features: [
      'Real-time loan approval prediction',
      'Interactive data visualization',
      'Model performance metrics',
      'Feature importance analysis'
    ],
    challenges: 'Handling imbalanced datasets and ensuring model fairness across different demographic groups.',
    outcome: 'Achieved 92% accuracy with balanced precision and recall metrics.'
  },
  { 
    id: 2,
    icon: 'fas fa-chart-line',
    titleKey: 'proj2_title',
    descKey: 'proj2_desc',
    tags: ['Plotly', 'Streamlit', 'Python'],
    color: '#8b5cf6',
    liveDemoUrl: 'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    detailedDesc: 'An interactive business intelligence dashboard for real-time sales performance monitoring with beautiful visualizations.',
    techStack: ['Python 3.9', 'Plotly', 'Streamlit', 'Pandas', 'SQL'],
    features: [
      'Real-time KPI tracking',
      'Interactive charts using Plotly',
      'Sales trend analysis',
      'Regional performance comparison'
    ],
    challenges: 'Optimizing data refresh rates and creating responsive visualizations for large datasets.',
    outcome: 'Reduced reporting time by 70% and improved decision-making speed.'
  },
  { 
    id: 3,
    icon: 'fas fa-comments',
    titleKey: 'proj3_title',
    descKey: 'proj3_desc',
    tags: ['NLTK', 'Streamlit', 'NLP'],
    color: '#ec4899',
    liveDemoUrl: 'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/HOK_SentimentAnalysis',
    detailedDesc: 'A natural language processing application that analyzes customer opinions from Honor of Kings game reviews.',
    techStack: ['Python 3.9', 'NLTK', 'Scikit-learn', 'Streamlit', 'Pandas'],
    features: [
      'Multi-class sentiment classification',
      'Real-time text analysis',
      'Topic modeling and keyword extraction',
      'Word cloud visualization'
    ],
    challenges: 'Processing multilingual text and handling informal gaming terminology and slang.',
    outcome: 'Successfully classified 85% of reviews with high confidence scores.'
  }
])

const currentIndex = ref(0)
const isPaused = ref(false)
const carouselTrack = ref(null)
let autoSlideInterval = null

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

const openDetail = (project) => {
  emit('show-detail', project)
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
      <div class="section-label">Portfolio</div>
      <h2 class="section-title">{{ T.projects_title }}</h2>
      <p class="section-subtitle">A selection of my recent work in data science and machine learning</p>
      
      <div class="carousel-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- Navigation Buttons -->
        <button @click="prevSlide" class="carousel-nav prev" aria-label="Previous project">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button @click="nextSlide" class="carousel-nav next" aria-label="Next project">
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <!-- Carousel Track -->
        <div class="carousel-container">
          <div 
            ref="carouselTrack" 
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="(project, index) in projectItems" 
              :key="project.id" 
              class="carousel-slide"
            >
              <div class="project-card">
                <div class="project-header">
                  <div class="project-icon" :style="{ background: project.color }">
                    <i :class="project.icon"></i>
                  </div>
                  <div class="project-number">0{{ index + 1 }}</div>
                </div>
                
                <h3 class="project-title">{{ T[project.titleKey] }}</h3>
                <p class="project-description">{{ T[project.descKey] }}</p>
                
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                
                <div class="project-actions">
                  <button @click="openDetail(project)" class="btn btn-primary">
                    <i class="fas fa-info-circle"></i>
                    View Details
                  </button>
                  <div class="project-links">
                    <a v-if="project.liveDemoUrl" :href="project.liveDemoUrl" target="_blank" class="icon-link" title="Live Demo">
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="icon-link" title="GitHub">
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Dots Indicator -->
        <div class="carousel-dots">
          <button
            v-for="(project, index) in projectItems"
            :key="index"
            @click="goToSlide(index)"
            :class="['dot', { active: currentIndex === index }]"
            :aria-label="`Go to project ${index + 1}`"
          ></button>
        </div>
        
        <!-- Counter -->
        <div class="carousel-counter">
          <span class="current">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
          <span class="divider">/</span>
          <span class="total">{{ String(projectItems.length).padStart(2, '0') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  margin-top: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

/* Navigation Buttons */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 1.125rem;
}

.carousel-nav:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav.prev {
  left: -70px;
}

.carousel-nav.next {
  right: -70px;
}

/* Carousel Container */
.carousel-container {
  overflow: hidden;
  border-radius: 1rem;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

/* Project Card */
.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.project-icon {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.75rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.project-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--border);
  line-height: 1;
}

.project-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.icon-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.icon-link:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-3px);
}

/* Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: var(--text-secondary);
  transform: scale(1.2);
}

.dot.active {
  background: var(--accent);
  width: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Counter */
.carousel-counter {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
}

.carousel-counter .current {
  color: var(--accent);
  font-size: 1.5rem;
}

.carousel-counter .divider {
  color: var(--border);
}

.carousel-counter .total {
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .carousel-nav.prev {
    left: 0;
  }
  
  .carousel-nav.next {
    right: 0;
  }
}

@media (max-width: 768px) {
  .carousel-wrapper {
    margin-top: 2rem;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .carousel-nav.prev {
    left: -10px;
  }
  
  .carousel-nav.next {
    right: -10px;
  }

  .project-card {
    padding: 1.75rem;
  }

  .project-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .project-number {
    font-size: 2rem;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 0.95rem;
  }

  .project-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .project-links {
    justify-content: center;
  }

  .carousel-counter {
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
  }

  .carousel-counter .current {
    font-size: 1.25rem;
  }
}
</style>