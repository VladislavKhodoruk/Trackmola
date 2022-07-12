/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Options, Point } from 'highcharts';
import {
  getRestMonthDefaultHours,
  getRestTime,
  getWorksMonthDefaultHours,
} from '../helpers/helpers';

const ACTIVITY_CHART_PIE_COLORS: string[] = [
  'var(--aqua)',
  'var(--rose)',
  'var(--galaxy)',
  'var(--mint)',
  'var(--marine)',
  'var(--ocean)',
];

export const BASIC_OPTIONS_ACTIVITY_CHART_PIE: Options = {
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
      colors: ACTIVITY_CHART_PIE_COLORS,
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
          mouseOver: function (this: Point) {
            const point = this as any;
            this.series.chart.update({
              title: {
                text: `${this.percentage.toFixed(1)}%`,
                style: {
                  color: this.color.toString(),
                },
              },
            });
            point.graphic
              .attr({
                ['stroke-width']: 10,
                stroke: point.color,
                zIndex: 3,
              })
              .add();
          },
          mouseOut: function (this: Point) {
            const point = this as any;
            this.series.chart.update({
              title: { text: '' },
            });
            point.graphic
              .attr({
                ['stroke-width']: 1,
                stroke: point.color,
              })
              .add();
          },
        },
      },
    },
  },

  legend: {
    align: 'center',
    enabled: true,
    symbolHeight: 24,
    symbolWidth: 24,
    itemDistance: 40,
    itemMarginTop: 50,
    itemStyle: {
      font: 'var(--font-current)',
    },
  },

  credits: {
    enabled: false,
  },
};

export const HOURS_IN_DAY = 24;

export const DEFAULT_HOURS_PER_WEEK = 40;
export const DEFAULT_WEEK_OVERTIME = 3;
export const DEFAULT_MONTH_OVERTIME = 12;
export const DEFAULT_HOURS_OF_REST_PER_WEEK = 128;

export const WORK_HOURS_TOTAL_CARD = {
  value: null,
  title: 'work hours',
  img: 'assets/img/activity/work-hours.svg',
  backgoundColor: 'var(--white)',
  progressBarColor: 'var(--primary)',
  progressBarSize: 0,
  numberWeekHours: DEFAULT_HOURS_PER_WEEK,
  numberMonthHours: getWorksMonthDefaultHours(),
};

export const OVERTIME_TOTAL_CARD = {
  value: null,
  title: 'overtimes',
  img: 'assets/img/activity/overtimes.svg',
  backgoundColor: 'var(--white)',
  progressBarColor: 'var(--blue1)',
  progressBarSize: 0,
  numberWeekHours: DEFAULT_WEEK_OVERTIME,
  numberMonthHours: DEFAULT_MONTH_OVERTIME,
};

export const REST_HOURS_TOTAL_CARD = {
  value: getRestTime('week'),
  title: 'rest hours',
  img: 'assets/img/activity/rest-hours.svg',
  backgoundColor: 'var(--blue1)',
  progressBarColor: 'var(--yellow3)',
  progressBarSize: (getRestTime('week') / DEFAULT_HOURS_OF_REST_PER_WEEK) * 100,
  numberWeekHours: DEFAULT_HOURS_OF_REST_PER_WEEK,
  numberMonthHours: getRestMonthDefaultHours(),
};

