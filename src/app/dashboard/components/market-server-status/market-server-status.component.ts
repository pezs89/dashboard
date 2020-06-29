import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

import { ServerStatus } from '../../reducers/region-list.reducer';

@Component({
  selector: 'app-market-server-status',
  templateUrl: 'market-server-status.component.html',
  styleUrls: ['./market-server-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketServerStatusComponent {
  @Input() marketStatus: ServerStatus;
  @Input() label: string;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  openLink(): void {
    window.open(this.marketStatus.url);
  }
}
