import { formatObj } from "../constants";
import { DateType } from "../types";

function mapLanguageNumber(dateNumber: string, language: "en" | "np"): string {
  return dateNumber
    .split("")
    .map((num) => formatObj[language].date[parseInt(num, 10)])
    .join("");
}

export function format(bsDate: DateType, formatStr: string, language: "en" | "np"): string {
  return formatStr
    .replace(/(\\[MDYd]|D{1,2}|M{1,4}|Y{2,4}|d{1,3})/g, (match) => {
      switch (match) {
        case "D":
          return mapLanguageNumber(String(bsDate.date), language);
        case "DD":
          return mapLanguageNumber(String(bsDate.date).padStart(2, "0"), language);
        case "M":
          return mapLanguageNumber(String(bsDate.month + 1), language);
        case "MM":
          return mapLanguageNumber(String(bsDate.month + 1).padStart(2, "0"), language);
        case "MMM":
          return formatObj[language].month.short[bsDate.month];
        case "MMMM":
          return formatObj[language].month.long[bsDate.month];
        case "YY":
          return mapLanguageNumber(String(bsDate.year).slice(-2), language);
        case "YYY":
          return mapLanguageNumber(String(bsDate.year).slice(-3), language);
        case "YYYY":
          return mapLanguageNumber(String(bsDate.year), language);
        case "d":
          return mapLanguageNumber(String(bsDate.date || "0"), language);
        case "dd":
          return formatObj[language].day.short[bsDate.date || 0];
        case "ddd":
          return formatObj[language].day.long[bsDate.date || 0];
        default:
          return match.replace("/", "");
      }
    })
    .replace(/\\/g, "");
}
