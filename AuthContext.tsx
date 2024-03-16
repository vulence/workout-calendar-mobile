import { createContext, ReactNode, useEffect, useState } from "react";
import Userfront from "@userfront/toolkit";
import { AuthContextType, AuthProviderProps, User } from "./types";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authenticated: false
});

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = () => {
        if (Userfront.tokens.accessToken) {
            setAuthenticated(true);
            setUser({
                id: Userfront.user.userId!.toString(),
                username: Userfront.user.username!,
                email: Userfront.user.email!,
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
}