import { Chart, Title, Legend, Tooltip, XAxis, YAxis, PlotOptions } from '@highcharts/react';

import { AreaSplineSeries } from '@highcharts/react/series/AreaSpline';
import Text from '../../shared/Text';

export interface PredictionChartProps {
  hours?: string[];
  values?: number[];
}

const defaultHours = [
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const defaultValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.02, 0.55, 0.82, 0.91, 0.93, 0.72, 0.66, 0.79, 0.76, 0.6, 0.6, 0.6,
  0.6, 0,
];

export default function PredictionChart({
  hours = defaultHours,
  values = defaultValues,
}: PredictionChartProps) {
  return (
    <div dir="rtl" className="w-full py-6">
      <Chart
        height={350}
        backgroundColor="transparent"
        options={{
          credits: {
            enabled: false,
          },
        }}
      >
        <Title
          align="center"
          style={{
            fontFamily: 'DanaFaNum, sans-serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#333333',
          }}
        >
          <Text> گزارش پیش بینی روز جاری</Text>
        </Title>

        <Legend enabled={false} />

        <XAxis
          categories={hours}
          lineColor="#333333"
          lineWidth={1}
          tickLength={0}
          title={{
            text: 'زمان',
            style: {
              fontFamily: 'iran, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: '#333333',
            },
          }}
          labels={{
            style: {
              fontFamily: 'iran, sans-serif',
              fontSize: '15px',
              color: '#333333',
            },
          }}
        />

        <YAxis
          min={0}
          max={1.25}
          tickInterval={0.25}
          gridLineColor="#E2E2E2"
          gridLineWidth={1}
          title={{
            text: 'MW',
            style: {
              fontFamily: 'iran, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: '#333333',
            },
          }}
          labels={{
            style: {
              fontFamily: 'iran, sans-serif',
              fontSize: '11px',
              color: '#333333',
            },
          }}
        />

        <Tooltip
          shared={false}
          useHTML={true}
          backgroundColor="#FFFFFF"
          borderColor="#D5D5D5"
          borderWidth={1}
          borderRadius={4}
          shadow={true}
        />

        <PlotOptions
          areaspline={{
            lineWidth: 2.5,

            marker: {
              enabled: false,
            },

            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'rgba(0, 174, 239, 0.55)'],
                [0.5, 'rgba(0, 174, 239, 0.20)'],
                [1, 'rgba(0, 174, 239, 0.02)'],
              ],
            },
          }}
        />

        <AreaSplineSeries name="بار کاهش یافته" data={values} color="#00AEEF" />
      </Chart>
    </div>
  );
}
