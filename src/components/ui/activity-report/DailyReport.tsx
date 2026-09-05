import CustomWrapper from '../../shared/Wrapper';
import Text from '../../shared/Text';

function DailyReport() {
  return (
    <CustomWrapper className="min-w-full rounded-md" showMessage={false}>
      <Text className="text-xl font-bold">Daily</Text>
    </CustomWrapper>
  );
}

export default DailyReport;