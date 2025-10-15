<script setup>
defineProps(['T'])
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <div class="section-number">01</div>
        <h2 class="section-title">{{ T.about_title }}</h2>
      </div>
      <div class="section-content">
        <div class="about-text">
          <p>{{ T.about_p1 }}</p>
          <p>{{ T.about_p2 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>