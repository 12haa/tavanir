import { useState } from 'react';
import CustomWrapper from '../../shared/Wrapper';
import Radio from '../../shared/Radio';
import JalaliDatepicker from '../datepicker/JalaliDatepicker';
import { getTodayJalaliString } from '../../../lib/jalali';

function ComprehensiveReport() {
  const [reportType, setReportType] = useState('comprehensive');

  const [selectedDate, setSelectedDate] = useState(() => getTodayJalaliString(true));
  console.log('🚀 ~ ComprehensiveReport ~ selectedDate:', selectedDate);

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
      <div className="mt-12 w-full">
        <div>
          <JalaliDatepicker
            value={selectedDate}
            onChange={setSelectedDate}
            persianDigits
            className="min-w-[400px]"
          />
        </div>
      </div>
    </CustomWrapper>
  );
}

export default ComprehensiveReport;
