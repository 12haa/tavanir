import ForecastReport from '../components/ui/activity-report/ForecastReport';
import ForecastHourlyReport from '../components/ui/activity-report/ForecastHourlyReport';
import ForecastDailyReport from '../components/ui/activity-report/ForecastDailyReport';
import ForecastMinMax from '../components/ui/activity-report/ForecastMinMax';
import ForecastDayNight from '../components/ui/activity-report/ForecastDayNight';

export const forecastTabContents = [
  { id: 1, label: 'جامع', content: <ForecastReport /> },
  {
    id: 2,
    label: 'ساعت به ساعت ',
    content: <ForecastHourlyReport />,
  },
  {
    id: 3,
    label: 'کاهش بار در روز و ساعت خاص',
    content: <ForecastDayNight />,
  },
  { id: 4, label: 'روزانه', content: <ForecastDailyReport /> },
  {
    id: 5,
    label: 'حداقل و حداکثر همکاری',
    content: <ForecastMinMax />,
  },
  {
    id: 6,
    label: 'کاهش بار در پیک روز و شب',
    content: <ForecastDayNight />,
  },
];