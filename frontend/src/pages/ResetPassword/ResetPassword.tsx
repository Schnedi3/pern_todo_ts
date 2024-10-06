import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../context/useAuthContext";
import { ILogin } from "../../types/types";
import { iconEyeClose, iconEyeOpen } from "../../Routes";

export const ResetPassword = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const { resetPassword } = useAuthContext();

  const onSubmit = (data: ILogin) => {
    resetPassword(data);
  };

  return (
    <section className="main_container">
      <form
        className="auth_form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="title">
          <h2>Reset your password</h2>
          <button type="submit">Set new password</button>
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
      </form>
    </section>
  );
};
