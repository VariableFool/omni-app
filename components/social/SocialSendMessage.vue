<script setup lang="ts"></script>

<template>
  <div
    class="p-2 ring-1 ring-gray-300 dark:ring-gray-800/80 bg-white dark:bg-gray-900 rounded-xl flex flex-col items-end gap-4"
  >
    <UTextarea variant="soft" :ui="{ root: 'w-full' }" />
    <UButton size="md" variant="solid" color="secondary" label="Отправить" />
  </div>
</template>
