import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "../../app_actions/people";
import PersonItem from "./PersonItem";

const People = () => {
  const dispatch = useDispatch();

  const { people, loading } = useSelector((state) => state.people);
  const { loading: usersLoading } = useSelector((state) => state.users);

  useEffect(() => {
    // Fetch people
    dispatch(getPeople(0, 20));
    return () => {};
  }, []);

  if (loading || usersLoading) return <h1>Loading...</h1>;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4 className="text-white">People</h4>

        <hr className="text-muted" />

        <div className="card-columns">
          {people.map((person) => (
            <PersonItem key={person._id} person={person}></PersonItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
