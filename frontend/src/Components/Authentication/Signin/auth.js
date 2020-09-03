import React from "react";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";

const auth = () => {
  return (
    <div className={styles.SignIn}>
      <h3>Sign in Page</h3>
      <form>
        <div className="form-group row">
          <label htmlFor="roll_number" className="col-sm-2 col-form-label">
            University Roll Number
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="roll_number" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            <p>
              {" "}
              if you dont have an account <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default auth;
