<script setup lang="ts">
const menu = [
  { label: 'Главная', icon: 'lucide:home', to: '/' },
  { label: 'Новости', icon: 'lucide:rss', to: '/news' },
  { label: 'Видео', icon: 'lucide:youtube', to: '/videos' },
  { label: 'Музыка', icon: 'lucide:music', to: '/music' },
  { label: 'Сеть', icon: 'lucide:twitter', to: '/social' },
  { label: 'Профиль', icon: 'lucide:user', to: '/profile' },
  { label: 'О проекте', icon: 'lucide:info', to: '/about' },
];
</script>

<template>
  <div
    class="fixed bottom-0 w-full h-16 p-2 px-6 bg-gray-50 border-t-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900"
  >
    <nav class="flex justify-between gap-2">
      <NuxtLink
        v-for="item in menu"
        :key="item.label"
        :to="item.to"
        class="cursor-pointer flex items-center space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div class="p-2 flex items-center rounded-lg">
          <Icon :name="item.icon" size="22" />
        </div>
      </NuxtLink>
    </nav>
  </div>
</template>
