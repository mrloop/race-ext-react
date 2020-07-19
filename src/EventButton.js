import React from 'react';

export default function EventButton(props) {

  function viewEntrants() {
    window.postMessage({ eventId: props.eventId }, window.location.origin);
    console.log(props.eventId);
  }

  return (
    <button onClick={viewEntrants}>Entrants {props.eventId}</button>
  );
}
