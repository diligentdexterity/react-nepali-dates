import { BS_CALENDAR, DATE_CONSTANTS } from "./constants";
import { Language, NepaliDateType } from "./types";
import convertAdToBs from "./utils/adToBs";
import convertBsToAd from "./utils/bsToAd";
import { format } from "./utils/formatDate";

export class NepaliDate {
  private bsDate: NepaliDateType;

  static language: "np" | "en" = Language.en;

  constructor(date?: string | NepaliDateType, dateType: "ad" | "bs" = "ad") {
    this.bsDate = dateType === "ad" || !date ? convertAdToBs((date as string) || new Date().toISOString()) : this.parseBsDate(date as string);

    if (!this.bsDate.success) {
      throw new Error(this.bsDate.error || "Invalid Date");
    }
  }

  private parseBsDate(dateStr: string): NepaliDateType {
    const [year, month, date] = dateStr.split("-").map(Number);
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(date) ||
      year < DATE_CONSTANTS.MIN_YEAR_BS ||
      year > DATE_CONSTANTS.MAX_YEAR_BS ||
      month < 1 ||
      month > 12 ||
      date < 1 ||
      date > BS_CALENDAR[year][month - 1]
    ) {
      return { error: "Invalid BS Date", success: false, year: 0, month: 0, date: 0 };
    }
    return { year, month, date, success: true, error: "" };
  }

  format(formatStr: string, lang: "en" | "np" = NepaliDate.language): string {
    return format({ ...this.bsDate, month: this.bsDate.month - 1 }, formatStr, lang);
  }

  getYear(): number {
    return this.bsDate.year;
  }

  getMonth(): number {
    return this.bsDate.month;
  }

  getDate(): number {
    return this.bsDate.date;
  }

  toString(): string {
    return `${this.getYear()}-${String(this.getMonth()).padStart(2, "0")}-${String(this.getDate()).padStart(2, "0")}`;
  }

  toAdDate(): string {
    if (!this.bsDate.success) {
      throw new Error(this.bsDate.error || "Invalid Date");
    }
    return convertBsToAd(this.bsDate);
  }
}
