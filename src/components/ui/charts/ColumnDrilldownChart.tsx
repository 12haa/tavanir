import {
  Chart,
  Title,
  Subtitle,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  PlotOptions,
} from '@highcharts/react';

import { ColumnSeries } from '@highcharts/react/series/Column';
import { Drilldown } from '@highcharts/react/modules/Drilldown';
import Text from '../../shared/Text';
import { colors } from '../../../lib/theme';

export default function ColumnDrilldownChart() {
  return (
    <div className="w-full">
      <Chart
        options={{
          accessibility: {
            announceNewData: {
              enabled: true,
            },
          },
        }}
      >
        <Title>
          <Text>درصد قرائت پروفیل بار تا تاریخ 1405/06/09</Text>
        </Title>

        <XAxis type="category" visible={true} />

        <YAxis
          title={{
            text: '',
          }}
          showEmpty={false}
          tickPositions={[0, 25, 50, 75, 100]}
          // visible={false}
        />

        <YAxis showEmpty={false} />

        <Legend enabled={false} />

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

        <Tooltip
          headerFormat='<span style="font-size:11px">{series.name}</span><br>'
          pointFormat={
            '<span style="color:{point.color}">{point.name}</span>: ' +
            '<b>{point.y:.2f}%</b> of weight<br/>'
          }
        />

        <ColumnSeries
          name="Ingredients"
          options={{
            colorByPoint: false,
            yAxis: 0,
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br/>',
              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.0f} g</b> in recipe<br/>',
            },
          }}
          data={[
            {
              name: 'کل',
              y: 70,
              drilldown: 'کل',
            },
            {
              name: 'پایا',
              y: 43,
              drilldown: 'پایا',
            },
            {
              name: 'فراب',
              y: 0,
              drilldown: 'فراب',
            },
            {
              name: 'بهینه سازان',
              y: 0,
              drilldown: 'بهینه سازان',
            },
          ]}
        />

        <Drilldown>
          <ColumnSeries
            id="Rolled Oats"
            
            name="Rolled Oats"
            data={[
              ['Carbohydrates', 67.7],
              ['Fat', 6.52],
              ['Protein', 13.15],
            ]}
          />

          <ColumnSeries
            id="Maple Syrup"
            name="Maple Syrup"
            data={[
              ['Carbohydrates', 67],
              ['Fat', 0.06],
              ['Protein', 0.04],
            ]}
          />

          <ColumnSeries
            id="Flaked Almonds"
            name="Flaked Almonds"
            data={[
              ['Carbohydrates', 21.6],
              ['Fat', 49.9],
              ['Protein', 21.2],
            ]}
          />

          <ColumnSeries
            id="Dried Berries"
            name="Dried Berries"
            data={[
              ['Carbohydrates', 65],
              ['Fat', 1],
              ['Protein', 1],
            ]}
          />
        </Drilldown>
      </Chart>
    </div>
  );
}
