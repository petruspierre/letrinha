import { useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, themes } from "~/styles/theme";
import GlobalStyles from "~/styles/global";
import { Header, HowToPlay } from "~/components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const toggleInstructions = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <GlobalStyles />
        {showHowToPlay && <HowToPlay dismiss={toggleInstructions} />}
        <Header toggleInstructions={toggleInstructions} />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
