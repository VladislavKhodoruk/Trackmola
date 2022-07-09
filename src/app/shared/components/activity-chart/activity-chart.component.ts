import { Component } from '@angular/core';
import { Options, SeriesOptionsType } from 'highcharts';
import { BASIC_OPTIONS_ACTIVITY_CHART_COLUMN } from '@pages/activity/constants/constants';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-activity-chart-component',
  templateUrl: 'activity-chart.component.html',
  styleUrls: ['activity-chart-component.scss'],
})
export class ActivityChartComponent {
  readonly basicOptions: Options = BASIC_OPTIONS_ACTIVITY_CHART_COLUMN;

  protected get seriesData(): SeriesOptionsType[] {
    return [
      {
        type: 'column',
        data: this.dataForChart(
          [{
              id: 'strings',
              color: 'black',
              description: 'asdasda',
              fullName: 'dasdasd',
              managersId: ['dasdasd'],
              name: 'asdasdasd',
              taskId: ['asdasdas'],
          }],
          [
            {
              comments: 'string',
              date: new Date(),
              duration: 22,
              id: 'string',
              projectId: 'strings',
              status: 'string',
              taskId: 'string',
              userId: 'string',
            },
          ]
        ),
      },
    ];
  }

  private dataForChart(
    project?: Project[],
    tasks?: {
      date: Date;
      duration: number;
      comments: string;
      id: string;
      projectId: string;
      userId: string;
      taskId: string;
      status: string;
    }[]
  ): [string, number][] {
    const projectsNames: { id: Project['id']; name: Project['name'] }[] =
      project.map(({ name, id }) => ({ id, name }));

    return projectsNames.map(({ name, id }) => {
      const tasksInProject: {
        date: Date;
        duration: number;
        comments: string;
        id: string;
        projectId: string;
        userId: string;
        taskId: string;
        status: string;
      }[] = tasks.filter(({ projectId }) => projectId === id);
      const percent: number = tasksInProject.length / tasks.length;
      return [name, percent];
    });
  }
}
