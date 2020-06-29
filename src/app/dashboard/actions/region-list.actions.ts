import { createAction, props } from '@ngrx/store';
import { RegionStatus } from '../reducers/region-list.reducer';

export const loadRegionListStatus = createAction(
  '[Dashboard Effects] Server Status GET Succesfully',
  props<{ regionStatuses: RegionStatus[] }>()
);
