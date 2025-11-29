<script setup>
import { ref, onMounted } from 'vue'

defineProps(['items'])

const visibleItems = ref([])

const observeItems = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          if (!visibleItems.value.includes(index)) {
            visibleItems.value.push(index)
          }
        }
      })
    },
    { threshold: 0.3 }
  )

  document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item)
  })
}

onMounted(() => {
  setTimeout(observeItems, 100)
})
</script>

<template>
  <div class="timeline">
    <div
      v-for="(item, index) in items"
      :key="index"
      :data-index="index"
      class="timeline-item"
      :class="{ 'visible': visibleItems.includes(index) }"
    >
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">{{ item.date }}</div>
        <h4 class="timeline-title">{{ item.title }}</h4>
        <p class="timeline-company">{{ item.company }}</p>
        <p class="timeline-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
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
  padding-bottom: 3rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent);
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 6px var(--accent);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 8px var(--accent);
}

.timeline-content {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  border-color: var(--accent);
  transform: translateX(10px);
  background-color: rgba(0, 217, 255, 0.05);
}

.timeline-date {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.timeline-company {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.timeline-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-dot {
    left: -2rem;
  }
}
</style>