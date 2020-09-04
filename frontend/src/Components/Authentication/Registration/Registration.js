import React, { useState } from "react";
import { formValidationHandler } from "../../../helperMethods";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll_number, setRollNumber] = useState("");

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value.trimLeft());
    } else if (name === "email") {
      setEmail(value.trimLeft());
    } else if (name === "password") {
      setPassword(value.trimLeft());
    } else {
      const roll = parseInt(value);
      setRollNumber(roll);
    }
  };

  const _onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      roll_number: roll_number,
    };
    const errorField = formValidationHandler(formData, "Registration");
    console.log("_onSubmitHandler -> errorField", errorField);
    if (errorField === null) {
      console.log("Form Validated");
    } else {
      console.log("Form Is'nt validated");
    }
  };

  return (
    <div>
      <h3>Registration Page</h3>
      <form onSubmit={(e) => _onSubmitHandler(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={(e) => _onChangeHandler(e)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              id="inputEmail4"
              onChange={(e) => _onChangeHandler(e)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputRoll">University Roll Number</label>
            <input
              type="text"
              className="form-control"
              name="roll_number"
              value={roll_number}
              onChange={(e) => _onChangeHandler(e)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword4"
              value={password}
              onChange={(e) => _onChangeHandler(e)}
              required
            />
          </div>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
