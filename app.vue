<script setup>
onMounted(() => {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = saved === 'dark' || (!saved && prefersDark);
  html.classList.toggle('dark', shouldUseDark);
});
</script>

<template>
  <UApp> <NuxtLayout /></UApp>
</template>
