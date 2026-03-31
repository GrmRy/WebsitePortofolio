<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Hero     from './components/Hero.vue'
import About    from './components/About.vue'
import Skills   from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact  from './components/Contact.vue'
import translations from './translations.js'

const currentLang = ref('en')
const T = ref(translations['en'])
function setLang(lang) {
  currentLang.value = lang
  T.value = translations[lang]
}

const TOTAL = 5
const cur   = ref(0)
const deck  = ref(null)

function go(n) {
  if (n < 0 || n >= TOTAL) return
  cur.value = n
  deck.value.style.transform = `translateY(-${n * 100}vh)`
}

let wLock = false
function onWheel(e) {
  if (wLock) return
  wLock = true
  go(e.deltaY > 0 ? cur.value + 1 : cur.value - 1)
  setTimeout(() => { wLock = false }, 800)
}

function onKey(e) {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') go(cur.value + 1)
  if (e.key === 'ArrowUp'   || e.key === 'PageUp')   go(cur.value - 1)
}

onMounted(() => {
  window.addEventListener('wheel',   onWheel, { passive: true })
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('wheel',   onWheel)
  window.removeEventListener('keydown', onKey)
})

const NAV_LABELS = ['Init', 'About', 'Skills', 'Projects', 'Contact']
const DOT_LABELS = ['Init', 'About', 'Skills', 'Projects', 'Contact']
</script>

<template>
  <nav>
    <div class="n-logo">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect x=".5" y=".5" width="19" height="19" fill="none" stroke="#38bdf8" stroke-width=".75"/>
        <path d="M0 10 L5 5 L9 13 L13 7 L17 10 L20 10" fill="none" stroke="#f59e0b" stroke-width="1.2"/>
      </svg>
      ASN.sys
    </div>
    <div class="n-links">
      <button
        v-for="(label, i) in NAV_LABELS" :key="i"
        :class="['n-link', { on: cur === i }]"
        @click="go(i)"
      >{{ label }}</button>
    </div>
    <div class="n-right">
      <button :class="['l-btn', { on: currentLang === 'en' }]" @click="setLang('en')">EN</button>
      <button :class="['l-btn', { on: currentLang === 'id' }]" @click="setLang('id')">ID</button>
    </div>
  </nav>

  <div class="pager">
    <button
      v-for="(label, i) in DOT_LABELS" :key="i"
      :class="['pg-dot', { on: cur === i }]"
      :data-label="label"
      @click="go(i)"
    ></button>
  </div>

  <div class="counter">
    <span class="counter-cur">{{ String(cur + 1).padStart(2, '0') }}</span>
    <span>&nbsp;/&nbsp;{{ String(TOTAL).padStart(2, '0') }}</span>
  </div>

  <div class="nav-arrows">
    <button class="arr-btn" :disabled="cur === 0" @click="go(cur - 1)">
      <i class="fas fa-chevron-up"></i>
    </button>
    <button class="arr-btn" :disabled="cur === TOTAL - 1" @click="go(cur + 1)">
      <i class="fas fa-chevron-down"></i>
    </button>
  </div>

  <!-- ── DECK ── -->
  <div id="deck" ref="deck">

    <!-- Setiap slide dibungkus div.slide — bukan langsung component -->
    <div class="slide" style="top: 0vh"   id="s0">
      <Hero     :T="T" @go="go" />
    </div>
    <div class="slide" style="top: 100vh" id="s1">
      <About    :T="T" />
    </div>
    <div class="slide" style="top: 200vh" id="s2">
      <Skills   :T="T" :active="cur === 2" />
    </div>
    <div class="slide" style="top: 300vh" id="s3">
      <Projects :T="T" />
    </div>
    <div class="slide" style="top: 400vh" id="s4">
      <Contact  :T="T" />
    </div>

  </div>
</template>

<style>
</style>