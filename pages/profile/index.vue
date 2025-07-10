<script setup lang="ts">
import type { UserData } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const { user, originalUser } = storeToRefs(auth);
const message = reactive({
  success: '',
  error: '',
});

useHead({ title: `• ${user.value?.nickname || user.value?.email || 'Профиль'}` });

const disabled = computed(() => {
  const u = JSON.stringify({ ...user.value });
  const o = JSON.stringify({ ...originalUser.value });

  return u === o;
});

const isLoading = ref(false);

async function saveChanges(userData: UserData) {
  message.error = '';
  message.success = '';

  (['nickname', 'birthDate', 'specialty', 'status'] as (keyof UserData)[]).forEach((key) => {
    if (userData[key] === originalUser.value?.[key]) {
      delete userData[key];
    }
  });

  const cleanedData = { ...userData };

  try {
    isLoading.value = true;
    const res = await auth.updateUser(cleanedData);
    message.success = res.message || 'Профиль успешно обновлен';
  } catch (err: any) {
    message.error = err.message || 'Не удалось обновить профиль';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <AuthGate>
    <div class="w-full sm:py-4 sm:flex sm:justify-center">
      <UserCard
        v-if="auth.user"
        v-model="auth.user"
        :disabled="disabled"
        :pending="isLoading"
        :success="message.success"
        :error="message.error"
        :save-changes="saveChanges"
        :logout="auth.logout"
      />
    </div>
  </AuthGate>
</template>
