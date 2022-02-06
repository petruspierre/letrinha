import {
  useContext,
  createContext,
  useState,
  useEffect,
  FC,
  useCallback,
} from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import lodash from "lodash";

import { ThemeSelection } from "~/components";

import { Theme, ColorTheme, defaultTheme } from "./theme";

export interface ThemeContextProps {
  changeTheme: (newTheme: string) => void;
  colorTheme: string;
  showThemeSelection: () => void;
  themes: Record<string, ColorTheme>;
  theme: Theme;
}

interface ThemeProviderProps {
  themes: Record<string, ColorTheme>;
}

const LOCAL_STORAGE_KEY = "@LETRINHA/theme";
const DEFAULT_THEME = "default";

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const ThemeProvider: FC<ThemeProviderProps> = ({ children, themes }) => {
  const [colorTheme, setColorTheme] = useState(DEFAULT_THEME);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [showSelection, setShowSelection] = useState(false);

  const changeTheme = useCallback(
    (newTheme: string) => {
      setColorTheme(newTheme);
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    },
    [setColorTheme]
  );

  const getStoragedTheme = useCallback(() => {
    const storagedTheme =
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? DEFAULT_THEME;

    setColorTheme(storagedTheme);
  }, []);

  const getNewTheme = useCallback(() => {
    const newTheme = lodash.merge({}, defaultTheme, themes[colorTheme]);

    setTheme(newTheme);
  }, [colorTheme, themes]);

  const showThemeSelection = () => {
    setShowSelection(true);
  };

  const dismissThemeSelection = () => {
    setShowSelection(false);
  };

  useEffect(() => {
    getNewTheme();
  }, [colorTheme, getNewTheme]);

  useEffect(() => {
    getStoragedTheme();
  }, [getStoragedTheme]);

  return (
    <ThemeContext.Provider
      value={{ changeTheme, colorTheme, showThemeSelection, themes, theme }}
    >
      <StyledProvider theme={theme}>
        {showSelection && <ThemeSelection dismiss={dismissThemeSelection} />}
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider.");
  }

  return context;
};

export { ThemeContext, ThemeProvider, useTheme };
