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
    action?: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
};

export type UserStackParamsList = {
    User: undefined;
    History: undefined;
    Settings: undefined;
};

export type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export type SupportDialogProps = {
    visible: boolean;
    hideDialog: () => void;
    token: string | null;
};

export type LoadingProps = {
    isLoading: boolean;
};