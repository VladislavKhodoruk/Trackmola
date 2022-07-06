import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSearchValue } from '@pages/projects/store/projects.actions';
import { getSearchValue } from '@pages/projects/store/projects.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-input-search-container',
  template: `<app-input-search
    [searchText]="searchText$ | async"
    (search)="onSearch($event)"
  ></app-input-search>`,
})
export class InputSearchContainer {
  readonly searchText$ = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}

  public onSearch(value: string): void {
    this.store$.dispatch(setSearchValue({ value }));
  }
}
