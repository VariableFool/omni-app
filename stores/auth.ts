import { defineStore } from 'pinia';
import type { LoginResponse } from '~/types';

export const useAuthStore = defineStore('authStore', () => {
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7,
  });
  const isAuthenticated = computed(() => {
    return !!token.value;
  });
  const user = ref<LoginResponse['user']>();

  async function login(userData: object) {
    try {
      const response = await $fetch<LoginResponse>('https://omni-api.gghub.ru/login', {
        method: 'POST',
        body: userData,
      });

      token.value = response.token;
      user.value = response.user;
      navigateTo('/');
    } catch (err) {
      console.error('Ошибка при авторизации', err);
    }
  }

  return {
    isAuthenticated,
    login,
  };
});
