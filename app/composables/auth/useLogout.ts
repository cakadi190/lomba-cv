import { route } from "~~/lib/route";

export function useLogout() {
  const logout = async () => {
    return await $fetch(route("api.auth.logout"), {
      method: "POST",
    });
  };
  return { logout };
}

export default useLogout;
