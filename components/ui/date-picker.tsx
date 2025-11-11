"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { parse, isValid, format } from "date-fns";

interface DatePickerProps {
  disabled?: boolean;
  value?: any;
  onChange: (value: any) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  disabled,
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      const utcDate = new Date(value); // Interpret the provided value as UTC
      setInputValue(format(utcDate, "dd.MM.yyyy"));
    } else {
      setInputValue("");
    }
  }, [value]);

  const formatInput = (value: string) => {
    const cleaned = value.replace(/\D+/g, ""); // Remove non-digit characters
    const parts = [];

    if (cleaned.length > 0) parts.push(cleaned.slice(0, 2)); // Day
    if (cleaned.length > 2) parts.push(cleaned.slice(2, 4)); // Month
    if (cleaned.length > 4) parts.push(cleaned.slice(4, 8)); // Year

    return parts.join("."); // Join parts with "."
  };

  const handleDateChange = (date: any) => {
    if (date) {
      let parsedDate: any;

      if (typeof date === "string") {
        parsedDate = parse(date, "dd.MM.yyyy", new Date());
      } else {
        parsedDate = date ?? null;
      }

      if (parsedDate && isValid(parsedDate)) {
        // Format the parsed date as UTC ISO string
        const isoDate = new Date(
          Date.UTC(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
          ),
        ).toISOString();
        onChange(isoDate);

        // Update the input value
        setInputValue(format(parsedDate, "dd.MM.yyyy"));
      } else {
        onChange(null); // Clear invalid date
      }
    } else {
      setInputValue("");
      onChange(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value); // Automatically format input
    setInputValue(formatted);

    if (formatted.length === 0) {
      onChange(null);
    }

    // Check if input matches the expected date format
    if (formatted.length === 10) {
      handleDateChange(formatted);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputValue === "") {
      onChange(null);
    }
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger className="w-full">
        <input
          type="text"
          placeholder="dd.MM.yyyy"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            "w-full justify-start pl-3 text-left font-normal",
            !value && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50",
          )}
          disabled={disabled}
          maxLength={10} // Ensure no more than dd.MM.yyyy format
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={value ? new Date(value) : undefined}
          defaultMonth={value ? new Date(value) : new Date()}
          onSelect={(selectedDate: any) => {
            handleDateChange(selectedDate);
            setCalendarOpen(false);
          }}
          initialFocus
          minDate={minDate}
          maxDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}
