export const DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK = 40;

export const MAX_VALUE_WEEK_REPORT_TIME = 100;

export const SHORT_NAMES_OF_THE_WEEK_UPPERCASE = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export const BASIC_ACTIVITY_CHART_DASHBOARD_PAGE = {
  chart: {
    type: 'column',
    borderColor: 'var(--gray)',
    borderRadius: 15,
    borderWidth: 1,
    margin: [130, 130, 170, 130],
    width: 880,
    height: 594,
  },
  plotOptions: {
    series: {
      stacking: 'percent',
    },
  },
  title: {
    text: '',
    style: {
      fontSize: 'var(--offset-l)',
    },
    x: -280,
    y: 40,
  },
  xAxis: {
    categories: SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
    crosshair: true,
    gridLineDashStyle: null,
    gridLineWidth: 0,
    lineWidth: 0,
    labels: {
      style: {
        fontWeight: '500',
        fontFamily: 'var(--font-calendar)',
        fontSize: 'var(--offset-sm)',
        color: 'var(--gray3)',
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
  legend: {
    floating: true,
    itemDistance: 80,
    itemMarginBottom: 50,
    symbolHeight: 26,
    itemStyle: {
      fontFamily: 'var(--font-current)',
      fontSize: 'var(--offset-sm)',
      color: 'var(--black)',
      fontWeight: '300',
    },
  },
}


