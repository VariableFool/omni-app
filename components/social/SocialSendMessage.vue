<script setup lang="ts">
const auth = useAuthStore();
const { user } = storeToRefs(auth);

const postStore = usePostStore();

const content = ref('');
const isLoading = ref(false);
const success = ref(false);
const message = ref<string | null>(null);

async function createPost() {
  try {
    isLoading.value = true;
    const res = await postStore.createPost(content.value);
    if (res.statuscode === 201) {
      success.value = true;
      message.value = 'Пост успешно добавлен';
      setTimeout(() => {
        message.value = '';
      }, 2000);
    }
    content.value = '';
  } catch (err: any) {
    message.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="p-4 pb-0 flex gap-3">
    <UAvatar :alt="String(user?.id)" size="xl" />
    <div class="w-full flex flex-col gap-2">
      <UTextarea
        placeholder="Что у вас на уме?"
        v-model="content"
        maxlength="280"
        :rows="1"
        variant="none"
        :autoresize="true"
        class="w-full"
        :ui="{ base: 'text-xl' }"
      />
      <div
        class="flex items-center justify-end gap-4 py-2 border-t border-gray-300 dark:border-gray-800"
      >
        <span v-if="message" :class="success ? 'text-success' : 'text-warning'">{{ message }}</span>
        <span
          v-if="content.length > 0"
          class="text-sm"
          :class="content.length < 3 || content.length === 280 ? 'text-warning' : 'text-success'"
          >{{ content.length + '/280' }}</span
        >
        <UButton
          @click="createPost"
          :disabled="content.length < 3"
          :loading="isLoading"
          label="Post"
          variant="solid"
          color="neutral"
          class="w-fit rounded-full font-bold"
          size="xl"
          :ui="{ base: 'px-5' }"
        />
      </div>
    </div>
  </div>
</template>
