import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DashboardActions } from '../actions';
import { ServerCheckService } from 'src/app/core/services/server-check.service';
import { serverStatusResponseTransformHelper } from '../utils/server-status-response-transform-helper';
import { transformDashboardData } from '../utils/dashboard-data-transform-helper';
import { AppState } from 'src/app/reducers/app.reducer';
import * as fromDashboard from '../reducers';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class DashboardEffects {
  getNewServerStatuses$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.getNewServerStatuses),
      withLatestFrom(
        this.store.pipe(select(fromDashboard.selectDashboardRegionsState))
      ),
      switchMap(([action, regions]) => {
        const { environment } = action;
        const regionMarkets = regions.map(region => region.markets);
        const regionUrls = transformDashboardData(regionMarkets);
        const wsUrls = regions.map(
          region => region.webserviceUrls[action.environment]
        );
        return of(
          DashboardActions.getServerStatusesRequest({
            regions,
            regionUrls,
            wsUrls,
            selectedEnv: environment,
          })
        );
      })
    )
  );

  getServerStatuses$ = createEffect(() =>
    this.action$.pipe(
      ofType(DashboardActions.getServerStatusesRequest),
      tap(() => {
        this.ngxLoader.start();
      }),
      switchMap(action => {
        return this.serverCheckService
          .getServerStatuses(action.regionUrls[action.selectedEnv])
          .pipe(
            map((marketServerResponse: HttpResponseBase[]) => ({
              wsUrls: action.wsUrls,
              marketServerResponse,
              regions: action.regions,
              env: action.selectedEnv,
            }))
          );
      }),
      switchMap(({ wsUrls, marketServerResponse, regions, env }) =>
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
    private serverCheckService: ServerCheckService,
    private store: Store<AppState>
  ) {}
}
