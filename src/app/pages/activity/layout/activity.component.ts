import { Component, Input } from '@angular/core';
import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @Input() userType!: string | null;
  types = UserType;
}
