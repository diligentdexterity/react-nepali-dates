import { BASE_AD_TIME, BS_CALENDAR, DATE_CONSTANTS } from "../constants";
import { NepaliDateType } from "../types";

export default function convertBsToAd(bsDate: NepaliDateType): string {
  const { year, month, date } = bsDate;
  if (
    year < DATE_CONSTANTS.MIN_YEAR_BS ||
    year > DATE_CONSTANTS.MAX_YEAR_BS ||
    month < 1 ||
    month > DATE_CONSTANTS.MAX_MONTH ||
    date < 1 ||
    date > BS_CALENDAR[year][month - 1]
  ) {
    throw new Error("Invalid BS Date");
  }

  let daysElapsed = 0;

  for (let y = DATE_CONSTANTS.MIN_YEAR_BS; y < year; y++) {
    daysElapsed += BS_CALENDAR[y].reduce((sum, days) => sum + days, 0);
  }

  for (let m = 0; m < month - 1; m++) {
    daysElapsed += BS_CALENDAR[year][m];
  }

  daysElapsed += date - 1;
  const adTime = new Date(BASE_AD_TIME).getTime() + daysElapsed * 86400000;
  return new Date(adTime).toISOString().split("T")[0];
}
