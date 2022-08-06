export enum UserType {
  Employee = 'employee',
  CTO = 'CTO',
  Manager = 'project manager',
  Admin = 'administrator',
}

export enum StateName {
  Common = 'common',
  Router = 'router',
  Dashboard = 'dashboard',
  Activity = 'activity',
  Profile = 'profile',
  Projects = 'projects',
  Report = 'report',
  ReportConstructor = 'report constructor',
  Team = 'team',
}

export enum TaskStatus {
  Open = 'open',
  InProgress = 'in progress',
  Done = 'done',
  Closed = 'closed',
  Unknown = 'unknown',
}

export enum NumDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum PeriodType {
  Week = 'week',
  TwoWeek = 'two week',
  Month = 'month',
  Custom = 'custom',
}

export enum ChartType {
  Xrange = 'xrange',
  Treemap = 'treemap',
}

export enum DayType {
  WorkDay = 'workDay',
  DayOff = 'dayOff',
  ShortedDay = 'shortedDay',
  Holiday = 'holiday',
}

export enum WeekDays {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
