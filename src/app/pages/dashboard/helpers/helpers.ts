import { DaysByPeriod } from '../interfaces/interface';

import {
  ONE_DAY_IN_SECONDS,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';
import { NumDay } from '@shared/enums/enum';
import { GroupBy, Period, TaskTrack } from '@shared/interfaces/interfaces';

export function isWeekend(day: number): boolean {
  const date: Date = new Date(day);

  if (date.getDay() === NumDay.Saturday || date.getDay() === NumDay.Sunday) {
    return true;
  }
  return false;
}

export function daysInPeriod(period: Period): DaysByPeriod {
  const start: Date = new Date(period.start);

  const totalDays: number = Math.round(
    (period.end - period.start) / ONE_DAY_IN_SECONDS
  );
  const weekends: DaysByPeriod['weekends'] = [];
  const days: DaysByPeriod['days'] = [];

  for (let i = 0; i < totalDays; i++) {
    const date: Date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i
    );

    days.push(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    if (isWeekend(date.getTime())) {
      const weekend = {
        from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      };

      weekends.push(weekend);
    }
  }

  return {
    days,
    weekends,
  };
}

export function weeksInPeriod(period: Period): number {
  return (
    (new Date(period.end).getTime() - new Date(period.start).getTime()) /
    ONE_WEEK_IN_SECONDS
  );
}

export function taskTracksByUser(
  taskTracks: TaskTrack[]
): [string, TaskTrack[]][] {
  const taskTracksGroupByUser: GroupBy<TaskTrack[]> = taskTracks.reduce(
    (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
      const userId = taskTrack.userId;
      if (!accum[userId]) {
        accum[userId] = [];
      }
      accum[userId].push(taskTrack);
      return accum;
    },
    {}
  );
  return Object.entries(taskTracksGroupByUser);
}

export function compareTwoDates(
  dateFirst: number,
  dateSecond: number
): boolean {
  const date = new Date(dateFirst * 1000);
  const date2 = new Date(dateSecond * 1000);
  const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const date2UTC = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  return dateUTC !== date2UTC && dateUTC !== date2UTC + ONE_DAY_IN_SECONDS;
}

export function taskTracksByPeriods(taskTracks: TaskTrack[]): [TaskTrack?][] {
  const sortedTaskTracks = taskTracks.sort(
    (a, b) => a.date.seconds - b.date.seconds
  );
  return sortedTaskTracks.reduce(
    (
      accum: [TaskTrack?][],
      taskTrack: TaskTrack,
      index: number,
      array: TaskTrack[]
    ) => {
      if (
        !index ||
        compareTwoDates(taskTrack.date.seconds, array[index - 1].date.seconds)
      ) {
        accum.push([]);
      }

      accum[accum.length - 1].push(taskTrack);
      return accum;
    },
    []
  );
}
