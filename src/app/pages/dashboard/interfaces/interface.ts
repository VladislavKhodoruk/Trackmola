import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';

export interface TaskForManager extends Task {
  projectInformation: Project;
  durationInTask: number;
  taskTracksInTask: TaskTrack[];
}
