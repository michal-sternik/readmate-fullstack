import { useState } from "react";
import { Dayjs } from "dayjs";
import {
  UseFormSetValue,
  UseFormGetValues,
  Path,
  PathValue,
} from "react-hook-form";
import { validateStartDate, validateEndDate } from "../lib/utils";

export const useBookDateValidation = <
  T extends {
    startDate?: Dayjs | null | undefined;
    endDate?: Dayjs | null | undefined;
  }
>(
  setValue: UseFormSetValue<T>,
  getValues: UseFormGetValues<T>
) => {
  const [dateFromError, setDateFromError] = useState<string | null>(null);
  const [dateToError, setDateToError] = useState<string | null>(null);
  const [currentlyReading, setCurrentlyReading] = useState(true);

  const handleDateFromChange = (val: Dayjs | null) => {
    if (!val || !val.isValid()) {
      setDateFromError("Invalid date. Please enter a valid date.");
      setValue("startDate" as Path<T>, null as PathValue<T, Path<T>>);
      return;
    }
    setValue("startDate" as Path<T>, val as PathValue<T, Path<T>>);
    const startError = validateStartDate(val);
    setDateFromError(startError);

    const end = getValues("endDate" as Path<T>) as Dayjs | null;
    const endError = validateEndDate(end, val);
    setDateToError(endError);
  };

  const handleDateToChange = (val: Dayjs | null) => {
    if (!val || !val.isValid()) {
      setDateToError("Invalid date. Please enter a valid date.");
      setValue("endDate" as Path<T>, null as PathValue<T, Path<T>>);
      return;
    }
    setValue("endDate" as Path<T>, val as PathValue<T, Path<T>>);
    const start = getValues("startDate" as Path<T>) as Dayjs | null;
    debugger;
    const endError = validateEndDate(val, start);
    setDateToError(endError);
  };

  const reset = () => {
    setDateFromError(null);
    setDateToError(null);
    setCurrentlyReading(false);
  };

  return {
    dateFromError,
    dateToError,
    currentlyReading,
    setCurrentlyReading,
    handleDateFromChange,
    handleDateToChange,
    setDateToError,
    reset,
  };
};
