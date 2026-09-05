import AverageHoursCooperationPercentage from '../components/ui/activity-report/AverageHoursCooperationPercentage';
import ComprehensiveReport from '../components/ui/activity-report/ComprehensiveReport';
import DailyReport from '../components/ui/activity-report/DailyReport';
import DayNightPeakLoadReduction from '../components/ui/activity-report/DayNightPeakLoadReduction';
import HourlyReport from '../components/ui/activity-report/HourlyReport';
import MinMaxCooperation from '../components/ui/activity-report/MinMaxCooperation';
import SpecificDayHourLoadReduction from '../components/ui/activity-report/SpecificDayHourLoadReduction';

export const tabContents = [
  { id: 1, label: 'جامع', content: <ComprehensiveReport /> },
  {
    id: 2,
    label: 'متوسط ساعت و درصد همکاری',
    content: <AverageHoursCooperationPercentage />,
  },
  { id: 3, label: 'ساعت به ساعت', content: <HourlyReport /> },
  { id: 4, label: 'کاهش بار در روز و ساعت خاص', content: <SpecificDayHourLoadReduction /> },
  { id: 5, label: 'روزانه', content: <DailyReport /> },
  { id: 6, label: 'حداقل و حداکثر همکاری', content: <MinMaxCooperation /> },
  {
    id: 7,
    label: 'کاهش بار در پیک روز و شب',
    content: <DayNightPeakLoadReduction />,
  },
];