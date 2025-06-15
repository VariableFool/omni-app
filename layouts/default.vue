<script setup>
const isSidebarCollapsed = ref(false);
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed" />

    <div class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white">
      <AppHeader />

      <main class="p-6 flex-1">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
