/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Options, Point } from 'highcharts';

const ACTIVITY_CHART_PIE_COLORS = [
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
