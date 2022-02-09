import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "~/styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { themes } from "@test/fixtures/theme";

const queryClient = new QueryClient();

const AllTheProviders: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider themes={themes}>
      <ToastContainer />
      {children}
    </ThemeProvider>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
