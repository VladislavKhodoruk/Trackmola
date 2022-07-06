import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project, TaskItem, TaskTrack } from '../../interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';

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
  readonly workingDay = 8;
  taskItems: TaskItem[];

  ngOnChanges(changes: SimpleChanges): void {
    this.taskItems = this.createTaskItemsByDate();
  }

  totalDuration(): number {
    const totalDuration = this.taskItems?.reduce(
      (prev, cur) => prev + cur.duration,
      0
    );
    return (totalDuration / this.workingDay) * 100;
  }

  transformDate(date: Date) {
    date = new Date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  getTasksTracksByDate() {
    const filtered = this.taskTracks?.filter(
      (curTT) =>
        this.transformDate(new Date(curTT.date.seconds * 1000)).getTime() ===
        this.transformDate(this.currentDate).getTime()
    );
    return filtered;
  }

  createTaskItemsByDate() {
    const currentTaskTracks = this.getTasksTracksByDate();
    let taskItems: TaskItem[] = [];
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
