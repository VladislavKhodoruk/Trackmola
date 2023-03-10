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
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import fireIcon from '@iconify/icons-emojione/fire';
import check from '@iconify/icons-mdi/check';
import microphoneIcon from '@iconify/icons-tabler/microphone';
import minus from '@iconify/icons-tabler/minus';
import plus from '@iconify/icons-tabler/plus';
import x from '@iconify/icons-tabler/x';
import angleLeftB from '@iconify/icons-uil/angle-left-b';

import { IconifyIcon } from '@iconify/types';
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
import { TaskTackStatus } from '@shared/enums/enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'reportClass' },
    },
  ],
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

  @Output() taskTrack = new EventEmitter<TaskTrack>();
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
    date: new FormControl(new Date(), Validators.required),
    duration: new FormControl(`${DurationValue.Default}`, [
      Validators.required,
      Validators.min(0.1),
    ]),
    overtime: new FormControl(false),
    overtimeDuration: new FormControl('0', Validators.required),
    project: new FormControl('', Validators.required),
    role: new FormControl(
      localStorage.getItem('AuthUserRole'),
      Validators.required
    ),
    task: new FormControl('', Validators.required),
  });

  readonly iconAngleLeftB: IconifyIcon = angleLeftB;

  readonly iconPlus: IconifyIcon = plus;
  readonly iconMinus: IconifyIcon = minus;
  readonly iconMinusWidth = '1.5rem';
  readonly iconMinusHeight = '1.5rem';

  readonly iconCheck: IconifyIcon = check;
  readonly iconMicrophone: IconifyIcon = microphoneIcon;
  readonly iconFire: IconifyIcon = fireIcon;

  status = '';

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
            if (!this.formTask && !this.editableTaskTrack) {
              this.form.get('task').setValue('');
            }
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
    this.form.get('overtime')?.setValue(this.editableTaskTrack?.overtime);
    this.form
      .get('overtimeDuration')
      ?.setValue(`${this.editableTaskTrack?.overtimeDuration}`);
    this.form.get('date')?.setValue(new Date(this.currentDate));
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

    return options.some((item) => item.toLowerCase() === filterValue)
      ? options
      : options.filter((option) => option?.toLowerCase().includes(filterValue));
  }

  private filterTasks(value: string): string[] {
    const filterValue = value.toLowerCase();

    const tasksArr = this.allTasks?.filter(
      (task) => task.projectId === this.currentProjectId
    );
    return tasksArr?.some((item) => item.name.toLowerCase() === filterValue)
      ? tasksArr.map((item) => item.name)
      : tasksArr
          .map((item) => item.name)
          .filter((item) => item.toLowerCase().includes(filterValue));
  }

  public onCheckStatus(status: string): void {
    this.status = status === this.status ? '' : status;
  }

  changeOvertimeStatus(): void {
    if (!this.form.get('overtime').value) {
      this.form.get('overtimeDuration')?.setValue('0');
    }
  }

  addTaskTrack(): void {
    const addTask: TaskTrack = {
      comments: this.form.get('comments').value,
      date: new Timestamp(new Date(this.currentDate).getTime() / 1000, 0),
      duration: +this.form.get('duration').value,
      id: '',
      overtime: this.form.get('overtime').value,
      overtimeDuration: +this.form.get('overtimeDuration').value,
      projectId: this.currentProjectId,
      status: this.status,
      taskId: this.currentTaskId,
      taskTrackStatus: TaskTackStatus.New,
      userId: localStorage.getItem('AuthUserId'),
    };
    if (this.formTask) {
      this.addCurTaskTrack.emit(addTask);
      this.closeDialog.emit();
      return;
    }
    if (this.editableTaskTrack) {
      addTask.id = this.editableTaskTrack.id;
      addTask.date = new Timestamp(
        this.form.get('date').value.getTime() / 1000,
        0
      );
      this.editTaskTrack.emit(addTask);
      this.removeEditableTaskTrack();
    } else {
      this.addCurTaskTrack.emit(addTask);
    }
    this.resetForm();
  }

  onInputOnlyNumber(event: KeyboardEvent): boolean {
    return isInputOnlyNumber(event);
  }

  durationMinus(formControlName: string): void {
    const durationNumberValue = +this.form.get(`${formControlName}`)?.value;
    const durationStringValue = this.form.get(`${formControlName}`)?.value;
    if (
      !durationStringValue ||
      durationStringValue === KeyCodeAllowedSymbol.Dot
    ) {
      this.form.get(`${formControlName}`)?.setValue(DurationValue.Min);
      return;
    }
    if (
      (formControlName === 'overtimeDuration' &&
        +this.form.get('overtimeDuration')?.value <= 0) ||
      (formControlName === 'duration' &&
        +this.form.get(`${formControlName}`)?.value <= +DurationValue.Min)
    ) {
      return;
    }
    if (durationNumberValue <= +DurationValue.Default) {
      const valueInput = `${
        +this.form.get(`${formControlName}`)?.value - DurationValue.MinStep
      }`;
      this.form.get(`${formControlName}`)?.setValue(valueInput);
      if (
        +this.form.get('overtimeDuration')?.value >=
        +this.form.get('duration')?.value
      ) {
        this.form
          .get('overtimeDuration')
          ?.setValue(this.form.get('duration')?.value);
      }
      return;
    }
    const valueInput = `${
      Math.round(durationNumberValue) - DurationValue.Step
    }`;
    this.form.get(`${formControlName}`)?.setValue(valueInput);
    if (
      +this.form.get('overtimeDuration')?.value >=
      +this.form.get('duration')?.value
    ) {
      this.form
        .get('overtimeDuration')
        ?.setValue(this.form.get('duration')?.value);
    }
  }

  durationPlus(formControlName: string): void {
    const durationNumberValue = +this.form.get(`${formControlName}`)?.value;
    const durationStringValue = this.form.get(`${formControlName}`)?.value;
    if (
      formControlName === 'overtimeDuration' &&
      durationNumberValue >= +this.form.get('duration')?.value
    ) {
      return;
    }
    if (
      !durationStringValue ||
      durationStringValue === KeyCodeAllowedSymbol.Dot
    ) {
      this.form.get(`${formControlName}`)?.setValue(DurationValue.Default);
      return;
    }

    if (durationNumberValue >= +DurationValue.Max) {
      return;
    }
    if (
      durationNumberValue === DurationValue.MinStep ||
      durationNumberValue === 0
    ) {
      const valueInput = `${
        +this.form.get(`${formControlName}`)?.value + DurationValue.MinStep
      }`;
      this.form.get(`${formControlName}`)?.setValue(valueInput);
      return;
    }
    const valueInput = `${
      Math.round(durationNumberValue) + DurationValue.Step
    }`;
    this.form.get(`${formControlName}`)?.setValue(valueInput);
  }

  onSetValue(formControlName: string): void {
    if (this.form.get(`${formControlName}`)?.value) {
      return;
    }
    this.form.get(`${formControlName}`)?.setValue(DurationValue.Default);
  }

  onSetRightValue(formControlName: string): void {
    const durationStringValue: string = this.form.get(
      `${formControlName}`
    )?.value;
    if (+this.form.get(`${formControlName}`)?.value > +DurationValue.Max) {
      this.form.get(`${formControlName}`)?.setValue(DurationValue.Max);
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
      this.form.get(`${formControlName}`)?.setValue(nowValue);
      return;
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Comma)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Comma,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get(`${formControlName}`)?.setValue(rightValue);
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Less)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Less,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get(`${formControlName}`)?.setValue(rightValue);
    }

    if (durationStringValue.includes(KeyCodeAllowedSymbol.Greater)) {
      const rightValue = durationStringValue.replace(
        KeyCodeAllowedSymbol.Greater,
        KeyCodeAllowedSymbol.Dot
      );
      this.form.get(`${formControlName}`)?.setValue(rightValue);
    }

    if (
      +this.form.get('overtimeDuration')?.value >=
      +this.form.get('duration')?.value
    ) {
      this.form
        .get('overtimeDuration')
        ?.setValue(this.form.get('duration')?.value);
    }
  }

  isProjects(): void {
    const project = this.allProjects?.find(
      (item) =>
        item.name.toLowerCase() === this.form.get('project').value.toLowerCase()
    );

    if (
      project?.name.toLowerCase() ===
      this.form.get('project').value.toLowerCase()
    ) {
      this.form.get('project').setValue(project.name);
      return;
    }

    this.form.get('project').setValue('');
    this.form.get('task').setValue('');
  }

  isTasks(): void {
    const task = this.allTasks?.find(
      (item) =>
        item.name === this.form.get('task').value &&
        item.projectId === this.currentProjectId
    );

    if (
      task?.name.toLowerCase() === this.form.get('task').value.toLowerCase()
    ) {
      this.form.get('task').setValue(task.name);
      return;
    }

    this.form.get('task').setValue('');
  }

  removeEditableTaskTrack(): void {
    this.editableTaskTrack = null;
    this.taskTrack.emit(this.editableTaskTrack);
  }

  resetForm(): void {
    this.onCheckStatus(this.status);
    this.form.get('project').reset();
    this.form.get('task').reset();
    this.form.get('comments').reset();
    this.form.get('duration').setValue(DurationValue.Default);
    this.form.get('overtimeDuration').setValue('0');
    this.form.get('overtime').setValue(false);
  }

  editCancel(): void {
    this.resetForm();
    this.removeEditableTaskTrack();
  }
}
