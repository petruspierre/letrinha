import { IStatisticsState } from "~/store/domain/statistics/types";

const STORAGE_KEY = "@LETRINHA:statistics";

const IS_SERVER = typeof window === "undefined";

const getStoragedStatistics = () => {
  if (IS_SERVER) return;
  const state = localStorage.getItem(STORAGE_KEY);

  return state ? (JSON.parse(state) as IStatisticsState) : null;
};

const setStoragedStatistics = (state: IStatisticsState) => {
  if (IS_SERVER) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export { getStoragedStatistics, setStoragedStatistics };
