import { Period } from '@shared/interfaces/interfaces';

export interface InfoReportConstructorItem {
  taskId: string;
  taskName: string;
  taskDuration?: number;
  taskOvertimeDuration?: number;
  taskPercentageWeek?: number;
  usersInfo?: InfoReportConstructorItemUser[];
}

export interface InfoReportConstructorItemUser {
  userId: string;
  userName: string;
  userPosition: string;
  userPercentageAllDurationTask: number;
}

export interface InfoFromTaskTracksForTable {
  taskOvertimeDuration?: number;
  taskName: string;
  taskDuration: number;
  taskPercentageWeek: number | string;
  userNames: string[] | string;
  userPositions: string[] | string;
}

export interface SortOption {
  columnName: string;
  ascendingSort: boolean;
}

export interface ExcelData {
  header: string;
  period: Period;
  data: InfoFromTaskTracksForTable[];
  team: string[];
}
