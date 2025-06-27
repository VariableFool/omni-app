<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <AuthGate>
    <div class="h-[calc(100dvh-112px)] sm:h-[calc(100dvh-56px)] flex justify-center sm:py-4">
      <UserCard />
    </div>
  </AuthGate>
</template>
