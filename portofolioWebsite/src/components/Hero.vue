<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps(['T'])

const typingTexts = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Problem Solver',
  'Data Analyst'
]

const displayText = ref('')
const currentIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let typingTimeout = null

const type = () => {
  const currentText = typingTexts[currentIndex.value]

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
      currentIndex.value = (currentIndex.value + 1) % typingTexts.length
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
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge fade-in">
          <span class="status-dot"></span>
          Available for opportunities
        </div>
        
        <h1 class="hero-title fade-in">
          Hi, I'm <span class="gradient-text">Andrea</span> 👋
        </h1>
        
        <div class="hero-typing fade-in">
          <span class="typing-label">I'm a </span>
          <span class="typing-text">{{ displayText }}<span class="cursor">|</span></span>
        </div>
        
        <p class="hero-description fade-in">
          {{ T.hero_subtitle }}
        </p>
        
        <div class="hero-actions fade-in">
          <a href="#contact" class="btn btn-primary">
            <i class="fas fa-envelope"></i>
            Get in touch
          </a>
          <a href="#projects" class="btn btn-outline">
            <i class="fas fa-code"></i>
            View my work
          </a>
        </div>
        
        <div class="hero-socials fade-in">
          <a href="https://github.com/GrmRy" target="_blank" class="social-link" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="social-link" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:andreanagari36@gmail.com" class="social-link" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      
      <div class="hero-decoration">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 800px;
  position: relative;
  z-index: 10;
  animation: heroEnter 1s ease;
}

@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 2rem;
  color: var(--green);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--green);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.hero-title {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.hero-typing {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.typing-label {
  color: var(--text-secondary);
}

.typing-text {
  color: var(--accent);
  display: inline-block;
  min-width: 300px;
}

.cursor {
  color: var(--accent);
  font-weight: 300;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), var(--purple), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.hero-socials {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

/* Floating Shapes */
.hero-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: var(--accent);
  top: 10%;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: var(--purple);
  bottom: 10%;
  left: -50px;
  animation: float 6s ease-in-out infinite 1s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: var(--pink);
  top: 50%;
  right: 20%;
  animation: float 7s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .hero-typing {
    font-size: 1.5rem;
    min-height: 2.5rem;
  }

  .typing-text {
    min-width: 200px;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .floating-shape {
    display: none;
  }
}
</style>