import { eventEmitter, forEach } from '../utils'

const handler = {
  get (target, prop, receiver) {
    if (typeof target[prop] !== 'object') {
      eventEmitter.emit('getter', target)
    }
    return Reflect.get(target, prop, receiver)
  },
  set (target, prop, value, receiver) {
    eventEmitter.emit('setter', target)

    return Reflect.set(
      target,
      prop,
      typeof value === 'object' ? observableObject(value) : value,
      receiver,
    )
  },
}

export default function observableObject (target) {
  forEach(target, (val, key) => {
    if (typeof val === 'object') target[key] = observableObject(val)
  })
  target._observers = new Set()

  return new Proxy(target, handler)
}