<script setup>
const props = defineProps(['project', 'T'])
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
      
      <!-- Header -->
      <div class="modal-header">
        <div class="modal-icon">
          <i :class="project.icon"></i>
        </div>
        <h2 class="modal-title">{{ T[project.titleKey] }}</h2>
        <p class="modal-subtitle">{{ T[project.descKey] }}</p>
      </div>

      <!-- Main Content -->
      <div class="modal-body">
        <!-- About Section -->
        <div v-if="project.detailedDesc" class="modal-section">
          <h3 class="section-title">
            <i class="fas fa-info-circle"></i> About This Project
          </h3>
          <p class="section-text">{{ project.detailedDesc }}</p>
        </div>

        <!-- Tech Stack -->
        <div v-if="project.techStack" class="modal-section">
          <h3 class="section-title">
            <i class="fas fa-code"></i> Tech Stack
          </h3>
          <div class="tech-grid">
            <span v-for="tech in project.techStack" :key="tech" class="tech-badge">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Key Features -->
        <div v-if="project.features" class="modal-section">
          <h3 class="section-title">
            <i class="fas fa-star"></i> Key Features
          </h3>
          <ul class="features-list">
            <li v-for="feature in project.features" :key="feature">
              <i class="fas fa-check-circle"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Challenges & Outcome (2 columns) -->
        <div class="two-column-section" v-if="project.challenges || project.outcome">
          <div v-if="project.challenges" class="modal-section">
            <h3 class="section-title">
              <i class="fas fa-mountain"></i> Challenges
            </h3>
            <p class="section-text">{{ project.challenges }}</p>
          </div>

          <div v-if="project.outcome" class="modal-section">
            <h3 class="section-title">
              <i class="fas fa-trophy"></i> Outcome
            </h3>
            <p class="section-text outcome-text">{{ project.outcome }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="modal-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="modal-footer">
        <a 
          v-if="project.liveDemoUrl" 
          :href="project.liveDemoUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-link primary"
        >
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
        
        <a 
          v-if="project.githubUrl"
          :href="project.githubUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-link secondary"
        >
          <i class="fab fa-github"></i> View Code
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  overflow-y: auto;
  padding: 2rem;
}

.modal-content {
  background-color: var(--bg);
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border);
  position: relative;
  animation: modalSlideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 217, 255, 0.2);
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.close-button:hover {
  background: var(--accent);
  color: var(--bg);
  transform: rotate(90deg);
}

/* Header */
.modal-header {
  text-align: center;
  padding: 3rem 3rem 2rem;
  background: linear-gradient(180deg, rgba(0, 217, 255, 0.05), transparent);
  border-bottom: 1px solid var(--border);
}

.modal-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 255, 136, 0.1));
  border: 2px solid rgba(0, 217, 255, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
  color: var(--accent);
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.modal-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.6;
}

/* Body */
.modal-body {
  padding: 2rem 3rem;
}

.modal-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  font-size: 1rem;
}

.section-text {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
}

.outcome-text {
  color: #00ff88;
  font-weight: 500;
}

/* Tech Stack Grid */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--accent);
  font-weight: 500;
  transition: all 0.2s;
}

.tech-badge:hover {
  background: rgba(0, 217, 255, 0.2);
  transform: translateY(-2px);
}

/* Features List */
.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.75rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.features-list li:last-child {
  border-bottom: none;
}

.features-list i {
  color: var(--accent);
  font-size: 1rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.features-list span {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Two Column Section */
.two-column-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Tags */
.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--accent);
}

/* Footer */
.modal-footer {
  padding: 2rem 3rem 3rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  border-top: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

.btn-link {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-link.primary {
  background: linear-gradient(135deg, var(--accent), #00ff88);
  color: var(--bg);
  border: none;
}

.btn-link.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 217, 255, 0.4);
}

.btn-link.secondary {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}

.btn-link.secondary:hover {
  background: rgba(0, 217, 255, 0.1);
  transform: translateY(-2px);
}

/* Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.modal-content::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-header {
    padding: 2rem 1.5rem 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    padding: 1.5rem;
    flex-direction: column;
  }

  .btn-link {
    width: 100%;
    justify-content: center;
  }

  .two-column-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}
</style>