export interface TotalCardItem {
  value: number;
  title: string;
  img: string;
  backgroundColor: string;
  progressBarColor: string;
  progressBarSize: number;
  numberWeekHours: number;
  numberMonthHours?: number;
}

export interface ModifiedTask {
  projectName: string;
  projectColor: string;
  duration: number;
  date: Date;
  projectId: string;
}

export interface Efficiency {
  completed: number;
  overtimes: number;
  shortages: number;
}
