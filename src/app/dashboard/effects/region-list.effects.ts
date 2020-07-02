import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { DashboardActions, RegionListActions } from '../actions';

@Injectable()
export class RegionListEffects {
  loadServerStatuses$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.getServerStatusesSuccess),
      map(action => ({ env: action.env, regions: action.regions })),
      concatMap(({ env, regions }) =>
        of(
          RegionListActions.loadRegionListStatus({
            regionStatuses: regions,
            env,
          })
        )
      )
    )
  );

  constructor(private action$: Actions) {}
}
