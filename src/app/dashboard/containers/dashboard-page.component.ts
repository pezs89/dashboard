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
import { Environments } from '../reducers/dashboard.reducer';
import * as fromDashboard from '../reducers/index';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  environment$: Observable<Environments>;
  private destroy$ = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    timer(0, 10 * 60 * 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.environment$ = this.store.pipe(
          select(fromDashboard.selectSelectedEnvirontmentSate)
        );
        this.environment$.subscribe(environment => {
          this.store.dispatch(
            DashboardActions.getNewServerStatuses({ environment })
          );
        });
      });
  }

  setEnvironment(env: string) {
    const newEnv = env as Environments;
    this.store.dispatch(DashboardActions.setNewEnvironment({ env: newEnv }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
