<script setup>
defineProps(['T'])
</script>

<template>
   <footer>
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Andrea Satria Nagari</p>
        <p class="footer-text">{{ T.footer_text }}</p>
      </div>
    </div>
  </footer>
</template>