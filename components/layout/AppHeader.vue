<template>
  <header
    class="fixed top-0 right-0 w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between z-50"
  >
    <div class="flex justify-center items-center gap-3">
      <ThemeSwitcher />
      <h1 class="text-lg font-semibold">OMNI APP</h1>
    </div>

    <div class="flex items-center gap-2">
      <Icon name="lucide:user" class="w-6 h-6" />
      <span>Войти</span>
    </div>
  </header>
</template>
