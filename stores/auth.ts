import { defineStore } from 'pinia';
import type { LoginResponse } from '~/types';

export const useAuthStore = defineStore('authStore', () => {
  const apiUrl = 'http://localhost:4000';
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7,
  });

  const isAuthenticated = computed(() => {
    return !!token.value;
  });

  const user = ref<LoginResponse['user']>();

  const error = ref('');
  const isLoading = ref(false);
  const isProfileLoading = ref(false);

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
      const response = await $fetch<LoginResponse>('/auth/login', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
      });

      user.value = response.user;

      token.value = response.token;

      if (isAuthenticated.value) {
        navigateTo('/profile');
      }
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
      const response = await $fetch<LoginResponse>('/auth/register', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
      });

      user.value = response.user;

      token.value = response.token;

      if (isAuthenticated.value) {
        navigateTo('/profile');
      }
    } catch (err: any) {
      if (err.response) {
        return (error.value = err.response._data.error);
      }
      error.value = 'Не удалось зарегистрироваться';
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    token.value = null;
  }

  return {
    isAuthenticated,
    isLoading,
    isProfileLoading,
    error,
    user,
    token,
    apiUrl,
    login,
    register,
    logout,
  };
});
