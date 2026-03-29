<script setup>
import { ref, computed } from 'vue'

import imgLoan      from '@/assets/proj-loan.png'
import imgKpi       from '@/assets/proj-kpi.png'
import imgSentiment from '@/assets/proj-sentiment.png'

defineProps(['T'])

const projects = [
  {
    id:     0,
    num:    'PROJECT_01 / ML_CLASSIFICATION',
    title:  'Loan Approval Predictor',
    desc:   'End-to-end ML system analyzing credit history, income & employment for real-time approval prediction. 92% accuracy.',
    tags:   ['Scikit-learn', 'Streamlit', 'Pandas'],
    demo:   'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:   'https://github.com/GrmRy/LoanPredict',
    img:    imgLoan,
    accent: '#38bdf8',
    stat:   'Accuracy 92%',
    statT:  '',
  },
  {
    id:     1,
    num:    'PROJECT_02 / BI_DASHBOARD',
    title:  'Sales KPI Dashboard',
    desc:   'Interactive BI platform visualizing sales metrics & KPIs. Reduced manual reporting time by 70%.',
    tags:   ['Plotly', 'Streamlit', 'SQL'],
    demo:   'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:   'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    img:    imgKpi,
    accent: '#f59e0b',
    stat:   'Revenue +24%',
    statT:  'am',
  },
  {
    id:     2,
    num:    'PROJECT_03 / NLP',
    title:  'Sentiment Analysis',
    desc:   'NLP pipeline for HOK game reviews via Play Store scraping. 85% classification confidence.',
    tags:   ['NLTK', 'Scikit-learn', 'NLP'],
    demo:   'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    repo:   'https://github.com/GrmRy/HOK_SentimentAnalysis',
    img:    imgSentiment,
    accent: '#34d399',
    stat:   'Pos 62%',
    statT:  'gr',
  },
]

/*
  State shape:
  { big: id, bigCol: 'left'|'right', top: id, bot: id }

  big    = card that spans full height of its column
  bigCol = which column big card is in
  top    = card at top of the OTHER column
  bot    = card at bottom of the OTHER column

  Transition on hover(X):
  - X is already big → no-op
  - X is top → { big:X, bigCol:smallCol, top:prevBig, bot:prevBot }
  - X is bot → { big:X, bigCol:smallCol, top:prevTop, bot:prevBig }
  where smallCol = opposite of current bigCol
*/
const state = ref({ big: 0, bigCol: 'left', top: 1, bot: 2 })

function onHover(id) {
  const s = state.value
  if (id === s.big) return
  const smallCol = s.bigCol === 'left' ? 'right' : 'left'
  if (id === s.top) {
    state.value = { big: id, bigCol: smallCol, top: s.big, bot: s.bot }
  } else {
    state.value = { big: id, bigCol: smallCol, top: s.top, bot: s.big }
  }
}

// grid-template-areas string for the bento
const gridAreas = computed(() => {
  if (state.value.bigCol === 'left')
    return '"big top stat" "big bot stat"'
  return '"top big stat" "bot big stat"'
})

// grid-area name per card
function areaOf(id) {
  const s = state.value
  if (id === s.big) return 'big'
  if (id === s.top) return 'top'
  return 'bot'
}

function isBig(id) { return state.value.big === id }
</script>

<template>
  <div class="inner">
    <div class="proj-hdr">
      <div class="chip">~ / project_builds</div>
    </div>

    <!-- dynamic grid via inline style -->
    <div
      class="bento"
      :style="{ gridTemplateAreas: gridAreas }"
    >

      <!-- CARDS -->
      <div
        v-for="p in projects"
        :key="p.id"
        :class="['card', { big: isBig(p.id), small: !isBig(p.id) }]"
        :style="{ '--ac': p.accent, gridArea: areaOf(p.id) }"
        @mouseenter="onHover(p.id)"
      >
        <div class="abar"></div>

        <!-- THUMBNAIL -->
        <div class="thumb">
          <img :src="p.img" class="timg" alt="" />
          <div class="tgrad"></div>
          <span :class="['tbadge', p.statT]">{{ p.stat }}</span>
        </div>

        <!-- BODY -->
        <div class="cbody">
          <div class="cnum">{{ p.num }}</div>
          <h3 class="ctitle">{{ p.title }}</h3>
          <p class="cdesc">{{ p.desc }}</p>
          <div class="ctags">
            <span v-for="t in p.tags" :key="t" class="ctag">{{ t }}</span>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="cfoot">
          <a :href="p.demo" target="_blank" class="cbtn" @click.stop>
            <i class="fas fa-external-link-alt"></i>
            <span class="lbl"> Demo</span>
          </a>
          <a :href="p.repo" target="_blank" class="cbtn ghost" @click.stop>
            <i class="fab fa-github"></i>
            <span class="lbl"> Repo</span>
          </a>
        </div>

        <div class="cglow"></div>
      </div>

      <!-- STAT PANEL -->
      <div class="stat-panel" style="grid-area: stat">
        <div class="sp-n">3</div>
        <div class="sp-l">Projects<br>Deployed</div>
        <div class="sp-hr"></div>
        <div class="sp-tags">
          <span class="ctag" v-for="t in ['Python','Streamlit','SQL','NLP','ML','PyQt5']" :key="t">{{ t }}</span>
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
/* ── LAYOUT ── */
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
  margin-bottom: .5rem;
}

/* ── BENTO ──
   3 cols: project-left | project-right | stat
   2 rows: equal height
   grid-template-areas is set inline (dynamic)
*/
.bento {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.65fr 1fr .42fr;
  grid-template-rows: 1fr 1fr;
  gap: .7rem;
  overflow: hidden;
}

/* ── CARD BASE ── */
.card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  min-height: 0;
  transition: border-color .35s, box-shadow .35s;
  cursor: default;
}

/* BIG card — featured */
.card.big {
  border-color: var(--ac);
  box-shadow: 0 0 28px -8px color-mix(in srgb, var(--ac) 30%, transparent);
}

/* SMALL card — hoverable */
.card.small {
  cursor: pointer;
}
.card.small:hover {
  border-color: color-mix(in srgb, var(--ac) 60%, transparent);
}

/* accent top bar */
.abar {
  height: 2px;
  background: var(--ac);
  flex-shrink: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s cubic-bezier(.4,0,.2,1);
}
.card.big .abar { transform: scaleX(1); }

/* ── THUMBNAIL ── */
.thumb {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: var(--s2);
  transition: height .4s cubic-bezier(.4,0,.2,1);
}

/* big card: tall image */
.card.big .thumb   { height: 45%; }
/* small card: short image */
.card.small .thumb { height: 35%; }

.timg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  display: block;
  transition: filter .4s, transform .5s cubic-bezier(.4,0,.2,1);
}
.card.big   .timg { filter: brightness(.9) saturate(1);   transform: scale(1);    }
.card.small .timg { filter: brightness(.6) saturate(.4);  }
.card.small:hover .timg { filter: brightness(.75) saturate(.7); }

.tgrad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 20%, rgba(7,9,13,.9) 100%);
  pointer-events: none;
}

.tbadge {
  position: absolute; bottom: .45rem; left: .55rem;
  font-family: var(--mono); font-size: .5rem;
  padding: .1rem .38rem; border-radius: 1px;
  background: rgba(56,189,248,.18);
  border: 1px solid rgba(56,189,248,.45);
  color: var(--cyan);
}
.tbadge.am { background: rgba(245,158,11,.18); border-color: rgba(245,158,11,.45); color: var(--amber); }
.tbadge.gr { background: rgba(52,211,153,.18); border-color: rgba(52,211,153,.45); color: var(--green); }

/* hide badge on small cards */
.card.small .tbadge { display: none; }

/* ── CARD BODY ── */
.cbody {
  padding: .65rem .9rem .35rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .3rem;
  overflow: hidden;
}
.cnum {
  font-family: var(--mono); font-size: .48rem;
  color: var(--muted); letter-spacing: .1em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ctitle {
  font-weight: 800; color: var(--bright);
  letter-spacing: -.02em; line-height: 1.2;
}
.card.big   .ctitle { font-size: clamp(.88rem, 1.2vw, 1.1rem); }
.card.small .ctitle { font-size: clamp(.75rem, .9vw, .85rem); }

.cdesc {
  font-size: .69rem; color: var(--muted); line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card.big   .cdesc { -webkit-line-clamp: 3; }
.card.small .cdesc { -webkit-line-clamp: 2; }

.ctags { display: flex; gap: .2rem; flex-wrap: wrap; margin-top: auto; }
.ctag {
  font-family: var(--mono); font-size: .49rem;
  padding: .09rem .36rem; border-radius: 1px;
  background: rgba(56,189,248,.04);
  border: 1px solid var(--border);
  color: var(--cyan); white-space: nowrap;
}

/* ── CARD FOOTER ── */
.cfoot {
  padding: .48rem .9rem .6rem;
  display: flex; gap: .38rem;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
.cbtn {
  display: inline-flex; align-items: center;
  font-family: var(--mono); font-size: .58rem;
  padding: .3rem .55rem; border-radius: 2px;
  text-decoration: none;
  background: var(--ac); color: var(--bg);
  font-weight: 700; letter-spacing: .04em;
  white-space: nowrap; transition: opacity .2s;
  border: none; cursor: pointer;
}
.cbtn:hover { opacity: .8; }
.cbtn.ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted); font-weight: 400;
}
.cbtn.ghost:hover { border-color: var(--ac); color: var(--ac); opacity: 1; }

/* hide text labels on small cards */
.card.small .lbl { display: none; }

/* glow overlay */
.cglow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 0%,
    color-mix(in srgb, var(--ac) 6%, transparent),
    transparent 65%
  );
  opacity: 0; transition: opacity .4s;
}
.card.big .cglow { opacity: 1; }

/* ── STAT PANEL ── */
.stat-panel {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 3px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: .6rem; padding: 1rem .65rem;
  overflow: hidden; min-height: 0;
}
.sp-n {
  font-size: 3rem; font-weight: 900;
  color: var(--cyan); line-height: 1;
  font-family: var(--disp);
}
.sp-l {
  font-family: var(--mono); font-size: .51rem;
  color: var(--muted); text-transform: uppercase;
  letter-spacing: .12em; text-align: center; line-height: 1.65;
}
.sp-hr { width: 100%; height: 1px; background: var(--border); }
.sp-tags { display: flex; flex-wrap: wrap; gap: .2rem; justify-content: center; }
.sp-c {
  font-family: var(--mono); font-size: .47rem;
  color: var(--muted); letter-spacing: .22em; text-transform: uppercase;
}
</style>