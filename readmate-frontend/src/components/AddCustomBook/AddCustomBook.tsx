import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  TextField,
  Checkbox,
  Chip,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "../Button/Button";
import { Book } from "../../types/booktypes";
import React, { useEffect, useState } from "react";
import {
  convertAndDisplayError,
  toDateOrUndefined,
  validateStartDate,
} from "../../lib/utils";
import { BookService } from "../../api/services/bookService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { useBookDateValidation } from "../../hooks/useBookDateValidation";

export type FormValues = {
  title: string;
  publishedDate?: Dayjs | null;
  pageCount?: number;
  description?: string;
  startDate: Dayjs | null;
  endDate?: Dayjs | null;
  authors: string[];
  categories: string[];
};

const initialFormValues: FormValues = {
  title: "",
  publishedDate: null,
  pageCount: undefined,
  description: "",
  startDate: null,
  endDate: null,
  authors: [],
  categories: [],
};

export const AddCustomBook = () => {
  const form = useForm<FormValues>({ defaultValues: initialFormValues });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const {
    dateFromError,
    dateToError,
    currentlyReading,
    setCurrentlyReading,
    handleDateFromChange,
    handleDateToChange,
    setDateToError,
    reset: resetDateValidation,
  } = useBookDateValidation(setValue, getValues);

  const [formResetKey, setFormResetKey] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    if (!data.startDate || dateFromError || dateToError || publishedDateError) {
      toast.error("Please correct the errors in the form before submitting.");
      return;
    }

    const finalData: Book = {
      ...data,
      id: crypto.randomUUID().slice(0, 12),
      publishedDate: toDateOrUndefined(data.publishedDate),
      startDate: toDateOrUndefined(data.startDate)!,
      endDate: currentlyReading ? undefined : toDateOrUndefined(data.endDate),
      link: "",
      imageLink: "",
    };

    try {
      await BookService.addBook(finalData);
      toast.success("Book added successfully!");
      mutate(
        (key) => typeof key === "string" && key.startsWith("/book/calendar")
      );
      navigate("/profile");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  const [publishedDateError, setPublishedDateError] = useState<string | null>(
    null
  );
  const handlePublishedDateChange = (date: Dayjs | null) => {
    if (date) {
      const parsedDate = toDateOrUndefined(date);

      if (parsedDate && date.isBefore(dayjs("1900-01-01"), "day")) {
        setPublishedDateError(
          "Published date cannot be before January 1, 1900."
        );
      } else if (parsedDate && parsedDate > new Date()) {
        setPublishedDateError("Published date cannot be in the future.");
      } else {
        setPublishedDateError(null);
      }
    } else {
      setPublishedDateError(null);
    }
  };

  const handleReset = () => {
    reset(initialFormValues);
    resetDateValidation();
    setFormResetKey((prev) => prev + 1);
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col xl:flex-row gap-10 lg:gap-5 h-full w-full">
        <div className="flex flex-col w-full gap-4 overflow-auto scrollbar-hide">
          <div className="text-2xl font-extrabold text-[#A449FF]">
            Add a Custom Book
          </div>

          <TextField
            label="Title"
            {...register("title", { required: "Title cannot be empty." })}
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            required
          />

          <div className="flex flex-row gap-4 w-full">
            <TagsInput
              resetKey={formResetKey}
              name="authors"
              label="Add Author"
              chipColor="secondary"
            />
            <TagsInput
              resetKey={formResetKey}
              name="categories"
              label="Add Category"
              chipColor="primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="publishedDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Published Date"
                    value={field.value || null}
                    onChange={(date) => {
                      field.onChange(date);
                      handlePublishedDateChange(date);
                    }}
                    disableFuture
                    slotProps={{
                      textField: {
                        error: !!publishedDateError,
                        helperText: publishedDateError,
                      },
                      field: { clearable: true },
                    }}
                    className="w-full"
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              label="Page Count"
              type="number"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, "");
              }}
              {...register("pageCount", {
                min: {
                  value: 1,
                  message: "Page count must be greater than 0.",
                },
                max: {
                  value: 9999,
                  message: "Page count must be less than 10000.",
                },
                setValueAs: (value) => {
                  const parsed = parseInt(value, 10);
                  return isNaN(parsed) ? undefined : parsed;
                },
              })}
              error={!!errors.pageCount}
              helperText={errors.pageCount?.message}
              className="w-full"
            />
          </div>

          <TextField
            label="Description"
            multiline
            rows={3}
            {...register("description")}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="text-xl text-[#A449FF] font-bold">
              Reading Dates
            </div>
            <div className="flex flex-row gap-2 w-full">
              <Controller
                name="startDate"
                control={control}
                // rules={{
                //   required: "Start date cannot be empty.",
                //   validate: (value) => {
                //     const result = validateStartDate(value);
                //     return result === null ? true : result;
                //   },
                // }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    value={field.value || null}
                    onChange={handleDateFromChange}
                    disableFuture
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!dateFromError,
                        helperText: dateFromError,
                      },
                      field: { clearable: true },
                    }}
                    className="w-full"
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    value={field.value || null}
                    onChange={handleDateToChange}
                    disabled={currentlyReading}
                    disableFuture
                    slotProps={{
                      textField: {
                        error: !!dateToError,
                        helperText: dateToError,
                      },
                      field: { clearable: true },
                    }}
                    className="w-full"
                  />
                )}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentlyReading}
                  onChange={() => {
                    setCurrentlyReading(!currentlyReading);
                    if (!currentlyReading) {
                      setValue("endDate", null);
                      setDateToError(null);
                    }
                  }}
                />
              }
              label={
                <span className="text-sm font-bold text-[#A449FF]">
                  Currently Reading
                </span>
              }
            />
          </LocalizationProvider>

          <div className="flex gap-2 mb-5 p-1">
            <Button onClick={handleReset} className="w-1/2">
              RESET
            </Button>
            <Button onClick={handleSubmit(onSubmit)} className="w-1/2">
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

const TagsInput = React.memo(
  ({
    resetKey,
    name,
    label,
    chipColor,
  }: {
    resetKey: number;
    name: "authors" | "categories";
    label: string;
    chipColor: "primary" | "secondary";
  }) => {
    const { control, setValue } = useFormContext<FormValues>();
    const values = useWatch({ control, name }) as string[];
    const [input, setInput] = useState("");

    useEffect(() => setInput(""), [resetKey]);

    const add = () => {
      const val = input.trim();
      if (val && !values.includes(val)) {
        setValue(name, [...values, val]);
        setInput("");
      }
    };

    const remove = (val: string) => {
      setValue(
        name,
        values.filter((v) => v !== val)
      );
    };

    return (
      <div className="flex flex-col w-1/2 gap-2">
        <div className="flex items-center">
          <TextField
            label={label}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
            className="w-full"
          />
          <IconButton onClick={add} color="primary">
            <AddIcon />
          </IconButton>
        </div>
        <div className="flex flex-wrap gap-2">
          {values.map((v) => (
            <Chip
              className="max-w-[120px] md:max-w-[220px] lg:max-w-[320px] overflow-auto "
              key={v}
              label={
                <span
                  title={v}
                  className="max-w-[100px] md:max-w-[200px] lg:max-w-[300px] overflow-auto custom-scroll inline-block align-middle"
                >
                  {v}
                </span>
              }
              onDelete={() => remove(v)}
              color={chipColor}
            />
          ))}
        </div>
      </div>
    );
  }
);
