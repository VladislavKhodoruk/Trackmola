import { createAction, props } from '@ngrx/store';
import { Project, User } from '@shared/interfaces/interfaces';
import { TaskTrack } from '@store/common/common.state';
import { Task } from '@pages/report/interfaces/interfaces';

export const GET_WEEK_REPORT_TIME = '[Dashboard page] get week report time';
export const GET_WEEK_REPORT_TIME_SUCCESS =
  '[Dashboard page] get week report time success';
export const GET_ALL_PROJECTS = '[Dashboard page] get all projects ';
export const GET_ALL_PROJECTS_SUCCESS =
  '[Dashboard page] get all projects success';
export const GET_ALL_TASKS = '[Dashboard page] get all tasks ';
export const GET_ALL_TASKS_SUCCESS = '[Dashboard page] get all tasks success ';
export const GET_ALL_USERS = '[Dashboard page] get all users ';
export const GET_ALL_USERS_SUCCESS = '[Dashboard page] get all users success';
export const PAGE_INIT_ACTION = '[Dashboard page] page init action ';
export const GET_ACTIVE_TASKS = '[Dashboard page] get active tasks ';
export const GET_ACTIVE_TASKS_SUCCESS =
  '[Dashboard page] get active tasks success';
export const GET_ALL_TASK_TRACKS = '[Dashboard page] get all task tracks ';
export const GET_ALL_TASK_TRACKS_SUCCESS =
  '[Dashboard page] get all task tracks success';

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WEEK_REPORT_TIME_SUCCESS,
  props<{ weekReportTime: number }>()
);
export const getAllProjects = createAction(GET_ALL_PROJECTS);
export const getAllProjectsSuccess = createAction(
  GET_ALL_PROJECTS_SUCCESS,
  props<{ allProjects: Project[] }>()
);

export const getAllTasks = createAction(GET_ALL_TASKS);
export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ allTasks: Task[] }>()
);

export const getAllUsers = createAction(GET_ALL_USERS);
export const getAllUsersSuccess = createAction(
  GET_ALL_USERS_SUCCESS,
  props<{ allUsers: User[] }>()
);

export const getActiveTasks = createAction(GET_ACTIVE_TASKS);
export const getActiveTasksSuccess = createAction(
  GET_ACTIVE_TASKS_SUCCESS,
  props<{ activeTasks: TaskTrack[] }>()
);

export const getAllTaskTracks = createAction(GET_ALL_TASK_TRACKS);
export const getAllTaskTracksSuccess = createAction(
  GET_ALL_TASK_TRACKS_SUCCESS,
  props<{ allTaskTracks: TaskTrack[] }>()
);

export const dashboardPageInit = createAction(PAGE_INIT_ACTION);
