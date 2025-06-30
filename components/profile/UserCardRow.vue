<script setup lang="ts">
defineProps<{ title: string; placeholder: string }>();
const value = defineModel<string>();
</script>

<template>
  <div class="flex items-center">
    <span class="text-sm sm:text-lg">{{ title }}</span>
    <div
      class="ml-2 flex-1 border-b border-dotted h-3 sm:h-4 text-gray-400 dark:text-gray-600"
    ></div>
    <UInput
      v-model="value"
      variant="ghost"
      class="font-mono"
      :placeholder="placeholder"
      :ui="{
        base: 'p-0 px-2 text-sm sm:text-lg',
      }"
      :size="$device.isDesktop ? 'xl' : 'sm'"
      :style="{
        width: `${
          Math.max(value && value.length > 0 ? value.length : placeholder.length, 1) +
          (value && value.length >= 10 ? ($device.isMobile ? 8 : 7) : $device.isMobile ? 7 : 6)
        }ch`,
      }"
    >
      <template #trailing>
        <div
          id="character-count"
          class="text-xs text-muted tabular-nums"
          aria-live="polite"
          role="status"
        >
          {{ value?.length }}/{{ 20 }}
        </div>
      </template>
    </UInput>
  </div>
</template>
