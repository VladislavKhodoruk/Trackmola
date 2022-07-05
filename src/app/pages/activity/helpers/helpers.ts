import {
  NUMBER_OF_HOURS_IN_DAY,
  NUMBER_OF_REST_HOURS_IN_DAY,
  NUMBER_OF_REST_HOURS_IN_WEEK,
  NUMBER_OF_REST_HOURS_IN_WEEK_WITHOUT_SUNDAY,
} from '../constants/constants';

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
          return NUMBER_OF_REST_HOURS_IN_WEEK;
        }
        case 6: {
          return NUMBER_OF_REST_HOURS_IN_WEEK_WITHOUT_SUNDAY;
        }
        default: {
          return NUMBER_OF_REST_HOURS_IN_DAY * (date.getDay() - 1);
        }
      }
    }
    case 'month': {
      let restMonthHours = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        switch (new Date(date.getFullYear(), date.getMonth(), i).getDay()) {
          case 0: {
            restMonthHours += NUMBER_OF_HOURS_IN_DAY;
            break;
          }
          case 6: {
            restMonthHours += NUMBER_OF_HOURS_IN_DAY;
            break;
          }
          default: {
            restMonthHours += NUMBER_OF_REST_HOURS_IN_DAY;
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
        restMonthDefaultHours += NUMBER_OF_HOURS_IN_DAY;
        break;
      }
      case 6: {
        restMonthDefaultHours += NUMBER_OF_HOURS_IN_DAY;
        break;
      }
      default: {
        restMonthDefaultHours += NUMBER_OF_REST_HOURS_IN_DAY;
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
  return (
    endDate.getDate() * NUMBER_OF_HOURS_IN_DAY - getRestMonthDefaultHours()
  );
}
