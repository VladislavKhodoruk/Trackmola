/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Options, Point } from 'highcharts';

import {
  getRestMonthDefaultHours,
  getRestTime,
  getWorksMonthDefaultHours,
} from '@pages/activity/helpers/helpers';
import { SHORT_NAMES_OF_THE_WEEK_UPPERCASE } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';

const ACTIVITY_CHART_PIE_COLORS: string[] = [
  'var(--aqua)',
  'var(--rose)',
  'var(--galaxy)',
  'var(--mint)',
  'var(--marine)',
  'var(--ocean)',
];

export const BASIC_OPTIONS_ACTIVITY_CHART_PIE: Options = {
  accessibility: {
    enabled: false,
    point: {
      valueSuffix: '%',
    },
  },

  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
  },

  credits: {
    enabled: false,
  },

  legend: {
    align: 'center',
    enabled: true,
    itemDistance: 40,
    itemMarginTop: 50,
    itemStyle: {
      font: 'var(--font-current)',
    },
    symbolHeight: 24,
    symbolWidth: 24,
  },

  plotOptions: {
    pie: {
      colors: ACTIVITY_CHART_PIE_COLORS,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      innerSize: '70%',
      point: {
        events: {
          mouseOut: function (this: Point) {
            const point = this as any;
            this.series.chart.update({
              title: { text: '' },
            });
            point.graphic
              .attr({
                stroke: point.color,
                ['stroke-width']: 1,
              })
              .add();
          },
          mouseOver: function (this: Point) {
            const point = this as any;
            this.series.chart.update({
              title: {
                style: {
                  color: this.color.toString(),
                },
                text: `${this.percentage.toFixed(1)}%`,
              },
            });
            point.graphic
              .attr({
                stroke: point.color,
                ['stroke-width']: 10,
                zIndex: 3,
              })
              .add();
          },
        },
      },
      showInLegend: true,
      states: {
        hover: {
          brightness: 0,
          halo: null,
        },
      },
    },
  },

  title: {
    align: 'center',
    style: {
      color: 'var(--aqua)',
      font: 'var(--font-titleBig)',
    },
    text: '',
    verticalAlign: 'middle',
    x: 0,
    y: 0,
  },

  tooltip: {
    enabled: false,
  },
};

export const HOURS_IN_DAY = 24;

export const DEFAULT_HOURS_PER_WEEK = 40;
export const DEFAULT_WEEK_OVERTIME = 3;
export const DEFAULT_MONTH_OVERTIME = 12;
export const DEFAULT_HOURS_OF_REST_PER_WEEK = 128;

export const WORK_HOURS_TOTAL_CARD = {
  backgoundColor: 'var(--white)',
  img: 'assets/img/activity/work-hours.svg',
  numberMonthHours: getWorksMonthDefaultHours(),
  numberWeekHours: DEFAULT_HOURS_PER_WEEK,
  progressBarColor: 'var(--primary)',
  progressBarSize: 0,
  title: 'work hours',
  value: null,
};

export const OVERTIME_TOTAL_CARD = {
  backgoundColor: 'var(--white)',
  img: 'assets/img/activity/overtimes.svg',
  numberMonthHours: DEFAULT_MONTH_OVERTIME,
  numberWeekHours: DEFAULT_WEEK_OVERTIME,
  progressBarColor: 'var(--blue1)',
  progressBarSize: 0,
  title: 'overtimes',
  value: null,
};

export const REST_HOURS_TOTAL_CARD = {
  backgoundColor: 'var(--blue1)',
  img: 'assets/img/activity/rest-hours.svg',
  numberMonthHours: getRestMonthDefaultHours(),
  numberWeekHours: DEFAULT_HOURS_OF_REST_PER_WEEK,
  progressBarColor: 'var(--yellow3)',
  progressBarSize:
    (getRestTime(PeriodType.Week) / DEFAULT_HOURS_OF_REST_PER_WEEK) * 100,
  title: 'rest hours',
  value: getRestTime(PeriodType.Week),
};

export const BASIC_ACTIVITY_CHART_MY_ACTIVITY_PAGE = {
  chart: {
    reflow: true,
    type: 'column',
  },
  legend: {
    itemDistance: 80,
    itemMarginBottom: 10,
    itemStyle: {
      color: 'var(--black)',
      fontFamily: 'var(--font-current)',
      fontSize: 'var(--offset-sm)',
      fontWeight: '300',
    },
    symbolHeight: 26,
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
    crosshair: true,
    gridLineDashStyle: null,
    gridLineWidth: 0,
    labels: {
      style: {
        color: 'var(--gray3)',
        fontFamily: 'var(--font-calendar)',
        fontSize: 'var(--offset-sm)',
        fontWeight: '500',
      },
    },
  },
  yAxis: {
    gridLineWidth: 0,
    lineWidth: 0,
    title: {
      style: {
        display: 'none',
      },
    },
  },
};

export const BASIC_OPTIONS_EFFICIENCY_PIE: Options = {
  accessibility: {
    enabled: true,
    point: {
      valueSuffix: '%',
    },
  },

  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
  },

  legend: {
    title: {
      style: {
        display: 'none',
      },
    },
  },

  plotOptions: {
    pie: {
      colors: ACTIVITY_CHART_PIE_COLORS,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      innerSize: '80%',
      showInLegend: true,
      states: {
        hover: {
          brightness: 0,
          halo: null,
        },
      },
    },
  },

  responsive: {
    rules: [
      {
        chartOptions: {
          title: {
            style: {
              fontSize: 'var(--offset-m)',
            },
          },
        },
        condition: {
          maxWidth: 260,
        },
      },
      {
        chartOptions: {
          title: {
            style: {
              fontSize: 'var(--offset-sm)',
            },
          },
        },
        condition: {
          maxWidth: 230,
        },
      },
      {
        chartOptions: {
          title: {
            style: {
              fontSize: 'var(--offset-d)',
            },
            y: -5,
          },
        },
        condition: {
          maxWidth: 190,
        },
      },
    ],
  },
  subtitle: {
    style: {
      display: 'none',
    },
    text: '',
  },
  title: {
    align: 'center',
    floating: true,
    style: {
      color: 'var(--primary)',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: 'var(--offset-l)',
      fontWeight: '600',
    },
    text: '',
    verticalAlign: 'middle',
  },
  tooltip: {
    enabled: false,
  },
};
