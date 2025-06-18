<script setup lang="ts">
const newsStore = useNewsStore();
const { allNews, loading, error } = storeToRefs(newsStore);

const channels = ['cybersport', 'ria', 'tass', 'lenta'] as const;

const activeChannel = ref<'cybersport' | 'lenta' | 'ria' | 'tass'>('cybersport');

watch(activeChannel, (newChannel) => {
  newsStore.fetchNews(newChannel);
});

onMounted(async () => {
  if (allNews.value[activeChannel.value] === undefined) {
    newsStore.fetchNews(activeChannel.value);
  }
});
</script>

<template>
  <div>
    <div class="mx-auto my-4 flex justify-center gap-2">
      <UButton
        v-for="channel in channels"
        :key="channel"
        :active="activeChannel === channel"
        @click="activeChannel = channel"
        variant="outline"
        color="neutral"
        size="xl"
        active-variant="solid"
        active-color="secondary"
      >
        <img :src="`/${channel}.ico`" width="16" />
        {{ channel.toUpperCase() }}
      </UButton>
    </div>

    <div class="mb-4 text-center">
      <UButton variant="subtle" color="neutral" icon="tabler:refresh">Обновить</UButton>
    </div>

    <LoadingSpinner v-if="loading" :title="'Загружаю новости...'" />

    <ErrorDisplay
      v-else-if="error"
      :message="`Не удалось загрузить новости для: ${activeChannel.toUpperCase()}`"
    />

    <div v-else>
      <NewsCard
        v-for="news in allNews[activeChannel]"
        :key="news.link"
        :news="news"
        :title="activeChannel.toUpperCase()"
      />
    </div>
  </div>
</template>
