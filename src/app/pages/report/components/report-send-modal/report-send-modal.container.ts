import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getProfileUser } from '@pages/profile/store/profile.selectors';
import { TaskTrack, User } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report-send-modal-container',
  styleUrls: ['./report-send-modal.component.scss'],
  template: '<app-report-send-modal></app-report-send-modal>',
})
export class ReportSendModalContainer {
  constructor(private store$: Store<TrackMolaState>) {}
}
