<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  const progress = (scrollTop / (documentHeight - windowHeight)) * 100
  scrollProgress.value = Math.min(progress, 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="scroll-progress-container">
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
  </div>
</template>

<style scoped>
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 9999;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00d9ff, #00ff88);
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}
</style>