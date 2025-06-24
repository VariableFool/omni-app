<script setup lang="ts">
const isMobile = useMediaQuery('(max-width: 768px)');
const show = ref(false);
const password = ref('');
</script>

<template>
  <div
    class="h-[calc(100vh-46px)] text-sky-600 dark:text-white flex flex-col items-center justify-center md:flex-row md:justify-between"
  >
    <div class="mb-4 md:mb-0 mx-auto">
      <UIcon name="lucide:twitter" size="20vw" />
    </div>
    <div class="w-[320px] md:min-w-[40vw] flex flex-col items-center md:items-baseline gap-2">
      <span v-show="isMobile" class="mb-4 font-bold text-2xl">Создать учетную запись</span>
      <span
        v-show="!isMobile"
        class="mb-14 font-bold break-all text-2xl sm:text-2xl/tight md:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight whitespace-pre-line"
        >{{ 'В курсе\nпроисходящего' }}</span
      >
      <span
        v-show="!isMobile && $device.isDesktop"
        class="mb-8 font-bold text-2xl lg:text-3xl xl:text-4xl text-sky-800 dark:text-white"
      >
        Присоединяйтесь сегодня.
      </span>
      <div class="mb-4 w-[320px] flex flex-col gap-2">
        <UInput
          trailing-icon="i-lucide-at-sign"
          variant="outline"
          color="secondary"
          size="xl"
          class="w-full"
          placeholder="Введите email"
        />
        <UInput
          v-model="password"
          size="xl"
          color="secondary"
          placeholder="Введите пароль"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="xl"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </div>
      <UButton
        size="xl"
        variant="solid"
        color="secondary"
        class="w-[320px] rounded-full justify-center"
        >Зарегистрироваться</UButton
      >
      <div class="w-[320px] flex items-center gap-3">
        <hr class="w-full text-gray-400 dark:text-gray-600" />
        <span>ИЛИ</span>
        <hr class="w-full text-gray-400 dark:text-gray-600" />
      </div>
      <span class="w-[320px] text-center font-bold">Уже зарегистрированы?</span>
      <UButton
        size="xl"
        variant="outline"
        color="neutral"
        class="w-[320px] rounded-full justify-center"
        >Войти</UButton
      >
    </div>
  </div>
</template>
