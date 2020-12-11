// Implements publish/subscribe behaviour that can be applied to any object,
// so that object can be listened for custom events. "this" context is the
// object with Map "listeners" property used to store handlers.

export default class EventEmitter {
  /**
   * Registers listener function to be executed once event occurs.
   * @param {string} name Name of the event to listen for.
   * @param {function} handler Handler to be executed once event occurs.
   */
  on(name, handler) {
    if (!this.listeners) {
      this.listeners = new Map();
    }

    let handlers = this.listeners.get(name);
    if (!handlers) {
      handlers = new Set();
      this.listeners.set(name, handlers);
    }

    // Set.add ignores handler if it has been already registered
    handlers.add(handler);
  }

  /**
   * Removes registered listener for the specified event.
   * @param {string} name Name of the event to remove listener for.
   * @param {function} handler Handler to remove, so it won't be executed
   * next time event occurs.
   */
  off(name, handler) {
    const handlers = this.listeners.get(name);
    if (!handlers) {
      return;
    }

    handlers.delete(handler);

    if (!handlers.size) {
      this.listeners.delete(name);
    }
  }

  /**
   * Removes all registered listeners for the specified event.
   * @param {string} name Name of the event to remove all listeners for.
   */
  offAll(name) {
    if (typeof name === 'undefined') {
      this.listeners.clear();
      return;
    }
    this.listeners.delete(name);
  }

  /**
   * Emits specified event so that all registered handlers will be called
   * with the specified parameters.
   * @param {string} name Name of the event to call handlers for.
   * @param {Object} parameters Optional parameters that will be passed to
   * every registered handler.
   */
  emit(name, ...parameters) {
    if (!this.listeners) {
      this.listeners = new Map();
    }

    const handlers = this.listeners.get(name);
    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => {
      try {
        handler(...parameters);
      } catch (e) {
        console.error(e);
      }
    });
  }
}
