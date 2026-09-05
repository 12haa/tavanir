import Text from '../components/shared/Text';
import Tabs from '../components/ui/tabs/Tabs';
import { tabContents } from '../constants/activity-report-tabs';

function ActivityReport() {
  return (
    <div className="flex flex-col gap-3 pb-24">
      <Text className="text-2xl font-bold text-center">گزارش فعالیت</Text>
      <Tabs tabs={tabContents} />
    </div>
  );
}

export default ActivityReport;
