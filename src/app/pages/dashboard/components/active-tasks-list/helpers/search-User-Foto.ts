import { Injectable } from '@angular/core';
import { UsersService } from '@shared/services/users.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchUserPhoto {
  constructor(private servise: UsersService) {}

  getUserPhoto(id: string) {
    return this.servise.currentUserProfileById$(id).subscribe((x) => x.photo);
  }
}
