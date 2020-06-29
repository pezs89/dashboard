import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/reducers/app.reducer';
import * as fromDashboard from '../../reducers/index';
import { RegionStatus } from '../../reducers/region-list.reducer';
import { fadeIn } from 'src/app/shared/animations/fade-in';

@Component({
  selector: 'app-region-list',
  templateUrl: 'region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class RegionListComponent implements OnInit {
  regions$: Observable<RegionStatus[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.regions$ = this.store.pipe(
      select(fromDashboard.selectRegionListState)
    );
    this.loading$ = this.store.pipe(
      select(fromDashboard.selectDashboardIsLoading)
    );
  }
}
