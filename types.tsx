import { ReactNode } from "react";

export type AccountStackParamsList = {
    Home: undefined,
    Login: undefined,
    Register: undefined
};

export type SnackbarProps = {
    visible: boolean;
    closeSnackbar: () => void;
    snackbarContent: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
};

export type AuthContextType = {
    user: User | null;
    authenticated: boolean;
};

export type AuthProviderProps = {
    children: ReactNode;
};