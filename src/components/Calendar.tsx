"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NepaliDate } from "../NepaliDate";
import data from "../constants/data.json";
import { BsCalendar, BsCalendarMonth } from "../types";
import { BS_CALENDAR, formatObj } from "../constants";
import { cn } from "../utils/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarProps {
  setDate?: (e: string) => void;
  language?: "np" | "en";
  date?: string;
}

const Calendar: React.FC<CalendarProps> = ({ date, language = "en", setDate }) => {
  const bsDate = date ? new NepaliDate(date, "bs") : new NepaliDate();
  const calendar = data as BsCalendar;

  const [selectedYear, setSelectedYear] = useState(bsDate.getYear());
  const [selectedMonth, setSelectedMonth] = useState(bsDate.getMonth() - 1);
  const [selectedDate, setSelectedDate] = useState(bsDate.getDate());
  const [bsCalendarMonth, setBsCalendarMonth] = useState<BsCalendarMonth | null>(null);

  useEffect(() => {
    const month = calendar[selectedYear]?.[selectedMonth + 1];
    setBsCalendarMonth(month);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setDate?.(`${selectedYear} - ${selectedMonth + 1} - ${selectedDate}`);
  }, [setDate, selectedYear, selectedMonth, selectedDate]);

  useEffect(() => {
    console.log("BS CALENDAR => ", bsCalendarMonth);
  }, [bsCalendarMonth]);

  function handleMonthIncrement() {
    setSelectedMonth((month) => {
      let year = selectedYear;
      if (month === 11) {
        setSelectedYear(year + 1);
        return 0;
      } else {
        return month + 1;
      }
    });
  }
  function handleMonthDecrement() {
    setSelectedMonth((month) => {
      let year = selectedYear;
      if (month === 0) {
        setSelectedYear(year - 1);
        return 11;
      } else {
        return month - 1;
      }
    });
  }

  return (
    <div className="w-full py-3 px-5">
      <div className="flex justify-between items-center gap-x-5">
        <Button size="icon" variant="ghost" onClick={() => handleMonthDecrement()}>
          <ChevronLeft />
        </Button>
        <div className="grid grid-cols-2 w-full gap-3">
          <Select value={selectedMonth.toString()} onValueChange={(month) => setSelectedMonth(Number(month))}>
            <SelectTrigger className="flex-1 border-0 px-0 py-0 justify-around outline-none focus:ring-0">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {formatObj[language].month.long.map((month, index) => (
                <SelectItem value={index.toString()} key={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear.toString()} onValueChange={(year) => setSelectedYear(Number(year))}>
            <SelectTrigger className="flex-1 border-0 px-0 py-0 justify-around outline-none focus:ring-0">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(BS_CALENDAR).map((year) => (
                <SelectItem value={year} key={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="icon" variant="ghost" onClick={() => handleMonthIncrement()}>
          <ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-x-5 gap-y-3 mt-2">
        {formatObj[language].day.short.map((day) => (
          <p className="text-muted-foreground text-sm flex items-center justify-center w-7 h-7" key={day}>
            {day}
          </p>
        ))}
        {bsCalendarMonth?.days.map(({ n, e }, index) => (
          <div
            key={index}
            onClick={() => setSelectedDate(Number(n))}
            className={cn(
              "cursor-pointer rounded-md flex items-center justify-center w-7 h-7",
              selectedDate === Number(n) ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 dark:hover:bg-gray-800"
            )}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
