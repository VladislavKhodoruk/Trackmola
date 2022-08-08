import { Pipe, PipeTransform } from '@angular/core';

import { User } from '@shared/interfaces/interfaces';

@Pipe({
  name: 'searchUsers',
})
export class SearchUsersPipe implements PipeTransform {
  transform(users: User[], search = ''): User[] {
    if (!search.trim()) {
      return users;
    }
    return users.filter(({ fullName }) =>
      fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
