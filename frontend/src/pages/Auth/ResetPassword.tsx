import { useState } from "react";
import { useForm } from "react-hook-form";

import { useResetPassword } from "../../api/auth";
import { IUser } from "../../types/types";
import { iconEyeClose, iconEyeOpen } from "../../Routes";
import styles from "./auth.module.css";

export const ResetPassword = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const { mutate: resetPassword } = useResetPassword();

  const onSubmit = (data: IUser) => {
    resetPassword(data);
  };

  return (
    <section className={styles.auth}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <article className={styles.header}>
          <h2 className={styles.title}>Reset your password</h2>
          <button className={styles.authButton} type="submit">
            Set new password
          </button>
        </article>

        <article className={styles.inputs}>
          <input
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <div className={styles.inputPassword}>
            <input
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              type={visiblePassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <button
              className={styles.viewPass}
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <img
                className={styles.iconEye}
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
