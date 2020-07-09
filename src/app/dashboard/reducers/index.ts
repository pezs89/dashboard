import {
  combineReducers,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';
import * as fromRegionList from './region-list.reducer';
import * as fromRoot from '../../reducers/app.reducer';

export const dashboardModuleFeatureKey = 'dashboardModule';

export interface DashboardModuleState {
  [fromDashboard.dashboardFeatureKey]: fromDashboard.DashboardState;
  [fromRegionList.regionListFeatureKey]: fromRegionList.RegionStatusesState;
}

export interface State extends fromRoot.AppState {
  [dashboardModuleFeatureKey]: DashboardModuleState;
}

export function reducers(
  state: DashboardModuleState | undefined,
  action: Action
) {
  return combineReducers({
    [fromDashboard.dashboardFeatureKey]: fromDashboard.reducer,
    [fromRegionList.regionListFeatureKey]: fromRegionList.reducer,
  })(state, action);
}

export const selectDashboardModuleState = createFeatureSelector<
  State,
  DashboardModuleState
>(dashboardModuleFeatureKey);

export const selectDashboardIsLoading = createSelector(
  selectDashboardModuleState,
  state => state[fromDashboard.dashboardFeatureKey].loading
);

export const selectDashboardRegionsState = createSelector(
  selectDashboardModuleState,
  state => state[fromDashboard.dashboardFeatureKey].regions
);

export const selectRegionListProdState = createSelector(
  selectDashboardModuleState,
  state => state[fromRegionList.regionListFeatureKey].prod
);

export const selectRegionListQafState = createSelector(
  selectDashboardModuleState,
  state => state[fromRegionList.regionListFeatureKey].qaf
);

export const selectRegionListDevState = createSelector(
  selectDashboardModuleState,
  state => state[fromRegionList.regionListFeatureKey].dev
);

export const selectRegionListQamState = createSelector(
  selectDashboardModuleState,
  state => state[fromRegionList.regionListFeatureKey].qam
);

