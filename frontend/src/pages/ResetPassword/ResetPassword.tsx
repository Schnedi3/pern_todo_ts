import { useForm } from "react-hook-form";

import { useAuthContext } from "../../context/useAuthContext";
import { ILogin } from "../../types/types";

export const ResetPassword = () => {
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
          <input
            className={errors.password ? "input_error" : ""}
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 8 })}
          />
        </article>
      </form>
    </section>
  );
};
