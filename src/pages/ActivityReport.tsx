import Text from '../components/shared/Text';
import CustomWrapper from '../components/shared/Wrapper';
import Tabs from '../components/ui/tabs/Tabs';
import { tabContents } from '../constants/activity-report-tabs';



const tabs = tabContents.map((tab) => ({
  ...tab,
  content: <CustomWrapper className=" min-w-full rounded-md">{tab.content}</CustomWrapper>,
}));
function ActivityReport() {
  return (
    <div className="flex flex-col gap-3 pb-24">
      <Text className="text-2xl font-bold text-center">گزارش فعالیت</Text>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default ActivityReport;
