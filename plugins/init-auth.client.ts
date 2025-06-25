export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();

  try {
    const response = await $fetch<{ user: { id: number; email: string } }>('/auth/status', {
      method: 'GET',
      baseURL: auth.apiUrl,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (response.user) {
      auth.user = response.user;
    }
  } catch (err) {
    console.error(err);
  }
});
