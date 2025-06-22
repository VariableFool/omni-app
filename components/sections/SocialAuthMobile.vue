<script setup lang="ts">
const show = ref(false);
const password = ref('');
</script>

<template>
  <div class="m-2">
    <div class="flex flex-col gap-4 items-center">
      <Icon name="lucide:twitter" size="48" class="text-sky-600 dark:text-sky-300" />
      <h1 class="text-xl text-sky-600 dark:text-sky-300 font-bold">Создать учетную запись</h1>
      <UInput
        trailing-icon="i-lucide-at-sign"
        variant="outline"
        color="secondary"
        placeholder="Введите ваш email"
        size="xl"
        class="w-full"
      />
      <UInput
        v-model="password"
        variant="outline"
        color="secondary"
        placeholder="Password"
        size="xl"
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
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
      <UButton
        variant="solid"
        color="secondary"
        size="xl"
        class="rounded-full w-full justify-center"
      >
        Зарегистрироваться
      </UButton>
    </div>
    <div class="my-4 flex items-center gap-2 text-gray-600">
      <hr class="w-full" />
      <span class="text-sm">ИЛИ</span>
      <hr class="w-full" />
    </div>
    <div class="flex flex-col justify-center items-center gap-4">
      <p class="font-bold text-sm">Уже зарегистрированы?</p>
      <UButton variant="solid" color="neutral" size="xl" class="rounded-full w-full justify-center">
        Войти
      </UButton>
    </div>
  </div>
</template>
