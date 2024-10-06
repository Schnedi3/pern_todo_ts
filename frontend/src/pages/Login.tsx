import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "../context/useAuthContext";
import { loginSchema } from "../schemas/schemas";
import { ILogin } from "../types/types";

import "../css/auth.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const { login, isAuthenticated, error } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const submitForm = handleSubmit((values) => {
    login(values);
  });

  return (
    <section className="main_container">
      <form className="auth_form" autoComplete="off" onSubmit={submitForm}>
        <div className="title">
          <h2>Enter your account</h2>
          <button type="submit">Log in</button>
        </div>
        <div className="form_content">
          <input
            className={errors.email ? "input_error" : ""}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            className={errors.password ? "input_error" : ""}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          {error && <p className="error">{error}</p>}
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </section>
  );
};
