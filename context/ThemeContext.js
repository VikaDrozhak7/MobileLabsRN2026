import React, { createContext, useContext, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../theme/colors";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark((prev) => !prev);

    const value = useMemo(() => {
        return {
            isDark,
            toggleTheme,
            theme: isDark ? darkTheme : lightTheme
        };
    }, [isDark]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => useContext(ThemeContext);