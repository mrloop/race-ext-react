import React from 'react';
import ReactDOM from 'react-dom';
import EventButton from './EventButton';
import EntrantsModal from './EntrantsModal';

export default class SetupEvents {
  constructor(document) {
    this.doc = document;
  }

  init() {
    this.tidyUp();
    this.initDesktop();
    this.initMobile();
    this.initModal();
  }

  get table() {
    return this.doc.getElementsByClassName('article--events__table')[0];
  }

  initDesktop() {
    Array.from(this.table.getElementsByClassName('events--desktop__row')).forEach((row, index) => {
      if(index === 0) {
        this.addHeader(row);
      } else {
        let td = this.doc.createElement('td');
        row.appendChild(td);
        let link = row.querySelector('[data-event-id]');
        if(link) {
          let id = link.getAttribute('data-event-id');
          let containerElement = this.doc.createElement('div');
          containerElement.setAttribute('event-id', id);
          td.setAttribute('class', 'events--event__column race-ext__desktop');
          td.appendChild(containerElement);
          this.render(<EventButton eventId={id} />, containerElement);
        }
      }
    });
  }

  initMobile() {
    Array.from(this.table.getElementsByClassName('events--mobile__row')).forEach((row, index) => {
      if(index > 0) {
        let link = row.querySelector('[data-event-id]')
        if(link) {
          let id = link.getAttribute('data-event-id');
          let buttons = row.getElementsByClassName('events--mobile__link__buttons')[0];
          let containerElement = this.doc.createElement('div');
          containerElement.setAttribute('event-id', id);
          containerElement.setAttribute('class', 'race-ext__mobile');
          buttons.appendChild(containerElement);
          this.render(<EventButton />, containerElement);
        }
      }
    });
  }

  tidyUp() {
    ['race-ext__mobile', 'race-ext__desktop', 'race-ext-modal'].forEach( className => {
      Array.from(this.doc.getElementsByClassName(className)).forEach( elem => elem.remove());
    });
  }

  initModal() {
    let modalElem = this.doc.createElement('div');
    modalElem.setAttribute('class', 'race-ext-modal');
    this.doc.body.appendChild(modalElem);
    this.render(<EntrantsModal />, modalElem);
  }

  addHeader(row) {
    const heading = this.doc.createElement('th');
    const text = this.doc.createTextNode('race ext');
    heading.setAttribute('class', 'race-ext__desktop');
    heading.appendChild(text);
    row.appendChild(heading);
  }

  render(component, element) {
    ReactDOM.render(
      <React.StrictMode>
        {component}
      </React.StrictMode>,
    element
    );
  }
}
