import { createAction, props } from '@ngrx/store';

export const SET_SEARCH_VALUE = '[Projects Page] set search value';

export const setSearchValue = createAction(
  SET_SEARCH_VALUE,
  props<{ value: string }>()
);
