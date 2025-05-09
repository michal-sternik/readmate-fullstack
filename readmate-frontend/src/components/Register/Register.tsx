import { useForm, Controller, FormProvider } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import registerImage from "../../assets/images/register.png";

import { Button } from "../Button/Button";

import { toDateOrUndefined } from "../../lib/utils";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Dayjs | null;
  gender: "male" | "female" | "other";
};

const initialFormValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: null,
  gender: "male",
};

type RegisterUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  gender: "male" | "female" | "other";
};

export const Register = () => {
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

    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log("test");

    const finalData: Omit<RegisterUser, "id"> = {
      ...data,
      birthDate: toDateOrUndefined(data.birthDate)!,
    };

    console.log("User registered:", finalData);
  };

  const handleReset = () => {
    reset(initialFormValues);
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col-reverse xl:flex-row xl:flex-row gap-10 lg:gap-5 h-full w-full">
        <div className="flex flex-col w-full xl:w-1/2 h-full justify-between gap-5">
          <div className="flex flex-col w-full gap-4 overflow-auto scrollbar-hide">
            <div className="text-2xl font-extrabold text-[#A449FF]">
              Create new Account
            </div>

            <TextField
              label="Username"
              {...register("username", {
                required: "Username cannot be empty.",
              })}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              required
            />

            <TextField
              label="Email"
              {...register("email", { required: "Email cannot be empty." })}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              required
            />

            <TextField
              label="Password"
              type="password"
              {...register("password", {
                required: "Password cannot be empty.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              })}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              required
            />

            <TextField
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password cannot be empty.",
                validate: (value) =>
                  value === form.getValues("password") ||
                  "Passwords must match.",
              })}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: "Birth date cannot be empty." }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Birth Date"
                    value={field.value ? dayjs(field.value) : null}
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
            </LocalizationProvider>
          </div>
          <div className="flex gap-2 mb-5">
            <Button onClick={handleReset} className="w-1/2">
              RESET
            </Button>
            <Button onClick={handleSubmit(onSubmit)} className="w-1/2">
              SUBMIT
            </Button>
          </div>
        </div>
        <div className="flex xl:w-1/2 inline lg:hidden xl:inline flex items-center justify-center p-5">
          <img
            src={registerImage}
            alt="register image"
            className="max-w-full w-full h-50 xl:h-full object-contain"
          />
        </div>
      </div>
    </FormProvider>
  );
};
