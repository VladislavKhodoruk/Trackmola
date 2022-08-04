/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Options,
  PointLabelObject,
  Tooltip,
  TooltipPositionerPointObject,
} from 'highcharts';

import { XRangeConfig } from '../interfaces/interface';

import {
  COLORS_FOR_TASKS,
  NAMES_OF_THE_DAYS_OF_THE_WEEK,
} from '@shared/constants/constants';

export const DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK = 40;

export const MAX_VALUE_WEEK_REPORT_TIME = 100;

export const BASIC_ACTIVITY_CHART_DASHBOARD_PAGE = {
  chart: {
    type: 'column',
  },
  legend: {
    itemDistance: 80,
    itemMarginBottom: 20,
    itemStyle: {
      color: 'var(--black)',
      fontFamily: 'var(--font-current)',
      fontSize: 'var(--offset-sm)',
      fontWeight: '300',
    },
    symbolHeight: 26,
    symbolPadding: 12,
  },
  plotOptions: {
    series: {
      stacking: 'normal',
    },
  },
  title: {
    style: {
      fontSize: 'var(--offset-l)',
      fontWeight: 600,
    },
    text: '',
  },
  xAxis: {
    categories: NAMES_OF_THE_DAYS_OF_THE_WEEK.map((i) =>
      i.slice(0, 3).toUpperCase()
    ),
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
    lineWidth: 0,
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
          return `<span class="dashboard-main-chart-item-label"><span>${percent}%</span>${this.point.name}</span>`;
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
