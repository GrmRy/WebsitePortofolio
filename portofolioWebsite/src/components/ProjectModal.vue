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
      
      <h2 class="modal-title">{{ T[project.titleKey] }}</h2>
      <p class="modal-description">{{ T[project.descKey] }}</p>
      
      <div class="modal-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="modal-links">
        <a 
          v-if="project.liveDemoUrl" 
          :href="project.liveDemoUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-link"
        >
          Live Demo <i class="fas fa-external-link-alt"></i>
        </a>
        
        <a 
          v-if="project.githubUrl"
          :href="project.githubUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-link"
        >
          View Code <i class="fab fa-github"></i>
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: var(--bg);
  padding: 3rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  border: 1px solid var(--border);
  position: relative;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}
.close-button:hover {
  color: var(--text);
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.modal-tags {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.modal-links {
  display: flex;
  gap: 1rem;
}

.btn-link {
    text-decoration: none;
    color: var(--accent);
    border: 1px solid var(--accent);
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s;
}
.btn-link:hover {
    background-color: var(--accent);
    color: var(--bg);
}
</style>