import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Alert } from "~/components";

interface Alert {
  title?: string;
  message: string;
  onCloseCallback?: () => void;
}

export interface AlertsContextProps {
  alert: Alert;
  newAlert: (alert: Alert) => void;
  dismissAlert: () => void;
}

const AlertsContext = createContext({} as AlertsContextProps);

const AlertsProvider = ({ children }) => {
  const [alert, setAlert] = useState<Alert>(null);

  function newAlert(alertProps: Alert) {
    setAlert(alertProps);
  }

  const dismissAlert = useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dismissAlert();
    }, 2000);
  }, [alert, dismissAlert]);

  return (
    <AlertsContext.Provider value={{ alert, newAlert, dismissAlert }}>
      {alert && <Alert alert={alert} dismissAlert={dismissAlert} />}
      {children}
    </AlertsContext.Provider>
  );
};

const useAlerts = () => {
  const context = useContext(AlertsContext);

  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider.");
  }

  return context;
};

export { AlertsProvider, useAlerts, AlertsContext };
