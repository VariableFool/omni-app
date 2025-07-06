<script setup lang="ts">
import type { LoginResponse } from '~/types';

const { width } = useWindowSize();
const isAuthenticated = defineModel('isAuthenticated');
const props = defineProps<{
  user: LoginResponse['user'] | null;
  logout: () => void;
}>();

const themeMode = ref(true);

onMounted(() => {
  const saved = localStorage.getItem('theme');
  themeMode.value =
    saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  updateHtmlClass();
});

watch(themeMode, (newMode) => {
  themeMode.value = newMode;
  localStorage.setItem('theme', themeMode.value ? 'dark' : 'light');
  updateHtmlClass();
});

function updateHtmlClass() {
  document.documentElement.classList.toggle('dark', themeMode.value);
}

function handleClick() {
  if (isAuthenticated.value) {
    props.logout();
  } else {
    navigateTo('/social');
  }
}
</script>

<template>
  <div
    class="w-full fixed top-0 left-0 h-12 px-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 z-50"
  >
    <p class="font-bold font-['Inter'] text-sky-600 dark:text-sky-500">OMNI APP</p>

    <div class="flex items-center gap-4">
      <div v-if="props.user && $route.path !== '/profile'" class="flex items-center gap-2">
        <UAvatar :alt="String(user?.id)" />
        <span @click="navigateTo('/profile')" class="cursor-pointer hover:underline">
          {{ user?.nickname || user?.email }}
        </span>
      </div>
      <UButton
        v-if="$route.path !== '/social'"
        @click="handleClick"
        variant="soft"
        :label="isAuthenticated ? 'Выйти' : 'Войти'"
        :icon="isAuthenticated ? 'lucide:log-out' : 'lucide:log-in'"
        :color="isAuthenticated ? 'error' : 'secondary'"
      />
      <USwitch
        unchecked-icon="lucide:sun"
        checked-icon="lucide:moon"
        color="secondary"
        size="xl"
        v-model="themeMode"
      />
    </div>
  </div>
</template>
