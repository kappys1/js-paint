import Header from '.'

describe('Header', () => {
  const onUndoClick = ev => console.log(ev)
  const onRedoClick = ev => console.log(ev)
  const onSaveClick = ev => console.log(ev)

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new Header({onUndoClick, onRedoClick, onSaveClick})).toBeDefined()
    })
  })

  describe('initial', () => {})
})
