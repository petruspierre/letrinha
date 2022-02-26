import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

import settingsReducer from "./domain/settings/reducer";
import { ISettingsState } from "./domain/settings/types";
import statisticsReducer from "./domain/statistics/reducer";
import { IStatisticsState } from "./domain/statistics/types";

export interface IState {
  settings: ISettingsState;
  statistics: IStatisticsState;
}

const middleware = [logger];

const rootReducer = combineReducers({
  settings: settingsReducer,
  statistics: statisticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export const configureStore = () => store;

export const storeWrapper = createWrapper<Store<IState>>(configureStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
