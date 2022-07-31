/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { PointLabelObject } from 'highcharts';

import { NAMES_OF_THE_DAYS_OF_THE_WEEK } from '@shared/constants/constants';
import { Period } from '@shared/interfaces/interfaces';

export const DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK = 40;

export const MAX_VALUE_WEEK_REPORT_TIME = 100;

export const BASIC_ACTIVITY_CHART_DASHBOARD_PAGE = {
  chart: {
    borderColor: 'var(--gray)',
    borderRadius: 15,
    borderWidth: 1,
    height: 575,
    margin: [70, 40, 124, 40],
    type: 'column',
    width: 890,
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
    text: 'Project hours',
    x: -300,
    y: 40,
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
      cursor: 'pointer',
      dataLabels: {
        align: 'left',
        allowOverlap: false,
        enabled: true,
        formatter: function (this: PointLabelObject) {
          const percent = +this.point.value.toFixed(2);
          if (percent < 5) return '';
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

interface XRangeConfig {
  minWidthScroll: number;
  period: Period;
  weekDays: {
    color: string;
    from: number;
    to: number;
  }[];
}

export function managerDashboardChartXRange(config: XRangeConfig) {
  const { minWidthScroll, period, weekDays } = config;
  return {
    chart: {
      marginBottom: 1,
      marginLeft: 1,
      marginRight: 1,
      scrollablePlotArea: {
        minHeight: 500,
        minWidth: minWidthScroll,
        opacity: 0,
        scrollPositionX: 1,
        scrollPositionY: 1,
      },
      type: 'xrange',
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
            if (this.point.shapeArgs.width > 200) {
              return `<div style="width: ${this.point.shapeArgs.width}px;"class="x-range-dataLabel">
                          <div><img src=${this.point.custom.userPhoto}>
                               ${this.point.custom.userName}
                          </div>
                          <span>${this.point.custom.duration}h</span>
                      </div>`;
            }
            return `<div style="width: ${this.point.shapeArgs.width}px;"class="x-range-dataLabel">
                        <div><img src=${this.point.custom.userPhoto}></div>
                        <span>${this.point.custom.duration}h</span>
                    </div>`;
          },
          padding: 0,

          style: {
            textOutline: 'none',
          },

          useHTML: true,
        },
        minPointLength: 3,
        pointPadding: 0,
        pointWidth: 45,
        showInLegend: false,
        tooltip: {
          headerFormat:
            '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
          pointFormatter: function (this) {
            return `${this.custom.userName}: <b>${this.custom.duration}h</b><br/>`;
          },
          xDateFormat: '%d.%m.%Y',
        },
      },
    },

    title: {
      text: '',
    },

    xAxis: {
      dateTimeLabelFormats: {
        day: '%e %b',
      },
      endOnTick: false,
      gridLineWidth: 1,
      labels: {
        align: 'left',

        formatter: function (this) {
          const label = this.axis.defaultLabelFormatter.call(this);
          return `<span class="x-range-xAxis-label">${label}</span>`;
        },
        rotation: 0,
        style: {
          textAlign: 'center',
          textOverflow: 'none',
        },
        useHTML: true,
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
      gridLineWidth: 1,
      labels: {
        enabled: false,
      },
      scrollbar: {
        enabled: true,
      },
      title: {
        text: '',
      },
    },
  };
}
