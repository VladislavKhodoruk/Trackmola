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
import { TaskTrack } from '@store/shared/shared.state';
import { Day, Period, Week } from '@shared/interfaces/interfaces';
import {
  NAMES_OF_THE_DAYS_OF_THE_WEEK,
  NUMBER_OF_DAYS_IN_A_WEEK,
  ONE_DAY_IN_SECONDS,
} from '@shared/constants/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnChanges, OnDestroy {
  @Input() date!: Date | null;
  @Input() allTasks!: TaskTrack[] | null;
  @Input() firstDay!: Period['start'];

  @Output() changeDate = new EventEmitter<Date>();

  day!: Day;
  currentWeeks: Week[] = [];
  namesDaysWeek = NAMES_OF_THE_DAYS_OF_THE_WEEK;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allTasks) {
      if (this.date?.getDay() === 0) {
        this.generateWeeks(this.date, 2, 0);
        return;
      }
      this.generateWeeks(this.date);
    }
    if (changes.firstDay) {
      this.generateWeeks(new Date(this.firstDay));
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
            const isTasks = task.length > 0;

            const duration = Number(
              task?.reduce(
                (result, taskTrack) => (result = result + taskTrack.duration),
                0
              )
            );

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

  onChangeDate(day: Date): void {
    this.changeDate.emit(day);
  }
}
