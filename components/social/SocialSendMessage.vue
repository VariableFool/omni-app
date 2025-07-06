<script setup lang="ts">
const text =
  'Проведите слева направо, протестируйте свайп меню, он работает только в мобильной версии и только здесь.';
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <UTextarea
      v-model="text"
      size="xl"
      variant="outline"
      color="secondary"
      class="w-full"
    ></UTextarea>
    <div class="flex justify-end">
      <UButton label="Отправить" variant="outline" color="secondary" />
    </div>
  </div>
</template>
