import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import registerImage from "../../assets/images/register.png";

import { Button } from "../Button/Button";

import { convertAndDisplayError } from "../../lib/utils";
import { Gender } from "../../types/usertypes";
import { UserService } from "../../api/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string | null;
  gender: Gender;
};

const initialFormValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: null,
  gender: Gender.MALE,
};

export const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
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

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    try {
      const payload = {
        ...data,
        birthDate: data.birthDate
          ? dayjs(data.birthDate).format("YYYY-MM-DD")
          : null,
      };
      await UserService.register(payload);
      toast.success("Registered successfully, now log in!");
      navigate("/login");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  const handleReset = () => {
    reset(initialFormValues);
  };
  console.log(form.getValues());
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col-reverse xl:flex-row xl:flex-row gap-10 lg:gap-5 h-full w-full"
      >
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
                rules={{
                  required: "Birth date cannot be empty.",
                  validate: (value: string | null) => {
                    if (!value) return "Birth date cannot be empty.";
                    const date = dayjs(value);
                    if (!date.isValid()) return "Invalid date format.";
                    if (date.isBefore(dayjs("1900-01-01"), "day"))
                      return "Birth date cannot be before January 1, 1900.";
                    if (date.isAfter(dayjs(), "day"))
                      return "Birth date cannot be in the future.";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Birth Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date : null)}
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
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            </LocalizationProvider>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required." }}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={Gender.MALE}
                  {...field}
                  value={field.value}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={Gender.MALE}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value={Gender.FEMALE}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value={Gender.OTHER}
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
          </div>
          <div className="flex gap-2 mb-5">
            <Button type="button" onClick={handleReset} className="w-1/2">
              RESET
            </Button>
            <Button
              type="submit"
              className="w-1/2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "LOADING..." : "SUBMIT"}
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
      </form>
    </FormProvider>
  );
};
