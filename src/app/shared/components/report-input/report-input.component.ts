import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import check from '@iconify/icons-mdi/check';
import microphoneIcon from '@iconify/icons-tabler/microphone';
import minus from '@iconify/icons-tabler/minus';
import plus from '@iconify/icons-tabler/plus';
import x from '@iconify/icons-tabler/x';
import angleLeftB from '@iconify/icons-uil/angle-left-b';

import { Timestamp } from 'firebase/firestore';
import { map, Observable, startWith } from 'rxjs';

import { ActiveTasks, Project, TaskTrack } from './../../interfaces/interfaces';

import {
  DurationValue,
  KeyCodeAllowedSymbol,
  Roles,
} from '@pages/report/enums/enum';
import {
  isInputOnlyNumber,
  onRightIndex,
} from '@pages/report/helpers/report-input-helpers';
import { Task } from '@pages/report/interfaces/interfaces';

import { TasksService } from '@shared/services/tasks.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report-input',
  styleUrls: ['./report-input.component.scss'],
  templateUrl: './report-input.component.html',
})
export class ReportInputComponent implements OnInit, OnChanges {
  @Input() allProjects: Project[];
  @Input() allTasks: Task[];
  @Input() currentDate: string;
  @Input() editableTaskTrack: TaskTrack;
  @Input() formTask: ActiveTasks;
  @Input() taskTracks: TaskTrack[];

  @Output() editTaskTrack = new EventEmitter<TaskTrack>();
  @Output() addCurTaskTrack = new EventEmitter<TaskTrack>();
  @Output() closeDialog = new EventEmitter();

  currentProjectId: string;
  currentTaskId: string;
  allProjectsName: string[];

  filteredProjectsOptions: Observable<string[]>;
  filteredTasksOptions: Observable<string[]>;
  filteredRoleOptions!: Observable<string[]>;

  iconX = x;

  form = new FormGroup({
    comments: new FormControl(''),
    duration: new FormControl(`${DurationValue.Default}`, Validators.required),
    project: new FormControl('', Validators.required),
    role: new FormControl(
      localStorage.getItem('AuthUserRole'),
      Validators.required
    ),
    task: new FormControl('', Validators.required),
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
    if (changes.editableTaskTrack && this.editableTaskTrack) {
      this.fillForm();
    }
    if (changes.formTask && this.formTask) {
      this.fillModalForm();
    }
  }

  ngOnInit(): void {
    this.filteredRoleOptions = this.form.get('role')?.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOption(value || '', Object.values(Roles)))
    );
    this.editableTaskTrack = null;
  }

  private fillForm(): void {
    const projectName = this.allProjects?.find(
      (project) => project.id === this.editableTaskTrack?.projectId
    )?.name;
    this.form.get('project')?.setValue(projectName);
    const taskName = this.allTasks?.find(
      (task) => task.id === this.editableTaskTrack?.taskId
    )?.name;
    this.form.get('task')?.setValue(taskName);
    this.form.get('duration')?.setValue(`${this.editableTaskTrack?.duration}`);
    this.form.get('comments')?.setValue(this.editableTaskTrack.comments);
    this.onCheckStatus(this.editableTaskTrack?.status);
  }

  private get mostFrequentDuration(): number {
    const curTaskId = this.allTasks.find(
      (task) => task.name === this.formTask.taskName
    ).id;
    const usersTaskTracks = this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.taskId === curTaskId &&
        curTaskTrack.userId === localStorage.getItem('AuthUserId')
    );
    if (!usersTaskTracks.length) {
      return +DurationValue.Default;
    }
    const averageDuration =
      usersTaskTracks.reduce((acc, cur) => (acc += cur.duration), 0) /
      usersTaskTracks.length;
    return Math.round(averageDuration);
  }

  private fillModalForm(): void {
    this.form.get('project')?.setValue(this.formTask.projectName);
    this.form.get('task')?.setValue(this.formTask.taskName);
    this.form.get('duration')?.setValue(`${this.mostFrequentDuration}`);
    this.onCheckStatus('');
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
      comments: this.form.get('comments').value,
      date: new Timestamp(new Date(this.currentDate).getTime() / 1000, 0),
      duration: +this.form.get('duration').value,
      id: '',
      projectId: this.currentProjectId,
      status: this.status,
      taskId: this.currentTaskId,
      userId: localStorage.getItem('AuthUserId'),
    };
    if (this.formTask) {
      this.addCurTaskTrack.emit(addTask);
      this.closeDialog.emit();
      return;
    }
    if (this.editableTaskTrack) {
      addTask.id = this.editableTaskTrack.id;
      this.editTaskTrack.emit(addTask);
      this.editableTaskTrack = null;
    } else {
      this.addCurTaskTrack.emit(addTask);
    }
    this.onCheckStatus(this.status);
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
