import { authClient } from "@/lib/auth/auth.client";
import { ErrorContext } from "better-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreateAccountSchemaType } from "../schema/create-account";

export function useCreateAccount() {
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

  const createAccountWithEmail = (data: CreateAccountSchemaType) => {
    authClient.signUp.email(data, {
      onRequest,
      onSuccess,
      onError,
    });
  };

  const createAccountWithSocial = (provider: "github" | "google") => {
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
    createAccountWithEmail,
    createAccountWithSocial,
  };
}
