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
import { TaskTrack } from 'src/app/store/shared/shared.state';
import { Day, Week } from 'src/app/shared/interfaces/interfaces';
import {
  NAMES_OF_THE_DAYS_OF_THE_WEEK,
  NUMBER_OF_DAYS_IN_A_WEEK,
  ONE_DAY_IN_SECONDS,
} from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnChanges, OnDestroy {
  @Input() date!: Date | null;
  @Input() allTasks!: TaskTrack[] | null;

  @Output() changeDate = new EventEmitter<Date>();

  day!: Day;
  currentWeeks: Week[] = [];
  namesDaysWeek = NAMES_OF_THE_DAYS_OF_THE_WEEK;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTasks']) {
      if (this.date?.getDay() === 0) {
        this.generateWeeks(this.date, 2, 0);
        return;
      }
      this.generateWeeks(this.date);
    }
  }

  ngOnDestroy(): void {
    this.onChangeDate(new Date());
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
            const isTasks = Boolean(task);

            const duration = Number(task?.duration);

            return {
              value: new Date(value),
              isTasks: isTasks,
              duration: duration,
            };
          }),
      });
    }
    this.currentWeeks = currentWeeks;
  }

  private onTask(
    day: number,
    tasks: TaskTrack[] | null
  ): TaskTrack | undefined {
    return tasks?.find(
      (task) =>
        new Date(task.date).getDate() === new Date(day).getDate() &&
        new Date(task.date).getMonth() === new Date(day).getMonth() &&
        new Date(task.date).getFullYear() === new Date(day).getFullYear()
    );
  }

  onChangeDate(day: Date): void {
    this.changeDate.emit(day);
  }
}
