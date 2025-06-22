<template>
  <div class="min-h-[calc(100vh-56px)] flex flex-wrap justify-center items-center">
    <div class="mx-auto">
      <UIcon name="lucide:twitter" size="20vw" />
    </div>
    <div class="max-w-[42vw] flex flex-col gap-14">
      <h1 class="text-7xl/tight font-bold text-wrap">В курсе происходящего</h1>
      <h1 class="text-4xl font-bold text-wrap">Присоединяйтесь сегодня.</h1>
      <div class="max-w-3xs flex flex-col gap-4">
        <UButton
          variant="solid"
          color="secondary"
          size="xl"
          class="w-3xs rounded-full flex justify-center"
        >
          Зарегистрироваться
        </UButton>
        <div class="flex items-center gap-2 text-gray-400 dark:text-gray-600">
          <hr class="w-full" />
          <span class="text-sm">ИЛИ</span>
          <hr class="w-full" />
        </div>
        <div class="text-center">
          <span class="font-bold">Уже зарегистрированы?</span>
        </div>
        <UButton
          variant="outline"
          color="neutral"
          size="xl"
          class="w-3xs rounded-full flex justify-center"
        >
          Войти
        </UButton>
      </div>
    </div>
  </div>
</template>
