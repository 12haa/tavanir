import { Chart, Legend, Title, Tooltip, XAxis, YAxis, PlotOptions } from '@highcharts/react';

import { AreaSeries } from '@highcharts/react/series/Area';
import Text from '../../shared/Text';

export interface LoadManagementPerformanceProps {
  hours?: string[];
  plannedValues?: number[];
  actualValues?: number[];
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

const defaultPlannedValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.45, 0.7, 0.85, 0.95, 0.8, 0.72, 0.82, 0.78, 0.65, 0.6, 0.6,
  0.55, 0,
];

const defaultActualValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.15, 0.4, 0.62, 0.78, 0.88, 0.74, 0.68, 0.76, 0.72, 0.6, 0.58,
  0.55, 0.5, 0,
];

export default function LoadManagementPerformance({
  hours = defaultHours,
  plannedValues = defaultPlannedValues,
  actualValues = defaultActualValues,
}: LoadManagementPerformanceProps) {
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
          <Text>برنامه های پیشبینی شده / عملکرد محقق شده مدیریت بار</Text>
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
          shared={true}
          useHTML={true}
          backgroundColor="#FFFFFF"
          borderColor="#D5D5D5"
          borderWidth={1}
          borderRadius={4}
          shadow={true}
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

            fillOpacity: 0.15,
          }}
        />

        <AreaSeries
          name="برنامه پیش‌بینی شده"
          data={plannedValues}
          color="#2c9054"
          options={{
            animation: {
              duration: 3500,
            },
          }}
        />

        <AreaSeries
          name="عملکرد محقق شده"
          data={actualValues}
          color="#00AEEF"
          options={{
            animation: {
              duration: 3500,
            },
          }}
        />
      </Chart>
    </div>
  );
}
