import { HOURS_IN_DAY } from '@pages/activity/constants/constants';
import { RestHours } from '@pages/activity/enums/enums';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';
import { NumDay, PeriodType } from '@shared/enums/enum';

export function setMidnightTime(date: Date) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);
  return currentDate;
}

export function getRestTime(type?: PeriodType): number {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  switch (type) {
    case PeriodType.Week: {
      switch (date.getDay()) {
        case NumDay.Sunday: {
          return RestHours.Week;
        }
        case NumDay.Saturday: {
          return RestHours.WeekWithout;
        }
        default: {
          return RestHours.Day * (date.getDay() - 1);
        }
      }
    }
    case PeriodType.Month: {
      let restMonthHours = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        const currentDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          i
        ).getDay();
        if (currentDate !== NumDay.Sunday && currentDate !== NumDay.Saturday) {
          restMonthHours += RestHours.Day;
        }
        restMonthHours += HOURS_IN_DAY;
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
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      i
    ).getDay();
    if (currentDate !== NumDay.Sunday && currentDate !== NumDay.Saturday) {
      restMonthDefaultHours += RestHours.Day;
    }
    restMonthDefaultHours += HOURS_IN_DAY;
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
  value: number,
  overtime?: number
): TotalCardItem => {
  totalCardItem.value = overtime ? value - overtime : value;
  totalCardItem.progressBarSize = (value / totalCardItem.numberWeekHours) * 100;
  if (totalCardItem.progressBarSize > 100) {
    totalCardItem.progressBarSize = 100;
  }
  return totalCardItem;
};
