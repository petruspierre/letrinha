import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setStoragedSettings } from "~/store/infra/repositories/SettingsRepository";

import { settingsSelector } from "../../selectors";
import { updateSettings } from "./actions";
import { ISettingsState } from "./types";

const useSettings = () => {
  const settings = useSelector(settingsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (settings) {
      setStoragedSettings(settings);
    }
  }, [settings]);

  return {
    settings,
    updateSettings: (settings: Partial<ISettingsState>) =>
      dispatch(updateSettings(settings)),
  };
};

export default useSettings;
