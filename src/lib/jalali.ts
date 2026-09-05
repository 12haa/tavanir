export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

function pad(value: number, length = 2): string {
  const text = String(Math.abs(value));
  let prefix = '';
  if (value < 0) prefix += '-';
  for (let i = text.length; i < length; i++) prefix += '0';
  return prefix + text;
}

function toPersianDigits(str: string): string {
  return str.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function stripPersianDigits(str: string): string {
  return String(str).replace(/[۰-۹]/g, (ch) => String(PERSIAN_DIGITS.indexOf(ch)));
}

/**
 * Convert a Gregorian JS Date to Jalali (Solar Hijri) date.
 * Same algorithm used internally by JalaliDatepicker (getToday).
 */
export function gregorianToJalali(date: Date): JalaliDate {
  let gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  let gDiv: number;
  if (gy > 1600) {
    gDiv = 979;
    gy -= 1600;
  } else {
    gDiv = 0;
    gy -= 621;
  }
  const gy2 = gm > 2 ? gy + 1 : gy;
  const dayDiffBase =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][gm - 1];
  let dayDiff = dayDiffBase % 12053;
  let year = gDiv + 33 * Math.floor(dayDiffBase / 12053) + 4 * Math.floor(dayDiff / 1461);
  dayDiff %= 1461;
  if (dayDiff > 365) {
    year += Math.floor((dayDiff - 1) / 365);
    dayDiff = (dayDiff - 1) % 365;
  }
  return {
    year,
    month: dayDiff < 186 ? 1 + Math.floor(dayDiff / 31) : 7 + Math.floor((dayDiff - 186) / 30),
    day: 1 + (dayDiff < 186 ? dayDiff % 31 : (dayDiff - 186) % 30),
  };
}

export function getTodayJalali(): JalaliDate {
  return gregorianToJalali(new Date());
}

export function formatJalaliDate(
  date: JalaliDate,
  options: { persianDigits?: boolean; separator?: string } = {},
): string {
  const sep = options.separator ?? '/';
  const western = `${pad(date.year, 4)}${sep}${pad(date.month, 2)}${sep}${pad(date.day, 2)}`;
  return options.persianDigits ? toPersianDigits(western) : western;
}

/**
 * Returns today's Jalali date as "YYYY/MM/DD".
 * @param persianDigits - if true returns "۱۴۰۵/۰۶/۱۴", otherwise "1405/06/14"
 */
export function getTodayJalaliString(persianDigits = false): string {
  return formatJalaliDate(getTodayJalali(), { persianDigits });
}

// Convenience for the datepicker's initial value (styled for persianDigits=true)
export function getTodayJalaliStringForPicker(persianDigits = true): string {
  return getTodayJalaliString(persianDigits);
}
