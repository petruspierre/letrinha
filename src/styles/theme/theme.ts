import { DefaultTheme } from "styled-components";

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    overlay: string;
    white: string;
    green: string;
    yellow: string;
    red: string;
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
  barbie: {
    colors: {
      primary: "#9D4972",
      secondary: "#D27BBA",
    },
    name: "Barbie",
  },
  grass: {
    colors: {
      primary: "#2F4A22",
      secondary: "#5A7638",
    },
    name: "Mato",
  },
  tomatoes: {
    colors: {
      primary: "#732929",
      secondary: "#AF4848",
    },
    name: "Tomate",
  },
  concrete: {
    colors: {
      primary: "#3A3A40",
      secondary: "#697780",
    },
    name: "Concreto",
  },
  default: {
    colors: {
      primary: "#423E4F",
      secondary: "#59657D",
    },
    name: "Padrão",
  },
};

const defaultTheme: DefaultTheme = {
  colors: {
    background: "#2F2D2E",
    text: "#F5F9E9",
    white: "#fff",
    overlay: "rgba(0, 0, 0, 0.3)",
    green: "#27B15E",
    yellow: "#F4AD23",
    red: "#DF2547",
    ...themes.default.colors,
  },
  font: {
    primary: '"Source Sans 3"',
    secondary: "Roboto Condensed",
  },
  breakpoints: {
    sm: 768,
    md: 1024,
    lg: 1400,
  },
};

export { themes, defaultTheme };
