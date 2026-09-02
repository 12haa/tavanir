import Text from '../components/shared/Text';
import Tabs from '../components/ui/tabs/Tabs';

const tabs = [
  { id: 1, label: 'گزارش عملکرد', content: <Text>محتوای گزارش عملکرد</Text> },
  { id: 2, label: 'گزارش پیش بینی', content: <Text>محتوای گزارش پیش بینی</Text> },
  { id: 3, label: 'گزارش مدیریت بار', content: <Text>محتوای گزارش مدیریت بار</Text> },
  { id: 4, label: 'گزارش مصرف', content: <Text>محتوای گزارش مصرف</Text> },
  { id: 5, label: 'گزارش تقاضا', content: <Text>محتوای گزارش تقاضا</Text> },
  { id: 6, label: 'گزارش پاداش', content: <Text>محتوای گزارش پاداش</Text> },
  { id: 7, label: 'گزارش تکمیلی', content: <Text>محتوای گزارش تکمیلی</Text> },
];

function ActivityReport() {
  return (
    <div className="flex flex-col gap-4 pb-24">
      <Text className="text-2xl font-bold text-center">گزارش فعالیت</Text>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default ActivityReport;
