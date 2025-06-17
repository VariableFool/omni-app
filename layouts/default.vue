<script setup>
useHead({ title: 'app' });
const isSidebarCollapsed = ref(false);
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed" />

    <div class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white">
      <AppHeader />

      <main class="w-full h-full mt-14 flex flex-col items-center">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
