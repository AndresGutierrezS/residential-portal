import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { logoutAction } from "../actions/logout.action";
import { checkAuthAction } from "../actions/checkAuth.action";
import type { RegisterDto } from "../interfaces/register.dto";
import { registerAction } from "../actions/register.action";


type AuthStatus = 
    'authenticated' |
    'not-authenticated' |
    'checking';

interface AuthState {
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    register: (payload: RegisterDto) => Promise<boolean>;
    checkAuthStatus: () => Promise<boolean>;
    isAdmin: () => boolean;
}


export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    
    login: async (email, password) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            
            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated',
            })
            return true;
        } catch (error) {
            return false;
        }
    },
    logout: async () => {
        //await logoutAction();
        localStorage.removeItem('token');
        set({
            user: null,
            token: null,
            authStatus: 'not-authenticated'
        });
    },
    register: async (payload: RegisterDto) => {
        try {
            await registerAction(payload);
            return true;
        } catch (error) {
            return false;      
        }
    },
    checkAuthStatus: async () => {
        try {
            const data = await checkAuthAction();
            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated',
            })
            return true;
        } catch (error) {
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            })
            return false;
        }
    },
    isAdmin: () => {
        const user = get().user;
        if(!user) return false;
        const role = user?.is_admin;
        return role;
    }
}));