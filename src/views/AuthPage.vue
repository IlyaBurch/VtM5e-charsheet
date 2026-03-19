<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginMutation, useRegisterMutation } from '@/composables/useAuth'

type Mode = 'login' | 'register' | 'reset'

const router = useRouter()
const mode = ref<Mode>('login')

// Login form
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')

// Register form
const regName = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regPasswordConfirm = ref('')
const regError = ref('')

// Reset form
const resetEmail = ref('')
const resetSent = ref(false)

const { mutate: login, asyncStatus: loginStatus } = useLoginMutation()
const { mutate: register, asyncStatus: registerStatus } = useRegisterMutation()

function handleLogin() {
  loginError.value = ''
  if (!loginEmail.value || !loginPassword.value) {
    loginError.value = 'Заполните все поля'
    return
  }
  login({ email: loginEmail.value, password: loginPassword.value })
}

function handleRegister() {
  regError.value = ''
  if (!regEmail.value || !regPassword.value || !regPasswordConfirm.value) {
    regError.value = 'Заполните все поля'
    return
  }
  if (regPassword.value !== regPasswordConfirm.value) {
    regError.value = 'Пароли не совпадают'
    return
  }
  if (regPassword.value.length < 8) {
    regError.value = 'Пароль должен быть не менее 8 символов'
    return
  }
  register({ email: regEmail.value, password: regPassword.value })
}

function handleReset() {
  if (!resetEmail.value) return
  resetSent.value = true
}
</script>

<template>
  <div class="auth-wrap">
    <!-- Background decorations -->
    <div class="auth-bg" aria-hidden="true">
      <span class="auth-ghost">CAINITE</span>
      <div class="auth-gridlines">
        <span v-for="i in 5" :key="i" class="auth-gridline" />
      </div>
      <div class="auth-accent-h" />
      <div class="auth-accent-v" />
    </div>

    <!-- Top nav -->
    <nav class="auth-nav">
      <span class="auth-nav-logo">CAINITE</span>
      <button class="action-btn" @click="router.push('/')">← На главную</button>
    </nav>

    <!-- Card -->
    <div class="auth-center">
      <div class="auth-card">
        <!-- Tabs -->
        <div v-if="mode !== 'reset'" class="auth-tabs">
          <button
            class="auth-tab"
            :class="{ active: mode === 'login' }"
            @click="mode = 'login'"
          >Вход</button>
          <button
            class="auth-tab"
            :class="{ active: mode === 'register' }"
            @click="mode = 'register'"
          >Регистрация</button>
        </div>

        <div class="auth-body">
          <!-- LOGIN -->
          <template v-if="mode === 'login'">
            <div class="auth-field">
              <label class="field-label">Email</label>
              <input
                v-model="loginEmail"
                type="email"
                class="auth-input"
                :class="{ error: loginError }"
                placeholder="you@example.com"
                @keyup.enter="handleLogin"
              />
            </div>
            <div class="auth-field">
              <label class="field-label">Пароль</label>
              <input
                v-model="loginPassword"
                type="password"
                class="auth-input"
                :class="{ error: loginError }"
                placeholder="••••••••"
                @keyup.enter="handleLogin"
              />
              <div style="text-align:right; margin-top:6px;">
                <span
                  style="font-size:9px; color:var(--t3); cursor:pointer; letter-spacing:1px;"
                  @click="mode = 'reset'"
                >Забыл пароль?</span>
              </div>
            </div>
            <div v-if="loginError" style="font-size:10px; color:var(--red); margin-top:8px;">
              {{ loginError }}
            </div>
            <button
              class="auth-submit"
              :disabled="loginStatus === 'loading'"
              @click="handleLogin"
            >
              {{ loginStatus === 'loading' ? 'Вход...' : 'Войти' }}
            </button>
            <div class="auth-divider">
              <span class="auth-divider-line" />
              <span class="auth-divider-txt">или</span>
              <span class="auth-divider-line" />
            </div>
            <button class="auth-oauth">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Войти через Google
            </button>
          </template>

          <!-- REGISTER -->
          <template v-if="mode === 'register'">
            <div class="auth-field">
              <label class="field-label">Имя пользователя</label>
              <input
                v-model="regName"
                type="text"
                class="auth-input"
                placeholder="Имя"
              />
              <div class="auth-hint">Будет видно другим игрокам</div>
            </div>
            <div class="auth-field">
              <label class="field-label">Email</label>
              <input
                v-model="regEmail"
                type="email"
                class="auth-input"
                placeholder="you@example.com"
              />
            </div>
            <div class="auth-field">
              <label class="field-label">Пароль</label>
              <input
                v-model="regPassword"
                type="password"
                class="auth-input"
                :class="{ error: regError }"
                placeholder="••••••••"
              />
              <div class="auth-hint">Минимум 8 символов</div>
            </div>
            <div class="auth-field">
              <label class="field-label">Повтор пароля</label>
              <input
                v-model="regPasswordConfirm"
                type="password"
                class="auth-input"
                :class="{ error: regError }"
                placeholder="••••••••"
                @keyup.enter="handleRegister"
              />
            </div>
            <div v-if="regError" style="font-size:10px; color:var(--red); margin-top:8px;">
              {{ regError }}
            </div>
            <button
              class="auth-submit"
              :disabled="registerStatus === 'loading'"
              @click="handleRegister"
            >
              {{ registerStatus === 'loading' ? 'Создание...' : 'Создать аккаунт' }}
            </button>
            <div class="auth-divider">
              <span class="auth-divider-line" />
              <span class="auth-divider-txt">или</span>
              <span class="auth-divider-line" />
            </div>
            <button class="auth-oauth">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Войти через Google
            </button>
          </template>

          <!-- RESET -->
          <template v-if="mode === 'reset'">
            <h2 class="auth-reset-title">Сброс пароля</h2>
            <p style="font-size:12px; color:var(--t3); margin:0 0 20px;">
              Введите email — мы пришлём ссылку для восстановления.
            </p>
            <template v-if="!resetSent">
              <div class="auth-field">
                <label class="field-label">Email</label>
                <input
                  v-model="resetEmail"
                  type="email"
                  class="auth-input"
                  placeholder="you@example.com"
                  @keyup.enter="handleReset"
                />
              </div>
              <button class="auth-submit" @click="handleReset">Отправить ссылку</button>
            </template>
            <div v-else style="font-size:13px; color:var(--t2); padding:16px 0;">
              Ссылка отправлена на <strong>{{ resetEmail }}</strong>
            </div>
            <div style="margin-top:16px; text-align:center;">
              <span
                style="font-size:9px; color:var(--t3); cursor:pointer; letter-spacing:1px; text-transform:uppercase;"
                @click="mode = 'login'"
              >← Вернуться к входу</span>
            </div>
          </template>
        </div>

        <!-- Card footer -->
        <div v-if="mode !== 'reset'" class="auth-card-footer">
          <template v-if="mode === 'login'">
            <span style="font-size:10px; color:var(--t3);">Нет аккаунта?</span>
            <span class="auth-link" @click="mode = 'register'">Зарегистрироваться</span>
          </template>
          <template v-else>
            <span style="font-size:10px; color:var(--t3);">Уже есть аккаунт?</span>
            <span class="auth-link" @click="mode = 'login'">Войти</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-wrap {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: var(--bg);
}
.auth-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.auth-ghost {
  position: absolute;
  bottom: 40px; left: 50%; transform: translateX(-50%);
  font-family: var(--font-head);
  font-size: clamp(80px, 20vw, 180px);
  color: transparent;
  -webkit-text-stroke: 1px #111;
  white-space: nowrap;
  user-select: none;
  opacity: 0.6;
}
.auth-gridlines {
  position: absolute; inset: 0;
  display: flex; justify-content: space-evenly;
}
.auth-gridline {
  width: 1px; height: 100%;
  background: linear-gradient(to bottom, transparent, #141414, transparent);
  opacity: 0.6;
}
.auth-accent-h {
  position: absolute; top: 0; right: 0;
  width: 140px; height: 2px;
  background: #ad0013;
}
.auth-accent-v {
  position: absolute; top: 0; right: 0;
  width: 2px; height: 60px;
  background: #ad0013;
}

.auth-nav {
  position: relative; z-index: 1;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  border-bottom: 1px solid var(--b);
  background: #030303;
  flex-shrink: 0;
}
.auth-nav-logo {
  font-family: var(--font-head);
  font-size: 18px; letter-spacing: 5px; color: #fff;
}

.auth-center {
  position: relative; z-index: 1;
  flex: 1; display: flex;
  align-items: center; justify-content: center;
  padding: 32px 16px;
}
.auth-card {
  width: 100%; max-width: 360px;
  background: var(--bg2);
  border: 1px solid var(--b);
}
.auth-tabs {
  display: flex;
  border-bottom: 1px solid var(--b);
}
.auth-tab {
  flex: 1; padding: 12px;
  font-family: var(--font-body);
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--t3); background: transparent; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer; transition: all 0.15s;
}
.auth-tab.active { color: var(--t1); border-bottom-color: var(--red); }

.auth-body { padding: 24px; }
.auth-field { margin-bottom: 16px; }
.auth-hint { font-size: 9px; color: var(--t3); letter-spacing: 1px; margin-top: 4px; }

.auth-reset-title {
  font-family: var(--font-head);
  font-size: 22px; letter-spacing: 2px; color: var(--t1);
  margin: 0 0 8px;
}

.auth-card-footer {
  padding: 12px 24px;
  border-top: 1px solid var(--b2);
  display: flex; align-items: center; gap: 8px;
}
.auth-link {
  font-size: 10px; color: var(--gold);
  cursor: pointer; letter-spacing: 1px;
  text-transform: uppercase;
}
.auth-link:hover { color: var(--t1); }
</style>
