<script setup lang="ts">
useHead({ title: '• Соцсеть' });

const auth = useAuthStore();

const base = ref(templateRef('base'));
const isOpen = ref(false);

const { direction } = useSwipe(base, {
  threshold: 50,
  onSwipeEnd() {
    if (direction.value === 'right') {
      isOpen.value = true;
    } else if (direction.value === 'left') {
      isOpen.value = false;
    }
  },
});
</script>

<template>
  <AuthGate>
    <div ref="base" class="flex justify-center">
      <UDrawer
        v-if="auth.user"
        direction="left"
        v-model:open="isOpen"
        title="OMNI APP"
        :overlay="false"
        :handle="true"
        :handle-only="true"
        :modal="false"
        :ui="{ content: 'rounded-none' }"
      >
        <template #description> <span>Social network</span></template>
        <template #body>
          <DrawerUserCard :user="auth.user" />
          <USeparator class="my-3" />
          <DrawerMenu />
        </template>
      </UDrawer>
      <div class="w-full sm:w-4xl h-[calc(100dvh-112px)] sm:h-[calc(100vh-56px)] flex flex-col">
        <SocialFeed />
      </div>
    </div>
  </AuthGate>
</template>
