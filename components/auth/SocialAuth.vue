<script setup lang="ts">
import type { AuthUserData } from '~/types';

const auth = useAuthStore();

const show = ref(false);
const email = ref('');
const password = ref('');

const isLoading = ref(false);
const error = ref('');

async function login() {
  error.value = '';
  const userData: AuthUserData = {
    email: email.value,
    password: password.value,
  };

  try {
    isLoading.value = true;
    await auth.login(userData);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    class="h-[calc(100dvh-112px)] lg:h-[calc(100dvh-48px)] px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-baseline text-sky-500 dark:text-white"
  >
    <div class="text-sky-400 mx-auto">
      <UIcon name="lucide:twitter" size="20vw" class="dark:text-white" />
    </div>
    <div class="flex flex-col lg:mr-auto">
      <div class="mb-4 font-bold text-2xl text-center lg:text-start">
        <span class="lg:hidden">Вход в аккаунт</span>
        <div class="hidden lg:flex lg:flex-col">
          <span class="lg:text-[5vw] xl:text-[4vw]">В курсе</span>
          <span class="lg:text-[5vw] xl:text-[4vw] lg:mb-14">происходящего</span>
          <span class="lg:text-[2vw]">Присоединяйтесь сегодня.</span>
        </div>
      </div>
      <div class="w-xs my-4 px-4 sm:px-0 flex flex-col gap-2">
        <p v-show="error" class="text-error text-center">{{ error }}</p>
        <UInput
          trailing-icon="lucide:at-sign"
          placeholder="Email"
          size="xl"
          v-model="email"
          color="secondary"
          type="email"
          name="email"
          autocomplete="on"
        />
        <UInput
          v-model="password"
          placeholder="Пароль"
          color="secondary"
          size="xl"
          :type="show ? 'text' : 'password'"
          :ui="{ root: 'mb-4', trailing: 'pe-1' }"
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
        <Button label="Войти" :click="login" color="secondary" :loading="isLoading" />
        <USeparator label="ИЛИ" :ui="{ border: 'border-gray-400', label: 'text-muted' }" />
        <div class="text-center font-bold"><span>Еще не зарегистрированы?</span></div>
        <Button
          label="Зарегистрироваться"
          :click="() => console.log('da')"
          variant="outline"
          color="secondary"
        />
      </div>
    </div>
  </div>
</template>
