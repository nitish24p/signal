'use strict';

var Signal = (function () {
  function Signal() {
    if (!Signal.instance) {
      this.events = {};
      Signal.instance = this;
    }

    return Signal.instance;
  }


  Signal.prototype.on = function (eventName, eventHandler) {
    if (!eventName) {
      throw new Error('Event name is empty')
    }

    if (!eventHandler || typeof eventHandler !== 'function') {
      throw new Error('event callback should be of type function');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(eventHandler);
  }

  Signal.prototype.emit = function (eventName, data) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(function (callback) {
      callback(data)
    });
  }

  Signal.prototype.remove = function (name, eventHandler) {
    console.log(this, "THIS");
    if (this.events && !this.events[name]) {
      return;
    }

    delete this.events[name];
  }

  return Signal;
})();

(function (root, factory) {
  var define = root.define;
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
