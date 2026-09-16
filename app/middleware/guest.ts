import { route } from "~~/lib/route";

export default defineNuxtRouteMiddleware(async () => {
  const { profileFetch } = useAuth();
  const { data, error } = await profileFetch;

  if (!error.value && data.value?.data) {
    return navigateTo(route("admin.index"), { replace: true });
  }
});
