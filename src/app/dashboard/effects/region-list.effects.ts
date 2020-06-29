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
      map((action) => action.regions),
      concatMap((regionStatuses) =>
        of(RegionListActions.loadRegionListStatus({ regionStatuses }))
      )
    )
  );

  constructor(private action$: Actions) {}
}
