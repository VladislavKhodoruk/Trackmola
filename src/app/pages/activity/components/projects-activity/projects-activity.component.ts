/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project, Task } from '@pages/projects/interfaces/interfaces';
import { Options } from 'highcharts';

@Component({
  selector: 'app-projects-activity',
  templateUrl: './projects-activity.component.html',
  styleUrls: ['./projects-activity.component.scss'],
})
export class ProjectsActivityComponent implements OnChanges {
  @Input() activityProjects: Project[];
  @Input() activityTasks: Task[];
  chartOptions: Options;

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },

      title: {
        text: '',
        verticalAlign: 'middle',
        align: 'center',
        x: 0,
        y: 0,
        style: {
          font: 'var(--font-titleBig)',
          color: 'var(--aqua)',
        },
      },

      tooltip: {
        enabled: false,
      },

      accessibility: {
        point: {
          valueSuffix: '%',
        },
        enabled: false,
      },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          innerSize: '70%',
          colors: ['var(--aqua)', 'var(--rose)', 'var(--galaxy)'],
          cursor: 'pointer',
          showInLegend: true,
          states: {
            hover: {
              halo: null,
              brightness: 0,
            },
          },
          point: {
            events: {
              mouseOver: ({ target }) => {
                const point = target as any;
                const percentage: number = point.percentage.toFixed(1);
                point.series.chart.update({
                  title: {
                    text: `${percentage}%`,
                    style: {
                      color: point.color,
                    },
                  },
                });
                point.graphic
                  .attr({
                    'stroke-width': 10,
                    stroke: point.color,
                    zIndex: 3,
                  })
                  .add();
              },
              mouseOut: ({ target }) => {
                const point = target as any;
                point.series.chart.update({
                  title: { text: '' },
                });
                point.graphic
                  .attr({
                    'stroke-width': 1,
                    stroke: point.color,
                    filter: 'transparent',
                  })
                  .add();
              },
            },
          },
        },
      },

      series: [
        {
          type: 'pie',
          data: this.dataForChart(this.activityProjects, this.activityTasks),
        },
      ],

      legend: {
        align: 'center',
        enabled: true,
        symbolHeight: 24,
        symbolWidth: 24,
        itemDistance: 85,
        itemMarginTop: 50,
        itemStyle: {
          font: 'var(--font-current)',
        },
      },

      credits: {
        enabled: false,
      },
    };
  }

  private dataForChart(project?: Project[], tasks?: Task[]) {
    const projectsNames = project.map(({ name, id }) => ({ id, name }));
    const projectsWithTasks = projectsNames.map(({ name, id }) => {
      const tasksInProject = tasks.filter((task) => task.projectId === id);
      const percent = (tasksInProject.length / tasks.length) * 100;
      return [name, percent];
    });
    return projectsWithTasks;
  }
}
