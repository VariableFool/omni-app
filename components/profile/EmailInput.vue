<script setup lang="ts">
const props = defineProps({
  nickname: String,
});

const emit = defineEmits(['update:nickname']);

const internalNickname = ref(props.nickname || 'undefined');

watch(internalNickname, (newVal) => {
  emit('update:nickname', newVal);
});
</script>

<template>
  <div>
    <UInput
      v-model="internalNickname"
      maxlength="30"
      variant="ghost"
      size="xl"
      class="font-mono"
      :style="{
        width: `${
          Math.max(internalNickname.length, 1) +
          (internalNickname.length >= 10 ? ($device.isMobile ? 7 : 6) : $device.isMobile ? 6 : 5)
        }ch`,
      }"
      :ui="{
        base: 'p-0 px-2 py-1 sm:text-xl bg-gray-100 dark:bg-gray-800',
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
          {{ internalNickname.length }}/{{ 30 }}
        </div>
      </template>
    </UInput>
  </div>
</template>
