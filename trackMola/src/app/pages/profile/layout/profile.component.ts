import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userType!: string | null;
  @Output() logoutEmmiter = new EventEmitter();
  employee = UserType.Employee;
  cto = UserType.CTO;
  manager = UserType.Manager;
  admin = UserType.Admin;

  logout(event: Event) {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}