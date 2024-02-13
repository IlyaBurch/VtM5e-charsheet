import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const mainInfo = ref([
    { id: 1, name: 'Клан', value: 'lorem'},
    { id: 2, name: 'Хроника', value: 'lorem'},
    { id: 3, name: 'Сир', value: 'lorem'},
    { id: 4, name: 'Концепция', value: 'lorem'},
    { id: 5, name: 'Цель', value: 'lorem'},
    { id: 6, name: 'Прихоть', value: 'lorem'},
    { id: 7, name: 'Стиль охоты', value: 'lorem'},
    { id: 8, name: 'Поколение', value: 'lorem'},
    { id: 9, name: 'Резонанс', value: 'lorem'},
  ])
  
  const attributes = ref([
    { id: 1, name : 'strength', ruName: 'Сила', value : 3,},
    { id: 2, name : 'dexterity',ruName: 'Ловкость', value : 2,},
    {id: 3, name : 'stamina', ruName: 'Выносливость',value : 2,},
    {id: 4, name : 'charisma', ruName: 'Обаяние',value : 2,},
    {id: 5, name : 'manipulation', ruName: 'Манипуляция',value : 2,},
    {id: 6, name : 'composure', ruName: 'Самообладание',value : 2,},
    { id: 7,name : 'intelligence', ruName: 'Интеллект',value : 2,},
    {id: 8,name : 'wits', ruName: 'Смекалка',value : 2,},
    {id: 9,name : 'resolve', ruName: 'Упорство',value : 2,},
    
  ]);

  const abilities = ref([
    {id : 1, ruName: 'Атлетика', value: 5},
    {id : 2, ruName: 'Вождение', value: 5},
    {id : 3, ruName: 'Воровство', value: 5},
    {id : 4, ruName: 'Выживание', value: 5},
    {id : 5, ruName: 'Драка', value: 5},
    {id : 6, ruName: 'Ремесло', value: 5},
    {id : 7, ruName: 'Скрытность', value: 5},
    {id : 8, ruName: 'Стрельба', value: 5},
    {id : 9, ruName: 'Фехтование', value: 5},
    {id : 10, ruName: 'Запугивание', value: 5},
    {id : 11, ruName: 'Исполнение', value: 5},
    {id : 12, ruName: 'Лидерство', value: 5},
    {id : 13, ruName: 'Обращение с животными', value: 5},
    {id : 14, ruName: 'Проницательность', value: 5},
    {id : 15, ruName: 'Убеждение', value: 5},
    {id : 16, ruName: 'Уличное чутье', value: 5},
    {id : 17, ruName: 'Хитрость', value: 5},
    {id : 18, ruName: 'Этикет', value: 5},
    {id : 19, ruName: 'Гуманитарные науки', value: 5},
    {id : 20, ruName: 'Естественные науки', value: 5},
    {id : 21, ruName: 'Медицина', value: 5},
    {id : 22, ruName: 'Наблюдательность', value: 5},
    {id : 23, ruName: 'Оккультизм', value: 5},
    {id : 24, ruName: 'Политика', value: 5},
    {id : 25, ruName: 'Расследование', value: 5},
    {id : 26, ruName: 'Техника', value: 5},
    {id : 27, ruName: 'Финансы', value: 5},
]);

const commons = ref([
  {id: 1, name: 'Здоровье', value: 10 },
  { id: 2, name: 'Воля', value: 10},
  { id: 3, name: 'Голод', value: 5},
  { id: 4, name: 'Человечность', value: 10},
]);

const isEdit = ref(false)

const save = () => {
  if (isEdit.value === true){
    isEdit.value = false;
  }
}

const edit = () => {
  if (isEdit.value === false){
    isEdit.value = true;
  }
}

  return { mainInfo, attributes, abilities, commons, isEdit, edit, save }
})
