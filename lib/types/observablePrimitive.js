import { eventEmitter } from '../utils'

export default function observablePrimitive (target) {
  return {
    _observers: new Set(),
    get () {
      eventEmitter.emit('getter', this)
      return target
    },
    set (val) {
      eventEmitter.emit('setter', this)
      target = val
    },
  }
}