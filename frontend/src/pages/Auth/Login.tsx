import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../context/useAuthContext";
import { IUser } from "../../types/types";
import { iconEyeClose, iconEyeOpen, iconGoogle } from "../../Routes";
import "./auth.css";

export const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const { loginGoogle, loginUser, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: IUser) => {
    loginUser(data);
  };

  return (
    <section className="main_container">
      <form
        className="auth_form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="title">
          <h2>Enter your account</h2>
          <button type="submit">Log in</button>
        </article>

        <article className="form_content">
          <input
            className={errors.email ? "input_error" : ""}
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <div>
            <input
              className={errors.password ? "input_error" : ""}
              type={visiblePassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <button
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <img
                src={visiblePassword ? iconEyeClose : iconEyeOpen}
                alt="password visibility"
              />
            </button>
          </div>

          <div className="auth_footer">
            <Link to="/reset-password">Reset password</Link>
            <Link to="/register">Create an account</Link>
          </div>
        </article>
      </form>

      <article className="separator">
        <span></span>
        <p>or</p>
        <span></span>
      </article>

      <button className="gbutton" onClick={() => loginGoogle()}>
        <img src={iconGoogle} />
        <p>Login with Google</p>
      </button>
    </section>
  );
};
