import React from "react";
import Async from "./Async";
import UserList from "./UserList";

export default function RaceDetail({ race }) {
  if (!race) {
    return "";
  }

  return (
    <>
      <div className="race-ext-modal__content-body">
        <h3>{race.name}</h3>
      </div>
      <span className="race-ext-race-detail-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>Regional Rank</th>
              <th>National Rank</th>
            </tr>
          </thead>
          <tbody>
            <Async
              fnc={() => race.entrants2()}
              loading={() => (
                <tr>
                  <td colSpan="4">Race Detail Loading...</td>
                </tr>
              )}
              loaded={(ac) => <UserList users={ac.state} />}
              error={(ac) => <tr>Race Detail Error: {ac.state.message}</tr>}
            />
          </tbody>
        </table>
      </span>
    </>
  );
}
