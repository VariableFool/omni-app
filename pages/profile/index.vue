<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const {
  data: originalUser,
  execute,
  pending,
} = useAsyncData('auth-user', async () => auth.fetchUser());

const disabled = computed(() => {
  const u = JSON.stringify({ ...auth.user });
  const o = JSON.stringify({ ...originalUser.value });

  return u === o;
});

function saveChanges(userData: any) {
  console.log(userData);
}
</script>

<template>
  <AuthGate>
    <div class="absolute top-1/2 left-1/2 -translate-1/2">
      <LoadingSpinner v-if="pending" />
    </div>
    <div class="w-full sm:py-4 sm:flex sm:justify-center">
      <UserCard
        v-if="auth.user && !pending"
        v-model="auth.user"
        :disabled="disabled"
        :save-changes="saveChanges"
      />
    </div>
  </AuthGate>
</template>
