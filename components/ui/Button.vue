<script setup lang="ts">
defineProps<{
  label: string;
  variant?: 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | undefined;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'neutral'
    | undefined;
  click: () => void;
  loading?: boolean;
}>();
</script>

<template>
  <UButton
    @click="click"
    :label="label"
    :color="color"
    :variant="variant"
    :loading="loading"
    size="xl"
    :ui="{ base: 'rounded-full', label: 'mx-auto' }"
  />
</template>
