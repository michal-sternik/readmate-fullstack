import {
  useForm,
  Controller,
  useWatch,
  useFormContext,
  FormProvider,
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

type FormValues = {
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

const AuthorsInput = React.memo(({ resetKey }: { resetKey: number }) => {
  const { control, setValue } = useFormContext<FormValues>();
  const authors = useWatch({ control, name: "authors" });
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, [resetKey]);

  const add = () => {
    const val = input.trim();
    if (val && !authors.includes(val)) {
      setValue("authors", [...authors, val]);
      setInput("");
    }
  };

  const remove = (val: string) => {
    setValue(
      "authors",
      authors.filter((a) => a !== val)
    );
  };

  return (
    <div className="flex flex-col w-1/2 gap-2">
      <div className="flex items-center">
        <TextField
          label="Add Author"
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
        {authors.map((a) => (
          <Chip
            key={a}
            label={a}
            onDelete={() => remove(a)}
            color="secondary"
          />
        ))}
      </div>
    </div>
  );
});

const CategoriesInput = React.memo(({ resetKey }: { resetKey: number }) => {
  const { control, setValue } = useFormContext<FormValues>();
  const categories = useWatch({ control, name: "categories" });
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, [resetKey]);

  const add = () => {
    const val = input.trim();
    if (val && !categories.includes(val)) {
      setValue("categories", [...categories, val]);
      setInput("");
    }
  };

  const remove = (val: string) => {
    setValue(
      "categories",
      categories.filter((c) => c !== val)
    );
  };

  return (
    <div className="flex flex-col w-1/2 gap-2">
      <div className="flex items-center">
        <TextField
          label="Add Category"
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
        {categories.map((c) => (
          <Chip key={c} label={c} onDelete={() => remove(c)} color="primary" />
        ))}
      </div>
    </div>
  );
});

export const AddCustomBook = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      ...initialFormValues,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const [currentlyReading, setCurrentlyReading] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    if (!data.startDate) return;

    const finalData: Omit<Book, "id"> = {
      ...data,
      publishedDate: data.publishedDate
        ? new Date(dayjs(data.publishedDate).format("YYYY-MM-DD"))
        : undefined,
      startDate: new Date(data.startDate.format("YYYY-MM-DD")),
      endDate: currentlyReading
        ? undefined
        : data.endDate
        ? new Date(data.endDate.format("YYYY-MM-DD"))
        : undefined,
      link: "",
      imageLink: "",
    };

    console.log("Book submitted:", finalData);
  };

  const handleReset = () => {
    reset(initialFormValues);

    setCurrentlyReading(false);
    setFormResetKey((prev) => prev + 1);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col xl:flex-row gap-10 lg:gap-5 h-full w-full"
      >
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
          />

          <div className="flex flex-row gap-4 w-full">
            <AuthorsInput resetKey={formResetKey} />
            <CategoriesInput resetKey={formResetKey} />
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
                    onChange={(date) => field.onChange(date)}
                    disableFuture
                    slotProps={{ field: { clearable: true } }}
                    className="w-full"
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              label="Page Count"
              type="number"
              {...register("pageCount", {
                min: 1,
                //parsujemy stringa na liczbę, zeby nie zwracac NaN
                setValueAs: (value) => {
                  const parsed = parseInt(value, 10);
                  return isNaN(parsed) ? undefined : parsed;
                },
              })}
              className="w-full"
            />
          </div>

          <TextField
            label="Description"
            multiline
            rows={4}
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
                rules={{ required: "Start date cannot be empty." }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    disableFuture
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
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
                    onChange={(date) => field.onChange(date)}
                    disabled={currentlyReading}
                    disableFuture
                    slotProps={{ field: { clearable: true } }}
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
                    if (!currentlyReading) setValue("endDate", null);
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

          <div className="flex gap-2 mb-5">
            <Button onClick={handleReset} className="w-1/2">
              RESET
            </Button>
            <Button type="submit" className="w-1/2">
              SUBMIT
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
