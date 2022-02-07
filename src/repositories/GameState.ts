import { IGameState } from "~/model/SimpleGame";

const STORAGE_KEY = "@LETRINHA:gameState";

const IS_SERVER = typeof window === "undefined";

const getStoragedGameState = () => {
  if (IS_SERVER) return;
  const state = localStorage.getItem(STORAGE_KEY);

  return state ? (JSON.parse(state) as IGameState) : null;
};

const setStoragedGameState = (state: IGameState) => {
  if (IS_SERVER) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export { getStoragedGameState, setStoragedGameState };
