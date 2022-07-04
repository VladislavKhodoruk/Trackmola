import { TasksService } from '@shared/services/tasks.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTaskName {
  constructor(private service: TasksService) {}
  getTaskName(id: string) {
    let name: string;
    this.service
      .getCurrentTaskById(id)
      .pipe(map((data) => data))
      .subscribe((x) => console.log(x));
    return name;
  }
}
