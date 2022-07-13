import { HOURS_IN_DAY } from '@pages/activity/constants/constants';
import { RestHours } from '@pages/activity/enums/enums';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';
import { SeriesOptionsType } from 'highcharts';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

export function setMidnightTime(date: Date) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);
  return currentDate;
}

export function getRestTime(type?: 'week' | 'month'): number {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  switch (type) {
    case 'week': {
      switch (date.getDay()) {
        case 0: {
          return RestHours.Week;
        }
        case 6: {
          return RestHours.WeekWithout;
        }
        default: {
          return RestHours.Day * (date.getDay() - 1);
        }
      }
    }
    case 'month': {
      let restMonthHours = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        switch (new Date(date.getFullYear(), date.getMonth(), i).getDay()) {
          case 0: {
            restMonthHours += HOURS_IN_DAY;
            break;
          }
          case 6: {
            restMonthHours += HOURS_IN_DAY;
            break;
          }
          default: {
            restMonthHours += RestHours.Day;
            break;
          }
        }
      }
      return restMonthHours;
    }
  }
}

export function getRestMonthDefaultHours(): number {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  let restMonthDefaultHours = 0;
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (let i = 1; i <= endDate.getDate(); i++) {
    switch (new Date(date.getFullYear(), date.getMonth(), i).getDay()) {
      case 0: {
        restMonthDefaultHours += HOURS_IN_DAY;
        break;
      }
      case 6: {
        restMonthDefaultHours += HOURS_IN_DAY;
        break;
      }
      default: {
        restMonthDefaultHours += RestHours.Day;
        break;
      }
    }
  }
  return restMonthDefaultHours;
}

export function getWorksMonthDefaultHours(): number {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endDate.getDate() * HOURS_IN_DAY - getRestMonthDefaultHours();
}

export const getTotalCardItem = (
  totalCardItem: TotalCardItem,
  value: number
): TotalCardItem => {
  totalCardItem.value = value;
  totalCardItem.progressBarSize = (value / totalCardItem.numberWeekHours) * 100;
  if (totalCardItem.progressBarSize > 100) {
    totalCardItem.progressBarSize = 100;
  }
  return totalCardItem;
};

export function getDataForChart(
  tasks: TaskTrack[],
  projects: Project[]
): SeriesOptionsType[] {
  return [];
}
