import ColorsSection from '.'

describe('colors section', () => {
  let codes
  let defaultCode
  let onColorClick

  beforeEach(() => {
    codes = ['#000000', '#fd5658', '#ffbc00', '#16c757', '#16affc']

    defaultCode = '#000000'

    onColorClick = code => 'clicked'
  })

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new ColorsSection({codes, defaultCode})).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new ColorsSection({codes, defaultCode, onColorClick})).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property codes', () => {
      expect(() => {
        new ColorsSection({defaultCode})
      }).toThrowError('codes is required')
    })

    test('should fail on trying to pass a undefined in property defaultCode', () => {
      expect(() => {
        new ColorsSection({codes})
      }).toThrowError('defaultCode is required')
    })

    test('should fail on trying to pass incorrect type in property codes', () => {
      codes = '#000000, #fd5658, #ffbc00'

      expect(() => {
        new ColorsSection({codes, defaultCode})
      }).toThrowError('codes must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property defaultCode', () => {
      defaultCode = Math.random()

      expect(() => {
        new ColorsSection({codes, defaultCode})
      }).toThrowError('defaultCode must be of type string')
    })
  })

  describe('initial', () => {
    let colorsSection

    beforeEach(() => {
      colorsSection = new ColorsSection({codes, defaultCode, onColorClick})
    })

    test('should be an instance of ColorsSection', () => {
      expect(colorsSection).toBeInstanceOf(ColorsSection)
    })

    test('should the element be of type HTMLElement', () => {
      expect(colorsSection.element).toBeDefined()
      expect(colorsSection.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name ColorsSection', () => {
      expect(colorsSection.element.classList.contains('ColorsSection')).toBeTruthy()
    })

    test('should have the same codes', () => {
      expect(colorsSection.codes.length).toBe(codes.length)

      codes.forEach(child => expect(colorsSection.codes).toContainEqual(child))
    })

    test('should have the same defaultCode', () => {
      expect(colorsSection.defaultCode).toBe(defaultCode)
    })

    test('should have the same onColorClick', () => {
      expect(colorsSection.onColorClick).toEqual(onColorClick)
    })
  })

  describe('handle color click', () => {
    test('should handle the click correctly', () => {
      const expectedCode = '#fd5658'

      onColorClick = _code => {
        expect(_code).toBeDefined()
        expect(_code).toBe(expectedCode)
      }

      const colorsSection = new ColorsSection({codes: [expectedCode], defaultCode, onColorClick})
      colorsSection.colors[0].element.dispatchEvent(new Event('click'))
    })
  })
})
