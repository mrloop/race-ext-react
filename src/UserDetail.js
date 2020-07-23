import React from "react";
import Async from "./Async";

export default function UserDetail({ user }) {
  if (!user) {
    return "";
  }

  return (
    <tr>
      <td>
        <a href={user.points_href} target="_blank" rel="noopener noreferrer">
          {user.name}
        </a>
      </td>
      <Async
        fnc={() => user.pointsPromise}
        loading={() => (
          <td colSpan="3">
            <a
              href={user.points_href}
              target="_blank"
              rel="noopener noreferrer"
            >
              loading...
            </a>
          </td>
        )}
        loaded={() => (
          <>
            <td>
              <a
                href={user.points_href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.current_club}
              </a>
            </td>
            <td>
              <a
                href={user.points_href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {999 === user.regional_rank ? "" : user.regional_rank}
              </a>
            </td>
            <td>
              <a
                href={user.points_href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {999 === user.national_rank ? "" : user.national_rank}
              </a>
            </td>
          </>
        )}
        error={() => (
          <td colSpan="3">
            <a
              href={user.points_href}
              target="_blank"
              rel="noopener noreferrer"
            >
              error
            </a>
          </td>
        )}
      />
    </tr>
  );
}
