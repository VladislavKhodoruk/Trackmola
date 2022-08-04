import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-approve-modal-container',
  styleUrls: ['./approve-modal.component.scss'],
  template: '<app-approve-modal></app-approve-modal>',
})
export class ApproveModalContainer {
  constructor(private store$: Store<TrackMolaState>) {}
}
