/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { PointLabelObject } from 'highcharts';

import { NAMES_OF_THE_DAYS_OF_THE_WEEK } from '@shared/constants/constants';

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

export const MANAGER_DASHBOARD_CHART_X_RANGE = {
  chart: {
    scrollablePlotArea: {
      minWidth: 850,
      scrollPositionX: 1,
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
          return `<div style="width: ${this.point.shapeArgs.width}px;"class="x-range-dataLabel">
                        <div><img src=${this.point.custom.userPhoto}>
                            ${this.point.custom.userName}
                        </div>
                        <span>${this.point.custom.duration}h</span>
                  </div>`;
        },

        style: {
          textOutline: 'none',
        },

        useHTML: true,
      },

      pointWidth: 45,
      showInLegend: false,

      tooltip: {
        headerFormat:
          '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
        pointFormatter: function (this) {
          return `${this.custom.userName}: <b>${this.custom.duration}h</b><br/>`;
        },
        xDateFormat: '%Y-%m-%d',
      },
    },
  },

  title: {
    text: '',
  },

  xAxis: {
    labels: {
      align: 'center',
      allowOverlap: true,
      format: '{value:%e </br> %b}',
      rotation: 0,
      style: {
        textOverflow: 'none',
      },
    },
    lineWidth: 0,
    minorTicks: false,
    opposite: true,
    startOnTick: false,
    tickInterval: 0,
    tickPixelInterval: 70,
    tickWidth: 0,
    tickmarkPlacement: 'on',
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
