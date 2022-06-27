import {
  NAVIGATION_BASIC_ITEMS,
  NAVIGATION_TEAM,
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
      return NAVIGATION_BASIC_ITEMS;
    case UserType.CTO:
      return [...NAVIGATION_BASIC_ITEMS, ...NAVIGATION_TEAM];
    case UserType.Manager:
      return [...NAVIGATION_BASIC_ITEMS, ...NAVIGATION_TEAM];
    case UserType.Admin:
      return [...NAVIGATION_BASIC_ITEMS, ...NAVIGATION_TEAM];
  }
}
