import React from "react";
import "./EventButton.css";

export default function EventButton(props) {
  function viewEntrants() {
    window.dispatchEvent(
      new CustomEvent("entrants", { detail: props.eventId })
    );
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
