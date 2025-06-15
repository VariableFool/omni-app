import { defineStore } from 'pinia';
import type { NewsModel } from '@/types';

export const useNewsStore = defineStore('newsStore', () => {
  const newsByChannel = ref<Record<string, NewsModel[]>>({});

  function setNews(channel: string, news: NewsModel[]) {
    newsByChannel.value[channel] = news;
  }

  function updateNews(channel: string, newItems: NewsModel[]) {
    const existing = newsByChannel.value[channel] || [];
    const existingLinks = new Set(existing.map((item) => item.link));
    const fresh = newItems.filter((item) => !existingLinks.has(item.link));

    newsByChannel.value[channel] = [...fresh, ...existing];
  }

  return {
    newsByChannel,
    setNews,
    updateNews,
  };
});
