<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <span class="text-sm sm:text-xl">{{ title }}</span>
  <div class="flex-1 border-b border-dotted border-gray-600 h-3 sm:h-5"></div>
</template>
