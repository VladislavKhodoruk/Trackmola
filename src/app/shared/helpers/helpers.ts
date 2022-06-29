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
      const myDate = setMidnightTime(date);
      const dayOfWeek = myDate.getDay();
      const start = myDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

      return {
        start: new Date(myDate.setDate(start)).getTime(),
        end: new Date(myDate.setDate(start + 6)).getTime(),
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
