import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacations-container',
  template: '<app-vacations-component></app-vacations-component>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsContainer {}
