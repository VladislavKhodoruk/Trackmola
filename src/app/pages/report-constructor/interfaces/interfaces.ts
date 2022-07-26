import { Period } from '@shared/interfaces/interfaces';

export interface InfoReportConstructorItem {
  taskId: string;
  taskName: string;
  taskDuration?: number;
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
  taskName: string;
  taskDuration: number;
  taskPercentageWeek: number;
  userNames: string[];
  userPositions: string[];
}

export interface SortOption {
  columnName: string;
  ascendingSort: boolean;
}

export interface ExcelData {
  header: string;
  period: Period;
  data: object[];
  team: string[];
}
