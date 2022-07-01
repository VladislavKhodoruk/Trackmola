import { FirstAndLastDay } from '@shared/interfaces/interfaces';

export function setMidnightTime(date: Date) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);
  return currentDate;
}

export function getFirstAndLastDay(
  date: Date,
  type?: 'week' | 'month'
): FirstAndLastDay {
  switch (type) {
    case 'week': {
      const dayOfWeek = date.getDay();
      const startDay = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const startDate = new Date(date.getFullYear(), date.getMonth(), startDay);
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        startDay + 6
      );
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };
    }
    case 'month': {
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      return {
        start: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
        end: endDate.getTime(),
      };
    }
  }
}
