import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { transformDate } from '@pages/report/helpers/report-input-helpers';
import { MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY } from '@shared/constants/constants';
import {
  Project,
  TaskItem,
  TaskTrack,
  Task,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-todayview-component',
  styleUrls: ['./todayview.component.scss'],
  templateUrl: './todayview.component.html',
})
export class TodayviewComponent implements OnChanges {
  @Input() taskTracks!: TaskTrack[];
  @Input() projects!: Project[];
  @Input() tasks!: Task[];
  @Input() currentDate!: number;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() deleteTaskTrack = new EventEmitter<string>();

  maxDuration = 100;
  taskItems: TaskItem[];
  taskItemsAreEmpty = true;

  maximumNumberOfHoursInADay = MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY;

  ngOnChanges(): void {
    this.taskItems = this.createTaskItems();
    const isToday =
      transformDate(this.currentDate).getTime() ===
      transformDate(new Date().getTime()).getTime();
    this.taskItemsAreEmpty = !this.taskItems.length || isToday;
  }

  editTaskTrack(id: string): void {
    const currentTaskTrack = this.taskTracks.find(
      (tasktrack) => tasktrack.id === id
    );
    this.taskTrack.emit(currentTaskTrack);
  }

  get totalDuration(): number {
    const totalDuration = this.taskItems?.reduce(
      (prev, cur) => prev + cur.duration,
      0
    );
    return totalDuration;
  }

  get totalDurationPercent(): number {
    return (this.totalDuration / MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY) * 100;
  }

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        transformDate(curTaskTrack.date.seconds * 1000).getTime() ===
          transformDate(this.currentDate).getTime()
    );
  }

  createTaskItems(): TaskItem[] {
    const currentTaskTracks = this.getFilteredTasksTracks();
    return currentTaskTracks.reduce((acc, curTaskTrack) => {
      const task: Task = this.tasks.find(
        (curTask) => curTask.id === curTaskTrack.taskId
      );
      const project = this.projects.find(
        (curProject) => curProject.id === curTaskTrack.projectId
      );
      const taskItem: TaskItem = {
        duration: curTaskTrack.duration,
        id: curTaskTrack.id,
        overtimeDuration: curTaskTrack.overtimeDuration,
        projectColor: project?.color,
        projectName: project?.name,
        taskName: task?.name,
      };
      return [...acc, taskItem];
    }, [] as TaskItem[]);
  }
}
