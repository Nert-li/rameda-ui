import { useMutation } from "@tanstack/react-query";
import { publicFetchClient } from "@/shared/api/instance";
import { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/use-session";
import { useNavigate } from "react-router-dom";

const loginRequest = async (data: ApiSchemas["DeviseLoginRequest"]["user"]) => {
  const response = await publicFetchClient.POST("/users/sign_in", {
    body: {
      user: {
        email: data.email,
        password: data.password,
      },
    },
  });

  if (!response.response.ok) {
    throw new Error("Failed to login");
  }

  const authHeader = response.response.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token received");
  }

  return authHeader.substring(7); // Remove "Bearer " prefix
};

export function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess(token) {
      session.login(token);
      navigate(ROUTES.HOME);
    },
  });

  const login = (data: ApiSchemas["DeviseLoginRequest"]["user"]) => {
    loginMutation.mutate(data);
  };

  const errorMessage = loginMutation.error instanceof Error
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
