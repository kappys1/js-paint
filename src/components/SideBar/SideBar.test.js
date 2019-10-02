import SideBar from '.'

describe('SideBar', () => {
  const onColorClick = color => console.log(color)
  const onLineWidthClick = line => console.log(line)

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new SideBar({onColorClick, onLineWidthClick})).toBeDefined()
    })
  })

  describe('initial', () => {})
})
