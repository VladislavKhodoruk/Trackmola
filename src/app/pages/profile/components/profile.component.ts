import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userInfo: User;

  @Output() logoutEmmiter = new EventEmitter<void>();

  logout(event: Event): void {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
