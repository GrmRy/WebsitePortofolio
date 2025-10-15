<script setup>
defineProps(['currentLang', 'isLightMode', 'T'])
const emit = defineEmits(['setLanguage', 'toggleTheme'])
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <a href="#" class="logo">A/S</a>
        <div class="nav-links">
          <a href="#about">{{ T.nav_about }}</a>
          <a href="#expertise">{{ T.nav_expertise }}</a>
          <a href="#projects">{{ T.nav_projects }}</a>
          <a href="#contact">{{ T.nav_contact }}</a>
        </div>
        <div class="controls">
          <button class="btn-control" :class="{ active: currentLang === 'id' }" @click="emit('setLanguage', 'id')">ID</button>
          <button class="btn-control" :class="{ active: currentLang === 'en' }" @click="emit('setLanguage', 'en')">EN</button>
          <button class="btn-control" @click="emit('toggleTheme')">
            <i :class="isLightMode ? 'fas fa-moon' : 'fas fa-sun'"></i>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>