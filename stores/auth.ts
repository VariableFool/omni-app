import { defineStore } from 'pinia';
import type { LoginResponse, UserData } from '~/types';

export const useAuthStore = defineStore('authStore', () => {
  const devMode = ref(true);

  // const apiUrl = 'https://omni-api.gghub.ru/';
  const apiUrl = 'http://localhost:4000/';
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7,
  });

  const isAuthenticated = computed(() => {
    return !!token.value;
  });

  const user = ref<LoginResponse['user'] | null>(null);

  const error = ref('');
  const isLoading = ref(false);
  const isProfileLoading = ref(false);

  async function fetchUser() {
    if (!token.value) return null;

    try {
      const data = await $fetch<LoginResponse>('/auth/status', {
        method: 'GET',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = { ...data.user };
      return data.user;
    } catch (err) {
      user.value = null;
      return null;
    }
  }

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

    if (userData.password.length <= 3) {
      return (error.value = 'Пароль должен быть больше 6 символов');
    }

    isLoading.value = true;
    isProfileLoading.value = true;

    try {
      const response = await $fetch<LoginResponse>('/auth/login', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
      });

      user.value = response.user;

      token.value = response.token;

      navigateTo('/profile');
    } catch (err) {
      console.error('Ошибка при авторизации', err);
      error.value = 'Не удалось войти';
    } finally {
      isLoading.value = false;
      isProfileLoading.value = false;
    }
  }

  async function register(userData: { email: string; password: string }) {
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

    if (userData.password.length <= 3) {
      return (error.value = 'Пароль должен быть больше 6 символов');
    }

    isLoading.value = true;
    try {
      const response = await $fetch<LoginResponse>('/auth/register', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
      });

      user.value = response.user;

      token.value = response.token;

      navigateTo('/profile');
    } catch (err: any) {
      if (err.response) {
        return (error.value = err.response._data.error);
      }
      error.value = 'Не удалось зарегистрироваться';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateUser(userData: UserData) {
    if (!userData) {
      return (error.value = 'Вы ничего не изменили');
    }

    if (!token.value) {
      return (error.value = 'Токен отсутствует');
    }

    try {
      const res = await $fetch<LoginResponse['user']>('/auth/update', {
        method: 'PATCH',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: userData,
      });

      user.value = res;
      return res;
    } catch (error) {
      console.error('Fetch error:', error);
      return error;
    }
  }

  async function logout() {
    token.value = null;
    useState('user').value = null;
    await navigateTo('/');
  }

  return {
    devMode,
    isAuthenticated,
    isLoading,
    isProfileLoading,
    error,
    user,
    token,
    apiUrl,
    fetchUser,
    login,
    register,
    updateUser,
    logout,
  };
});
