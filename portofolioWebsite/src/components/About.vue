<script setup>
import { ref } from 'vue'

defineProps(['T'])

const activeTab = ref('personal')

const experienceItems = [
  {
    date: 'Apr 2025 – Dec 2025',
    title: 'Staff Support',
    company: 'PT. Sriwahana Adityakarta',
    details: [
      'Managing daily data entry & validation documentation.',
      'Developing automated Excel templates with complex validation.',
      'Engineering Desktop GUI app with PyQt5 for batch processing & Regex extraction.'
    ]
  },
  {
    date: 'Aug 2022 – Dec 2022',
    title: 'Teaching Assistant',
    company: 'Universitas Tidar',
    details: [
      'Assisted introductory programming courses.',
      'Graded assignments and provided feedback.',
      'Participated in curriculum development discussions.'
    ]
  }
]

const educationItems = [
  {
    date: '2018 – 2024',
    title: 'S1 Electrical Engineering (GPA: 3.04)',
    company: 'Universitas Tidar',
    description: 'Thesis: Maximum Useful Power Forecasting of PLTA using Machine Learning'
  },
  {
    date: '2023',
    title: 'Machine Learning Track',
    company: 'Bangkit Academy by Google',
    description: 'Industry-ready career program focusing on practical deep learning applications.'
  }
]

const certifications = [
  'Tensorflow Developer Certificate',
  'DeepLearning.AI TensorFlow Developer',
  'TensorFlow: Data and Deployment',
  'Mathematics for Machine Learning',
  'Google IT Automation With Python'
]

const skills = [
  'Python', 'SQL', 'Scikit-learn', 'TensorFlow',
  'Pandas', 'NumPy', 'Streamlit', 'PyQt5'
]
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-label">~/about_me</div>
      <h2 class="section-title">{{ T.about_title }}</h2>

      <div class="about-wrapper">

        <!-- Tab Buttons -->
        <div class="tab-buttons">
          <button
            v-for="tab in ['personal', 'experience', 'education', 'skills']"
            :key="tab"
            @click="activeTab = tab"
            :class="['tab-btn', { active: activeTab === tab }]"
          >
            <i :class="{
              'fas fa-user':           tab === 'personal',
              'fas fa-briefcase':      tab === 'experience',
              'fas fa-graduation-cap': tab === 'education',
              'fas fa-code':           tab === 'skills'
            }"></i>
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <Transition name="fade" mode="out-in">

            <!-- Personal -->
            <div v-if="activeTab === 'personal'" class="content-panel" key="personal">
              <h3 class="panel-title">Data Scientist & ML Engineer</h3>
              <p class="panel-description">{{ T.about_p1 }}</p>
              <p class="panel-description">{{ T.about_p2 }}</p>
            </div>

            <!-- Experience -->
            <div v-else-if="activeTab === 'experience'" class="content-panel" key="experience">
              <h3 class="panel-title">~/work_history</h3>
              <div class="timeline">
                <div v-for="(item, index) in experienceItems" :key="index" class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-date">{{ item.date }}</span>
                    <h4 class="timeline-title">{{ item.title }}</h4>
                    <p class="timeline-company">{{ item.company }}</p>
                    <div class="code-block mt-3">
                      <div v-for="(d, i) in item.details" :key="i">
                        <span class="text-green">&gt;</span> {{ d }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education -->
            <div v-else-if="activeTab === 'education'" class="content-panel" key="education">
              <h3 class="panel-title">~/training_data</h3>
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
              <!-- Certifications -->
              <div class="cert-box">
                <h5 class="cert-title">
                  <i class="fas fa-certificate"></i> Verified Certifications
                </h5>
                <ul class="cert-list">
                  <li v-for="cert in certifications" :key="cert">
                    <i class="fas fa-check"></i> {{ cert }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Skills -->
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
  max-width: 820px;
  margin: 2rem auto 0;
}

/* Tab Buttons */
.tab-buttons {
  display: flex;
  background: rgba(13, 25, 48, 0.9);
  padding: 0.4rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 240, 255, 0.15);
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 110px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.04); }

.tab-btn.active {
  background: var(--accent);
  color: var(--bg);
  box-shadow: 0 4px 12px rgba(0, 240, 255, 0.25);
}

/* Tab Content */
.tab-content {
  height: 400px;
  position: relative;
  overflow: hidden;
}

.content-panel {
  padding: 1.75rem;
  background: linear-gradient(145deg, rgba(13, 25, 48, 0.92), rgba(5, 11, 20, 0.92));
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0; left: 0; right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-panel::-webkit-scrollbar { width: 4px; }
.content-panel::-webkit-scrollbar-track { background: transparent; }
.content-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.content-panel::-webkit-scrollbar-thumb:hover { background: var(--accent); }

.panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent);
  flex-shrink: 0;
}

.panel-description {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
  flex-shrink: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--accent), transparent);
}

.timeline-item { position: relative; }

.timeline-dot {
  position: absolute;
  left: -2.2rem;
  top: 0.2rem;
  width: 11px;
  height: 11px;
  background: var(--purple);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--purple);
}

.timeline-date {
  display: inline-block;
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.timeline-company {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.timeline-desc {
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.6;
}

.text-green { color: #00ff88; }

/* Certifications */
.cert-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 240, 255, 0.12);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  flex-shrink: 0;
}

.cert-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cert-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.cert-list li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cert-list li i { color: #00ff88; font-size: 0.7rem; }

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  align-content: start;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 240, 255, 0.04);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 8px;
  color: var(--text);
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  border-color: rgba(0, 240, 255, 0.35);
  transform: translateX(5px);
  background: rgba(0, 240, 255, 0.08);
}

.skill-item i { color: var(--accent); font-size: 0.9rem; }

/* Transition */
.fade-enter-active { transition: opacity 0.25s ease 0.05s; }
.fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 768px) {
  .tab-buttons { flex-direction: column; }
  .tab-btn { width: 100%; }
  .tab-content { height: 480px; }
  .skills-grid { grid-template-columns: 1fr; }
}
</style>