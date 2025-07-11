<script setup lang="ts">
const props = defineProps<{ post: Post }>();

const date = computed(() => {
  if (!props.post?.createdAt) return '';
  return new Date(props.post.createdAt).toLocaleDateString('ru-RU');
});
</script>

<template>
  <div class="flex first:border-b-0 p-4 border-y border-gray-200 dark:border-gray-800 h-">
    <UAvatar :alt="String(props.post.author.id)" size="xl" />
    <div class="w-full flex flex-col ml-3 text-black dark:text-white">
      <div class="flex items-center gap-2">
        <UPopover
          mode="hover"
          :open-delay="500"
          :close-delay="300"
          :ui="{
            content:
              'w-64 p-4 dark:bg-gray-950 flex flex-col gap-4 rounded-3xl ring-0 shadow-[0_0_10px_black] dark:shadow-[0_0_10px_gray]',
          }"
        >
          <p class="font-bold cursor-pointer hover:underline">
            {{ post.author.nickname || post.author.email }}
          </p>

          <template #content>
            <div class="flex justify-between items-center">
              <UAvatar :alt="String(post.author.id)" class="size-16" :ui="{ root: 'text-3xl' }" />
              <UButton label="Подписаться" color="neutral" :ui="{ base: 'rounded-full text-md' }" />
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-xl">{{ post.author.nickname || post.author.email }}</span>
              <span class="text-muted text-sm">{{ post.author.specialty }}</span>
              <span>Статус: {{ post.author.status }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Подписки</span>
              <span>Подписчики</span>
            </div>
          </template>
        </UPopover>
        <span class="text-gray-500 text-sm">•</span>
        <span class="text-gray-500 text-sm">{{ date }}</span>
      </div>
      <p>{{ post.content }}</p>
      <div class="flex justify-between items-center mt-2 -ml-2">
        <div class="group flex items-center cursor-pointer text-muted hover:text-sky-500">
          <UButton
            variant="ghost"
            icon="lucide:message-circle"
            :ui="{
              base: 'rounded-full hover:bg-sky-500/10 group-hover:bg-sky-500/10',
              leadingIcon: 'text-muted group-hover:text-sky-500',
            }"
            size="xl"
          />
          <span class="text-sm select-none">{{ post.commentCount || '' }}</span>
        </div>

        <div class="group flex items-center cursor-pointer text-muted hover:text-primary-500">
          <UButton
            variant="ghost"
            icon="lucide:git-compare-arrows"
            :ui="{
              base: 'rounded-full hover:bg-primary-500/10 group-hover:bg-primary-500/10',
              leadingIcon: 'text-muted group-hover:text-primary-500',
            }"
            size="xl"
          />
          <span class="text-sm select-none">{{ post.replyCount || '' }}</span>
        </div>

        <div class="group flex items-center cursor-pointer text-muted hover:text-pink-500">
          <UButton
            variant="ghost"
            icon="lucide:heart"
            :ui="{
              base: 'rounded-full hover:bg-pink-500/10 group-hover:bg-pink-500/10',
              leadingIcon: 'text-muted group-hover:text-pink-500',
            }"
            size="xl"
          />
          <span class="text-sm select-none">{{ post.likeCount || '' }}</span>
        </div>

        <div class="group flex items-center cursor-pointer text-muted hover:text-sky-500">
          <UButton
            variant="ghost"
            icon="lucide:chart-no-axes-column"
            :ui="{
              base: 'rounded-full hover:bg-sky-500/10 group-hover:bg-sky-500/10',
              leadingIcon: 'text-muted group-hover:text-sky-500',
            }"
            size="xl"
          />
          <span class="text-sm select-none">{{ post.viewsCount || '' }}</span>
        </div>

        <div class="group flex items-center cursor-pointer text-muted hover:text-sky-500">
          <UButton
            variant="ghost"
            icon="lucide:bookmark"
            :ui="{
              base: 'rounded-full hover:bg-sky-500/10 group-hover:bg-sky-500/10',
              leadingIcon: 'text-muted group-hover:text-sky-500',
            }"
            size="xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
