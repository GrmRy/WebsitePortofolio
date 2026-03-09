<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps(['T'])
const emit = defineEmits(['go'])

// ── WAVEFORM CANVAS ──
let waveAnimId = null

function initWave() {
  const wc = document.getElementById('waveCanvas')
  if (!wc) return
  const wx = wc.getContext('2d')
  wc.width  = wc.parentElement.offsetWidth
  wc.height = 52
  let wt = 0

  function drawWave() {
    const W = wc.width, H = wc.height
    wx.clearRect(0, 0, W, H)

    // grid lines
    wx.strokeStyle = '#1e2a38'
    wx.lineWidth   = 1
    for (let x = 0; x < W; x += 24) {
      wx.beginPath(); wx.moveTo(x, 0); wx.lineTo(x, H); wx.stroke()
    }
    wx.beginPath(); wx.moveTo(0, H / 2); wx.lineTo(W, H / 2); wx.stroke()

    // trace 1 — cyan
    wx.strokeStyle = 'rgba(56,189,248,.7)'
    wx.lineWidth   = 1.5
    wx.beginPath()
    for (let i = 0; i < W; i++) {
      const t = (i / W) * Math.PI * 10 + wt
      const y = H / 2 + Math.sin(t) * 14 + Math.sin(t * 2.1) * 5 + Math.sin(t * .4) * 4
      i === 0 ? wx.moveTo(i, y) : wx.lineTo(i, y)
    }
    wx.stroke()

    // trace 2 — amber
    wx.strokeStyle = 'rgba(245,158,11,.35)'
    wx.lineWidth   = 1
    wx.beginPath()
    for (let i = 0; i < W; i++) {
      const t = (i / W) * Math.PI * 10 + wt + 1.2
      const y = H / 2 + Math.sin(t * 1.6) * 9 + Math.cos(t * .7) * 5
      i === 0 ? wx.moveTo(i, y) : wx.lineTo(i, y)
    }
    wx.stroke()

    wt += .018
    waveAnimId = requestAnimationFrame(drawWave)
  }
  drawWave()

  const onResize = () => { wc.width = wc.parentElement.offsetWidth }
  window.addEventListener('resize', onResize)
}

// ── TERMINAL BOOT SEQUENCE ──
const LINES = [
  { d: 0,    h: `<span class="tp">$</span> <span class="tb">./boot_profile.sh</span>` },
  { d: 350,  h: `<span class="tm">Initializing...</span>` },
  { d: 700,  h: `<span class="tm">name    <span class="tv">= "Andrea Satria Nagari"</span></span>` },
  { d: 950,  h: `<span class="tm">role    <span class="tv">= "Data Scientist & ML Engineer"</span></span>` },
  { d: 1150, h: `<span class="tm">origin  <span class="tv">= "Untidar · EE '24"</span></span>` },
  { d: 1350, h: `<span class="tm">status  <span class="tg">= AVAILABLE</span></span>` },
  { d: 1600, h: `` },
  { d: 1700, h: `<span class="tm">import <span class="tv">scikit_learn</span>   <span class="tg">✓</span></span>` },
  { d: 1850, h: `<span class="tm">import <span class="tv">tensorflow</span>     <span class="tg">✓</span></span>` },
  { d: 2000, h: `<span class="tm">import <span class="tv">pandas</span>         <span class="tg">✓</span></span>` },
  { d: 2150, h: `<span class="tm">import <span class="tv">streamlit</span>      <span class="tg">✓</span></span>` },
  { d: 2350, h: `` },
  { d: 2450, h: `<span class="tm">tf_cert       <span class="tg">verified</span></span>` },
  { d: 2600, h: `<span class="tm">bangkit       <span class="tg">verified</span></span>` },
  { d: 2750, h: `<span class="tm">deployed      <span class="tv">3 / 3</span></span>` },
  { d: 2950, h: `<span class="tg">Ready.</span>` },
  { d: 3100, h: `<span class="tp">$</span> <span class="tblk"></span>` },
]

let termTimers = []

function initTerminal() {
  const tb = document.getElementById('termOut')
  if (!tb) return
  LINES.forEach(({ d, h }) => {
    const t = setTimeout(() => {
      const el = document.createElement('div')
      el.innerHTML = h || '&nbsp;'
      tb.appendChild(el)
      tb.scrollTop = tb.scrollHeight
    }, d)
    termTimers.push(t)
  })
}

onMounted(() => {
  initWave()
  initTerminal()
})

onUnmounted(() => {
  if (waveAnimId) cancelAnimationFrame(waveAnimId)
  termTimers.forEach(t => clearTimeout(t))
})
</script>

<template>
  <!-- ── INNER GRID ── -->
  <div class="inner">

    <!-- LEFT -->
    <div class="h-left">
      <div class="h-meta">
        <span class="avail-dot"></span>
        <span>status: available for hire</span>
        <span class="h-ver">v2.5</span>
      </div>

      <h1 class="h-name">
        <span class="n1">ANDREA</span>
        <span class="n2">SATRIA</span>
        <span class="n3">NAGARI</span>
      </h1>

      <div class="wave-wrap">
        <div class="wave-label">SIGNAL_01 — POWER_FORECAST</div>
        <canvas id="waveCanvas" style="width:100%;height:100%"></canvas>
      </div>

      <div class="h-btns">
        <a href="mailto:andreanagari36@gmail.com" class="btn-prim">
          <i class="fas fa-paper-plane"></i> Contact Me
        </a>
        <button class="btn-sec" @click="emit('go', 3)">
          <i class="fas fa-terminal"></i> View Work
        </button>
      </div>
    </div>

    <!-- RIGHT — terminal -->
    <div class="h-right">
      <div class="term-bar">
        <span class="tdot" style="background:#ff5f56"></span>
        <span class="tdot" style="background:#ffbd2e"></span>
        <span class="tdot" style="background:#27c93f"></span>
        <span class="tbar-title">bash — profile.sh</span>
      </div>

      <div class="term-body" id="termOut"></div>

      <div class="h-socials">
        <a href="https://github.com/GrmRy" target="_blank" class="soc">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/andrea-satria-nagari/" target="_blank" class="soc">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:andreanagari36@gmail.com" class="soc">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>

  </div>

  <!-- FOOTER STRIP -->
  <div class="slide-footer">
    <span class="sf-left">Data Scientist & ML Engineer</span>
    <span class="sf-right">
      Universitas Tidar · Bangkit Academy · <span>@GrmRy</span>
    </span>
  </div>
</template>

<style scoped>
/* ── INNER LAYOUT ── */
.inner {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 400px;
  padding-top: 48px;
  min-height: 0;
}

/* ── LEFT ── */
.h-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  border-right: 1px solid var(--border);
}

.h-meta {
  font-family: var(--mono);
  font-size: .68rem;
  color: var(--muted);
  letter-spacing: .2em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: .75rem;
}
.h-ver { margin-left: auto; }

.avail-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
  animation: blink-dot 3s ease-in-out infinite;
}

/* Name */
.h-name {
  font-weight: 900;
  line-height: .9;
  letter-spacing: -.04em;
  color: var(--bright);
  margin-bottom: 2.5rem;
}
.n1 {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  display: block;
  color: var(--bright);
}
.n2 {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  display: block;
  -webkit-text-stroke: 1px #2a3f58;
  -webkit-text-fill-color: transparent;
}
.n3 {
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  display: block;
  color: var(--cyan);
  -webkit-text-fill-color: var(--cyan);
}

/* Waveform */
.wave-wrap {
  width: 100%;
  height: 52px;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
  border-top:    1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.wave-label {
  position: absolute;
  top: 4px;
  left: 0;
  font-family: var(--mono);
  font-size: .58rem;
  color: var(--amber);
  letter-spacing: .12em;
  opacity: .6;
  pointer-events: none;
}

/* Buttons */
.h-btns { display: flex; gap: .75rem; }

.btn-prim {
  font-family: var(--mono);
  font-size: .73rem;
  padding: .75rem 1.5rem;
  border-radius: 2px;
  background: var(--cyan);
  color: var(--bg);
  border: none;
  cursor: pointer;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  transition: opacity .2s;
}
.btn-prim:hover { opacity: .85; }

.btn-sec {
  font-family: var(--mono);
  font-size: .73rem;
  padding: .75rem 1.5rem;
  border-radius: 2px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  letter-spacing: .1em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  transition: border-color .2s, color .2s;
}
.btn-sec:hover { border-color: var(--cyan); color: var(--cyan); }

/* ── RIGHT — terminal ── */
.h-right {
  background: var(--s1);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.term-bar {
  height: 34px;
  background: var(--s2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: .4rem;
  flex-shrink: 0;
}
.tdot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}
.tbar-title {
  margin: 0 auto;
  font-family: var(--mono);
  font-size: .62rem;
  color: var(--muted);
  letter-spacing: .08em;
}

.term-body {
  flex: 1;
  padding: 1.25rem;
  font-family: var(--mono);
  font-size: .75rem;
  line-height: 1.95;
  overflow: hidden;
  min-height: 0;
}

/* terminal text colors */
.term-body :deep(.tp) { color: var(--cyan); }
.term-body :deep(.tv) { color: var(--amber); }
.term-body :deep(.tg) { color: var(--green); }
.term-body :deep(.tm) { color: var(--muted); }
.term-body :deep(.tb) { color: var(--bright); }
.term-body :deep(.tblk) {
  display: inline-block;
  width: 7px;
  height: .85em;
  background: var(--cyan);
  vertical-align: middle;
  animation: blink .85s steps(1) infinite;
}

/* Socials */
.h-socials {
  border-top: 1px solid var(--border);
  padding: .85rem 1.25rem;
  display: flex;
  gap: .5rem;
  flex-shrink: 0;
}
.soc {
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  text-decoration: none;
  font-size: .85rem;
  transition: border-color .2s, color .2s;
}
.soc:hover { border-color: var(--cyan); color: var(--cyan); }

/* ── ANIMATIONS ── */
@keyframes blink-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: .35; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>