import { useSelector, useDispatch } from "react-redux";

import { settingsSelector } from "../../selectors";
import { updateSettings } from "./actions";
import { ISettingsState } from "./types";

const useSettings = () => {
  const settings = useSelector(settingsSelector);
  const dispatch = useDispatch();

  return {
    settings,
    updateSettings: (settings: Partial<ISettingsState>) =>
      dispatch(updateSettings(settings)),
  };
};

export default useSettings;
