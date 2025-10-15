<script setup>
defineProps(['T'])
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-label fade-in">{{ T.hero_label }}</div>
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