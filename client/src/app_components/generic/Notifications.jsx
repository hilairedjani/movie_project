import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory } from "react-router-dom";

const Notifications = () => {
  const { socketRef: socket } = useSelector((state) => state.sockets);
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("followed", (data) => {
        // Add socket id to headers
        const { follower } = data;
        NotificationManager.info(
          `${follower.username} just followed you`,
          "New follower",
          0,
          () => history.push(`/users/${follower._id}`)
        );
      });
    }
    return () => {};
  }, [socket]);
  return <NotificationContainer></NotificationContainer>;
};

export default Notifications;
