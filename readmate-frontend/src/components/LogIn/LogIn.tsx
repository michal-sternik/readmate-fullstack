import { useForm, FormProvider } from "react-hook-form";
import { TextField } from "@mui/material";
import registerImage from "../../assets/images/register.png";

import { Button } from "../Button/Button";
import { UserService } from "../../api/services/userService";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import { convertAndDisplayError } from "../../lib/utils";

export type LoginFormValues = {
  email: string;
  password: string;
};

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LogIn = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      ...initialFormValues,
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await UserService.login(data);
      dispatch(fetchUserProfile());
      navigate("/");
    } catch (error) {
      convertAndDisplayError(error);
    }
  };

  const handleReset = () => {
    reset(initialFormValues);

    //wymusza zmiane referencji funkcji przekazywanej do TagsInput
    //zeby zresetowac inputy
  };

  return (
    <FormProvider {...form}>
      <form
        onClick={handleSubmit(onSubmit)}
        className="flex flex-col-reverse xl:flex-row xl:flex-row gap-10 lg:gap-5 h-full w-full"
      >
        <div className="flex flex-col w-full xl:w-1/2 h-full justify-between gap-5">
          <div className="flex flex-col w-full gap-4 overflow-auto scrollbar-hide">
            <div className="text-2xl font-extrabold text-[#A449FF]">
              Log in to existing account
            </div>

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
