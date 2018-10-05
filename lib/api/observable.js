import { observablePrimitive, observableObject } from '../types'

export default function observable (target) {
  return typeof target === 'object'
    ? observableObject(target)
    : observablePrimitive(target)
}