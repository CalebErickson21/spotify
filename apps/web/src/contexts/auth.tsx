// Import dependencies
import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/utils/errors";
import type { AuthContextInterface, UserInterface } from "@/utils/types";

// Create context
const AuthContext = createContext<AuthContextInterface | null>(null);

// User response check
const isUser = (value: unknown): value is UserInterface => {
    return (
        typeof value === "object" &&
        value !== null &&
        "username" in value
    );
};


// Auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();

    // Check auth query
    const meQuery = useQuery({
        queryKey: ["auth", "me"],
        queryFn: authApi.checkAuth
    })


    // Registration mutation
    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            if (!isUser(data)) {
                queryClient.setQueryData(['auth', 'me'], null);
                throw new Error("Invalid auth response");
            }
            queryClient.setQueryData(["auth", "me"], data); // Set cache for keys (auth, me) with result of registration request
        },
    });


    // Login mutation 
    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (!isUser(data)) {
                queryClient.setQueryData(['auth', 'me'], null);
                throw new Error("Invalid auth response");
            }
            queryClient.setQueryData(["auth", "me"], data); // Set cache for keys (auth, me) with result of registration request
        },
    });


    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSettled: () => {
            queryClient.setQueryData(["auth", "me"], null); // Clear cache for keys (auth, me)
        },
    });


    // Transform values into type interface for prop passing
    const value: AuthContextInterface = {
        user: isUser(meQuery.data) ? meQuery.data: null, // Default to null if loading or undefined
        isLoading: meQuery.isLoading,

        register: registerMutation.mutateAsync,
        registerError: registerMutation.error ? getApiErrorMessage(registerMutation.error) : null,
        isRegistering: registerMutation.isPending,

        login: loginMutation.mutateAsync,
        loginError: loginMutation.error ? getApiErrorMessage(loginMutation.error) : null,
        isLoggingIn: loginMutation.isPending,

        logout: logoutMutation.mutateAsync,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};


// Export context hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
