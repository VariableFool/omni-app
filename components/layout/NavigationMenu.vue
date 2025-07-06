<script setup lang="ts">
const desktopMenuOpen = defineModel('menu-open');

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
  <nav
    class="w-full h-16 lg:h-[calc(100dvh-48px)] fixed bottom-0 lg:top-12 bg-white dark:bg-gray-900 border-t lg:border-t-0 lg:border-r border-gray-300 dark:border-gray-800 transition-[width]"
    :class="desktopMenuOpen ? 'lg:w-46' : 'lg:w-14'"
  >
    <ul
      class="px-4 sm:px-8 lg:px-0 py-3 lg:py-0 h-full flex lg:flex-col justify-between lg:justify-start whitespace-nowrap"
    >
      <ULinkBase
        @click="desktopMenuOpen = !desktopMenuOpen"
        class="hidden lg:block cursor-pointer transition-all"
        ><UIcon
          :name="desktopMenuOpen ? 'lucide:panel-right-open' : 'lucide:panel-left-open'"
          :class="desktopMenuOpen ? 'text-secondary' : 'text-muted hover:text-default'"
          :size="25"
          class="my-4"
      /></ULinkBase>
      <li v-for="item in menu" :key="item.label">
        <ULink
          class="lg:mx-2 lg:my-2 lg:p-1.5 lg:gap-2 lg:flex lg:items-center lg:rounded-lg lg:hover:bg-gray-100 lg:dark:hover:bg-gray-800"
          :to="item.to"
          active-class="text-secondary"
        >
          <UIcon :name="item.icon" :size="25" class="w-5 h-5 shrink-0" />
          <span v-if="desktopMenuOpen" class="hidden lg:block font-medium">
            {{ item.label }}
          </span>
        </ULink>
      </li>
    </ul>
  </nav>
</template>
