import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteSelectedProject,
  setSearchValue,
} from '@pages/projects/store/projects.actions';
import { getSearchValue } from '@pages/projects/store/projects.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-input-search-container',
  template: `<app-input-search
    [searchText]="this.searchText$ | async"
    (searchEmitter)="onSearch($event)"
    (focusEmitter)="onFocus()"
  ></app-input-search>`,
})
export class InputSearchContainer {
  searchText$ = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}

  onSearch(value: string) {
    this.store$.dispatch(setSearchValue({ value }));
  }

  onFocus() {
    this.store$.dispatch(deleteSelectedProject());
  }
}
