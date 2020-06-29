import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { concatMap, map, switchMap } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DashboardActions } from '../actions';
import { ServerCheckService } from 'src/app/core/services/server-check.service';
import { serverStatusResponseTransformHelper } from '../utils/server-status-response-transform-helper';

@Injectable()
export class DashboardEffects {
  getServerStatuses$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.getServerStatusesRequest),
      switchMap((action) =>
        this.serverCheckService.getServerStatuses(action.regionUrls).pipe(
          map((marketServerResponse: HttpResponseBase[]) => ({
            wsUrls: action.wsUrls,
            marketServerResponse,
            regions: action.regions,
          }))
        )
      ),
      switchMap(({ wsUrls, marketServerResponse, regions }) =>
        this.serverCheckService.getServerStatuses(wsUrls).pipe(
          map((wsServerResponse: HttpResponseBase[]) => {
            const transformedResponse = serverStatusResponseTransformHelper(
              regions,
              marketServerResponse,
              wsServerResponse
            );
            return DashboardActions.getServerStatusesSuccess({
              regions: transformedResponse,
            });
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private serverCheckService: ServerCheckService
  ) {}
}
