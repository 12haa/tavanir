import IranMap from '../assets/svg/iranMap';
import CustomWrapper from '../components/shared/CustomWrapper';
import ColumnDrilldownChart from '../components/ui/charts/ColumnDrilldownChart';
import MapLegend from '../components/ui/charts/MapLegend';

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CustomWrapper
        className="w-full flex flex-row  py-12 gap-2 items-center justify-between"
        width={'100%'}
      >
        <div>
          <IranMap height={500} width={500} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[450px]">
            <ColumnDrilldownChart />
          </div>
          <div>
            <MapLegend />
          </div>
        </div>
        <div>
          <IranMap height={500} width={500} />
        </div>
      </CustomWrapper>
    </div>
  );
}

export default Home;
