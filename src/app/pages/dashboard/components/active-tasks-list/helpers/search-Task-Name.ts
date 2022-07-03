import { TasksService } from '@shared/services/tasks.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTaskName {
  constructor(private service: TasksService) {}
  getTaskName(id) {
    return this.service
      .getCurrentTaskById(id)
      .pipe(map((data) => data.name + 'hello'))
      .subscribe((x) => x);
  }
}
