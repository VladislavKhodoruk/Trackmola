import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-activity',
  styleUrls: ['./activity.component.scss'],
  templateUrl: './activity.component.html',
})
export class ActivityComponent {
  @Input() userType!: string | null;
  types = UserType;
}
