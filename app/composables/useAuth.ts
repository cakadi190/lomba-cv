import { useLogout } from "~/composables/auth/useLogout";
import { route } from "~~/lib/route";

export interface User {
  id: string | number;
  email: string;
  name: string;
  [key: string]: unknown;
}

export interface ProfileResponse {
  data: User;
  [key: string]: unknown;
}

export function useAuth() {
  const profileFetch = useFetch<ProfileResponse>(route("api.auth.me"));
  const { logout } = useLogout();

  return {
    profileFetch,
    logout,
  };
}
