<script setup>
import { ref } from 'vue'

defineProps(['T'])

const activeTab = ref('personal')

const experienceItems = [
  {
    date: '2025 - Present',
    title: 'Data Support',
    company: 'PT. Sriwahana Adityakarta',
    description: 'Supporting data operations and analysis for business intelligence initiatives.'
  }
]

const educationItems = [
  {
    date: '2018 - 2024',
    title: 'Bachelor of Electrical Engineering',
    company: 'Universitas Tidar',
    description: 'Focused on data processing, machine learning, and electrical systems optimization.'
  }
]

const skills = [
  'Python', 'SQL', 'Scikit-learn', 'TensorFlow',
  'Pandas', 'NumPy', 'Streamlit', 'Vue.js'
]

function setActiveTab(tabName) {
  activeTab.value = tabName
}
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-label">About Me</div>
      <h2 class="section-title">{{ T.about_title }}</h2>
      
      <div class="about-wrapper">
        <div class="tab-buttons">
          <button 
            @click="setActiveTab('personal')" 
            :class="{ 'active': activeTab === 'personal' }"
            class="tab-btn">
            <i class="fas fa-user"></i>
            Personal
          </button>
          <button 
            @click="setActiveTab('experience')" 
            :class="{ 'active': activeTab === 'experience' }"
            class="tab-btn">
            <i class="fas fa-briefcase"></i>
            Experience
          </button>
          <button 
            @click="setActiveTab('education')" 
            :class="{ 'active': activeTab === 'education' }"
            class="tab-btn">
            <i class="fas fa-graduation-cap"></i>
            Education
          </button>
          <button 
            @click="setActiveTab('skills')" 
            :class="{ 'active': activeTab === 'skills' }"
            class="tab-btn">
            <i class="fas fa-code"></i>
            Skills
          </button>
        </div>

        <div class="tab-content">
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'personal'" class="content-panel" key="personal">
              <h3 class="panel-title">Data Scientist & Machine Learning Engineer</h3>
              <p class="panel-description">{{ T.about_p1 }}</p>
              <p class="panel-description">{{ T.about_p2 }}</p>
            </div>

            <div v-else-if="activeTab === 'experience'" class="content-panel" key="experience">
              <h3 class="panel-title">Professional Experience</h3>
              <div class="timeline">
                <div v-for="(item, index) in experienceItems" :key="index" class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-date">{{ item.date }}</span>
                    <h4 class="timeline-title">{{ item.title }}</h4>
                    <p class="timeline-company">{{ item.company }}</p>
                    <p class="timeline-desc">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'education'" class="content-panel" key="education">
              <h3 class="panel-title">Educational Background</h3>
              <div class="timeline">
                <div v-for="(item, index) in educationItems" :key="index" class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-date">{{ item.date }}</span>
                    <h4 class="timeline-title">{{ item.title }}</h4>
                    <p class="timeline-company">{{ item.company }}</p>
                    <p class="timeline-desc">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'skills'" class="content-panel" key="skills">
              <h3 class="panel-title">Tools I Use Everyday</h3>
              <div class="skills-grid">
                <div v-for="skill in skills" :key="skill" class="skill-item">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ skill }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-wrapper {
  max-width: 800px;
  margin: 2rem auto 0;
  animation: slideInFromLeft 0.8s ease;
  width: 100%;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tab-buttons {
  display: flex;
  background: var(--card-bg);
  padding: 0.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.875rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  background: var(--accent);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.tab-content {
  height: 380px;
  position: relative;
  overflow: hidden;
}

.content-panel {
  padding: 1.75rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

/* Custom Scrollbar */
.content-panel::-webkit-scrollbar {
  width: 6px;
}

.content-panel::-webkit-scrollbar-track {
  background: transparent;
}

.content-panel::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.content-panel::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, var(--accent), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.panel-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1rem;
  flex-shrink: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
  flex: 1;
  min-height: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--accent), transparent);
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 6px var(--accent);
}

.timeline-date {
  display: inline-block;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.timeline-company {
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.timeline-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.9rem;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
  align-content: start;
  min-height: 0;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  color: var(--text);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  border-color: var(--accent);
  transform: translateX(5px);
  background: rgba(59, 130, 246, 0.1);
}

.skill-item i {
  color: var(--accent);
  font-size: 1rem;
}

/* Transition */
.fade-enter-active {
  transition: opacity 0.3s ease 0.1s;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media (max-width: 768px) {
  .about-wrapper {
    margin-top: 2rem;
  }

  .tab-buttons {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
  }

  .tab-content {
    height: 450px;
  }

  .content-panel {
    padding: 1.5rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>