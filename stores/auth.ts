import { th } from '@nuxt/ui/runtime/locale/index.js';
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

      token.value = response.token;
      if (token.value) {
        await fetchUser();
      }
    } catch (err) {
      throw Error('Не удалось войти');
    }
  }

  async function register(userData: { email: string; password: string }) {
    if (!userData.email || !userData.password) {
      throw Error('Email или пароль не могут быть пустыми');
    }

    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw Error('Это не похоже на настоящий email');
      }
    }

    if (userData.password.length < 6) {
      throw Error('Пароль должен быть больше 6 символов');
    }

    try {
      const response = await $fetch<LoginResponse>('/auth/register', {
        method: 'POST',
        baseURL: apiUrl,
        body: userData,
        onResponse({ response }) {
          if (response.status !== 201) {
            throw Error(response._data.error);
          }
        },
      });

      token.value = response.token;

      if (token.value) {
        await fetchUser();
      }
    } catch (err) {
      throw err;
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
      const res = await $fetch<any>('/auth/update', {
        method: 'PATCH',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: userData,
      });

      await fetchUser();
      return res.message || 'Пользователь успешно обновлен';
    } catch (err) {
      throw err;
    }
  }

  async function logout() {
    token.value = null;
    user.value = null;
    const route = useRoute();
    if (route.path === '/profile') {
      await navigateTo('/social');
    }
  }

  async function changePassword(newPassword: string, oldPassword: string) {
    if (!token.value) {
      throw Error('Токен отсутствует');
    }

    try {
      const res = await $fetch<any>('/auth/update/password', {
        method: 'PATCH',
        baseURL: apiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: { newPassword, oldPassword },
      });

      return res.message || 'Пароль успешно изменен';
    } catch (err) {
      throw err;
    }
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
    changePassword,
  };
});
