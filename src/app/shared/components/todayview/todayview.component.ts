import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project, TaskItem, TaskTrack } from '../../interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';
import { MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY } from '@shared/constants/constants';
import { transformDate } from '@pages/report/helpers/report-input-helpers';

@Component({
  selector: 'app-todayview-component',
  templateUrl: './todayview.component.html',
  styleUrls: ['./todayview.component.scss'],
})
export class TodayviewComponent implements OnChanges {
  @Input() taskTracks!: TaskTrack[];
  @Input() projects!: Project[];
  @Input() tasks!: Task[];
  @Input() currentDate!: Date;

  taskItems: TaskItem[];

  ngOnChanges(changes: SimpleChanges): void {
    this.taskItems = this.createTaskItemsByDate();
  }

  get totalDuration(): number {
    const totalDuration = this.taskItems?.reduce(
      (prev, cur) => prev + cur.duration,
      0
    );
    return (totalDuration / MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY) * 100;
  }

  getTasksTracksByDate(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        transformDate(new Date(curTaskTrack.date.seconds * 1000)).getTime() ===
        transformDate(this.currentDate).getTime()
    );
  }

  createTaskItemsByDate(): TaskItem[] {
    const currentTaskTracks = this.getTasksTracksByDate();
    return currentTaskTracks.reduce((acc, curTaskTrack) => {
      const task = this.tasks.find((task) => task.id === curTaskTrack.taskId);
      const project = this.projects.find(
        (project) => project.id === curTaskTrack.projectId
      );
      let taskItem: TaskItem = {
        id: curTaskTrack.id,
        duration: curTaskTrack.duration,
        taskName: task.name,
        projectColor: project.color,
        projectName: project.name,
      };
      return [...acc, taskItem];
    }, []);
  }
}
