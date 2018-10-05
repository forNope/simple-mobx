import { eventEmitter } from '../utils'

export default {
  collect (observer) {
    function collector (observable) {
      observer._dependencies.add(observable)
      observable._observers.add(observer)
    }

    eventEmitter.on('getter', collector)
    observer()
    eventEmitter.off('getter', collector)
  },
  getObservers (observable) {
    return observable._observers.values()
  },
  dispose (observable) {
    observable._observers.clear()
  },
}