import CustomWrapper from '../../shared/Wrapper';
import Text from '../../shared/Text';

function HourlyReport() {
  return (
    <CustomWrapper className="min-w-full rounded-md" showMessage={false}>
      <Text className="text-xl font-bold">Hour by Hour</Text>
    </CustomWrapper>
  );
}

export default HourlyReport;