<script setup lang="ts">
import type { NewsModel } from '~/types';

const props = defineProps<{
  news: NewsModel;
}>();

const rawDate = props.news.pubDate;
const formatted = new Date(rawDate).toLocaleString('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function openLink(url: string) {
  window.open(url, '_blank');
}

const imageLoaded = ref(false);
</script>

<template>
  <div
    class="bg-white border-1 border-gray-200 dark:border-0 dark:bg-sky-200/10 m-2 sm:my-6 p-2 rounded-2xl flex flex-col gap-2 sm:max-w-3xl sm:p-4"
  >
    <a
      :href="props.news.link"
      target="_blank"
      title="Откроется в новой вкладке"
      class="font-semibold text-lg sm:text-2xl text-gray-800 dark:text-sky-100 sm:hover:text-sky-400 transition-all"
    >
      {{ news.title }}
    </a>
    <p class="text-sm sm:text-md text-gray-500 dark:text-gray-400">{{ formatted }}</p>

    <LoadingSpinner v-if="props.news.image && !imageLoaded" :message="'Загружаю картинку...'" />
    <NuxtImg
      v-if="props.news.image !== null"
      loading="lazy"
      :src="props.news.image"
      @load="imageLoaded = true"
      class="rounded-2xl"
    />

    <p class="text-sm sm:text-xl sm:font-light text-gray-800 dark:text-gray-100">
      {{ news.description }}
    </p>
    <div class="mx-auto">
      <UButton
        color="secondary"
        variant="outline"
        class="cursor-pointer"
        @click="openLink(news.link)"
        >Перейти к чтению</UButton
      >
    </div>
  </div>
</template>
