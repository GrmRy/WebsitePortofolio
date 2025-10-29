<script setup>
import TypingAnimation from './TypingAnimation.vue'

defineProps(['T'])

const typingTexts = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Problem Solver',
  'Data Analyst'
]
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-label fade-in">
          <TypingAnimation :texts="typingTexts" />
        </div>
        <h1 class="hero-title fade-in">Andrea Satria Nagari</h1>
        <p class="hero-subtitle fade-in">{{ T.hero_subtitle }}</p>
        <div class="hero-socials fade-in">
          <a href="https://github.com/GrmRy" target="_blank" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="social-link">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-label {
  font-size: 1.125rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  font-weight: 600;
  min-height: 1.5em;
}
</style>