<script setup lang="ts">
const desktopMenuOpen = ref(false);

const auth = useAuthStore();
const { isAuthenticated, user } = storeToRefs(auth);
</script>

<template>
  <AppHead v-model:is-authenticated="isAuthenticated" :user="user" :logout="auth.logout" />
  <div class="mt-12 transition-all" :class="desktopMenuOpen ? 'lg:pl-46' : 'lg:pl-14'">
    <NuxtPage />
  </div>
  <NavigationMenu v-model:menu-open="desktopMenuOpen" />
</template>
