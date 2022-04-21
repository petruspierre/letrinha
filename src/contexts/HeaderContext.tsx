import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import useStatistics from "~/store/modules/statistics";
import { Donate, Header, HowToPlay, Settings } from "~/components";

interface IHeaderConfig {
  showHowToPlay: boolean;
  showSettings: boolean;
  showDonate: boolean;
  showLogo: boolean;
}

const HeaderContext = createContext({});

const INITIAL_STATE: IHeaderConfig = {
  showDonate: false,
  showHowToPlay: false,
  showSettings: false,
  showLogo: true,
};

const HeaderProvider = ({ children }) => {
  const [headerConfig, setHeaderConfig] =
    useState<IHeaderConfig>(INITIAL_STATE);
  const { showDonate, showHowToPlay, showLogo, showSettings } = headerConfig;

  const router = useRouter();

  const { statistics } = useStatistics();

  const toggleModal = (modal: "HowToPlay" | "Settings" | "Donate") => {
    const newConfig = { ...headerConfig };
    newConfig[`show${modal}`] = !headerConfig[`show${modal}`];

    setHeaderConfig(newConfig);
  };

  const handleRoute = useCallback(() => {
    const newConfig: IHeaderConfig = { ...INITIAL_STATE };

    switch (router.asPath) {
      case "/": {
        newConfig.showLogo = false;
      }
      case "/game": {
        if (statistics.history.totalGames === 0) {
          newConfig.showHowToPlay = true;
        }
        break;
      }
    }

    setHeaderConfig(newConfig);
  }, [router.asPath, statistics]);

  useEffect(() => {
    handleRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <HeaderContext.Provider value="HeaderContext">
      <Header toggleModal={toggleModal} showLogo={showLogo} />
      {showHowToPlay && <HowToPlay dismiss={() => toggleModal("HowToPlay")} />}
      {showSettings && <Settings dismiss={() => toggleModal("Settings")} />}
      {showDonate && <Donate dismiss={() => toggleModal("Donate")} />}
      {children}
    </HeaderContext.Provider>
  );
};

const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("HeaderContext must be used within a HeaderProvider");
  }

  return context;
};

export { HeaderProvider, useHeader };
