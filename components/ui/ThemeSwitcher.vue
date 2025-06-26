<template>
  <button
    class="cursor-pointer relative w-14 h-8 rounded-full bg-gray-300 outline-1 outline-transparent sm:hover:outline-sky-500 dark:bg-gray-600 transition-colors"
    @click="toggleTheme"
  >
    <!-- Трек -->
    <div class="absolute top-0 left-0 w-full h-full rounded-full transition-colors"></div>

    <!-- Иконка-ползунок -->
    <div
      class="absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform"
      :class="{
        'translate-x-0': !isDark,
        'translate-x-6': isDark,
      }"
    >
      <Icon
        :name="isDark ? 'lucide:moon' : 'lucide:sun'"
        class="w-4 h-4 text-gray-700 dark:text-white"
      />
    </div>
  </button>
</template>

<script setup>
const isDark = ref(false);

onMounted(() => {
  const saved = localStorage.getItem('theme');
  isDark.value =
    saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  updateHtmlClass();
});

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  updateHtmlClass();
}

function updateHtmlClass() {
  document.documentElement.classList.toggle('dark', isDark.value);
}
</script>
