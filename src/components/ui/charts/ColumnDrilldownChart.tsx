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
            text: 'Percent per weight',
          }}
          showEmpty={false}
          // visible={false}
        />

        <YAxis showEmpty={false} />

        <Legend enabled={false} />

        <PlotOptions
          series={{
            borderWidth: 0,
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
            colorByPoint: true,
            yAxis: 1,
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br/>',
              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.0f} g</b> in recipe<br/>',
            },
          }}
          data={[
            {
              name: 'Rolled Oats',
              y: 300,
              drilldown: 'Rolled Oats',
            },
            {
              name: 'Maple Syrup',
              y: 170,
              drilldown: 'Maple Syrup',
            },
            {
              name: 'Flaked Almonds',
              y: 100,
              drilldown: 'Flaked Almonds',
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

          <ColumnSeries
            id="Sunflower Seeds"
            name="Sunflower Seeds"
            data={[
              ['Carbohydrates', 20],
              ['Fat', 51.46],
              ['Protein', 20.78],
            ]}
          />

          <ColumnSeries
            id="Sesame Seeds"
            name="Sesame Seeds"
            data={[
              ['Carbohydrates', 23.4],
              ['Fat', 49.7],
              ['Protein', 17.7],
            ]}
          />

          <ColumnSeries
            id="Pumpkin Seeds"
            name="Pumpkin Seeds"
            data={[
              ['Carbohydrates', 14.71],
              ['Fat', 49.05],
              ['Protein', 29.84],
            ]}
          />

          <ColumnSeries
            id="Coconut"
            name="Coconut"
            data={[
              ['Carbohydrates', 15.23],
              ['Fat', 33.49],
              ['Protein', 3.33],
            ]}
          />

          <ColumnSeries
            id="Honey"
            name="Honey"
            data={[
              ['Carbohydrates', 82],
              ['Fat', 0],
              ['Protein', 0.3],
            ]}
          />

          <ColumnSeries
            id="Vegetable Oil"
            name="Vegetable Oil"
            data={[
              ['Carbohydrates', 0],
              ['Fat', 96],
              ['Protein', 0],
            ]}
          />

          <ColumnSeries
            id="Vanilla Extract"
            name="Vanilla Extract"
            data={[
              ['Carbohydrates', 12.6],
              ['Fat', 0],
              ['Protein', 0],
            ]}
          />
        </Drilldown>
      </Chart>
    </div>
  );
}
