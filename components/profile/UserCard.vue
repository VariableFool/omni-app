<script setup lang="ts">
import type { LoginResponse } from '~/types';

defineProps<{ disabled: boolean }>();

const user = defineModel<LoginResponse['user']>();

const date = new Date(user.value?.createdAt || 'undefined').toLocaleDateString('ru-RU');
</script>

<template>
  <div v-if="user">
    <UCard
      class="h-[calc(100vh-112px)] sm:h-[calc(100vh-56px-32px)] sm:w-2xl flex flex-col"
      :variant="$device.isDesktop ? 'outline' : 'soft'"
      :ui="{
        root: 'rounded-none sm:rounded-xl',
        header: 'flex gap-4',
        body: 'flex-1',
        footer: 'flex justify-end gap-4',
      }"
    >
      <template #header>
        <UAvatar size="3xl" :alt="String(user?.id)" />
        <div class="flex flex-col">
          <span class="text-xl">{{ user?.nickname || user?.email }}</span>
          <span class="text-gray-400 dark:text-gray-600">
            {{ user.specialty || 'Регистрация: ' + date }}
          </span>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <UserCardRow :title="'Никнейм'" :placeholder="'Никнейм'" v-model="user.nickname" />
        <UserCardRow
          :title="'Специальность'"
          :placeholder="'Специальность'"
          v-model="user.specialty"
        />
      </div>

      <template #footer>
        <UButton
          :disabled="disabled"
          variant="outline"
          color="primary"
          label="Сохранить изменения"
        />
        <UButton variant="outline" color="error" label="Выйти" />
      </template>
    </UCard>
  </div>
</template>
