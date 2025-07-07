import { defineStore } from 'pinia';
import type { LoginResponse, UserData } from '~/types';

export const useAuthStore = defineStore('authStore', () => {
  const devMode = ref(true);

  const apiUrl = 'https://omni-api.gghub.ru/';
  //const apiUrl = 'http://localhost:4000/';
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7,
  });

  const isAuthenticated = computed(() => {
    return !!token.value;
  });

  const user = ref<LoginResponse['user'] | null>(null);
  const originalUser = ref<LoginResponse['user'] | null>(null);

  const error = ref('');

  async function fetchUser() {
    if (!token.value) {
      await Promise.reject(new Error('Токен отсутствует'));
    }

    try {
      const { user: resUser } = await $fetch<LoginResponse>('/auth/status', {
        method: 'GET',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      originalUser.value = { ...resUser };
      user.value = { ...resUser };
      return resUser;
    } catch (err: any) {
      if (err.data.status === 'deleteToken') {
        token.value = null;
      }
      throw err;
    }
  }

  async function login(userData: { email: string; password: string }) {
    if (!userData.email || !userData.password) {
      throw Error('Email или пароль не могут быть пустыми');
    }

    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw Error('Это не похоже на настоящий email');
      }
    }

    if (userData.password.length <= 3) {
      throw Error('Пароль должен быть больше 6 символов');
    }

    try {
      const response = await $fetch<LoginResponse>('/auth/login', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
      });

      user.value = response.user;
      token.value = response.token;
    } catch (err) {
      console.error(err);
      throw Error('Не удалось войти');
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
    user.value = null;
    await navigateTo('/');
  }

  return {
    devMode,
    isAuthenticated,
    error,
    originalUser,
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
