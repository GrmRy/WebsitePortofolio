<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineProps(['T'])

const isScrolled = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <div class="container nav-container">
      <a href="#" class="logo">A<span class="dot">.</span></a>
      
      <nav class="nav-links">
        <a href="#about"><span class="nav-num">01.</span> {{ T.nav_about }}</a>
        <a href="#expertise"><span class="nav-num">02.</span> {{ T.nav_expertise }}</a>
        <a href="#projects"><span class="nav-num">03.</span> {{ T.nav_projects }}</a>
        <a href="#contact"><span class="nav-num">04.</span> {{ T.nav_contact }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 100;
  transition: all 0.3s ease;
  background: rgba(10, 25, 47, 0.85); /* Transparan */
  backdrop-filter: blur(10px); /* Efek kaca buram */
}

.scrolled {
  height: 70px;
  box-shadow: 0 10px 30px -10px rgba(2,12,27,0.7);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-main);
  font-size: 13px;
  font-family: var(--font-mono);
}

.nav-links a:hover {
  color: var(--accent);
}

.nav-num {
  color: var(--accent);
}

@media (max-width: 768px) {
  .nav-links { display: none; } /* Perlu menu hamburger untuk mobile */
}
</style>