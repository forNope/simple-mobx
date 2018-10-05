export default function forEach (target, fn) {
  if (Array.isArray(target)) {
    target.forEach(fn)
  } else {
    Object.keys(target).forEach(key => fn(target[key], key))
  }
}