export interface InfoReportConstructorItem {
  taskId: string;
  taskName?: string;
  usersInfo?: InfoReportConstructorItemUser[];
}

export interface InfoReportConstructorItemUser {
  userId: string;
  userName?: string;
  userDuration: number;
}
