import { createAction, props } from '@ngrx/store';

export const LOADING = 'loading';
export const ERROR_MESSGE = 'error message';

export const loading = createAction(LOADING, props<{ status: boolean }>());
export const errorMessage = createAction(
  ERROR_MESSGE,
  props<{ message: string }>()
);
