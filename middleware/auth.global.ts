export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, user, fetchUser } = useAuthStore();

  if (isAuthenticated) {
    if (!user) {
      fetchUser();
    }
  }
});
