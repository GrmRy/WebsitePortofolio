<script setup>
defineProps(['T'])
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="contact-wrapper">
        <div class="section-label">Get In Touch</div>
        <h2 class="section-title">Let's Work Together</h2>
        <p class="contact-description">
          Have a project in mind or just want to chat about data science? 
          I'd love to hear from you!
        </p>
        
        <div class="contact-methods">
          <a href="mailto:andreanagari36@gmail.com" class="contact-card email-card">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-info">
              <h4>Email</h4>
              <p>andreanagari36@gmail.com</p>
            </div>
            <i class="fas fa-arrow-right arrow-icon"></i>
          </a>
          
          <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="contact-card linkedin-card">
            <div class="contact-icon">
              <i class="fab fa-linkedin"></i>
            </div>
            <div class="contact-info">
              <h4>LinkedIn</h4>
              <p>Connect with me</p>
            </div>
            <i class="fas fa-arrow-right arrow-icon"></i>
          </a>
          
          <a href="https://github.com/GrmRy" target="_blank" class="contact-card github-card">
            <div class="contact-icon">
              <i class="fab fa-github"></i>
            </div>
            <div class="contact-info">
              <h4>GitHub</h4>
              <p>Check out my code</p>
            </div>
            <i class="fas fa-arrow-right arrow-icon"></i>
          </a>
        </div>
        
        <div class="footer-note">
          <p>© 2025 Andrea Satria Nagari. Built with passion and Vue.js 💙</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-wrapper {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  animation: contactZoomIn 0.8s ease;
}

@keyframes contactZoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.contact-description {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.contact-card:hover::before {
  transform: scaleY(1);
}

.contact-card:hover .arrow-icon {
  transform: translateX(5px);
}

.email-card:hover {
  border-color: var(--accent);
}

.linkedin-card:hover {
  border-color: #0a66c2;
}

.github-card:hover {
  border-color: #6e5494;
}

.contact-icon {
  width: 55px;
  height: 55px;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--accent), var(--purple));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.linkedin-card .contact-icon {
  background: linear-gradient(135deg, #0a66c2, #004182);
}

.github-card .contact-icon {
  background: linear-gradient(135deg, #6e5494, #4a3872);
}

.contact-info {
  flex-grow: 1;
  text-align: left;
}

.contact-info h4 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.contact-info p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.arrow-icon {
  color: var(--text-secondary);
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.footer-note {
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
}

.footer-note p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .contact-card {
    padding: 1.5rem;
  }
  
  .contact-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .contact-info h4 {
    font-size: 1rem;
  }
  
  .contact-info p {
    font-size: 0.875rem;
  }
}
</style>