export interface TotalCardItem {
  value: number;
  title: string;
  img: string;
  backgoundColor: string;
  progressBarColor: string;
  progressBarSize: number;
  numberWeekHours: number;
  numberMonthHours?: number;
}

export interface WeekType {
  MON: [] | Tas[];
  TUE: [] | Tas[];
  WED: [] | Tas[];
  THU: [] | Tas[];
  FRI: [] | Tas[];
  SAT: [] | Tas[];
  SUN: [] | Tas[];
}

export interface Tas {
  projectId: string;
  projectColor: string;
  duration: number;
  date: Date;
}
