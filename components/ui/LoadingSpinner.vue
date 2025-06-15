<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <div class="flex justify-center items-center h-40 gap-3">
    <div
      class="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent"
    ></div>
    <span>{{ message }}</span>
  </div>
</template>
