<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    {{ isDark ? '🌙 Темно' : '☀️ Светло' }}
  </button>
</template>

<script setup lang="ts">
const isDark = ref(false);

onMounted(() => {
  // Смотрим на текущий класс на <html>
  isDark.value = document.documentElement.classList.contains('dark');
});

function toggleTheme() {
  const html = document.documentElement;

  isDark.value = !isDark.value;

  if (isDark.value) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
</script>
