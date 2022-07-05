import { createAction, props } from '@ngrx/store';
import { Project, Task, TaskTrack, User } from '@shared/interfaces/interfaces';

export const GET_TASKS = '[Projects Page] get tasks';
export const GET_TASKS_SUCCESS = '[Projects Page] get tasks success';

export const GET_TASK_TRACKS = '[Projects Page] get task tracks';
export const GET_TASK_TRACKS_SUCCESS =
  '[Projects Page] get task tracks success';

export const GET_PROJECTS = '[Projects Page] get projects';
export const GET_PROJECTS_SUCCESS = '[Projects Page] get projects success';

export const GET_USERS = '[Projects Page] get users';
export const GET_USERS_SUCCESS = '[Projects Page] get users success';

export const SET_SEARCH_VALUE = '[Projects Page] set search value';

export const CLEAR_PROJECT_STORE = '[Projects Page] clear project store';

export const getTasks = createAction(GET_TASKS);

export const getTasksSuccess = createAction(
  GET_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const getTaskTracks = createAction(GET_TASK_TRACKS);

export const getTaskTracksSuccess = createAction(
  GET_TASK_TRACKS_SUCCESS,
  props<{ taskTracks: TaskTrack[] }>()
);

export const getProjects = createAction(GET_PROJECTS);

export const getProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const getUsers = createAction(GET_USERS);

export const getUsersSuccess = createAction(
  GET_USERS_SUCCESS,
  props<{ users: User[] }>()
);

export const setSearchValue = createAction(
  SET_SEARCH_VALUE,
  props<{ value: string }>()
);

export const clearProjectStore = createAction(CLEAR_PROJECT_STORE);
