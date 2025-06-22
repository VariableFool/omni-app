<script setup>
useHead({ title: 'app' });
const isSidebarCollapsed = ref(false);
</script>

<template>
  <AppHeader />

  <div class="fixed top-14 left-0">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed" />
  </div>

  <div
    class="mt-14 flex justify-center transition-all"
    :class="isSidebarCollapsed ? 'ml-14' : 'ml-44'"
  >
    <NuxtPage />
  </div>
</template>
