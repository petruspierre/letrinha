import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, themes } from "~/styles/theme";
import GlobalStyles from "~/styles/global";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
