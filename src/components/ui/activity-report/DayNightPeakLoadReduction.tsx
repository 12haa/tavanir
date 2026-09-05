import CustomWrapper from '../../shared/Wrapper';
import Text from '../../shared/Text';

function DayNightPeakLoadReduction() {
  return (
    <CustomWrapper className="min-w-full rounded-md" showMessage={false}>
      <Text className="text-xl font-bold">Load Reduction at Day and Night Peak</Text>
    </CustomWrapper>
  );
}

export default DayNightPeakLoadReduction;