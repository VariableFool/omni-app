<script setup lang="ts">
const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

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

onMounted(async () => {
  if (posts.value.length === 0) {
    await postStore.fetchPosts();
  }
});
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
        body: 'p-0 sm:p-0',
      }"
    >
      <template #header>
        <h1>Посты</h1>
      </template>

      <SocialSendMessage />

      <div v-if="posts.length === 0" class="flex flex-col">
        <div
          v-for="n in 5"
          :key="n"
          class="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700 animate-pulse"
        >
          <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="w-2/4 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-15 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col mb-[63px] lg:mb-0">
        <SocialPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </UCard>
  </div>
</template>
