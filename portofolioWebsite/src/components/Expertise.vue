<script setup>
import { ref } from 'vue'
defineProps(['T'])

const expertiseItems = ref([
  { icon: 'fas fa-brain', titleKey: 'exp1_title', descKey: 'exp1_desc' },
  { icon: 'fas fa-chart-line', titleKey: 'exp2_title', descKey: 'exp2_desc' },
  { icon: 'fas fa-code', titleKey: 'exp3_title', descKey: 'exp3_desc' },
])
</script>

<template>
  <section id="expertise" class="section">
    <div class="container">
      <div class="section-header">
        <div class="section-number">02</div>
        <h2 class="section-title">{{ T.expertise_title }}</h2>
      </div>
      <div class="section-content">
        <div class="expertise-grid">
          <div v-for="item in expertiseItems" :key="item.titleKey" class="expertise-card">
            <div class="expertise-icon">
              <i :class="item.icon"></i>
            </div>
            <h3 class="expertise-title">{{ T[item.titleKey] }}</h3>
            <p class="expertise-desc">{{ T[item.descKey] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>