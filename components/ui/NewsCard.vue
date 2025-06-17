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
    class="max-w-4xl mb-4 p-4 flex flex-col justify-center gap-2 bg-white dark:bg-gray-700/50 rounded-2xl drop-shadow-lg"
  >
    <p
      @click="openLink(props.news.link)"
      class="cursor-pointer font-['Inter'] font-medium text-2xl text-gray-800 dark:text-sky-300 transition-colors duration-200 hover:text-sky-500"
    >
      {{ news.title }}
    </p>
    <p class="text-gray-500 dark:text-gray-300">{{ formatted }}</p>

    <LoadingSpinner v-if="props.news.image && !imageLoaded" :message="'Загружаю картинку...'" />
    <NuxtImg
      v-if="props.news.image !== null"
      loading="lazy"
      :src="props.news.image"
      @load="imageLoaded = true"
      class="rounded-2xl"
    />

    <p class="text-[18px] text-gray-800 dark:text-white">{{ news.description }}</p>
    <div class="mx-auto">
      <UButton color="neutral" variant="outline" class="cursor-pointer" @click="openLink(news.link)"
        >Перейти к чтению</UButton
      >
    </div>
  </div>
</template>
