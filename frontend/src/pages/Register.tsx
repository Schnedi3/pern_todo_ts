import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegister } from "../hooks/useValidateForm";
import { useAuthContext } from "../context/useAuthContext";
import "../css/auth.css";

export const Register = () => {
  const { register, handleSubmit, errors } = useRegister();
  const { signup, isAuthenticated, error } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const submitForm = handleSubmit((values) => {
    signup(values);
  });

  return (
    <section className="main__container">
      <form className="auth__form" autoComplete="off" onSubmit={submitForm}>
        <div className="title">
          <h2>Create an account</h2>
          <button type="submit">Sign up</button>
        </div>
        <div className="form__content">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
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
