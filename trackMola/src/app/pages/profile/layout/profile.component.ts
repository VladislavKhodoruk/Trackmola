import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() userType!: string | null;
  @Output() logoutEmmiter = new EventEmitter<void>();
  faRightFromBracket = faRightFromBracket;
  types = UserType;

  logout(event: Event) {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}
