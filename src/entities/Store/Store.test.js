import Store from '.'
import Stroke from '../Stroke'

describe('Store', () => {
  describe('initial', () => {
    test('should be an instance of Store ', () => {
      const store = new Store()
      expect(store).toBeDefined()
    })

    test('should have init', () => {
      const store = new Store()

      expect(store.position).toBe(-1)
      expect(store.store.length).toBe(0)
      expect(store.isEmpty()).toBeTruthy()
      expect(store.isPositionAtLeast()).toBeTruthy()
    })
  })

  describe('on add Stroke to Store', () => {
    let store
    const obj = {
      color: '#000',
      width: 1,
      coordinateX: 0,
      coordianteY: 0
    }

    beforeEach(() => {
      store = new Store()
      store.add(new Stroke(obj))
    })

    test('check after add', () => {
      expect(store.position).toBe(0)
      expect(store.store.length).toBe(1)
      expect(store.isEmpty()).toBeFalsy()
      expect(store.isPositionAtLeast()).toBeTruthy()
    })

    test('check object after remove', () => {
      store.remove(store.store[0].id)
      expect(store.position).toBe(-1)
      expect(store.store.length).toBe(0)
      expect(store.isEmpty()).toBeTruthy()
      expect(store.isPositionAtLeast()).toBeTruthy()
    })

    test('check object after removeLast', () => {
      store.add(new Stroke(obj))
      store.add(new Stroke(obj))
      store.removeLast()
      expect(store.position).toBe(1)
      expect(store.store.length).toBe(2)
      expect(store.isEmpty()).toBeFalsy()
      expect(store.isPositionAtLeast()).toBeTruthy()
    })

    test('check object after replaceLast', () => {
      const stroke = new Stroke(obj)
      const newStroke = new Stroke(obj)
      store.add(stroke)
      store.replaceLast(newStroke)
      const last = store.store[store.store.length - 1]
      expect(last.id).toBe(newStroke.id)
    })

    test('check object after move in position', () => {
      store.add(new Stroke(obj))
      store.add(new Stroke(obj))
      store.undoPosition()
      expect(store.position).toBe(1)
      store.redoPosition()
      expect(store.position).toBe(2)
    })

    test('check object after clear from actual position', () => {
      store.add(new Stroke(obj))
      store.add(new Stroke(obj))
      store.undoPosition()
      store.clearFromPosition()
      expect(store.store.length).toBe(2)
    })
  })
})
