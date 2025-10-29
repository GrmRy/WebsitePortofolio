<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['texts'])

const displayText = ref('')
const currentIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let typingTimeout = null

const type = () => {
  const currentText = props.texts[currentIndex.value]

  if (!isDeleting.value) {
    // Typing
    displayText.value = currentText.substring(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === currentText.length) {
      // Pause before deleting
      typingTimeout = setTimeout(() => {
        isDeleting.value = true
        type()
      }, 2000)
      return
    }
  } else {
    // Deleting
    displayText.value = currentText.substring(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
    }
  }

  const typingSpeed = isDeleting.value ? 50 : 100
  typingTimeout = setTimeout(type, typingSpeed)
}

onMounted(() => {
  typingTimeout = setTimeout(type, 500)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <span class="typing-text">
    {{ displayText }}<span class="cursor">|</span>
  </span>
</template>

<style scoped>
.typing-text {
  display: inline-block;
  min-height: 1.5em;
}

.cursor {
  animation: blink 1s infinite;
  color: var(--accent);
  font-weight: 300;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>