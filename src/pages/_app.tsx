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
import Settings from "~/components/Settings";
import Donate from "~/components/Donate";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
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

  const toggleInstructions = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleDonate = () => {
    setShowDonate(!showDonate);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <GlobalStyles />
        {showHowToPlay && <HowToPlay dismiss={toggleInstructions} />}
        {showSettings && <Settings dismiss={toggleSettings} />}
        {showDonate && <Donate dismiss={toggleDonate} />}
        <Header
          toggleInstructions={toggleInstructions}
          toggleSettings={toggleSettings}
          toggleDonate={toggleDonate}
        />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default storeWrapper.withRedux(MyApp);
