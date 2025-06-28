<script setup lang="ts">
const props = defineProps({
  text: String,
});

const emit = defineEmits(['update:text']);

const internalText = ref(props.text || 'undefined');

watch(internalText, (newVal) => {
  emit('update:text', newVal);
});
</script>

<template>
  <div>
    <UInput
      v-model="internalText"
      maxlength="20"
      variant="ghost"
      :size="$device.isMobile ? 'sm' : 'xl'"
      class="font-mono"
      :style="{
        width: `${
          Math.max(internalText.length, 1) +
          (internalText.length >= 10 ? ($device.isMobile ? 8 : 7) : $device.isMobile ? 7 : 6)
        }ch`,
      }"
      :ui="{
        base: 'p-0 px-2 text-sm sm:text-lg bg-gray-100 dark:bg-gray-800',
        trailing: 'pointer-events-none',
      }"
    >
      <template #trailing>
        <div
          id="character-count"
          class="text-xs text-muted tabular-nums"
          aria-live="polite"
          role="status"
        >
          {{ internalText.length }}/{{ 20 }}
        </div>
      </template>
    </UInput>
  </div>
</template>
