import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../app_actions/auth";

const initialState = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    firstname,
    lastname,
    email,
    username,
    password,
    confirmPassword,
  } = formData;

  const dispatch = useDispatch();

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const {
      username,
      password,
      confirmPassword,
      firstname,
      lastname,
      email,
    } = formData;

    // Build user object
    const userData = {
      username,
      password,
      confirmPassword,
      firstname,
      lastname,
      email,
    };
    console.log(userData);
    // await dispatch(register(userData));
  };

  return (
    <Fragment>
      <form className="text-muted" onSubmit={onSubmit} id="register-form">
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            className="form-control app-input"
            type="text"
            name="firstname"
            value={firstname}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>
          <input
            className="form-control app-input"
            type="text"
            name="lastname"
            value={lastname}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control app-input"
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control app-input"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control app-input"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control app-input"
            type="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </Fragment>
  );
};

export default RegisterForm;
