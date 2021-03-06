import { DefaultTheme } from "styled-components";

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    overlay: string;
    white: string;
  };
  font: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
  };
};

export type ColorTheme = {
  colors: {
    primary: string;
    secondary: string;
  };
  name: string;
};

const themes: Record<string, ColorTheme> = {
  light: {
    colors: {
      primary: "#fff",
      secondary: "#ccc",
    },
    name: "Light",
  },
  dark: {
    colors: {
      primary: "#555",
      secondary: "#777",
    },
    name: "Dark",
  },
  default: {
    colors: {
      primary: "#F46036",
      secondary: "#18A999",
    },
    name: "Default",
  },
};

const defaultTheme: DefaultTheme = {
  colors: {
    background: "#2F2D2E",
    text: "#2F2D2E",
    white: "#fff",
    overlay: "rgba(0, 0, 0, 0.5)",
    green: "#27B15E",
    yellow: "#F4AD23",
    red: "#DF2547",
    ...themes.default.colors,
  },
  font: {
    primary: "Rowdies",
    secondary: "Roboto Condensed",
  },
  breakpoints: {
    sm: 768,
    md: 1024,
    lg: 1400,
  },
};

export { themes, defaultTheme };
