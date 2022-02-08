import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, themes } from "~/styles/theme";
import GlobalStyles from "~/styles/global";
import { AlertsProvider } from "~/hooks/useAlert";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <AlertsProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </AlertsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
