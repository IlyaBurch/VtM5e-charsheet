import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from "./user";
import { supabase } from '@/supabase';
import { useI18n } from 'vue-i18n';

export const useCharacterStore = defineStore("character", () => {


  const { t } = useI18n({ 
    messages:{
    en: {
      trueAge : ' True Age',
      apparentAge: 'Apparent Age',
      dateOfBirth: 'Date of Birth',
      dateOfDeath: 'Date of Death',
      appearance: 'Appearance',
      distinguishingFeatures: 'Distinguishing Features',
      history: 'History',
    },
    ru: {
      trueAge : 'Истинный возраст',
      apparentAge: 'Видимый возраст',
      dateOfBirth: 'Дата рождения',
      dateOfDeath: 'Дата смерти',
      appearance: 'Внешний вид',
      distinguishingFeatures: 'Отличительные черты',
      history: 'История',
    }
  }
  });
  
  const user = useUserStore();
  
  // Основная информация о персонаже
  const character = ref({
    charName: 'Новый персонаж',
    mainInfo: [
      { id: 1, name: 'Клан', value: 'lorem'},
      { id: 2, name: 'Хроника', value: 'lorem'},
      { id: 3, name: 'Сир', value: 'lorem'},
      { id: 4, name: 'Концепция', value: 'lorem'},
      { id: 5, name: 'Цель', value: 'lorem'},
      { id: 6, name: 'Прихоть', value: 'lorem'},
      { id: 7, name: 'Стиль охоты', value: 'lorem'},
      { id: 8, name: 'Поколение', value: 'lorem'},
      { id: 9, name: 'Резонанс', value: 'lorem'},
    ],
    attributes: [
      { id: 1, name: 'strength', ruName: 'Сила', value: 3},
      { id: 2, name: 'dexterity', ruName: 'Ловкость', value: 2},
      { id: 3, name: 'stamina', ruName: 'Выносливость', value: 2},
      { id: 4, name: 'charisma', ruName: 'Обаяние', value: 2},
      { id: 5, name: 'manipulation', ruName: 'Манипуляция', value: 2},
      { id: 6, name: 'composure', ruName: 'Самообладание', value: 2},
      { id: 7, name: 'intelligence', ruName: 'Интеллект', value: 2},
      { id: 8, name: 'wits', ruName: 'Смекалка', value: 2},
      { id: 9, name: 'resolve', ruName: 'Упорство', value: 2},
    ],
    abilities: [
      { id: 1, ruName: 'Атлетика', value: 5},
      { id: 2, ruName: 'Вождение', value: 5},
      { id: 3, ruName: 'Воровство', value: 5},
      { id: 4, ruName: 'Выживание', value: 5},
      { id: 5, ruName: 'Драка', value: 5},
      { id: 6, ruName: 'Ремесло', value: 5},
      { id: 7, ruName: 'Скрытность', value: 5},
      { id: 8, ruName: 'Стрельба', value: 5},
      { id: 9, ruName: 'Фехтование', value: 5},
      { id: 10, ruName: 'Запугивание', value: 5},
      { id: 11, ruName: 'Исполнение', value: 5},
      { id: 12, ruName: 'Лидерство', value: 5},
      { id: 13, ruName: 'Обращение с животными', value: 5},
      { id: 14, ruName: 'Проницательность', value: 5},
      { id: 15, ruName: 'Убеждение', value: 5},
      { id: 16, ruName: 'Уличное чутье', value: 5},
      { id: 17, ruName: 'Хитрость', value: 5},
      { id: 18, ruName: 'Этикет', value: 5},
      { id: 19, ruName: 'Гуманитарные науки', value: 5},
      { id: 20, ruName: 'Естественные науки', value: 5},
      { id: 21, ruName: 'Медицина', value: 5},
      { id: 22, ruName: 'Наблюдательность', value: 5},
      { id: 23, ruName: 'Оккультизм', value: 5},
      { id: 24, ruName: 'Политика', value: 5},
      { id: 25, ruName: 'Расследование', value: 5},
      { id: 26, ruName: 'Техника', value: 5},
      { id: 27, ruName: 'Финансы', value: 5},
    ],
    commons: [
      { id: 1, name: 'Здоровье', value: 10},
      { id: 2, name: 'Воля', value: 10},
      { id: 3, name: 'Голод', value: 5},
      { id: 4, name: 'Человечность', value: 10},
    ],
    common: {
      health: 6,
      maxHealth: 10,
      will: 7,
      maxWill: 10,
      humanity: 8,
      maxHumanity: 10,
      hunger: 5,
    },
    disciplines: [],
    tenets : '',
    touchStones: '',
    clanBane: '',
    advantages: [],
    bloodPotency: [],
    totalExperience: 0,
    spentExperience: 0,
    bodyInfo: [
      { id: 1, name: t('trueAge') , value: 0},
      { id: 2, name: t('apparentAge') , value: 0},
      { id: 3, name: t('dateOfBirth') , value: new Date},
      { id: 4, name: t('dateOfDeath') , value: new Date},
      { id: 5, name: t('appearance') , value: ''},
      { id: 6, name: t('distinguishingFeatures') , value: 0},
      { id: 7, name: t('history') , value: 0},
    ],
    notes: '',
  });

  const isEdit = ref(false);

  // Методы
  function addDiscipline(id, name, value) {
    character.value.disciplines.push({ id, name, value });
  }

  function removeDiscipline(id) {
    removeMethod(id, character.value.disciplines);
  }

  function removeMethod(id, arr) {
    const index = arr.findIndex(item => item.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  function save() {
    isEdit.value = false;
  }

  function edit() {
    isEdit.value = true;
  }

  const jsonData = computed(() => ({
    id: 1,
    charname: character.value.charName,
    mainInfo: character.value.mainInfo,
    attributes: character.value.attributes,
    abilities: character.value.abilities,
    commons: character.value.commons,
    common: character.value.common,
    disciplines: character.value.disciplines,
  }));

  async function uploadJSONToSupabase() {
    const store = user.$id;
    const bucketName = 'chars';
    const path = `users/${store}/data.json`;

    const { error } = await supabase.storage.from(bucketName).upload(path, JSON.stringify(jsonData.value), {
      upsert: true,
      cacheControl: '3600',
    });

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully!');
    }
  }

  return {
    character,
    isEdit,
    addDiscipline,
    removeDiscipline,
    removeMethod,
    save,
    edit,
    uploadJSONToSupabase
  };
}, {
  persist: true
});
