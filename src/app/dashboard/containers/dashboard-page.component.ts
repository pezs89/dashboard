import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/reducers/app.reducer';
import { DashboardActions } from '../actions';
import { Observable } from 'rxjs';
import { Region } from '../reducers/dashboard.reducer';
import * as fromDashboard from '../reducers/index';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  private regions$: Observable<Region[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.regions$ = this.store.pipe(
      select(fromDashboard.selectDashboardRegionsState)
    );
    this.regions$.subscribe((regions) => {
      const regionMarkets = regions.map((region) => region.markets);
      const regionUrls = regionMarkets
        .map((markets) => Object.values(markets))
        .reduce((acc, curr) => {
          curr.forEach((url) => {
            acc.push(url);
          });
          return acc;
        }, []);
      const wsUrls = regions.map((region) => region.webserviceUrl);
      this.store.dispatch(
        DashboardActions.getServerStatusesRequest({
          regions,
          regionUrls,
          wsUrls,
        })
      );
    });
  }
}
