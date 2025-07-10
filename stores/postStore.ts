import { defineStore } from 'pinia';
import type { LoginResponse } from '~/types';

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  authorId: number;
  replyToId: number | null;
  replyCount: number;
  likeCount: number;
  viewsCount: number;
  commentCount: number;
  isPinned: boolean;
  isAd: boolean;
  author: LoginResponse['user'];
}

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);

  //const apiUrl = 'https://omni-api.gghub.ru/';
  const apiUrl = 'http://localhost:4000/';

  async function fetchPosts() {
    try {
      const res = await $fetch<Post[]>('/social/posts', {
        method: 'GET',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
        },
      });

      posts.value = res;
    } catch (err: any) {
      throw new Error(err.data?.message || 'Ошибка при загрузке постов');
    }
  }

  async function createPost(content: string) {
    const statuscode = ref<number | null>(null);
    try {
      const res = await $fetch<Post>('/social/posts', {
        method: 'POST',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
        },
        body: { content },
        onResponse({ response }) {
          statuscode.value = response.status;
          if (statuscode.value !== 201) {
            throw Error(response._data.error);
          }
        },
      });

      posts.value.unshift(res);
      return { statuscode: statuscode.value };
    } catch (err) {
      throw err;
    }
  }

  return {
    posts,
    fetchPosts,
    createPost,
  };
});
