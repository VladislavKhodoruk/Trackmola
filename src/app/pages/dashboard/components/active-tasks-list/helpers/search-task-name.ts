import { Task } from '@pages/report/interfaces/interfaces';

export function SearchTaskName(id: string, tasks: Task[]) {
  return tasks.find((task) => task.id === id).name;
}
