<script setup lang="ts">
const props = defineProps<{ title: string; placeholder: string; isDisabled?: boolean }>();

const readonly = computed(() => {
  return props.isDisabled || false;
});
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
      :maxlength="20"
      :readonly="readonly"
      :placeholder="placeholder"
      :ui="{
        base: 'p-0 px-2 text-sm sm:text-lg',
      }"
      :size="$device.isDesktop ? 'xl' : 'sm'"
      :style="{
        width: `${
          Math.max(value && value.length > 0 ? value.length : placeholder.length, 1) +
          (value && value.length >= 10
            ? $device.isMobile
              ? !readonly
                ? 8
                : 2
              : !readonly
              ? 7
              : 2
            : $device.isMobile
            ? 7
            : 6)
        }ch`,
      }"
    >
      <template #trailing v-if="!readonly">
        <div
          id="character-count"
          class="text-xs text-muted tabular-nums"
          aria-live="polite"
          role="status"
        >
          {{ value?.length || 0 }}/{{ 20 }}
        </div>
      </template>
    </UInput>
  </div>
</template>
