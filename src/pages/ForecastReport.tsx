import Text from '../components/shared/Text';
import Tabs from '../components/ui/tabs/Tabs';
import { forecastTabContents } from '../constants/forecast-report-tabs';

function ForecastReport() {
  return (
    <div className="flex flex-col gap-3 pb-24">
      <Text className="text-2xl font-bold text-center">گزارش پیش بینی</Text>
      <Tabs tabs={forecastTabContents} />
    </div>
  );
}

export default ForecastReport;