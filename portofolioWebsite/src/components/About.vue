<script setup>
import { ref } from 'vue'

defineProps(['T'])

const activeTab = ref('personal')


function setActiveTab(tabName) {
  activeTab.value = tabName
}
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <div class="section-number">01</div>
        <h2 class="section-title">{{ T.about_title }}</h2>
      </div>
      
      <div class="section-content about-layout">
        <div class="about-photo-placeholder">
          </div>

        <div class="about-content">
          <div class="tab-buttons">
            <button 
              @click="setActiveTab('personal')" 
              :class="{ 'active': activeTab === 'personal' }"
              class="tab-btn">
              Personal Info
            </button>
            <button 
              @click="setActiveTab('qualifications')" 
              :class="{ 'active': activeTab === 'qualifications' }"
              class="tab-btn">
              Qualifications
            </button>
            <button 
              @click="setActiveTab('skills')" 
              :class="{ 'active': activeTab === 'skills' }"
              class="tab-btn">
              Skills
            </button>
          </div>

          <div class="tab-content">
            <Transition name="fade" mode="out-in">
              <div v-if="activeTab === 'personal'" class="content-panel">
                <h3 class="panel-title">Data Scientist & Machine Learning Engineer</h3>
                <p class="panel-description">{{ T.about_p1 }} {{ T.about_p2 }}</p>
                </div>

              <else-if v-else-if="activeTab === 'qualifications'" class="content-panel">
                <h3 class="panel-title">My Journey</h3>
                 <div class="journey-columns">
                    <div>
                        <h4>Experience</h4>
                        <ul>
                            <li><strong>PT.Sriwahana Adityakarta</strong> - Data Support (2025-Now)</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Education</h4>
                        <ul>
                            <li><strong>Universitas Tidar</strong> - Electrical Engineering (2018-2024)</li>
                        </ul>
                    </div>
                 </div>
              </else-if>

              <else-if v-else-if="activeTab === 'skills'" class="content-panel">
                <h3 class="panel-title">Tools I Use Everyday</h3>
                <ul class="skills-list">
                  <li>Python</li>
                  <li>SQL</li>
                  <li>Scikit-learn</li>
                  <li>TensorFlow</li>
                  <li>Streamlit</li>
                  <li>Vue.js</li>
                </ul>
              </else-if>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: flex-start;
}

.about-photo-placeholder {
  width: 100%;
  padding-top: 120%; 
  background-color: var(--border);
  border-radius: 12px;
  /* Hapus ini jika Anda menggunakan tag <img> asli */
}

/* Styling untuk Tabs */
.tab-buttons {
  display: flex;
  background-color: rgba(0,0,0,0.2);
  padding: 0.5rem;
  border-radius: 30px;
  margin-bottom: 2rem;
  max-width: max-content;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: var(--text);
}

.tab-btn.active {
  background-color: var(--accent);
  color: var(--bg);
}

.tab-content {
  min-height: 250px; 
}

.panel-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.panel-description {
    color: var(--text-secondary);
    line-height: 1.8;
}

.journey-columns {
    display: flex;
    gap: 2rem;
}

.skills-list {
    list-style: none;
    padding: 0;
    columns: 2; 
}
.skills-list li {
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



@media (max-width: 768px) {
  .about-layout {
    grid-template-columns: 1fr; 
  }
  .about-photo-placeholder {
      display: none;
  }
}
</style>