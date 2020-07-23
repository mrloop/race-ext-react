import React from "react";
import "./EventButton.css";

export default function EventButton(props) {
  function viewEntrants() {
    window.postMessage({ eventId: props.eventId }, window.location.origin);
  }

  return (
    <button
      onClick={viewEntrants}
      className="race-ext__button button button--secondary"
    >
      Entrants
    </button>
  );
}
