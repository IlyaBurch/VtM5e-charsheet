<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DarkPackFooter from '@/components/DarkPackFooter.vue'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div class="home-wrap">
    <!-- Decorative background -->
    <div class="home-bg" aria-hidden="true">
      <span class="home-ghost">VAMPIRE THE MASQUERADE</span>
      <div class="home-gridlines">
        <span v-for="i in 6" :key="i" class="home-gridline" />
      </div>
      <div class="home-accent-h" />
      <div class="home-accent-v" />
    </div>

    <!-- Nav -->
    <nav class="home-nav">
      <span class="home-nav-logo">CAINITE</span>
      <div class="home-nav-pills">
        <span class="sys-pill active">VtM 5e</span>
        <span class="sys-pill">Mörk Borg</span>
        <span class="sys-pill">CoC</span>
      </div>
      <button class="action-btn" @click="router.push('/auth')">Войти</button>
    </nav>

    <!-- Hero -->
    <main class="home-hero">
      <!-- Left column -->
      <div class="home-left">
        <div class="home-eyebrow">
          <span class="home-eyebrow-line" />
          <span class="home-eyebrow-text">Настольные RPG · Листы персонажей</span>
        </div>
        <h1 class="home-h1">
          <span class="home-h1-main">ТВОИ</span><br>
          <span class="home-h1-main">ПЕРСОНАЖИ</span>
        </h1>
        <p class="home-subtitle">в одном месте</p>
        <p class="home-tagline">
          Интерактивные листы персонажей для настольных RPG.<br>
          Без регистрации, без лимитов — бесплатно.
        </p>
        <div class="home-cta">
          <button class="home-cta-primary" @click="router.push('/characters/new')">
            Создать персонажа
          </button>
          <button class="home-cta-secondary" @click="router.push('/characters')">
            Смотреть системы →
          </button>
        </div>
      </div>

      <!-- Right column — preview -->
      <div class="home-preview">
        <div class="home-preview-header">
          <span style="font-size:9px; color:var(--t3);">Пример листа</span>
          <span class="home-preview-badge">VtM 5e</span>
        </div>
        <div style="padding:16px;">
          <div style="font-family:var(--font-char); font-size:24px; color:#b8a080; font-style:italic; font-weight:300;">
            Мирослава Сорокина
          </div>
          <div style="font-size:8px; color:var(--gold-dim); letter-spacing:1px; margin-top:2px;">
            8-е поколение
          </div>
          <span class="clan-badge" style="margin-top:6px; display:inline-block;">Тореадор</span>

          <div style="margin-top:14px;">
            <div style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase; margin-bottom:6px;">Атрибуты</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div v-for="attr in [['Сила','●●○○○'],['Ловкость','●●●○○'],['Обаяние','●●●●○'],['Интеллект','●●●○○']]" :key="attr[0]"
                style="background:var(--bg3); padding:8px;">
                <div style="font-size:8px; color:var(--lbl); letter-spacing:1px; text-transform:uppercase;">{{ attr[0] }}</div>
                <div style="font-size:12px; color:var(--gold); letter-spacing:2px; margin-top:2px;">{{ attr[1] }}</div>
              </div>
            </div>
          </div>

          <div style="margin-top:14px;">
            <div style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase; margin-bottom:6px;">Дисциплины</div>
            <div v-for="d in [['Присутствие','●●●○○'],['Доминирование','●●○○○']]" :key="d[0]"
              style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid var(--b2);">
              <span style="font-size:11px; color:var(--t2);">{{ d[0] }}</span>
              <span style="font-size:11px; color:var(--gold); letter-spacing:2px;">{{ d[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom strip -->
    <div class="home-strip">
      <div class="home-strip-cell">
        <span class="home-strip-num">01</span>
        <span class="home-strip-lbl">Система</span>
        <span class="home-strip-val">VtM 5e</span>
      </div>
      <div class="home-strip-cell">
        <span class="home-strip-num">∞</span>
        <span class="home-strip-lbl">Персонажей</span>
        <span class="home-strip-val">Без лимита</span>
      </div>
      <div class="home-strip-cell">
        <span class="home-strip-num">02</span>
        <span class="home-strip-lbl">Скоро</span>
        <span class="home-strip-val">Mork Borg</span>
      </div>
      <div class="home-strip-cell">
        <span class="home-strip-num">RU</span>
        <span class="home-strip-lbl">Язык</span>
        <span class="home-strip-val">Русский</span>
      </div>
    </div>

    <!-- Disclaimer bar -->
    <div class="home-disclaimer-bar">
      <span class="home-disclaimer-dot" />
      <span style="font-size:8px; color:#6a1a1a; letter-spacing:1px;">
        Cainite — неофициальный фан-сайт. Не является официальным материалом World of Darkness.
      </span>
    </div>

    <DarkPackFooter />
  </div>
</template>

<style scoped>
.home-wrap {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: var(--bg);
}

/* Background decorations */
.home-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.home-ghost {
  position: absolute;
  bottom: 60px;
  left: -20px;
  font-family: var(--font-head);
  font-size: clamp(60px, 10vw, 120px);
  color: transparent;
  -webkit-text-stroke: 1px #131313;
  white-space: nowrap;
  user-select: none;
  opacity: 0.6;
}
.home-gridlines {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-evenly;
}
.home-gridline {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #141414, transparent);
  opacity: 0.6;
}
.home-accent-h {
  position: absolute;
  top: 0; right: 0;
  width: 160px; height: 2px;
  background: #ad0013;
}
.home-accent-v {
  position: absolute;
  top: 0; right: 0;
  width: 2px; height: 70px;
  background: #ad0013;
}

/* Nav */
.home-nav {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 32px;
  border-bottom: 1px solid var(--b);
  background: #030303;
  flex-shrink: 0;
}
.home-nav-logo {
  font-family: var(--font-head);
  font-size: 20px;
  letter-spacing: 5px;
  color: #fff;
  flex-shrink: 0;
}
.home-nav-pills {
  flex: 1;
  display: flex;
  gap: 0;
}

/* Hero */
.home-hero {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 0;
  padding: 60px 32px 40px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.home-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 40px;
}
.home-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
}
.home-eyebrow-line {
  display: block;
  width: 20px;
  height: 1px;
  background: #ad0013;
  flex-shrink: 0;
}
.home-eyebrow-text {
  font-size: 9px;
  color: #ad0013;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.home-h1 {
  margin: 0;
  line-height: 0.9;
}
.home-h1-main {
  font-family: var(--font-head);
  font-size: clamp(52px, 10vw, 82px);
  color: #fff;
  display: block;
}
.home-subtitle {
  font-family: var(--font-head);
  font-size: clamp(32px, 6vw, 48px);
  color: #a67d43;
  margin: 0;
  line-height: 1;
}
.home-tagline {
  font-size: 13px;
  color: var(--t3);
  border-left: 1px solid var(--b);
  padding-left: 14px;
  line-height: 1.75;
  margin: 0;
}
.home-cta {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
}
.home-cta-primary {
  background: var(--red);
  color: #fff;
  border: none;
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s;
}
.home-cta-primary:hover { background: #8a000f; }
.home-cta-secondary {
  background: transparent;
  border: 1px solid var(--b);
  border-left: none;
  color: var(--t3);
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.home-cta-secondary:hover { color: var(--t2); border-color: var(--b2); }

/* Preview */
.home-preview {
  background: var(--bg2);
  border-left: 1px solid var(--b);
  height: 100%;
  min-height: 340px;
  overflow: hidden;
}
.home-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--b);
}
.home-preview-badge {
  font-size: 8px;
  color: var(--red);
  border: 1px solid var(--red);
  padding: 2px 6px;
  letter-spacing: 1px;
}

/* Strip */
.home-strip {
  position: relative;
  z-index: 1;
  background: var(--bg2);
  border-top: 1px solid var(--b2);
  display: flex;
}
.home-strip-cell {
  flex: 1;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-right: 1px solid var(--b2);
}
.home-strip-cell:last-child { border-right: none; }
.home-strip-num  { font-family: var(--font-head); font-size: 22px; color: #161616; }
.home-strip-lbl  { font-size: 8px; color: #181818; letter-spacing: 2px; text-transform: uppercase; }
.home-strip-val  { font-size: 9px; color: #202020; }

/* Disclaimer */
.home-disclaimer-bar {
  background: #0a0000;
  border-bottom: 1px solid #1a0808;
  padding: 6px 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.home-disclaimer-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .home-hero {
    grid-template-columns: 1fr;
    padding: 32px 20px 24px;
  }
  .home-preview { display: none; }
  .home-left { padding-right: 0; }
  .home-strip { flex-wrap: wrap; }
  .home-strip-cell { min-width: 50%; }
}
</style>
