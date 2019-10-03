import LineWidthsSection from '.'

describe('line widths tool', () => {
  let widths
  let defaultWidth
  let onLineWidthClick

  beforeEach(() => {
    widths = [1, 2, 3, 4, 5]

    defaultWidth = 1

    onLineWidthClick = width => 'clicked'
  })

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new LineWidthsSection({widths, defaultWidth})).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new LineWidthsSection({widths, defaultWidth, onLineWidthClick})).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property widths', () => {
      expect(() => {
        new LineWidthsSection({defaultWidth})
      }).toThrowError('widths is required')
    })

    test('should fail on trying to pass a undefined in property defaultWidth', () => {
      expect(() => {
        new LineWidthsSection({widths})
      }).toThrowError('defaultWidth is required')
    })

    test('should fail on trying to pass incorrect type in property widths', () => {
      widths = '1, 2, 3, 4, 5'

      expect(() => {
        new LineWidthsSection({widths, defaultWidth})
      }).toThrowError('widths must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property defaultWidth', () => {
      defaultWidth = '2'

      expect(() => {
        new LineWidthsSection({widths, defaultWidth})
      }).toThrowError('defaultWidth must be of type number')
    })
  })

  describe('initial', () => {
    let lineWidthsSection

    beforeEach(() => {
      lineWidthsSection = new LineWidthsSection({widths, defaultWidth, onLineWidthClick})
    })

    test('should be an instance of LineWidthsSection', () => {
      expect(lineWidthsSection).toBeInstanceOf(LineWidthsSection)
    })

    test('should the element be of type HTMLElement', () => {
      expect(lineWidthsSection.element).toBeDefined()
      expect(lineWidthsSection.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name LineWidthsSection', () => {
      expect(lineWidthsSection.element.classList.contains('LineWidthsSection')).toBeTruthy()
    })

    test('should have the same widths', () => {
      expect(lineWidthsSection.widths.length).toBe(widths.length)

      widths.forEach(child => expect(lineWidthsSection.widths).toContainEqual(child))
    })

    test('should have the same defaultWidth', () => {
      expect(lineWidthsSection.defaultWidth).toBe(defaultWidth)
    })

    test('should have the same onLineWidthClick', () => {
      expect(lineWidthsSection.onLineWidthClick).toEqual(onLineWidthClick)
    })
  })

  describe('handle line width click', () => {
    test('should handle the click correctly', () => {
      const expectedWidth = 4

      onLineWidthClick = _width => {
        expect(_width).toBeDefined()
        expect(_width).toBe(expectedWidth)
      }

      const lineWidthsSection = new LineWidthsSection({widths: [expectedWidth], defaultWidth, onLineWidthClick})
      lineWidthsSection.lineWidths[0].element.dispatchEvent(new Event('click'))
    })
  })
})
