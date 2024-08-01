import { BASE_AD_TIME, BS_CALENDAR, DATE_CONSTANTS } from "../constants";
import { NepaliDateType } from "../types";

export default function convertAdToBs(adDate: string): NepaliDateType {
  const daysElapsed = Math.floor((new Date(adDate).getTime() - BASE_AD_TIME) / 86400000);
  if (daysElapsed < 0) {
    return { error: "Date Out Of Range", success: false, year: 0, month: 0, date: 0 };
  }

  let year = DATE_CONSTANTS.MIN_YEAR_BS;
  let remainingDays = daysElapsed;

  while (year <= DATE_CONSTANTS.MAX_YEAR_BS) {
    const daysInYear = BS_CALENDAR[year].reduce((sum, days) => sum + days, 0);
    if (remainingDays < daysInYear) break;
    remainingDays -= daysInYear;
    year++;
  }

  let month = 0;
  for (; month < DATE_CONSTANTS.MAX_MONTH; month++) {
    const daysInMonth = BS_CALENDAR[year][month];
    if (remainingDays < daysInMonth) {
      return { year, month: month + 1, date: remainingDays + 1, success: true, error: "" };
    }
    remainingDays -= daysInMonth;
  }

  return { error: "Conversion error", success: false, year: 0, month: 0, date: 0 };
}
