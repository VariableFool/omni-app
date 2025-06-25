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

  const error = ref('');
  const isLoading = ref(false);

  async function login(userData: { email: string; password: string }) {
    error.value = '';
    if (!userData.email || !userData.password) {
      return (error.value = 'Email или пароль не могут быть пустыми');
    }

    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return (error.value = 'Это не похоже на настоящий email');
      }
    }

    isLoading.value = true;
    try {
      const response = await $fetch<LoginResponse>('https://omni-api.gghub.ru/auth/login', {
        method: 'POST',
        body: userData,
      });

      token.value = response.token;
      user.value = response.user;
      navigateTo('/');
    } catch (err) {
      console.error('Ошибка при авторизации', err);
      error.value = 'Не удалось войти';
    } finally {
      isLoading.value = false;
    }
  }

  async function register(userData: object) {
    error.value = '';
    isLoading.value = true;
    try {
      const response = await $fetch<LoginResponse>('https://omni-api.gghub.ru/auth/register', {
        method: 'POST',
        body: userData,
      });

      token.value = response.token;
      user.value = response.user;
      navigateTo('/');
    } catch (err) {
      console.error('Ошибка при авторизации', err);
      error.value = 'Не удалось зарегистрироваться';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
  };
});
