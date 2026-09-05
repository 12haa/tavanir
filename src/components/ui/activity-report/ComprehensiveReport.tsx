import { useState } from 'react';
import CustomWrapper from '../../shared/Wrapper';
import Radio from '../../shared/Radio';
import JalaliDatepicker from '../datepicker/JalaliDatepicker';
import { getTodayJalaliString } from '../../../lib/jalali';
import Select from '../select/Select';
import MultiSelect from '../select/MultiSelect';

function ComprehensiveReport() {
  const [reportType, setReportType] = useState('comprehensive');

  const [startDate, setStartDate] = useState(() => getTodayJalaliString(true));
  const [endDate, setEndDate] = useState(() => getTodayJalaliString(true));

  // demo options – replace with real data / API
  const simpleOptions = [
    { value: 'all', label: 'همه' },
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
  ];
  const multiOptions = [
    { value: '1', label: 'شرکت توزیع برق تهران' },
    { value: '2', label: 'شرکت توزیع برق اصفهان' },
    { value: '3', label: 'شرکت توزیع برق مشهد' },
    { value: '4', label: 'شرکت توزیع برق شیراز' },
    { value: '5', label: 'شرکت توزیع برق تبریز' },
  ];

  const [weeklyRange, setWeeklyRange] = useState('');
  const [registerType, setRegisterType] = useState('');
  const [companyA, setCompanyA] = useState<string[]>([]);
  const [companyB, setCompanyB] = useState<string[]>([]);
  const [companyC, setCompanyC] = useState<string[]>([]);
  const [companyD, setCompanyD] = useState<string[]>([]);

  console.log('🚀 ~ ComprehensiveReport ~ startDate:', startDate, 'endDate:', endDate);

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
      <div className="mt-12 w-full flex flex-col gap-6">
        {/* Start / End dates */}
        <div className=" w-full  grid grid-cols-1 md:grid-cols-4 gap-6">
          <JalaliDatepicker
            label="تاریخ شروع"
            value={startDate}
            onChange={setStartDate}
            persianDigits
            placeholder="۱۴۰۴/۰۱/۰۱"
          />
          <JalaliDatepicker
            label="تاریخ پایان"
            value={endDate}
            onChange={setEndDate}
            persianDigits
            placeholder="۱۴۰۴/۰۱/۳۰"
          />
          <Select
            label="بازه های هفتگی "
            placeholder="انتخاب "
            options={simpleOptions}
            value={weeklyRange}
            onChange={setWeeklyRange}
            className="min-w-full "
          />
          <Select
            label="نوع ثبت نام"
            placeholder="انتخاب نوع"
            options={simpleOptions}
            value={registerType}
            onChange={setRegisterType}
          />
        </div>

        {/* Dropdowns – same border/shadow as datepicker (.jdp-input) via select.css */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MultiSelect
            label="شرکت‌های توزیع"
            placeholder="انتخاب شرکت‌ها"
            options={multiOptions}
            value={companyA}
            onChange={setCompanyA}
            searchable
            multiple
            searchPlaceholder="جستجو..."
          />
          <MultiSelect
            label="شرکت‌های توزیع"
            placeholder="انتخاب شرکت‌ها"
            options={multiOptions}
            value={companyB}
            onChange={setCompanyB}
            searchable
            multiple
            searchPlaceholder="جستجو..."
          />
          <MultiSelect
            label="شرکت‌های توزیع"
            placeholder="انتخاب شرکت‌ها"
            options={multiOptions}
            value={companyC}
            onChange={setCompanyC}
            searchable
            multiple
            searchPlaceholder="جستجو..."
          />
          <MultiSelect
            label="شرکت‌های توزیع"
            placeholder="انتخاب شرکت‌ها"
            options={multiOptions}
            value={companyD}
            onChange={setCompanyD}
            searchable
            multiple
            searchPlaceholder="جستجو..."
          />
        </div>
        {/* example single without multiple (controlled via prop) */}
        {/* <MultiSelect label="تک‌انتخاب با جستجو" options={simpleOptions} multiple={false} searchable /> */}
      </div>
    </CustomWrapper>
  );
}

export default ComprehensiveReport;
