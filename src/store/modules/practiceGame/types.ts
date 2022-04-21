export type DailyWord = Record<
  string,
  {
    word: string;
  }
>;

interface ILetter {
  letter: string;
  exists: boolean;
  correctPlace: boolean;
}

interface IKeyboardLetter extends ILetter {
  used: boolean;
}

export interface IPracticeGuess extends Array<ILetter> {}

export interface IPracticeGameState {
  attempts: number;
  isGameOver: boolean;
  guesses: IPracticeGuess[];
  wordLength: number;
  keyboard: Record<string, IKeyboardLetter>;
  win?: boolean;
  word: string;
  selectedLetterIndex: number;
  selectedGuessIndex: number;
}

export interface IStoragedGameState extends Omit<IPracticeGameState, "word"> {
  word: { iv: string; content: string };
}
