import { FC } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { ThemeProvider } from "~/styles/theme";

import { themes } from "@test/fixtures/theme";

const AllTheProviders: FC = ({ children }) => (
  <ThemeProvider themes={themes}>{children}</ThemeProvider>
);

const customRender = (hook, options) =>
  renderHook(hook, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as renderHook };
