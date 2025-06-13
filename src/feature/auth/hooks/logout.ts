import { authClient } from "@/lib/auth/auth.client";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return { logout };
}
