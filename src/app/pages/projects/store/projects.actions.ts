import { createAction, props } from '@ngrx/store';

import { Task } from '@shared/interfaces/interfaces';

export const SET_SEARCH_VALUE = '[Projects Page] set search value';

export const CLEAR_PROJECTS_STATE = '[Projects Page] clear project state';

export const SET_TASK = '[Projects Page] set task';

export const setSearchValue = createAction(
  SET_SEARCH_VALUE,
  props<{ value: string }>()
);

export const clearProjectState = createAction(CLEAR_PROJECTS_STATE);

export const addTask = createAction(SET_TASK, props<{ task: Task }>());
