import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';

import {
  NAMES_OF_THE_DAYS_OF_THE_WEEK,
  NUMBER_OF_DAYS_IN_A_WEEK,
  ONE_DAY_IN_SECONDS,
} from '@shared/constants/constants';
import { StateName } from '@shared/enums/enum';
import { Day, Period, TaskTrack, Week } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnChanges, OnDestroy {
  @Input() date!: number;
  @Input() allTasks!: TaskTrack[] | null;
  @Input() firstDay!: Period['start'];
  @Input() numPreviousWeek!: number;
  @Input() editableTaskTrack!: TaskTrack;
  @Input() readonly currentRoute: RouterStateUrl;

  @Output() changeDate = new EventEmitter<number>();
  @Output() taskTrack = new EventEmitter<TaskTrack>();

  taskTrack1: TaskTrack;
  day!: Day;
  currentWeeks: Week[] = [];
  namesDaysWeek = NAMES_OF_THE_DAYS_OF_THE_WEEK;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allTasks || changes.firstDay) {
      this.generateWeeks(new Date(this.firstDay), this.numPreviousWeek);
    }
    if (changes.currentRoute && this.currentRoute.url !== StateName.Report) {
      this.taskTrack.emit(null);
    }
  }

  ngOnDestroy(): void {
    this.onChangeDate(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime()
    );
  }

  private generateWeeks(
    now: Date | null,
    numPreviousWeek = 1,
    numNextWeeks = 1
  ): void {
    const currentWeeks = [];
    if (!now) {
      return;
    }
    const startDayWeek = new Date(
      now.getTime() -
        ONE_DAY_IN_SECONDS *
          (NUMBER_OF_DAYS_IN_A_WEEK * numPreviousWeek + now.getDay())
    );

    const endDayWeek = new Date(
      now.getTime() +
        ONE_DAY_IN_SECONDS *
          (NUMBER_OF_DAYS_IN_A_WEEK * numNextWeeks - now.getDay())
    );

    while (startDayWeek < endDayWeek) {
      currentWeeks.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = startDayWeek.setDate(startDayWeek.getDate() + 1);

            const task = this.onTask(value, this.allTasks);
            const isTasks = task.length > 0;

            const duration = task?.reduce(
              (result, taskTrack) => (result = result + taskTrack.duration),
              0
            );

            const overtimeDuration = task?.reduce(
              (result, taskTrack) =>
                (result = result + taskTrack.overtimeDuration),
              0
            );

            return {
              duration,
              isTasks,
              overtimeDuration,
              value,
            };
          }),
      });
    }
    this.currentWeeks = currentWeeks;
  }

  private onTask(
    day: number,
    tasks: TaskTrack[] | null
  ): TaskTrack[] | undefined {
    return tasks?.filter(
      (task) =>
        new Date(task.date.seconds * 1000).getDate() ===
          new Date(day).getDate() &&
        new Date(task.date.seconds * 1000).getMonth() ===
          new Date(day).getMonth() &&
        new Date(task.date.seconds * 1000).getFullYear() ===
          new Date(day).getFullYear()
    );
  }

  onChangeDate(day: number): void {
    if (this.editableTaskTrack) {
      return;
    }
    this.changeDate.emit(day);
  }
}
