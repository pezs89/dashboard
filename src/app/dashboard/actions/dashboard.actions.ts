import { createAction, props } from '@ngrx/store';
import { Region, Environments } from '../reducers/dashboard.reducer';
import { RegionStatus } from '../reducers/region-list.reducer';

export const getServerStatusesRequest = createAction(
  '[Dashboard Page] Get Region Statuses Request',
  props<{
    regions: Region[];
    regionUrls: string[];
    wsUrls: string[];
    env: Environments;
  }>()
);

export const getServerStatusesSuccess = createAction(
  '[Dashboard Page] Get Region Statuses Success',
  props<{ regions: RegionStatus[]; env: Environments }>()
);
