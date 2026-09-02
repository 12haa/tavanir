import { useState } from 'react';
import IranMap from '../assets/svg/iranMap';
import CustomWrapper from '../components/shared/Wrapper';
import Divider from '../components/shared/Divider';
import Text from '../components/shared/Text';
import ChartButton from '../components/ui/charts/ChartButton';
import ColumnDrilldownChart from '../components/ui/charts/ColumnDrilldownChart';
import MapLegend from '../components/ui/charts/MapLegend';
import PredictionChart from '../components/ui/charts/PredictionChart';
import DemandConsumptionReport from '../components/ui/charts/DemandConsumptionReport';

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
      {/* Top section */}
      <CustomWrapper
        className="w-full flex flex-col md:flex-row py-12 gap-2 items-center justify-between"
        width="100%"
      >
        <div className="w-full md:w-auto flex justify-center">
          <IranMap height={500} width={500} className="max-w-full h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-auto">
          <div className="w-full max-w-[350px] lg:max-w-[550px]">
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

      {/* Bottom section */}
      <div className="flex gap-4 items-start">
        {/* Prediction chart */}
        <CustomWrapper
          className="flex-5/5 flex flex-col items-center"
          width="75%"
          height={580}
          showMessage={false}
        >
          <PredictionChart hours={hours} values={chartData[selectedIndex].values} />

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {chartData.map((item, index) => (
              <ChartButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                {item.label}
              </ChartButton>
            ))}
          </div>
        </CustomWrapper>

        {/* Actions / discrepancies */}
        <CustomWrapper className="flex-2/5" width="25%" showMessage={false} height={580}>
          <div className="flex items-center justify-between gap-4 pt-8 pb-2">
            <Text className="text-md font-semibold text-black">مغایرت / نیازمند اقدام</Text>

            <Text className="text-md font-semibold ml-20 text-black shrink-0">تعداد</Text>
          </div>

          <Divider className="my-1" />

          {[
            {
              text: 'دیماند قراردادی و دیماند مصرفی مشترکین',
              number: 0,
            },
            {
              text: 'ضرایب کنتور',
              number: 1,
            },
            {
              text: 'تکمیل سقف همکاری مولد خودتامین',
              number: 0,
            },
            {
              text: 'فرم های تکمیل نشده',
              number: 0,
            },
            {
              text: 'تکمیل برآورد انرژی شهریور ماه مولدهای متقاضی سوخت',
              number: 0,
            },
          ].map((item, index) => (
            <div key={index} className="w-full min-w-0">
              <div className="flex items-center justify-between gap-3 py-3 w-full min-w-0">
                {/* Text is allowed to shrink */}
                <Text className="text-md text-black flex-1 min-w-0">{item.text}</Text>

                {/* Number + button must never shrink */}
                <div className="flex items-center gap-2 shrink-0">
                  <Text className="text-md font-medium text-black shrink-0">{item.number}</Text>

                  <ChartButton selected className="shrink-0 whitespace-nowrap">
                    دریافت فایل
                  </ChartButton>
                </div>
              </div>

              {index < 2 && <Divider className="my-1" />}
            </div>
          ))}
        </CustomWrapper>
      </div>
      <CustomWrapper width="73%" showMessage={false} height={580}>
        <DemandConsumptionReport />
      </CustomWrapper>
    </div>
  );
}

export default Home;
