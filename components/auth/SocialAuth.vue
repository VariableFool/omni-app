<script setup lang="ts">
import type { AuthUserData } from '~/types';

const auth = useAuthStore();

const show = ref(false);
const regShow = ref(false);

const email = ref('');
const isEmailValid = computed(() => {
  const value = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
});

const password = ref('');
const nickname = ref('');
const specialty = ref('');

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

async function register() {
  error.value = '';
  const userData: AuthUserData = {
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    specialty: specialty.value,
  };

  try {
    isLoading.value = true;
    await auth.register(userData);

    email.value = '';
    password.value = '';
    nickname.value = '';
    specialty.value = '';
  } catch (err: any) {
    console.error(err);
    error.value = err.message || 'Не удалось зарегистрироваться';
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
        <UModal
          title="РЕГИСТРАЦИЯ"
          description="Создайте аккаунт, чтобы начать использовать все возможности приложения."
          :ui="{
            footer: 'flex flex-col gap-4',
          }"
        >
          <UButton
            @click="error = ''"
            label="Зарегестрироваться"
            variant="outline"
            color="secondary"
            class="rounded-full flex items-center justify-center"
            size="xl"
          />

          <template #body>
            <div class="flex flex-col gap-4 max-w-sm mx-auto">
              <div class="flex flex-col gap-1">
                <UInput
                  trailing-icon="lucide:at-sign"
                  placeholder="Email"
                  size="xl"
                  v-model="email"
                  :color="isEmailValid ? 'secondary' : 'error'"
                  type="email"
                  name="email"
                  autocomplete="on"
                />
                <div class="flex items-center gap-1 text-muted">
                  <UIcon
                    :name="isEmailValid ? 'lucide:circle-check' : 'lucide:circle-x'"
                    class="size-4"
                    :class="isEmailValid ? 'text-success' : 'text-error'"
                  />
                  <span class="text-sm" :class="isEmailValid ? 'text-success' : 'text-error'"
                    >email@example.com</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <UInput
                  v-model="password"
                  placeholder="Пароль"
                  size="xl"
                  maxlength="64"
                  :color="password.length < 6 ? 'error' : 'secondary'"
                  :type="regShow ? 'text' : 'password'"
                  :ui="{ trailing: 'pe-1' }"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="xl"
                      :icon="regShow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      :aria-label="regShow ? 'Hide password' : 'Show password'"
                      :aria-pressed="regShow"
                      aria-controls="password"
                      @click="regShow = !regShow"
                    />
                  </template>
                </UInput>
                <div class="flex items-center gap-1 text-muted">
                  <UIcon
                    :name="password.length >= 6 ? 'lucide:circle-check' : 'lucide:circle-x'"
                    class="size-4"
                    :class="password.length >= 6 ? 'text-success' : 'text-error'"
                  />
                  <span
                    class="text-sm"
                    :class="password.length >= 6 ? 'text-success' : 'text-error'"
                    >Не менее 6 символов</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-sm text-muted"
                  >Необязательно — можно изменить позже в профиле.</span
                >
                <UInput
                  maxlength="20"
                  placeholder="Никнейм"
                  size="xl"
                  v-model="nickname"
                  :color="nickname.length < 3 ? 'error' : 'secondary'"
                  type="name"
                  name="name"
                  autocomplete="on"
                >
                  <template #trailing>
                    <div
                      id="character-count"
                      class="text-xs text-muted tabular-nums"
                      aria-live="polite"
                      role="status"
                    >
                      {{ nickname?.length }}/{{ 20 }}
                    </div>
                  </template>
                </UInput>

                <UInput
                  placeholder="Специальность"
                  size="xl"
                  v-model="specialty"
                  :color="specialty.length < 3 ? 'error' : 'secondary'"
                  maxlength="20"
                >
                  <template #trailing>
                    <div
                      id="character-count"
                      class="text-xs text-muted tabular-nums"
                      aria-live="polite"
                      role="status"
                    >
                      {{ specialty?.length }}/{{ 20 }}
                    </div>
                  </template>
                </UInput>
              </div>
            </div>
          </template>

          <template #footer>
            <span v-if="error" class="text-error">{{ error }}</span>
            <UButton
              :disabled="!email || !password || password.length < 6"
              :loading="isLoading"
              label="Зарегистрироваться"
              variant="solid"
              color="secondary"
              class="rounded-full flex items-center justify-center"
              size="xl"
              @click="register"
              :ui="{ base: 'px-8' }"
            />
          </template>
        </UModal>
      </div>
    </div>
  </div>
</template>
