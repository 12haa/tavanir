import Text from '../components/shared/Text';
import Tabs from '../components/ui/tabs/Tabs';
import { forecastTabContents } from '../constants/forecast-report-tabs';

function ForecastReport() {
  return (
    <div className="flex flex-col gap-3 ">
      <Text className="text-xl font-semibold text-right w-full flex">
        گزارش های پیش بینی{' '}
      </Text>
      <Tabs tabs={forecastTabContents} />
    </div>
  );
}

export default ForecastReport;