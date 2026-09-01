import CustomWrapper from '../components/shared/CustomWrapper';

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CustomWrapper
        className="w-full flex flex-row px-4 gap-2 items-center justify-between"
        width={'100%'}
      >
        <div>a</div>
        <div>c</div>
        <div>b</div>
      </CustomWrapper>
    </div>
  );
}

export default Home;
