import { useSession } from "./use-session";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { useMutation } from "@tanstack/react-query";

const logoutRequest = async () => {
    // Динамический импорт для избежания циклической зависимости
    const { publicFetchClient } = await import("@/shared/api/instance");
    const response = await publicFetchClient.DELETE("/users/sign_out");

    if (!response.response.ok) {
        throw new Error("Failed to logout on server");
    }

    return response;
};

export function useLogout() {
    const navigate = useNavigate();
    const session = useSession();

    const logoutMutation = useMutation({
        mutationFn: logoutRequest,
        onSuccess() {
            session.logout();
            navigate(ROUTES.LOGIN);
        },
        onError(error) {
            console.warn("Server logout failed, clearing session anyway:", error);
            session.logout();
            navigate(ROUTES.LOGIN);
        },
    });

    const logout = () => {
        logoutMutation.mutate();
    };

    return {
        logout,
        isPending: logoutMutation.isPending,
    };
} 