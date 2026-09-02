import { Chart, Legend, Title, Tooltip, XAxis, YAxis, PlotOptions } from '@highcharts/react';

import { AreaSeries } from '@highcharts/react/series/Area';
import Text from '../../shared/Text';

export interface DemandConsumptionReportProps {
  hours?: string[];
  values?: number[];
  areaValues?: number[];
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

const defaultValues = new Array(defaultHours.length).fill(0);

const defaultAreaValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.45, 0.7, 0.85, 0.95, 0.8, 0.72, 0.82, 0.78, 0.65, 0.6, 0.6,
  0.55, 0,
];

export default function DemandConsumptionReport({
  hours = defaultHours,
  values = defaultValues,
  areaValues = defaultAreaValues,
}: DemandConsumptionReportProps) {
  const zeroValues = new Array(hours.length).fill(0);

  return (
    <div dir="rtl" className="w-full py-6">
      <Chart
        height={350}
        backgroundColor="transparent"
        options={{
          credits: {
            enabled: false,
          },

          chart: {
            animation: {
              duration: 3500,
            },
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
          <Text>گزارش تقاضا و مصرف</Text>
        </Title>

        <Legend
          enabled={true}
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          itemStyle={{
            fontFamily: 'iran, sans-serif',
            fontSize: '13px',
            fontWeight: '400',
            color: '#333333',
          }}
        />

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
          min={-1}
          max={1}
          startOnTick={false}
          endOnTick={false}
          tickPositions={[0]}
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
          useHTML
          backgroundColor="#FFFFFF"
          borderColor="#D5D5D5"
          borderWidth={1}
          borderRadius={4}
          shadow
        />

        <PlotOptions
          area={{
            lineWidth: 2.5,

            marker: {
              enabled: false,
            },

            animation: {
              duration: 3500,
            },

            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },

              stops: [
                [0, 'rgba(44, 144, 84, 0.30)'],
                [0.5, 'rgba(44, 144, 84, 0.12)'],
                [1, 'rgba(44, 144, 84, 0.02)'],
              ],
            },
          }}
        />

        <AreaSeries
          name="تقاضا و مصرف"
          data={zeroValues}
          color="#2c9054"
          options={{
            animation: {
              duration: 3500,
            },
          }}
        />

        {/* <AreaSeries
          name="مصرف واقعی"
          data={areaValues}
          color="#00AEEF"
          options={{
            animation: {
              duration: 3500,
            },
          }}
        /> */}
      </Chart>
    </div>
  );
}
