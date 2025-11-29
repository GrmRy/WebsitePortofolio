<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = ref([])
const currentSection = ref(0)

// Function untuk scroll ke section tertentu
const scrollToSection = (index) => {
  currentSection.value = index
  const section = sections.value[index]
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Detect section mana yang lagi visible
const updateCurrentSection = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2
  
  sections.value.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const sectionBottom = sectionTop + rect.height
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection.value = index
    }
  })
}

onMounted(() => {
  sections.value = Array.from(document.querySelectorAll('.fullpage-section'))
  window.addEventListener('scroll', updateCurrentSection)
  updateCurrentSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurrentSection)
})
</script>

<template>
  <div class="fullpage-scroll">
    <!-- Navigation Dots -->
    <div class="scroll-navigation">
      <button
        v-for="(section, index) in sections"
        :key="index"
        @click="scrollToSection(index)"
        :class="{ 'active': currentSection === index }"
        class="nav-dot"
        :aria-label="`Go to section ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.scroll-navigation {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.nav-dot:hover {
  border-color: var(--accent);
  transform: scale(1.2);
}

.nav-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

@media (max-width: 768px) {
  .scroll-navigation {
    right: 1rem;
    gap: 0.75rem;
  }
  
  .nav-dot {
    width: 10px;
    height: 10px;
  }
}
</style>