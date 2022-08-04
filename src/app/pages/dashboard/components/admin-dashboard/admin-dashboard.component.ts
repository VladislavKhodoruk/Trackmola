import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import searchIcon from '@iconify/icons-tabler/search';
import sortDescending from '@iconify/icons-tabler/sort-descending';
import { IconifyIcon } from '@iconify/types';

import { Subscription } from 'rxjs';

import { TotalCardItem } from '@pages/activity/interfaces/interfaces';
import { AdminSortMode } from '@pages/dashboard/enums/enum';
import { PeriodType, UserType } from '@shared/enums/enum';
import { User, GroupBy } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnChanges, OnInit, OnDestroy {
  @Input() users!: User[];
  @Input() taskTracksDurationGroupByUser!: GroupBy<{
    duration: number;
    overtimeDuration: number;
  }>;

  private subscription: Subscription;

  readonly iconSearch: IconifyIcon = searchIcon;
  readonly sortDescendingIcon: IconifyIcon = sortDescending;

  readonly today = new Date();
  readonly periodType = PeriodType;
  readonly labelsMode = [UserType.Employee, UserType.Manager, UserType.Admin];
  readonly labelsSort = [...Object.values(AdminSortMode)];

  currentUsers: User[];
  checkedMode = UserType.Admin;
  search = new FormControl('');
  sortMode = {
    ascendingSort: true,
    sortName: AdminSortMode.ReportProgress,
  };

  totalCardItems: TotalCardItem[];

  changeMode(type: UserType): void {
    this.checkedMode = type;
  }

  ngOnChanges(): void {
    this.currentUsers = this.users;
  }

  ngOnInit(): void {
    this.subscription = this.search.valueChanges.subscribe(
      (value) =>
        (this.currentUsers = this.users.filter((item) =>
          item.fullName.toLowerCase().includes(value.toLowerCase())
        ))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeSort(sortName: AdminSortMode): void {
    this.sortMode.ascendingSort =
      this.sortMode.sortName === sortName ? !this.sortMode.ascendingSort : true;
    this.sortMode.sortName = sortName;
  }
}
