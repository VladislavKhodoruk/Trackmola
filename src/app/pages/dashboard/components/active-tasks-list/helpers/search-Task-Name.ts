import { Task } from '@pages/report/interfaces/interfaces';

export function SearchTaskName(id: string, tasks: Task[]) {
  let name = 'undefined';
  if (tasks) {
    tasks.forEach((i) => {
      if (i.id == id) {
        name = i.name;
      }
    });
  }
  return name;
}
