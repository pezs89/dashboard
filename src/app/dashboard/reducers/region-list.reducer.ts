import { createReducer, on } from '@ngrx/store';
import { RegionListActions } from '../actions';

export const regionListFeatureKey = 'regionList';

export interface ServerStatus {
  url?: string;
  lastUpdated?: string;
  serverResponseCode?: number;
  serverStatus?: string;
  responseType?: number;
}

export interface RegionStatus {
  regionCode: string;
  wsStatus?: ServerStatus;
  status: {
    [key: string]: ServerStatus;
  };
}

export interface RegionStatusesState {
  regionStatuses: RegionStatus[];
}

export const initialState: RegionStatusesState = {
  regionStatuses: [
    {
      regionCode: 'RU',
      wsStatus: {},
      status: {
        ru: {},
      },
    },
    {
      regionCode: 'WEMEA',
      wsStatus: {},
      status: {
        es: {},
        it: {},
        jt: {},
        tr: {},
        uk: {},
        za: {},
      },
    },
    {
      regionCode: 'CEE',
      wsStatus: {},
      status: {
        bg: {},
        cz: {},
        de: {},
        hu: {},
        pl: {},
        ro: {},
        rs: {},
        sk: {},
        ua: {},
      },
    },
    {
      regionCode: 'LATAM',
      wsStatus: {},
      status: {
        ar: {},
        co: {},
        ec: {},
        pe: {},
      },
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(RegionListActions.loadRegionListStatus, (state, action) => ({
    ...state,
    regionStatuses: action.regionStatuses,
  }))
);
