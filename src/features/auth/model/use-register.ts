import { useMutation } from "@tanstack/react-query";
import { publicFetchClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/use-session";
import { useNavigate } from "react-router-dom";

type RegisterData = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  country?: string;
};

const registerRequest = async (data: RegisterData) => {
  const response = await publicFetchClient.POST("/users", {
    body: {
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      },
    },
  });

  if (!response.response.ok) {
    if (response.response.status === 422) {
      const errorData = await response.response.json();
      throw new Error(errorData.errors?.join(", ") || "Registration failed");
    }
    throw new Error("Failed to register");
  }

  const authHeader = response.response.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token received");
  }

  return authHeader.substring(7); // Remove "Bearer " prefix
};

export function useRegister() {
  const navigate = useNavigate();
  const session = useSession();

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess(token) {
      session.login(token);
      navigate(ROUTES.HOME);
    },
  });

  const register = (userData: RegisterData) => {
    registerMutation.mutate(userData);
  };

  const errorMessage = registerMutation.error instanceof Error
    ? registerMutation.error.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
}
