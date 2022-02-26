import { Reducer } from "redux";
import { ISettingsState } from "./types";

const INITIAL_STATE: ISettingsState = {
  keyboardHidden: false,
  volume: {
    soundEffects: 0.2,
  },
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
