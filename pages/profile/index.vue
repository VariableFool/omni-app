<script setup lang="ts">
import type { UserData } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const { user } = storeToRefs(auth);

useHead({ title: `• ${user.value?.nickname || user.value?.email || 'Профиль'}` });

const {
  data: originalUser,
  error,
  pending,
} = await useAsyncData('user-status', async () => await auth.fetchUser());

const disabled = computed(() => {
  const u = JSON.stringify({ ...auth.user });
  const o = JSON.stringify({ ...originalUser.value });

  return u === o;
});

const isLoading = ref(false);

async function saveChanges(userData: UserData) {
  (['nickname', 'birthDate', 'specialty', 'status'] as (keyof UserData)[]).forEach((key) => {
    if (userData[key] === originalUser.value?.[key]) {
      delete userData[key];
    }
  });

  const cleanedData = { ...userData };

  isLoading.value = true;
  await auth.updateUser(cleanedData);
  originalUser.value = auth.user;
  isLoading.value = false;
}
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-1/2">
    <LoadingSpinner v-if="pending" />
  </div>
  <AuthGate>
    <div class="w-full sm:py-4 sm:flex sm:justify-center">
      <UserCard
        v-if="auth.user && !pending"
        v-model="auth.user"
        :disabled="disabled"
        :pending="isLoading"
        :save-changes="saveChanges"
      />
    </div>
  </AuthGate>
</template>
