import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RegionStatus } from '../../reducers/region-list.reducer';

@Component({
  selector: 'app-region-card',
  templateUrl: 'region-card.component.html',
  styleUrls: ['./region-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionCardComponent {
  @Input() region: RegionStatus;
  term: string;
}
