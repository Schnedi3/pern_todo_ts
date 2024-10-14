import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../context/useAuthContext";
import { IUser } from "../../types/types";
import { iconEyeClose, iconEyeOpen, iconGoogle } from "../../Routes";
import styles from "./auth.module.css";

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
    <section className={styles.auth}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <article className={styles.header}>
          <h2 className={styles.title}>Enter your account</h2>
          <button className={styles.authButton} type="submit">
            Log in
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

          <div className={styles.footer}>
            <Link className={styles.footerLink} to="/reset-password">
              Reset password
            </Link>
            <Link className={styles.footerLink} to="/register">
              Create an account
            </Link>
          </div>
        </article>
      </form>

      <article className={styles.separator}>
        <span></span>
        <p>or</p>
        <span></span>
      </article>

      <button className={styles.gbutton} onClick={() => loginGoogle()}>
        <img className={styles.iconGoogle} src={iconGoogle} />
        <p className={styles.gbuttonText}>Login with Google</p>
      </button>
    </section>
  );
};
