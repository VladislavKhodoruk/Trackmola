import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() readonly dashboardView: UserType;

  @Output() changeViewMode = new EventEmitter<UserType>();

  readonly authTypeUser: UserType = localStorage.getItem(
    'AuthUserType'
  ) as UserType;

  readonly today: Date = new Date();

  readonly userTypes: typeof UserType = UserType;

  protected get viewMode(): UserType {
    return this.dashboardView || null;
  }

  protected get labelsMode(): UserType[] {
    switch (this.authTypeUser) {
      case this.userTypes.Manager:
        return [this.userTypes.Employee, this.userTypes.Manager];
      case this.userTypes.Admin:
        return [
          this.userTypes.Employee,
          this.userTypes.Manager,
          this.userTypes.Admin,
        ];

      case this.userTypes.CTO:
        return [
          this.userTypes.Employee,
          this.userTypes.Manager,
          this.userTypes.CTO,
        ];
    }
  }
}
