<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
  <slot v-if="auth.isAuthenticated"></slot>
  <SocialAuth v-else />
</template>
