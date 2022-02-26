import { Reducer } from "redux";
import { IStatisticsState } from "./types";

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
    },
  },
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
