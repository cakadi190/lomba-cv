import { route } from "~~/lib/route";

export default defineNuxtRouteMiddleware(async () => {
  const { profileFetch } = useAuth();
  const { data, error } = await profileFetch;

  if (error.value?.statusCode === 401 || (data.value && !data.value.data)) {
    return navigateTo(route("auth.login"));
  }
});
