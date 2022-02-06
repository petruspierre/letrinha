import { AppProps } from "next/app";

import { ThemeProvider, themes } from "~/styles/theme";
import GlobalStyles from "~/styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider themes={themes}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
