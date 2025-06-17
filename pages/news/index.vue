<script setup lang="ts">
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import NewsCard from '@/components/ui/NewsCard.vue';
import type { NewsModel } from '~/types';

const newsChannels = ref({
  cybersport: true,
  lenta: false,
  tass: false,
  ria: false,
});

function selectChannel(channel: keyof typeof newsChannels.value) {
  Object.keys(newsChannels.value).forEach((key) => {
    newsChannels.value[key as keyof typeof newsChannels.value] = false;
  });
  newsChannels.value[channel] = true;
  selectedCategory.value = null;
}

const activeChannel = computed(
  () => Object.entries(newsChannels.value).find(([, v]) => v)?.[0] || 'cybersport',
);

const allCategories = computed(() => {
  const categories = new Set<string>();

  (newsAll.value || []).forEach((news) => {
    if (Array.isArray(news.category)) {
      news.category.forEach((cat) => categories.add(cat));
    } else if (typeof news.category === 'string') {
      categories.add(news.category);
    }
  });

  return Array.from(categories);
});

const selectedCategory = ref<string | null>(null);

const filteredNews = computed(() => {
  if (!selectedCategory.value) return newsAll.value || [];
  return (newsAll.value || []).filter((news) => {
    const cat = news.category;
    if (!cat) return false;

    // Если category — строка
    if (typeof cat === 'string') {
      return cat.toLowerCase().includes(selectedCategory.value!.toLowerCase());
    }

    // Если category — массив (например, как у TASS)
    if (Array.isArray(news.category)) {
      return news.category.some((c) =>
        c.toLowerCase().includes(selectedCategory.value!.toLowerCase()),
      );
    }

    return false;
  });
});

useHead(() => {
  if (selectedCategory.value) {
    return {
      title: ` News | ${activeChannel.value.toUpperCase()} - ${selectedCategory.value}`,
    };
  }

  return {
    title: ` News | ${activeChannel.value.toUpperCase()}`,
  };
});

const selectCategory = (category: string) => {
  if (selectedCategory.value === category) return (selectedCategory.value = null);
  selectedCategory.value = category;
};

const {
  data: newsAll,
  pending,
  error,
  execute,
} = useFetch<NewsModel[]>(() => `https://omni-api.gghub.ru/rss/${activeChannel.value}`);
</script>

<template>
  <div>
    <section class="w-6xl pt-4 bg-gray-200/60 dark:bg-gray-900/30">
      <h1 class="text-4xl font-bold mb-6 text-center text-sky-600 dark:text-sky-200">
        Лента новостей
      </h1>

      <div class="flex flex-col gap-2">
        <div class="flex gap-2 justify-center">
          <UButton
            @click="selectChannel('cybersport')"
            color="neutral"
            variant="outline"
            :active="newsChannels.cybersport"
            active-color="secondary"
            active-variant="solid"
            size="xl"
            class="cursor-pointer"
            ><img src="public/cybersport.ico" alt="icon" width="18" />Cybersport.ru</UButton
          >
          <UButton
            @click="selectChannel('lenta')"
            color="neutral"
            variant="outline"
            :active="newsChannels.lenta"
            active-color="secondary"
            active-variant="solid"
            size="xl"
            class="cursor-pointer"
          >
            <img src="public/lenta.ico" alt="icon" width="18" />Lenta.ru</UButton
          >
          <UButton
            @click="selectChannel('tass')"
            color="neutral"
            variant="outline"
            :active="newsChannels.tass"
            active-color="secondary"
            active-variant="solid"
            size="xl"
            class="cursor-pointer"
            ><img src="public/tass.ico" alt="icon" width="18" />TASS.ru</UButton
          >
          <UButton
            @click="selectChannel('ria')"
            color="neutral"
            variant="outline"
            :active="newsChannels.ria"
            active-color="secondary"
            active-variant="solid"
            size="xl"
            class="cursor-pointer"
            ><img src="public/ria.ico" alt="icon" width="18" />RIA.ru</UButton
          >
        </div>
        <div class="mt-2 flex justify-center">
          <div v-if="newsChannels.cybersport" class="max-w-5xl flex flex-wrap justify-center gap-2">
            <UButton
              color="secondary"
              variant="outline"
              class="cursor-pointer"
              v-for="category in allCategories"
            >
              {{ category }}
            </UButton>
          </div>
          <div v-if="newsChannels.lenta" class="max-w-5xl flex flex-wrap justify-center gap-2">
            <UButton
              color="secondary"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              class="cursor-pointer"
              v-for="category in allCategories"
              @click="selectCategory(category)"
            >
              {{ category }}
            </UButton>
          </div>
          <div v-if="newsChannels.tass" class="max-w-5xl flex flex-wrap justify-center gap-2">
            <UButton
              color="secondary"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              class="cursor-pointer"
              v-for="category in allCategories"
              @click="selectCategory(category)"
            >
              {{ category }}
            </UButton>
          </div>
          <div v-if="newsChannels.ria" class="max-w-5xl flex flex-wrap justify-center gap-2">
            <UButton
              color="secondary"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              class="cursor-pointer"
              v-for="category in allCategories"
              @click="selectCategory(category)"
            >
              {{ category }}
            </UButton>
          </div>
        </div>
      </div>

      <div v-if="!pending" class="mt-5 flex justify-center">
        <UButton
          @click="execute()"
          class="cursor-pointer"
          size="md"
          color="info"
          variant="ghost"
          icon="material-symbols:refresh"
          >Обновить</UButton
        >
      </div>

      <LoadingSpinner v-if="pending" :message="'Загружаю новости...'" />

      <div v-if="newsAll" class="my-4 flex flex-col items-center">
        <div v-if="newsChannels.cybersport">
          <NewsCard v-for="news in newsAll" :news="news" />
        </div>

        <div v-if="newsChannels.lenta">
          <NewsCard v-for="news in filteredNews" :news="news" />
        </div>

        <div v-if="newsChannels.tass">
          <NewsCard v-for="news in filteredNews" :news="news" />
        </div>

        <div v-if="newsChannels.ria">
          <NewsCard v-for="news in filteredNews" :news="news" />
        </div>
      </div>

      <p v-if="error" class="text-center text-5xl text-red-500 mt-10">
        Не удалось загрузить новости.
      </p>
    </section>
  </div>
</template>
