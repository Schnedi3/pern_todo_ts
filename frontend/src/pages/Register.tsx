import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "../context/useAuthContext";
import { registerSchema } from "../schemas/schema";
import { IRegister } from "../types/types";

import "../css/auth.css";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });
  const { registerUser } = useAuthContext();

  const onSubmit = (data: IRegister) => {
    registerUser(data);
  };

  return (
    <section className="main_container">
      <form
        className="auth_form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="title">
          <h2>Create an account</h2>
          <button type="submit">Sign up</button>
        </div>

        <div className="form_content">
          <input
            className={errors.username ? "input_error" : ""}
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
          <input
            className={errors.email ? "input_error" : ""}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            className={errors.password ? "input_error" : ""}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <Link to="/">Already have an account</Link>
        </div>
      </form>
    </section>
  );
};
