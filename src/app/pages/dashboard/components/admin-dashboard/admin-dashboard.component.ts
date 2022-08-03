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

import {
  OVERTIME_TOTAL_CARD,
  WORK_HOURS_TOTAL_CARD,
} from '@pages/activity/constants/constants';
import { getTotalCardItem } from '@pages/activity/helpers/helpers';
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
export class AdminDashboardComponent implements OnInit, OnChanges, OnDestroy {
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

  currentUser: User;
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
    this.currentUser = this.currentUsers[1];
    this.totalCardItems = [
      getTotalCardItem(
        WORK_HOURS_TOTAL_CARD,
        this.taskTracksDurationGroupByUser[this.currentUser?.id]?.duration +
          this.taskTracksDurationGroupByUser[this.currentUser?.id]
            ?.overtimeDuration,
        PeriodType.Month
      ),
      getTotalCardItem(
        OVERTIME_TOTAL_CARD,
        this.taskTracksDurationGroupByUser[this.currentUser?.id]
          ?.overtimeDuration,
        PeriodType.Month
      ),
    ];
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

  changeCurrentUser(user: User): void {
    this.currentUser = user;
    this.totalCardItems = [
      getTotalCardItem(
        WORK_HOURS_TOTAL_CARD,
        this.taskTracksDurationGroupByUser[this.currentUser?.id]?.duration +
          this.taskTracksDurationGroupByUser[this.currentUser?.id]
            ?.overtimeDuration,
        PeriodType.Month
      ),
      getTotalCardItem(
        OVERTIME_TOTAL_CARD,
        this.taskTracksDurationGroupByUser[this.currentUser?.id]
          ?.overtimeDuration,
        PeriodType.Month
      ),
    ];
  }
}
