import "../css/home.css";

import { Link } from "react-router-dom";

import { useAuthContext } from "../context/useAuthContext";

export const Home = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <section className="main__container">
      <div className="home">
        {isAuthenticated ? (
          <>
            <h1>Welcome back</h1>
            <div className="home__links">
              <Link to="/tasks">Tasks</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome</h1>
            <div className="home__links">
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
        ;
      </div>
    </section>
  );
};
