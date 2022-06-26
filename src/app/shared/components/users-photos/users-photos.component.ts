import { Component, Input } from '@angular/core';
import { defaultPhotoUrl } from '@shared/constants/constants';

@Component({
  selector: 'app-users-photos',
  templateUrl: './users-photos.component.html',
  styleUrls: ['./users-photos.component.scss'],
})
export class UsersPhotosComponent {
  @Input() photos!: string[];
  @Input() size: number;
  defaultPhoto = defaultPhotoUrl;
}
