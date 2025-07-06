<script setup lang="ts">
const auth = useAuthStore();
defineModel('desktop-open');
</script>

<template>
  <slot v-if="auth.isAuthenticated"></slot>
  <SocialAuth v-else />
</template>
