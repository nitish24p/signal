'use strict';

const Signal = (function () {
  function Signal() {
    if (!Signal.instance) {
      this.events = {};
      this.id = 0;
      Signal.instance = this;
    }

    return Signal.instance;
  }


  Signal.prototype.on = function (eventName, eventHandler) {
    if (!eventName) {
      throw new ReferenceError('Event name is empty')
    }

    if (!eventHandler || typeof eventHandler !== 'function') {
      throw new ReferenceError('Event callback should be of type function');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = {};
    }

    const signalId = eventHandler._signalId || (eventHandler._signalId = (++this.id));
    this.events[eventName][signalId] = eventHandler;
  }

  Signal.prototype.emit = function (eventName, data) {
    if (!this.events[eventName]) {
      return;
    }

    const eventHandlerList = this.events[eventName];
    Object.keys(eventHandlerList).forEach(function (key) {
      eventHandlerList[key] && eventHandlerList[key](data);
    });

  }

  Signal.prototype.remove = function (eventName, eventHandler, removeAll) {
    if (this.events && !this.events[eventName]) {
      return;
    }

    if (removeAll) {
      delete this.events[eventName];
      return;
    }

    if (eventHandler.name === '') {
      console.warn(`
        you are trying to remove an event handler for then event named ${eventName} 
        but the function is annonymous. 
      `)
      return;
    }

    if (this.events && !this.events[eventName]) {
      return;
    }

    const eventHandlerList = this.events[eventName];

    const signalId = eventHandler._signalId;
    delete eventHandlerList[signalId];

  }

  return Signal;
})();

(function (root, factory) {
  const define = root.define;
  if (define && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Signal = factory();
  }
}(this, function () {
  return Signal;
}));
