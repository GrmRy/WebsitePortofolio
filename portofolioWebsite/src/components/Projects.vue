<script setup>
defineProps(['T'])

const projects = [
  {
    id:    'bc0',
    num:   'PROJECT_01 / ML_CLASSIFICATION',
    title: 'Loan Approval Predictor',
    desc:  'End-to-end ML system analyzing credit history, income & employment for real-time approval prediction. 92% accuracy.',
    tags:  ['Scikit-learn', 'Streamlit', 'Pandas'],
    demo:  'https://loanpredict-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:  'https://github.com/GrmRy/LoanPredict',
    screen: {
      file: 'loan_predict.py',
      chips: [
        { label: 'accuracy: 92%', type: ''   },
        { label: 'precision: 0.91', type: '' },
        { label: 'recall: 0.93',  type: ''   },
        { label: 'f1: 0.92',      type: ''   },
      ],
      bars: [
        { w: '92%', grad: 'linear-gradient(90deg,#38bdf8,#f59e0b)' },
        { w: '78%', grad: 'linear-gradient(90deg,#a78bfa,#38bdf8)' },
      ]
    }
  },
  {
    id:    'bc1',
    num:   'PROJECT_02 / BI_DASHBOARD',
    title: 'Sales KPI Dashboard',
    desc:  'Interactive BI platform. Reduced reporting time by 70%.',
    tags:  ['Plotly', 'Streamlit', 'SQL'],
    demo:  'https://kpidashboardsales-sbfbu7qqxasv8bbcd9rjey.streamlit.app/',
    repo:  'https://github.com/GrmRy/KPI-Dashboard-Streamlit',
    screen: {
      file: 'kpi_dashboard.py',
      chips: [
        { label: 'Revenue +24%', type: 'am' },
        { label: 'Deals ↑',      type: 'gr' },
      ],
      bars: [
        { w: '75%', grad: 'linear-gradient(90deg,#f59e0b,#f87171)' },
      ]
    }
  },
  {
    id:    'bc2',
    num:   'PROJECT_03 / NLP',
    title: 'Sentiment Analysis',
    desc:  'NLP pipeline for HOK reviews via Play Store scraping. 85% confidence.',
    tags:  ['NLTK', 'Scikit-learn', 'NLP'],
    demo:  'https://hoksentimentanalysis-3bkajue23249tk2xqdkgod.streamlit.app/',
    repo:  'https://github.com/GrmRy/HOK_SentimentAnalysis',
    sentiment: [
      { label: 'Pos 62%', type: 'gr' },
      { label: 'Neg 21%', type: 'rd' },
    ]
  },
]
</script>

<template>
  <div class="inner">

    <!-- header chip -->
    <div class="proj-hdr">
      <div class="chip">~ / project_builds</div>
    </div>

    <!-- bento grid -->
    <div class="bento">

      <!-- ── CARD 0 — tall, spans 2 rows ── -->
      <div class="b-card bc0">
        <!-- mock screen -->
        <div class="b-screen">
          <div class="b-screen-inner">
            <div class="b-sbar">
              <span class="sdot" style="background:#ff5f56"></span>
              <span class="sdot" style="background:#ffbd2e"></span>
              <span class="sdot" style="background:#27c93f"></span>
              <span class="sfile">{{ projects[0].screen.file }}</span>
            </div>
            <div class="b-scontent">
              <span
                v-for="c in projects[0].screen.chips"
                :key="c.label"
                :class="['mc', c.type]"
              >{{ c.label }}</span>
              <div class="mini-row">
                <div
                  v-for="b in projects[0].screen.bars"
                  :key="b.w"
                  class="mini-b"
                >
                  <div class="mini-bf" :style="{ width: b.w, background: b.grad }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- body -->
        <div class="b-body">
          <div>
            <div class="b-num">{{ projects[0].num }}</div>
            <h3 class="b-title tall-title">{{ projects[0].title }}</h3>
            <p class="b-desc">{{ projects[0].desc }}</p>
            <div class="b-tags">
              <span v-for="t in projects[0].tags" :key="t" class="b-tag">{{ t }}</span>
            </div>
          </div>
          <div class="b-foot">
            <div class="b-links">
              <a :href="projects[0].demo" target="_blank" class="b-lnk">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="projects[0].repo" target="_blank" class="b-lnk">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ── CARD 1 — top right ── -->
      <div class="b-card bc1">
        <!-- mock screen -->
        <div class="b-screen">
          <div class="b-screen-inner">
            <div class="b-sbar">
              <span class="sdot" style="background:#ff5f56"></span>
              <span class="sdot" style="background:#ffbd2e"></span>
              <span class="sfile">{{ projects[1].screen.file }}</span>
            </div>
            <div class="b-scontent">
              <span
                v-for="c in projects[1].screen.chips"
                :key="c.label"
                :class="['mc', c.type]"
              >{{ c.label }}</span>
              <div class="mini-row">
                <div
                  v-for="b in projects[1].screen.bars"
                  :key="b.w"
                  class="mini-b"
                >
                  <div class="mini-bf" :style="{ width: b.w, background: b.grad }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="b-body">
          <div>
            <div class="b-num">{{ projects[1].num }}</div>
            <h3 class="b-title">{{ projects[1].title }}</h3>
            <p class="b-desc">{{ projects[1].desc }}</p>
            <div class="b-tags">
              <span v-for="t in projects[1].tags" :key="t" class="b-tag">{{ t }}</span>
            </div>
          </div>
          <div class="b-foot">
            <div class="b-links">
              <a :href="projects[1].demo" target="_blank" class="b-lnk">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="projects[1].repo" target="_blank" class="b-lnk">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ── CARD 2 — bottom right ── -->
      <div class="b-card bc2">
        <div class="b-body">
          <div>
            <div class="b-num">{{ projects[2].num }}</div>
            <h3 class="b-title">{{ projects[2].title }}</h3>
            <p class="b-desc">{{ projects[2].desc }}</p>
            <div class="b-tags">
              <span v-for="t in projects[2].tags" :key="t" class="b-tag">{{ t }}</span>
            </div>
          </div>
          <div class="b-foot">
            <div class="sent-chips">
              <span
                v-for="s in projects[2].sentiment"
                :key="s.label"
                :class="['mc', s.type]"
                style="font-size:.6rem"
              >{{ s.label }}</span>
            </div>
            <div class="b-links">
              <a :href="projects[2].demo" target="_blank" class="b-lnk">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="projects[2].repo" target="_blank" class="b-lnk">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ── CARD 3 — stat / info ── -->
      <div class="b-card bc3">
        <div class="stat-cell">
          <div class="big-stat">
            <span class="bs-num">3</span>
            <span class="bs-label">Projects<br>Deployed</span>
          </div>
          <div class="divider"></div>
          <div class="tag-cloud">
            <span class="b-tag" v-for="t in ['Python','Streamlit','SQL','NLP','ML','PyQt5']" :key="t">
              {{ t }}
            </span>
          </div>
          <div class="stack-label">TECH STACK</div>
        </div>
      </div>

    </div>
  </div>

  <!-- FOOTER STRIP -->
  <div class="slide-footer">
    <span class="sf-left">~/project_builds</span>
    <span class="sf-right">Slide <span>04</span> / 05</span>
  </div>
</template>

<style scoped>
/* ── INNER ── */
.inner {
  flex: 1;
  padding: 48px 2.5rem 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
  z-index: 1;
}

.proj-hdr { margin-bottom: 1rem; }

/* ── BENTO GRID ── */
.bento {
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  flex: 1;
  min-height: 0;
  padding-bottom: 1rem;
}

/* ── CARDS ── */
.b-card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color .25s;
  cursor: default;
}
.b-card:hover { border-color: rgba(56, 189, 248, .3); }

/* card 0 spans 2 rows */
.bc0 { grid-row: 1 / 3; }

/* card 3 spans 2 rows */
.bc3 { grid-column: 3; grid-row: 1 / 3; }

/* ── MOCK SCREEN ── */
.b-screen {
  background: var(--s2);
  border-bottom: 1px solid var(--border);
  padding: .75rem;
  flex-shrink: 0;
}
.b-screen-inner {
  border: 1px solid var(--border);
  border-radius: 1px;
  background: var(--bg);
  overflow: hidden;
}
.b-sbar {
  height: 22px;
  background: var(--s2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 .6rem;
  gap: .3rem;
}
.sdot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}
.sfile {
  font-family: var(--mono);
  font-size: .56rem;
  color: var(--muted);
  margin-left: .4rem;
}
.b-scontent {
  padding: .6rem;
  display: flex;
  gap: .35rem;
  flex-wrap: wrap;
  align-content: flex-start;
}

/* metric chips */
.mc {
  background: rgba(56, 189, 248, .08);
  border: 1px solid rgba(56, 189, 248, .15);
  border-radius: 1px;
  padding: .2rem .45rem;
  font-family: var(--mono);
  font-size: .58rem;
  color: var(--cyan);
}
.mc.am { background: rgba(245,158,11,.06); border-color: rgba(245,158,11,.15); color: var(--amber); }
.mc.gr { background: rgba(52,211,153,.06); border-color: rgba(52,211,153,.15); color: var(--green); }
.mc.rd { background: rgba(248,113,113,.06); border-color: rgba(248,113,113,.15); color: var(--red); }

.mini-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .2rem;
  margin-top: .15rem;
}
.mini-b {
  height: 3px;
  background: var(--border);
  border-radius: 1px;
  overflow: hidden;
}
.mini-bf { height: 100%; }

/* ── CARD BODY ── */
.b-body {
  padding: 1rem 1.1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
}
.b-num {
  font-family: var(--mono);
  font-size: .58rem;
  color: var(--muted);
  letter-spacing: .15em;
  margin-bottom: .35rem;
}
.b-title {
  font-size: .95rem;
  font-weight: 800;
  color: var(--bright);
  margin-bottom: .3rem;
  letter-spacing: -.01em;
}
.tall-title { font-size: 1.2rem; }

.b-desc {
  color: var(--muted);
  font-size: .78rem;
  line-height: 1.65;
  margin-bottom: .75rem;
}
.b-tags {
  display: flex;
  gap: .3rem;
  flex-wrap: wrap;
  margin-bottom: .75rem;
}
.b-tag {
  font-family: var(--mono);
  font-size: .6rem;
  padding: .2rem .55rem;
  border-radius: 1px;
  background: rgba(56, 189, 248, .05);
  border: 1px solid var(--border);
  color: var(--cyan);
}
.b-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sent-chips { display: flex; gap: .35rem; }
.b-links { display: flex; gap: .4rem; }
.b-lnk {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  text-decoration: none;
  font-size: .78rem;
  transition: border-color .2s, color .2s;
}
.b-lnk:hover { border-color: var(--cyan); color: var(--cyan); }

/* ── CARD 3 — stat cell ── */
.stat-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
  gap: 1.25rem;
  height: 100%;
}
.big-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.bs-num {
  font-size: 4rem;
  font-weight: 900;
  color: var(--cyan);
  line-height: 1;
  font-family: var(--disp);
}
.bs-label {
  font-family: var(--mono);
  font-size: .62rem;
  color: var(--muted);
  letter-spacing: .12em;
  text-transform: uppercase;
  text-align: center;
  margin-top: .35rem;
}
.divider {
  width: 100%;
  height: 1px;
  background: var(--border);
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
  justify-content: center;
}
.stack-label {
  font-family: var(--mono);
  font-size: .6rem;
  color: var(--muted);
  letter-spacing: .2em;
  text-transform: uppercase;
}
</style>