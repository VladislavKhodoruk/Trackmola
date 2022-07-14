import { createAction, props } from '@ngrx/store';

export const SET_SEARCH_VALUE = '[Projects Page] set search value';

export const CLEAR_PROJECTS_STATE = '[Projects Page] clear project state';

export const setSearchValue = createAction(
  SET_SEARCH_VALUE,
  props<{ value: string }>()
);

export const clearProjectState = createAction(CLEAR_PROJECTS_STATE);
