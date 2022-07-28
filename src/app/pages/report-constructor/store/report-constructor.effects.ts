import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { exportExel } from './report-constructor.actions';

import { ExportExelService } from '../services/export-exel.service';

@Injectable()
export class ReportConstructorEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportExel),
      switchMap(({ data }) => this.exportExelService.exportExel(data))
    )
  );

  constructor(
    private actions$: Actions,
    private exportExelService: ExportExelService
  ) {}
}
