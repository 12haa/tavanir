import IranMap from '../assets/svg/iranMap';
import CustomWrapper from '../components/shared/CustomWrapper';

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CustomWrapper
        className="w-full flex flex-row px-4 gap-2 items-center justify-between"
        width={'100%'}
      >
        <div>
          <IranMap height={600} width={600}  />
        </div>
        <div>c</div>
        <div>
          <IranMap height={600} width={600} />
        </div>
      </CustomWrapper>
    </div>
  );
}

export default Home;
