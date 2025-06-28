<template>
  <div class="p-2 flex justify-between items-center dark:bg-gray-900 shadow">
    <div class="flex gap-2">
      <span class="font-bold font-['Inter']">OMNI APP</span>
      <DevInfo :text="' DEV NOW'" />
    </div>
    <ThemeSwitcher />
  </div>
</template>
