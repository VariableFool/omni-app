<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex gap-2 text-xl items-center">
    <UserCardTitle :title="title" />
    <slot />
  </div>
</template>
