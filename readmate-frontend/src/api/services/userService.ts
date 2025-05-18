import { LoginFormValues } from "../../components/LogIn/LogIn";
import { RegisterFormValues } from "../../components/Register/Register";
import { User } from "../../types/usertypes";
import { booksApi } from "../api";

export class UserService {
  public static async getUserProfile(): Promise<User> {
    const userData = await booksApi.get("/user");
    return userData.data;
  }
  public static async login(form: LoginFormValues): Promise<void> {
    const token = (await booksApi.post("/auth/login", form)).data;
    localStorage.setItem("token", token);
  }
  public static async register(form: RegisterFormValues): Promise<void> {
    await booksApi.post("/auth/register", form);
  }
}
