<script setup lang="ts">
import type { LoginResponse } from '~/types';

const auth = useAuthStore();
const user = useState<LoginResponse['user']>('user');

const nickname = ref(user.value.nickname);

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

const p4 = 'p-4';
const titleStyle = 'text-lg sm:text-xl font-medium';
const subtitleStyle = 'p-0 py-1 text-lg sm:text-xl';
const dottedStyle = 'flex-1 border-b-1 border-gray-600 border-dotted h-5 mx-1';
</script>

<template>
  <div
    class="w-lg ring-1 ring-gray-300 dark:ring-0 dark:bg-gray-950/30 h-full flex flex-col sm:rounded-2xl"
  >
    <div :class="p4" class="flex items-center gap-4">
      <UAvatar :alt="String(user.id)" size="3xl" />
      <div class="flex flex-col gap-1">
        <span class="text-xl">{{ nickname || user.email }}</span>
        <span class="text-gray-500">
          {{ 'Регистрация: ' + new Date(user.createdAt).toLocaleDateString('ru-RU') }}
        </span>
      </div>
    </div>

    <div
      :class="p4"
      class="flex flex-col flex-1 border-y-1 border-gray-300 dark:border-gray-700/80 gap-2"
    >
      <div class="flex items-center">
        <span :class="titleStyle">Email:</span>
        <div :class="dottedStyle"></div>
        <span :class="subtitleStyle">{{ user.email }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span :class="titleStyle">Никнейм:</span>
        <div :class="dottedStyle"></div>
        <EmailInput v-model:nickname="nickname" />
      </div>
      <div class="flex items-center gap-2">
        <span :class="titleStyle">Дата рождения:</span>
        <div :class="dottedStyle"></div>
        <span :class="subtitleStyle">{{ user.birthDate || 'undefined' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span :class="titleStyle">Специальность:</span>
        <div :class="dottedStyle"></div>
        <span :class="subtitleStyle">{{ user.specialty || 'undefined' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span :class="titleStyle">Статус:</span>
        <div :class="dottedStyle"></div>
        <span :class="subtitleStyle">{{ user.status || 'undefined' }}</span>
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
