<script setup lang="ts">
import type { TabsItem, TimelineItem } from '@nuxt/ui';

const { width } = useWindowSize();

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
    date: '3 июля 2025',
    title: 'Задача на завтра',
    description: `Планируется реализовать добавление постов в разделе «Сеть». Также — оформление ленты в разделе «Сеть» в стиле Twitter.`,
    icon: 'svg-spinners:blocks-shuffle-3',
    ui: activeTask,
  },
  {
    date: '2 июля 2025',
    title: 'Редактирование профиля',
    description:
      'Работа велась как на фронтенде, так и на бэкенде. Реализовано базовое редактирование данных пользователя через профиль.',
    icon: 'lucide:code',
  },
  {
    date: '2 июля 2025',
    title: 'Редактирование профиля',
    description:
      'Работа велась как на фронтенде, так и на бэкенде. Реализовано базовое редактирование данных пользователя через профиль.',
    icon: 'lucide:code',
  },
  {
    date: '2 июля 2025',
    title: 'Редактирование профиля',
    description:
      'Работа велась как на фронтенде, так и на бэкенде. Реализовано базовое редактирование данных пользователя через профиль.',
    icon: 'lucide:code',
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
    date: '13 июня 2025 - 30 июня 2025',
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
    const len = historyItems.value.length;
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
