export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token');
  const user = useState('user');
  //const apiUrl = 'https://omni-api.gghub.ru/';
  const apiUrl = 'http://localhost:4000/';

  // Если токена нет, перенаправляем на /login
  if (!token.value) {
    return navigateTo('/social');
  }

  // Если данные пользователя уже есть, ничего не делаем
  if (user.value) {
    return;
  }

  // Пробуем загрузить данные пользователя
  try {
    const response = await $fetch<{ user: { id: number; email: string; nickname?: string } }>(
      '/auth/status',
      {
        baseURL: apiUrl, // Замените на ваш API URL
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    user.value = response.user;
  } catch (error) {
    // Если токен недействителен, очищаем его и перенаправляем на /login
    token.value = null;
    user.value = null;
    return navigateTo('/social');
  }
});
