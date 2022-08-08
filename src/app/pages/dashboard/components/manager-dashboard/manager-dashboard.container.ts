import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import {
  getActiveProjectFilter,
  getTasksForManager,
  getModeView,
  getManagerDashboardPeriod,
} from '@pages/dashboard/store/dashboard.selectors';

import {
  GroupBy,
  Period,
  Project,
  User,
  Vacations,
} from '@shared/interfaces/interfaces';
import { usersInfoByUserId } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard-container',
  styleUrls: ['./manager-dashboard.container.scss'],
  template: `<app-manager-dashboard
    [vacations]="vacations"
    [activeProjectFilter]="activeProjectFilter$ | async"
    [tasksForManager]="tasksForManager$ | async"
    [usersInfoByUserId]="usersInfoByUserId$ | async"
    [modeView]="modeView$ | async"
    [period]="period$ | async"
  ></app-manager-dashboard>`,
})
export class ManagerDashboardContainer {
  readonly vacations: Vacations[] = [
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Kirill Borisenok',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
      vacationDay: new Date('2022-07-22T03:24:00'),
    },
    {
      fullName: 'Andrei Shinkarev',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/62985f0ac3dffc0068f5ddff/864cad92-da20-48f3-b5b4-54d2a6c74170/128',
      vacationDay: new Date('2022-07-23T03:24:00'),
    },
    {
      fullName: 'Vladislav Khodoruk',
      photo:
        'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net' +
        '/6298604da0eafd0069e8f7cd/1656ba5b-b78b-4822-846f-ecb40c4e4899/128',
      vacationDay: new Date('2022-07-24T03:24:00'),
    },
    {
      fullName: 'Maria Ivakhnenko',
      photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
      vacationDay: new Date('2022-07-25T03:24:00'),
    },
  ];

  readonly activeProjectFilter$: Observable<Project> = this.store$.select(
    getActiveProjectFilter
  );

  readonly tasksForManager$: Observable<TaskForManager[]> =
    this.store$.select(getTasksForManager);

  readonly usersInfoByUserId$: Observable<GroupBy<User>> =
    this.store$.select(usersInfoByUserId);

  readonly modeView$: Observable<ManagerDashboardView> =
    this.store$.select(getModeView);

  readonly period$: Observable<Period> = this.store$.select(
    getManagerDashboardPeriod
  );

  constructor(private store$: Store<TrackMolaState>) {}
}
