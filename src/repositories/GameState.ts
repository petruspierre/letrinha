import { IStoragedGameState, IGameState } from "~/model/SimpleGame";
import { decrypt, encrypt } from "~/utils/crypt";

const STORAGE_KEY = "@LETRINHA:gameState";

const IS_SERVER = typeof window === "undefined";

const getStoragedGameState = () => {
  if (IS_SERVER) return;
  const state = localStorage.getItem(STORAGE_KEY);

  if (!state) return null;

  const parsedState = JSON.parse(state);

  if (typeof parsedState.word === "string") return parsedState;

  return { ...parsedState, word: decrypt(parsedState.word) };
};

const setStoragedGameState = (state: IGameState) => {
  if (IS_SERVER) return;

  const savedState = {
    ...state,
    word: encrypt(state.word),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
};

export { getStoragedGameState, setStoragedGameState };
