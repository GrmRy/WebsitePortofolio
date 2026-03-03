<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps(['T'])

const typingTexts = ['Data Scientist', 'ML Engineer', 'Problem Solver', 'Data Analyst']
const displayText = ref('')
const currentIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let typingTimeout = null

const type = () => {
  const currentText = typingTexts[currentIndex.value]

  if (!isDeleting.value) {
    displayText.value = currentText.substring(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === currentText.length) {
      typingTimeout = setTimeout(() => {
        isDeleting.value = true
        type()
      }, 1800)
      return
    }
  } else {
    displayText.value = currentText.substring(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % typingTexts.length
    }
  }

  typingTimeout = setTimeout(type, isDeleting.value ? 45 : 95)
}

onMounted(() => { typingTimeout = setTimeout(type, 500) })
onUnmounted(() => { if (typingTimeout) clearTimeout(typingTimeout) })
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">

        <!-- Status Badge -->
        <div class="hero-badge fade-in">
          <span class="status-dot"></span>
          Available for opportunities
        </div>

        <!-- Nama dengan Glitch -->
        <h1
          class="hero-title glitch-wrapper fade-in"
          data-text="ANDREA SATRIA NAGARI"
        >
          ANDREA SATRIA NAGARI
        </h1>

        <!-- Typing Role -->
        <div class="hero-typing fade-in">
          <span class="typing-label">const role = </span>
          <span class="typing-text">"{{ displayText }}"</span>
          <span class="cursor">|</span>
        </div>

        <!-- Subtitle -->
        <p class="hero-description fade-in">{{ T.hero_subtitle }}</p>

        <!-- CTA -->
        <div class="hero-actions fade-in">
          <a href="mailto:andreanagari36@gmail.com" class="btn btn-primary">
            <i class="fas fa-envelope"></i> CONTACT ME
          </a>
          <a href="#projects" class="btn btn-outline">
            <i class="fas fa-terminal"></i> VIEW WORK
          </a>
        </div>

        <!-- Socials -->
        <div class="hero-socials fade-in">
          <a href="https://github.com/GrmRy" target="_blank" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="social-link">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:andreanagari36@gmail.com" class="social-link">
            <i class="fas fa-envelope"></i>
          </a>
        </div>

      </div>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-hint">
      <span>scroll to explore</span>
      <i class="fas fa-chevron-down"></i>
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
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 2rem;
  color: var(--accent);
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 1.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(1.3); }
}

/* Glitch */
.glitch-wrapper {
  position: relative;
  display: inline-block;
}

.glitch-wrapper::before,
.glitch-wrapper::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0.8;
}

.glitch-wrapper::before {
  left: 2px;
  text-shadow: -2px 0 #ff003c;
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch 3s infinite linear alternate-reverse;
}

.glitch-wrapper::after {
  left: -2px;
  text-shadow: -2px 0 #00f0ff;
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch 2.5s infinite linear alternate-reverse;
}

@keyframes glitch {
  0%   { clip: rect(10px, 9999px, 83px, 0); }
  20%  { clip: rect(62px, 9999px, 12px, 0); }
  40%  { clip: rect(44px, 9999px, 53px, 0); }
  60%  { clip: rect(88px, 9999px,  9px, 0); }
  80%  { clip: rect( 2px, 9999px, 66px, 0); }
  100% { clip: rect(91px, 9999px, 34px, 0); }
}

/* Title */
.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: white;
  margin-bottom: 1.25rem;
  animation: floating 3.5s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

/* Typing */
.hero-typing {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.typing-label { color: var(--purple); }
.typing-text  { color: var(--accent); min-width: 200px; }

.cursor {
  color: var(--accent);
  font-weight: 300;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Description */
.hero-description {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 560px;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

/* Socials */
.hero-socials {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(13, 25, 48, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 240, 255, 0.3);
}

/* Scroll Hint */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  animation: bounce 2s infinite;
}

.scroll-hint i { color: var(--accent); }

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-8px); }
}

/* Responsive */
@media (max-width: 768px) {
  .glitch-wrapper::before,
  .glitch-wrapper::after { display: none; }

  .hero-actions { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
  .scroll-hint { display: none; }
}
</style>