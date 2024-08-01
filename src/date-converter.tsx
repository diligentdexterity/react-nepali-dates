import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import Calendar from "./components/Calendar";
import { cn } from "./utils/utils";
import { Button } from "./components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { NepaliDate } from "./NepaliDate";

interface DatePickerProps {
  language?: "np" | "en";
  inputStyle?: React.HTMLAttributes<HTMLButtonElement> & { variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" };
  calendarStyle?: React.HTMLAttributes<HTMLDivElement>;
  onChange?: (date: string) => void;
  value?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ calendarStyle, value, inputStyle, language, onChange }) => {
  const [date, setDate] = useState<string | undefined>(value);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={inputStyle?.variant || "outline"}
          {...inputStyle}
          className={cn("justify-start w-[300px] text-left font-normal", !date && "text-muted-foreground", inputStyle?.className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? new NepaliDate(date, "bs").format("MMMM -  DD, YYYY") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...calendarStyle} className={cn("min-w-[300px] p-0", calendarStyle?.className)}>
        <Calendar setDate={handleDateChange} date={date} language={language} />
      </PopoverContent>
    </Popover>
  );
};
