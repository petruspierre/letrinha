import { Reducer } from "redux";
import { getStoragedStatistics } from "~/store/infra/repositories/StatisticsRepository";
import { IStatisticsState } from "./types";

const loadedStatistics = getStoragedStatistics();

const INITIAL_STATE: IStatisticsState = {
  history: {
    currentStreak: 0,
    longestStreak: 0,
    totalGames: 0,
    totalVictories: 0,
    numberOfTries: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
    },
    lastWord: "",
    totalTimeSpent: 0,
    averageAccuracy: 0,
    totalGuesses: 0,
    totalCorrect: 0,
    totalLetters: 0,
  },
  ...loadedStatistics,
};

const statisticsReducer: Reducer<IStatisticsState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "UPDATE_HISTORY_STATISTICS": {
      return {
        ...state,
        history: action.payload.history,
      };
    }
    case "UPDATE_CURRENT_STATISTICS": {
      return {
        ...state,
        current: action.payload.current,
      };
    }
    default: {
      return state;
    }
  }
};

export default statisticsReducer;
