<script setup lang="ts">
import { set } from '@nuxt/ui/runtime/utils/index.js';
import type { UserData } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const { user, originalUser } = storeToRefs(auth);

const message = reactive({
  success: '',
  error: '',
});
const passChangeMessage = reactive({
  success: '',
  error: '',
});

useHead({ title: `• ${user.value?.nickname || user.value?.email || 'Профиль'}` });

const disabled = computed(() => {
  const u = JSON.stringify({ ...user.value });
  const o = JSON.stringify({ ...originalUser.value });

  return u === o;
});

const isLoading = ref(false);
const show = ref(false);
const newPasswordShow = ref(false);

const oldPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');

async function saveChanges(userData: UserData) {
  message.error = '';
  message.success = '';

  (['nickname', 'birthDate', 'specialty', 'status'] as (keyof UserData)[]).forEach((key) => {
    if (userData[key] === originalUser.value?.[key]) {
      delete userData[key];
    }
  });

  const cleanedData = { ...userData };

  try {
    isLoading.value = true;
    const res = await auth.updateUser(cleanedData);
    showToast(res);
  } catch (err: any) {
    console.error(err);
    message.error = 'Не удалось обновить профиль';
  } finally {
    isLoading.value = false;
  }
}

const changePasswordModal = ref(false);

async function openChangePasswordModal() {
  changePasswordModal.value = !changePasswordModal.value;
}

const toast = useToast();

function showToast(message: string) {
  toast.add({
    title: message,
  });
}

async function savePassword() {
  passChangeMessage.error = '';
  passChangeMessage.success = '';

  if (!oldPassword.value || !newPassword.value || !newPasswordConfirm.value) {
    passChangeMessage.error = 'Пожалуйста, заполните все поля';
    return;
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    passChangeMessage.error = 'Новые пароли не совпадают';
    return;
  }

  try {
    isLoading.value = true;
    const res = await auth.changePassword(newPassword.value, oldPassword.value);
    passChangeMessage.success = res || 'Пароль успешно изменен';
    showToast(res);
    changePasswordModal.value = false;
    oldPassword.value = '';
    newPassword.value = '';
    newPasswordConfirm.value = '';
    passChangeMessage.success = '';
    passChangeMessage.error = '';
  } catch (err: any) {
    passChangeMessage.error = err || 'Не удалось изменить пароль';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <AuthGate>
    <div class="w-full sm:py-4 sm:flex sm:justify-center">
      <UserCard
        v-if="auth.user"
        v-model="auth.user"
        :disabled="disabled"
        :pending="isLoading"
        :success="message.success"
        :error="message.error"
        :save-changes="saveChanges"
        :logout="auth.logout"
        :change-password="openChangePasswordModal"
      />
      <UModal
        title="Смена пароля"
        description="Придумайте сложный пароль"
        class="w-xs"
        v-model:open="changePasswordModal"
        :ui="{ body: 'flex flex-col gap-4', footer: 'flex justify-end gap-4' }"
      >
        <template #body>
          <div class="flex flex-col gap-1 text-sm">
            <span>Старый пароль: </span>
            <UInput v-model="oldPassword" color="secondary" :type="show ? 'text' : 'password'">
              <template #trailing>
                <UButton
                  variant="link"
                  class="!p-0 text-muted"
                  :icon="show ? 'lucide:eye-off' : 'lucide:eye'"
                  color="secondary"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </div>
          <div class="flex flex-col gap-1 text-sm">
            <span>Новый пароль: </span>
            <UInput
              v-model="newPassword"
              color="secondary"
              :type="newPasswordShow ? 'text' : 'password'"
              autocomplete="new-password"
            >
              <template #trailing>
                <UButton
                  variant="link"
                  class="!p-0 text-muted"
                  :icon="newPasswordShow ? 'lucide:eye-off' : 'lucide:eye'"
                  color="secondary"
                  @click="newPasswordShow = !newPasswordShow"
                />
              </template>
            </UInput>
            <div
              class="flex items-center gap-1 text-sm"
              :class="newPassword.length > 5 ? 'text-success' : 'text-error'"
            >
              <UIcon :name="newPassword.length > 5 ? 'lucide:circle-check' : 'lucide:circle-x'" />
              <span>Не менее 6 символов</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 text-sm">
            <span>Подтвердите новый пароль: </span>
            <UInput
              v-model="newPasswordConfirm"
              color="secondary"
              :type="newPasswordShow ? 'text' : 'password'"
            >
              <template #trailing>
                <UButton
                  variant="link"
                  class="!p-0 text-muted"
                  :icon="newPasswordShow ? 'lucide:eye-off' : 'lucide:eye'"
                  color="secondary"
                  @click="newPasswordShow = !newPasswordShow"
                />
              </template>
            </UInput>
          </div>
          <span class="text-center text-success" v-if="passChangeMessage.success">
            {{ passChangeMessage.success }}
          </span>
          <span class="text-center text-error" v-if="passChangeMessage.error">
            {{ passChangeMessage.error }}
          </span>
        </template>

        <template #footer>
          <UButton label="Сохранить" variant="outline" :loading="isLoading" @click="savePassword" />
          <UButton
            label="Отмена"
            variant="outline"
            color="error"
            @click="
              changePasswordModal = false;
              passChangeMessage.error = '';
              oldPassword = '';
              newPassword = '';
              newPasswordConfirm = '';
            "
          />
        </template>
      </UModal>
    </div>
  </AuthGate>
</template>
