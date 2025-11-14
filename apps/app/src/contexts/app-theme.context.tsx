import { createContext, useCallback, use, useMemo } from "react";

import { Uniwind, useUniwind } from "uniwind";

import { Theme } from "../enums/theme.enum";

interface AppThemeContextType {
  currentTheme: string;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useUniwind();

  const isLight = useMemo(() => {
    return theme === Theme.light || theme.endsWith(`-${Theme.light}`);
  }, [theme]);

  const isDark = useMemo(() => {
    return theme === Theme.dark || theme.endsWith(`-${Theme.dark}`);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    Uniwind.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    switch (theme) {
      case Theme.light:
        Uniwind.setTheme(Theme.dark);
        break;
      case Theme.dark:
        Uniwind.setTheme(Theme.light);
        break;
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      currentTheme: theme,
      isLight,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [theme, isLight, isDark, setTheme, toggleTheme]
  );

  return <AppThemeContext value={value}>{children}</AppThemeContext>;
};

export const useAppTheme = (name = "useAppTheme") => {
  const context = use(AppThemeContext);
  if (!context) {
    throw new Error(`${name} must be used within AppThemeProvider`);
  }
  return context;
};
