import { useState } from 'react';
import IranMap from '../assets/svg/iranMap';
import CustomWrapper from '../components/shared/Wrapper';
import CustomButton from '../components/ui/charts/ChartButton';
import ColumnDrilldownChart from '../components/ui/charts/ColumnDrilldownChart';
import MapLegend from '../components/ui/charts/MapLegend';
import PredictionChart from '../components/ui/charts/PredictionChart';

const hours = [
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

const chartData = [
  {
    label: 'تولید (صنعت و معدن)',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.02, 0.55, 0.82, 0.91, 0.93, 0.72, 0.66, 0.79, 0.76, 0.6, 0.6,
      0.6, 0.6, 0,
    ],
  },
  {
    label: 'تولید (آب و کشاورزی)',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.6, 0.85, 0.95, 0.98, 0.78, 0.7, 0.82, 0.8, 0.65, 0.65,
      0.65, 0.65, 0,
    ],
  },
  {
    label: 'مصارف عمومی',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.15, 0.7, 0.9, 1.0, 1.05, 0.85, 0.75, 0.88, 0.85, 0.7, 0.7,
      0.7, 0.7, 0,
    ],
  },
  {
    label: 'سایر مصارف',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.08, 0.5, 0.78, 0.88, 0.9, 0.7, 0.64, 0.75, 0.72, 0.58, 0.58,
      0.58, 0.58, 0,
    ],
  },
  {
    label: 'مولد خود تامین',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.12, 0.65, 0.88, 0.97, 1.0, 0.8, 0.72, 0.85, 0.82, 0.68, 0.68,
      0.68, 0.68, 0,
    ],
  },
  {
    label: 'کا تعرفه ها',
    values: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.48, 0.75, 0.85, 0.88, 0.68, 0.62, 0.73, 0.7, 0.55, 0.55,
      0.55, 0.55, 0,
    ],
  },
];

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 pb-24">
      <CustomWrapper
        className="w-full flex flex-col md:flex-row py-12 gap-2 items-center justify-between"
        width={'100%'}
      >
        <div className="w-full md:w-auto flex justify-center">
          <IranMap height={500} width={500} className="max-w-full h-auto" />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-auto">
          <div className="w-full max-w-[350px]">
            <ColumnDrilldownChart />
          </div>
          <div>
            <MapLegend />
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <IranMap height={500} width={500} className="max-w-full h-auto" />
        </div>
      </CustomWrapper>

      <CustomWrapper
        className="w-full flex flex-col items-center"
        width={'65%'}
        height={600}
        showMessage={false}
      >
        <PredictionChart hours={hours} values={chartData[selectedIndex].values} />
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {chartData.map((item, index) => (
            <CustomButton
              key={index}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              {item.label}
            </CustomButton>
          ))}
        </div>
      </CustomWrapper>
    </div>
  );
}

export default Home;
