import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/authStore";
import { loginGoogleRequest, loginRequest } from "../../api/auth";
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
  const { isAuthenticated, authData } = useAuthStore();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeRespose) => googleLogin(codeRespose.access_token),
    onError: (error) => console.log("Login failed", error),
  });

  const googleLogin = async (accessToken: string) => {
    try {
      const { data } = await loginGoogleRequest(accessToken);

      if (!data.success) {
        console.log(data.message);
      }

      authData(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const onSubmit = (data: IUser) => {
    loginUser(data);
  };

  const loginUser = async (user: IUser) => {
    try {
      const { data } = await loginRequest(user);

      if (!data.success) {
        console.log(data.message);
      }

      authData(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);

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
