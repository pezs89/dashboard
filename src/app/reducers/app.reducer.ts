import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
