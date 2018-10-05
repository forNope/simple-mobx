import { eventEmitter } from '../utils'
import { dependencyManager } from '../core'

const batchingUpdates = new Set()
let isStartBatching = false

function perform () {
  batchingUpdates.delete(undefined)
  batchingUpdates.forEach(observer => {
    // recollect dependencies
    observer
      ._dependencies
      .forEach(observable => dependencyManager.dispose(observable))
    observer._dependencies.clear()
    dependencyManager.collect(observer)
  })

  batchingUpdates.clear()
  isStartBatching = false
}

eventEmitter.on('setter', function (ob) {
  // note: it will add undefined when observers is a empty iterator
  batchingUpdates.add(...dependencyManager.getObservers(ob))
  if (!isStartBatching) Promise.resolve().then(perform)
  isStartBatching = true
})