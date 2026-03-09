<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps(['T'])

// ── RADAR CHART ──
let radarAnimId = null

function drawRadar() {
  const rc = document.getElementById('radarCanvas')
  if (!rc) return

  const W = 260, H = 200
  rc.width  = W
  rc.height = H
  const rx = rc.getContext('2d')

  const axes = [
    { l: 'ML/DL',    v: .92 },
    { l: 'Python',   v: .95 },
    { l: 'Analytics',v: .85 },
    { l: 'Deploy',   v: .80 },
    { l: 'Viz',      v: .82 },
    { l: 'EE',       v: .78 },
  ]

  const N  = axes.length
  const CX = W / 2
  const CY = H / 2 + 4
  const R  = Math.min(W, H) * .36

  const pt = (i, r) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
  }

  // grid rings
  ;[.25, .5, .75, 1].forEach(f => {
    rx.strokeStyle = '#1e2a38'
    rx.lineWidth   = 1
    rx.beginPath()
    for (let i = 0; i < N; i++) {
      const p = pt(i, R * f)
      i === 0 ? rx.moveTo(p.x, p.y) : rx.lineTo(p.x, p.y)
    }
    rx.closePath()
    rx.stroke()
  })

  // axis lines
  for (let i = 0; i < N; i++) {
    const p = pt(i, R)
    rx.strokeStyle = '#1e2a38'
    rx.lineWidth   = 1
    rx.beginPath()
    rx.moveTo(CX, CY)
    rx.lineTo(p.x, p.y)
    rx.stroke()
  }

  // data fill
  rx.fillStyle   = 'rgba(56,189,248,.1)'
  rx.strokeStyle = 'rgba(56,189,248,.6)'
  rx.lineWidth   = 1.5
  rx.beginPath()
  axes.forEach(({ v }, i) => {
    const p = pt(i, R * v)
    i === 0 ? rx.moveTo(p.x, p.y) : rx.lineTo(p.x, p.y)
  })
  rx.closePath()
  rx.fill()
  rx.stroke()

  // data points
  axes.forEach(({ v }, i) => {
    const p = pt(i, R * v)
    rx.fillStyle = v > .88 ? '#f59e0b' : '#38bdf8'
    rx.beginPath()
    rx.arc(p.x, p.y, 3, 0, Math.PI * 2)
    rx.fill()
  })

  // axis labels
  axes.forEach(({ l }, i) => {
    const p  = pt(i, R * 1.2)
    rx.fillStyle    = '#475569'
    rx.font         = '9px IBM Plex Mono'
    rx.textAlign    = 'center'
    rx.textBaseline = 'middle'
    rx.fillText(l, p.x, p.y)
  })
}

onMounted(() => { drawRadar() })
onUnmounted(() => {
  if (radarAnimId) cancelAnimationFrame(radarAnimId)
})

const interests = [
  'Data Scientist / ML Engineer',
  'Data Analyst',
  'Remote or On-site (Indonesia)',
]

const socials = [
  {
    href:  'https://www.linkedin.com/in/andrea-satria-nagari/',
    bg:    '#0a66c2',
    icon:  'fab fa-linkedin',
    label: 'LinkedIn',
    sub:   'andrea-satria-nagari',
  },
  {
    href:  'https://github.com/GrmRy',
    bg:    '#2d333b',
    icon:  'fab fa-github',
    label: 'GitHub',
    sub:   'github.com/GrmRy',
  },
]
</script>

<template>
  <div class="inner">

    <!-- ── LEFT ── -->
    <div class="c-left">
      <div class="chip">~ / get_in_touch</div>

      <h2 class="c-big">
        Let's Build<br>
        Something<br>
        <em>Together</em>
      </h2>

      <p class="c-sub">
        Open to full-time roles, freelance, or collaboration
        in data science, ML engineering, or analytics.
      </p>

      <a href="mailto:andreanagari36@gmail.com" class="c-email">
        <i class="fas fa-envelope"></i>
        andreanagari36@gmail.com
      </a>

      <div class="c-socs">
        
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          class="c-soc"
        <a>
          <div class="c-ico" :style="{ background: s.bg }">
            <i :class="s.icon"></i>
          </div>
          <div class="c-info">
            <h4>{{ s.label }}</h4>
            <p>{{ s.sub }}</p>
          </div>
          <i class="fas fa-arrow-right c-arr"></i>
        </a>
      </div>
    </div>

    <!-- ── RIGHT ── -->
    <div class="c-right">

      <!-- availability card -->
      <div class="avail-card">
        <div class="av-top">
          <div class="av-ind">
            <div class="av-dot"></div>
            <span class="av-label">AVAILABLE NOW</span>
          </div>
          <div class="av-title">Open for Opportunities</div>
          <div class="av-desc">
            Currently seeking roles where I can apply ML engineering,
            data science, and analytics skills.
          </div>
        </div>
        <div class="interest-list">
          <div
            v-for="item in interests"
            :key="item"
            class="int-item"
          >
            <i class="fas fa-circle"></i>
            {{ item }}
          </div>
        </div>
      </div>

      <!-- radar chart -->
      <div class="radar-box">
        <div class="radar-hdr">Skill Radar</div>
        <div class="radar-body">
          <canvas id="radarCanvas"></canvas>
        </div>
      </div>

    </div>
  </div>

  <!-- FOOTER STRIP -->
  <div class="slide-footer">
    <span class="sf-left">© 2026 Andrea Satria Nagari</span>
    <span class="sf-right">Built with Vue.js — <span>v3.5</span></span>
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
.c-left {
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--border);
}

.c-big {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -.03em;
  color: var(--bright);
  margin-bottom: 1rem;
}
.c-big em {
  font-style: normal;
  color: var(--cyan);
}

.c-sub {
  color: var(--muted);
  font-size: .9rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

/* email button */
.c-email {
  font-family: var(--mono);
  font-size: .8rem;
  color: var(--cyan);
  display: inline-flex;
  align-items: center;
  gap: .65rem;
  padding: .9rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: 2px;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: border-color .25s, background .25s;
}
.c-email:hover {
  border-color: var(--cyan);
  background: rgba(56, 189, 248, .05);
}

/* social cards */
.c-socs {
  display: flex;
  flex-direction: column;
  gap: .65rem;
}

.c-soc {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .85rem 1.1rem;
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  text-decoration: none;
  transition: border-color .25s, transform .25s;
  position: relative;
  overflow: hidden;
}
.c-soc::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--cyan);
  transform: scaleY(0);
  transition: transform .25s;
  transform-origin: bottom;
}
.c-soc:hover::before { transform: scaleY(1); }
.c-soc:hover {
  border-color: rgba(56, 189, 248, .3);
  transform: translateX(4px);
}

.c-ico {
  width: 34px;
  height: 34px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
  color: #fff;
  flex-shrink: 0;
}
.c-info h4 {
  font-size: .85rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: .1rem;
}
.c-info p {
  font-family: var(--mono);
  font-size: .68rem;
  color: var(--muted);
}
.c-arr {
  margin-left: auto;
  color: var(--muted);
  font-size: .78rem;
  transition: transform .25s;
}
.c-soc:hover .c-arr { transform: translateX(4px); }

/* ── RIGHT ── */
.c-right {
  padding: 3.5rem 2.5rem 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
}

/* availability card */
.avail-card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.av-top {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.av-ind {
  display: flex;
  align-items: center;
  gap: .6rem;
  margin-bottom: .75rem;
}
.av-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  animation: blink-dot 2s infinite;
}
.av-label {
  font-family: var(--mono);
  font-size: .65rem;
  color: var(--green);
  letter-spacing: .15em;
}
.av-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--bright);
  margin-bottom: .4rem;
}
.av-desc {
  color: var(--muted);
  font-size: .82rem;
  line-height: 1.65;
}

.interest-list {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .4rem;
}
.int-item {
  display: flex;
  align-items: center;
  gap: .65rem;
  font-family: var(--mono);
  font-size: .7rem;
  color: var(--muted);
}
.int-item i {
  color: var(--amber);
  font-size: .45rem;
}

/* radar */
.radar-box {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 1.25rem;
}
.radar-hdr {
  font-family: var(--mono);
  font-size: .62rem;
  color: var(--amber);
  letter-spacing: .15em;
  text-transform: uppercase;
  margin-bottom: .75rem;
}
.radar-body {
  display: flex;
  justify-content: center;
}

/* animation */
@keyframes blink-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: .35; }
}
</style>