import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "~/styles/theme";
import { themes } from "@test/fixtures/theme";
import { store } from "~/store";

const queryClient = new QueryClient();

const AllTheProviders: FC = ({ children }) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <ToastContainer />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
