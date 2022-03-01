import { ISettingsState } from "./types";

export function updateSettings(settings: Partial<ISettingsState>) {
  return {
    type: "UPDATE_SETTINGS",
    payload: {
      settings,
    },
  };
}
