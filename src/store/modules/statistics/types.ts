import { Duration } from "date-fns";

export interface IHistory {
  currentStreak: number;
  longestStreak: number;
  totalGames: number;
  totalVictories: number;
  numberOfTries: {
    [key: string]: number;
  };
  lastWord: string;
  totalTimeSpent: number;
  averageAccuracy: number;
  totalGuesses: number;
  totalCorrect: number;
  totalLetters: number;
}

export interface ICurrent {
  totalGuesses: number;
  totalTimeSpent: Duration;
  totalCorrect: number;
  accuracy: number;
  correctWord: string;
}

export interface IStatisticsState {
  current?: ICurrent;
  history: IHistory;
}
