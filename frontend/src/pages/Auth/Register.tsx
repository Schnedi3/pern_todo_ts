import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../context/useAuthContext";
import { IUser } from "../../types/types";
import { iconEyeClose, iconEyeOpen } from "../../Routes";

export const Register = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const { registerUser } = useAuthContext();

  const onSubmit = (data: IUser) => {
    registerUser(data);
  };

  return (
    <section className="main_container">
      <form
        className="auth_form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="title">
          <h2>Create an account</h2>
          <button type="submit">Sign up</button>
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
        </article>

        <article className="auth_footer">
          <p>Already have an account?</p>
          <Link to="/Login">Login</Link>
        </article>
      </form>
    </section>
  );
};
