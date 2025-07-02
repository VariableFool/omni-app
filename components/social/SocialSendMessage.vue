<script setup lang="ts">
const text =
  'Проведите слева направо, протестируйте свайп меню, он работает только в мобильной версии и только здесь.';
</script>

<template>
  <div
    class="p-2 ring-1 ring-gray-300 dark:ring-gray-800/80 bg-white dark:bg-gray-900 rounded-xl flex flex-col items-end gap-4"
  >
    <UTextarea variant="soft" :ui="{ root: 'w-full' }" v-model="text" />
    <UButton size="md" variant="solid" color="secondary" label="Отправить" />
  </div>
</template>
