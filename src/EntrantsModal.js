import React, { useState, useEffect } from 'react';
import RaceList from './RaceList';
import { Event as CycleEvent } from 'race-lib';
import query from 'jquery'; // TODO can I use 'cash-dom'?

query.load = function(htmlString) {
  const o = query(query.parseHTML(htmlString));
  return function (selector) {
    return o.find(selector);
  }
}

CycleEvent.inject('fetch', window.fetch.bind());
CycleEvent.inject('cheerio', query);

export default function EntrantsModal() {
  const [className, setClassName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const events = {};

  useEffect(() => {
    window.addEventListener('message', receiveMessage);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  })

  function receiveMessage(msg) {
    console.debug(msg);
    if(msg.data.eventId && msg.origin === window.location.origin) {
      const cachedEvent = events[msg.data.eventId];
      if(!cachedEvent || cachedEvent.id !== msg.data.eventId) {
        new CycleEvent(msg.data.eventId).init().then((evt) => {
          setSelectedEvent(evt);
          events[msg.data.eventId] = evt;
          setClassName("race-ext-modal--show");
        });
      } else if(cachedEvent) {
        setSelectedEvent(cachedEvent);
        setClassName("race-ext-modal--show");
      }
    }

  }

  function close() {
    setSelectedEvent(null);
    setClassName("race-ext-modal--hide");
  }

  return (
    <>
    <div class={`race-ext-modal__content ${className}`}>
      <h3 class="race-ext-modal__content-title">{selectedEvent.name}</h3>
      <RaceList races={selectedEvent.races} />
    </div>

    <div class="race-ext-modal__overlay {className}" onClick={close}></div>
    </>
  );
}

