<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    message: string;
  }>(),
  {
    message: '🧐 Ошибка без сообщения - разработчик где-то халтурит...',
  },
);
</script>

<template>
  <div class="text-center">
    <span class="text-2xl text-red-500">{{ props.message }}</span>
  </div>
</template>
