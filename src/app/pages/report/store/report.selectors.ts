import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReportState } from './report.state';

import { ProjectsState } from '@pages/projects/store/projects.state';
import { StateName } from '@shared/enums/enum';
import { getTasks, getProjects } from '@store/common/common.selectors';

export const REPORT_STATE_NAME = StateName.Report;

const getReportState = createFeatureSelector<ReportState>(REPORT_STATE_NAME);

export const getAllTasksData = createSelector(
  getReportState,
  (state) => state.allTasks
);

export const getAllProjectsData = createSelector(
  getReportState,
  (state) => state.allProjects
);

export const getTaskTrack = createSelector(
  getReportState,
  (state) => state.taskTrack
);

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

export const tasksInfoByTaskId = createSelector(getTasks, (tasks) =>
  tasks.reduce((accum, task) => ({ ...accum, [task.id]: task }), {})
);

export const projectsInfoByProjectId = createSelector(getProjects, (projects) =>
  projects.reduce((accum, project) => ({ ...accum, [project.id]: project }), {})
);
