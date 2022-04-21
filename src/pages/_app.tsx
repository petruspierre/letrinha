import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, themes } from "~/styles/theme";
import GlobalStyles from "~/styles/global";
import { Header, HowToPlay } from "~/components";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.min.css";

import * as gtag from "~/services/gtag";
import { storeWrapper } from "~/store";
import Analytics from "~/components/Analytics";
import { HeaderProvider } from "~/contexts/HeaderContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <HeaderProvider>
          <GlobalStyles />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            className="toast"
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
          <Analytics />
        </HeaderProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default storeWrapper.withRedux(MyApp);
