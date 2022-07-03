import { Component, Input } from '@angular/core';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

@Component({
  selector: 'app-users-photos',
  templateUrl: './users-photos.component.html',
  styleUrls: ['./users-photos.component.scss'],
})
export class UsersPhotosComponent {
  @Input() readonly users!: string[];
  @Input() readonly size: number;
  readonly defaultPhoto = DEFAULT_PHOTO_URL;
}
