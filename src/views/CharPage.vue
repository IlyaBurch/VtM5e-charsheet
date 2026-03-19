<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import { useSaveCharacter, useCharacterPayload, useDeleteCharacter } from '@/composables/useCharacter'
import { fetchCharacter } from '@/services/characters'
import { CLANS } from '@/data/clans.data'

import ClanSelector from '@/components/ClanSelector.vue'

const route = useRoute()
const router = useRouter()
const charStore = useCharacterStore()
const userStore = useUserStore()
const { mutate: saveCharacter, asyncStatus } = useSaveCharacter()
const { mutate: deleteCharacter, asyncStatus: deleteStatus } = useDeleteCharacter()

const loading = ref(false)
const loadError = ref<string | null>(null)

// Active tab for mobile
type TabId = 'identity' | 'attributes' | 'abilities' | 'disciplines' | 'state' | 'notes'
const activeTab = ref<TabId>('identity')
const tabs: { id: TabId; label: string }[] = [
  { id: 'identity',    label: 'Личность' },
  { id: 'attributes',  label: 'Атрибуты' },
  { id: 'abilities',   label: 'Навыки' },
  { id: 'disciplines', label: 'Дисциплины' },
  { id: 'state',       label: 'Состояние' },
  { id: 'notes',       label: 'Заметки' },
]

onMounted(async () => {
  if (route.name === 'new') {
    charStore.reset()
  } else {
    loading.value = true
    try {
      const data = await fetchCharacter(Number(route.params.id))
      charStore.loadCharacter(data)
    } catch {
      loadError.value = 'Персонаж не найден'
    } finally {
      loading.value = false
    }
  }
})

// Character derived values
const character = computed(() => charStore.character)

const clanName = computed(() => {
  if (!character.value.clan) return null
  const clan = CLANS.find(c => c.name === character.value.clan)
  return clan?.nameRu ?? character.value.clan
})

const generation = computed(() =>
  character.value.mainInfo.find(i => i.name === 'Поколение')?.value ?? ''
)

// Status stats
const maxHealth = computed(() => character.value.common.maxHealth)
const health = computed(() => character.value.common.health)
const maxWill = computed(() => character.value.common.maxWill)
const will = computed(() => character.value.common.will)
const humanity = computed(() => character.value.common.humanity)
const maxHumanity = computed(() => character.value.common.maxHumanity)
const hunger = computed(() => character.value.common.hunger)

// Skill groups from spec
const physicalSkills = computed(() =>
  character.value.abilities.filter((_, i) => i < 9)
)
const socialSkills = computed(() =>
  character.value.abilities.filter((_, i) => i >= 9 && i < 18)
)
const mentalSkills = computed(() =>
  character.value.abilities.filter((_, i) => i >= 18)
)

// Attribute groups
const physicalAttrs = computed(() =>
  character.value.attributes.filter((_, i) => i < 3)
)
const socialAttrs = computed(() =>
  character.value.attributes.filter((_, i) => i >= 3 && i < 6)
)
const mentalAttrs = computed(() =>
  character.value.attributes.filter((_, i) => i >= 6)
)

function handleSave() {
  saveCharacter(useCharacterPayload())
  charStore.save()
}

function handleDelete() {
  if (charStore.characterId) {
    deleteCharacter(charStore.characterId)
  }
}

// Dot helpers
function dotClass(index: number, filled: number) {
  return index < filled ? 'dot filled' : 'dot'
}

function toggleDot(field: 'health' | 'will' | 'humanity' | 'hunger', index: number) {
  if (!charStore.isEdit) return
  const current = character.value.common[field]
  character.value.common[field] = current === index + 1 ? index : index + 1
}

// Identity fields (exclude Поколение shown in header)
const identityFields = computed(() =>
  character.value.mainInfo.filter(i => i.name !== 'Поколение')
)

let autoSaveInterval: ReturnType<typeof setInterval> | null = null

watch(
  () => charStore.isEdit,
  (editing) => {
    if (editing && userStore.isLog) {
      autoSaveInterval = setInterval(() => {
        saveCharacter(useCharacterPayload())
      }, 3 * 60 * 1000)
    } else {
      if (autoSaveInterval) clearInterval(autoSaveInterval)
    }
  }
)

onUnmounted(() => {
  if (autoSaveInterval) clearInterval(autoSaveInterval)
})
</script>

<template>
  <div v-if="loading" style="padding:60px 20px; text-align:center; color:var(--t3); font-size:11px; letter-spacing:2px;">
    ЗАГРУЗКА...
  </div>
  <div v-else-if="loadError" style="padding:60px 20px; text-align:center; color:var(--red);">
    {{ loadError }}
  </div>

  <div v-else style="display:flex; flex-direction:column; height:100%;">
    <!-- Toolbar -->
    <div style="display:flex; align-items:center; gap:8px; padding:8px 12px; border-bottom:1px solid var(--b2); flex-shrink:0;">
      <button class="back-btn" @click="router.push('/characters')">Все персонажи</button>
      <div style="flex:1;" />
      <span v-if="!userStore.isLog" style="font-size:12px; color:var(--gold-dim); letter-spacing:1px;">
        Изменения не сохранятся без входа
      </span>
      <button
        v-if="!charStore.isEdit"
        class="action-btn"
        @click="charStore.edit()"
      >Редактировать</button>
      <button
        v-if="charStore.isEdit"
        class="action-btn primary"
        :disabled="asyncStatus === 'loading'"
        @click="handleSave"
      >{{ asyncStatus === 'loading' ? 'Сохранение...' : 'Сохранить' }}</button>
      <button
        v-if="charStore.isEdit && charStore.characterId"
        class="action-btn danger"
        :disabled="deleteStatus === 'loading'"
        @click="handleDelete"
        style="padding:7px 10px;"
      >✕</button>
    </div>

    <!-- Character banner -->
    <div class="char-banner">
      <div class="char-banner-top">
        <input
          v-if="charStore.isEdit"
          v-model="character.charName"
          class="field-input"
          style="font-family:var(--font-char); font-size:28px; font-style:italic; font-weight:300; color:#fff; max-width:300px; padding:0 0 4px;"
          placeholder="Имя персонажа"
        />
        <span v-else class="char-name-vtm">{{ character.charName }}</span>
        <span v-if="clanName" class="clan-badge">{{ clanName }}</span>
        <span v-if="generation" class="char-banner-meta">{{ generation }}-е поколение</span>
      </div>

      <!-- Status dots -->
      <div class="status-row">
        <span class="status-label">Здоровье</span>
        <div class="dots-row">
          <span
            v-for="i in maxHealth" :key="i"
            :class="dotClass(i - 1, health)"
            @click="toggleDot('health', i - 1)"
          />
        </div>
      </div>
      <div class="status-row">
        <span class="status-label">Сила воли</span>
        <div class="dots-row">
          <span
            v-for="i in maxWill" :key="i"
            :class="dotClass(i - 1, will)"
            @click="toggleDot('will', i - 1)"
          />
        </div>
      </div>
      <div class="status-row">
        <span class="status-label">Человечность</span>
        <div class="dots-row">
          <span
            v-for="i in maxHumanity" :key="i"
            :class="dotClass(i - 1, humanity)"
            @click="toggleDot('humanity', i - 1)"
          />
        </div>
      </div>
      <div class="status-row">
        <span class="hunger-label">Голод</span>
        <div class="dots-row">
          <span
            v-for="i in 5" :key="i"
            :class="i <= hunger ? 'dot hunger-on' : 'dot hunger'"
            @click="charStore.isEdit && (character.common.hunger = character.common.hunger === i ? i - 1 : i)"
          />
        </div>
      </div>
    </div>

    <!-- Mobile tabs -->
    <div class="char-tabs">
      <span
        v-for="tab in tabs"
        :key="tab.id"
        class="char-tab"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</span>
    </div>

    <!-- Content area -->
    <div style="flex:1; overflow-y:auto;">

      <!-- IDENTITY -->
      <div v-show="activeTab === 'identity'" class="sheet-section">
        <div class="section-label">Личность</div>
        <div style="padding:16px 20px;">
          <!-- Clan selector -->
          <div style="margin-bottom:16px;">
            <label class="field-label">Клан</label>
            <ClanSelector
              :modelValue="character.clan ?? null"
              @update:modelValue="charStore.setClan($event)"
              :disabled="!charStore.isEdit"
            />
          </div>
          <!-- Text fields -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px;">
            <div v-for="field in identityFields" :key="field.id">
              <label class="field-label">{{ field.name }}</label>
              <input
                v-if="charStore.isEdit"
                v-model="field.value"
                class="field-input"
              />
              <div v-else class="field-value">{{ field.value || '—' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ATTRIBUTES -->
      <div v-show="activeTab === 'attributes'" class="sheet-section">
        <div class="section-label">Физические</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:10px;">
          <div v-for="attr in physicalAttrs" :key="attr.id" style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:13px; color:var(--t2); width:130px; flex-shrink:0;">{{ attr.ruName }}</span>
            <div class="dots-row">
              <span
                v-for="i in 5" :key="i"
                :class="i <= attr.value ? 'dot filled' : 'dot'"
                @click="charStore.isEdit && (attr.value = attr.value === i ? i - 1 : i)"
              />
            </div>
          </div>
        </div>
        <div class="section-label">Социальные</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:10px;">
          <div v-for="attr in socialAttrs" :key="attr.id" style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:13px; color:var(--t2); width:130px; flex-shrink:0;">{{ attr.ruName }}</span>
            <div class="dots-row">
              <span
                v-for="i in 5" :key="i"
                :class="i <= attr.value ? 'dot filled' : 'dot'"
                @click="charStore.isEdit && (attr.value = attr.value === i ? i - 1 : i)"
              />
            </div>
          </div>
        </div>
        <div class="section-label">Ментальные</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:10px;">
          <div v-for="attr in mentalAttrs" :key="attr.id" style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:13px; color:var(--t2); width:130px; flex-shrink:0;">{{ attr.ruName }}</span>
            <div class="dots-row">
              <span
                v-for="i in 5" :key="i"
                :class="i <= attr.value ? 'dot filled' : 'dot'"
                @click="charStore.isEdit && (attr.value = attr.value === i ? i - 1 : i)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ABILITIES -->
      <div v-show="activeTab === 'abilities'" class="sheet-section">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">
          <div>
            <div class="section-label">Физические</div>
            <div style="padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
              <div v-for="ab in physicalSkills" :key="ab.id" style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:12px; color:var(--t2); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ ab.ruName }}</span>
                <div class="dots-row">
                  <span
                    v-for="i in 5" :key="i"
                    :class="i <= ab.value ? 'dot filled' : 'dot'"
                    style="width:9px; height:9px;"
                    @click="charStore.isEdit && (ab.value = ab.value === i ? i - 1 : i)"
                  />
                </div>
              </div>
            </div>
            <div class="section-label">Социальные</div>
            <div style="padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
              <div v-for="ab in socialSkills" :key="ab.id" style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:12px; color:var(--t2); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ ab.ruName }}</span>
                <div class="dots-row">
                  <span
                    v-for="i in 5" :key="i"
                    :class="i <= ab.value ? 'dot filled' : 'dot'"
                    style="width:9px; height:9px;"
                    @click="charStore.isEdit && (ab.value = ab.value === i ? i - 1 : i)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="section-label">Ментальные</div>
            <div style="padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
              <div v-for="ab in mentalSkills" :key="ab.id" style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:12px; color:var(--t2); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ ab.ruName }}</span>
                <div class="dots-row">
                  <span
                    v-for="i in 5" :key="i"
                    :class="i <= ab.value ? 'dot filled' : 'dot'"
                    style="width:9px; height:9px;"
                    @click="charStore.isEdit && (ab.value = ab.value === i ? i - 1 : i)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DISCIPLINES -->
      <div v-show="activeTab === 'disciplines'" class="sheet-section">
        <div class="section-label">Дисциплины</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:10px;">
          <div
            v-for="disc in character.disciplines"
            :key="disc.id"
            style="display:flex; align-items:center; gap:12px;"
          >
            <span style="font-size:12px; color:var(--t2); flex:1;">{{ disc.name }}</span>
            <div class="dots-row">
              <span
                v-for="i in 5" :key="i"
                :class="[i <= disc.value ? 'dot filled' : 'dot']"
                style="border-color: var(--gold-dim);"
                :style="i <= disc.value ? { background: 'var(--gold)', borderColor: 'var(--gold)' } : {}"
                @click="charStore.isEdit && (disc.value = disc.value === i ? i - 1 : i)"
              />
            </div>
          </div>
          <div
            v-if="!character.disciplines.length"
            style="font-size:13px; color:var(--t3); letter-spacing:1px; padding:8px 0;"
          >
            Выберите клан для автозаполнения дисциплин
          </div>
        </div>

        <div class="section-label">Сила крови</div>
        <div style="padding:12px 20px; display:flex; align-items:center; gap:12px;">
          <span style="font-size:13px; color:var(--t2); width:130px;">Потенциал</span>
          <div class="dots-row">
            <span
              v-for="i in 10" :key="i"
              :class="i <= (character.bloodPotency[0]?.value ?? 0) ? 'dot filled' : 'dot'"
              @click="charStore.isEdit && (character.bloodPotency[0] ? (character.bloodPotency[0].value = character.bloodPotency[0].value === i ? i - 1 : i) : character.bloodPotency.push({ id: 1, name: 'Потенциал', value: i }))"
            />
          </div>
        </div>

        <div class="section-label">Достоинства и изъяны</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:8px;">
          <div
            v-for="merit in character.advantages"
            :key="merit.id"
            style="display:flex; align-items:center; justify-content:space-between;"
          >
            <span style="font-size:13px; color:var(--t2);">{{ merit.name }}</span>
            <div class="dots-row">
              <span v-for="i in merit.value" :key="i" class="dot filled" />
            </div>
          </div>
          <div
            v-if="!character.advantages.length"
            style="font-size:13px; color:var(--t3); letter-spacing:1px;"
          >Нет достоинств</div>
        </div>

        <div class="section-label">Опыт</div>
        <div style="padding:12px 20px; display:flex; gap:24px;">
          <div>
            <label class="field-label">Получено</label>
            <input
              v-if="charStore.isEdit"
              v-model.number="character.totalExperience"
              type="number"
              class="field-input"
              style="width:60px;"
            />
            <div v-else class="field-value">{{ character.totalExperience }}</div>
          </div>
          <div>
            <label class="field-label">Потрачено</label>
            <input
              v-if="charStore.isEdit"
              v-model.number="character.spentExperience"
              type="number"
              class="field-input"
              style="width:60px;"
            />
            <div v-else class="field-value">{{ character.spentExperience }}</div>
          </div>
          <div>
            <label class="field-label">Остаток</label>
            <div class="field-value primary">{{ character.totalExperience - character.spentExperience }}</div>
          </div>
        </div>
      </div>

      <!-- STATE -->
      <div v-show="activeTab === 'state'" class="sheet-section">
        <div class="section-label">Здоровье</div>
        <div style="padding:12px 20px;">
          <div style="display:flex; gap:6px; margin-bottom:8px; align-items:center;">
            <span style="font-size:12px; color:var(--lbl); width:80px; letter-spacing:1px; text-transform:uppercase;">Макс.</span>
            <input
              v-if="charStore.isEdit"
              v-model.number="character.common.maxHealth"
              type="number" min="1" max="20"
              class="field-input"
              style="width:50px;"
            />
            <span v-else style="font-size:14px; color:var(--t1);">{{ maxHealth }}</span>
          </div>
          <div class="dots-row" style="flex-wrap:wrap; gap:6px;">
            <span
              v-for="i in maxHealth" :key="i"
              :class="i <= health ? 'dot filled' : 'dot'"
              @click="toggleDot('health', i - 1)"
            />
          </div>
        </div>
        <div class="section-label">Сила воли</div>
        <div style="padding:12px 20px;">
          <div class="dots-row" style="flex-wrap:wrap; gap:6px;">
            <span
              v-for="i in maxWill" :key="i"
              :class="i <= will ? 'dot filled' : 'dot'"
              @click="toggleDot('will', i - 1)"
            />
          </div>
        </div>
        <div class="section-label">Человечность</div>
        <div style="padding:12px 20px;">
          <div class="dots-row" style="flex-wrap:wrap; gap:6px;">
            <span
              v-for="i in maxHumanity" :key="i"
              :class="i <= humanity ? 'dot filled' : 'dot'"
              @click="toggleDot('humanity', i - 1)"
            />
          </div>
        </div>
        <div class="section-label" style="color:#8a1020;">
          <span style="width:12px; height:1px; background:#8a1020; display:inline-block;" />
          Голод
        </div>
        <div style="padding:12px 20px;">
          <div class="dots-row" style="gap:6px;">
            <span
              v-for="i in 5" :key="i"
              :class="i <= hunger ? 'dot hunger-on' : 'dot hunger'"
              @click="charStore.isEdit && (character.common.hunger = character.common.hunger === i ? i - 1 : i)"
            />
          </div>
        </div>
      </div>

      <!-- NOTES -->
      <div v-show="activeTab === 'notes'" class="sheet-section">
        <div class="section-label">Убеждения</div>
        <div style="padding:12px 20px;">
          <textarea
            v-if="charStore.isEdit"
            v-model="character.tenets"
            class="field-input"
            style="height:80px; resize:vertical; font-family:var(--font-body);"
            placeholder="Убеждения персонажа..."
          />
          <div v-else style="font-size:13px; color:var(--t2); line-height:1.6; white-space:pre-wrap;">
            {{ character.tenets || '—' }}
          </div>
        </div>
        <div class="section-label">Точки опоры</div>
        <div style="padding:12px 20px;">
          <textarea
            v-if="charStore.isEdit"
            v-model="character.touchStones"
            class="field-input"
            style="height:80px; resize:vertical; font-family:var(--font-body);"
            placeholder="Точки опоры..."
          />
          <div v-else style="font-size:13px; color:var(--t2); line-height:1.6; white-space:pre-wrap;">
            {{ character.touchStones || '—' }}
          </div>
        </div>
        <div class="section-label">Заметки</div>
        <div style="padding:12px 20px;">
          <textarea
            v-if="charStore.isEdit"
            v-model="character.notes"
            class="field-input"
            style="height:160px; resize:vertical; font-family:var(--font-body);"
            placeholder="Заметки..."
          />
          <div v-else style="font-size:13px; color:var(--t2); line-height:1.6; white-space:pre-wrap;">
            {{ character.notes || '—' }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.sheet-section {
  display: flex;
  flex-direction: column;
}
textarea.field-input {
  resize: vertical;
  min-height: 80px;
}
/* On desktop: show all sections, no tab hiding */
@media (min-width: 1024px) {
  .sheet-section { display: flex !important; }
}
</style>
