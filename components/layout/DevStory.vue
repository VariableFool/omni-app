<script setup lang="ts">
import type { TabsItem, TimelineItem } from '@nuxt/ui';

const activeTask = {
  indicator: 'group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted',
  separator: 'group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted',
};

const tabsItems = ref<TabsItem[]>([
  {
    label: 'История разработки',
    icon: 'lucide:history',
  },
  {
    label: 'Как это работает? (Cкоро)',
    icon: 'lucide:presentation',
    disabled: true,
  },
]);

const historyItems = ref<TimelineItem[]>([
  {
    date: 'Скоро',
    title: 'Раздел с ИИ',
    description: 'В разработке — мини-чат с ИИ, которым можно будет пользоваться бесплатно.',
    icon: 'lucide:bot-message-square',
  },
  {
    date: '12 - 13 июля 2025',
    title: 'Продолжение разработки раздела «Соцсеть»',
    description:
      'Будут реализованы функции мини-профиля при наведении на аватар или имя пользователя, а также возможность комментировать, репостить, ставить лайки.',
    icon: 'svg-spinners:blocks-shuffle-3',
    ui: activeTask,
  },
  {
    date: '11 июля 2025',
    title: 'Смена пароля',
    description:
      'Добавлена возможность смены пароля в профиле с проверкой старого пароля и валидацией новых данных.',
    icon: 'lucide:key-square',
  },
  {
    date: '10 июля 2025',
    title: 'Продолжение разработки раздела «Соцсеть»',
    description:
      'Добавлена базовая регистрация и авторизация. Вы можете попробовать прямо сейчас и узнать, какие функции доступны на данный момент авторизованным пользователям.',
    icon: 'lucide:twitter',
  },
  {
    date: '6 - 9 июля 2025',
    title: 'Рефакторинг раздела «Соцсеть»',
    description:
      'Раздел переписан с нуля, с соблюдением общих принципов оформления и структуры кода. Реализовано добавление постов.',
    icon: 'lucide:code',
  },
  {
    date: '3 июля 2025 - 5 июля 2025',
    title: 'Полный рефакторинг базового UI и логики компонентов',
    description:
      'Исходный код переписан с нуля. Компоненты упрощены, улучшена читаемость и масштабируемость.',
    icon: 'lucide:palette',
  },
  {
    date: '2 июля 2025',
    title: 'Редактирование профиля',
    description:
      'Работа велась как на фронтенде, так и на бэкенде. Реализовано базовое редактирование данных пользователя через профиль.',
    icon: 'lucide:code',
  },
  {
    date: '1 июля 2025',
    title: 'Хронология разработки, свайп-меню',
    description: `Добавлена временная шкала разработки, чтобы заинтересованные могли наблюдать за процессом в реальном времени. 
      Удобное и интуитивное свайп-меню, открывающееся при движении пальцем слева направо на мобильных устройствах.`,
    icon: 'lucide:square-menu',
  },
  {
    date: '13 - 30 июня 2025',
    title: 'Цикл разработки',
    description:
      'Разработка frontend и backend. Реализованы основные функции и интегрированы с API. Добавлен автодеплой (GitHub Actions).',
    icon: 'lucide:code',
  },
  {
    date: '13 июня 2025',
    title: 'Начало разработки Omni app',
    description: 'Первый запуск.',
    icon: 'lucide:rocket',
  },
]);

const active = ref(historyItems.value.length - 2);

onMounted(() => {
  setInterval(() => {
    const len = historyItems.value.length - 1;
    if (len < 2) return;

    const lastTwo = [len - 2, len - 1];
    active.value = active.value === lastTwo[0] ? lastTwo[1] : lastTwo[0];
  }, 1500);
});
</script>

<template>
  <UCard
    class="h-full"
    :ui="{
      root: 'lg:max-w-3xl over rounded-none lg:rounded-lg flex flex-col-reverse lg:flex-col lg:mx-auto',
      body: 'overflow-y-scroll scrollbar-w-1 scrollbar scrollbar-thumb-sky-500 dark:scrollbar-thumb-sky-800',
      header: 'border-0',
    }"
  >
    <template #header>
      <UTabs color="secondary" :items="tabsItems" />
    </template>

    <UTimeline v-model="active" color="secondary" :items="historyItems" reverse />
  </UCard>
</template>
