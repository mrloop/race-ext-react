import React, { useState } from 'react';
import RaceDetail from './RaceDetail';

export default function RaceList(props) {
  const [selectedRace, selectRace] = useState(null);

  let listItems = ''
  if (props.races) {
    listItems = props.races.map((race) =>
      <li key={race.id}>
        <button className="race-ext-race-list-link" onClick={() => selectRace(race)}>{race.name}</button>
      </li>
    )
  }

  return (
    <>
    <ul className="race-ext-race-list race-ext-modal__content-body">{listItems}</ul>
    <RaceDetail race={selectedRace} />
    </>
  )
}
