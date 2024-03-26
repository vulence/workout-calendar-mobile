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
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};