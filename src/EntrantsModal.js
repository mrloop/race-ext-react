import React, { useState, useEffect } from "react";
import RaceList from "./RaceList";
import { Event as CycleEvent } from "race-lib";
import query from "jquery"; // TODO can I use 'cash-dom'?
import "./EntrantsModal.css";

// uncomment this to use fixture data in development mode
// TODO how do I only run this code / import race-fix in development?
// import { injectFixtures } from "race-fix";
// injectFixtures(CycleEvent);

CycleEvent.inject("fetch", window.fetch.bind());
CycleEvent.inject("cheerio", query);

query.load = function (htmlString) {
  const o = query(query.parseHTML(htmlString));
  return function (selector) {
    return o.find(selector);
  };
};

export default function EntrantsModal() {
  const [classes, setClasses] = useState("race-ext-modal--hide");
  const [selectedEvent, setSelectedEvent] = useState("");
  const events = {};

  useEffect(() => {
    window.addEventListener("entrants", receiveMessage);
    return () => {
      window.removeEventListener("entrants", receiveMessage);
    };
  });

  function receiveMessage(msg) {
    const eventId = msg.detail;
    if (eventId) {
      const cachedEvent = events[eventId];
      if (!cachedEvent || cachedEvent.id !== eventId) {
        new CycleEvent(eventId).init().then((evt) => {
          setSelectedEvent(evt);
          events[eventId] = evt;
          setClasses("race-ext-modal--show");
        });
      } else if (cachedEvent) {
        setSelectedEvent(cachedEvent);
        setClasses("race-ext-modal--show");
      }
    }
  }

  function close() {
    setSelectedEvent(null);
    setClasses("race-ext-modal--hide");
  }

  if (!selectedEvent) {
    return "";
  }

  return (
    <>
      <div className={`race-ext-modal__content ${classes}`}>
        <h3 className="race-ext-modal__content-title">{selectedEvent.name}</h3>
        <RaceList races={selectedEvent.races} />
      </div>

      <div
        className={`race-ext-modal__overlay ${classes}`}
        onClick={close}
      ></div>
    </>
  );
}
