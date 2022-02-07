import { GameActions, ActionTypes } from "./types";
import { IGameState, IGuess } from "~/model/SimpleGame";

export const gameReducer = (state: IGameState, action: GameActions) => {
  switch (action.type) {
    case ActionTypes.NewGuess: {
      return {
        ...state,
        attempts: state.attempts - 1,
        guesses: [...state.guesses, []],
      };
    }
    case ActionTypes.UpdateGame: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionTypes.AppendLetter: {
      const { guessId, letter, letterId } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      const newLetter = {
        letter: letter.toLowerCase(),
        exists: false,
        correctPlace: false,
      };

      const newGuess = [...guess];
      newGuess[letterId] = newLetter;
      newGuesses[guessId] = [...newGuess];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.PopLetter: {
      const { guessId, letterId } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      const newGuess = [...guess] as any[];
      newGuess[letterId] = {};
      newGuesses[guessId] = [...newGuess];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.UpdateGuesses: {
      const { guessId, guesses } = action.payload;
      const guess = state.guesses[guessId];

      if (!guess) throw new Error("guess not found");

      const newGuesses = [...state.guesses];
      newGuesses[guessId] = guesses;

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.UpdateKeyboard: {
      const { guesses, keyBoardState } = state;
      const newKeyboardState = { ...keyBoardState };

      guesses.forEach((guess) => {
        guess.forEach((letterItem) => {
          const { letter } = letterItem;
          const existingLetter = newKeyboardState[letter];

          if (existingLetter) {
            newKeyboardState[letter] = {
              exists: existingLetter.exists || letterItem.exists,
              correctPlace:
                existingLetter.correctPlace || letterItem.correctPlace,
              used: true,
              letter: letterItem.letter,
            };
          } else {
            newKeyboardState[letter] = {
              ...letterItem,
              used: true,
            };
          }
        });
      });

      return {
        ...state,
        keyBoardState: newKeyboardState,
      };
    }
  }
};
