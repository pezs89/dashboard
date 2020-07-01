import { createAction, props } from '@ngrx/store';
import { Region, Environments } from '../reducers/dashboard.reducer';
import { RegionStatus } from '../reducers/region-list.reducer';

export const getServerStatusesRequest = createAction(
  '[Dashboard Page] Get Region Statuses Request',
  props<{
    regions: Region[];
    regionUrls: { [key: string]: string[] };
    wsUrls: string[];
    selectedEnv: Environments;
  }>()
);

export const getNewServerStatuses = createAction(
  '[Dashboard Page] Get New Server Statuses',
  props<{
    environment: Environments;
  }>()
);

export const setNewEnvironment = createAction(
  '[Dashboard Page] Set New Environment',
  props<{
    env: Environments;
  }>()
);

export const getServerStatusesSuccess = createAction(
  '[Dashboard Page] Get Region Statuses Success',
  props<{ regions: RegionStatus[] }>()
);
