import ForecastReport from '../components/ui/activity-report/ForecastReport';

export const forecastTabContents = [
  { id: 1, label: 'جامع', content: <ForecastReport /> },
  {
    id: 2,
    label: 'بار forecase Peak',
    content: <ForecastReport />,
  },
  { id: 3, label: 'پیش بینی تعمیمی', content: <ForecastReport /> },
  { id: 4, label: 'تعيينات حرارتی', content: <ForecastReport /> },
];