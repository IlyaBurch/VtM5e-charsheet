<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MOCK_MORK_CHARACTER } from '@/data/morkborg.data'

const router = useRouter()

// Reactive copy of mock data for interactivity
const char = reactive({ ...MOCK_MORK_CHARACTER,
  stats: MOCK_MORK_CHARACTER.stats.map(s => ({ ...s })),
  weapons: MOCK_MORK_CHARACTER.weapons.map(w => ({ ...w })),
  armor: { ...MOCK_MORK_CHARACTER.armor },
  equipment: [...MOCK_MORK_CHARACTER.equipment],
  omens: { ...MOCK_MORK_CHARACTER.omens },
  hp: { ...MOCK_MORK_CHARACTER.hp },
})

// Suffering bitmask: which cells (1–6) are active
const sufferingActive = ref<Set<number>>(
  new Set(Array.from({ length: MOCK_MORK_CHARACTER.suffering }, (_, i) => i + 1))
)

function toggleSuffering(n: number) {
  if (sufferingActive.value.has(n)) {
    sufferingActive.value.delete(n)
  } else {
    sufferingActive.value.add(n)
  }
}

// Omens
const omensUsed = ref(char.omens.used)
function toggleOmen(i: number) {
  omensUsed.value = omensUsed.value === i ? i - 1 : i
}

// Side nav (scrollIntoView)
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="mork-wrap">
    <!-- Toolbar -->
    <div style="display:flex; align-items:center; gap:8px; padding:8px 12px; border-bottom:1px solid var(--b2); flex-shrink:0;">
      <button class="back-btn" @click="router.push('/characters')">Все персонажи</button>
      <span style="flex:1;" />
      <span style="font-size:8px; color:var(--gold-dim); letter-spacing:1px; border:1px solid var(--b2); padding:3px 8px;">
        ДЕМО-ЛИСТ
      </span>
    </div>

    <!-- Character header -->
    <div class="char-banner" style="border-bottom:1px solid var(--b);">
      <div class="char-banner-top">
        <span class="mb-char-name">{{ char.name }}</span>
        <span style="font-size:9px; color:var(--gold); border:1px solid var(--gold-dim); padding:3px 8px; letter-spacing:1px; text-transform:uppercase;">
          {{ char.class }}
        </span>
      </div>
      <div style="display:flex; align-items:baseline; gap:10px; margin-top:8px;">
        <span class="mb-hp-current">{{ char.hp.current }}</span>
        <span class="mb-hp-max">/ {{ char.hp.max }}</span>
        <span style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase; margin-left:4px;">ОЗ</span>
      </div>
    </div>

    <!-- Mobile section tabs (scrollIntoView) -->
    <div class="char-tabs">
      <span class="char-tab" @click="scrollTo('mb-char')">Персонаж</span>
      <span class="char-tab" @click="scrollTo('mb-stats')">Характ.</span>
      <span class="char-tab" @click="scrollTo('mb-combat')">Бой</span>
      <span class="char-tab" @click="scrollTo('mb-equip')">Снаряжение</span>
      <span class="char-tab" @click="scrollTo('mb-omens')">Знамения</span>
      <span class="char-tab" @click="scrollTo('mb-notes')">Заметки</span>
    </div>

    <!-- Scrollable content -->
    <div style="flex:1; overflow-y:auto; padding-bottom:24px;">

      <!-- #char -->
      <div id="mb-char">
        <div class="section-label">Персонаж</div>
        <div style="padding:16px 20px; display:flex; flex-direction:column; gap:14px;">
          <div>
            <label class="field-label">Описание</label>
            <div class="field-value" style="line-height:1.7;">{{ char.description }}</div>
          </div>
          <div>
            <label class="field-label">Хладнокровие</label>
            <div class="field-value">{{ char.grit }}</div>
          </div>
          <div>
            <label class="field-label">Способности класса</label>
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:6px;">
              <div
                v-for="ab in char.classAbilities"
                :key="ab.name"
                style="background:var(--bg3); padding:10px 14px;"
              >
                <div style="font-family:var(--font-mb); font-size:13px; color:var(--gold); margin-bottom:4px;">
                  {{ ab.name }}
                </div>
                <div style="font-size:11px; color:var(--t2); line-height:1.6;">{{ ab.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- #stats -->
      <div id="mb-stats">
        <div class="section-label">Характеристики</div>
        <div style="padding:12px 20px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div v-for="stat in char.stats" :key="stat.name" class="mb-stat-cell">
            <div>
              <div class="mb-stat-mod">{{ stat.modifier }}</div>
              <div style="font-size:9px; color:var(--lbl); letter-spacing:1px; text-transform:uppercase; margin-top:2px;">
                {{ stat.name }}
              </div>
            </div>
            <div class="mb-stat-raw">{{ stat.raw }}</div>
          </div>
        </div>
      </div>

      <!-- #combat -->
      <div id="mb-combat">
        <div class="section-label">Бой</div>
        <div style="padding:12px 20px; display:flex; flex-direction:column; gap:10px;">
          <div
            v-for="(weapon, wi) in char.weapons"
            :key="wi"
            style="background:var(--bg3); padding:10px 14px; display:flex; justify-content:space-between; align-items:center;"
          >
            <div>
              <div style="font-family:var(--font-mb); font-size:13px; color:var(--t1);">{{ weapon.name }}</div>
              <div v-if="weapon.special" style="font-size:9px; color:var(--t3); letter-spacing:1px; margin-top:2px;">
                {{ weapon.special }}
              </div>
            </div>
            <div style="font-family:var(--font-mb); font-size:18px; color:var(--gold);">{{ weapon.damage }}</div>
          </div>

          <!-- Armor -->
          <div style="background:var(--bg3); padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase; margin-bottom:4px;">Броня</div>
              <div style="font-family:var(--font-mb); font-size:13px; color:var(--t1);">{{ char.armor.name }}</div>
            </div>
            <div>
              <div style="font-size:8px; color:var(--lbl); letter-spacing:1px; text-transform:uppercase; margin-bottom:2px; text-align:right;">Снижение</div>
              <div style="font-family:var(--font-mb); font-size:18px; color:var(--gold);">{{ char.armor.reduction }}</div>
            </div>
          </div>

          <!-- Suffering -->
          <div style="margin-top:8px;">
            <div style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase; margin-bottom:8px;">Страдания</div>
            <div style="display:flex; gap:6px;">
              <div
                v-for="n in 6"
                :key="n"
                class="mb-suffering-cell"
                :class="{ active: sufferingActive.has(n) }"
                @click="toggleSuffering(n)"
              >{{ n }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- #equip -->
      <div id="mb-equip">
        <div class="section-label">Снаряжение</div>
        <div style="padding:12px 20px;">
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; margin-bottom:16px;">
            <div
              v-for="(slot, si) in char.equipment"
              :key="si"
              style="background:var(--bg3); padding:8px 10px; min-height:44px; display:flex; align-items:center;"
            >
              <span style="font-size:10px; color:var(--t2);">{{ slot || '' }}</span>
            </div>
          </div>
          <div style="display:flex; align-items:baseline; gap:10px;">
            <span class="mb-silver-val">{{ char.silver }}</span>
            <span style="font-size:8px; color:var(--lbl); letter-spacing:2px; text-transform:uppercase;">Серебра</span>
          </div>
        </div>
      </div>

      <!-- #omens -->
      <div id="mb-omens">
        <div class="section-label">Знамения</div>
        <div style="padding:12px 20px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <div
              v-for="i in char.omens.total"
              :key="i"
              class="mb-omen"
              :class="{ used: i <= omensUsed }"
              @click="toggleOmen(i)"
            >✦</div>
          </div>
          <div style="font-size:9px; color:var(--t3); margin-top:8px; letter-spacing:1px;">
            {{ omensUsed }} / {{ char.omens.total }} использовано
          </div>
        </div>
      </div>

      <!-- #notes -->
      <div id="mb-notes">
        <div class="section-label">Заметки</div>
        <div style="padding:12px 20px;">
          <textarea
            v-model="char.notes"
            class="field-input"
            style="height:160px; resize:vertical; font-family:var(--font-mb); font-size:12px;"
            placeholder="Заметки..."
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.mork-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
