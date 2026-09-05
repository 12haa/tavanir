import Text from '../components/shared/Text';
import Tabs from '../components/ui/tabs/Tabs';
import { tabContents } from '../constants/activity-report-tabs';

function ActivityReport() {
  return (
    <div className="flex flex-col gap-3 ">
      <Text className="text-xl font-semibold text-right w-full flex">
        گزارش های عملکرد کاهش بار{' '}
      </Text>
      <Tabs tabs={tabContents} />
    </div>
  );
}

export default ActivityReport;
