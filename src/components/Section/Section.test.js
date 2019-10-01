import Section from '.'

describe('section', () => {
  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      const buttonTexts = ['Change color', 'Change line width', 'Apply filters']

      const children = buttonTexts.map(textButton => {
        const button = document.createElement('button')
        button.innerText = textButton
        return button
      })

      expect(new Section({children})).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property children', () => {
      const children = undefined

      expect(() => {
        new Section({children})
      }).toThrowError('children is required')
    })

    test('should fail on trying to pass a string in property children', () => {
      const children = 'sections'

      expect(() => {
        new Section({children})
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a number in property children', () => {
      const children = Math.random()

      expect(() => {
        new Section({children})
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a boolean in property children', () => {
      const children = false

      expect(() => {
        new Section({children})
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass a null in property children', () => {
      const children = null

      expect(() => {
        new Section({children})
      }).toThrowError('children must be of type Array')
    })
  })

  describe('initial', () => {
    let section
    let children

    beforeEach(() => {
      const buttonTexts = ['Change color', 'Change line width', 'Apply filters']

      children = buttonTexts.map(textButton => {
        const button = document.createElement('button')
        button.innerText = textButton
        return button
      })

      section = new Section({children})
    })

    test('should be an instance of Section', () => {
      expect(section).toBeInstanceOf(Section)
    })

    test('should the element be of type HTMLElement', () => {
      expect(section.element).toBeDefined()
      expect(section.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name Section', () => {
      expect(section.element.classList.contains('Section')).toBeTruthy()
    })

    test('should have the same children', () => {
      expect(section.children.length).toBe(children.length)

      children.forEach(child => expect(section.children).toContainEqual(child))
    })
  })
})
