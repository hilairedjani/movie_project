import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../app_actions/auth";

const initialState = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialState);

  const { username, password } = formData;

  const dispatch = useDispatch();

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;

    // Build user object
    const userData = { username, password };
    await dispatch(login(userData));
  };
  return (
    <Fragment>
      <form className="text-muted" onSubmit={onSubmit} id="login-form">
        <div className="form-group">
          <label htmlFor="username">Username or Email</label>
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
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Login"
        />
      </form>
    </Fragment>
  );
};

export default LoginForm;
