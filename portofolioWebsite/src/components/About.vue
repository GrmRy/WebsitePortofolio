<script setup>
defineProps(['T'])

const stats = [
  { n: '3+',  l: 'Live Apps' },
  { n: '5',   l: 'Certs'     },
  { n: '3.04',l: 'GPA'       },
]

const timeline = [
  {
    date:  'Apr – Dec 2025',
    title: 'Staff Support',
    co:    'PT. Sriwahana Adityakarta',
    desc:  'Automated Excel validation pipelines, engineered PyQt5 GUI for batch regex extraction & data processing.'
  },
  {
    date:  'Aug – Dec 2022',
    title: 'Teaching Assistant',
    co:    'Universitas Tidar',
    desc:  'Introductory programming courses, student assessment, curriculum discussions.'
  },
  {
    date:  '2018 – 2024',
    title: 'S1 Electrical Engineering',
    co:    'Universitas Tidar — GPA 3.04',
    desc:  'Thesis: Maximum Useful Power Forecasting of PLTA using Machine Learning.'
  },
  {
    date:  '2023',
    title: 'Machine Learning Track',
    co:    'Bangkit Academy by Google',
    desc:  'Industry-ready deep learning program.'
  },
]
</script>

<template>
  <div class="inner">

    <!-- LEFT -->
    <div class="a-left">
      <div class="chip">~ / about_me</div>

      <h2 class="a-heading">
        Data Scientist<br>
        &amp; <em>ML Engineer</em>
      </h2>

      <p class="a-bio">{{ T.about_p1 }}</p>

      <div class="stats">
        <div v-for="s in stats" :key="s.l" class="stat">
          <div class="stat-n">{{ s.n }}</div>
          <div class="stat-l">{{ s.l }}</div>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="a-right">
      <div class="chip" style="margin-bottom:1.5rem">
        Experience &amp; Education
      </div>

      <div class="tl">
        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="tl-item"
        >
          <span class="ti-date">{{ item.date }}</span>
          <div class="ti-title">{{ item.title }}</div>
          <div class="ti-co">{{ item.co }}</div>
          <div class="ti-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

  </div>

  <!-- FOOTER STRIP -->
  <div class="slide-footer">
    <span class="sf-left">~/about_me</span>
    <span class="sf-right">Slide <span>02</span> / 05</span>
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
.a-left {
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--border);
}

.a-heading {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -.03em;
  color: var(--bright);
  margin-bottom: 1.5rem;
}
.a-heading em {
  font-style: normal;
  color: var(--cyan);
}

.a-bio {
  color: var(--muted);
  font-size: .9rem;
  line-height: 1.85;
  padding-left: 1rem;
  border-left: 2px solid var(--border);
  margin-bottom: 2rem;
}

/* Stats */
.stats {
  display: flex;
  gap: 1.25rem;
}
.stat {
  padding: .9rem 1.1rem;
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: 2px;
  transition: border-color .2s;
}
.stat:hover { border-color: rgba(56, 189, 248, .3); }

.stat-n {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--cyan);
  line-height: 1;
  font-family: var(--disp);
}
.stat-l {
  font-family: var(--mono);
  font-size: .6rem;
  color: var(--muted);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-top: .2rem;
}

/* ── RIGHT ── */
.a-right {
  padding: 3.5rem 2.5rem 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

/* Timeline */
.tl {
  position: relative;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.tl::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, var(--cyan), transparent);
}

.tl-item { position: relative; }
.tl-item::before {
  content: '';
  position: absolute;
  left: -1.88rem;
  top: .32rem;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bg);
  border: 1.5px solid var(--amber);
}

.ti-date {
  font-family: var(--mono);
  font-size: .62rem;
  color: var(--amber);
  letter-spacing: .15em;
  text-transform: uppercase;
  display: block;
  margin-bottom: .2rem;
}
.ti-title {
  font-size: .9rem;
  font-weight: 700;
  color: var(--bright);
  margin-bottom: .1rem;
}
.ti-co {
  font-family: var(--mono);
  font-size: .72rem;
  color: var(--cyan);
  margin-bottom: .3rem;
}
.ti-desc {
  color: var(--muted);
  font-size: .8rem;
  line-height: 1.65;
}

/* scrollbar di panel kanan */
.a-right::-webkit-scrollbar { width: 4px; }
.a-right::-webkit-scrollbar-track { background: transparent; }
.a-right::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
.a-right::-webkit-scrollbar-thumb:hover { background: var(--cyan); }
</style>