import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { map, tap, mergeMap } from 'rxjs/operators';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DashboardActions } from '../actions';
import { ServerCheckService } from 'src/app/core/services/server-check.service';
import { serverStatusResponseTransformHelper } from '../utils/server-status-response-transform-helper';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class DashboardEffects {
  getServerStatuses$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.getServerStatusesRequest),
      tap(() => {
        this.ngxLoader.start();
      }),
      mergeMap(action => {
        return this.serverCheckService
          .getServerStatuses(action.regionUrls)
          .pipe(
            map((marketServerResponse: HttpResponseBase[]) => ({
              wsUrls: action.wsUrls,
              marketServerResponse,
              regions: action.regions,
              env: action.env,
            }))
          );
      }),
      mergeMap(({ wsUrls, marketServerResponse, regions, env }) =>
        this.serverCheckService.getServerStatuses(wsUrls).pipe(
          map((wsServerResponse: HttpResponseBase[]) => {
            const transformedResponse = serverStatusResponseTransformHelper(
              regions,
              marketServerResponse,
              wsServerResponse,
              env
            );
            return DashboardActions.getServerStatusesSuccess({
              regions: transformedResponse,
              env,
            });
          })
        )
      )
    )
  );

  hideLoader$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(DashboardActions.getServerStatusesSuccess),
        tap(() => {
          this.ngxLoader.stop();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private action$: Actions,
    private serverCheckService: ServerCheckService
  ) {}
}
