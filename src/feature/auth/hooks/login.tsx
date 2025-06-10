import { authClient } from "@/lib/auth/auth.client";
import { ErrorContext } from "better-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoginSchemaType } from "../schema/login";

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onRequest = () => {
    setIsLoading(true);
  };

  const onSuccess = () => {
    router.push("/");
  };

  const onError = ({ error }: ErrorContext) => {
    toast.error(error.message);
    setIsLoading(false);
  };

  const loginWithEmail = (data: LoginSchemaType) => {
    authClient.signIn.email(data, {
      onRequest,
      onSuccess,
      onError,
    });
  };

  const loginWithSocial = (provider: "github" | "google") => {
    authClient.signIn.social(
      { provider },
      {
        onRequest,
        onSuccess,
        onError,
      }
    );
  };

  return {
    isLoading,
    loginWithEmail,
    loginWithSocial,
  };
}
