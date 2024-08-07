import "../css/authform.css";
import { useAuthContext } from "../context/useAuthContext";

export const AuthForm = () => {
  const {
    setUsername,
    setEmail,
    setPassword,
    error,
    hasAccount,
    setHasAccount,
    handleOnSubmit,
  } = useAuthContext();

  return (
    <form className="auth__form" onSubmit={handleOnSubmit}>
      <div className="title">
        <h2>{hasAccount ? "Enter your account" : "Create an account"}</h2>
        <button type="submit">{hasAccount ? "Log in" : "Sign up"}</button>
      </div>
      <div className="form__content">
        <input
          type="text"
          placeholder="Username"
          id={hasAccount ? "hidden" : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <h6 className="error">{error.message}</h6>}
        <p onClick={() => setHasAccount(!hasAccount)}>
          {hasAccount ? "Create an account" : "Already have an account"}
        </p>
      </div>
    </form>
  );
};
