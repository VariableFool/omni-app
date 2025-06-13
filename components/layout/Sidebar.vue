<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits(['toggle']);

const menu = [
  { label: 'Главная', icon: 'lucide:home' },
  { label: 'Новости', icon: 'lucide:rss' },
  { label: 'Видео', icon: 'lucide:youtube' },
  { label: 'Музыка', icon: 'lucide:music' },
  { label: 'Сеть', icon: 'lucide:twitter' },
  { label: 'О проекте', icon: 'lucide:info' },
];
</script>

<template>
  <aside
    :class="[collapsed ? 'w-14' : 'w-48']"
    class="bg-white h-screen border-r border-gray-300 transition-[width] duration-300 flex flex-col"
  >
    <button @click="emit('toggle')" class="cursor-pointer p-3.5 hover:bg-gray-100">
      <Icon
        :name="collapsed ? 'lucide:panel-right-close' : 'lucide:panel-left-close'"
        class="w-6 h-6"
      />
    </button>

    <nav class="flex-1 space-y-1 px-2">
      <div
        v-for="item in menu"
        :key="item.label"
        class="cursor-pointer flex items-center space-x-3 rounded-lg hover:bg-gray-100"
        :class="collapsed ? 'justify-center py-3' : 'px-4 py-2'"
      >
        <Icon :name="item.icon" />
        <span
          v-if="!collapsed"
          class="transition-[width] duration-300 whitespace-nowrap overflow-hidden"
          :class="collapsed ? 'w-0' : 'w-auto'"
        >
          {{ item.label }}
        </span>
      </div>
    </nav>
  </aside>
</template>
