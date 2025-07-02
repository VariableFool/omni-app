<script setup lang="ts">
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
</script>

<template>
  <header
    class="fixed top-0 right-0 w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between z-50"
  >
    <div class="flex justify-center items-center gap-3">
      <ThemeSwitcher />
      <h1 class="text-lg font-semibold">OMNI APP</h1>
    </div>

    <div class="flex gap-2">
      <div
        v-if="$route.path !== '/profile'"
        @click="navigateTo('/profile')"
        class="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <Icon :name="auth.isAuthenticated ? 'lucide:user' : 'lucide:log-in'" class="w-6 h-6" />
        <span>{{ auth.isAuthenticated ? 'Профиль' : 'Войти' }}</span>
      </div>

      <div
        v-if="isAuthenticated"
        @click="auth.logout"
        class="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <Icon name="lucide:log-out" />
        <span>Выйти</span>
      </div>
    </div>
  </header>
</template>
