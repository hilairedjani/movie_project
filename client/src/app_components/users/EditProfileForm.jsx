import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../app_actions/users";

const initialState = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  role: "",
};

const EditProfileForm = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialState);

  const { firstname, lastname, email, username, role } = formData;

  const dispatch = useDispatch();

  useEffect(() => {
    const { firstname, lastname, email, username, role } = user;

    setFormData({ ...formData, firstname, lastname, username, email, role });

    return () => {};
  }, []);

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { username, firstname, lastname, email } = formData;

    // Build user object
    const profileData = {
      username,
      firstname,
      lastname,
      email,
      role,
    };
    dispatch(updateProfile(profileData));
  };

  return (
    <Fragment>
      <form className="text-muted" onSubmit={onSubmit} id="edit-profile-form">
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            className="form-control app-input"
            type="text"
            name="firstname"
            value={firstname}
            onChange={onChange}
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

        <input
          type="submit"
          className="btn btn-primary"
          value="Submit"
          onClick={onSubmit}
          data-dismiss="modal"
        />
      </form>
    </Fragment>
  );
};

export default EditProfileForm;
