<script setup lang="ts">
const props = defineProps<{
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.disabled"
    class="cursor-pointer px-3 py-1 rounded-lg font-medium transition-all duration-200 focus:outline-none"
    :class="[
      {
        'bg-blue-600 hover:bg-blue-700 text-white': props.variant === 'primary',
        'bg-gray-300 hover:bg-gray-400 text-gray-600': props.variant === 'secondary',
        'bg-red-600 hover:bg-red-700 text-white': props.variant === 'danger',
        'opacity-50 cursor-not-allowed': props.disabled,
      },
    ]"
  >
    <slot>{{ props.label }}</slot>
  </button>
</template>
