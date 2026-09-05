import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, CSSProperties, Ref } from 'react';
import './jalaliDatepicker.css';

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

export interface JalaliTime {
  hour: number;
  minute: number;
  second: number;
}

export interface JalaliDateTime {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export interface SeparatorChars {
  date?: string;
  between?: string;
  time?: string;
}

export interface DayObject extends JalaliDate {
  inBeforeMonth: boolean;
  inAfterMonth: boolean;
  isValid: boolean;
  isHollyDay: boolean;
  className: string;
}

export interface JalaliDatepickerProps {
  /** Controlled input value (Jalali string, e.g. "1403/05/21 14:00:00") */
  value?: string;
  /** Uncontrolled initial input value */
  defaultValue?: string;
  /** Called whenever a value is committed (date/time selection or empty) */
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  name?: string;

  /* ---- options (mirror jalalidatepicker options) ---- */
  days?: string[];
  months?: string[];
  today?: JalaliDate;
  initDate?: JalaliDate;
  initTime?: JalaliTime;
  hasSecond?: boolean;
  date?: boolean;
  time?: boolean;
  onlyDate?: boolean;
  onlyTime?: boolean;
  minDate?: JalaliDate;
  maxDate?: JalaliDate;
  minTime?: JalaliTime;
  maxTime?: JalaliTime;
  separatorChars?: SeparatorChars;
  persianDigits?: boolean;
  zIndex?: number;
  autoShow?: boolean;
  autoHide?: boolean;
  hideAfterChange?: boolean;
  plusHtml?: string;
  minusHtml?: string;
  changeMonthRotateYear?: boolean;
  showTodayBtn?: boolean;
  showEmptyBtn?: boolean;
  showCloseBtn?: boolean;
  autoReadOnlyInput?: boolean;
  useDropDownYears?: boolean;
  topSpace?: number;
  bottomSpace?: number;
  overflowSpace?: number;
  dayRendering?: (day: DayObject, input: HTMLInputElement | null) => Partial<DayObject> | void;
}

export interface JalaliDatepickerHandle {
  show: () => void;
  hide: () => void;
}

const DEFAULT_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const DEFAULT_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];
const DEFAULT_PLUS_HTML =
  '<svg viewBox="0 0 1024 1024"><g><path d="M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"></path></g></svg>';
const DEFAULT_MINUS_HTML =
  '<svg viewBox="0 0 1024 1024"><g><path d="M810 554h-596v-84h596v84z"></path></g></svg>';

const IS_MOBILE = /iphone|ipod|android|ie|blackberry|fennec/.test(
  String(typeof navigator !== 'undefined' ? navigator.userAgent : '').toLowerCase(),
);

/* ------------------------------------------------------ helpers */

function isPlainObject(value: unknown): boolean {
  if (!value || typeof value !== 'object' || (value as { nodeType?: number }).nodeType) return false;
  try {
    return JSON.stringify(value) === '{}';
  } catch {
    return true;
  }
}

function merge(...values: unknown[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (isPlainObject(value)) {
      for (const key of Object.keys(value as object)) {
        const v = (value as Record<string, unknown>)[key];
        if (v === undefined) continue;
        if (isPlainObject(v) || Array.isArray(v)) result[key] = merge(result[key], v);
        else result[key] = v;
      }
    }
  }
  return result;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function mod(a: number, b: number): number {
  return Math.abs(a - b * Math.floor(a / b));
}

function pad(value: number, length = 2): string {
  const text = String(Math.abs(value));
  let prefix = '';
  if (value < 0) prefix += '-';
  for (let i = text.length; i < length; i++) prefix += '0';
  return prefix + text;
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

function toDisplay(value: number, persian: boolean): string {
  const text = String(value);
  return persian ? text.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]) : text;
}

function isLeapYear(year: number): boolean {
  const leaps = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324,
    2394, 2456, 3178,
  ];
  const floorDiv = (v: number, d: number) => ~~(v / d);
  let acc = 0;
  let prev = -14;
  let anchor = leaps[0];
  for (let u = 1; u < leaps.length; u++) {
    const d = leaps[u];
    acc = d - anchor;
    if (year < d) break;
    prev = prev + 8 * floorDiv(acc, 33) + floorDiv(mod(acc, 33), 4);
    anchor = d;
  }
  let c = year - anchor;
  if (acc - c < 6) c = c - acc + 33 * floorDiv(acc + 4, 33);
  let e = mod(mod(c + 1, 33) - 1, 4);
  if (e === -1) e = 4;
  return e === 0;
}

function jalaliDayOfWeek(year: number, month: number, day: number): number {
  const dayIndexOf = (m: number, d: number) =>
    m < 8 ? 31 * (m - 1) + d : 186 + 30 * (m - 7) + d;
  const diff = (
    t: number,
    tm: number,
    td: number,
    o: number,
    om: number,
    od: number,
  ): number => {
    let s = dayIndexOf(om, od) - dayIndexOf(tm, td);
    const h = t < o ? o : t;
    const u = t < o ? t : o;
    for (let w = u; w < h; w++) {
      s += isLeapYear(w) ? (t < o ? 366 : -366) : t < o ? 365 : -365;
    }
    return s;
  };
  return mod(diff(year, month, day, 1392, 3, 25), 7);
}

const FIXED_MONTH_DAYS = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 0];

function daysInJalaliMonth(year: number, month: number): number {
  if (month === 12) return isLeapYear(year) ? 30 : 29;
  return FIXED_MONTH_DAYS[month];
}

function getToday(): JalaliDate {
  const now = new Date();
  let gy = now.getFullYear();
  const gm = now.getMonth() + 1;
  const gd = now.getDate();
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

/* ------------------------------------------------------ context */

interface Ctx {
  sep: Required<SeparatorChars>;
  date: boolean;
  time: boolean;
  hasSecond: boolean;
  days: string[];
  months: string[];
  initDate: JalaliDate;
  initTime: JalaliTime;
  minDate: JalaliDate | Record<string, never>;
  maxDate: JalaliDate | Record<string, never>;
  minTime: JalaliTime | Record<string, never>;
  maxTime: JalaliTime | Record<string, never>;
  persianDigits: boolean;
  today: JalaliDate;
}

interface ResolvedOptions {
  hasSecond: boolean;
  time: boolean;
  date: boolean;
  minDate: JalaliDate | Record<string, never>;
  maxDate: JalaliDate | Record<string, never>;
  minTime: JalaliTime | Record<string, never>;
  maxTime: JalaliTime | Record<string, never>;
  sep: Required<SeparatorChars>;
  persianDigits: boolean;
  days: string[];
  months: string[];
  initDate?: JalaliDate;
  initTime?: JalaliTime;
  today: JalaliDate;
  autoShow: boolean;
  autoHide: boolean;
  hideAfterChange: boolean;
  plusHtml: string;
  minusHtml: string;
  changeMonthRotateYear: boolean;
  showTodayBtn: boolean;
  showEmptyBtn: boolean;
  showCloseBtn: boolean;
  autoReadOnlyInput: boolean;
  useDropDownYears: boolean;
  topSpace: number;
  bottomSpace: number;
  overflowSpace: number;
  zIndex: number;
  dayRendering?: (day: DayObject, input: HTMLInputElement | null) => Partial<DayObject> | void;
}

function resolveOptions(props: JalaliDatepickerProps, today: JalaliDate): ResolvedOptions {
  const sep: Required<SeparatorChars> = {
    date: '/',
    between: ' ',
    time: ':',
    ...props.separatorChars,
  };
  const onlyDate = props.onlyDate === true;
  const onlyTime = props.onlyTime === true;
  const date = !onlyTime && (props.date !== undefined ? props.date : onlyDate ? true : true);
  const time = !onlyDate && (props.time !== undefined ? props.time : onlyTime ? true : false);
  return {
    hasSecond: props.hasSecond !== undefined ? props.hasSecond : true,
    time,
    date,
    minDate: props.minDate ? clone(props.minDate) : {},
    maxDate: props.maxDate ? clone(props.maxDate) : {},
    minTime: props.minTime ? clone(props.minTime) : {},
    maxTime: props.maxTime ? clone(props.maxTime) : {},
    sep,
    persianDigits: props.persianDigits === true,
    days: props.days ?? DEFAULT_DAYS,
    months: props.months ?? DEFAULT_MONTHS,
    initDate: props.initDate ? clone(props.initDate) : undefined,
    initTime: props.initTime ? clone(props.initTime) : undefined,
    today,
    autoShow: props.autoShow !== undefined ? props.autoShow : true,
    autoHide: props.autoHide !== undefined ? props.autoHide : true,
    hideAfterChange: props.hideAfterChange !== undefined ? props.hideAfterChange : true,
    plusHtml: props.plusHtml ?? DEFAULT_PLUS_HTML,
    minusHtml: props.minusHtml ?? DEFAULT_MINUS_HTML,
    changeMonthRotateYear: props.changeMonthRotateYear === true,
    showTodayBtn: props.showTodayBtn !== undefined ? props.showTodayBtn : true,
    showEmptyBtn: props.showEmptyBtn !== undefined ? props.showEmptyBtn : true,
    showCloseBtn: props.showCloseBtn !== undefined ? props.showCloseBtn : IS_MOBILE,
    autoReadOnlyInput:
      props.autoReadOnlyInput !== undefined ? props.autoReadOnlyInput : IS_MOBILE,
    useDropDownYears: props.useDropDownYears !== undefined ? props.useDropDownYears : true,
    topSpace: props.topSpace ?? 0,
    bottomSpace: props.bottomSpace ?? 0,
    overflowSpace: props.overflowSpace !== undefined ? props.overflowSpace : -10,
    zIndex: props.zIndex ?? 1000,
    dayRendering: props.dayRendering,
  };
}

function buildCtx(options: ResolvedOptions, viewDate: JalaliDate, viewTime: JalaliTime): Ctx {
  return {
    sep: options.sep,
    date: options.date,
    time: options.time,
    hasSecond: options.hasSecond,
    days: options.days,
    months: options.months,
    initDate: viewDate,
    initTime: viewTime,
    minDate: options.minDate,
    maxDate: options.maxDate,
    minTime: options.minTime,
    maxTime: options.maxTime,
    persianDigits: options.persianDigits,
    today: options.today,
  };
}

/* ------------------------------------------------------ date logic */

function clampDate(ctx: Ctx, source: JalaliDateTime, patch?: Partial<JalaliDateTime>): JalaliDate {
  const base = merge(source, patch || {});
  const anyBase = base as unknown as JalaliDateTime;
  const def = ctx.initDate;
  let h = parseInt(String(anyBase.year), 10);
  let u = parseInt(String(anyBase.month), 10);
  let dH = parseInt(String(anyBase.day), 10);
  if (isNaN(h) || h < 1000 || h > 1999) h = def.year;
  else if (h < ctx.minDate.year) {
    h = ctx.minDate.year;
    u = 1;
  } else if (h > ctx.maxDate.year) h = ctx.maxDate.year;
  if (isNaN(u) || u < 1 || u > 12) u = def.month;
  else if (h <= ctx.minDate.year && u < (ctx.minDate.month ?? 1)) {
    u = ctx.minDate.month ?? 1;
    dH = 1;
  } else if (h >= ctx.maxDate.year && u > (ctx.maxDate.month ?? 12)) {
    u = ctx.maxDate.month ?? 12;
  }
  if (isNaN(dH) || dH < 1) dH = def.day;
  else if (u <= (ctx.minDate.month ?? 1) && dH < (ctx.minDate.day ?? 1)) dH = ctx.minDate.day ?? 1;
  else if (u >= (ctx.maxDate.month ?? 12) && dH > (ctx.maxDate.day ?? 31)) dH = ctx.maxDate.day ?? 31;
  return { year: h, month: u, day: dH };
}

function clampTime(ctx: Ctx, source: JalaliDateTime, patch?: Partial<JalaliDateTime>): JalaliTime {
  const base = merge(source, patch || {});
  const anyBase = base as unknown as JalaliDateTime;
  const def = ctx.initTime;
  let h = parseInt(String(anyBase.hour), 10);
  let u = parseInt(String(anyBase.minute), 10);
  let dH = parseInt(String(anyBase.second), 10);
  if (isNaN(h) || h < 0 || h > 23) h = def.hour;
  else if (h < (ctx.minTime.hour ?? 0)) h = ctx.minTime.hour ?? 0;
  else if (h > (ctx.maxTime.hour ?? 23)) h = ctx.maxTime.hour ?? 23;
  if (isNaN(u) || u < 0 || u > 59) u = def.minute;
  else if (h <= (ctx.minTime.hour ?? 0) && u < (ctx.minTime.minute ?? 0)) u = ctx.minTime.minute ?? 0;
  else if (h >= (ctx.maxTime.hour ?? 23) && u > (ctx.maxTime.minute ?? 59))
    u = ctx.maxTime.minute ?? 59;
  if (isNaN(dH) || dH < 0 || dH > 59) dH = def.second;
  else if (
    h <= (ctx.minTime.hour ?? 0) &&
    u <= (ctx.minTime.minute ?? 0) &&
    dH < (ctx.minTime.second ?? 0)
  )
    dH = ctx.minTime.second ?? 0;
  else if (
    h >= (ctx.maxTime.hour ?? 23) &&
    u >= (ctx.maxTime.minute ?? 59) &&
    dH > (ctx.maxTime.second ?? 59)
  )
    dH = ctx.maxTime.second ?? 59;
  return { hour: h, minute: u, second: dH };
}

function formatDateString(ctx: Ctx, date: JalaliDate): string {
  return `${date.year}${ctx.sep.date}${pad(date.month)}${ctx.sep.date}${pad(date.day)}`;
}

function isDateInRange(ctx: Ctx, year: number, month: number, day: number): boolean {
  const target = formatDateString(ctx, { year, month, day });
  const min = isPlainObject(ctx.minDate)
    ? target
    : formatDateString(ctx, ctx.minDate as JalaliDate);
  const max = isPlainObject(ctx.maxDate)
    ? target
    : formatDateString(ctx, ctx.maxDate as JalaliDate);
  return target <= max && target >= min;
}

function validateDateString(ctx: Ctx, str: string): boolean {
  if (!str) return false;
  const parts = String(str).slice(0, 10).split(ctx.sep.date);
  return parts.length === 3 && parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2;
}

function validateTimeString(ctx: Ctx, str: string): boolean {
  if (!str) return false;
  const slice = String(str).slice(ctx.date ? 11 : 0).slice(0, 8);
  const parts = slice.split(ctx.sep.time);
  return parts.length === (ctx.hasSecond ? 3 : 2) && !parts.some((p) => String(p).length !== 2);
}

function parseValue(ctx: Ctx, str: string): JalaliDateTime {
  const parts = str.split(ctx.sep.between);
  const datePart = ctx.date
    ? (parts[0] || '').split(ctx.sep.date)
    : ({} as JalaliDateTime);
  const timePart = ctx.date
    ? ctx.time && parts[1]
      ? parts[1].split(ctx.sep.time)
      : ({} as JalaliDateTime)
    : (parts[0] || '').split(ctx.sep.time);
  const d = datePart as string[];
  const t = timePart as string[];
  return {
    year: parseInt(d[0], 10),
    month: parseInt(d[1], 10),
    day: parseInt(d[2], 10),
    hour: parseInt(t[0], 10),
    minute: parseInt(t[1], 10),
    second: parseInt(t[2], 10),
  };
}

function formatValue(ctx: Ctx, value: JalaliDateTime): string {
  const datePart = ctx.date
    ? `${value.year}${ctx.sep.date}${pad(Number(value.month))}${ctx.sep.date}${pad(
        Number(value.day),
      )}`
    : '';
  const timePart = ctx.time
    ? `${pad(Number(value.hour))}${ctx.sep.time}${pad(Number(value.minute))}` +
      (ctx.hasSecond ? `${ctx.sep.time}${pad(Number(value.second))}` : '')
    : '';
  return datePart + (datePart && timePart ? ctx.sep.between : '') + timePart;
}

function range(min: number, max: number): number[] {
  const out: number[] = [];
  for (let i = min; i <= max; i++) out.push(i);
  return out;
}

function timeRange(ctx: Ctx, field: 'hour' | 'minute' | 'second'): number[] {
  const min = merge({ hour: 0, minute: 0, second: 0 }, ctx.minTime) as unknown as JalaliTime;
  const max = merge(
    { hour: 23, minute: 59, second: 59 },
    ctx.maxTime,
  ) as unknown as JalaliTime;
  if (field === 'hour') return range(min.hour, max.hour);
  if (field === 'minute') {
    if (min.hour === max.hour) return range(min.minute, max.minute);
    if (ctx.initTime.hour === min.hour) return range(min.minute, 59);
    if (ctx.initTime.hour === max.hour) return range(0, max.minute);
    return range(0, 59);
  }
  if (field === 'second') {
    if (min.hour === max.hour && min.minute === max.minute) return range(min.second, max.second);
    if (ctx.initTime.hour === min.hour && ctx.initTime.minute === min.minute)
      return range(min.second, 59);
    if (ctx.initTime.hour === max.hour && ctx.initTime.minute === max.minute)
      return range(0, max.second);
    return range(0, 59);
  }
  return range(min.second, max.second);
}

function yearDropdownRange(ctx: Ctx): { min: number; max: number } {
  const year = ctx.initDate.year;
  const round = (value: number) => 100 * Math.round(value / 100);
  const min = (ctx.minDate as JalaliDate).year || round(year - 200);
  const max = (ctx.maxDate as JalaliDate).year || round(year + 200);
  return { min, max };
}

function monthOptions(ctx: Ctx): number[] {
  const year = ctx.initDate.year;
  const min = ctx.minDate as JalaliDate;
  const max = ctx.maxDate as JalaliDate;
  const list: number[] = [];
  let a = 1;
  let r = 12;
  if (year === min.year) {
    a = min.month;
    if (year === max.year) r = max.month;
  } else if (year === max.year) {
    a = 1;
    r = max.month;
  }
  for (let i = a; i <= r; i++) list.push(i);
  return list;
}

const weekendTokens = (weekIndex: number): string[] =>
  weekIndex === 6 ? ['last-week', 'holly-day'] : [];

/* ------------------------------------------------------ cells */

interface DayCell {
  className: string;
  year: number;
  month: number;
  day: number;
  text: string;
  selectable: boolean;
}

function buildCells(
  ctx: Ctx,
  selected: JalaliDateTime,
  dayRendering?: (day: DayObject, input: HTMLInputElement | null) => Partial<DayObject> | void,
  inputEl: HTMLInputElement | null = null,
): DayCell[] {
  const year = ctx.initDate.year;
  const month = ctx.initDate.month;
  const monthDays = daysInJalaliMonth(year, month);
  const firstWeekday = jalaliDayOfWeek(year, month, 1);
  const totalIndex = 7 * Math.ceil((firstWeekday + monthDays) / 7) - 1;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextMonth = month === 12 ? 1 : month + 1;
  const prevYear = prevMonth === 12 ? year - 1 : year;
  const nextYear = nextMonth === 1 ? year + 1 : year;
  const prevMonthDays =
    month === 1 ? daysInJalaliMonth(year - 1, prevMonth) : daysInJalaliMonth(year, prevMonth);
  const persian = ctx.persianDigits;
  let beforeDay = prevMonthDays - firstWeekday;
  let afterDay = 0;
  const cells: DayCell[] = [];
  const state = { day: 1, inBeforeMonth: false, inAfterMonth: false };
  for (let e = 0; e <= totalIndex; e++) {
    state.inBeforeMonth = state.day <= firstWeekday && e < firstWeekday;
    state.inAfterMonth = e >= monthDays + firstWeekday;
    let cy = year;
    let cm = month;
    let cd = state.day;
    if (state.inBeforeMonth) {
      beforeDay++;
      cd = beforeDay;
      cy = prevYear;
      cm = prevMonth;
    } else if (state.inAfterMonth) {
      afterDay++;
      cd = afterDay;
      cy = nextYear;
      cm = nextMonth;
    }
    const isValid = isDateInRange(ctx, cy, cm, cd);
    const isSelected =
      selected.year === cy && selected.month === cm && (selected.day ?? 0) === cd;
    const isToday =
      ctx.today.year === cy && ctx.today.month === cm && ctx.today.day === cd;
    let classStr = weekendTokens(jalaliDayOfWeek(cy, cm, cd)).join('.');
    classStr = classStr ? ' ' + classStr : classStr;
    if (isSelected) classStr += '.selected';
    if (isToday) classStr += '.today';
    const dayObj: DayObject = {
      day: cd,
      year: cy,
      month: cm,
      inBeforeMonth: state.inBeforeMonth,
      inAfterMonth: state.inAfterMonth,
      isValid,
      isHollyDay: false,
      className: classStr,
    };
    if (dayRendering) Object.assign(dayObj, dayRendering({ ...dayObj }, inputEl) || {});
    if (dayObj.isHollyDay) dayObj.className += '.holly-day';
    const tokens = dayObj.className.split('.').filter((t) => t.trim() !== '');
    let base = isValid ? 'jdp-day' : 'jdp-day disabled-day';
    if (dayObj.inBeforeMonth || dayObj.inAfterMonth) {
      base = isValid ? 'jdp-day not-in-month' : 'jdp-day not-in-month disabled-day';
    }
    cells.push({
      className: base + (tokens.length ? ' ' + tokens.join(' ') : ''),
      year: cy,
      month: cm,
      day: cd,
      text: toDisplay(cd, persian),
      selectable: isValid,
    });
    if (state.inBeforeMonth) state.day = 1;
    else state.day += 1;
  }
  return cells;
}

/* ------------------------------------------------------ component */

function JalaliDatepicker(
  props: JalaliDatepickerProps,
  ref: Ref<JalaliDatepickerHandle>,
) {
  const today = useMemo(() => getToday(), []);
  const options = useMemo(() => resolveOptions(props, today), [props, today]);
  const now = useMemo(() => {
    const d = new Date();
    return { hour: d.getHours(), minute: d.getMinutes(), second: 0 };
  }, []);

  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(() => props.defaultValue ?? '');
  const value = isControlled ? props.value ?? '' : internalValue;

  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<JalaliDate>(() => clone(today));
  const [viewTime, setViewTime] = useState<JalaliTime>(now);
  const [position, setPosition] = useState<CSSProperties>({ position: 'fixed' });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<JalaliDateTime>({});
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  const ctx = useMemo(
    () => buildCtx(options, viewDate, viewTime),
    [options, viewDate, viewTime],
  );

  /* ----- selection / commit ----- */

  const emitChanges = useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    const dispatch = (name: string) => {
      const ev = document.createEvent('Event');
      ev.initEvent(name, true, true);
      input.dispatchEvent(ev);
    };
    dispatch('jdp:change');
    dispatch('change');
    dispatch('input');
  }, []);

  const commitValue = useCallback(
    (formatted: string) => {
      if (isControlled) {
        props.onChange?.(formatted);
      } else {
        setInternalValue(formatted);
      }
    },
    [isControlled, props],
  );

  const hide = useCallback(() => setOpen(false), []);

  const setValue = useCallback(
    (partial: JalaliDateTime) => {
      const cur = selectedRef.current || {};
      const defaults: JalaliDateTime = {
        year: options.today.year,
        month: options.today.month,
        day: options.today.day,
        hour: viewTime.hour,
        minute: viewTime.minute,
        second: viewTime.second,
      };
      const merged = merge(defaults, merge(cur, partial)) as unknown as JalaliDateTime;
      selectedRef.current = merged;
      if (ctx.time) {
        const t = clone(viewTime);
        t.hour = Number(merged.hour);
        t.minute = Number(merged.minute);
        t.second = Number(merged.second);
        setViewTime(t);
      }
      const formatted = formatValue(ctx, merged);
      commitValue(formatted);
      emitChanges();
      if (!ctx.time && options.hideAfterChange) hide();
    },
    [commitValue, ctx, emitChanges, hide, options.hideAfterChange, options.today, viewTime],
  );

  const clearValue = useCallback(() => {
    commitValue('');
    emitChanges();
    if (options.hideAfterChange) hide();
  }, [commitValue, emitChanges, hide, options.hideAfterChange]);

  /* ----- opening the picker (re-init like original show()) ----- */

  const show = useCallback(() => {
    const sv = String(value ?? '');
    const initDate = options.initDate
      ? clone(options.initDate)
      : sv && validateDateString(ctx, sv)
        ? (parseValue(ctx, sv) as JalaliDate)
        : clone(options.today);
    const clampedDate = clampDate(ctx, initDate);
    const parseTime = (): JalaliTime => {
      if (options.initTime) return clone(options.initTime);
      if (sv && validateTimeString(ctx, sv)) return parseValue(ctx, sv) as JalaliTime;
      return { ...now };
    };
    const clampedTime = clampTime(ctx, parseTime());
    setViewDate(clampedDate);
    setViewTime(clampedTime);
    let cur: JalaliDateTime = {};
    if (sv) {
      if (ctx.date && validateDateString(ctx, sv)) cur = { ...cur, ...parseValue(ctx, sv) };
      if (ctx.time && validateTimeString(ctx, sv)) cur = { ...cur, ...parseValue(ctx, sv) };
    }
    selectedRef.current = cur;
    setOpen(true);
  }, [ctx, now, options.initDate, options.initTime, options.today, value]);

  /* ----- positioning (original setPosition) ----- */

  useLayoutEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const input = inputRef.current;
    if (!panel || !input) return;
    const compute = () => {
      const rect = input.getBoundingClientRect();
      const bodyWidth = document.body.offsetWidth;
      const w = panel.offsetWidth || 0;
      const h = panel.offsetHeight || 0;
      let top = rect.top + rect.height + options.topSpace;
      let left = rect.left;
      if (left + w >= bodyWidth) left -= left + w - (bodyWidth + options.overflowSpace);
      if (top - rect.height >= h && top + h >= window.innerHeight)
        top -= h + rect.height + options.bottomSpace + options.topSpace;
      setPosition({ position: 'fixed', left: `${left}px`, top: `${top}px` });
    };
    compute();
    window.addEventListener('resize', compute);
    let scroller: HTMLElement | Window | null = null;
    let node: HTMLElement | null = input;
    while (node) {
      const name = (node.nodeName || '').toLowerCase();
      if (['html', 'body'].includes(name)) break;
      const style = window.getComputedStyle(node);
      if (/auto|scroll|overlay/.test(style.overflow + style.overflowY + style.overflowX)) {
        scroller = node;
        break;
      }
      node = node.parentElement;
    }
    const target = scroller ?? window;
    target.addEventListener('scroll', compute, { passive: true });
    return () => {
      window.removeEventListener('resize', compute);
      target.removeEventListener('scroll', compute);
    };
  }, [open, options.bottomSpace, options.overflowSpace, options.topSpace]);

  /* ----- auto-hide on outside click ----- */

  useEffect(() => {
    if (!open || !options.autoHide) return;
    const onDocClick = (e: MouseEvent) => {
      const elm = e.target as Node;
      const inside =
        (panelRef.current && panelRef.current.contains(elm)) ||
        (wrapperRef.current && wrapperRef.current.contains(elm));
      if (!inside) hide();
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [hide, open, options.autoHide]);

  useImperativeHandle(ref, () => ({ show, hide }), [hide, show]);

  /* ----- navigation ----- */

  const monthChange = useCallback(
    (m: number) => setViewDate(clampDate(ctx, viewDate, { month: m })),
    [ctx, viewDate],
  );

  const yearChange = useCallback(
    (y: number) => setViewDate(clampDate(ctx, viewDate, { year: y })),
    [ctx, viewDate],
  );

  const increaseYear = useCallback(
    () => yearChange(viewDate.year + 1),
    [viewDate, yearChange],
  );

  const decreaseYear = useCallback(
    () => yearChange(viewDate.year - 1),
    [viewDate, yearChange],
  );

  const increaseMonth = useCallback(() => {
    const atEnd = viewDate.month === 12;
    if (options.changeMonthRotateYear && atEnd) increaseYear();
    monthChange(atEnd ? 1 : viewDate.month + 1);
  }, [viewDate, options.changeMonthRotateYear, increaseYear, monthChange]);

  const decreaseMonth = useCallback(() => {
    const atStart = viewDate.month === 1;
    if (options.changeMonthRotateYear && atStart) decreaseYear();
    monthChange(atStart ? 12 : viewDate.month - 1);
  }, [viewDate, options.changeMonthRotateYear, decreaseYear, monthChange]);

  /* ----- derived display data ----- */

  const selectedParsed = useMemo((): JalaliDateTime => {
    if (!options.date) return {};
    const sv = String(value ?? '');
    return ctx.date && validateDateString(ctx, sv) ? parseValue(ctx, sv) : {};
  }, [ctx, options.date, value]);

  const cells = useMemo(
    () =>
      options.date
        ? buildCells(ctx, selectedParsed, options.dayRendering, inputEl)
        : [],
    [ctx, options.date, options.dayRendering, selectedParsed, inputEl],
  );

  const yearRange = useMemo(
    () => (options.useDropDownYears ? yearDropdownRange(ctx) : null),
    [ctx, options.useDropDownYears],
  );

  const months = useMemo(() => monthOptions(ctx), [ctx]);

  const handleYearDraft = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num >= 1000 && num <= 2000) yearChange(num);
  };

  const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => yearChange(Number(e.target.value));
  const handleSelectMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    monthChange(Number(e.target.value));

  const handleFocus = () => {
    if (options.autoShow) show();
  };

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    if (isControlled) props.onChange?.(e.target.value);
    else setInternalValue(e.target.value);
  };

  const atMaxYear =
    !isPlainObject(options.maxDate) &&
    (options.maxDate as JalaliDate).year === viewDate.year;
  const atMinYear =
    !isPlainObject(options.minDate) &&
    (options.minDate as JalaliDate).year === viewDate.year;
  const atMaxMonth =
    !isPlainObject(options.maxDate) &&
    (options.maxDate as JalaliDate).year === viewDate.year &&
    (options.maxDate as JalaliDate).month === viewDate.month;
  const atMinMonth =
    !isPlainObject(options.minDate) &&
    (options.minDate as JalaliDate).year === viewDate.year &&
    (options.minDate as JalaliDate).month === viewDate.month;

  const todayInRange = isDateInRange(ctx, today.year, today.month, today.day);
  const showTimeOnlyChoose = !options.date && options.time && !String(value ?? '');

  const panelStyle: CSSProperties = {
    ...position,
    zIndex: options.zIndex,
    display: 'block',
    visibility: 'visible',
  };

  return (
    <div className="jdp-wrap" ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      <input
        ref={(el) => {
          inputRef.current = el;
          setInputEl(el);
        }}
        type="text"
        name={props.name}
        value={value}
        readOnly={options.autoReadOnlyInput}
        placeholder={props.placeholder}
        className={props.className}
        data-jdp-only-date={props.onlyDate ? '' : undefined}
        data-jdp-only-time={props.onlyTime ? '' : undefined}
        onClick={(e) => e.currentTarget.focus()}
        onFocus={handleFocus}
        onChange={handleType}
        autoComplete="off"
      />
      {open ? (
        <>
          <div className="jdp-overlay" style={{ zIndex: options.zIndex - 1, display: 'block' }} />
          <div ref={panelRef} className="jdp-container" style={panelStyle}>
            {ctx.date ? (
              <>
                <div className="jdp-years">
                  <span
                    className={'jdp-icon-plus' + (atMaxYear ? ' not-in-range' : '')}
                    onClick={() => !atMaxYear && increaseYear()}
                    dangerouslySetInnerHTML={{ __html: options.plusHtml }}
                  />
                  {options.useDropDownYears && yearRange ? (
                    <select
                      className="jdp-year"
                      tabIndex={-1}
                      value={viewDate.year}
                      onChange={handleSelectYear}
                    >
                      {range(yearRange.min, yearRange.max).map((y) => (
                        <option key={y} value={y}>
                          {toDisplay(y, options.persianDigits)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      key={viewDate.year}
                      className="jdp-year"
                      type="number"
                      tabIndex={-1}
                      defaultValue={viewDate.year}
                      onChange={handleYearDraft}
                    />
                  )}
                  <span
                    className={'jdp-icon-minus' + (atMinYear ? ' not-in-range' : '')}
                    onClick={() => !atMinYear && decreaseYear()}
                    dangerouslySetInnerHTML={{ __html: options.minusHtml }}
                  />
                </div>

                <div className="jdp-months">
                  <span
                    className={'jdp-icon-plus' + (atMaxMonth ? ' not-in-range' : '')}
                    onClick={() => !atMaxMonth && increaseMonth()}
                    dangerouslySetInnerHTML={{ __html: options.plusHtml }}
                  />
                  <select
                    className="jdp-month"
                    tabIndex={-1}
                    value={viewDate.month}
                    onChange={handleSelectMonth}
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {options.months[m - 1]}
                      </option>
                    ))}
                  </select>
                  <span
                    className={'jdp-icon-minus' + (atMinMonth ? ' not-in-range' : '')}
                    onClick={() => !atMinMonth && decreaseMonth()}
                    dangerouslySetInnerHTML={{ __html: options.minusHtml }}
                  />
                </div>

                <div className="jdp-days">
                  {ctx.days.map((dayName, i) => (
                    <div
                      key={i}
                      className={
                        'jdp-day-name' +
                        (weekendTokens(i).length ? ' ' + weekendTokens(i).join(' ') : '')
                      }
                    >
                      {dayName}
                    </div>
                  ))}
                  {cells.map((cell, i) =>
                    cell.selectable ? (
                      <div
                        key={i}
                        className={cell.className}
                        onClick={() =>
                          setValue({ year: cell.year, month: cell.month, day: cell.day })
                        }
                      >
                        {cell.text}
                      </div>
                    ) : (
                      <div key={i} className={cell.className}>
                        {cell.text}
                      </div>
                    ),
                  )}
                </div>
              </>
            ) : null}

            {ctx.time ? (
              <div className={'jdp-time-container' + (!ctx.date ? ' jdp-only-time' : '')}>
                {ctx.hasSecond ? (
                  <div className="jdp-time">
                    <select
                      tabIndex={-1}
                      value={viewTime.second}
                      onChange={(e) => setValue({ second: Number(e.target.value) })}
                    >
                      {timeRange(ctx, 'second').map((v) => (
                        <option key={v} value={v}>
                          {toDisplay(v, options.persianDigits)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="jdp-time">
                  <select
                    tabIndex={-1}
                    value={viewTime.minute}
                    onChange={(e) => setValue({ minute: Number(e.target.value) })}
                  >
                    {timeRange(ctx, 'minute').map((v) => (
                      <option key={v} value={v}>
                        {toDisplay(v, options.persianDigits)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="jdp-time">
                  <select
                    tabIndex={-1}
                    value={viewTime.hour}
                    onChange={(e) => setValue({ hour: Number(e.target.value) })}
                  >
                    {timeRange(ctx, 'hour').map((v) => (
                      <option key={v} value={v}>
                        {toDisplay(v, options.persianDigits)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

            <div className="jdp-footer">
              {options.showTodayBtn && options.date ? (
                <span
                  className={'jdp-btn-today' + (todayInRange ? '' : ' disabled-btn')}
                  onClick={() => todayInRange && setValue({ ...today })}
                >
                  امروز
                </span>
              ) : null}
              {showTimeOnlyChoose ? (
                <span
                  className="jdp-btn-today"
                  onClick={() => {
                    setValue({ hour: viewTime.hour, minute: viewTime.minute, second: viewTime.second });
                    hide();
                  }}
                >
                  انتخاب
                </span>
              ) : null}
              {options.showEmptyBtn ? (
                <span className="jdp-btn-empty" onClick={clearValue}>
                  خالی
                </span>
              ) : null}
              {options.showCloseBtn ? (
                <span className="jdp-btn-close" onClick={hide}>
                  بستن
                </span>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default forwardRef(JalaliDatepicker);