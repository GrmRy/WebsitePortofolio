<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['T'])
const emit = defineEmits(['show-detail'])

const projectItems = ref([
  {
    id: 1,
    icon: 'fas fa-brain',
    color: '#3b82f6',
    titleKey: 'proj1_title',
    descKey: 'proj1_desc',
    tags: ['Scikit-learn', 'Streamlit', 'Python'],
    liveDemoUrl: 'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/LoanPredict',
    detailedDesc: 'A comprehensive ML system using scikit-learn that analyzes credit history, income, employment status, and loan amount to predict loan approval likelihood in real time.',
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
    color: '#8b5cf6',
    titleKey: 'proj2_title',
    descKey: 'proj2_desc',
    tags: ['Plotly', 'Streamlit', 'Pandas'],
    liveDemoUrl: 'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    detailedDesc: 'An interactive BI dashboard for real-time sales performance monitoring with beautiful Plotly visualizations and dynamic filtering.',
    techStack: ['Python 3.9', 'Plotly', 'Streamlit', 'Pandas', 'SQL'],
    features: [
      'Real-time KPI tracking',
      'Interactive Plotly charts',
      'Sales trend analysis',
      'Regional performance comparison'
    ],
    challenges: 'Optimizing data refresh rates and creating responsive visualizations for large datasets.',
    outcome: 'Reduced reporting time by 70% and improved decision-making speed.'
  },
  {
    id: 3,
    icon: 'fas fa-comments',
    color: '#ec4899',
    titleKey: 'proj3_title',
    descKey: 'proj3_desc',
    tags: ['NLTK', 'Streamlit', 'NLP'],
    liveDemoUrl: 'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    githubUrl: 'https://github.com/GrmRy/HOK_SentimentAnalysis',
    detailedDesc: 'End-to-end NLP application analyzing Honor of Kings user feedback via Play Store web scraping and a comprehensive NLTK data cleaning pipeline.',
    techStack: ['Python 3.9', 'NLTK', 'Scikit-learn', 'Streamlit', 'Pandas'],
    features: [
      'Multi-class sentiment classification',
      'Real-time text analysis',
      'Topic modeling & keyword extraction',
      'Word cloud visualization'
    ],
    challenges: 'Processing multilingual text and handling informal gaming terminology and slang.',
    outcome: 'Successfully classified 85% of reviews with high confidence scores.'
  }
])

const currentIndex = ref(0)
const isPaused = ref(false)
let autoSlide = null

const next = () => { currentIndex.value = (currentIndex.value + 1) % projectItems.value.length }
const prev = () => { currentIndex.value = currentIndex.value === 0 ? projectItems.value.length - 1 : currentIndex.value - 1 }
const goTo = (i) => { currentIndex.value = i }

const startAuto = () => { autoSlide = setInterval(() => { if (!isPaused.value) next() }, 5000) }
const stopAuto  = () => { if (autoSlide) clearInterval(autoSlide) }

onMounted(() => startAuto())
onUnmounted(() => stopAuto())
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-label">~/project_builds</div>
      <h2 class="section-title">{{ T.projects_title }}</h2>
      <p class="section-subtitle">A selection of my recent work in data science and machine learning</p>

      <div
        class="carousel-wrapper"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <!-- Nav Buttons -->
        <button @click="prev" class="carousel-nav prev">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="next" class="carousel-nav next">
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Track -->
        <div class="carousel-container">
          <div
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(project, index) in projectItems"
              :key="project.id"
              class="carousel-slide"
            >
              <div class="project-card">

                <div class="card-header">
                  <div class="project-icon" :style="{ background: project.color }">
                    <i :class="project.icon"></i>
                  </div>
                  <span class="project-number">0{{ index + 1 }}</span>
                </div>

                <h3 class="project-title">{{ T[project.titleKey] }}</h3>
                <p class="project-desc">{{ T[project.descKey] }}</p>

                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>

                <div class="project-actions">
                  <button @click="emit('show-detail', project)" class="btn-detail">
                    <i class="fas fa-terminal"></i> DETAILS
                  </button>
                  <div class="project-links">
                    <a v-if="project.liveDemoUrl" :href="project.liveDemoUrl" target="_blank" class="icon-link">
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="icon-link">
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Dots + Counter -->
        <div class="carousel-footer">
          <div class="dots">
            <button
              v-for="(p, i) in projectItems"
              :key="i"
              @click="goTo(i)"
              :class="['dot', { active: currentIndex === i }]"
            ></button>
          </div>
          <span class="counter">
            <span class="current">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
            <span class="divider">/</span>
            <span class="total">{{ String(projectItems.length).padStart(2, '0') }}</span>
          </span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  margin-top: 2.5rem;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}

/* Nav */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(13, 25, 48, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.2);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 1rem;
}

.carousel-nav:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav.prev { left: -60px; }
.carousel-nav.next { right: -60px; }

/* Track */
.carousel-container { overflow: hidden; border-radius: 12px; }

.carousel-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

/* Card */
.project-card {
  background: linear-gradient(145deg, rgba(13, 25, 48, 0.92), rgba(5, 11, 20, 0.92));
  border: 1px solid rgba(0, 240, 255, 0.18);
  border-radius: 12px;
  padding: 2rem;
  margin: 0 0.25rem;
  position: relative;
  transition: all 0.35s ease;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, #00f0ff, transparent 40%, #a855f7);
  z-index: -1;
  border-radius: 13px;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.project-card:hover { border-color: transparent; }
.project-card:hover::before { opacity: 1; }

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.project-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.project-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.06);
  line-height: 1;
}

.project-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.6rem;
}

.project-desc {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
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

.btn-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-detail:hover {
  background: var(--accent);
  color: var(--bg);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 240, 255, 0.25);
}

.project-links { display: flex; gap: 0.6rem; }

.icon-link {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(13, 25, 48, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.icon-link:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  transform: translateY(-3px);
}

/* Footer */
.carousel-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.dots { display: flex; gap: 0.6rem; }

.dot {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: var(--border);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover { background: var(--text-secondary); }

.dot.active {
  background: var(--accent);
  width: 28px;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

.counter {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.counter .current { color: var(--accent); font-size: 1.2rem; font-weight: 700; }
.counter .divider { color: var(--border); }
.counter .total   { color: var(--text-secondary); }

/* Responsive */
@media (max-width: 1024px) {
  .carousel-nav.prev { left: 0; }
  .carousel-nav.next { right: 0; }
}

@media (max-width: 768px) {
  .carousel-nav { display: none; }
  .project-card { padding: 1.5rem; }
  .project-title { font-size: 1.3rem; }
  .project-actions { flex-direction: column; align-items: stretch; }
  .btn-detail { justify-content: center; }
  .project-links { justify-content: center; }
}
</style>