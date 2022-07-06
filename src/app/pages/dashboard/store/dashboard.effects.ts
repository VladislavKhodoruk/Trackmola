import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '@shared/services/tasks.service';
import {
  getActiveTasks,
  getActiveTasksSuccess,
  getAllProjects,
  getAllProjectsSuccess,
  getAllTasks,
  getAllTasksSuccess, getAllTaskTracks, getAllTaskTracksSuccess,
  getAllUsers,
  getAllUsersSuccess,
  getWeekReportTime,
  getWeekReportTimeSuccess
} from "./dashboard.actions";
import { map, switchMap, take } from 'rxjs';
import { ProjectsService } from '@shared/services/projects.service';
import { UsersService } from '@shared/services/users.service';
@Injectable()
export class DashboardEffects {
  getReportTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeekReportTime),
      switchMap(() =>
        this.tasksService.getWeekTasks$.pipe(
          take(1),
          map((data) => {
            const weekReportTime = data.reduce(
              (result, item) => (result += item.duration),
              0
            );
            return getWeekReportTimeSuccess({ weekReportTime });
          })
        )
      )
    )
  );
  getAllProjectsForDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProjects),
      switchMap(() =>
        this.projectsService.getAllProjects$().pipe(
          take(1),
          map((allProjects) => getAllProjectsSuccess({ allProjects }))
        )
      )
    )
  );

  getAllTasksForDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasks),
      switchMap(() =>
        this.tasksService.allTasks$.pipe(
          take(1),
          map((allTasks) => getAllTasksSuccess({ allTasks }))
        )
      )
    )
  );

  getAllUsersForDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(() =>
        this.userService.allUsers$.pipe(
          take(1),
          map((allUsers) => getAllUsersSuccess({ allUsers}))
        )
      )
    )
  );

  getActiveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActiveTasks),
      switchMap(() =>
        this.tasksService.getActiveTasks$.pipe(
          take(1),
          map((activeTasks) => getActiveTasksSuccess({ activeTasks}))
        )
      )
    )
  );

  getAllTaskTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTaskTracks),
      switchMap(() =>
        this.tasksService.allTaskTrack$.pipe(
          take(1),
          map((allTaskTracks) => getAllTaskTracksSuccess({ allTaskTracks }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private userService: UsersService
  ) {}
}
