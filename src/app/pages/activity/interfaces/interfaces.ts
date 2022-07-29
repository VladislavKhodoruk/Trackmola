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

export interface ModifiedTask {
  projectName: string;
  projectColor: string;
  duration: number;
  date: Date;
  projectId: string;
}
