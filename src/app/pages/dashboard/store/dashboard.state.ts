export interface DashboardState {
  weekReportTime: number;
  activeTasks: Task[];
}

export const dashboardState: DashboardState = {
  weekReportTime: 0,
  activeTasks: [],
};
