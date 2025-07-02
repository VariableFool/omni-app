<script setup lang="ts">
useHead({ title: '| Social network' });

const auth = useAuthStore();

const drawerOpen = ref(false);
const target = ref<HTMLElement | null>(null);

const { direction } = useSwipe(target, {
  threshold: 50,
  onSwipeEnd() {
    if (direction.value === 'right') {
      drawerOpen.value = true;
    }
  },
});

const userData = ref({});
</script>

<template>
  <AuthGate>
    <div class="flex justify-center">
      <UDrawer
        v-if="auth.user"
        direction="left"
        v-model:open="drawerOpen"
        title="OMNI APP"
        :handle="false"
        :ui="{ content: 'rounded-none' }"
      >
        <template #description> <span>Social network</span></template>
        <template #body>
          <DrawerUserCard :user="auth.user" />
          <USeparator class="my-3" />
          <DrawerMenu />
        </template>
      </UDrawer>
      <div
        ref="target"
        class="w-full sm:w-4xl h-[calc(100dvh-112px)] sm:h-[calc(100vh-56px)] flex flex-col"
      >
        <SocialFeed />
      </div>
    </div>
  </AuthGate>
</template>
