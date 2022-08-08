import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import pineapple from '@iconify/icons-noto/pineapple';
import check from '@iconify/icons-tabler/check';
import filter from '@iconify/icons-tabler/filter';
import searchIcon from '@iconify/icons-tabler/search';
import angleLeftB from '@iconify/icons-uil/angle-left-b';
import { map, Observable, startWith } from 'rxjs';

import {
  GroupBy,
  Project,
  User,
  UserCard,
} from '@shared/interfaces/interfaces';

@Component({
  animations: [
    trigger('filter', [
      state('true', style({ height: '0', opacity: '0' })),
      state('false', style({ opacity: '1' })),
      transition('true <=> false', animate('200ms')),
    ]),
    trigger('filterAnimation', [
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(200, [animate('600ms ease-out', style({ opacity: 1 }))]),
        ]),
      ]),
      transition(':decrement', [
        query(':leave', [
          style({ opacity: 1 }),
          stagger(200, [animate('400ms ease-out', style({ opacity: 0 }))]),
        ]),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'teamClass' },
    },
  ],
  selector: 'app-team-list-search-component',
  styleUrls: ['./team-list-search.component.scss'],
  templateUrl: './team-list-search.component.html',
})
export class TeamListSearchComponent implements OnChanges {
  @Input() allProjects: Project[];
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() locations: string[];
  @Input() positions: string[];
  @Input() allUsers: User[];

  @Output() pickUser = new EventEmitter<User>();

  readonly iconAngleLeftB = angleLeftB;
  readonly iconSearch = searchIcon;
  readonly iconFilter = filter;
  readonly pineappleIcon = pineapple;
  readonly iconCheck = check;

  allProjectsName: string[];
  currentProjectId: string;
  currentLocation: string;
  currentPosition: string;
  searchText: string;

  filteredProjectsOptions: Observable<string[]>;
  filteredLocationsOptions: Observable<string[]>;
  filteredPositionsOptions: Observable<string[]>;

  allUserCards: UserCard[];
  filteredUserCards: UserCard[];

  filterState = true;

  user: User;

  form = new FormGroup({
    location: new FormControl(''),
    position: new FormControl(''),
    project: new FormControl(''),
  });
  setPickedUser(id: string): void {
    this.user = this.allUsers.find((currentUser) => currentUser.id === id);
    this.pickUser.emit(this.user);
  }
  isProject(): void {
    const isProject = this.allProjects?.some(
      (project) => project.name === this.form.get('project').value
    );

    if (isProject) {
      return;
    }
    this.form.get('project').setValue('');
  }
  isLocation(): void {
    const isLocation = this.locations?.some(
      (location) => location === this.form.get('location').value
    );

    if (isLocation) {
      return;
    }
    this.form.get('location').setValue('');
  }
  isPosition(): void {
    const isPosition = this.positions?.some(
      (position) => position === this.form.get('position').value
    );

    if (isPosition) {
      return;
    }
    this.form.get('position').setValue('');
  }
  text(event: InputEvent): void {
    this.filterUsers();
    this.searchText = (event.target as HTMLInputElement).value;
    this.filteredUserCards = this.filteredUserCards.filter((userCard) =>
      userCard.userName
        .toLocaleLowerCase()
        .includes(this.searchText.toLowerCase())
    );
    const defaultUser = this.allUsers.find(
      (user) => user.fullName === this.filteredUserCards[0].userName
    );
    this.pickUser.emit(defaultUser);
  }
  filterUsers(): void {
    const filterConfig = {
      location: this.form.get('location').value,
      position: this.form.get('position').value,
      project: this.form.get('project').value,
    };
    this.filteredUserCards = this.allUserCards
      .sort((a, b) => (a.userName > b.userName ? 1 : -1))
      .filter((userCard) => {
        const currentProjects = userCard.projects.map(
          (project) => project.name
        );
        if (filterConfig.project) {
          return currentProjects.includes(String(filterConfig.project));
        }
        return true;
      })
      .filter((userCard) => {
        if (filterConfig.location) {
          return userCard.location === filterConfig.location;
        }
        return true;
      })
      .filter((userCard) => {
        if (filterConfig.position) {
          return userCard.position === filterConfig.position;
        }
        return true;
      });
    const defaultUser = this.allUsers.find(
      (user) => user.fullName === this.filteredUserCards[0].userName
    );
    this.pickUser.emit(defaultUser);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allProjects) {
      this.allProjectsName = this.allProjects.map((project) => project.name);
      this.filteredProjectsOptions = this.form
        .get('project')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentProjectId = this.allProjects?.find(
              (project) => project.name === this.form.get('project').value
            )?.id;
            return this.filterOption(value || '', this.allProjectsName);
          })
        );
    }
    if (changes.locations) {
      this.filteredLocationsOptions = this.form
        .get('location')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentLocation = this.locations.find(
              (location) => location === this.form.get('project').value
            );
            return this.filterOption(value || '', this.locations);
          })
        );
    }
    if (changes.positions) {
      this.filteredPositionsOptions = this.form
        .get('position')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentPosition = this.positions.find(
              (position) => position === this.form.get('position').value
            );
            return this.filterOption(value || '', this.positions);
          })
        );
    }
    if (changes.allUsers && this.allUsers) {
      this.allUserCards = [];
      this.allUsers.forEach((user) => {
        const projects = this.projectsByUsers[user.id];
        const { id, location, photo, position, fullName } = user;
        const currentUserCard: UserCard = {
          id,
          location,
          photo,
          position,
          projects,
          userName: fullName,
        };
        this.allUserCards.push(currentUserCard);
      });
      this.filteredUserCards = this.allUserCards.sort((a, b) =>
        a.userName > b.userName ? 1 : -1
      );
      if (!this.user) {
        const defaultUser = this.allUsers.find(
          (user) => user.fullName === this.filteredUserCards[0].userName
        );
        this.pickUser.emit(defaultUser);
      }
    }
  }

  private filterOption(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) =>
      option?.toLowerCase().includes(filterValue)
    );
  }
}
