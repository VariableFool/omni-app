<script setup lang="ts">
const isAuthenticated = ref(false);
</script>

<template>
  <slot v-if="isAuthenticated"></slot>
  <SocialAuth v-else />
</template>
