<script setup>
defineProps(['T'])
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-label">~/get_in_touch</div>
      <h2 class="section-title">Let's Work Together</h2>
      <p class="section-subtitle">
        Have a project in mind or just want to chat about data science?
        I'd love to hear from you.
      </p>

      <div class="contact-wrapper">

        <a href="mailto:andreanagari36@gmail.com" class="contact-card">
          <div class="contact-icon" style="background: linear-gradient(135deg, #00f0ff, #a855f7)">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="contact-info">
            <h4>Email</h4>
            <p>andreanagari36@gmail.com</p>
          </div>
          <i class="fas fa-arrow-right arrow-icon"></i>
        </a>

        <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="contact-card">
          <div class="contact-icon" style="background: linear-gradient(135deg, #0a66c2, #004182)">
            <i class="fab fa-linkedin"></i>
          </div>
          <div class="contact-info">
            <h4>LinkedIn</h4>
            <p>andrea-satria-nagari</p>
          </div>
          <i class="fas fa-arrow-right arrow-icon"></i>
        </a>

        <a href="https://github.com/GrmRy" target="_blank" class="contact-card">
          <div class="contact-icon" style="background: linear-gradient(135deg, #6e5494, #4a3872)">
            <i class="fab fa-github"></i>
          </div>
          <div class="contact-info">
            <h4>GitHub</h4>
            <p>github.com/GrmRy</p>
          </div>
          <i class="fas fa-arrow-right arrow-icon"></i>
        </a>

      </div>

      <div class="footer-note">
        <p>© 2026 Andrea Satria Nagari. Built with Vue.js & passion 💙</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 680px;
  margin: 2.5rem auto 0;
}

/* Card */
.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(145deg, rgba(13, 25, 48, 0.92), rgba(5, 11, 20, 0.92));
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 10px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.contact-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  border-color: rgba(0, 240, 255, 0.35);
  transform: translateX(8px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
}

.contact-card:hover::before { transform: scaleY(1); }
.contact-card:hover .arrow-icon { transform: translateX(5px); }

/* Icon */
.contact-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  flex-shrink: 0;
}

/* Info */
.contact-info {
  flex-grow: 1;
  text-align: left;
}

.contact-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.contact-info p {
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
}

/* Arrow */
.arrow-icon {
  color: var(--text-secondary);
  font-size: 1rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

/* Footer */
.footer-note {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 240, 255, 0.08);
}

.footer-note p {
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
}
</style>