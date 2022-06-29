/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-activity-container',
  template:
    '<app-projects-activity [myData]="this.myData"></app-projects-activity>',
})
export class ProjectsActivityContainer {
  myData = [
    ['PSVOD', 58.9],
    ['MDM', 13.29],
    ['PAT', 13],
  ];

  constructor(private store$: Store<TrackMolaState>) {}
}
