<script setup lang="ts">
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

const devMode = ref(true);
</script>

<template>
  <header
    class="fixed top-0 right-0 w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between z-50"
  >
    <div class="flex justify-center items-center gap-3">
      <ThemeSwitcher />
      <h1 class="text-lg font-semibold">OMNI APP</h1>
      <div>
        <div v-if="devMode">
          [
          <span class="blinking-dot"></span>
          <span> DEVELOPMENT IN PROGRESS 🛠️</span>
          ]
        </div>
        <div v-else>
          [
          <span class="blinking-no-active-dot"></span>
          <span> CONTINUATION TOMORROW 😴</span>
          ]
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <div
        @click="navigateTo('/profile')"
        class="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <Icon name="lucide:user" class="w-6 h-6" />
        <span>{{ auth.isAuthenticated ? 'Профиль' : 'Войти' }}</span>
      </div>

      <div
        v-if="isAuthenticated"
        @click="auth.logout"
        class="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <span>Выйти</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.blinking-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(255, 0, 0);
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.blinking-no-active-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
}
</style>
