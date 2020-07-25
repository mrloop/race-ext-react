import React from "react";
import UserDetail from "./UserDetail";
import { User } from "race-lib";

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return <span>No Entrants</span>;
  }
  return User.sort(users).map((user, index) => (
    <UserDetail user={user} key={user.id} index={index} />
  ));
}
