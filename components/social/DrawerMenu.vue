<script setup lang="ts">
const menu = [
  { label: 'Profile', icon: 'lucide:user', to: '/profile', disabled: false },
  { label: 'Explore', icon: 'lucide:search', to: '/', disabled: true },
  { label: 'Notifications', icon: 'lucide:bell', to: '/', disabled: true },
  { label: 'Message', icon: 'lucide:mail', to: '/', disabled: true },
  { label: 'Bookmarks', icon: 'lucide:bookmark', to: '/', disabled: true },
  { label: 'Communities', icon: 'lucide:users', to: '/', disabled: true },
];
</script>

<template>
  <UButton
    v-for="button in menu"
    :label="button.label"
    :icon="button.icon"
    :key="button.label"
    :ui="{ base: 'text-2xl' }"
    variant="ghost"
    color="neutral"
    class="flex items-center mb-6 gap-4"
  />
</template>
