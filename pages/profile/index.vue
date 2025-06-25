<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <AuthGate>
    <h1>Профиль</h1>
  </AuthGate>
</template>
