import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import angleLeftB from '@iconify/icons-uil/angle-left-b';
import { Observable } from 'rxjs';

import {
  DEFAULT_PHOTO_URL,
  ONE_MONTH_IN_SECONDS,
  ROLES,
} from '@shared/constants/constants';
import { SelectOptions, User } from '@shared/interfaces/interfaces';

@Component({
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'visitClass' },
    },
  ],
  selector: 'app-visit-card-component',
  styleUrls: ['./visit-card.component.scss'],
  templateUrl: './visit-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitCardComponent implements OnChanges {
  @Input() user!: User;
  @Input() adminMode: boolean;

  @Output() setRole = new EventEmitter<User>();

  contractEnds: boolean;

  selectRolesOptions: SelectOptions[];
  selectedRole: string;
  currentProjectName: string;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconAngleLeftB = angleLeftB;
  readonly roles = ROLES;

  roles$ = new Observable((observer) => observer.next(ROLES));

  protected getSelectedRoleValue(selectedRole: string): void {
    let role = selectedRole;
    this.selectedRole = role;
    if (role !== 'CTO') {
      role = role.toLowerCase();
    }
    const newUser = { ...this.user, role };
    this.setRole.emit(newUser);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && this.user) {
      this.contractEnds =
        this.user.endDate.seconds * 1000 - new Date().getTime() <
        ONE_MONTH_IN_SECONDS * 1.5;
      this.selectRolesOptions = ROLES.map((role) => ({
        value: role,
        viewValue: role,
      }));
      this.getSelectedRoleValue(this.user.role);
    }
  }
}
