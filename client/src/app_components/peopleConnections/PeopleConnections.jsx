import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPeopleConnections } from "../../app_actions/peopleConnections";

const PeopleConnections = ({ _user }) => {
  const dispatch = useDispatch();
  const { loading, connections } = useSelector(
    (state) => state.peopleConnections
  );

  useEffect(() => {
    // Fetch user connections
    dispatch(getPeopleConnections(_user));
    return () => {};
  }, []);

  if (loading) return <h3>Loading...</h3>;

  if (connections.length === 0)
    return (
      <Fragment>
        <h6>Not following any people</h6>
      </Fragment>
    );

  return (
    <Fragment>
      {connections.map((connection) => (
        <Fragment key={connection._id}>
          <div className="card card-body mb-1 py-2">
            <div className="row">
              <div className="col-auto">
                <i className="fas fa-user-circle fa-3x"></i>
              </div>

              <div className="col">
                <h6>
                  {connection._person.firstname} {connection._person.lastname}
                </h6>
                {connection._person.rank}
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default PeopleConnections;
