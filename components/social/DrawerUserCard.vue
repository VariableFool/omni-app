<script setup lang="ts">
import type { LoginResponse } from '~/types';

const props = defineProps<{ user: LoginResponse['user'] }>();

const date = new Date(props.user.createdAt).toLocaleDateString();
</script>

<template>
  <div class="flex flex-col gap-4 justify-center">
    <UAvatar :alt="String(user.id)" :ui="{ root: 'size-20 text-4xl' }" />
    <div class="flex flex-col gap-1">
      <span class="text-2xl">{{ user.nickname || user.email }}</span>
      <span class="text-xl text-gray-500">
        {{ user.specialty || 'Регистрация: ' + date }}
      </span>
    </div>
  </div>
</template>
