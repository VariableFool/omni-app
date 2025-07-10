<script setup lang="ts">
import type { UserData } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const { user, originalUser } = storeToRefs(auth);
const error = ref('');

useHead({ title: `• ${user.value?.nickname || user.value?.email || 'Профиль'}` });

const disabled = computed(() => {
  const u = JSON.stringify({ ...user.value });
  const o = JSON.stringify({ ...originalUser.value });

  return u === o;
});

const isLoading = ref(false);

async function saveChanges(userData: UserData) {
  error.value = '';

  (['nickname', 'birthDate', 'specialty', 'status'] as (keyof UserData)[]).forEach((key) => {
    if (userData[key] === originalUser.value?.[key]) {
      delete userData[key];
    }
  });

  const cleanedData = { ...userData };

  try {
    isLoading.value = true;
    await auth.updateUser(cleanedData);
  } catch (err) {
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
        :error="error"
        :save-changes="saveChanges"
        :logout="auth.logout"
      />
    </div>
  </AuthGate>
</template>
