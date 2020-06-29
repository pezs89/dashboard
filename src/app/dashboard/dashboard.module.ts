import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page.component';
import { RegionListComponent } from './containers/region-list/region-list.component';
import { RegionCardComponent } from './components/region-card/region-card.component';
import { MarketServerStatusComponent } from './components/market-server-status/market-server-status.component';

import * as fromDashboard from './reducers/index';
import { DashboardEffects } from './effects/dashboard.effects';
import { RegionListEffects } from './effects/region-list.effects';

const CONTAINERS = [DashboardPageComponent, RegionListComponent];
const COMPONENTS = [RegionCardComponent, MarketServerStatusComponent];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FontAwesomeModule,
    StoreModule.forFeature(
      fromDashboard.dashboardModuleFeatureKey,
      fromDashboard.reducers
    ),
    EffectsModule.forFeature([DashboardEffects, RegionListEffects]),
  ],
  exports: [],
  declarations: [CONTAINERS, COMPONENTS],
  providers: [],
})
export class DashboardModule {}
