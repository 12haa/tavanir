import { useState } from 'react';
import CustomWrapper from '../../shared/Wrapper';
import Radio from '../../shared/Radio';
import JalaliDatepicker from '../datepicker/JalaliDatepicker';
import { getTodayJalaliString } from '../../../lib/jalali';
import Select from '../select/Select';
import MultiSelect from '../select/MultiSelect';

function MinMaxCooperation() {
  const [reportType, setReportType] = useState('comprehensive');

  const [startDate, setStartDate] = useState(() => getTodayJalaliString(true));
  const [endDate, setEndDate] = useState(() => getTodayJalaliString(true));

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
  const [extraSelect, setExtraSelect] = useState('');
  const [companyA, setCompanyA] = useState<string[]>([]);
  const [companyB, setCompanyB] = useState<string[]>([]);
  const [companyC, setCompanyC] = useState<string[]>([]);
  const [companyD, setCompanyD] = useState<string[]>([]);

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
          name="minmax-reportType"
          value="comprehensive"
          checked={reportType === 'comprehensive'}
          onChange={(e) => setReportType(e.target.value)}
        />
        <Radio
          label=" ورژن 2 تعداد مشترکین ثبت نام شده: همه مشترکین ثبت نام شده
تعداد مشترکین همکار: مشترکین دارای پاداش"
          name="minmax-reportType"
          value="reward"
          checked={reportType === 'reward'}
          onChange={(e) => setReportType(e.target.value)}
        />
      </div>
      <div className="mt-12 w-full flex flex-col gap-6">
        {/* Top – 5 columns: 2 dates + 3 selects (extra) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6">
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
            className="min-w-full"
          />
          <Select
            label="نوع ثبت نام"
            placeholder="انتخاب نوع"
            options={simpleOptions}
            value={registerType}
            onChange={setRegisterType}
          />
          <Select
            label="نوع همکاری"
            placeholder="انتخاب نوع"
            options={simpleOptions}
            value={extraSelect}
            onChange={setExtraSelect}
          />
        </div>

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
      </div>
    </CustomWrapper>
  );
}

export default MinMaxCooperation;
