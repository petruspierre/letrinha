import { ISettings } from "~/model/Settings";

const STORAGE_KEY = "@LETRINHA:settings";

const IS_SERVER = typeof window === "undefined";

const getStoragedSettings = () => {
  if (IS_SERVER) return;
  const state = localStorage.getItem(STORAGE_KEY);

  return state ? (JSON.parse(state) as ISettings) : null;
};

const setStoragedSettings = (state: ISettings) => {
  if (IS_SERVER) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export { getStoragedSettings, setStoragedSettings };
