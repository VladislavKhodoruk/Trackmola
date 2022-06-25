import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userType!: string | null;
  @Output() logoutEmmiter = new EventEmitter<void>();
  types = UserType;

  logout(event: Event) {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
