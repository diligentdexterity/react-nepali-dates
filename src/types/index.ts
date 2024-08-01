export enum Language {
  np = "np",
  en = "en",
}

interface BSArray {
  [year: number]: number[];
}

interface DateType {
  year: number;
  month: number;
  date: number;
}

interface NepaliDateType extends DateType {
  success?: boolean;
  error?: string;
}

interface BsCalendar {
  [year: string]: {
    [month: string]: BsCalendarMonth;
  };
}

interface BsCalendarMonth {
  days: {
    n: string;
    e: string;
    t: string;
    f: string;
    h: boolean;
    d: number;
  }[];
}

export type { NepaliDateType, BSArray, DateType, BsCalendar, BsCalendarMonth };
