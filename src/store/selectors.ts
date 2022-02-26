import { IState } from ".";

export const settingsSelector = (state: IState) => state.settings;

export const statisticsSelector = (state: IState) => state.statistics;
