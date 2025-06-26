<script setup lang="ts">
const isMobile = useMediaQuery('(max-width: 768px)');
const show = ref(false);

const auth = useAuthStore();

const email = ref('');
const password = ref('');
</script>

<template>
  <div
    class="h-[calc(100vh-48px-72px-100px)] md:h-[calc(100vh-56px)] text-sky-600 dark:text-white flex flex-col items-center justify-center md:flex-row md:justify-between"
  >
    <div class="mb-4 md:mb-0 mx-auto">
      <UIcon name="lucide:twitter" size="20vw" />
    </div>
    <div class="w-[320px] md:min-w-[40vw] flex flex-col items-center md:items-baseline gap-2">
      <span v-show="isMobile" class="mb-4 font-bold text-2xl">Создать учетную запись</span>
      <span
        v-show="!isMobile"
        class="mb-14 font-bold break-all text-2xl sm:text-2xl/tight md:text-5xl/tight lg:text-6xl/tight xl:text-6xl/tight 2xl:text-7xl/tight whitespace-pre-line"
        >{{ 'В курсе\nпроисходящего' }}</span
      >
      <span
        v-show="!isMobile && $device.isDesktop"
        class="mb-8 font-bold text-2xl lg:text-3xl xl:text-4xl dark:text-white"
      >
        Присоединяйтесь сегодня.
      </span>
      <span v-if="auth.error" class="text-red-400">{{ auth.error }}</span>
      <div class="mb-4 w-[320px] flex flex-col gap-2">
        <UInput
          v-model="email"
          trailing-icon="i-lucide-at-sign"
          variant="outline"
          color="secondary"
          size="xl"
          class="w-full"
          placeholder="Введите email"
          autocomplete="on"
          name="email"
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
        @click="auth.register({ email: email, password: password })"
        :loading="auth.isLoading"
        size="xl"
        variant="solid"
        color="secondary"
        class="w-[320px] rounded-full justify-center"
        label="Зарегистрироваться"
        :ui="{
          base: 'bg-sky-500 hover:bg-sky-600 dark:bg-white dark:hover:bg-gray-300 dark:disabled:bg-gray-300',
        }"
      />
      <div class="w-[320px]">
        <USeparator
          label="ИЛИ"
          :ui="{ border: 'border-1 border-gray-300 dark:border-gray-600', label: 'text-gray-500' }"
        />
      </div>
      <span class="w-[320px] text-center font-bold dark:text-white">Уже зарегистрированы?</span>
      <UButton
        @click="auth.login({ email: email, password: password })"
        :loading="auth.isLoading"
        size="xl"
        variant="outline"
        color="secondary"
        class="w-[320px] rounded-full justify-center"
        label="Войти"
        :ui="{
          base: 'ring-sky-500 text-sky-500 dark:ring-white dark:text-white dark:hover:bg-gray-700',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.my-custom-separator {
  --uno-border-color: #ff6f61; /* или любой другой цвет */
}
</style>
