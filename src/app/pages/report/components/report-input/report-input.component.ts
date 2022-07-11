import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import angleLeftB from '@iconify/icons-uil/angle-left-b';
import plus from '@iconify/icons-tabler/plus';
import minus from '@iconify/icons-tabler/minus';
import check from '@iconify/icons-mdi/check';
import microphoneIcon from '@iconify/icons-tabler/microphone';
import {
  isInputOnlyNumber,
  onRightIndex,
} from '@pages/report/helpers/report-input-helpers';
import { Task } from '@pages/report/interfaces/interfaces';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';
import { Timestamp } from 'firebase/firestore';
import { TasksService } from '@shared/services/tasks.service';
import {
  DurationValue,
  KeyCodeAllowedSymbol,
  Roles,
} from '@pages/report/enums/enum';

@Component({
  selector: 'app-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss'],
})
export class ReportInputComponent implements OnInit, OnChanges {
  @Input() allProjects: Project[];
  @Input() allTasks: Task[];
  @Input() currentDate: string;

  currentProjectId: string;
  currentTaskId: string;
  allProjectsName: string[];

  filteredProjectsOptions: Observable<string[]>;
  filteredTasksOptions: Observable<string[]>;
  filteredRoleOptions!: Observable<string[]>;

  form = new FormGroup({
    project: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required),
    comments: new FormControl(''),
    role: new FormControl(
      localStorage.getItem('AuthUserRole'),
      Validators.required
    ),
    duration: new FormControl(`${DurationValue.Default}`, Validators.required),
  });

  readonly iconAngleLeftB = angleLeftB;

  readonly iconPlus = plus;
  readonly iconMinus = minus;
  readonly iconMinusWidth = '1.5rem';
  readonly iconMinusHeight = '1.5rem';

  readonly iconCheck = check;
  readonly iconMicrophone = microphoneIcon;

  status = '';
  classStatusChecked = 'task-status-checked';
  classStatusDone = '';
  classStatusInProgress = '';

  constructor(private tasksService: TasksService) {}

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
            this.filteredTasksOptions = this.form
              .get('task')
              ?.valueChanges.pipe(
                startWith(''),
                map((i) => {
                  this.currentTaskId = this.allTasks?.find(
                    (task) => task.name === this.form.get('task').value
                  )?.id;
                  return this.filterTasks(i || '');
                })
              );
            return this.filterOption(value || '', this.allProjectsName);
          })
        );

      if (changes.allTasks) {
        this.filteredTasksOptions = this.form.get('task')?.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterTasks(value || ''))
        );
      }
    }
  }

  ngOnInit(): void {
    this.filteredRoleOptions = this.form.get('role')?.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOption(value || '', Object.values(Roles)))
    );
  }

  private filterOption(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) =>
      option?.toLowerCase().includes(filterValue)
    );
  }

  private filterTasks(value: string): string[] {
    const filterValue = value.toLowerCase();

    const tasksArr = this.allTasks?.filter(
      (task) =>
        task.name.toLowerCase().includes(filterValue) &&
        task.projectId === this.currentProjectId
    );
    return tasksArr.map((task) => task.name);
  }

  public onCheckStatus(status: string): void {
    switch (status) {
      case this.status:
        this.status = '';
        this.classStatusDone = '';
        this.classStatusInProgress = '';
        break;
      case 'done':
        this.classStatusDone = this.classStatusChecked;
        this.classStatusInProgress = '';
        this.status = status;
        break;
      case 'in progress':
        this.classStatusInProgress = this.classStatusChecked;
        this.classStatusDone = '';
        this.status = status;
        break;
    }
  }

  addTaskTrack(): void {
    const addTask: TaskTrack = {
      projectId: this.currentProjectId,
      date: new Timestamp(new Date(this.currentDate).getTime() / 1000, 0),
      taskId: this.currentTaskId,
      comments: this.form.get('comments').value,
      duration: +this.form.get('duration').value,
      userId: localStorage.getItem('AuthUserId'),
      status: this.status,
    };
    this.tasksService.setTaskTrack(addTask);
    this.form.get('project').reset();
    this.form.get('task').reset();
    this.form.get('comments').reset();
    this.form.get('duration').setValue(DurationValue.Default);
  }

  onInputOnlyNumber(event: KeyboardEvent): boolean {
    return isInputOnlyNumber(event);
  }

  durationMinus(): void {
    const durationNumberValue = +this.form.get('duration')?.value;
    const durationStringValue = this.form.get('duration')?.value;
    if (
      !durationStringValue ||
      durationStringValue === KeyCodeAllowedSymbol.Dot
    ) {
      this.form.get('duration')?.setValue(DurationValue.Min);
      return;
    }
    if (durationNumberValue <= +DurationValue.Min) {
      return;
    }
    if (durationNumberValue === +DurationValue.Default) {
      const valueInput = `${
        Math.round(+this.form.get('duration')?.value) - DurationValue.MinStep
      }`;
      this.form.get('duration')?.setValue(valueInput);
      return;
    }
    const valueInput = `${
      Math.round(durationNumberValue) - DurationValue.Step
    }`;
    this.form.get('duration')?.setValue(valueInput);
  }

  durationPlus(): void {
    const durationNumberValue = +this.form.get('duration')?.value;
    const durationStringValue = this.form.get('duration')?.value;
    if (
      !durationStringValue ||
      durationStringValue === KeyCodeAllowedSymbol.Dot
    ) {
      this.form.get('duration')?.setValue(DurationValue.Default);
      return;
    }

    if (durationNumberValue >= +DurationValue.Max) {
      return;
    }
    if (durationNumberValue === DurationValue.MinStep) {
      const valueInput = `${
        +this.form.get('duration')?.value + DurationValue.MinStep
      }`;
      this.form.get('duration')?.setValue(valueInput);
      return;
    }
    const valueInput = `${
      Math.round(durationNumberValue) + DurationValue.Step
    }`;
    this.form.get('duration')?.setValue(valueInput);
  }

  onSetValue(): void {
    if (this.form.get('duration')?.value) {
      return;
    }
    this.form.get('duration')?.setValue(DurationValue.Default);
  }

  onSetRightValue(): void {
    const durationStringValue = this.form.get('duration')?.value;
    if (+this.form.get('duration')?.value > +DurationValue.Max) {
      this.form.get('duration')?.setValue(DurationValue.Max);
    }
    if (
      (durationStringValue.includes(KeyCodeAllowedSymbol.Dot) &&
        durationStringValue.includes(KeyCodeAllowedSymbol.Comma)) ||
      (durationStringValue.includes(KeyCodeAllowedSymbol.Dot) &&
        durationStringValue.includes(KeyCodeAllowedSymbol.Greater)) ||
      (durationStringValue.includes(KeyCodeAllowedSymbol.Dot) &&
        durationStringValue.includes(KeyCodeAllowedSymbol.Less)) ||
      durationStringValue.includes(KeyCodeAllowedSymbol.TwoDots)
    ) {
      const nowValue = durationStringValue.slice(
        0,
        onRightIndex(durationStringValue.indexOf(KeyCodeAllowedSymbol.Dot))
      );
      this.form.get('duration')?.setValue(nowValue);
      return;
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Comma)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Comma,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get('duration')?.setValue(rightValue);
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Less)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Less,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get('duration')?.setValue(rightValue);
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Greater)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Greater,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get('duration')?.setValue(rightValue);
    }
  }

  isProjects(): void {
    const isProject = this.allProjects?.some(
      (project) => project.name === this.form.get('project').value
    );

    if (isProject) {
      return;
    }

    this.form.get('project').setValue('');
    this.form.get('task').setValue('');
  }

  isTasks(): void {
    const isTask = this.allTasks?.some(
      (task) =>
        task.name === this.form.get('task').value &&
        task.projectId === this.currentProjectId
    );

    if (isTask) {
      return;
    }

    this.form.get('task').setValue('');
  }
}
