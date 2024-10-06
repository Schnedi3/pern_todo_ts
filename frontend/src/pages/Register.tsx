import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "../context/useAuthContext";
import { registerSchema } from "../schemas/schemas";
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
  const { signup, isAuthenticated, error } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const submitForm = handleSubmit((values) => {
    signup(values);
  });

  return (
    <section className="main_container">
      <form className="auth_form" autoComplete="off" onSubmit={submitForm}>
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
          {error && <p className="error">{error}</p>}
          <Link to="/">Already have an account</Link>
        </div>
      </form>
    </section>
  );
};
