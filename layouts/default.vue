<script setup lang="ts">
useHead({ title: 'app' });
const isSidebarCollapsed = ref(true);
</script>

<template>
  <div v-if="$device.isDesktop">
    <AppHeader />
  </div>
  <div v-else>
    <AppHeaderMobile />
  </div>

  <div v-if="$device.isDesktop" class="fixed top-14 left-0">
    <Sidebar :collapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed" />
  </div>

  <div v-else>
    <SidebarMobile />
  </div>

  <div
    class="sm:mt-14 flex justify-center transition-all"
    :class="isSidebarCollapsed ? 'sm:ml-14' : 'sm:ml-44'"
  >
    <div class="w-full max-w-[1920px]">
      <NuxtPage />
      <div v-show="$route.path === '/music'">
        <GlobalPlayer />
      </div>
    </div>
  </div>
</template>
