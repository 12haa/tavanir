import { Chart, Title, Legend, Tooltip, XAxis, YAxis, PlotOptions } from '@highcharts/react';

import { ColumnSeries } from '@highcharts/react/series/Column';
import { Drilldown } from '@highcharts/react/modules/Drilldown';

import Text from '../../shared/Text';
import { colors } from '../../../lib/theme';

export default function ColumnDrilldownChart() {
  return (
    <div className="w-full">
      <Chart
        options={{
          credits: {
            enabled: false,
          },

          accessibility: {
            announceNewData: {
              enabled: true,
            },
          },

          // X-axis styling
          xAxis: {
            labels: {
              style: {
                // color: '#363630',
                color: 'red',
              },
            },
            lineColor: '#363630',
            tickColor: '#363630',
          },
        }}
      >
        {/* =========================
            TITLE
        ========================== */}
        <Title>
          <Text>درصد قرائت پروفیل بار تا تاریخ 1405/06/09</Text>
        </Title>

        {/* =========================
            X AXIS
        ========================== */}
        <XAxis type="category" visible={true} className="" />

        {/* =========================
            Y AXIS
        ========================== */}
        <YAxis
          showEmpty={false}
          min={0}
          max={100}
          tickPositions={[0, 25, 50, 75, 100]}
          title={{
            text: '',
          }}
        />

        {/* =========================
            LEGEND
        ========================== */}
        <Legend enabled={false} />

        {/* =========================
            PLOT OPTIONS
        ========================== */}
        <PlotOptions
          series={{
            borderWidth: 0,
          }}
          column={{
            colorByPoint: false,

            color: colors.chart.column,

            states: {
              hover: {
                color: colors.chart.columnHover,
              },
            },
          }}
        />

        {/* =========================
            TOOLTIP
        ========================== */}
        {/* <Tooltip
          headerFormat={'<span style="font-size:11px">{series.name}</span><br/>'}
          pointFormat={
            '<span style="color:{point.color}">{point.name}</span>: ' + '<b>{point.y:.0f}%</b><br/>'
          }
        /> */}

        {/* =========================
            MAIN SERIES
        ========================== */}
        <ColumnSeries
          name="پروفیل بار"
          options={{
            colorByPoint: false,
            yAxis: 0,

            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br/>',

              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.0f}%</b><br/>',
            },
          }}
          data={[
            {
              name: 'کل',
              y: 70,
              // drilldown: 'کل',
            },
            {
              name: 'پایا',
              y: 43,
              // drilldown: 'پایا',
            },
            {
              name: 'فراب',
              y: 0,
              // drilldown: 'فراب',
            },
            {
              name: 'بهینه سازان',
              y: 0,
              // drilldown: 'بهینه سازان',
            },
          ]}
        />

        {/* =========================
            DRILLDOWN
        ========================== */}
        {/* <Drilldown> */}
        {/* کل */}
        {/* <ColumnSeries
            id="کل"
            name="کل"
            data={[
              ['قرائت شده', 70],
              ['قرائت نشده', 30],
            ]}
          /> */}

        {/* پایا */}
        {/* <ColumnSeries
            id="پایا"
            name="پایا"
            data={[
              ['قرائت شده', 43],
              ['قرائت نشده', 57],
            ]}
          /> */}

        {/* فراب */}
        {/* <ColumnSeries
            id="فراب"
            className="text-black"
            name="فراب"
            data={[
              ['قرائت شده', 0],
              ['قرائت نشده', 100],
            ]}
          /> */}

        {/* بهینه سازان */}
        {/* <ColumnSeries
            id="بهینه سازان"
            name="بهینه سازان"
            data={[
              ['قرائت شده', 0],
              ['قرائت نشده', 100],
            ]}
          /> */}
        {/* </Drilldown> */}
      </Chart>
    </div>
  );
}
