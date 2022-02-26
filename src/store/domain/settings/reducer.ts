import { Reducer } from "redux";

import { ISettingsState } from "./types";
import { getStoragedSettings } from "~/store/infra/repositories/SettingsRepository";

const loadedSettings = getStoragedSettings();

const INITIAL_STATE: ISettingsState = {
  keyboardHidden: false,
  volume: {
    soundEffects: 0.2,
  },
  ...loadedSettings,
};

const settingsReducer: Reducer<ISettingsState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "UPDATE_SETTINGS": {
      return {
        ...state,
        ...action.payload.settings,
      };
    }
    default: {
      return state;
    }
  }
};

export default settingsReducer;
