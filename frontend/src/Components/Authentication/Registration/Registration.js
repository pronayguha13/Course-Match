import React from "react";

const Registration = () => {
  return (
    <div>
      <h3>Registration Page</h3>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="Name">Name</label>
            <input type="text" name="name" className="form-control" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmail4"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputRoll">University Roll Number</label>
            <input type="text" className="form-control" name="roll_number" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
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
