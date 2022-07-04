export function setMidnightTime(date: Date) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);
  return currentDate;
}

export function getRestTime(type?: 'week' | 'month'): number {
  const date = setMidnightTime(new Date());
  switch (type) {
    case 'week': {
      switch (date.getDay()) {
        case 7: {
          return 128;
        }
        case 6: {
          return 104;
        }
        default: {
          return 16 * (date.getDay() - 1);
        }
      }
    }
    case 'month': {
      let restMonthHours = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        switch (new Date(date.getFullYear(), date.getMonth(), i).getDay()) {
          case 0: {
            restMonthHours += 24;
            break;
          }
          case 6: {
            restMonthHours += 24;
            break;
          }
          default: {
            restMonthHours += 16;
            break;
          }
        }
      }
      return restMonthHours;
    }
  }
}

export function getRestMonthDefaultHours(): number {
  const date = setMidnightTime(new Date());
  let restMonthDefaultHours = 0;
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (let i = 1; i <= endDate.getDate(); i++) {
    switch (new Date(date.getFullYear(), date.getMonth(), i).getDay()) {
      case 0: {
        restMonthDefaultHours += 24;
        break;
      }
      case 6: {
        restMonthDefaultHours += 24;
        break;
      }
      default: {
        restMonthDefaultHours += 16;
        break;
      }
    }
  }
  return restMonthDefaultHours;
}

export function getWorksMonthDefaultHours(): number {
  const date = setMidnightTime(new Date());
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endDate.getDate() * 24 - getRestMonthDefaultHours();
}
