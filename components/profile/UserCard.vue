<script setup lang="ts">
const auth = useAuthStore();

const nickname = ref(auth.user?.nickname);

const p4 = 'p-4';

type Button = {
  label: string;
  disabled?: boolean;
  action: () => void;
  color?: 'error' | 'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
};

const buttons: Button[] = [
  {
    label: 'Сохранить изменения',
    disabled: true,
    action: () => console.log('Сохраняем изменения'),
    color: 'primary',
  },
  { label: 'Выйти', disabled: false, action: auth.logout, color: 'error' },
];
</script>

<template>
  <div
    class="w-2xl ring-1 ring-gray-300 dark:ring-0 dark:bg-gray-950/30 h-full flex flex-col sm:rounded-2xl"
  >
    <div :class="p4" class="flex items-center gap-4">
      <UAvatar :alt="String(auth.user?.id)" size="3xl" />
      <div class="flex flex-col">
        <span class="text-xl">{{ nickname || auth.user?.email }}</span>
        <span class="text-gray-500">{{ 'id:' + auth.user?.id }}</span>
      </div>
    </div>

    <div
      :class="p4"
      class="flex flex-col flex-1 border-y-1 border-gray-300 dark:border-gray-700/80 gap-2"
    >
      <div class="flex items-center gap-2">
        <span class="w-24 sm:w-32 text-sm sm:text-xl font-medium">Email:</span>
        <span class="p-0 px-2 py-1 sm:text-xl">{{ auth.user?.email }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-24 sm:w-32 text-sm sm:text-xl font-medium">Никнейм:</span>
        <EmailInput v-model:nickname="nickname" class="flex-1" />
      </div>
    </div>

    <div :class="p4" class="flex justify-end gap-2">
      <UButton
        v-for="btn in buttons"
        :disabled="btn.disabled"
        :key="btn.label"
        :label="btn.label"
        @click="btn.action"
        :color="btn.color"
        variant="subtle"
      />
    </div>
  </div>
</template>
