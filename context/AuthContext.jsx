import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        if (!email || !password) {
            alert('Введіть email і пароль');
            return false;
        }

        setUser({ email });
        setIsAuthenticated(true);
        return true;
    };

    const register = (email, password, name) => {
        if (!name || !email || !password) {
            alert('Заповніть усі поля');
            return false;
        }

        setUser({ name, email });
        setIsAuthenticated(true);
        return true;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = useMemo(
        () => ({
            isAuthenticated,
            user,
            login,
            register,
            logout,
        }),
        [isAuthenticated, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};