<script setup lang="ts">
import type { LoginResponse } from '~/types';
import { vMaska } from 'maska/vue';

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

const date = new Date(user.value.createdAt).toLocaleDateString('ru-RU');
</script>

<template>
  <div
    class="w-full sm:w-xl ring-1 ring-gray-300 dark:ring-0 dark:bg-gray-950/30 h-full flex flex-col sm:rounded-2xl"
  >
    <div class="flex items-center p-4 gap-4">
      <UAvatar :alt="String(user.id)" size="3xl" />
      <div class="flex flex-col gap-1">
        <span class="text-xl">{{ nickname || user.email }}</span>
        <span class="text-gray-500">
          {{ 'Регистрация: ' + date }}
        </span>
      </div>
    </div>

    <div class="border-y-1 border-gray-300 dark:border-gray-700/80 p-4 flex flex-col flex-1 gap-4">
      <UserInfoRow :title="'Email'">
        <span class="text-sm sm:text-xl">{{ user.email }}</span>
      </UserInfoRow>
      <UserInfoRow :title="'Статус'">
        <UserInfoInput v-model:text="user.status" />
      </UserInfoRow>
      <UserInfoRow :title="'Никнейм'">
        <UserInfoInput v-model:text="nickname" />
      </UserInfoRow>
      <UserInfoRow :title="'Дата рождения'">
        <UInput
          v-maska="'##.##.####'"
          class="font-mono"
          placeholder="01.01.1993"
          :ui="{
            base: 'w-[123px] mt-1 sm:w-[150px] ring-0 bg-gray-800 focus-visible:ring-0 text-sm sm:text-lg px-1 py-0 sm:px-2',
            trailing: 'pt-0.5',
          }"
          ><template #trailing
            ><Icon
              name="lucide:calendar-1"
              :size="$device.isDesktop ? '20' : '14'"
              class="text-gray-500" /></template
        ></UInput>
      </UserInfoRow>
      <UserInfoRow :title="'Специальность'">
        <UserInfoInput v-model:text="user.specialty" />
      </UserInfoRow>
    </div>

    <div class="flex justify-end gap-2 p-4">
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
