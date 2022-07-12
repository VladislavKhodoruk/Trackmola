import { Period } from '@shared/interfaces/interfaces';

export function getPeriod(date: Date, type?: string): Period {
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
