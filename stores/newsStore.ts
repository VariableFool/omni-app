import { defineStore } from 'pinia';
import type { NewsModel } from '@/types';

export const useNewsStore = defineStore('newsStore', () => {
  const allNews = reactive<Record<string, NewsModel[]>>({});
  const loading = ref(false);
  const error = ref();

  const fetchNews = async (channel: string, url: string, force = false) => {
    if (!force && allNews[channel]) return;
    try {
      loading.value = true;
      const data = await $fetch<NewsModel[]>(`https://omni-api.gghub.ru/rss?url=${url}`);
      allNews[channel] = data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        console.error(err);
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    allNews,
    loading,
    error,
    fetchNews,
  };
});
