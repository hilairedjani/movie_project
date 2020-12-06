import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPerson } from "../../app_actions/people";

const initialState = {
  firstname: "",
  lastname: "",
  rank: "",
};

const ranks = ["actor", "director", "writer"];

const AddPersonForm = () => {
  const [formData, setFormData] = useState(initialState);
  const { error } = useSelector((state) => state.people);

  const { firstname, lastname, rank } = formData;

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { firstname, lastname, rank } = formData;

    // Build person object
    const personData = {
      firstname,
      lastname,
      rank,
    };

    await dispatch(createPerson(personData, history));
  };

  return (
    <Fragment>
      {error.length > 0 && (
        <div className="row">
          <div className="col text-white">
            <div className="form-group bg-danger p-2">{error}</div>
          </div>
        </div>
      )}

      <form id="add-actor-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-6">
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
          </div>

          <div className="col-6">
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
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label htmlFor="rank">Rank</label>
            <select
              className="custom-select custom-select-lg mb-3 app-input"
              id="rank"
              required
              name="rank"
              onChange={onChange}
            >
              <option value="" disabled selected hidden>
                Choose a rank...
              </option>
              {ranks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default AddPersonForm;
