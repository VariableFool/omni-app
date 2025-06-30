<script setup lang="ts">
useHead({ title: '| Social network' });
</script>

<template>
  <AuthGate>
    <SocialFeed />
  </AuthGate>
</template>
