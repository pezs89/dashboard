import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('in', style({ opacity: 0 })),
  transition(':leave', [
    style({ opacity: 1 }),
    group([animate('100ms ease-in-out', style({ opacity: '0' }))]),
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    group([animate('200ms ease-in-out', style({ opacity: '1' }))]),
  ]),
]);
