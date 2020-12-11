import React from 'react';
import ReactDOM from 'react-dom';

import EventEmitter from '../event-emitter';

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.E = new EventEmitter();
  }

  handleEvent(evt) {
    if (typeof this._pre_handleEvent === 'function') {
      const shouldContinue = this._pre_handleEvent(evt);
      if (shouldContinue === false) {
        return;
      }
    } else {
      this.debug('no handle event pre found. skip');
    }
    if (typeof this[`_handle_${evt.type}`] === 'function') {
      this.debug(`handling ${evt.type}`);
      this[`_handle_${evt.type}`](evt);
    }
    if (typeof this._post_handleEvent === 'function') {
      this._post_handleEvent(evt);
    }
  }

  elRef = el => {
    this.el = el;
  }

  show() {
    ReactDOM.findDOMNode(this).classList.remove('hidden');
    this.focus();
    this.emit('opened');
  }

  hide() {
    ReactDOM.findDOMNode(this).classList.add('hidden');
    this.emit('closed');
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  _changeState(type, state) {
    ReactDOM.findDOMNode(this).setAttribute(`${type}-state`, state.toString());
  }

  isHidden() {
    return ReactDOM.findDOMNode(this).classList.contains('hidden');
  }

  isActive() {
    return !ReactDOM.findDOMNode(this).classList.contains('hidden');
  }

  publish(event, detail) {
    // Dispatch internal event before external events.
    this.broadcast(event, detail);
    const evt = new CustomEvent(this.EVENT_PREFIX + event, {
      bubbles: true,
      detail: detail || this
    });

    this.debug(`publishing external event: ${event}${detail ? JSON.stringify(detail) : ''}`);

    ReactDOM.findDOMNode(this).dispatchEvent(evt);
  }

  broadcast(event, detail) {
    // Broadcast internal event.
    if (ReactDOM.findDOMNode(this)) {
      const internalEvent = new CustomEvent(`_${event}`, {
        bubbles: false,
        detail: detail || this
      });

      // this.debug('publishing internal event: ' + event);
      ReactDOM.findDOMNode(this).dispatchEvent(internalEvent);
    }
  }

  observe(name, value) {
    if (!this._settings) {
      this._settings = {};
    }
    this._settings[name] = value;
    if (typeof this[`_observe_${name}`] === 'function') {
      this[`_observe_${name}`](value);
    }
  }

  debug(...args) {
    if (this.DEBUG) {
      console.log(`[${this.name}] ${args.concat()}`);
      if (this.TRACE) {
        console.trace();
      }
    }
  }

  on(name, handler) {
    this.E.on(name, handler);
  }

  off(name, handler) {
    this.E.off(name, handler);
  }

  offAll(name) {
    this.E.offAll(name);
  }

  emit(name, ...parameters) {
    this.E.emit(name, ...parameters);
  }
}
