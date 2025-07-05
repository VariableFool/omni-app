<script setup lang="ts">
const { width } = useWindowSize();
const isAuthenticated = defineModel('isAuthenticated');
const props = defineProps<{
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
</script>

<template>
  <div
    class="w-full fixed top-0 left-0 h-12 px-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 z-50"
  >
    <p class="font-bold font-['Inter'] text-sky-600 dark:text-sky-500">OMNI APP</p>

    <div class="flex items-center gap-4">
      <UButton
        v-if="width > 1024 && $route.path !== '/social'"
        @click="isAuthenticated ? props.logout : navigateTo('/social')"
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
