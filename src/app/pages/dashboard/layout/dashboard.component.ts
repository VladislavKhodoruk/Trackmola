import { Component, Input } from '@angular/core';
import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() userType!: string | null;
  types = UserType;
}
