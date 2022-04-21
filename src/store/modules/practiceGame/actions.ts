import { IPracticeGuess, IPracticeGameState } from "./types";

export function pushNewGuess() {
  return {
    type: "PRACTICE_GAME_NEW_GUESS",
  };
}

export function appendLetter(payload: {
  guessId: number;
  letter: string;
  letterId: number;
}) {
  return {
    type: "PRACTICE_GAME_APPEND_LETTER",
    payload: {
      ...payload,
    },
  };
}

export function popLetter(payload: { guessId: number; letterId: number }) {
  return {
    type: "PRACTICE_GAME_POP_LETTER",
    payload: {
      ...payload,
    },
  };
}

export function updateGame(payload: Partial<IPracticeGameState>) {
  return {
    type: "PRACTICE_GAME_UPDATE",
    payload: {
      ...payload,
    },
  };
}

export function updateGuesses(payload: {
  guessId: number;
  guesses: IPracticeGuess;
}) {
  return {
    type: "PRACTICE_GAME_UPDATE_GUESSES",
    payload: {
      ...payload,
    },
  };
}

export function updateKeyboard() {
  return {
    type: "PRACTICE_GAME_UPDATE_KEYBOARD",
  };
}

export function changeSelectedIndex(payload: {
  guess?: number;
  letter?: number;
}) {
  return {
    type: "PRACTICE_GAME_CHANGE_SELECTED_INDEX",
    payload: {
      ...payload,
    },
  };
}
