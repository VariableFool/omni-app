<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
</script>

<template>
  <AuthGate>
    <ClientOnly>
      <LoadingSpinner v-if="auth.isProfileLoading" :title="'Загружаю профиль'" />
      <h1>Профиль</h1>
      <p>{{ auth.user?.id }}</p>
      <p>{{ auth.user?.email }}</p>
    </ClientOnly>
  </AuthGate>
</template>
