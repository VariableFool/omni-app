export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, user, fetchUser } = useAuthStore();
  const token = useCookie('token');

  if (!token.value) {
    return navigateTo('/social');
  }

  if (isAuthenticated) {
    if (!user) {
      fetchUser();
    }
  }
});
