import Stroke from '.'

describe('Stroke', () => {
  describe('entry', () => {
    test('should create correctly ', () => {
      const stroke = new Stroke('#000', 1, 0, 0)
      expect(stroke).toBeDefined()
    })
  })
})
