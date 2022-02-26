import { Duration } from "date-fns";

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

export interface IGuess extends Array<ILetter> {}

export interface IStatistics {
  totalGuesses: number;
  totalTimeSpent: Duration;
  totalCorrect: number;
  accuracy: number;
  correctWord: string;
}

export interface IGameState {
  attempts: number;
  isGameOver: boolean;
  guesses: IGuess[];
  wordLength: number;
  keyBoardState: Record<string, IKeyboardLetter>;
  gameStart: Date;
  gameExpires: Date;
  statistics?: IStatistics;
  win?: boolean;
  word: string;
}

export interface IStoragedGameState extends Omit<IGameState, "word"> {
  word: { iv: string; content: string };
}
