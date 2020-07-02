import { createAction, props } from '@ngrx/store';
import { RegionStatus } from '../reducers/region-list.reducer';
import { Environments } from '../reducers/dashboard.reducer';

export const loadRegionListStatus = createAction(
  '[Dashboard Effects] Server Status GET Succesfully',
  props<{ regionStatuses: RegionStatus[]; env: Environments }>()
);
