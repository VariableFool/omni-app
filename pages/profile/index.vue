<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();

const nickname = ref(auth.user?.nickname || 'Undefind');

const base =
  'text-sm bg-gray-500 hover:bg-gray-400 dark:bg-sky-400 dark:hover:bg-sky-300 sm:text-md';
</script>

<template>
  <AuthGate>
    <ClientOnly>
      <LoadingSpinner v-if="auth.isProfileLoading" :title="'Загружаю профиль'" />

      <div class="h-[calc(100vh-112px)] sm:h-[calc(100vh-56px)] flex justify-center sm:py-4">
        <UserCard />
      </div>
    </ClientOnly>
  </AuthGate>
</template>
