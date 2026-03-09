<script setup>
import { watch, ref } from 'vue'

const props = defineProps(['T', 'active'])

const skills = [
  { n: 'Python',      p: 95 },
  { n: 'Pandas',      p: 90 },
  { n: 'Scikit-learn',p: 87 },
  { n: 'TensorFlow',  p: 83 },
  { n: 'SQL',         p: 82 },
  { n: 'Streamlit',   p: 88 },
  { n: 'NumPy',       p: 90 },
  { n: 'PyQt5',       p: 76 },
]

const certs = [
  { icon: 'fas fa-certificate', label: 'Tensorflow Developer Certificate'      },
  { icon: 'fas fa-brain',       label: 'DeepLearning.AI TensorFlow Developer'  },
  { icon: 'fas fa-cloud',       label: 'TensorFlow: Data and Deployment'       },
  { icon: 'fas fa-calculator',  label: 'Mathematics for Machine Learning'      },
  { icon: 'fab fa-python',      label: 'Google IT Automation With Python'      },
]

// fill widths — 0% by default, animate when slide becomes active
const fills = ref(skills.map(() => '0%'))
let triggered = false

watch(() => props.active, (val) => {
  if (!val || triggered) return
  triggered = true
  skills.forEach((sk, i) => {
    setTimeout(() => {
      fills.value[i] = sk.p + '%'
    }, i * 110)
  })
})
</script>

<template>
  <div class="inner">

    <!-- LEFT — skill bars -->
    <div class="sk-left">
      <div class="chip">~ / tech_stack</div>
      <h2 class="sk-title">Skills &amp;<br>Tools</h2>

      <div class="sk-list">
        <div
          v-for="(sk, i) in skills"
          :key="sk.n"
          class="sk-row"
        >
          <span class="sk-name">{{ sk.n }}</span>
          <div class="sk-track">
            <div
              class="sk-fill"
              :style="{ width: fills[i] }"
            ></div>
          </div>
          <span class="sk-pct">{{ sk.p }}%</span>
        </div>
      </div>
    </div>

    <!-- RIGHT — certifications -->
    <div class="sk-right">
      <div class="chip" style="margin-bottom:1.25rem">
        Verified Certifications
      </div>

      <div class="cert-box">
        <div class="cert-hdr">
          <i class="fas fa-shield-halved"></i>
          Issued Certificates
        </div>

        <div
          v-for="cert in certs"
          :key="cert.label"
          class="cert-item"
        >
          <div class="cert-ico">
            <i :class="cert.icon"></i>
          </div>
          <div class="cert-txt">{{ cert.label }}</div>
        </div>
      </div>

      <!-- extra info box -->
      <div class="extra-box">
        <div class="extra-row">
          <span class="extra-label">Bangkit Academy</span>
          <span class="extra-val">Google · 2023</span>
        </div>
        <div class="extra-row">
          <span class="extra-label">Focus Area</span>
          <span class="extra-val">Machine Learning Track</span>
        </div>
        <div class="extra-row">
          <span class="extra-label">Projects Deployed</span>
          <span class="extra-val cyan">3 / 3 live</span>
        </div>
        <div class="extra-row">
          <span class="extra-label">Primary Stack</span>
          <span class="extra-val">Python · SQL · Cloud</span>
        </div>
      </div>
    </div>

  </div>

  <!-- FOOTER STRIP -->
  <div class="slide-footer">
    <span class="sf-left">~/tech_stack</span>
    <span class="sf-right">Slide <span>03</span> / 05</span>
  </div>
</template>

<style scoped>
/* ── INNER LAYOUT ── */
.inner {
  flex: 1;
  padding-top: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 0;
}

/* ── LEFT ── */
.sk-left {
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--border);
}

.sk-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  color: var(--bright);
  letter-spacing: -.03em;
  margin-bottom: 2rem;
  line-height: 1.1;
}

/* Skill bars */
.sk-list {
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

.sk-row {
  display: flex;
  align-items: center;
  gap: .85rem;
}

.sk-name {
  font-family: var(--mono);
  font-size: .73rem;
  color: var(--text);
  width: 110px;
  flex-shrink: 0;
}

.sk-track {
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 1px;
  overflow: hidden;
}

.sk-fill {
  height: 100%;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--cyan) 0%, var(--amber) 100%);
  width: 0%;
  transition: width 1.1s cubic-bezier(.4, 0, .2, 1);
}

.sk-pct {
  font-family: var(--mono);
  font-size: .62rem;
  color: var(--muted);
  width: 30px;
  text-align: right;
  flex-shrink: 0;
}

/* ── RIGHT ── */
.sk-right {
  padding: 3.5rem 2.5rem 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
}

/* Cert box */
.cert-box {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.cert-hdr {
  padding: .75rem 1.25rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--mono);
  font-size: .65rem;
  color: var(--amber);
  letter-spacing: .18em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: .5rem;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: .85rem;
  padding: .7rem 1.25rem;
  border-bottom: 1px solid var(--border);
  transition: background .2s;
}
.cert-item:last-child { border-bottom: none; }
.cert-item:hover { background: rgba(56, 189, 248, .04); }

.cert-ico {
  width: 26px;
  height: 26px;
  border-radius: 2px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--amber);
  font-size: .68rem;
  flex-shrink: 0;
}

.cert-txt {
  font-family: var(--mono);
  font-size: .72rem;
  color: var(--text);
}

/* Extra info box */
.extra-box {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.extra-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .6rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.extra-row:last-child { border-bottom: none; }

.extra-label {
  font-family: var(--mono);
  font-size: .65rem;
  color: var(--muted);
  letter-spacing: .08em;
}

.extra-val {
  font-family: var(--mono);
  font-size: .65rem;
  color: var(--text);
}

.extra-val.cyan { color: var(--cyan); }
</style>