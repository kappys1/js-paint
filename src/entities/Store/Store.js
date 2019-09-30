export default class Store {
  constructor(arr) {
    arr = arr || []
    this._store = [...arr]
    this.updatePosition()
  }

  add(obj) {
    this._store.push(obj)
    this.updatePosition()
  }

  remove(id) {
    this._store = this._store.filter(val => val.id !== id)
    this.updatePosition()
  }

  removeLast() {
    this._store = this._store.slice(0, -1)
    this.updatePosition()
  }

  replaceLast(obj) {
    this.removeLast()
    this.add(obj)
  }

  clearFromPosition() {
    this._store.splice(this._position + 1, this._store.length - (this._position + 1))
  }

  undoPosition() {
    this._position--
  }

  redoPosition() {
    this._position++
  }

  updatePosition() {
    this._position = this._store.length - 1
  }

  isPositionAtLeast() {
    return this._position === this._store.length - 1
  }

  isEmpty() {
    return this._store.length === 0
  }

  get store() {
    return [...this._store]
  }

  get position() {
    return this._position
  }
}
