// Import deps
import { api } from "@/api/client";
import type { LoginInterface, RegisterInterface } from "@/utils/types";

// Declare api prefix
const apiPrefix = "/auth"


export const register = async (data: RegisterInterface) => {
    const res = await api.post(apiPrefix + '/register', data);
    return res.data;
}


export const login = async (data: LoginInterface) => {
    const res = await api.post(apiPrefix + '/login', data);
    return res.data;
}


export const logout = async () => {
    const res = await api.post(apiPrefix + '/logout');
    return res.data;
}


export const checkAuth = async () => {
    const res = await api.get(apiPrefix + '/me');
    return res.data;
}


// Token refresh
// TODO