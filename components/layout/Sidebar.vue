<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits(['toggle']);

const menu = [
  { label: 'Главная', icon: 'lucide:home', to: '/' },
  { label: 'Новости', icon: 'lucide:rss', to: '/news' },
  { label: 'Видео', icon: 'lucide:youtube', to: '/videos' },
  { label: 'Музыка', icon: 'lucide:music', to: '/music' },
  { label: 'Сеть', icon: 'lucide:twitter', to: '/social' },
  { label: 'О проекте', icon: 'lucide:info', to: '/about' },
];
</script>

<template>
  <aside
    :class="collapsed ? 'w-14' : 'w-44'"
    class="bg-white dark:bg-gray-900 dark:text-white h-auto border-r border-gray-300 dark:border-gray-600 transition-[width] flex flex-col"
  >
    <button
      @click="emit('toggle')"
      class="cursor-pointer p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Icon
        :name="collapsed ? 'lucide:panel-right-close' : 'lucide:panel-left-close'"
        class="w-6 h-6"
      />
    </button>

    <nav class="flex-1 space-y-1 px-2">
      <NuxtLink
        v-for="item in menu"
        :key="item.label"
        :to="item.to"
        class="cursor-pointer flex items-center space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="collapsed ? 'px-3 py-3' : 'px-3 py-2'"
      >
        <Icon :name="item.icon" />
        <span
          v-if="!collapsed"
          class="transition-[width] duration-300 whitespace-nowrap overflow-hidden"
          :class="collapsed ? 'w-0' : 'w-auto'"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>
