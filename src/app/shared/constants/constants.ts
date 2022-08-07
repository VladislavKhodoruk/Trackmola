/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import pineappleIcon from '@iconify/icons-emojione-monotone/pineapple';
import peopleTeam20Regular from '@iconify/icons-fluent/people-team-20-regular';
import chartDonut3 from '@iconify/icons-tabler/chart-donut-3';
import fileTime from '@iconify/icons-tabler/file-time';
import layoutDashboard from '@iconify/icons-tabler/layout-dashboard';
import manualGearbox from '@iconify/icons-tabler/manual-gearbox';
import puzzleIcon from '@iconify/icons-tabler/puzzle';

import {
  Options,
  PointLabelObject,
  Tooltip,
  TooltipPositionerPointObject,
} from 'highcharts';

import { XRangeConfig } from '@pages/dashboard/interfaces/interface';

import { UserType } from '@shared/enums/enum';
import { NavigationItem } from '@shared/interfaces/interfaces';

const NAVIGATION_BASIC_ITEMS: NavigationItem[] = [
  {
    icon: layoutDashboard,
    label: 'Dashboard',
    routeLink: 'dashboard',
  },
  {
    icon: fileTime,
    label: 'My report',
    routeLink: 'report',
  },
  {
    icon: chartDonut3,
    label: 'My activity',
    routeLink: 'activity',
  },
  {
    icon: puzzleIcon,
    label: 'Projects',
    routeLink: 'projects',
  },
  {
    icon: pineappleIcon,
    label: 'Vacations',
    routeLink: 'vacations',
  },
];

const NAVIGATION_MANAGER_ITEMS: NavigationItem[] = [
  ...NAVIGATION_BASIC_ITEMS,
  {
    icon: peopleTeam20Regular,
    label: 'Team',
    routeLink: 'team',
  },
  {
    icon: manualGearbox,
    label: 'Report constructor',
    routeLink: 'report-constructor',
  },
];

export const getNavigationElems = (userType: string): NavigationItem[] =>
  userType === UserType.Employee
    ? NAVIGATION_BASIC_ITEMS
    : NAVIGATION_MANAGER_ITEMS;

export const DEFAULT_PHOTO_URL = 'assets/img/user.png';
export const MAX_USERS_PHOTO = 4;
export const ONE_DAY_IN_SECONDS = 86400000;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;
export const ONE_MONTH_IN_SECONDS = ONE_WEEK_IN_SECONDS * 4;
export const DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK = 40;

export const NAMES_OF_THE_DAYS_OF_THE_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SHORT_NAMES_OF_THE_WEEK_UPPERCASE =
  NAMES_OF_THE_DAYS_OF_THE_WEEK.map((i) => i.slice(0, 3).toUpperCase());

export const ONE_DIVISION_CALENDAR_BAR = 0.7;

export const MAXIMUM_VALUE_BAR = 5.625;

export const NUMBER_OF_DAYS_IN_A_WEEK = 7;

export const MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY = 8;

export const CLASS_DURATION_MORE_THAN_EIGHT = 'more';

export const dialogOpeningTime = '300ms';

export const CHAR_CREATE_COLOR = '0123456789ABCDEF';

export const NUMBER_CHAR_CREATE_COLOR = 6;

export const COLORS_FOR_TASKS = [
  'var(--task-violet)',
  'var(--task-marine)',
  'var(--task-sea)',
  'var(--task-violet2)',
  'var(--task-marine2)',
  'var(--task-sea2)',
  'var(--task-flover)',
  'var(--task-roses)',
  'var(--task-landscape)',
  'var(--task-salad)',
  'var(--task-lips)',
  'var(--task-peche)',
  'var(--task-salad2)',
  'var(--task-violet3)',
];

export const ROLES = ['employee', 'manager', 'admin', 'CTO'];

export const OUTPUT_RATE = 8;
export const HIGHEST_KPI = 1;

export const MANAGER_DASHBOARD_CHART_TREEMAP = {
  chart: {
    margin: 0,
    scrollablePlotArea: {
      minWidth: 500,
      scrollPositionX: 1,
    },
  },

  credits: {
    enabled: false,
  },
  plotOptions: {
    treemap: {
      borderColor: 'white',
      borderRadius: 8,
      borderWidth: 10,
      colorByPoint: true,
      colors: COLORS_FOR_TASKS,
      cursor: 'pointer',
      dataLabels: {
        align: 'left',
        allowOverlap: false,
        enabled: true,
        formatter: function (this: PointLabelObject) {
          const point = this.point as any;
          const percent = +this.point.value.toFixed(2);
          if (percent < 5 || point.shapeArgs.width < 100) return '';
          return `<span class="treemap-chart-item-label"><span>${percent}%</span>${this.point.name}</span>`;
        },
        padding: 0,
        useHTML: true,
        verticalAlign: 'bottom',
      },
      tooltip: {
        pointFormat: '{point.name}: <strong>{point.value:,.2f}%</strong>',
      },
    },
  },

  title: {
    text: '',
  },
};

export function managerDashboardChartXRange(config: XRangeConfig): Options {
  const { marginRight, width, height, period, weekDays } = config;
  return {
    chart: {
      height: height,
      margin: 0,
      marginBottom: -1,
      marginRight: marginRight,
      marginTop: -1,
      type: 'xrange',
      width: width,
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      xrange: {
        borderRadius: 24,
        cursor: 'pointer',

        dataLabels: {
          align: 'left',
          allowOverlap: true,
          enabled: true,
          formatter: function (this) {
            const point = this.point as any;
            if (point.shapeArgs.width > 200) {
              return `<div style="width: ${point.shapeArgs.width}px;"class="x-range-dataLabel">
                          <div><img src=${point.custom.userPhoto}>
                               ${point.custom.userName}
                          </div>
                          <span>${point.custom.duration}h</span>
                      </div>`;
            }
            return `<div style="width: ${point.shapeArgs.width}px;"class="x-range-dataLabel">
                        <div><img src=${point.custom.userPhoto}></div>
                        <span>${point.custom.duration}h</span>
                    </div>`;
          },
          padding: 0,

          style: {
            textOutline: 'none',
          },

          useHTML: true,
        },
        pointPadding: 0,
        pointWidth: 45,
        showInLegend: false,
        tooltip: {
          headerFormat:
            '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
          pointFormatter: function (this) {
            const that = this as any;
            return `${that.custom.userName}: <b>${that.custom.duration}h</b><br/>`;
          },
          xDateFormat: '%d.%m.%Y',
        },
      },
    },

    title: {
      text: '',
    },

    tooltip: {
      hideDelay: 100,
      outside: true,
      positioner: function (
        this: Tooltip,
        labelWidth: number,
        labelHeight: number,
        point: TooltipPositionerPointObject
      ) {
        return {
          x:
            point.plotX +
            this.chart.container.getBoundingClientRect().left -
            labelWidth / 2,
          y: this.chart.container.getBoundingClientRect().top - labelHeight,
        };
      },
    },

    xAxis: {
      dateTimeLabelFormats: {
        day: '%e %b',
      },
      endOnTick: false,
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      max: period.end,
      min: period.start,
      opposite: true,
      plotBands: weekDays,
      scrollbar: {
        enabled: true,
      },
      showLastLabel: false,
      startOnTick: true,
      tickInterval: 24 * 3600 * 1000,
      tickLength: 0,
      type: 'datetime',
    },

    yAxis: {
      categories: [],
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      title: {
        text: '',
      },
    },
  };
}
