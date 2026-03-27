<script setup>
import { ref } from 'vue'

import imgLoan      from '@/assets/proj-loan.png'
import imgKpi       from '@/assets/proj-kpi.png'
import imgSentiment from '@/assets/proj-sentiment.png'

defineProps(['T'])

const hovered = ref(null)

const projects = [
  {
    id:    0,
    num:   'PROJECT_01 / ML_CLASSIFICATION',
    title: 'Loan Approval Predictor',
    desc:  'End-to-end ML system analyzing credit history, income & employment. Real-time approval prediction with 92% accuracy.',
    tags:  ['Scikit-learn', 'Streamlit', 'Pandas'],
    demo:  'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:  'https://github.com/GrmRy/LoanPredict',
    img:   imgLoan,
    accent: '#38bdf8',
    col:   0,
    badge: { label: 'Accuracy 92%', t: '' },
  },
  {
    id:    1,
    num:   'PROJECT_02 / BI_DASHBOARD',
    title: 'Sales KPI Dashboard',
    desc:  'Interactive BI platform visualizing sales metrics. Reduced reporting time by 70%.',
    tags:  ['Plotly', 'Streamlit', 'SQL'],
    demo:  'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:  'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    img:   imgKpi,
    accent: '#f59e0b',
    col:   1,
    badge: { label: 'Revenue +24%', t: 'am' },
  },
  {
    id:    2,
    num:   'PROJECT_03 / NLP',
    title: 'Sentiment Analysis',
    desc:  'NLP pipeline for HOK reviews via Play Store scraping. 85% confidence.',
    tags:  ['NLTK', 'Scikit-learn', 'NLP'],
    demo:  'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    repo:  'https://github.com/GrmRy/HOK_SentimentAnalysis',
    img:   imgSentiment,
    accent: '#34d399',
    col:   1,
    badge: { label: 'Pos 62%', t: 'gr' },
  },
]

const hovCol = () =>
  hovered.value === null ? 'none' : String(projects[hovered.value].col)
</script>

<template>
  <!-- .inner + .slide-footer = exact same structure as About.vue / Skills.vue -->
  <div class="inner">

    <div class="proj-hdr">
      <div class="chip">~ / project_builds</div>
    </div>

    <div class="bento" :class="`hc-${hovCol()}`">

      <!-- CARD 0 — tall left column -->
      <div
        class="card"
        :class="{ on: hovered === 0 }"
        :style="{ '--ac': projects[0].accent }"
        @mouseenter="hovered = 0"
        @mouseleave="hovered = null"
      >
        <div class="abar"></div>
        <div class="thumb">
          <img :src="projects[0].img" class="timg" alt="" />
          <div class="tgrad"></div>
          <span :class="['tbadge', projects[0].badge.t]">{{ projects[0].badge.label }}</span>
        </div>
        <div class="cbody">
          <div class="cnum">{{ projects[0].num }}</div>
          <h3 class="ctitle">{{ projects[0].title }}</h3>
          <p class="cdesc">{{ projects[0].desc }}</p>
        </div>
        <div class="cfoot">
          <div class="ctags">
            <span v-for="t in projects[0].tags" :key="t" class="ctag">{{ t }}</span>
          </div>
          <div class="clinks">
            <a :href="projects[0].demo" target="_blank" class="cbtn">
              <i class="fas fa-external-link-alt"></i><span class="lt">&nbsp;Demo</span>
            </a>
            <a :href="projects[0].repo" target="_blank" class="cbtn ghost">
              <i class="fab fa-github"></i><span class="lt">&nbsp;Repo</span>
            </a>
          </div>
        </div>
        <div class="cglow"></div>
      </div>

      <!-- COLUMN 1 — two stacked cards -->
      <div class="col-stack">
        <div
          v-for="p in [projects[1], projects[2]]"
          :key="p.id"
          class="card"
          :class="{ on: hovered === p.id }"
          :style="{ '--ac': p.accent }"
          @mouseenter="hovered = p.id"
          @mouseleave="hovered = null"
        >
          <div class="abar"></div>
          <div class="thumb sm">
            <img :src="p.img" class="timg" alt="" />
            <div class="tgrad"></div>
            <span :class="['tbadge', p.badge.t]">{{ p.badge.label }}</span>
          </div>
          <div class="cbody">
            <div class="cnum">{{ p.num }}</div>
            <h3 class="ctitle">{{ p.title }}</h3>
            <p class="cdesc">{{ p.desc }}</p>
          </div>
          <div class="cfoot">
            <div class="ctags">
              <span v-for="t in p.tags" :key="t" class="ctag">{{ t }}</span>
            </div>
            <div class="clinks">
              <a :href="p.demo" target="_blank" class="cbtn">
                <i class="fas fa-external-link-alt"></i><span class="lt">&nbsp;Demo</span>
              </a>
              <a :href="p.repo" target="_blank" class="cbtn ghost">
                <i class="fab fa-github"></i><span class="lt">&nbsp;Repo</span>
              </a>
            </div>
          </div>
          <div class="cglow"></div>
        </div>
      </div>

      <!-- STAT PANEL -->
      <div class="stat-panel">
        <div class="sp-n">3</div>
        <div class="sp-l">Projects<br>Deployed</div>
        <div class="sp-hr"></div>
        <div class="sp-tags">
          <span
            class="ctag"
            v-for="t in ['Python','Streamlit','SQL','NLP','ML','PyQt5']"
            :key="t"
          >{{ t }}</span>
        </div>
        <div class="sp-c">TECH STACK</div>
      </div>

    </div>
  </div>

  <div class="slide-footer">
    <span class="sf-left">~/project_builds</span>
    <span class="sf-right">Slide <span>04</span> / 05</span>
  </div>
</template>

<style scoped>
/*
  POLA IDENTIK DENGAN About.vue:
  .inner { flex: 1; padding-top: 48px; min-height: 0; }
  .slide-footer sudah dihandle global di main.css (height: 36px)
  Total: 48px navbar + inner (flex:1) + 36px footer = 100vh
*/
.inner {
  flex: 1;
  min-height: 0;
  padding-top: 48px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: .5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.proj-hdr {
  flex-shrink: 0;
  padding-top: .5rem;
  margin-bottom: .4rem;
}

/* ─── BENTO GRID ─── */
.bento {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.35fr 1fr .44fr;
  gap: .65rem;
  overflow: hidden;
  transition: grid-template-columns .45s cubic-bezier(.4,0,.2,1);
}
.bento.hc-0    { grid-template-columns: 1.85fr  .68fr  .44fr; }
.bento.hc-1    { grid-template-columns:  .8fr  1.65fr  .44fr; }
.bento.hc-none { grid-template-columns: 1.35fr   1fr   .44fr; }

/* ─── COL STACK ─── */
.col-stack {
  display: flex;
  flex-direction: column;
  gap: .65rem;
  min-height: 0;
  overflow: hidden;
}
.col-stack .card {
  flex: 1;
  min-height: 0;
}

/* ─── CARD ─── */
.card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  min-height: 0;
  transition: border-color .3s, box-shadow .3s;
}
.card.on {
  border-color: var(--ac);
  box-shadow: 0 0 26px -8px color-mix(in srgb, var(--ac) 28%, transparent);
}

.abar {
  height: 2px;
  background: var(--ac);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .45s cubic-bezier(.4,0,.2,1);
  flex-shrink: 0;
}
.card.on .abar { transform: scaleX(1); }

/* ─── THUMBNAIL ─── */
.thumb {
  position: relative;
  flex-shrink: 0;
  height: 120px;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: var(--s2);
}
.thumb.sm { height: 80px; }

.timg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  display: block;
  filter: saturate(.4) brightness(.65);
  transition: transform .55s cubic-bezier(.4,0,.2,1), filter .4s;
}
.card.on .timg {
  transform: scale(1.06);
  filter: saturate(1) brightness(.88);
}

.tgrad {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 20%, rgba(7,9,13,.9) 100%);
  pointer-events: none;
}

.tbadge {
  position: absolute;
  bottom: .42rem;
  left: .5rem;
  font-family: var(--mono);
  font-size: .5rem;
  padding: .1rem .36rem;
  border-radius: 1px;
  letter-spacing: .05em;
  background: rgba(56,189,248,.18);
  border: 1px solid rgba(56,189,248,.45);
  color: var(--cyan);
}
.tbadge.am {
  background: rgba(245,158,11,.18);
  border-color: rgba(245,158,11,.45);
  color: var(--amber);
}
.tbadge.gr {
  background: rgba(52,211,153,.18);
  border-color: rgba(52,211,153,.45);
  color: var(--green);
}

/* ─── CARD BODY ─── */
.cbody {
  padding: .55rem .85rem .28rem;
  flex-shrink: 0;
}
.cnum {
  font-family: var(--mono);
  font-size: .48rem;
  color: var(--muted);
  letter-spacing: .1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: .18rem;
}
.ctitle {
  font-size: clamp(.78rem, .95vw, .92rem);
  font-weight: 800;
  color: var(--bright);
  letter-spacing: -.02em;
  line-height: 1.2;
  margin-bottom: .28rem;
}
.cdesc {
  font-size: .67rem;
  color: var(--muted);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── CARD FOOTER ─── */
.cfoot {
  margin-top: auto;
  flex-shrink: 0;
  padding: .42rem .85rem .52rem;
  display: flex;
  flex-direction: column;
  gap: .33rem;
}
.ctags { display: flex; gap: .18rem; flex-wrap: wrap; }
.ctag {
  font-family: var(--mono);
  font-size: .49rem;
  padding: .09rem .34rem;
  border-radius: 1px;
  background: rgba(56,189,248,.04);
  border: 1px solid var(--border);
  color: var(--cyan);
  white-space: nowrap;
}
.clinks { display: flex; gap: .32rem; }
.cbtn {
  display: inline-flex;
  align-items: center;
  font-family: var(--mono);
  font-size: .57rem;
  padding: .28rem .5rem;
  border-radius: 2px;
  text-decoration: none;
  background: var(--ac);
  color: var(--bg);
  font-weight: 700;
  letter-spacing: .04em;
  white-space: nowrap;
  transition: opacity .2s;
}
.cbtn:hover { opacity: .8; }
.cbtn.ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  font-weight: 400;
}
.cbtn.ghost:hover { border-color: var(--ac); color: var(--ac); opacity: 1; }
.card:not(.on) .lt { display: none; }

.cglow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 0%,
    color-mix(in srgb, var(--ac) 7%, transparent),
    transparent 65%
  );
  opacity: 0;
  transition: opacity .4s;
}
.card.on .cglow { opacity: 1; }

/* ─── STAT PANEL ─── */
.stat-panel {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .58rem;
  padding: 1rem .65rem;
  overflow: hidden;
  min-height: 0;
}
.sp-n {
  font-size: 3rem;
  font-weight: 900;
  color: var(--cyan);
  line-height: 1;
  font-family: var(--disp);
}
.sp-l {
  font-family: var(--mono);
  font-size: .51rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .12em;
  text-align: center;
  line-height: 1.65;
}
.sp-hr { width: 100%; height: 1px; background: var(--border); }
.sp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .2rem;
  justify-content: center;
}
.sp-c {
  font-family: var(--mono);
  font-size: .47rem;
  color: var(--muted);
  letter-spacing: .22em;
  text-transform: uppercase;
}
</style>