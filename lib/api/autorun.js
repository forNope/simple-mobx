import { dependencyManager } from '../core'

export default function autorun (observer) {
  observer._dependencies = new Set()
  dependencyManager.collect(observer)
}