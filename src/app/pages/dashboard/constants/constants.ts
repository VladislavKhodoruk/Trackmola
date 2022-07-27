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
  series: [
    {
      layoutAlgorithm: 'stripes',
      levels: [
        {
          dataLabels: {
            align: 'left',
            enabled: true,
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
            },
            verticalAlign: 'top',
          },
          layoutAlgorithm: 'sliceAndDice',
          level: 1,
        },
      ],
      type: 'treemap',
    },
  ],
  title: {
    text: 'Fruit consumption',
  },
};
