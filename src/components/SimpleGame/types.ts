interface ILetter {
  letter: string;
  exists: boolean;
  correctPlace: boolean;
}

interface IKeyboardLetter extends ILetter {
  used: boolean;
}

export interface IGuess extends Array<ILetter> {}

export interface IGameState {
  attempts: number;
  isGameOver: boolean;
  guesses: IGuess[];
  wordLength: number;
  keyBoardState: Record<string, IKeyboardLetter>;
}

export enum ActionTypes {
  NewGuess = "NEW_GUESS",
  AppendLetter = "APPEND_GUESS",
  PopLetter = "POP_LETTER",
  UpdateGame = "UPDATE_GAME",
  UpdateGuesses = "UPDATE_GUESSES",
  UpdateKeyboard = "UPDATE_KEYBOARD",
}

type AppendLetterAction = {
  type: ActionTypes.AppendLetter;
  payload: {
    guessId: number;
    letter: string;
  };
};

type PopLetterAction = {
  type: ActionTypes.PopLetter;
  payload: {
    guessId: number;
  };
};

type UpdateGameAction = {
  type: ActionTypes.UpdateGame;
  payload: Partial<IGameState>;
};

type UpdateGuessesAction = {
  type: ActionTypes.UpdateGuesses;
  payload: {
    guessId: number;
    guesses: IGuess;
  };
};

export type GameActions =
  | {
      type: ActionTypes.NewGuess | ActionTypes.UpdateKeyboard;
    }
  | AppendLetterAction
  | PopLetterAction
  | UpdateGameAction
  | UpdateGuessesAction;
