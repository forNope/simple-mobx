class EventEmitter {
  listeners = {}

  on (event, listener) {
    if (!this.listeners[event]) this.listeners[event] = new Set()
    this.listeners[event].add(listener)
  }

  off (event, listener) {
    if (this.listeners[event] && listener)
      this.listeners[event].delete(listener)
    else
      this.listeners[event].clear()
  }

  once (event, listener) {
    const self = this
    this.on(event, function func () {
      listener.apply(null, arguments)
      self.off(event, func)
    })
  }

  emit (event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener.apply(null, args))
    }
  }
}

export default new EventEmitter()