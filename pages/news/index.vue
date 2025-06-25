<script setup lang="ts">
interface channels {
  name: string;
  url: string;
}

const channels = {
  cybersport: {
    name: 'cybersport',
    url: 'https://www.cybersport.ru/rss/materials',
  },
  tass: {
    name: 'tass',
    url: 'https://tass.ru/rss/v2.xml',
  },
  ria: {
    name: 'ria',
    url: 'https://ria.ru/export/rss2/archive/index.xml',
  },
  lenta: {
    name: 'lenta',
    url: 'https://lenta.ru/rss',
  },
};

const showOnlyFunChannels = ref(true);
const channelList = computed(() => {
  if (showOnlyFunChannels.value) {
    return { cybersport: channels.cybersport };
  }
  return channels;
});

const activeChannel = ref<keyof typeof channels>('cybersport');

const newsStore = useNewsStore();
const { allNews, loading, error } = storeToRefs(newsStore);

const activeChannelNews = computed(() => {
  return allNews.value[activeChannel.value];
});

watch(activeChannel, async (newChannel) => {
  if (!allNews.value[newChannel]) {
    await newsStore.fetchNews(newChannel, activeChannelUrl.value.url);
  }
});

const activeChannelUrl = computed(() => {
  return channels[activeChannel.value];
});

onMounted(async () => {
  if (!allNews.value[activeChannel.value]) {
    await newsStore.fetchNews(activeChannel.value, activeChannelUrl.value.url);
  }
});

function toggleActiveChannel(channelName: keyof typeof channels) {
  activeChannel.value = channelName;
}
</script>

<template>
  <div class="my-4 flex flex-col items-center">
    <div class="flex gap-2 flex-wrap justify-center">
      <div v-for="(channel, key) in channelList" :key="channel.name">
        <UButton
          @click="toggleActiveChannel(key)"
          :active="activeChannel === channel.name"
          active-variant="solid"
          active-color="secondary"
          size="xl"
          variant="outline"
          color="neutral"
        >
          <img :src="`/${channel.name}.ico`" alt="logo" width="16" />
          {{ channel.name.toUpperCase() }}
        </UButton>
      </div>
    </div>

    <div>
      <UButton
        variant="link"
        color="info"
        @click="
          showOnlyFunChannels = showOnlyFunChannels ? false : ((activeChannel = 'cybersport'), true)
        "
        class="m-2"
        >{{
          showOnlyFunChannels ? 'Показать все каналы' : 'Показывать только развлекательные'
        }}</UButton
      >
    </div>

    <div>
      <UButton
        @click="newsStore.fetchNews(activeChannel, activeChannelUrl.url, true)"
        variant="outline"
        color="secondary"
        icon="lucide:refresh-cw"
        :loading="loading"
        >{{ loading ? 'Обновление' : 'Обновить' }}</UButton
      >
    </div>

    <LoadingSpinner v-if="loading" :title="'Загружаю новости'" />

    <ErrorDisplay v-if="error" :message="error" />

    <div v-else>
      <div v-for="news in activeChannelNews">
        <NewsCard :news="news" />
      </div>
    </div>
  </div>
</template>
