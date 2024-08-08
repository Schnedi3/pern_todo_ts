import "../css/auth.css";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useValidateForm";
import { useAuthContext } from "../context/useAuthContext";

export const Login = () => {
  const { register, handleSubmit, errors } = useLogin();
  const { login, isAuthenticated, error } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const submitForm = handleSubmit((values) => {
    login(values);
  });

  return (
    <section className="main__container">
      <form className="auth__form" autoComplete="off" onSubmit={submitForm}>
        <div className="title">
          <h2>Enter your account</h2>
          <button type="submit">Log in</button>
        </div>
        <div className="form__content">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
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
