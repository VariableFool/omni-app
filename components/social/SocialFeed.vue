<script setup lang="ts">
const categories = [
  'Политика',
  'Игры',
  'Технологии',
  'Наука',
  'Спорт',
  'Кино',
  'Музыка',
  'Авто',
  'Экономика',
  'Мода',
];
</script>

<template>
  <div
    class="lg:p-4 min-h-[calc(100dvh-112px)] lg:min-h-[calc(100dvh-48px)] flex flex-col lg:flex-row lg:justify-center gap-4"
  >
    <UCard
      :ui="{
        root: 'w-full lg:max-w-2xs rounded-none lg:rounded-lg lg:rounded-lg lg:ring-1 lg:ring-gray-300 lg:dark:ring-gray-800 text-sky-500',
        header: 'font-bold lg:text-xl hidden lg:flex',
      }"
    >
      <template #header>
        <h1>Категории</h1>
      </template>

      <div class="flex lg:flex-col flex-wrap gap-4 lg:gap-2 justify-center">
        <span v-for="category in categories" class="text-xl lg:cursor-pointer lg:hover:underline"
          >#{{ category }}</span
        >
      </div>
    </UCard>
    <UCard
      :ui="{
        root: 'w-full flex-1 lg:max-w-2xl rounded-none lg:rounded-lg lg:ring-1 lg:ring-gray-300 lg:dark:ring-gray-800 text-sky-500',
        header: 'font-bold lg:text-xl hidden lg:flex',
      }"
    >
      <template #header>
        <h1>Посты</h1>
      </template>
      <p></p>
      <SocialSendMessage />
    </UCard>
  </div>
</template>
