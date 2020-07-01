import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, timer, Subject } from 'rxjs';

import { AppState } from 'src/app/reducers/app.reducer';
import { DashboardActions } from '../actions';
import { Environments, Region } from '../reducers/dashboard.reducer';
import * as fromDashboard from '../reducers/index';
import { transformDashboardData } from '../utils/dashboard-data-transform-helper';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  regions$: Observable<Region[]>;
  private destroy$ = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    timer(0, 10 * 60 * 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.regions$ = this.store.pipe(
          select(fromDashboard.selectDashboardRegionsState)
        );
        this.regions$.subscribe(regions => {
          console.log(regions);
          const regionMarkets = regions.map(region => region.markets);
          const regionUrls = transformDashboardData(regionMarkets);
          const wsUrlProd = regions.map(region => region.webserviceUrls.prod);
          const wsUrlQaf = regions.map(region => region.webserviceUrls.qaf);
          this.store.dispatch(
            DashboardActions.getServerStatusesRequest({
              regions,
              regionUrls: regionUrls.prod,
              wsUrls: wsUrlProd,
              env: Environments.PROD,
            })
          );
          this.store.dispatch(
            DashboardActions.getServerStatusesRequest({
              regions,
              regionUrls: regionUrls.qaf,
              wsUrls: wsUrlQaf,
              env: Environments.QAF,
            })
          );
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
