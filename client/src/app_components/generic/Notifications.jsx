import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory } from "react-router-dom";

const Notifications = () => {
  const { socketRef: socket } = useSelector((state) => state.sockets);
  const { currentProfile } = useSelector((state) => state.users);

  const history = useHistory();

  // Add user to room of all following
  // useEffect(() => {
  //   if (currentProfile && socket) {
  //     currentProfile.following.map((fl) => {
  //       socket.join(fl);
  //       console.log("Joined room");
  //     });
  //   }
  //   return () => {};
  // }, [currentProfile]);

  useEffect(() => {
    if (socket) {
      socket.on("followed", (data) => {
        // Add socket id to headers
        const { follower } = data;
        NotificationManager.info(
          `${follower.username} just followed you`,
          "New follower",
          2000,
          () => history.push(`/users/${follower._id}`)
        );
      });

      socket.on("addedMovie", (data) => {
        // Add socket id to headers
        const { contribution } = data;
        const url =
          contribution.type == "Movie"
            ? `/movies/${contribution._item}`
            : `/people/${contribution._item}`;
        NotificationManager.info(
          `${contribution._user.username} just added a contribution`,
          "New contribution",
          2000,
          () => history.push(url)
        );
      });
    }
    return () => {};
  }, [socket]);

  return <NotificationContainer></NotificationContainer>;
};

export default Notifications;
