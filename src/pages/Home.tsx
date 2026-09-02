import IranMap from '../assets/svg/iranMap';
import CustomWrapper from '../components/shared/CustomWrapper';
import ColumnDrilldownChart from '../components/ui/charts/ColumnDrilldownChart';
import MapLegend from '../components/ui/charts/MapLegend';
import PredictionChart from '../components/ui/charts/PredictionChart';

function Home() {
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
          <div className=" w-full max-w-[350px]">
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

      <CustomWrapper className="w-full" width={'65%'}>
        <PredictionChart />
      </CustomWrapper>
    </div>
  );
}

export default Home;
