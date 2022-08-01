import { PointLabelObject } from 'highcharts';

import { NAMES_OF_THE_DAYS_OF_THE_WEEK } from '@shared/constants/constants';

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
