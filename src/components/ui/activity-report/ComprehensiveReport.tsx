import { useState } from 'react';
import CustomWrapper from '../../shared/Wrapper';
import Radio from '../../shared/Radio';
import JalaliDatepicker from '../datepicker/JalaliDatepicker';

function ComprehensiveReport() {
  const [reportType, setReportType] = useState('comprehensive');

  const today = new Date();

  const jalaliDate = new Intl.DateTimeFormat('persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(today);

  return (
    <CustomWrapper
      className="min-w-full rounded-md min-h-125 py-5 px-6"
      showMessage={false}
      showExcel={true}
      showSearch={true}
    >
      <div className="mt-5 flex justify-start gap-40">
        <Radio
          label=" ورژن 1 تعداد مشترکین ثبت نام شده: همه مشترکین ثبت نام شده
تعداد مشترکین همکار: مشترکین دارای دیماند کاهش یافته"
          name="reportType"
          value="comprehensive"
          checked={reportType === 'comprehensive'}
          onChange={(e) => setReportType(e.target.value)}
        />
        <Radio
          label=" ورژن 2 تعداد مشترکین ثبت نام شده: همه مشترکین ثبت نام شده
تعداد مشترکین همکار: مشترکین دارای پاداش"
          name="reportType"
          value="reward"
          checked={reportType === 'reward'}
          onChange={(e) => setReportType(e.target.value)}
        />
      </div>
      <div className="mt-4 w-full">
        <div>
          <JalaliDatepicker defaultValue="" placeholder={jalaliDate}  />
        </div>
      </div>
    </CustomWrapper>
  );
}

export default ComprehensiveReport;
