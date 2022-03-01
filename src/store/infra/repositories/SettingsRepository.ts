import { ISettingsState } from "~/store/domain/settings/types";

const STORAGE_KEY = "@LETRINHA:settings";

const IS_SERVER = typeof window === "undefined";

const getStoragedSettings = () => {
  if (IS_SERVER) return;
  const state = localStorage.getItem(STORAGE_KEY);

  return state ? (JSON.parse(state) as ISettingsState) : null;
};

const setStoragedSettings = (state: ISettingsState) => {
  if (IS_SERVER) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export { getStoragedSettings, setStoragedSettings };
