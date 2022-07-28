import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @Input() userType!: string | null;
  types = UserType;
}
