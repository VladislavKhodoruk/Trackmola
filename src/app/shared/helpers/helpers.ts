import {
  navigationBasicItems,
  navigationTeam,
} from '@shared/constants/constants';
import { UserType } from '@shared/enums/enum';

export function setMidnightTime(date: Date) {
  const currentDate = new Date(date);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);
  return currentDate;
}

export function getNavigationElems(userType: string) {
  switch (userType) {
    case UserType.Employee:
      return navigationBasicItems;
    case UserType.CTO:
      return [...navigationBasicItems, ...navigationTeam];
    case UserType.Manager:
      return [...navigationBasicItems, ...navigationTeam];
    case UserType.Admin:
      return [...navigationBasicItems, ...navigationTeam];
  }
}
